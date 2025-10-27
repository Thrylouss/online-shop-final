import Nav from '../components/Nav'
import Cart from '../components/Cart/Basket'
import NoProds from '../components/Cart/NoProds.jsx'
import useBasket from "../../hooks/useBasket.jsx";
import { useTranslation } from 'react-i18next';


export default function Basket() {
    const { basket, fetchBasket } = useBasket()
    const { t, i18n } = useTranslation()
    const navInfo = {
        title: t("myCart"),
        total: basket.length,
    }

    return (
        <>
            <Nav info={navInfo} status={false} />

            {basket && basket.length ? (
                <Cart products={basket} change={fetchBasket} />

            ) : (<NoProds />)}
        </>


    )
}
