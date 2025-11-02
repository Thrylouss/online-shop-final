import { Link } from "react-router";

import CategoryCard from "./categoryCard.jsx";
import "../../styles/scss/vendors/categories.scss";
import useCategories from "../../hooks/useCategories.jsx";
import useSubCategories from "../../hooks/useSubCategories.jsx";
import { useTranslation } from "react-i18next";
import cat1 from "../../assets/img/cat1.png";
import cat2 from "../../assets/img/cat2.png";
import cat3 from "../../assets/img/cat3.png";
import cat4 from "../../assets/img/cat4.png";
import arrowR from "../../assets/img/arrowR.svg";

export default function Categories() {
  const { categories } = useCategories();
  const { t, i18n } = useTranslation();

  return (
    <div className="categories">
      <div className="categories__top">
        <h2 className="categories__title">{t("categ")}.</h2>
        <div className="categories__txt">
          <Link to="/products" className="link">
            <p className="categories__text">{t("all")} </p>
          </Link>
          <img src={arrowR} alt="" />
        </div>
      </div>
      <div className="categories__wrap">
        {categories.slice(0, 4).map((item, i) => (
          <Link className="link" key={i} to="/products">
            <CategoryCard info={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
