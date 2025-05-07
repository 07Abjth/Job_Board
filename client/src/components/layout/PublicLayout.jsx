import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../public/PublicHeader';
import { Footer } from '../user/Footer';

export const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};
