import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка страницы наверх
  }, [location]); // Будет срабатывать при изменении маршрута

  return null; // Ничего не рендерим, просто вызываем эффект
};

export default ScrollToTop;
