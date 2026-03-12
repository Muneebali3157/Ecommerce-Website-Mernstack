import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import Bannerbox from '../bannerbox';
import banner1 from '../../images/img1.jpg';

import banner2 from '../../images/img2.jpg';

import banner3 from '../../images/img3.jpg';

 const Addbannerslider = (props) => {
  return (
   <>
    <Swiper
           slidesPerView={props.items}
         loop={true}
           spaceBetween={15}
          navigation={false}
           modules={[Navigation]}
           className="mySwiper my-5 flex items-center justify-start w-full max-w-6xl mx-auto "
        >
            <SwiperSlide>
            <Bannerbox img={banner1}/>
            </SwiperSlide>
            <SwiperSlide>
            <Bannerbox img={banner2}/>
            </SwiperSlide>
            <SwiperSlide>
            <Bannerbox img={banner3}/>
            </SwiperSlide>
            
         </Swiper>

   </>
  )
}
export default Addbannerslider;
