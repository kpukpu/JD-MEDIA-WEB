// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./components/mainpage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/aboutus";
import Ad from "./components/ad";
import ContactUs from "./components/contact-us";

import AdvertiseList from "./components/AdvertiseList";
import AdvertiseDetail from "./components/AdvertiseDetail";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 기본 */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/ad" element={<Ad />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* 광고 목록 */}
        <Route path="/contents/advertise/" element={<AdvertiseList />} />

        {/* 광고 상세 — 두 패턴 모두 지원 */}
        <Route path="/contents/advertise:adId" element={<AdvertiseDetail />} />
        <Route path="/contents/advertise/:id" element={<AdvertiseDetail />} />

        {/* 행사 목록 */}
        <Route path="/contents/event/" element={<EventList />} />

        {/* 행사 상세 — 두 패턴 모두 지원 */}
        <Route path="/contents/event:eventId" element={<EventDetail />} />
        <Route path="/contents/event/:id" element={<EventDetail />} />

        {/* 필요시 404
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}
