import React from "react";
import { NavLink } from "react-router-dom";
import home from "../../assets/img/home.svg";
import cart from "../../assets/img/cart.svg";
import acc from "../../assets/img/acc.svg";
import search from "../../assets/img/lupa.svg";
import "../../styles/scss/components/mediaNav.scss";
import { useTranslation } from "react-i18next";
import useBasket from "../../hooks/useBasket.jsx";
import useAuthMe from "../../hooks/useAuthMe.jsx";

export default function MediaNav() {
  const { t } = useTranslation();
  const { basket, fetchBasket } = useBasket();
  const { userMe } = useAuthMe();

  React.useEffect(() => {
    fetchBasket();
  }, []);

  return (
    <div className="media">
      <div className="media__wrap">
        <NavLink
          className={({ isActive }) =>
            isActive ? "media__link choosen" : "media__link"
          }
          to="/"
        >
          <img src={home} alt="home icon" />
          <p className="media__link-text">{t("mainPage")}</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "media__link choosen" : "media__link"
          }
          to="/products"
        >
          <img src={search} alt="search icon" />
          <p className="media__link-text">{t("searchInput")}</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "media__link choosen" : "media__link"
          }
          to="/cart"
        >
          <img src={cart} alt="cart icon" />
          <p className="media__link-text">{t("cart")}</p>
          {basket.length !== 0 && <span>{basket.length}</span>}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "media__link choosen" : "media__link"
          }
          to="/account/profile"
        >
          <img src={acc} alt="account icon" />
          <p className="media__link-text">
            {userMe ? t("account") : t("enter")}
          </p>
        </NavLink>
      </div>
    </div>
  );
}
