import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HeaderAdaptNav from "./components/header/HeaderAdaptNav";
import Footer from "./components/footer/Footer";
import MediaNav from "./components/media/MediaNav.jsx";
import ProtectedRoute from "./context/ProtectedRoute";
import Auth from "./auth/Auth";
import {
  Account,
  Basket,
  Home,
  NotFoundPage,
  Products,
  SingleProduct,
} from "./pages";
import "./styles/scss/main.scss";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header
        st={isSearch}
        sfunc={setIsSearch}
        state={isOpen}
        func={setIsOpen}
      />
      {/* <HeaderAdaptNav /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <MediaNav />

      <ToastContainer />
    </>
  );
}

export default App;
