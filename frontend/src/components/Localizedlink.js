import React from "react";
import { Link, useParams } from "react-router-dom";

export default function LocalizedLink({ to, ...props }) {
  const { lang } = useParams();
  const prefix = `/${lang || "ko"}`;

  // to가 절대/상대 관계없이 안전하게 결합되도록 처리
  const normalized = to.startsWith("/") ? to : `/${to}`;
  const href = `${prefix}${normalized}`.replace(/\/+$/, "") || prefix;

  return <Link to={href} {...props} />;
}
