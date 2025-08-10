import React, { useState } from 'react'
import FormCity from './tools/FormCity'
import img from '../img/formImg.png'
import '../scss/form.scss'
import Input from '../components/Input'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../scss/tost.scss'
import galka from '../img/toast.svg'
import iks from '../img/declined.svg'
import { useTranslation } from 'react-i18next'

export default function Form() {
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const { t, i18n } = useTranslation()
    const [userCity, setUserCity] = useState('Toshkent')
    const cities = [
        "Toshkent", "Toshkent viloyati", "Samarqand", "Farg’ona", "Buxoro", "Xorazm",
        "Andijon", "Navoiy", "Qashqadaryo", "Jizzax", "Surxondaryo", "Namangan", "Sirdaryo", "Xiva"
    ];

    const handleSend = async () => {
        if (name !== '' && tel.length === 17 && userCity != null) {
            const botToken = '8139440344:AAERuskhG8X2Ed-YdR8171JsTT5xXMYiD00';
            const chatId = '-1002689018491'; // Пример: -1001234567890
            const text = `📝 Новая заявка:\n👤 Имя: ${name}\n📞 Телефон: ${tel}\n📍 Город: ${userCity}`;

            try {
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text,
                        parse_mode: "HTML"
                    })
                });

                toast(
                    <div className='tost'>
                        <img src={galka} alt="Done" />
                        <span className='tost__text'>Успешно отправлено на проверку</span>
                    </div>,
                    {
                        style: {
                            width: '100%',
                            padding: '10px',
                            background: 'none',
                            boxShadow: 'none',
                        },
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeButton: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        icon: false
                    }
                );
            } catch (err) {
                console.error("Ошибка отправки в Telegram:", err);
                toast(
                    <div className='tost'>
                        <img src={iks} alt="Error" />
                        <span className='tost__text-red'>Ошибка при отправке. Попробуйте позже.</span>
                    </div>,
                    {
                        style: {
                            width: '100%',
                            padding: '10px',
                            background: 'none',
                            boxShadow: 'none',
                        },
                        autoClose: 3000,
                        closeButton: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        icon: false
                    }
                );
            }
        } else {
            toast(
                <div className='tost'>
                    <img src={iks} alt="Error" />
                    <span className='tost__text-red'>Заполнено с ошибкой, повторите попытку</span>
                </div>,
                {
                    style: {
                        width: '100%',
                        padding: '10px',
                        background: 'none',
                        boxShadow: 'none',
                    },
                    autoClose: 3000,
                    closeButton: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    icon: false
                }
            );
        }
    };

    return (
        <div className='form' >
            <div className="container">
                <div className="form__wrap">
                    <div className="form__desc">
                        <div className="form__desc-txts">
                            <h2 className='form__desc-txts__title'>{t('formTitle')}.</h2>
                            <p className='form__desc-txts__text'>{t('formText')}</p>
                        </div>
                        <div className="form__desc-main">

                            <input onChange={(e) => {
                                setName(e.target.value)
                                e.target.value = e.target.value.replace(/[^qwertyuiopasdfghjklzxcvbnm ]/gi, '');
                            }} type="text" placeholder={t('firstLastName')} className='form__desc-main__inp' />
                            <Input changeTel={setTel} />
                            <FormCity selected={setUserCity} array={cities} curr={userCity} />
                            <button className='form__desc-main__btn' onClick={handleSend}>{t('formBtn')}</button>

                        </div>

                    </div>
                    <div className="form__img">
                        <img src={img} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
