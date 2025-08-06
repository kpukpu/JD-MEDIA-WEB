import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  return (
    <>
      {/* ───────── 헤더 ───────── */}
      <header className="header">
        {/* 왼쪽: 로고 */}
        <div className="logo">
          <Link to="/">JD MEDIA</Link>
        </div>

        {/* 가운데: 내비게이션 */}
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="dropdown">
              <span className="drop-btn">ABOUT US ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/about-us">ABOUT US</Link></li>
                <li><Link to="/notice">notice</Link></li>
              </ul>
            </li>
            <li><Link to="/ad">works</Link></li>

            <li><Link to="/howto">How to</Link></li>
            <li><Link to="/contactus">CONTACT US</Link></li>
          </ul>
        </nav>

      </header>

      
    </>
  );
};

export default Header;
