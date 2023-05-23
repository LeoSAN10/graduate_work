import React from "react";
import { Header } from "../../components/Header/Header";
import "./styels.css";

export const MainPage = () => {
  return (
    <Layout>
      <div>
        <Header></Header>
        <div className="main_section">
          <div className="title_text">Karb</div>
          <div className="subtitle_text">
            Твое лучшее решение провести время
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
