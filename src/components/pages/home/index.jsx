import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Homeslider from "../../homeslider";
import Homecatslider from "../../homecatslider";
import { TbTruckDelivery } from "react-icons/tb";
import Addbannerslider from "../../Addbannerslider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../../productslider";
import ProductDetail from "../../productslider/ProductDetail";

const Home = ({ onOpenCart }) => {
  const [value, setValue] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  // Tab mapping
  const tabMap = {
    home: 0, fashion: 1, electronics: 2, bags: 3, 
    footwear: 4, grocery: 5, beauty: 6, wellness: 7, jewelry: 8
  };

  // Reverse tab mapping for URL
  const reverseTabMap = {
    0: 'home', 1: 'fashion', 2: 'electronics', 3: 'bags',
    4: 'footwear', 5: 'grocery', 6: 'beauty', 7: 'wellness', 8: 'jewelry'
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    // Update URL with tab parameter without reloading
    const url = new URL(window.location);
    url.searchParams.set('tab', reverseTabMap[newValue]);
    url.hash = 'popular-products';
    window.history.pushState({}, '', url);
  };

  const handleProductClick = (product) => {
    // Set the correct tab based on product category
    if (tabMap[product.category] !== undefined) {
      setValue(tabMap[product.category]);
      
      // Update URL with tab parameter
      const url = new URL(window.location);
      url.searchParams.set('tab', product.category);
      url.hash = 'popular-products';
      window.history.pushState({}, '', url);
    }
    
    // Open product detail modal
    setSelectedProduct(product);
  };

  useEffect(() => {
  console.log("Current location:", location.pathname);
  console.log("Current hash:", location.hash);
  console.log("Current search:", location.search);
  
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  console.log("Tab from URL:", tab);
  
  // Set tab from URL if it exists
  if (tab && tabMap[tab.toLowerCase()] !== undefined) {
    setValue(tabMap[tab.toLowerCase()]);
  }
  
  // Handle scrolling to popular-products section
  if (location.hash === '#popular-products') {
    console.log("Scrolling to popular products");
    setTimeout(() => {
      const section = document.getElementById("popular-products");
      if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 200);
  }
}, [location]);

  return (
    <>
      <Homeslider />
      <Homecatslider />

      <section className="py-5 bg-white mt-5 w-full">
        <div className="freeshiping w-full max-w-6xl mx-auto p-4 border border-blue-500 flex items-center gap-5">
          <TbTruckDelivery className="text-4xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Free Shipping</h2>
          <p className="text-gray-600">Get free shipping on all orders over $50. Shop now!</p>
          <h2 className="text-2xl font-bold text-gray-800">-ONLY $200</h2>
        </div>
        <Addbannerslider items={3} />
      </section>

      {/* This is the section we want to scroll to - ID matches navigation */}
      <section id="popular-products" className="py-5 bg-white mt-5 w-full m-6 scroll-mt-24">
        <div className="container-fluid w-full flex justify-between items-center ">
          <div className="left-sec">
            <h2 className="text-2xl font-bold text-gray-800">Popular products</h2>
            <p>Don't miss out on our most loved items!</p>
          </div>

          <div className="right-sec w-[70%] m-5">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="product categories"
            >
              <Tab label="Home" />
              <Tab label="Fashion" />
              <Tab label="Electronics" />
              <Tab label="Bags" />
              <Tab label="Footwear" />
              <Tab label="Grocery" />
              <Tab label="Beauty" />
              <Tab label="Wellness" />
              <Tab label="Jewelry" />
            </Tabs>
          </div>
        </div>

        {/* Product Sliders - Only show the active tab */}
        <div className="product-slider-container">
          {value === 0 && <ProductSlider items={5} category="home" onProductClick={handleProductClick} />}
          {value === 1 && <ProductSlider items={5} category="fashion" onProductClick={handleProductClick} />}
          {value === 2 && <ProductSlider items={5} category="electronics" onProductClick={handleProductClick} />}
          {value === 3 && <ProductSlider items={5} category="bags" onProductClick={handleProductClick} />}
          {value === 4 && <ProductSlider items={5} category="footwear" onProductClick={handleProductClick} />}
          {value === 5 && <ProductSlider items={5} category="grocery" onProductClick={handleProductClick} />}
          {value === 6 && <ProductSlider items={5} category="beauty" onProductClick={handleProductClick} />}
          {value === 7 && <ProductSlider items={5} category="wellness" onProductClick={handleProductClick} />}
          {value === 8 && <ProductSlider items={5} category="jewelry" onProductClick={handleProductClick} />}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default Home;