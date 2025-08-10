import React, { useEffect, useState } from 'react'
import langImg from '../../img/langBlue.svg'
import arrow from '../../img/arrowBlue.svg'
import '../../scss/langL.scss'
import { useTranslation } from 'react-i18next';

export default function ChooseLang() {
    const { t, i18n } = useTranslation();
    const [isActive, setIsActive] = useState(true)
    const [pos, setPos] = useState(false)
    const [lang, setLang] = useState(i18n.language)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className="langl__wrap" onClick={() => { setIsActive(!isActive) }}>
            <div className="langl">
                <img src={langImg} alt="" />
                <p className='langl-txt'>
                   
                    {i18n.language}
                    <img src={arrow} alt="" />
                </p>

            </div>
            <div onClick={(e) => {
                //скрывать/не скрывать после клика
                //e.stopPropagation()
                setPos(!pos)
                if (lang == 'ru')
                    setLang('uz')
                else if (lang == 'uz')
                    setLang('ru')

                changeLanguage(lang)

            }} className={isActive ? "langl__active la" : "langl__active"}>
                <div className="langl__active__wrap">
                    <p className={i18n.language == 'uz' ? 'langl__active__text ltl' : 'langl__active__text'}>Uz</p>
                    <p className={i18n.language == 'ru' ? 'langl__active__text ltl' : 'langl__active__text'}>Py</p>
                    <div className={i18n.language == 'ru' ? "langl__active__tumb lr" : "langl__active__tumb"}>

                    </div>
                </div>
            </div>
        </div>



    )
}
