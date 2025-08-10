import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";
import i18n from "../i18n";
import { withLang } from "../utils/withLang"; // утилита добавления языка

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ useMemo нужен для отслеживания изменений языка
    const langParams = useMemo(() => withLang(), [i18n.language]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const queryString = new URLSearchParams(langParams).toString();
                const response = await axios.get(`${API_BASE_URL}/categories/?${queryString}`);
                setCategories(response.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [langParams]); // рефетч при смене языка

    return { categories, loading, error };
};

export default useCategories;
