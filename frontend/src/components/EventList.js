import React from "react";
import { Link } from "react-router-dom";

// ⬇️ 실제 보유한 파일명으로 교체하세요.
import ev1 from "../assets/event1.png";
import ev2 from "../assets/event2.png";
import ev3 from "../assets/event3.png";
import ev4 from "../assets/event4.png";
import ev5 from "../assets/event5.png";

const EVENTS = [
  { id: 1, title: "서울 팬미팅",     subtitle: "행사", img: ev1 },
  { id: 2, title: "브랜드 런칭 쇼", subtitle: "행사", img: ev2 },
  { id: 3, title: "G-STAR 애프터",  subtitle: "행사", img: ev3 },
  { id: 4, title: "스폰서 데이",    subtitle: "행사", img: ev4 },
  { id: 5, title: "기부 캠페인",    subtitle: "행사", img: ev5 },
];

export default function EventList() {
  return (
    <div style={{ width: "90%", maxWidth: 1200, margin: "40px auto" }}>
      <h2>행사 목록</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 24
      }}>
        {EVENTS.map(ev => (
          <Link
            key={ev.id}
            to={`/contents/event/${ev.id}/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ cursor: "pointer" }}>
              <img
                src={ev.img}
                alt={ev.title}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                  background: "#f7f7f7",
                  border: "1px solid #eee",
                  borderRadius: 8
                }}
              />
              <div style={{ marginTop: 8, fontWeight: 700, fontSize: 14 }}>{ev.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{ev.subtitle}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
