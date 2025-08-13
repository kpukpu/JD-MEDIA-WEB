import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koCommon from "./ko/common.json";
import enCommon from "./en/common.json";
import zhCommon from "./zh/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { common: koCommon },
      en: { common: enCommon },
      zh: { common: zhCommon },
    },
    lng: "ko",            // 최초 값(라우팅에서 즉시 교체)
    fallbackLng: "ko",
    interpolation: { escapeValue: false },
    defaultNS: "common",
  });

export default i18n;
