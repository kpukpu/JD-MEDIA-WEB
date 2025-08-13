// src/i18n-lite.js
import { useParams } from "react-router-dom";

export const SUPPORTED_LANGS = ["ko", "en", "zh"];

export const dict = {
  ko: {
    brand: "JD MEDIA",
    nav: { about: "ABOUT US", works: "works", howto: "How to", contact: "CONTACT US", notice: "notice" },
    hero: { title: "당신의 브랜드를 더 크게", subtitle: "콘텐츠/광고/이벤트 원스톱 에이전시" }
  },
  en: {
    brand: "JD MEDIA",
    nav: { about: "ABOUT US", works: "works", howto: "How to", contact: "CONTACT US", notice: "notice" },
    hero: { title: "Amplify Your Brand", subtitle: "One-stop agency for content, ads, and events" }
  },
  zh: {
    brand: "JD MEDIA",
    nav: { about: "关于我们", works: "作品", howto: "使用指南", contact: "联系我们", notice: "公告" },
    hero: { title: "让您的品牌更响亮", subtitle: "内容·广告·活动 一站式服务" }
  }
};

function get(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
}

// ko → en → zh → fallback → key
export function translate(lang, key, fallback) {
  return (
    get(dict[lang], key) ??
    get(dict.ko, key) ??
    get(dict.en, key) ??
    get(dict.zh, key) ??
    fallback ??
    key
  );
}

export function useT() {
  const { lang } = useParams();
  const safe = SUPPORTED_LANGS.includes(lang) ? lang : "ko";
  return (key, fb) => translate(safe, key, fb);
}

export function useLangPath() {
  const { lang } = useParams();
  const safe = SUPPORTED_LANGS.includes(lang) ? lang : "ko";
  return (to = "") => {
    const p = to ? (to.startsWith("/") ? to : `/${to}`) : "";
    return `/${safe}${p}`;
  };
}
