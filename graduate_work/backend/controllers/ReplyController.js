const ApiError = require("../error/ApiError");
const ResponseCreator = require("../response_creators/ResponseCreator");
const ReplyDataAccess = require("../data_requests/ReplyDataAccess");
const RequestDataAccess = require("../data_requests/RequestDataAccess");

class ReplyController {
    async newReply(req, res, next) {
      try {
        const userId = req.user.id;
        const requestId = req.params.id.slice(1);
        const {text, telegram, viber, whatsapp, facebook, vkontakte} = req.body;
        const request = await RequestDataAccess.findRequestById(requestId);
        if(request.UserId === userId) {
            throw ApiError.forbidden("User can't reply to his request"); 
        }
        if (await ReplyDataAccess.findReply(requestId, userId)) {
            throw ApiError.forbidden("User already replied to this request"); 
        }
        const reply = await ReplyDataAccess.createReply(text, telegram, viber, whatsapp, facebook, vkontakte, userId, requestId);
        return res.json(
          ResponseCreator.response({ 
              message: "Answer created",
              reply
            })
        );
      } catch (error) {
        return next(error);
      }
    }

    async updateReply(req, res, next) {
        try {
            const replyId  = req.param('id').slice(1);
            const reply = await ReplyDataAccess.findReplyById(replyId);
            if(reply.UserId !== req.user.id) {
                throw ApiError.forbidden("Reply does not belong to user");
            }

            for (let key in req.body) {
                reply.dataValues[key] = req.body[key];
                reply._changed.add(key);
            }
            
            reply.save();

            return res.json(
                ResponseCreator.response({ message: "Reply has been updated", reply })
            );
          } catch (error) {
            return next(error);
          }
    }

    async deleteReply(req, res, next) {
        try{
            const replyId  = req.param('id').slice(1);
            const reply = await ReplyDataAccess.findReplyById(replyId);
            if(reply.UserId !== req.user.id) {
                throw ApiError.forbidden("Reply does not belong to user");
            }
            await ReplyDataAccess.deleteReplyById(replyId);
            return res.json(
                ResponseCreator.response({ message: "Reply has been deleted" })
            );
        } catch (error) {
            return next(error);
        }
    }

    async getRepliesForRequest(req, res, next) {
        try {
            const { page, limit } = req.query;
            const userId = req.user.id;
            const requestId = req.params.id.slice(1);
            const request = await RequestDataAccess.findRequestById(requestId);
            if(request.UserId !== userId) {
                throw ApiError.forbidden("Request doesn't belongs to user"); 
            }
            return res.json(
              ResponseCreator.response(await ReplyDataAccess.getRepliesForRequest(requestId, page * limit, limit))
            );
          } catch (error) {
            return next(error);
          }
    }

    async getMyReplies(req, res, next) {
        try {
            const { page, limit } = req.query;
            const userId = req.user.id;
            return res.json( 
                ResponseCreator.response(await ReplyDataAccess.getMyReplies(userId, page * limit, limit))
            )
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ReplyController();
