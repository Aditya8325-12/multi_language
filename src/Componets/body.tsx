"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
// import Footer from "./Footer";
import Navbar from "./navbar";
interface BodyProps {
  children: React.ReactNode;
}

function Body({ children }: BodyProps) {
  return (
    <div className="w-full max-h-max ">
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Body;
