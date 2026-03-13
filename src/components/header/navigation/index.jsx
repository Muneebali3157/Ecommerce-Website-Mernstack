import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { GoRocket } from "react-icons/go";
import { useNavigate, useLocation } from 'react-router-dom';
import Category from './category';

const Navigation = () => {
  const [isopen, setisOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openctegorypanel = () => {
    setisOpen(true);
  };

  const handleCategoryClick = (category) => {
    // Navigate to home page with tab parameter and hash to scroll to popular products
    // Changed from '/' to '/home'
    navigate(`/home?tab=${category}#popular-products`);
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="container flex items-center justify-end py-2 gap-5 w-full">

        {/* Category Button */}
        <div className='col-1 w-[22%] !-ml-24 '>
          <Button className="!text-black" onClick={openctegorypanel}>
            <RiMenu2Line className="text-[18px] mr-2 -ml-2" />
            Shop By Categories
            <FaAngleDown className="ml-4 text-[12px]" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className='col-2 w-[60%]'>
          <ul className='flex items-center gap-5'>

            {/* Home */}
            <li className='list-none hover:h-6 hover:border-1 hover:scale-120 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={handleHomeClick}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Home
              </button>
            </li>

            {/* Fashion */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('fashion')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Fashion
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('fashion')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Men
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('fashion')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Women
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('fashion')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Kids
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('fashion')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Boys
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('fashion')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Girls
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Electronics */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('electronics')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Electronics
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('electronics')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Mobiles
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('electronics')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Laptops
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('electronics')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Headphones
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('electronics')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Cameras
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Bags */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('bags')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Bags
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('bags')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Handbags
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('bags')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Backpacks
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('bags')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Travel Bags
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('bags')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Laptop Bags
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Footwear */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('footwear')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Footwear
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('footwear')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Sneakers
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('footwear')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Sandals
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('footwear')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Boots
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('footwear')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Slippers
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Groceries */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('grocery')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Groceries
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('grocery')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Vegetables
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('grocery')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Fruits
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('grocery')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Snacks
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('grocery')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Beverages
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Beauty */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('beauty')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Beauty
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('beauty')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Makeup
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('beauty')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Skincare
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('beauty')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Haircare
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('beauty')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Perfumes
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Wellness */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('wellness')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Wellness
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('wellness')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Supplements
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('wellness')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Yoga
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('wellness')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Fitness
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('wellness')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Health Care
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Jewelry */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>
              <button 
                onClick={() => handleCategoryClick('jewelry')}
                className='text-[13px] font-[550] transition duration-200 hover:text-blue-500 cursor-pointer bg-transparent border-none'
              >
                Jewelry
              </button>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                <ul className='py-2'>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('jewelry')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Necklaces
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('jewelry')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Rings
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('jewelry')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Bracelets
                    </button>
                  </li>
                  <li className='list-none w-full'>
                    <button 
                      onClick={() => handleCategoryClick('jewelry')}
                      className="text-[13px] text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      Earrings
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Delivery Text */}
        <div className='col-3 ml-5 w-[20%] flex items-center justify-end'>
          <p className='text-[13px] font-[500] pl-4 !-mr-12 flex'>
            <GoRocket className="text-[16px] mr-1 ml-8" />
            Free International delivery
          </p>
        </div>
      </div>

      <Category isOpen={isopen} setisOpen={setisOpen} />
    </>
  )
}

export default Navigation;