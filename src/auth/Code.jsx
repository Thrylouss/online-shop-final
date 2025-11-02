import React, { useState, useEffect } from 'react';
import CodeInput from './CodeInput';
import '../../scss/code.scss';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../apiConfig.js';
import { useTranslation } from 'react-i18next';
export default function Code({ title, setCurrent, setBack, phone, fullName }) {
    const [code, setCode] = useState(Array(6).fill(""));
    const [error, setError] = useState("");
    const [resendTimeout, setResendTimeout] = useState(120); // 120 секунд перед повторной отправкой кода
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const { i18n, t } = useTranslation()
    useEffect(() => {
        // Включаем кнопку "назад"
        setBack(true);
        // Устанавливаем заголовок
        title(t('enterCode'));

        // Таймер обратного отсчёта
        if (isResendDisabled) {
            const timer = setInterval(() => {
                setResendTimeout((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isResendDisabled, setBack, title]);

    // Нажатие на «Подтвердить»
    const handleVerifyCode = async () => {
        try {
            const formattedCode = code.join(""); // Собираем 6 символов

            // Проверяем, что все 6 символов введены
            if (formattedCode.length < 5) {
                setError("Kod to'liq kiritilmagan!");
                return;
            }

            // Убираем все пробелы и «+» из номера
            let cleanPhone = phone.replace(/\s/g, "");
            cleanPhone = cleanPhone.replace(/\+/g, "");

            console.log(formattedCode)

            // Отправляем запрос на верификацию
            const response = await fetch(`${API_BASE_URL}/auth/verify-code/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: cleanPhone,  // без «+»
                    code: formattedCode,
                    full_name: fullName,
                })
            });

            // Если сервер вернул ошибку
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Noto'g'ri kod!");
                return;
            }

            // Успех
            const data = await response.json();
            console.log("verify-code response:", data);

            // Сохраняем токен
            localStorage.setItem('token', data.access);

            // Переходим на страницу профиля
            navigate('/account/profile');

            setError("");
            setCurrent("success");

        } catch (err) {
            console.error("Xatolik:", err);
            setError("Server xatosi! Keyinroq urinib ko‘ring.");
        }
    };

    // Нажатие на «Код повторно»
    const handleResendCode = async () => {
        try {
            setIsResendDisabled(true);
            setResendTimeout(120);

            // Снова чистим номер
            let cleanPhone = phone.replace(/\s/g, "");
            cleanPhone = cleanPhone.replace(/\+/g, "");

            const response = await fetch(`${API_BASE_URL}/auth/send-code/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cleanPhone })
            });

            if (!response.ok) {
                setError("Kodni qayta yuborishda xatolik!");
                return;
            }

            setError("");
        } catch (error) {
            setError("Tarmoq xatosi! Keyinroq urinib ko‘ring.");
        }
    };

    return (
        <div className="code__wrap">
            <div className="code__top">
                <p className="code__top-text">
                    {t("weSent6digitCode")}
                </p>
                <CodeInput code={code} setCode={setCode} length={6} />
            </div>

            {error && <p className="code__error">{error}</p>}
            <a target='_blank' href='https://t.me/online_shop_confirm_bot' className='code__bot'>{t("tgBot")}</a>
            <button className="code__btn" onClick={handleVerifyCode}>
                {t("verify")}
            </button>

            <p className="code__info">
                {t('ifNoCode')} {resendTimeout} {t('receiveInSecs')}
            </p>

            <button
                className="code__btn"
                onClick={handleResendCode}
                disabled={isResendDisabled}
            >
                {isResendDisabled
                    ? `${t('reSend')} ${resendTimeout}${t('s')}`
                    : t('reSent')
                }
            </button>
        </div>
    );
}
