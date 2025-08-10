import React, { useEffect, useState } from "react";
import "../../scss/prodsMain.scss";
import ProductCard from "./ProductCard";
import arrowRblack from "../../img/arrowRblack.svg";
import ProdsMainAdapt from "./ProdsMainAdapt";
import CategDropdown from "../Categories/CategDropdown.jsx";
import { useTranslation } from "react-i18next";

export default function ProdsMain({ products, categories, handleChange, filters, nextPage, prevPage, currentPage,
                                      setCurrentPage, activeStatus, setActiveStatus, setFilters }) {
    const [subCategories, setSubCategories] = useState([]);
const {t, i18n} = useTranslation()
    useEffect(() => {
        setSubCategories(categories);
    }, [categories]);

    // Функция для изменения страницы
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        handleChange({ target: { name: "page", value: newPage } });
    };

    return (
        <div className="main">
            <ProdsMainAdapt
                categs={categories}
                filters={filters}
                handleChange={handleChange}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                setFilters={setFilters}
            />


            <div className="main__wrap">
                <div className="main__left">
                    <div className="main__left-categories">
                        <p className="main__left-categories__title">{t('categories')}</p>
                        <div className="main__left-categories__nav">
                            {subCategories.map((e, i) => (
                                <CategDropdown key={i} categ={e} filters={filters} handleChange={handleChange} />
                            ))}
                        </div>
                    </div>
                    <div className="main__left-filter">
                        <p className="main__left-filter__title">{t("price")}, {t("value")}</p>
                        <div className="main__left-filter__inputs">
                            <input
                                type="number"
                                min="100"
                                name="min_price"
                                placeholder={t("from")}
                                value={filters.min_price}
                                onChange={handleChange}
                                className="main__left-filter__inputs-inp"
                            />
                            <input
                                type="number"
                                min="10000"
                                name="max_price"
                                placeholder={t("to")}
                                value={filters.max_price}
                                onChange={handleChange}
                                className="main__left-filter__inputs-inp"
                            />
                        </div>
                    </div>
                </div>
                <div className="main__products">
                    <div className="main__products-grid">
                        {products.map((e, i) => (
                            <ProductCard info={e} key={i} />
                        ))}
                    </div>

                    {/* Пагинация от DRF */}
                    <div className="main__products-pagination">
                        <button
                            className="main__products-pagination__btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!prevPage}
                        >
                            <img src={arrowRblack} alt="" style={{transform: 'rotate(180deg)'}}/>
                        </button>

                        <p className="main__products-pagination__num active">{currentPage}</p>

                        <button
                            className="main__products-pagination__btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!nextPage}
                        >
                            <img src={arrowRblack} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
