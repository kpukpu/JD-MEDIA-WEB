import React from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/MAIN_LOGO.png";   // 로고 파일 (공백 없는 이름 권장)
import "./mainpage.css";

const Mainpage = () => (
  <main className="hero">
    {/* ── 로고 ── */}
    <img
      className="hero__logo"
      src={mainLogo}
      alt="JD MEDIA Logo"
    />

    {/* ── 제목 & 슬로건 ── */}
    <h1 className="hero__title">
      JD MEDIA
      <span className="hero__subtitle">ENTERTAINMENT & ADVERTISE</span>
    </h1>

    {/* ── CTA 버튼 ── */}
    <div className="hero__actions">
      <Link to="/ad"     className="btn primary">Our Works</Link>
      <Link to="/contactus" className="btn outline">Contact Us</Link>
    </div>
  </main>
);

export default Mainpage;
