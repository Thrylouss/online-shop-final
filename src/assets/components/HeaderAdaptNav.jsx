import React from 'react'
import CategDropdown from './Categories/CategDropdown';
import useCategories from "../../hooks/useCategories.jsx";
import ChooseLang from './tools/ChooseLangLight.jsx'
import { useTranslation } from 'react-i18next';
import insta from '../img/instagram.svg'
import fc from '../img/facebook.svg'
import tg from '../img/telegram.svg'


export default function HeaderAdaptNav() {
  const { categories } = useCategories();
  const { t } = useTranslation()
  return (
    <div className='headernav'>
      <div className="container">
        <div className="headernav__wrap">
          <div className="headernav__top">
            <h3 className='headernav__title'>{t("categories")}</h3>
            <div className="headernav__list">
              {categories.map((e, i) => (
                <CategDropdown categ={e} key={i} />

              ))}
            </div>
          </div>
          <div className="headernav__btm">
            <div className="headernav__btm-list">
              <img src={insta} alt="" />
              <img src={fc} alt="" />
              <img src={tg} alt="" />


            </div>
            <ChooseLang />

          </div>
        </div>

      </div>
    </div>
  )
}
