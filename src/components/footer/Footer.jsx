import { useTranslation } from "react-i18next";
import Map from "../tools/Map";
import Form from "../Form/Form";
import logo from "../../assets/img/logo.svg";
import instagram from "../../assets/img/instagram.svg";
import facebook from "../../assets/img/fb.svg";
import telegram from "../../assets/img/telg.svg";
import youtube from "../../assets/img/yout.svg";
import qrCode from "../../assets/img/qr.svg";
import call from "../../assets/img/call.svg";
import appStore from "../../assets/img/appstore.svg";
import playMarket from "../../assets/img/pm.svg";
import "../../styles/scss/layout/footer.scss";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { AiFillYoutube } from "react-icons/ai";
import { RiTelegram2Fill } from "react-icons/ri";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <Form />
      <div className="footer__inner">
        <div className="container">
          <div className="footer__wrap">
            <div className="footer__l">
              <div className="footer__left">
                <div className="footer__titles">
                  <div className="footer__titles-media">
                    <a data-social="Instagram" style={{"--accent-color": "#FF0069"}} href="https://www.instagram.com/">
                      <IoLogoInstagram  />
                    </a>
                    <a
                    data-social="Facebook"
                    style={{"--accent-color":"#0866FF"}}
                      href="https://www.facebook.com/profile.php?id=61566515812935"
                      target="_blank"
                    >
                      <FaFacebookF  />
                    </a>

                    <a 
                    data-social="Telegram"
                     style={{"--accent-color": "#26A5E4"}}
                    href="https://t.me/@fromMrX" target="_blank">
                      <FaTelegramPlane  />
                    </a>
                    <a
                    data-social="Youtube "
                     style={{"--accent-color": "#FF0000"}}
                      href="https://www.youtube.com/watch?v=8JW3PvhUmb4&list=RD9Eg7iBWqEFg&index=3"
                      target="_blank"
                    >
                      <AiFillYoutube  />
                    </a>
                  </div>
                  <h2 className="footer__titles-text">{t("information")}</h2>
                </div>
                <div className="footer__btm">
                  <img className="footer__btm-qr" src={qrCode} alt="qr icon" />
                  <div className="footer__btm-el">
                    <div className="footer__btm-el__list">
                      <a href="#" className="footer__btm-el__list-item">
                        В магазин
                      </a>
                      <a href="#" className="footer__btm-el__list-item">
                        Связаться с нами!
                      </a>
                      <a href="#" className="footer__btm-el__list-item">
                        Возврат товара
                      </a>
                      <a href="#" className="footer__btm-el__list-item">
                        Гарантия на товары
                      </a>
                    </div>
                    <a href="tel:+998991999996">
                      <div className="footer__btm-el__tel">
                        <img src={call} alt="call-icon" />
                        <span>99</span>
                        199 99 96
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer__btm-app">
                <a href="#">
                  <div className="footer__btm-app__el">
                    <img src={appStore} alt="appstore icon" />
                    <p className="footer__btm-app__el-text">AppStore</p>
                  </div>
                </a>
                <a href="#">
                  <div className="footer__btm-app__el">
                    <img src={playMarket} alt="appstore" />
                    <p className="footer__btm-app__el-text">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="footer__main-map">
              <Map />

              <div className="footer__main-map__desc">
                <p className="footer__main-map__desc-text">{t("makeRoute")}</p>
                <div className="footer__main-map__desc-nav">
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/zbBrP"
                  >
                    Google maps
                  </a>
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/5rq4u"
                  >
                    Yandex maps
                  </a>
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/aha7U"
                  >
                    2gis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-wrap">
            <div className="footer__bottom-desc">
              <img src={logo} alt="logo-icon" />
              <p className="footer__bottom-desc__text">{t("footerBtm")}</p>
            </div>
            <p className="footer__bottom-text">© 2025 MILLIYBIZ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
