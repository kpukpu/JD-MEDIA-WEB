// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

import Mainpage from "./components/mainpage";
import AboutUs from "./components/aboutus";
import Ad from "./components/ad";
import ContactUs from "./components/contact-us";
import Notice from "./components/notice";
import AdvertiseList from "./components/AdvertiseList";
import AdvertiseDetail from "./components/AdvertiseDetail";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
//import HowTo from "./components/howto"; // Header에 있으니 라우트 추가

// 레이아웃: 라우트마다 Header/Footer 공통 포함
import Header from "./components/Header";
import Footer from "./components/Footer";

const SUPPORTED_LANGS = ["ko", "en", "zh"];

function NotFound() {
  const { lang } = useParams();
  const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : "ko";
  return (
    <main style={{ padding: "120px 24px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <p style={{ marginTop: 16 }}>
        <a
          href={`/${safeLang}`}
          style={{ color: "#0070f3", textDecoration: "underline" }}
        >
          홈으로 가기
        </a>
      </p>
    </main>
  );
}

// 언어 유효성 검사 게이트
function LangGate() {
  const { lang } = useParams();
  if (!SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to="/ko" replace />;
  }
  return <Outlet />;
}

// 공통 레이아웃: Header + Outlet + Footer
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 진입은 /ko 로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/ko" replace />} />

        {/* 언어 prefix 라우팅 */}
        <Route path="/:lang" element={<LangGate />}>
          <Route element={<Layout />}>
            {/* 홈 */}
            <Route index element={<Mainpage />} />

            {/* 일반 페이지 */}
            <Route path="about-us" element={<AboutUs />} />
            <Route path="ad" element={<Ad />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="notice" element={<Notice />} />

            {/* 콘텐츠 - 광고 목록 */}
            <Route path="contents/advertise" element={<AdvertiseList />} />
            <Route path="contents/advertise/" element={<AdvertiseList />} />

            {/* 콘텐츠 - 광고 상세 (두 패턴 모두 지원) */}
            {/* 정상 패턴: /:lang/contents/advertise/123 */}
            <Route path="contents/advertise/:id" element={<AdvertiseDetail />} />
            {/* 슬래시 없는 과거 패턴: /:lang/contents/advertise123 */}
            <Route path="contents/advertise:adId" element={<AdvertiseDetail />} />

            {/* 콘텐츠 - 행사 목록 */}
            <Route path="contents/event" element={<EventList />} />
            <Route path="contents/event/" element={<EventList />} />

            {/* 콘텐츠 - 행사 상세 (두 패턴 모두 지원) */}
            {/* 정상 패턴: /:lang/contents/event/45 */}
            <Route path="contents/event/:id" element={<EventDetail />} />
            {/* 슬래시 없는 과거 패턴: /:lang/contents/event45 */}
            <Route path="contents/event:eventId" element={<EventDetail />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* 언어 없는 나머지는 /ko 로 정리 */}
        <Route path="*" element={<Navigate to="/ko" replace />} />
      </Routes>
    </Router>
  );
}
