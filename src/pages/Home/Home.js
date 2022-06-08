import React from "react";
import ha2 from "../../common/assets/img/ha-2.png";
import ha3 from "../../common/assets/img/ha-3.png";
import ha4 from "../../common/assets/img/ha-4.png";
import ha from "../../common/assets/img/ha.png";
import logo from "../../common/assets/img/mic-icon.png";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="content-logo">
        <div className="ha">
          <img src={ha} alt="HA" />
        </div>
        <div className="ha-2">
          <img src={ha3} alt="HA" />
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="ha-3">
          <img src={ha2} alt="HA" />
        </div>
        <div className="ha-4">
          <img src={ha4} alt="HA" />
        </div>
      </div>
      <div className="content-home">
        <h1>
          SÓ <span className="span-title">PIADA</span> BOA
        </h1>
        <div className="text-home">
          <p>
            Participe da maior comunidade de piadistas do Brasil. Vote nas
            piadas de outros usuários e cadastre suas as suas próprias.
          </p>
          <br />
          <span className="secondary-text">Só não vá morrer de rir! kkk</span>
        </div>
      </div>
      <div className="img-mic">
        <div className="mic"></div>
      </div>
      <a href="/piadas">
        <button className="button-init">
          Começar
        </button>
      </a>
    </div>
  );
};
export default Home;
