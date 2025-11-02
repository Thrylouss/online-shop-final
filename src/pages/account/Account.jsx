import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import { useState } from 'react'
import Nav from '../../components/media/Nav.jsx'
import '../../styles/scss/pages/account.scss'
import API_BASE_URL from "../../apiConfig.js";
import { t } from 'i18next';
import ModalLogout from '../../components/modal/ModalLogout.jsx';

export default function Account() {
    const [res, setRes] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [navInfo, setNavInfo] = useState({
        title: t("myPage"),
        nav: false,
        current: t("myPage"),
        newStatus: false,
    })

    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_BASE_URL}/auth/token/logout/`,
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.removeItem("token");
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='account'>
                <Nav info={navInfo} status={false} />

                <div className="account__wrap">
                    <div className="account__nav">
                        <NavLink className={({ isActive }) => (isActive ? " account__nav-elem active" : "account__nav-elem")} to='profile'>{t("myPage")}</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? " account__nav-elem active" : "account__nav-elem")} to='orders'>{t("ordersStory")}</NavLink>
                        <p className='account__nav-exit ' onClick={() => { setIsOpen(true) }}>{t("exit")}</p>
                    </div>
                    <Outlet />


                </div>  
                {isOpen ? (<ModalLogout isOpen={setIsOpen} func={handleClick} />) : ('')}
            </div>

          


        </>
    )
}
