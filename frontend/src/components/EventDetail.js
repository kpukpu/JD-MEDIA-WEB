import React from "react";
import { useParams } from "react-router-dom";
import DetailLayout from "../components/DetailLayout";

// 포스터 예시(실제 파일로 교체)
import ev1 from "../assets/event1.png";
import ev2 from "../assets/event2.png";
import ev3 from "../assets/event3.png";
import ev4 from "../assets/event4.png";
import ev5 from "../assets/event5.png";

const EVENTS = [
  {
    id: 1,
    title: "서울 팬미팅",
    poster: ev1,
    intro: "신작 론칭 기념 팬과의 만남 행사.",
    type: "오프라인 행사",
    period: "2025.05.24",
    note: "사전 등록 필수"
  },
  {
    id: 2,
    title: "브랜드 런칭 쇼",
    poster: ev2,
    intro: "브랜드 콘셉트 공개 및 미디어 브리핑.",
    type: "쇼케이스",
    period: "2025.06.10",
    note: "-"
  },
  {
    id: 3,
    title: "G-STAR 애프터",
    poster: ev3,
    intro: "참가사·파트너 네트워킹 파티.",
    type: "네트워킹",
    period: "2025.11.16",
    note: "초대권"
  },
  { id: 4, title: "스폰서 데이", poster: ev4, intro: "스폰서 초청 감사 행사.", type: "리셉션", period: "2025.07.20", note: "-" },
  { id: 5, title: "기부 캠페인", poster: ev5, intro: "팬 참여형 기부 적립 프로그램.", type: "사회공헌", period: "2025.08.01 ~ 2025.08.31", note: "-" },
];

export default function EventDetail() {
  const params = useParams();
  // 두 패턴 모두 수용: /contents/event:eventId /contents/event/:id
  const idStr = params.eventId ?? params.id;
  const id = Number(String(idStr).replace(/[^0-9]/g, ""));
  const data = EVENTS.find(x => x.id === id);

  if (!data) return <div style={{ padding: 24, color: "#fff" }}>존재하지 않는 행사입니다.</div>;

  return (
    <DetailLayout
      title={data.title}
      poster={data.poster}
      intro={data.intro}
      type={data.type}
      period={data.period}
      note={data.note}
    />
  );
}
