import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Получаем `id` из URL
import axios from "axios"; // ✅ Для запроса информации о продукте
import Nav from "../Nav.jsx";
import Slider from "../productSlider/Slider.jsx";
import "../../scss/prod.scss";
import Products from "./Products.jsx";
import box from "../../img/box.svg";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import wallet from "../../img/wallet.svg";
import shield from "../../img/shield.svg";
import useProductsImages from "../../../hooks/useProductsImages.jsx";
import prod1 from "../../img/prod1.png"; // Заглушка изображения
import API_BASE_URL from "../../../apiConfig.js";
import useAddCartItem from "../../../hooks/useAddCartItem.jsx"; // ✅ URL API
import { useTranslation } from "react-i18next";
import useAuthMe from "../../../hooks/useAuthMe.jsx";
import galka from '../../img/toast.svg'


export default function Product() {
    const { id } = useParams(); // ✅ Получаем `id` из URL
    const navigate = useNavigate()
    const { error: authError } = useAuthMe();
    const { addCartItem } = useAddCartItem();
    const { t, i18n } = useTranslation()
    // ✅ Состояние для продукта
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userMe } = useAuthMe();
    const handleBuy = () => {
        toast(
            <div className='tost'>
                <img src={galka} alt="Done" />
                <span className='tost__text'>Успешно отправлено на проверку</span>
            </div>,
            {
                style: {
                    width: '100%',
                    padding: '10px',
                    background: 'none',
                    boxShadow: 'none',


                },
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: false,
                icon: false
            }
        )
    }
    // ✅ Загружаем информацию о продукте при изменении `id`
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/products/${id}/`);
                setProduct(response.data);
            } catch (err) {
                setError("Ошибка загрузки продукта");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // ✅ Загружаем изображения продукта
    const { productImages } = useProductsImages({ product_id: id });

    // ✅ Устанавливаем `currentImg` после загрузки `productImages`
    const [currentImg, setCurrentImg] = useState(prod1);
    useEffect(() => {
        if (productImages.length > 0) {
            setCurrentImg(productImages[0].image);
        }
    }, [productImages, id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Продукт не найден</p>;

    // ✅ Навигационная информация
    const navInfo = {
        title: product.name,
        total: product.quantity,
        discount: product.discount,
    };

    const handleClick = async (event) => {
        event.stopPropagation(); // чтобы не сработал Link

        if (authError) {
            navigate('/auth');
        } else {
            try {
                await addCartItem({ product_id: product.id, amount: 1 });
                navigate('/cart');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="prod">
            <Nav status={false} info={navInfo} />
            <div className="prod__wrap">
                <div className="prod__left">
                    <div className="prod__imgs">
                        <div className="prod__imgs-current">
                            <img src={currentImg} alt="Product Image" />
                        </div>
                        <Slider onSelect={setCurrentImg} info={productImages} />
                    </div>
                    <div className="prod__info">
                        <div className="prod__info-top">
                            <p className="prod__info-top__title">{t('parameters')}</p>
                            <div className="prod__info-top__wrap">
                                {product.description &&
                                    Object.entries(product.description).map(([key, value], index) => (
                                        <p key={index} className="prod__info-top__text">
                                            {key}: {value}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="prod__info-bottom">
                            <p className="prod__info-bottom__title">{t('infoAbtProd')}</p>
                            <div className="prod__info-bottom__wrap">
                                {product.characteristics &&
                                    Object.entries(product.characteristics).map(([key, value], index) => (
                                        <p key={index} className="prod__info-bottom__text">
                                            {key}: {value}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prod__right">
                    <div className="prod__right-top">

                        {product.discount != 0 ?
                            <>
                                <p className="product__desc-price__disc">{Math.round(product.price).toLocaleString()} {t('value')}</p>
                                <p className="prod__right-top__price">
                                    {Math.round(product.price - (product.price * product.discount / 100)).toLocaleString()} {t('value')}</p>
                            </>
                            :
                            <p className="prod__right-top__price">{Math.round(product.price).toLocaleString()} {t('value')}</p>
                        }
                        <div className="prod__right-top__nav">
                            <button className="prod__right-top__nav-btn" onClick={handleClick}>{t('addToCart')}</button>
                            <button className="prod__right-top__nav-btn" onClick={() => { userMe ? handleBuy() : navigate('/auth') }}>{t('buyBtn')}</button>
                        </div>
                    </div>
                    <div className="prod__right-bottom">
                        <div className="prod__right-bottom__elem">
                            <img src={box} alt="" />
                            <p className="prod__right-bottom__elem-txt">
                                {t('receivingWays')}
                            </p>
                        </div>
                        <div className="prod__right-bottom__elem">
                            <img src={wallet} alt="" />
                            <p className="prod__right-bottom__elem-txt">
                                {t('paymentWays')}
                            </p>
                        </div>
                        <div className="prod__right-bottom__elem">
                            <img src={shield} alt="" />
                            <p className="prod__right-bottom__elem-txt">
                                <span>{t('guarantee')}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Products title={t('newProds')} />
        </div>
    );
}
