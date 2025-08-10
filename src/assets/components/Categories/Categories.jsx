import React from 'react'
import cat1 from '../../img/cat1.png'
import cat2 from '../../img/cat2.png'
import cat3 from '../../img/cat3.png'
import cat4 from '../../img/cat4.png'
import CategoryCard from './categoryCard'
import '../../scss/categories.scss'
import arrowR from '../../img/arrowR.svg'
import { Link } from 'react-router'
import useCategories from "../../../hooks/useCategories.jsx";
import useSubCategories from "../../../hooks/useSubCategories.jsx";
import { useTranslation } from 'react-i18next';


export default function Categories() {
    const { categories } = useCategories()
    const { t, i18n } = useTranslation();

    return (
        <div className='categories'>
                <div className="categories__top">
                    <h2 className='categories__title'>{t('categ')}.</h2>
                    <div className="categories__txt">
                        <Link to='/products' className='link'>
                            <p className='categories__text'>{t('all')} </p>

                        </Link>
                        <img src={arrowR} alt="" />
                    </div>
                </div>
                <div className="categories__wrap">
                    {categories
                        .slice(0, 4)
                        .map((item, i) => (
                            <Link className='link' key={i} to='/products'>
                                <CategoryCard info={item} />
                            </Link>
                        ))
                    }
                </div>
        </div>
    )
}
