import React, { useEffect, useState } from "react";
import "./contact-us.css";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  `${window.location.protocol}//${window.location.hostname}:8000`;

const initialForm = {
  last_name: "",      // 성*
  first_name: "",     // 이름*
  email: "",          // 이메일 주소*
  company: "",        // 소속(회사명)
  job_title: "",      // 직종
  country: "",        // 국가
  dial_code: "",      // 국가 번호* (예: +82)
  phone: "",          // 전화번호*
  inquiry_type: "",   // 문의 유형
  category: "",       // 분류
  subject: "",        // 문의 제목*
  message: "",        // 문의 내용
};

const getCookie = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

const Contactus = () => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // CSRF 쿠키 수신
  useEffect(() => {
    fetch(`${API_BASE}/api/csrf/`, {
      method: "GET",
      credentials: "include",
    }).catch(() => {});
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const required = [
      ["last_name", "성"],
      ["first_name", "이름"],
      ["email", "이메일 주소"],
      ["dial_code", "국가 번호"],
      ["phone", "전화번호"],
      ["subject", "문의 제목"],
    ];
    for (const [k, label] of required) {
      if (!form[k]?.trim()) return `${label}은(는) 필수입니다.`;
    }
    const reEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!reEmail.test(form.email)) return "이메일 형식이 올바르지 않습니다.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const v = validate();
    if (v) return setMsg({ type: "error", text: v });

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok !== true) throw new Error(data?.error || "전송 실패");
      setMsg({ type: "ok", text: "문의가 정상 접수되었습니다. 빠르게 연락드리겠습니다." });
      setForm(initialForm);
    } catch (err) {
      setMsg({ type: "error", text: `전송 중 오류가 발생했습니다. (${err.message})` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-wrap" onSubmit={handleSubmit} noValidate>
      <header className="contact-header">
        <h1>CONTACT US</h1>
        <span className="req-note">* 표시 항목은 필수 입력 항목입니다.</span>
      </header>

      {/* 성 / 이름 */}
      <div className="row two">
        <input className="input" name="last_name" value={form.last_name} onChange={onChange} placeholder="성*" required />
        <input className="input" name="first_name" value={form.first_name} onChange={onChange} placeholder="이름*" required />
      </div>

      {/* 이메일 */}
      <div className="row">
        <input className="input" type="email" name="email" value={form.email} onChange={onChange} placeholder="이메일 주소*" required />
      </div>

      {/* 소속 */}
      <div className="row">
        <input className="input" name="company" value={form.company} onChange={onChange} placeholder="소속 (회사명)" />
      </div>

      {/* 직종 */}
      <div className="row">
        <input className="input" name="job_title" value={form.job_title} onChange={onChange} placeholder="직종" />
      </div>

      {/* 국가/국가번호/전화번호 */}
      <div className="row three">
        <input className="input" name="country" value={form.country} onChange={onChange} placeholder="국가" />
        <input className="input" name="dial_code" value={form.dial_code} onChange={onChange} placeholder="국가 번호* (예: +82)" required />
        <input className="input" name="phone" value={form.phone} onChange={onChange} placeholder="전화번호*" required />
      </div>

      {/* 문의 유형 / 분류 */}
      <div className="row two">
        <input className="input" name="inquiry_type" value={form.inquiry_type} onChange={onChange} placeholder="문의 유형" />
        <input className="input" name="category" value={form.category} onChange={onChange} placeholder="분류" />
      </div>

      {/* 문의 제목 */}
      <div className="row">
        <input className="input" name="subject" value={form.subject} onChange={onChange} placeholder="문의 제목*" required />
      </div>

      {/* 문의 내용 */}
      <div className="row">
        <textarea className="textarea" name="message" value={form.message} onChange={onChange} placeholder="문의 내용" />
      </div>

      {/* 전송 결과 메시지 */}
      {msg.text && (
        <div className={`form-msg ${msg.type === "error" ? "error" : "ok"}`}>
          {msg.text}
        </div>
      )}

      {/* 버튼 */}
      <div className="row end">
        <button className="submit-btn" type="submit" disabled={sending}>
          {sending ? "전송 중..." : "문의 하기"}
        </button>
      </div>
    </form>
  );
};

export default Contactus;
