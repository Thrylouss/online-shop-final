import React from "react";
import { Navigate } from "react-router-dom";
import useAuthMe from "../hooks/useAuthMe.jsx";
import '../assets/scss/loading.scss'

const ProtectedRoute = ({ children }) => {
    const { userMe, error, loading } = useAuthMe();
    if (loading) {
        return <div className="loading">
            <div className="i"></div>
            <div className="a"></div>
            <div className="u"></div>
        </div>;
    }

    if (error || !userMe) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;
