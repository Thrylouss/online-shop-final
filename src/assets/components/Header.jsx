import React, { useState, useEffect } from 'react'
import locate from '../img/locateIcon.svg'
import inst from '../img/instagram.svg'
import fb from '../img/facebook.svg'
import tg from '../img/telegram.svg'
import menu from '../img/manu.svg'
import search from '../img/search.svg'
import acc from '../img/account.svg'
import baskett from '../img/baskett.svg'
import { Link } from 'react-router'
import srch from '../img/searchLupa.svg'
import men from '../img/men.svg'
import ChooseLang from './tools/ChooseLang'
import close from '../img/iks.svg'
import useAuthMe from "../../hooks/useAuthMe.jsx";
import { useTranslation } from 'react-i18next';
import useBasket from "../../hooks/useBasket.jsx";

export default function Header({ st, sfunc, state, func }) {
    const { t, i18n } = useTranslation();
    const { userMe } = useAuthMe();
    const { basket, fetchBasket } = useBasket()
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetchBasket()
        setCount(basket.length)
    }, [basket])

    return (
        <div className='header' data-aos='fade-down'>
            <div className="header__wrap">
                <div className="header__top">
                    <div className="container">
                        <div className="header__top-wrap">
                            <div className="header__top-locate">
                                <img src={locate} alt="" />
                                <p className='header__top-locate__text'>{t('country')}:</p>
                                <span className='header__top-locate__span'>{t('city')}</span>
                            </div>
                            <div className="header__top-nav">
                                <div className="header__top-nav__links">
                                    <a href="#"><img src={inst} alt="" /></a>
                                    <a href="#"><img src={fb} alt="" /></a>
                                    <a href="#"><img src={tg} alt="" /></a>
                                </div>
                                <div className="header__top-nav__number">
                                    <a className='header__top-nav__number-link' href='tel:+998 99 199 99 96'>+998 99 199 99 96</a>
                                </div>
                                <ChooseLang />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__main">
                    <div className="container">
                        <div className="header__main-wrap">
                            {st ? (<input type="text" className='header__main-inp' />) : <Link className='link' to='/'><h2 className='header__main-logo'>Logo company</h2></Link>}

                            <div className="header__main-center">

                                <Link to='/products' className='link'>
                                    <div className="header__main-center__categories">
                                        <img src={menu} alt="" />
                                        <p className="header__main-center__categories-text"> {t('categ')}</p>

                                    </div>
                                </Link>

                                <div className="header__main-center__search">
                                    <input onChange={(e) => {
                                        if (e.target.value == '') {
                                            sfunc(false)
                                            e.target.value = ''
                                        } else {
                                            sfunc(true)

                                        }
                                    }} type="text" className='header__main-center__search-input' placeholder={t('searchInput')} />

                                    <button className='header__main-center__search-button'><img src={search} alt="" /></button>
                                </div>

                            </div>
                            <div className="header__main-nav">


                                <Link className='link' to='/account/profile'>
                                    <div className="header__main-nav__elem">
                                        <img src={acc} alt="" />
                                        {userMe ? (<p className='header__main-nav__elem-text'>
                                            {t('account')}
                                        </p>) : (<p className='header__main-nav__elem-text'>
                                            {t('enter')}
                                        </p>)}

                                    </div>
                                </Link>

                                <Link className='link' to='/cart'>
                                    <div className="header__main-nav__elem">
                                        <img src={baskett} alt="" />
                                        <p className='header__main-nav__elem-text'>{t('cart')}</p>
                                        {count != 0 ? (
                                            <div className="header__main-nav__elem-span">
                                                {count}
                                            </div>
                                        ) : ('')}

                                    </div>
                                </Link>
                            </div>
                            <div className="header__main-adaptive">
                                <button onClick={() => {
                                    sfunc(true)
                                    func(false)
                                }} className='header__main-adaptive__btn'>
                                    <img src={srch} alt="" />
                                </button>
                                <button className='header__main-adaptive__btn'>

                                    {state || st ? (
                                        <img src={close} alt="" onClick={() => {
                                            func(false)
                                            sfunc(false)
                                        }} />
                                    ) : (<img src={men} alt="" onClick={() => {
                                        func(true)
                                    }} />)}


                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
