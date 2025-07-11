"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const pathname = usePathname();
  const [navHeader, setNavHeader] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const t = useTranslations("Navbar"); // ✅ Load Navbar translations

  useEffect(() => {
    const handleScroll = () => {
      const isMediumScreen = window.innerWidth >= 768;

      if (pathname === "/" || pathname === "/en" || pathname === "/sp") {
        if (isMediumScreen) {
          if (window.scrollY < 200) {
            setNavHeader("bg-transparent text-white py-6 font-medium");
          } else {
            setNavHeader(
              "bg-white text-gray-800 shadow-xl py-4 text-gray-500 font-medium"
            );
          }
        } else {
          setNavHeader(
            "bg-white text-gray-800 shadow-xl py-4 text-gray-500 font-medium"
          );
        }
      } else {
        setNavHeader(
          "bg-white text-gray-800 shadow-xl py-4 text-gray-500 font-medium"
        );
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const isActive = (route: string) =>
    pathname === route
      ? "bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent hover:text-sky-500 text-lg"
      : "text-lg hover:text-sky-500";

  return (
    <div
      id="navbar"
      className={`flex justify-center items-center w-full fixed top-0 z-50 transition-all duration-300 ${navHeader}`}
    >
      <div className="w-11/12 max-w-7xl flex justify-between items-center mx-auto">
        {/* Logo */}
        <Link href="/" className="pl-4 pr-2">
          <h1 className="text-2xl font-bold text-inherit">
            Suman
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Tara
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={isActive("/")}>
            {t("home")}
          </Link>
          <Link href="/about" className={isActive("/about")}>
            {t("about")}
          </Link>
          <Link href="/products" className={isActive("/products")}>
            {t("products")}
          </Link>
          <Link href="/services" className={isActive("/services")}>
            {t("services")}
          </Link>
          <Link href="/contactUs" className={isActive("/contactUs")}>
            {t("contact")}
          </Link>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center pr-4">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <HiOutlineX className="w-7 h-7 text-inherit" />
            ) : (
              <HiOutlineMenu className="w-7 h-7 text-inherit" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 w-full absolute top-full left-0 z-40 flex flex-col items-start">
          <div className="w-10/12 flex flex-col gap-4 px-10 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={isActive("/")}
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={isActive("/about")}
            >
              {t("about")}
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className={isActive("/products")}
            >
              {t("products")}
            </Link>
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className={isActive("/services")}
            >
              {t("services")}
            </Link>
            <Link
              href="/contactUs"
              onClick={() => setMenuOpen(false)}
              className={isActive("/contactUs")}
            >
              {t("contact")}
            </Link>
            <LanguageSelector />
          </div>
        </div>
      )}
    </div>
  );
}
