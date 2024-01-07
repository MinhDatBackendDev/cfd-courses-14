import { useMainContext } from "@context/MainContext";
import React from "react";

const Overlay = () => {
  const { handleShowNavbar } = useMainContext();

  return <div className="overlay" onClick={() => handleShowNavbar(false)} />;
};

export default Overlay;
