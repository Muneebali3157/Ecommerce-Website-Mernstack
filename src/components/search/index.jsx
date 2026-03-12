import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // All categories for suggestions
  const categories = [
    { name: "Home", value: "home" },
    { name: "Fashion", value: "fashion" },
    { name: "Electronics", value: "electronics" },
    { name: "Bags", value: "bags" },
    { name: "Footwear", value: "footwear" },
    { name: "Groceries", value: "groceries" },
    { name: "Beauty", value: "beauty" },
    { name: "Wellness", value: "wellness" },
    { name: "Jewelry", value: "jewelry" }
  ];

  // All products data
  const allProducts = [
    // ... (your products array)
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      
      // Find matching categories
      const categoryMatches = categories
        .filter(cat => cat.name.toLowerCase().includes(term))
        .map(cat => ({ type: 'category', ...cat }));
      
      // Find matching products
      const productMatches = allProducts
        .filter(prod => prod.title.toLowerCase().includes(term))
        .slice(0, 5)
        .map(prod => ({ type: 'product', ...prod }));
      
      setSuggestions([...categoryMatches, ...productMatches]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setSearchTerm('');
    
    if (suggestion.type === 'category') {
      // Navigate to home page with tab parameter and hash to popular products section
      navigate(`/?tab=${suggestion.value}#popular-products`);
      
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById('popular-products');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Navigate to product detail page
      navigate(`/product/${suggestion.id}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="searchbox w-[100%] relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input 
            type="text" 
            className="w-full h-10 p-3 text-[16px] bg-[#e0dede] rounded-[20px] border-2 hover:border-gray-400 focus:outline-none focus:border-blue-400 pr-12" 
            placeholder="Search for products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim() && suggestions.length > 0 && setShowSuggestions(true)}
          />
          <Button 
            type="submit"
            className="!absolute right-2 top-1/2 -translate-y-1/2 z-10 !rounded-full w-8 h-8 !text-black !min-w-0 !p-0 flex items-center justify-center hover:bg-gray-200"
          >
            <IoSearchSharp className="text-gray-800 text-xl" />
          </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.type === 'category' ? (
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-medium">📁 Category:</span>
                  <span className="font-semibold">{suggestion.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">Click to view all {suggestion.name} products</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img 
                    src={suggestion.img} 
                    alt={suggestion.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{suggestion.title}</p>
                    <p className="text-sm text-gray-600">${suggestion.price}</p>
                  </div>
                  <span className="text-xs text-gray-400">Product</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};