import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';
import img1 from '../../images/banner1.jpg'
import img2 from '../../images/banner2.jpg'
import img3 from '../../images/banner3.jpg'
import img4 from '../../images/banner4.jpg'
import img5 from '../../images/banner5.jpg'
import './index.css'
 const Homeslider = () => {
  return (
    
<Swiper spacebetween={5}
  navigation={true}
  modules={[Navigation,Autoplay]}
    autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
  className="w-full h-[400px] rounded-s-full "
>
  <SwiperSlide className="w-full h-full ">
    <img
      src={img1}
      alt="Image 1"
      className="w-full h-[350px] object-cover rounded-s-full "
    />
  </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <img
            src={img2}
            alt="Image 2"
            className="w-full h-[350px] object-cover rounded-s-full "
          />
        </SwiperSlide>
          <SwiperSlide className="w-full h-full">
          <img
            src={img3}
            alt="Image 3"
            className="w-full h-full object-cover rounded-s-full "
          />
        </SwiperSlide>
          <SwiperSlide className="w-full h-full">
          <img
            src={img4}
            alt="Image 4"
            className="w-full h-full object-cover rounded-s-full "
          />
        </SwiperSlide>
          <SwiperSlide className="w-full h-full">
          <img
            src={img5}
            alt="Image 5"
            className="w-full h-full object-cover rounded-s-full "
          />
        </SwiperSlide>
      </Swiper>
  )
}
export default Homeslider;
