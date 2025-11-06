import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useProducts from "../../hooks/useProducts.jsx";
import ProductCard from "./ProductCard.jsx";
import arrowR from "../../assets/img/arrowR.svg";
import prod from "../../assets/img/prod.png";
import "../../styles/scss/components/products.scss";

export default function Products({ title }) {
  const { t, i18n } = useTranslation();
  let { products } = useProducts();

  if (title === "Mahsus taklif.") {
    products = products.filter((e) => e.status === "mahsus_taklif");
  } else if (title === "Yangi mahsulotlar.") {
    products = products.filter((e) => e.status === "yangilik");
  }

  return (
    <div className="container">

    <div className="products">
      <div className="products__wrap">
        <div className="products__top">
          <h2 className="products__top-title">{title}</h2>
          <div className="products__top-txt">
            <Link to="/products" className="link">
              <p className="products__top-text">{t("all")}</p>
            </Link>

            <img src={arrowR} alt="arrow icon" />
          </div>
        </div>
        <div className="products__main">
          {products.slice(0, 8).map((e, i) => (
            <ProductCard info={e} key={i} />
          ))}
        </div>
      </div>
    </div>
    </div>

  );
}
