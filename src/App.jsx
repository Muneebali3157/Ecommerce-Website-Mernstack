import Header from './components/header/index';
import Home from './components/pages/home/index';
import Signup from './components/pages/home/signup/Signup';
import Login from './components/pages/home/login/Login';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;