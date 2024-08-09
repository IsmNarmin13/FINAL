import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = () => {
  return (
    <div>
      <Header/>
      <hr className="w-full h-0.5 mx-auto bg-gray-500"></hr>
      <main>
        <Outlet/> 
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;