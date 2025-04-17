import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../public/PublicHeader'; // Make sure this path is correct
import { Footer } from '../user/Footer'; // You might have a different footer for public pages

export const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <div>
        <Outlet />
      </div>
      <Footer /> {/* Or a different PublicFooter */}
    </>
  );
};