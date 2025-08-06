import React from "react";
import { useNavigate } from "react-router-dom";
import "./ad.css";

import headerImage from "../assets/about-us-image.png";

// ⬇️ 광고 썸네일(실제 파일명으로 교체)
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";
import ad4 from "../assets/ad4.png";
import ad5 from "../assets/ad5.png";

// ⬇️ 행사 썸네일(실제 파일명으로 교체)
import ev1 from "../assets/event1.png";
import ev2 from "../assets/event2.png";
import ev3 from "../assets/event3.png";
import ev4 from "../assets/event4.png";
import ev5 from "../assets/event5.png";

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

  return (
    <div className="about-us">
      <div className="header-image-container">
        <img src={headerImage} alt="Header Banner" className="header-image" />
      </div>

      {/* ─── 광고 섹션 ─── */}
      <section className="section">
        <div
          className="button"
          onClick={goAdList}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && goAdList()}
        >
          <button className="my-button">광고</button>
          <div className="arrow" aria-hidden="true" />
        </div>

        <div className="thumb-grid">
          {ADS.map((ad) => (
            <div
              key={ad.id}
              className="thumb"
              onClick={() => goAdDetail(ad.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && goAdDetail(ad.id)}
              title={`${ad.title} 상세로 이동`}
            >
              <img src={ad.img} alt={ad.title} />
              <div className="thumb-title">{ad.title}</div>
              <div className="thumb-subtitle">{ad.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 행사 섹션 ─── */}
      <section className="section">
        <div
          className="button"
          onClick={goEventList}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && goEventList()}
        >
          <button className="my-button">행사</button>
          <div className="arrow" aria-hidden="true" />
        </div>

        <div className="thumb-grid">
          {EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="thumb"
              onClick={() => goEventDetail(ev.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && goEventDetail(ev.id)}
              title={`${ev.title} 상세로 이동`}
            >
              <img src={ev.img} alt={ev.title} />
              <div className="thumb-title">{ev.title}</div>
              <div className="thumb-subtitle">{ev.subtitle}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ad;
