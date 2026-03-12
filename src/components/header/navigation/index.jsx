import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { GoRocket } from "react-icons/go";
import Category from './category';

const Navigation = () => {

  const [isopen, setisOpen] = useState(false);

  const openctegorypanel = () => {
    setisOpen(true);
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
              <a href="#" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>Home</a>
            </li>


            {/* Fashion */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=fashion#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Fashion
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                  <li className='list-none w-full'>
                    <a href="/?tab=fashion#popular-products">
                      <Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">
                        Men
                      </Button>
                    </a>
                  </li>

                  <li className='list-none w-full'>
                    <a href="/?tab=fashion#popular-products">
                      <Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">
                        Women
                      </Button>
                    </a>
                  </li>

                  <li className='list-none w-full'>
                    <a href="/?tab=fashion#popular-products">
                      <Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">
                        Kids
                      </Button>
                    </a>
                  </li>

                  <li className='list-none w-full'>
                    <a href="/?tab=fashion#popular-products">
                      <Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">
                        Boys
                      </Button>
                    </a>
                  </li>

                  <li className='list-none w-full'>
                    <a href="/?tab=fashion#popular-products">
                      <Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">
                        Girls
                      </Button>
                    </a>
                  </li>
                </ul>

              </div>
            </li>


            {/* Electronics */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=electronics#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Electronics
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                 <a href="/?tab=electronics#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Mobiles</Button></li></a>
                  <a href="/?tab=electronics#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Laptops</Button></li></a>
                  <a href="/?tab=electronics#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Headphones</Button></li></a>
                  <a href="/?tab=electronics#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Cameras</Button></li></a>
                </ul>

              </div>
            </li>


            {/* Bags */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=bags#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Bags
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                 <a href="/?tab=bags#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Handbags</Button></li></a>
                  <a href="/?tab=bags#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Backpacks</Button></li></a>
                  <a href="/?tab=bags#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Travel Bags</Button></li></a>
                  <a href="/?tab=bags#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Laptop Bags</Button></li></a>
                </ul>

              </div>
            </li>


            {/* Footwear */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=footwear#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Footwear
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                 <a href="/?tab=footwear#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Sneakers</Button></li></a>
                  <a href="/?tab=footwear#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Sandals</Button></li></a>
                  <a href="/?tab=footwear#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Boots</Button></li></a>
                  <a href="/?tab=footwear#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Slippers</Button></li></a>
                </ul>

              </div>
            </li>


            {/* Groceries */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=grocery#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Groceries
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                  <a href="/?tab=grocery#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Vegetables</Button></li></a>
                  <a href="/?tab=grocery#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Fruits</Button></li></a>
                  <a href="/?tab=grocery#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Snacks</Button></li></a>
                  <a href="/?tab=grocery#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Beverages</Button></li></a>
                </ul>

              </div>
            </li>


            {/* Beauty */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=beauty#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Beauty
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                  <a href="/?tab=beauty#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Makeup</Button></li></a>
                  <a href="/?tab=beauty#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Skincare</Button></li></a>
                  <a href="/?tab=beauty#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Haircare</Button></li></a>
                  <a href="/?tab=beauty#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Perfumes</Button></li></a>
                </ul>

              </div>
            </li>


            {/* Wellness */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=wellness#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Wellness
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                  <a href="/?tab=wellness#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Supplements</Button></li></a>
                  <a href="/?tab=wellness#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Yoga</Button></li></a>
                  <a href="/?tab=wellness#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Fitness</Button></li></a>
                  <li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Health Care</Button></li>
                </ul>

              </div>
            </li>


            {/* Jewelry */}
            <li className='list-none relative group hover:h-6 hover:border hover:scale-110 hover:border-[#0a60c2] hover:bg-[#ced2ca] hover:rounded-md items-center justify-center'>

              <a href="/?tab=jewelry#popular-products" className='text-[13px] font-[550] transition duration-200 hover:text-blue-500'>
                Jewelry
              </a>

              <div className="submenu absolute top-full left-0 bg-white shadow-md rounded-md min-w-[130px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">

                <ul>
                  <a href="/?tab=jewelry#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Necklaces</Button></li></a>
                  <a href="/?tab=jewelry#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Rings</Button></li></a>
                  <a href="/?tab=jewelry#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Bracelets</Button></li></a>
                  <a href="/?tab=jewelry#popular-products"><li className='list-none w-full'><Button className="!text-black !text-[14px] w-full !justify-start !rounded-none">Earrings</Button></li></a>
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