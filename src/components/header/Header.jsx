import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useBasket from "../../hooks/useBasket.jsx";
import useAuthMe from "../../hooks/useAuthMe.jsx";
import locate from "../../assets/img/locateIcon.svg";
import instagram from "../../assets/img/instagram.svg";
import facebook from "../../assets/img/facebook.svg";
import telegram from "../../assets/img/telegram.svg";
import search from "../../assets/img/search.svg";
import account from "../../assets/img/account.svg";
import smallBasket from "../../assets/img/smallBasket.svg";
import searchLupa from "../../assets/img/searchLupa.svg";
import hamburger from "../../assets/img/menu.svg";
import ChooseLang from "../tools/ChooseLang.jsx";
import close from "../../assets/img/closeIcon.svg";

export default function Header({ st, sfunc, state, func }) {
  const { t } = useTranslation();
  const { userMe } = useAuthMe();
  const { basket, fetchBasket } = useBasket();
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchBasket();
    setCount(basket.length);
  }, [basket]);

  return (
    <div className="header" data-aos="fade-down">
      <div className="header__wrap">
        <div className="header__top">
          <div className="container">
            <div className="header__top-wrap">
              <div className="header__top-locate">
                <img src={locate} alt="locate icon" />
                <p className="header__top-locate__text">{t("country")}:</p>
                <span className="header__top-locate__span">{t("city")}</span>
              </div>
              <div className="header__top-nav">
                <div className="header__top-nav__links">
                  <a href="#">
                    <img src={instagram} alt="instagran-icon" />
                  </a>
                  <a href="#">
                    <img src={facebook} alt="facebook-icon" />
                  </a>
                  <a href="#">
                    <img src={telegram} alt="telegram-icon" />
                  </a>
                </div>
                <div className="header__top-nav__number">
                  <a
                    className="header__top-nav__number-link"
                    href="tel:+998991999996"
                  >
                    +998 99 199 99 96
                  </a>
                </div>
                <ChooseLang />
              </div>
            </div>
          </div>
        </div>
        <div className="header__main">
          <div className="container">
            <div className="header__main-wrap">
              {st ? (
                <input type="text" className="header__main-inp" />
              ) : (
                <Link className="link" to="/">
                  <h2 className="header__main-logo">Logo company</h2>
                </Link>
              )}

              <div className="header__main-center">
                <Link to="/products" className="link">
                  <div className="header__main-center__categories">
                    <img src={hamburger} alt="hamburger-icon" />
                    <p className="header__main-center__categories-text">
                      {t("categ")}
                    </p>
                  </div>
                </Link>

                <div className="header__main-center__search">
                  <input
                    onChange={(e) => {
                      if (e.target.value == "") {
                        sfunc(false);
                        e.target.value = "";
                      } else {
                        sfunc(true);
                      }
                    }}
                    type="text"
                    className="header__main-center__search-input"
                    placeholder={t("searchInput")}
                  />

                  <button className="header__main-center__search-button">
                    <img src={searchLupa} alt="search" />
                  </button>
                </div>
              </div>
              <div className="header__main-nav">
                <Link className="link" to="/account/profile">
                  <div className="header__main-nav__elem">
                    <img src={account} alt="account-icon" />
                    {userMe ? (
                      <p className="header__main-nav__elem-text">
                        {t("account")}
                      </p>
                    ) : (
                      <p className="header__main-nav__elem-text">
                        {t("enter")}
                      </p>
                    )}
                  </div>
                </Link>

                <Link className="link" to="/cart">
                  <div className="header__main-nav__elem">
                    <img src={smallBasket} alt="basket icon" />
                    <p className="header__main-nav__elem-text">{t("cart")}</p>
                    {count != 0 ? (
                      <div className="header__main-nav__elem-span">{count}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </div>
              <div className="header__main-adaptive">
                <button
                  onClick={() => {
                    sfunc(true);
                    func(false);
                  }}
                  className="header__main-adaptive__btn"
                >
                  <img src={smallBasket} alt="basket-icon" />
                </button>
                <button className="header__main-adaptive__btn">
                  {state || st ? (
                    <img
                      src={close}
                      alt="closeIcon"
                      onClick={() => {
                        func(false);
                        sfunc(false);
                      }}
                    />
                  ) : (
                    <img
                      src={hamburger}
                      alt="hamburger-icon"
                      onClick={() => {
                        func(true);
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
