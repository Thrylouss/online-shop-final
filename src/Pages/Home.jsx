import React from 'react'
import Slides from '../components/Slides.jsx'
import Categories from '../components/Categories/Categories.jsx'
import Products from '../components/Products/Products.jsx'
import sldimg from '../img/slideImg.png'
import useNews from "../../hooks/useNews.jsx";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t, i18n } = useTranslation();
    const { news } = useNews()


    return (
        <>
            <Slides info={news} type='first' />
            <Categories />
            <Products title={t('allProds')} />
            <Slides info={news} type='second' />

            <Products title={t('specialOffer')} />
        </>

    )
}
