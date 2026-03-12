import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
const Homecatslider = () => {
  return (
    <div className='homecatslider w-full p-3 bg-gray-100 '>
        <div className='container'>

         <Swiper
        slidesPerView={7}
        w-rap={true}
        spaceBetween={15}
       navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
           <a href="#"> 
            <div className='item1 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://png.pngtree.com/png-vector/20241009/ourmid/pngtree-white-shirt-on-transparent-background-png-image_14018439.png" alt="Fashion"  className="transform hover:scale-105 transition duration-300 h-[135px]"/>
                <h3 className='text-[15px] font-bold  '>Fashion</h3> 
                </div>
                </a>
        </SwiperSlide>
               <SwiperSlide>
           <a href="#"> 
            <div className='item2 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RnrYFJ6qXOI1cGD4FMU2iBZbYqRBzvOX5g&s" alt="Electronics" className="transform hover:scale-105 transition duration-300 h-[135px]" />
                <h3 className='text-[15px] font-bold  '>Electronics</h3> 
                </div>
                </a>
        </SwiperSlide>
                <SwiperSlide>
           <a href="#"> 
            <div className='item3 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://image-cdn.ubuy.com/small-crossbody-bags-shoulder-bag-for/400_400_100/6941886ac385a4d42a04beaa.jpg" alt="Bag" className="transform hover:scale-105 transition duration-300" />
                <h3 className='text-[15px] font-bold  '>Bags</h3> 
                </div>
                </a>
        </SwiperSlide>
                <SwiperSlide>
           <a href="#"> 
            <div className='item4 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://i5.walmartimages.com/seo/Hollow-Out-Women-s-Ladies-Mesh-Shoes-Sneakers-Footwear-Flat-Breathable-Shoes_cda7504c-8415-4a2a-ac75-b382a78414d5.1ccd9549b56f3dbd9865d88f643c9698.jpeg" alt="Footwear" className="transform hover:scale-105 transition duration-300" />
                <h3 className='text-[15px] font-bold  '>Footwear</h3> 
                </div>
                </a>
        </SwiperSlide>
                <SwiperSlide>
           <a href="#"> 
            <div className='item5 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://img.freepik.com/free-vector/colorful-grocery-box-with-fresh-produce-goods_1308-182118.jpg?semt=ais_user_personalization&w=740&q=80" alt="Groceries" className="transform hover:scale-105 transition duration-300 h-[135px]" />
                <h3 className='text-[15px] font-bold  '>Groceries</h3> 
                </div>
                </a>
        </SwiperSlide>
                <SwiperSlide>
           <a href="#"> 
            <div className='item6 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3yxiEPKDw5nBD6y3B6XtFGb4u2bKKl-f_gw&s" alt="Beauty" className="transform hover:scale-105 transition duration-300" />
                <h3 className='text-[15px] font-bold  '>Beauty</h3> 
                </div>
                </a>
        </SwiperSlide>
                <SwiperSlide>
           <a href="#"> 
            <div className='item7 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa5UxW0ebwu34jpAo2SB2Id0u7a6HpdiLFNA&s" alt="Wellness" className="transform hover:scale-105 transition duration-300 h-[135px]" />
                <h3 className='text-[15px] font-bold  '>Wellness</h3> 
                </div>
                </a>
        </SwiperSlide>
            <SwiperSlide>
           <a href="#"> 
            <div className='item8 bg-white justify-center items-center flex flex-col rounded-sm '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNCF5PyXkfuoUIkpJouVYzxNrmQH457lwmg&s" alt="Jewellery" className="transform hover:scale-105 transition duration-300" />
                <h3 className='text-[15px] font-bold  '>Jewellery</h3> 
                </div>
                </a>
        </SwiperSlide>
        
      </Swiper>
    

        </div>
    </div>
  )
}
export default Homecatslider;
