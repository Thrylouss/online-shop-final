import React from "react";
import { Navigate } from "react-router-dom";
import useAuthMe from "../hooks/useAuthMe.jsx";
import '../assets/scss/loading.scss'

const ProtectedRoute = ({ children }) => {
    const { userMe, error, loading } = useAuthMe();

    // Пока грузим информацию о пользователе, можем отобразить спиннер или скелетон:
    if (loading) {
        return <div className="loading">
            <div className="i"></div>
            <div className="a"></div>
            <div className="u"></div>
        </div>;
    }

    // Если есть ошибка, или userMe так и не загрузился (=== null),
    // то перенаправляем на страницу авторизации:
    if (error || !userMe) {
        return <Navigate to="/auth" replace />;
    }

    // Если всё ок (userMe есть, нет ошибки), рендерим дочерние компоненты
    return children;
};

export default ProtectedRoute;
