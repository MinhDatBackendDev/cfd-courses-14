import React, { useEffect } from "react";
import PageLoading from "../../components/PageLoading";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Overlay from "../../components/Overlay";
import Footer from "../../components/Footer";
import AuthModal from "../../components/AuthModal";
import { Outlet } from "react-router-dom";
import MainContextProvider from "@context/MainContext";
import AuthContextProvider from "@context/AuthContext";

const MainLayout = () => {
  useEffect(() => {
    $(".loading").addClass("--hide");
  });
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoading />
        <Header />
        <Navbar />
        <Overlay />

        {/* Main */}
        <Outlet />

        <Footer />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
