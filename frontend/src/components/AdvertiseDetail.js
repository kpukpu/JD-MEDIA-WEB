import React from "react";
import { useParams } from "react-router-dom";
import DetailLayout from "../components/DetailLayout";

// 포스터 예시(실제 파일로 교체)
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";
import ad4 from "../assets/ad4.png";
import ad5 from "../assets/ad5.png";

const ADS = [
  {
    id: 1,
    title: "실버 앤 블러드",
    poster: ad1,
    intro: "다크 판타지 세계관 기반의 시네마틱 게임 광고.",
    type: "게임 광고",
    period: "2025.05.24 ~ 2025.06.29",
    note: "TV/디지털 동시 집행"
  },
  {
    id: 2,
    title: "대한 적십자 헌혈",
    poster: ad2,
    intro: "헌혈 참여를 독려하는 공익 캠페인.",
    type: "공익 광고",
    period: "상시",
    note: "정부·지자체 협력"
  },
  {
    id: 3,
    title: "ACE-CRAFT",
    poster: ad3,
    intro: "2인 협동을 강조한 모바일 슈팅 게임 런칭 캠페인.",
    type: "게임 광고",
    period: "2025.03 ~ 2025.06",
    note: "인플루언서 협업 진행"
  },
  { id: 4, title: "UNION PAY", poster: ad4, intro: "해외 결제 프로모션.", type: "금융 광고", period: "2025.04 ~ 2025.06", note: "-" },
  { id: 5, title: "LAIFEN", poster: ad5, intro: "프리미엄 면도기 브랜드 홍보.", type: "제품 광고", period: "2025.02 ~ 2025.05", note: "-" },
];

export default function AdvertiseDetail() {
  const params = useParams();
  // 두 패턴 모두 수용: /contents/advertise:adId /contents/advertise/:id
  const idStr = params.adId ?? params.id;
  const id = Number(String(idStr).replace(/[^0-9]/g, ""));
  const data = ADS.find(x => x.id === id);

  if (!data) return <div style={{ padding: 24, color: "#fff" }}>존재하지 않는 광고입니다.</div>;

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
