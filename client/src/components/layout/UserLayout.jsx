import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../user/Footer";
import { Header } from "../user/Header";

export const UserLayout = () => {
  return (
    <>
      {/*  Header based on login state */}
      <Header />

      {/* Main content */}
      <div className="min-h-screen">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};
