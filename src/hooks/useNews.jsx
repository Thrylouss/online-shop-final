import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";
import i18n from "../i18n";
import { withLang } from "../utils/withLang"; // подключаем утилиту

const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ следим за изменением языка
    const langParams = useMemo(() => withLang(), [i18n.language]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const queryString = new URLSearchParams(langParams).toString();
                const response = await axios.get(`${API_BASE_URL}/news/?${queryString}`);
                setNews(response.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [langParams]); // автоматически обновится при смене языка

    return { news, loading, error };
};

export default useNews;
