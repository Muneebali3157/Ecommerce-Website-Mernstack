import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

const ProductSlider = ({ items, category, onProductClick }) => {

   const products = [
    /* HOME - Modern & Stylish Home Products */
    { id:1, category:"home", title:"Modern Table Lamp", price:"19.99", img:"https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:2, category:"home", title:"Comfort Armchair", price:"39.99", img:"https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:3, category:"home", title:"Wood Coffee Table", price:"59.99", img:"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:4, category:"home", title:"Luxury Sofa", price:"99.99", img:"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:5, category:"home", title:"Wall Clock", price:"14.99", img:"https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* FASHION - Trendy Fashion Items */
    { id:6, category:"fashion", title:"Men Stylish T-Shirt", price:"29.99", img:"https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:7, category:"fashion", title:"Women Red Dress", price:"49.99", img:"https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:8, category:"fashion", title:"Winter Jacket", price:"79.99", img:"https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:9, category:"fashion", title:"Blue Jeans", price:"59.99", img:"https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:10, category:"fashion", title:"Stylish Hoodie", price:"39.99", img:"https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* ELECTRONICS - Modern Gadgets */
    { id:11, category:"electronics", title:"Wireless Headphones", price:"99.99", img:"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:12, category:"electronics", title:"Gaming Laptop", price:"899.99", img:"https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"},
    { id:13, category:"electronics", title:"Smart Watch", price:"199.99", img:"https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:14, category:"electronics", title:"Mechanical Keyboard", price:"49.99", img:"https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:15, category:"electronics", title:"Gaming Mouse", price:"29.99", img:"https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* BAGS - Premium Bags Collection */
    { id:16, category:"bags", title:"Leather Handbag", price:"59.99", img:"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:17, category:"bags", title:"Travel Backpack", price:"49.99", img:"https://images.pexels.com/photos/2563680/pexels-photo-2563680.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:18, category:"bags", title:"Laptop Bag", price:"39.99", img:"https://images.pexels.com/photos/39439/herschel-bag-backpack-campus-39439.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:19, category:"bags", title:"Mini Purse", price:"29.99", img:"https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:20, category:"bags", title:"Shoulder Bag", price:"44.99", img:"https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* FOOTWEAR - Stylish Footwear */
    { id:21, category:"footwear", title:"Running Sneakers", price:"69.99", img:"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:22, category:"footwear", title:"Classic Leather Shoes", price:"79.99", img:"https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:23, category:"footwear", title:"Comfort Sandals", price:"39.99", img:"https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:24, category:"footwear", title:"Sports Shoes", price:"59.99", img:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:25, category:"footwear", title:"Casual Sneakers", price:"49.99", img:"https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* GROCERIES - Fresh Food Items */
    { id:26, category:"groceries", title:"Fresh Vegetables", price:"9.99", img:"https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:27, category:"groceries", title:"Organic Fruits", price:"12.99", img:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:28, category:"groceries", title:"Healthy Snacks", price:"6.99", img:"https://images.pexels.com/photos/41118/pexels-photo-41118.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:29, category:"groceries", title:"Fresh Bread", price:"4.99", img:"https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:30, category:"groceries", title:"Fruit Juices", price:"7.99", img:"https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* BEAUTY - Beauty Products */
    { id:31, category:"beauty", title:"Lipstick Set", price:"19.99", img:"https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:32, category:"beauty", title:"Face Makeup Kit", price:"29.99", img:"https://images.pexels.com/photos/2633986/pexels-photo-2633986.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:33, category:"beauty", title:"Luxury Perfume", price:"49.99", img:"https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:34, category:"beauty", title:"Skin Care Cream", price:"24.99", img:"https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:35, category:"beauty", title:"Makeup Brushes", price:"14.99", img:"https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* WELLNESS - Health & Wellness */
    { id:36, category:"wellness", title:"Yoga Mat", price:"25.99", img:"https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:37, category:"wellness", title:"Dumbbells Set", price:"35.99", img:"https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:38, category:"wellness", title:"Fitness Tracker", price:"59.99", img:"https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:39, category:"wellness", title:"Protein Powder", price:"39.99", img:"https://images.pexels.com/photos/3837787/pexels-photo-3837787.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:40, category:"wellness", title:"Massage Roller", price:"19.99", img:"https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600"},
    
    /* JEWELRY - Elegant Jewelry */
    { id:41, category:"jewelry", title:"Gold Necklace", price:"129.99", img:"https://images.pexels.com/photos/1377023/pexels-photo-1377023.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:42, category:"jewelry", title:"Diamond Ring", price:"199.99", img:"https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:43, category:"jewelry", title:"Silver Bracelet", price:"59.99", img:"https://images.pexels.com/photos/364976/pexels-photo-364976.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:44, category:"jewelry", title:"Luxury Earrings", price:"79.99", img:"https://images.pexels.com/photos/785696/pexels-photo-785696.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { id:45, category:"jewelry", title:"Pearl Necklace", price:"99.99", img:"https://images.pexels.com/photos/364976/pexels-photo-364976.jpeg?auto=compress&cs=tinysrgb&w=600"},
  ];

  const filteredProducts = products.filter((item) => item.category === category);

  return (
    <div className="productslider">
      <Swiper
        slidesPerView={items}
        loop={true}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="bg-white flex flex-col items-center p-3 rounded-sm cursor-pointer hover:shadow-lg transition group"
              onClick={() => onProductClick(product)}
            >
              <div className="w-full h-[200px] overflow-hidden rounded-md">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"; // Fallback image
                  }}
                />
              </div>
              <h3 className="text-[15px] font-bold mt-2 text-center">{product.title}</h3>
              <p className="text-gray-600 font-semibold">${product.price}</p>
              
              {/* Quick add button on hover */}
              <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition duration-300">
                Quick View
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;