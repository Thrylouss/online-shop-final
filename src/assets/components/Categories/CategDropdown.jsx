import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import "../../scss/categDropdown.scss";
import useSubCategories from "../../../hooks/useSubCategories.jsx";

export default function CategDropdown({ categ, filters, handleChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const { subcategories } = useSubCategories({ category_id: categ.id });

    const handleSubCategoryClick = (subcategoryId) => {
        handleChange({ target: { name: "subcategory", value: subcategoryId } });
    };

    return (
        <div className="cat">
            {/* Проверяем, что категория не является подкатегорией (главная категория) */}
            {!categ.subcategory && (
                <>
                    <p
                        onClick={() => setIsOpen(!isOpen)}
                        className="cat__title"
                    >
                        {categ.name}
                        <ChevronDown
                            className={isOpen ? "cat__active" : "cat__chevron"}
                            size={20}
                        />
                    </p>

                    {/* Показываем подкатегории при раскрытии */}
                    {isOpen && subcategories.length > 0 && (
                        <div className="cat__cont">
                            {subcategories.map((sub, i) => (
                                <p
                                    key={sub.id}
                                    className="cat__text"
                                    onClick={() => handleSubCategoryClick(sub.id)}
                                >
                                    {sub.name}
                                </p>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
