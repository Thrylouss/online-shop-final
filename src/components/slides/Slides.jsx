import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Slide from "./Slide.jsx";
import "../../styles/scss/components/slide.scss";

export default function Slides({ info, type }) {
  if (type === "first") {
    info = info.filter((item) => item.new_type === "first");
  } else if (type === "second") {
    info = info.filter((item) => item.new_type === "second");
  }

  return (
    <div className="container">
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
        className="slide"
      >
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
            alt="svagger 1"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
            alt="swagger"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/101/380/61/cat-animals-bokeh-cute-wallpaper-preview.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/440/12/60/nature-hd-for-pc-download-1920x1080-wallpaper-preview.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/101/380/61/cat-animals-bokeh-cute-wallpaper-preview.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/611/154/459/widescreen-high-resolution-nature-hd-1920x1080-wallpaper-preview.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
