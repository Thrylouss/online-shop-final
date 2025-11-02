import bag from '../../assets/img/bag.png'
import '../../styles/scss/components/noprods.scss'
import { useTranslation } from 'react-i18next'

export default function NoProds() {
    const {t, i18n} = useTranslation()
    return (
        <div className='noprod'>
            <img src={bag} alt="" />
            <div className="noprod__desc">
                <p className='noprod__title'>{t("emptyCart")}</p>
                <p className='noprod__text'>{t("emptyCartText")}</p>

            </div>
        </div>
    )
}
