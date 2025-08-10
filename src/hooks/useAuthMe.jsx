import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";

const useAuthMe = () => {
    const [userMe, setUserMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const fetchUserMe = useCallback(async () => {
        if (!token) {
            setUserMe(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/users/me/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserMe(response.data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 401) {
                // Очищаем токен, если получен 401
                localStorage.removeItem('token');
                setUserMe(null);
            }
            setError(err);

            // Отключаем вывод в консоль
            // (axios сам логирует ошибки, но мы игнорируем их)
        } finally {
            setLoading(false);
        }


    }, [token]);

    useEffect(() => {
        fetchUserMe();
    }, [fetchUserMe]);

    return { userMe, loading, error, refetch: fetchUserMe };
};

export default useAuthMe;
