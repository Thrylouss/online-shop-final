import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import home from '../img/home.svg'
import cart from '../img/cart.svg'
import acc from '../img/acc.svg'
import search from '../img/lupa.svg'
import '../scss/mediaNav.scss'
import { useTranslation } from 'react-i18next';
import useBasket from "../../hooks/useBasket.jsx";
import useAuthMe from "../../hooks/useAuthMe.jsx";
export default function MediaNav() {
    const { t, i18n } = useTranslation()
    const { basket, fetchBasket } = useBasket()
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetchBasket()
        setCount(basket.length)

    }, [basket])
    const { userMe } = useAuthMe();
    return (
        <div className='media'>
            <div className="media__wrap">
                <NavLink className={({ isActive }) => (isActive ? "media__link choosen" : "media__link")} to='/'><img src={home} /><p className='media__link-text'>{t("mainPage")}</p></NavLink>
                <NavLink className={({ isActive }) => (isActive ? "media__link choosen" : "media__link")} to='/products'><img src={search} /><p className='media__link-text'>{t("searchInput")}</p></NavLink>
                <NavLink className={({ isActive }) => (isActive ? "media__link choosen" : "media__link")} to='/cart'><img src={cart} /><p className='media__link-text'>{t("cart")} </p> {count != 0 ? (
                    <span>{count}</span>
                ) : ('')}</NavLink>
                <NavLink className={({ isActive }) => (isActive ? "media__link choosen" : "media__link")} to='/account/profile'><img src={acc} /><p className='media__link-text'>{userMe ? t("account") : t("enter")}</p></NavLink>
            </div>
        </div>
    )
}
