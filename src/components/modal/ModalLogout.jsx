import { useTranslation } from 'react-i18next'
import '../../styles/scss/vendors/modal.scss'

export default function ModalLogout({ isOpen, func }) {
    const { t } = useTranslation()
    return (
        <div className='modal'>
            <div className="modal__wrap">
                <h1 className='modal__title'>{t("logout")}</h1>
                <div className="modal__button">
                    <button className='modal__button-no' onClick={() => {
                        isOpen(false)
                    }}>{t("no")}
                    </button>
                    <button className='modal__button-yes' onClick={() => {
                        func()
                        isOpen(false)
                    }}>{t("yes")}
                    </button>
                </div>

            </div>
        </div>
    )
}
