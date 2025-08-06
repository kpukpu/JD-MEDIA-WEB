import React from "react";
import "./contact-us.css";

const Contactus = () => {
  return (
    <div className="contact-wrap">
      <header className="contact-header">
        <h1>CONTACT US</h1>
        <span className="req-note">* 표시 항목은 필수 입력 항목입니다.</span>
      </header>

      {/* 성 / 이름 */}
      <div className="row two">
        <input className="input" placeholder="성*" />
        <input className="input" placeholder="이름*" />
      </div>

      {/* 이메일 */}
      <div className="row">
        <input className="input" placeholder="이메일 주소*" />
      </div>

      {/* 소속 */}
      <div className="row">
        <input className="input" placeholder="소속 (회사명)" />
      </div>

      {/* 직종 */}
      <div className="row">
        <input className="input" placeholder="직종" />
      </div>

      {/* 국가/국가번호/전화번호 */}
      <div className="row three">
        <input className="input" placeholder="국가" />
        <input className="input" placeholder="국가 번호*" />
        <input className="input" placeholder="전화번호*" />
      </div>

      {/* 문의 유형 / 분류 */}
      <div className="row two">
        <input className="input" placeholder="문의 유형" />
        <input className="input" placeholder="분류*" />
      </div>

      {/* 문의 제목 */}
      <div className="row">
        <input className="input" placeholder="문의 제목*" />
      </div>

      {/* 문의 내용 */}
      <div className="row">
        <textarea className="textarea" placeholder="문의 내용" />
      </div>

      {/* 버튼 (동작 없음) */}
      <div className="row end">
        <button className="submit-btn" type="button">문의 하기</button>
      </div>
    </div>
  );
};

export default Contactus;
