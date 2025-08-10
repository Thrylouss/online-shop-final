import React from 'react'
import bag from '../../img/bag.png'
import '../../scss/noprods.scss'
import { useTranslation } from 'react-i18next'

export default function NoOrders() {
    const {t, i18n} = useTranslation()
    return (
        <div className='noprod'>
            <img src={bag} alt="" />
            <div className="noprod__desc">
                <p className='noprod__title'>{t("emptyOrders")}</p>

            </div>
        </div>
    )
}
