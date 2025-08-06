import React from "react";
import "./detail.css";

/**
 * props:
 *  - title: 문자열
 *  - poster: 이미지 url
 *  - intro: 소개
 *  - type: 유형
 *  - period: 광고 기간 (예: 2025.05.24 ~ 2025.06.29)
 *  - note: 비고
 */
export default function DetailLayout({ title, poster, intro, type, period, note }) {
  return (
    <div className="detail-wrap">
      {/* 제목 */}
      <h1 className="detail-title">{title}</h1>

      {/* 본문 */}
      <div className="detail-body">
        {/* 좌측: 이미지 */}
        <div className="detail-left">
          {poster && (
            <img src={poster} alt={title} className="detail-poster" />
          )}
        </div>

        {/* 우측: 메타 정보 4개 */}
        <div className="detail-right">
          <section className="meta">
            <h3>소개</h3>
            <p>{intro || "-"}</p>
          </section>

          <section className="meta">
            <h3>유형</h3>
            <p>{type || "-"}</p>
          </section>

          <section className="meta">
            <h3>광고 기간</h3>
            <p>{period || "-"}</p>
          </section>

          <section className="meta">
            <h3>비고</h3>
            <p>{note || "-"}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
