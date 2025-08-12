// src/components/ad.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./ad.css";

import headerImage from "../assets/about-us-image.png";

// 광고 썸네일
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";
import ad4 from "../assets/ad4.png";
import ad5 from "../assets/ad5.png";

// 행사 썸네일
import ev1 from "../assets/event1.png";
import ev2 from "../assets/event2.png";
import ev3 from "../assets/event3.png";
import ev4 from "../assets/event4.png";
import ev5 from "../assets/event5.png";

// OGL 기반 캐러셀
import CircularGallery from "./CircularGallery"; // 확장자 생략 권장(.jsx 인식)

const ADS = [
  { id: 1, title: "실버 앤 블러드", subtitle: "게임 광고", img: ad1 },
  { id: 2, title: "대한 적십자",   subtitle: "헌혈 광고", img: ad2 },
  { id: 3, title: "ACE-CRAFT",     subtitle: "게임 광고", img: ad3 },
  { id: 4, title: "UNION PAY",     subtitle: "금융 광고", img: ad4 },
  { id: 5, title: "LAIFEN",        subtitle: "면도기 광고", img: ad5 },
];

const EVENTS = [
  { id: 1, title: "서울 팬미팅",     subtitle: "행사", img: ev1 },
  { id: 2, title: "브랜드 런칭 쇼", subtitle: "행사", img: ev2 },
  { id: 3, title: "G-STAR 애프터",  subtitle: "행사", img: ev3 },
  { id: 4, title: "스폰서 데이",    subtitle: "행사", img: ev4 },
  { id: 5, title: "기부 캠페인",    subtitle: "행사", img: ev5 },
];

const Ad = () => {
  const navigate = useNavigate();

  const goAdList = () => navigate("/contents/advertise/");
  const goAdDetail = (id) => navigate(`/contents/advertise/${id}/`);
  const goEventList = () => navigate("/contents/event/");
  const goEventDetail = (id) => navigate(`/contents/event/${id}/`);
  const goAdOverview = () => navigate("/content/advrtisement"); // 요청 경로 그대로

  const ADS_GALLERY = useMemo(
    () => ADS.map((a) => ({ type: "ad", id: a.id, image: a.img, text: `${a.title} · ${a.subtitle}` })),
    []
  );
  const EVENTS_GALLERY = useMemo(
    () => EVENTS.map((e) => ({ type: "event", id: e.id, image: e.img, text: `${e.title} · ${e.subtitle}` })),
    []
  );

  const handleSelectAd = (index) => {
    const item = ADS_GALLERY[index];
    if (!item) return;
    goAdDetail(item.id);
  };
  const handleSelectEvent = (index) => {
    const item = EVENTS_GALLERY[index];
    if (!item) return;
    goEventDetail(item.id);
  };

  return (
    <div className="about-us">
      {/* 상단 배너 */}
      <div className="header-image-container">
        <img src={headerImage} alt="Header Banner" className="header-image" />
      </div>

      {/* ─── 광고 캐러셀 ─── */}
      <section className="section section--bleed">
        <div className="section-head" style={{ paddingLeft: 16, paddingRight: 16 }}>
          <div
            className="button"
            onClick={goAdList}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goAdList()}
          >
            <div className="arrow" aria-hidden="true" />
          </div>
          <div
            className="button"
            onClick={goEventList}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goEventList()}
            style={{ marginLeft: 16 }}
          >
            <div className="arrow" aria-hidden="true" />
          </div>
        </div>

        <div style={{ position: "relative", width: "100vw", height: 620 }}>
          {/* 상단 좌측 '광고 →' CTA */}
          <div
            role="button"
            tabIndex={0}
            onClick={goAdOverview}
            onKeyDown={(e) => e.key === "Enter" && goAdOverview()}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.55)",
              color: "#000000ff",
              fontWeight: 700,
              fontSize: 50,
              lineHeight: 1,
              cursor: "pointer",
              userSelect: "none",
            }}
            title="광고 페이지로 이동"
          >
            <span>광고</span>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <CircularGallery
            items={ADS_GALLERY}
            bend={2.6}
            textColor="#eee"
            borderRadius={0.08}
            font="600 24px Figtree"
            scrollSpeed={2}
            scrollEase={0.06}
            onSelect={handleSelectAd}
            visibleCount={2.5}
            gap={0.16}
            itemAspect={1.0}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>

      {/* ─── 행사 캐러셀 ─── */}
      <section className="section section--bleed">
        <div className="section-head" style={{ paddingLeft: 16, paddingRight: 16 }}>
          <div
            className="button"
            onClick={goAdList}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goAdList()}
          >
            <div className="arrow" aria-hidden="true" />
          </div>
          <div
            className="button"
            onClick={goEventList}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goEventList()}
            style={{ marginLeft: 16 }}
          >
            <div className="arrow" aria-hidden="true" />
          </div>
        </div>

        <div style={{ position: "relative", width: "100vw", height: 620 }}>
          {/* 상단 좌측 '행사 →' CTA */}
          <div
            role="button"
            tabIndex={0}
            onClick={goEventList}
            onKeyDown={(e) => e.key === "Enter" && goEventList()}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.55)",
              color: "#000000ff",
              fontWeight: 700,
              fontSize: 50,
              lineHeight: 1,
              cursor: "pointer",
              userSelect: "none",
            }}
            title="행사 페이지로 이동"
          >
            <span>행사</span>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <CircularGallery
            items={EVENTS_GALLERY}
            bend={2.6}
            textColor="#eee"
            borderRadius={0.08}
            font="600 24px Figtree"
            scrollSpeed={2}
            scrollEase={0.06}
            onSelect={handleSelectEvent}
            visibleCount={2.5}
            gap={0.16}
            itemAspect={1.0}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>
    </div>
  );
};

export default Ad;
