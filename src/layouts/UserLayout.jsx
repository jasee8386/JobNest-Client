import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <Header />

      {/* Outlet will render the nested routes like Home, Login, Profile */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
