import React, { useState, useEffect } from "react";
import ArrowDownBlue from "../../img/ArrowDownBlue.svg";
import filter from "../../img/filter.svg";
import close from "../../img/iks.svg";
import CategDropdown from "../Categories/CategDropdown";
import "../../scss/prodsMainAdapt.scss";
import { useTranslation } from "react-i18next";

export default function ProdsMainAdapt({
    categs = [],
    filters = {},
    activeStatus,
    setActiveStatus,
    handleChange = () => { },
    setFilters
}) {
    const { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState(false); // отвечает за выпадалку Barchasi/.../Yangilik
    const [filt, setFilt] = useState(false);     // отвечает за выезжающую панель "Фильтры"
    const [text, setText] = useState(t("all"));
    // Общая функция для переключения статуса
    const handleStatusChange = (newStatus, label) => {
        // Закрываем выпадашку
        setIsOpen(false);
        // Ставим текст на кнопке (Barchasi, Mahsus taklif, Yangilik)
        setText(label);
        // Меняем локальный стейт для фильтрации
        setActiveStatus(newStatus);

        // Если хотите, чтобы ещё и сервер знал о статусе,
        // вы можете параллельно вызвать handleChange:
        // (например, говорим серверу, что "offer_type" = newStatus)
        handleChange({
            target: {
                name: "offer_type",
                // когда newStatus === "all", можно передать "" или "all",
                // зависит от того, что ваш бэкенд принимает
                value: newStatus === "all" ? "" : newStatus,
            },
        });
    };
    useEffect(() => {
    
    setText(t("all"))
    }, [t("all")])
    

    const handleClick = () => {
        // Сбрасываем все поля в filters
        setFilters({
            subcategory: '',
            min_price: '',
            max_price: '',
            search: '',
            page: 1,
        });
        // Ставим локальный статус на 'all'
        setActiveStatus('all');
        // ВОТ СЮДА добавляем сброс текста на "Barchasi"
        setText('Barchasi');
    };


    return (
        <>
            {/* Кнопка «Фильтры» + Кнопка «Barchasi/.../Yangilik» */}
            <div className="pradapt">
                <button className="pradapt-btn" onClick={() => setFilt(true)}>
                    <img src={filter} alt="" />
                    <p className="pradapt-btn__text">{t("filters")}</p>
                </button>

                <div className="pradapt-all">
                    <button className="pradapt-btn" onClick={() => setIsOpen(!isOpen)}>
                        <p className="pradapt-btn__text">{text}</p>
                        <img src={ArrowDownBlue} alt="" />
                    </button>

                    {isOpen && (
                        <div className="pradapt-all__content">
                            <p
                                className="pradapt-all__content-text"
                                onClick={() => handleStatusChange("all", t("all"))}
                            >
                                {t("all")}
                            </p>
                            <p
                                className="pradapt-all__content-text"
                                onClick={() => handleStatusChange("mahsus_taklif", t("specialOffer"))}
                            >
                                {t("specialOffer")}
                            </p>
                            <p
                                className="pradapt-all__content-text"
                                onClick={() => handleStatusChange("yangilik", t("newProd"))}
                            >
                                {t("newProd")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <p className='pradapt__clear' onClick={handleClick}>
                {t("clear")}
            </p>

            {/* Мобильная панель «Фильтры» */}
            {filt && (
                <div className="filt">
                    <div className="filt__wrap">

                        <div className="filt__name">
                            <p className="filt__name-text">{t("filters")}</p>
                            <img onClick={() => setFilt(false)} src={close} alt="" />
                        </div>

                        {/* Блок выбора категорий */}
                        <div className="filt__top">
                            <p className="filt__title">{t("categories")}</p>
                            <div className="filt__top-cat">
                                {categs.map((cat, i) => (
                                    <CategDropdown
                                        key={i}
                                        categ={cat}
                                        filters={filters}
                                        handleChange={handleChange}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Диапазон цен */}
                        <div className="filt__bottom">
                            <p className="filt__bottom-title">{t("price")}, {t("value")}</p>
                            <div className="filt__inputs">
                                <input
                                    type="number"
                                    min="100"
                                    name="min_price"
                                    placeholder={t("from")}
                                    value={filters.min_price || ""}
                                    onChange={handleChange}
                                    className="filt__inputs-inp"
                                />
                                <input
                                    type="number"
                                    min="101"
                                    name="max_price"
                                    placeholder={t("to")}
                                    value={filters.max_price || ""}
                                    onChange={handleChange}
                                    className="filt__inputs-inp"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
