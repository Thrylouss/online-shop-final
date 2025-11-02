import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";

const useBasket = () => {
    const [basket, setBasket] = useState([]); // Состояние для хранения новостей
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); 

    const fetchBasket = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/basket/my-basket/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }); 
            setBasket(response.data); 
            setLoading(false); 
        } catch (error) {
            setError(error); 
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchBasket();
    }, []); 

    return { basket, fetchBasket, loading, error }; 
};

export default useBasket;
