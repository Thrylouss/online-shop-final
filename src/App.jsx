import { useState, useEffect, Suspense } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { HashRouter, useRoutes } from "react-router-dom";
import routes from "./Routes.jsx";
import './assets/scss/main.scss';
import Header from './assets/components/Header'
import Footer from './assets/components/Footer.jsx'
import MediaNav from './assets/components/MediaNav.jsx';
import ScrollToTop from './assets/components/tools/ScrollToTop.jsx'
import HeaderAdaptNav from './assets/components/HeaderAdaptNav.jsx';
import Search from './assets/components/Search.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  const [isSearch, setIsSearch] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 200,
      delay: 100,
      once: false,
    });
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-state", isOpen);
    window.scrollTo(0, 0);
    return () => document.body.removeAttribute("data-state");
  }, [isOpen]);

  useEffect(() => {
    document.body.setAttribute("data-state", isSearch);
    window.scrollTo(0, 0);
    return () => document.body.removeAttribute("data-state");
  }, [isSearch]);

  return (
      <>
        <HashRouter>
          <ScrollToTop />
          <Header st={isSearch} sfunc={setIsSearch} state={isOpen} func={setIsOpen} />
          {isOpen && <HeaderAdaptNav />}
          {isSearch && <Search />}

          <div className="container">
            <Suspense>
              <AppRoutes />
            </Suspense>
          </div>

          <Footer />
          <MediaNav />
        </HashRouter>

        <ToastContainer />
      </>
  )
}

export default App;
