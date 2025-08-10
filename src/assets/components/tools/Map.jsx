import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    useEffect(() => {
        const map = L.map("map", {
            center: [41.317136, 69.302056], // Координаты центра
            zoom: 15,
            zoomControl: false, // Убираем кнопки зума
            attributionControl: false, // Убираем логотип OSM
            scrollWheelZoom: false, // Отключаем зум колесом мыши
        });

        // Подключение Mapbox с кастомным стилем
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([41.317136, 69.302056]) // Маркер
            .addTo(map)
            .bindPopup("imaj")


        return () => map.remove(); // Очищаем карту при размонтировании
    }, []);

    return <div id="map" className='footer__main-map__frame' />;
};

export default MapComponent;
