import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";

const Category = (props) => {
  const [openMenu, setOpenMenu] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setisOpen(newOpen);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation">

      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b">
        <h3 className="text-[16px] font-bold">Shop by Categories</h3>
        <IoMdClose
          className="text-[22px] cursor-pointer"
          onClick={toggleDrawer(false)}
        />
      </div>

      {/* Menu */}
      <div className="h-[calc(100vh-70px)] overflow-y-auto p-4">
        <ul className="space-y-2">

          {/* Fashion */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleMenu("fashion")}
            >
              <span>Fashion</span>
              {openMenu === "fashion" ? <FaMinus /> : <FaPlus />}
            </div>

            <ul className={`overflow-hidden transition-all duration-300 ${openMenu === "fashion" ? "max-h-40 mt-2" : "max-h-0"}`}>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Apparel</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">T-Shirts</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Jeans</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Watches</li>
            </ul>
          </li>

          {/* Electronics */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleMenu("electronics")}
            >
              <span>Electronics</span>
              {openMenu === "electronics" ? <FaMinus /> : <FaPlus />}
            </div>

            <ul className={`overflow-hidden transition-all duration-300 ${openMenu === "electronics" ? "max-h-40 mt-2" : "max-h-0"}`}>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Smartphones</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Laptops</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Tablets</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Headphones</li>
            </ul>
          </li>

          {/* Bags */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleMenu("bags")}
            >
              <span>Bags</span>
              {openMenu === "bags" ? <FaMinus /> : <FaPlus />}
            </div>

            <ul className={`overflow-hidden transition-all duration-300 ${openMenu === "bags" ? "max-h-40 mt-2" : "max-h-0"}`}>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Handbags</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Backpacks</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Travel Bags</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Laptop Bags</li>
            </ul>
          </li>

          {/* Jewelry */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleMenu("jewelry")}
            >
              <span>Jewelry</span>
              {openMenu === "jewelry" ? <FaMinus /> : <FaPlus />}
            </div>

            <ul className={`overflow-hidden transition-all duration-300 ${openMenu === "jewelry" ? "max-h-40 mt-2" : "max-h-0"}`}>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Necklaces</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Rings</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Bracelets</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Earrings</li>
            </ul>
          </li>

          {/* Cosmetics */}
          <li>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleMenu("cosmetics")}
            >
              <span>Cosmetics</span>
              {openMenu === "cosmetics" ? <FaMinus /> : <FaPlus />}
            </div>

            <ul className={`overflow-hidden transition-all duration-300 ${openMenu === "cosmetics" ? "max-h-40 mt-2" : "max-h-0"}`}>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Lipstick</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Foundation</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Perfume</li>
              <li className="pl-6 py-1 hover:text-blue-500 cursor-pointer">Skin Care</li>
            </ul>
          </li>

        </ul>
      </div>
    </Box>
  );

  return (
    <Drawer anchor="left" open={props.isOpen} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default Category;