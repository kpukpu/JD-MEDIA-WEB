import React, { useEffect, useMemo, useRef, useState } from "react";
import "./contact-us.css";

/* Leaflet / react-leaflet */
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
/* 번들러에서 마커 아이콘 경로 이슈 해결 */
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
  lat: "",            // 선택 좌표(lat)
  lng: "",            // 선택 좌표(lng)
};

const getCookie = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

/* 지도 클릭 → 좌표 선택 */
function ClickToSetPosition({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function Contactus() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // 초기 중심(서울 시청 근방). 필요하면 수정 가능
  const [position, setPosition] = useState({ lat: 37.265149589, lng: 127.061427948078 });

  // CSRF 쿠키 수신
  useEffect(() => {
    fetch(`${API_BASE}/api/csrf/`, {
      method: "GET",
      credentials: "include",
    }).catch(() => {});
  }, []);

  // 좌표 변경 시 폼에 반영
  useEffect(() => {
    setForm((s) => ({
      ...s,
      lat: position.lat.toFixed(6),
      lng: position.lng.toFixed(6),
    }));
  }, [position]);

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
        body: JSON.stringify({
          ...form,
          ...(form.lat && form.lng ? { lat: Number(form.lat), lng: Number(form.lng) } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok !== true) throw new Error(data?.error || "전송 실패");
      setMsg({ type: "ok", text: "문의가 정상 접수되었습니다. 빠르게 연락드리겠습니다." });
      setForm(initialForm);
      // 필요 시 지도도 초기화:
      // setPosition({ lat: 37.5665, lng: 126.9780 });
    } catch (err) {
      setMsg({ type: "error", text: `전송 중 오류가 발생했습니다. (${err.message})` });
    } finally {
      setSending(false);
    }
  };

  // 드래그 가능한 마커
  const markerRef = useRef(null);
  const markerHandlers = useMemo(
    () => ({
      dragend() {
        const m = markerRef.current;
        if (m) {
          const next = m.getLatLng();
          setPosition({ lat: next.lat, lng: next.lng });
        }
      },
    }),
    []
  );

  return (
    <div className="contact-wrap">
      {/* 상단 공통 헤더 */}
      <header className="contact-header header--wide">
        <h1>CONTACT US</h1>
        <span className="req-note">* 표시 항목은 필수 입력 항목입니다.</span>
      </header>

      <div className="contact-split">
        {/* 좌측: 지도 */}
        <section className="map-col">
          <div className="map-header">
            <span className="map-note">지도를 클릭하거나 마커를 드래그하세요.</span>
          </div>

          <div className="map-box">
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={16}                 // 기본 확대
              maxZoom={19}
              scrollWheelZoom={true}     // 마우스 휠 확대 허용
              className="leaflet-host"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickToSetPosition onSelect={(latlng) => setPosition({ lat: latlng.lat, lng: latlng.lng })} />
              <Marker
                draggable
                eventHandlers={markerHandlers}
                position={[position.lat, position.lng]}
                ref={markerRef}
              >
                <Popup>드래그해서 위치 설정</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* 주소 표기 */}
          <p className="map-address">오시는 길 : 수원 영통구 삼성로 253 에이스스마트윙 1020호</p>

  
        </section>

        {/* 우측: 문의 폼 */}
        <form className="form-col" onSubmit={handleSubmit} noValidate>
          <div className="row two">
            <input className="input" name="last_name" value={form.last_name} onChange={onChange} placeholder="성*" required />
            <input className="input" name="first_name" value={form.first_name} onChange={onChange} placeholder="이름*" required />
          </div>

          <div className="row">
            <input className="input" type="email" name="email" value={form.email} onChange={onChange} placeholder="이메일 주소*" required />
          </div>

          <div className="row">
            <input className="input" name="company" value={form.company} onChange={onChange} placeholder="소속 (회사명)" />
          </div>

          <div className="row">
            <input className="input" name="job_title" value={form.job_title} onChange={onChange} placeholder="직종" />
          </div>

          <div className="row three">
            <input className="input" name="country" value={form.country} onChange={onChange} placeholder="국가" />
            <input className="input" name="dial_code" value={form.dial_code} onChange={onChange} placeholder="국가 번호* (예: +82)" required />
            <input className="input" name="phone" value={form.phone} onChange={onChange} placeholder="전화번호*" required />
          </div>

          <div className="row two">
            <input className="input" name="inquiry_type" value={form.inquiry_type} onChange={onChange} placeholder="문의 유형" />
            <input className="input" name="category" value={form.category} onChange={onChange} placeholder="분류" />
          </div>

          <div className="row">
            <input className="input" name="subject" value={form.subject} onChange={onChange} placeholder="문의 제목*" required />
          </div>

          <div className="row">
            <textarea className="textarea" name="message" value={form.message} onChange={onChange} placeholder="문의 내용" />
          </div>

          {msg.text && (
            <div className={`form-msg ${msg.type === "error" ? "error" : "ok"}`}>
              {msg.text}
            </div>
          )}

          <div className="row end">
            <button className="submit-btn" type="submit" disabled={sending}>
              {sending ? "전송 중..." : "문의 하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
