import React, { useState, useEffect } from "react";
import "../../scss/cart.scss";
import trash from "../../img/trash.svg";
import useProductsImages from "../../../hooks/useProductsImages.jsx";
import axios from "axios";
import API_BASE_URL from "../../../apiConfig.js";
import { useTranslation } from "react-i18next";

export default function CartElem({
    prod,
    updateQuantity,
    removeItemLocal,
    toggleSelection,
    isSelected,
    change,
    setInfo,
}) {
    const { t, i18n } = useTranslation()
    const { productImages } = useProductsImages({ product_id: prod.product.id });
    // Локальное состояние количества для товара
    const [counter, setCounter] = useState(prod.amount);

    // При изменении counter уведомляем родителя
    useEffect(() => {
        updateQuantity(prod.id, counter);
    }, [counter]);

    // Обновление количества на сервере через PATCH-запрос
    const updateQuantityOnServer = async (newQuantity) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://127.0.0.1:8000/basket/${prod.id}/`,
                { amount: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (typeof change === "function") {
                change();
            }
        } catch (err) {
            console.error("Ошибка обновления количества:", err);
        }
    };

    const handleDecrease = () => {
        if (counter >= 2) {
            const newQuantity = counter - 1;
            setCounter(newQuantity);
            updateQuantityOnServer(newQuantity);
        }
    };

    const handleIncrease = () => {
        const newQuantity = counter + 1;
        setCounter(newQuantity);
        updateQuantityOnServer(newQuantity);
    };

    // Функция для удаления товара
    const removeItem = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE_URL}/basket/${prod.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            removeItemLocal(prod.id);
            if (typeof change === "function") {
                change();
            }
        } catch (err) {
            console.error("Ошибка удаления товара:", err);
        }
    };

    // Вычисление цены
    const basePrice = Number(prod.product.price);
    const discount = Number(prod.product.discount);
    const finalPrice = discount !== 0 ? basePrice * (1 - discount / 100) : basePrice;

    return (
        <>
            <div className="cart">
                <div className="cart__left">
                    {/* Чекбокс для выбора товара */}
                    <input
                        type="checkbox"
                        className="cart__left-inp"
                        checked={isSelected}
                        onChange={() => toggleSelection(prod.id)}
                    />
                    {productImages[0] && (
                        <img
                            src={productImages[0].image}
                            className="cart__left-img"
                            alt="Product"
                        />
                    )}
                    <div className="cart__left-desc">
                        <p className="cart__left-desc__title">
                            {(finalPrice * counter).toLocaleString()} {t("value")}{" "}
                            {discount !== 0 && <span>-{discount}%</span>}
                        </p>
                        <p className="cart__left-desc__text">{prod.product.name}</p>
                        <p className="cart__left-desc__code">
                           {t("codeOfProd")}: {prod.product.product_code}
                        </p>
                    </div>
                </div>
                <div className="cart__right">
                    <div className="cart__right-counter">
                        <button
                            onClick={handleDecrease}
                            className="min cart__right-counter__btn"
                        >
                            -
                        </button>
                        <p className="cart__right-counter__title">{counter}</p>
                        <button
                            onClick={handleIncrease}
                            className="plus cart__right-counter__btn"
                        >
                            +
                        </button>
                    </div>
                    <div onClick={removeItem} className="cart__right-del">
                        <img src={trash} alt="Удалить" />
                    </div>
                </div>
            </div>

            {/* Версия для адаптивной вёрстки */}
            <div className="cartadapt">
                <div className="cartadapt__desc">
                    {productImages[0] && (
                        <img src={productImages[0].image} alt="Product" className='cart__left-img' />
                    )}
                    <div className="cartadapt__desc-left">
                        <p className="cartadapt__desc-left__price">
                            {finalPrice.toLocaleString()} so'm
                            {discount !== 0 && <span>-{discount}%</span>}
                        </p>
                        <p className="cartadapt__desc-left__title">{prod.product.name}</p>
                        <p className="cartadapt__desc-left__code">
                            Mahsulot kodi: {prod.product.product_code}
                        </p>
                    </div>
                </div>
                <div className="cartadapt__btns">
                    <input
                        type="checkbox"
                        className="cart__left-inp"
                        checked={isSelected}
                        onChange={() => toggleSelection(prod.id)}
                    />
                    <div className="cartadapt__btns-counter">
                        <button
                            onClick={handleDecrease}
                            className="min cart__right-counter__btn"
                        >
                            -
                        </button>
                        <p className="cart__right-counter__title">{counter}</p>
                        <button
                            onClick={handleIncrease}
                            className="plus cart__right-counter__btn"
                        >
                            +
                        </button>
                    </div>
                    <div onClick={removeItem} className="cartadapt__btns-del">
                        <img src={trash} alt="Удалить" />
                    </div>
                </div>
            </div>
        </>
    );
}
