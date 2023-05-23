import React from "react";
import { ROUTES } from "../../constants/Routes";
import logo from "../../assets/logo3.png";
import "./styles.css";

export const Header = () => {
  return (
    <div className="box">
      <div className="logo">
        <div className="logo_img">
          <a href={ROUTES.MAIN_PAGE}>
            <img src={logo} alt="logo" className="logo_img_style" />
          </a>
        </div>
        <div className="logo_name">
          <i>
            <a href={ROUTES.MAIN_PAGE} className="link">
              karb
            </a>
          </i>
        </div>
      </div>
      <div className="nav">
        <a href={ROUTES.MAIN_PAGE} className="link">
          Главная
        </a>
        <a href={ROUTES.INFO_PAGE} className="link">
          Информация
        </a>
        <a href={ROUTES.CONTACTS_PAGE} className="link">
          Контакты
        </a>
        <a href={ROUTES.REGISTER_PAGE} className="link">
          Мой аккаунт
        </a>
      </div>
    </div>
  );
};

export default Header;
