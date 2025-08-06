import React from "react";
import { Link } from "react-router-dom";

// ⬇️ 실제 보유한 파일명으로 교체하세요.
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";
import ad4 from "../assets/ad4.png";
import ad5 from "../assets/ad5.png";

const ADS = [
  { id: 1, title: "실버 앤 블러드", subtitle: "게임 광고", img: ad1 },
  { id: 2, title: "대한 적십자",   subtitle: "헌혈 광고", img: ad2 },
  { id: 3, title: "ACE-CRAFT",     subtitle: "게임 광고", img: ad3 },
  { id: 4, title: "UNION PAY",     subtitle: "금융 광고", img: ad4 },
  { id: 5, title: "LAIFEN",        subtitle: "면도기 광고", img: ad5 },
];

export default function AdvertiseList() {
  return (
    <div style={{ width: "90%", maxWidth: 1200, margin: "40px auto" }}>
      <h2>광고 목록</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 24
      }}>
        {ADS.map(ad => (
          <Link
            key={ad.id}
            to={`/contents/advertise/${ad.id}/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ cursor: "pointer" }}>
              <img
                src={ad.img}
                alt={ad.title}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                  background: "#f7f7f7",
                  border: "1px solid #eee",
                  borderRadius: 8
                }}
              />
              <div style={{ marginTop: 8, fontWeight: 700, fontSize: 14 }}>{ad.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{ad.subtitle}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
