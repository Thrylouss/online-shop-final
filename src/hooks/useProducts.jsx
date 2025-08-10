import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig.js";
import i18n from "../i18n"; // Для доступа к текущему языку
import { withLang} from "../utils/withLang.js";

const useProducts = (queryParams = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(queryParams.page || 1);

    // ✅ Генерируем параметры фильтра с учётом языка
    const filters = useMemo(() => {
        return withLang(queryParams);
    }, [JSON.stringify(queryParams), i18n.language]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const queryString = new URLSearchParams(filters).toString();
                const response = await axios.get(`${API_BASE_URL}/products/?${queryString}`);

                setProducts(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage(filters.page || 1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    return { products, loading, error, nextPage, prevPage, currentPage, setCurrentPage };
};

export default useProducts;
