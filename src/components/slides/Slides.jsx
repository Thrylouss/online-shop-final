import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from 'swiper/modules';
import { Autoplay } from "swiper/modules";
import Slide from './Slide.jsx'
import '../../styles/scss/components/slide.scss'

export default function Slides({ info, type }) {
    if (type === "first"){
        info = info.filter(item => item.new_type === "first")
    }
    else if (type === "second"){
        info = info.filter(item => item.new_type === "second")
    }

    return (
        <div>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{ clickable: true }}
            >
                {info && info.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Slide img={slide.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
