import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import arrowL from "../../assets/img/arrowL.svg";
import "../../styles/scss/layout/nav.scss";

export default function Nav({
  totalProducts,
  setFilters,
  activeStatus,
  setActiveStatus,
  status = true,
  info,
}) {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { t, i18n } = useTranslation();
  return (
    <div className="nav">
      <div className="nav__wrap">
        <div className="nav__top">
          <div
            className="nav__back"
            onClick={() => {
              handleBackClick();
            }}
          >
            <img src={arrowL} alt="" />
            <p className="nav__back-text">{t("back")}</p>
          </div>

          <div className="nav__btns">
            <Link className="link nav__btns-btn" to="/">
              {t("mainPage")}
            </Link>
          </div>
        </div>
        <div className="nav__bottom">
          <div className="nav__bottom-desc">
            <div className="nav__bottom-desc__wrap">
              {info ? (
                <p className="nav__bottom-desc__title">{info.title}</p>
              ) : (
                <h1 className="nav__bottom-desc__title">{t("allProds")}</h1>
              )}
              {totalProducts !== undefined && (
                <p className="nav__bottom-desc__text">
                  {totalProducts} {t("prods")}
                </p>
              )}
            </div>
            <div className="nav__bottom-desc__prod">
              {info?.discount > 0 && (
                <p className="nav__bottom-desc__discount">
                  - {Math.round(info.discount)} %
                </p>
              )}
              {info?.total !== undefined && (
                <p className="nav__bottom-desc__text">
                  {info.total} {t("prods")}{" "}
                </p>
              )}
            </div>
          </div>

          {status && (
            <div className="nav__bottom-nav">
              <p
                onClick={() => setActiveStatus("mahsus_taklif")}
                className={
                  activeStatus === "mahsus_taklif"
                    ? "nav__bottom-nav__text nav__bottom-nav__text__active"
                    : "nav__bottom-nav__text"
                }
              >
                {t("specialOffer")}
              </p>
              <p
                onClick={() => setActiveStatus("yangilik")}
                className={
                  activeStatus === "yangilik"
                    ? "nav__bottom-nav__text nav__bottom-nav__text__active"
                    : "nav__bottom-nav__text"
                }
              >
                {t("newProd")}
              </p>
              <p
                onClick={() => setActiveStatus("all")}
                className={
                  activeStatus === "all"
                    ? "nav__bottom-nav__text nav__bottom-nav__text__active"
                    : "nav__bottom-nav__text"
                }
              >
                {t("all")}
              </p>
              <p
                className="nav__bottom-nav__text-clear"
                onClick={() => {
                  setFilters({
                    subcategory: "",
                    min_price: "",
                    max_price: "",
                    search: "",
                    page: 1,
                  });
                }}
              >
                {t("clear")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
