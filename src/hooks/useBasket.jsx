import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";

const useBasket = () => {
    const [basket, setBasket] = useState([]); // Состояние для хранения новостей
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    // Запрос на получение новостей
    const fetchBasket = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/basket/my-basket/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }); // Полный URL
            setBasket(response.data); // Сохраняем данные новостей
            setLoading(false); // Завершаем загрузку
        } catch (error) {
            setError(error); // Если произошла ошибка, сохраняем её
            setLoading(false); // Завершаем загрузку
        }
    };

    useEffect(() => {
        fetchBasket(); // Вызов функции для получения новостей
    }, []); // Пустой массив, чтобы запрос выполнялся один раз при монтировании компонента

    return { basket, fetchBasket, loading, error }; // Возвращаем данные, состояние загрузки и ошибки
};

export default useBasket;
