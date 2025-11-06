import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAddCartItem from "../../hooks/useAddCartItem.jsx";
import useAuthMe from "../../hooks/useAuthMe.jsx";
import imgPlaceholder from "../../assets/img/product.svg";
import basket from "../../assets/img/basket.svg";
import "../../styles/scss/components/product.scss";

export default function ProductCard({ info }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { error: authError } = useAuthMe();
  const { addCartItem } = useAddCartItem();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (authError) {
      return navigate("/auth");
    }

    try {
      await addCartItem({ product_id: info.id, amount: 1 });
      navigate("/cart");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product__main">
      <div className="product__wrap">
        <div className="product__img">
          <Link to={`/product/${info.id}`}>
           <img src={imgPlaceholder} alt="" />
          </Link>

          {info?.status && (
            <div className="product__special">
              <p className="product__special-text">
                {info.status.replace(/_/g, " ")}
              </p>
            </div>
          )}

          {info?.discount > 0 && (
            <div className="product__disc">
              <p className="product__disc-text">-{Math.round(info.discount)}%</p>
            </div>
          )}
        </div>

        <div className="product__desc">
          <p className="product__desc-title">{info.name}</p>

          <div className="product__desc-price">
            {info.discount > 0 ? (
              <>
                <p className="product__desc-price__disc">
                  {Math.round(info.price).toLocaleString()} {t("value")}
                </p>
                <h3 className="product__desc-price__text">
                  {Math.round(info.final_price).toLocaleString()} {t("value")}
                </h3>
              </>
            ) : (
              <h3 className="product__desc-price__text">
                {Math.round(info.price).toLocaleString()} {t("value")}
              </h3>
            )}
          </div>
        </div>
      </div>

      <div className="product__desc-btns">
        <Link to={`/product/${info.id}`} className="product__desc-btns__buy">
          {t("buyBtn")}
        </Link>

        <button onClick={handleAddToCart} className="product__desc-btns__basket">
          <img src={basket} alt="Add to cart" />
        </button>
      </div>
    </div>
  );
}
