import { PATHS } from "@constants/path";
import React, { useEffect } from "react";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }

    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);

  return (
    <header
      id="header"
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
