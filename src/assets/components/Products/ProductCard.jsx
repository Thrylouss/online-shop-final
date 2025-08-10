import React from 'react'
import '../../scss/product.scss'
import basket from '../../img/basket.svg'
import { Link } from 'react-router'
import useProductsImages from "../../../hooks/useProductsImages.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import imgPlaceholder from '../../img/prod.png'
import product from "./Product.jsx";
import { useNavigate } from "react-router-dom";
import useAddCartItem from "../../../hooks/useAddCartItem.jsx";
import useAuthMe from "../../../hooks/useAuthMe.jsx";
import { useTranslation } from 'react-i18next'


export default function ProductCard({ info }) {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    const { error: authError } = useAuthMe();
    const { addCartItem, loading, error } = useAddCartItem();

    console.log(info)

    const handleClick = async (event) => {
        event.stopPropagation(); // чтобы не сработал Link

        if (authError) {
            navigate('/auth');
        } else {
            try {
                await addCartItem({ product_id: info.id, amount: 1 });
                navigate('/cart');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (

        <div className='product__main'>
            <Link to={`/product/${info.id}`} className='link product'>
                <div className="product__wrap">
                    <div className="product__img">
                        <img className='product__image' src={info.images[0]} alt="" />
                        {/*<img className='product__image' src={imgPlaceholder} alt="" />*/}

                        {info.status && (
                            <div className="product__special">
                                <p className='product__special-text'>
                                    {info.status.replace(/_/g, ' ')}
                                </p>
                            </div>
                        )}

                        {info.discount != 0 && (
                            <div className="product__disc">
                                <p className='product__disc-text'>-{Math.round(info.discount)}%</p>
                            </div>
                        )}
                    </div>
                    <div className="product__desc">
                        <p className='product__desc-title'>{info.name}</p>
                        <div className="product__desc-price">
                            {info.discount != 0 ? (
                                <>
                                    <p className='product__desc-price__disc'>
                                        {Math.round(info.price).toLocaleString()} {t('value')}
                                    </p>
                                    <h3 className='product__desc-price__text'>
                                        {Math.round(info.final_price).toLocaleString()} {t('value')}
                                    </h3>
                                </>
                            ) : (
                                <>
                                    <div className='product__desc-placeholder'></div>
                                    <h3 className='product__desc-price__text'>
                                        {Math.round(info.price).toLocaleString()} {t('value')}
                                    </h3>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </Link>
            <div className="product__desc-btns">

                <button className='product__desc-btns__buy'>
                    <Link to={`/product/${info.id}`} className='link'>
                    {t('buyBtn')}
                    </Link>
                </button>


                <button onClick={handleClick} className='product__desc-btns__basket'>
                    <img src={basket} alt="" />
                </button>

            </div>
        </div>


    )
}
