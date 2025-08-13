// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SUPPORTED_LANGS, useT, useLangPath } from "../i18n-lite";

import "./Header.css";

export default function Header() {
  const t = useT();
  const lp = useLangPath();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : "ko";

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 외부 클릭/ESC 닫기
  useEffect(() => {
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const changeLang = (newLang) => {
    const rest = location.pathname.replace(/^\/(ko|en|zh)(?=\/|$)/, "");
    const next = `/${newLang}${rest || ""}${location.search}${location.hash}`;
    setOpen(false);
    navigate(next, { replace: true });
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
        <Link to={`/${safeLang}`}>{t("brand")}</Link>
      </div>

      {/* 내비게이션 */}
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="dropdown">
            <span className="drop-btn">{t("nav.about")} ▾</span>
            <ul className="dropdown-menu">
              <li><Link to={lp("/about-us")}>{t("nav.about")}</Link></li>
              <li><Link to={lp("/notice")}>{t("nav.notice")}</Link></li>
            </ul>
          </li>
          <li><Link to={lp("/ad")}>{t("nav.works")}</Link></li>
          <li><Link to={lp("/howto")}>{t("nav.howto")}</Link></li>
          <li><Link to={lp("/contactus")}>{t("nav.contact")}</Link></li>
        </ul>
      </nav>

      {/* 언어 선택 */}
      <div className="right-tools">
        <div className="lang-selector" ref={ref}>
          <button
            type="button"
            className="lang-btn"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label="Change language"
            onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
            title="Change language"
          >
            {/* 라인형 지구본 */}
            <svg viewBox="0 0 24 24" className="lang-icon" aria-hidden="true" focusable="false">
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
                <path d="M5 7c2 .8 5 1.2 7 1.2S17 7.8 19 7" />
                <path d="M5 17c2-.8 5-1.2 7-1.2S17 16.2 19 17" />
              </g>
            </svg>
            <span className="lang-code" aria-hidden="true">{safeLang.toUpperCase()}</span>
          </button>

          {open && (
            <ul className="lang-menu" role="listbox">
              <li role="option" aria-selected={safeLang === "ko"}>
                <button type="button" onClick={() => changeLang("ko")}>한국어</button>
              </li>
              <li role="option" aria-selected={safeLang === "en"}>
                <button type="button" onClick={() => changeLang("en")}>English</button>
              </li>
              <li role="option" aria-selected={safeLang === "zh"}>
                <button type="button" onClick={() => changeLang("zh")}>中文</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
