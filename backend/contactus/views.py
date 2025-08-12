import json
import re
import html
from django.http import JsonResponse, HttpRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie  # CSRF 쿠키 발급
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

RE_EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

@ensure_csrf_cookie
def csrf_cookie(request: HttpRequest):
    """
    프런트에서 최초 한 번 호출하여 csrftoken 쿠키를 받기 위한 엔드포인트.
    응답 본문은 { "ok": true } 이고, 헤더에 Set-Cookie: csrftoken=... 이 내려감.
    """
    return JsonResponse({"ok": True})


@require_POST
def contact_submit(request: HttpRequest):
    """
    문의 폼 접수 → 이메일 발송.
    - CSRF 활성 상태: 프런트가 X-CSRFToken 헤더로 쿠키값을 보내야 함.
    - 로그인 불필요. (urls.py/미들웨어에서 로그인 강제 금지)
    """
    # JSON 파싱
    try:
        data = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"ok": False, "error": "INVALID_JSON"}, status=400)

    # 필드 추출
    last_name  = (data.get("last_name") or "").strip()   # 성*
    first_name = (data.get("first_name") or "").strip()  # 이름*
    email      = (data.get("email") or "").strip()       # 이메일 주소*
    company    = (data.get("company") or "").strip()     # 소속(회사명)
    job_title  = (data.get("job_title") or "").strip()   # 직종
    country    = (data.get("country") or "").strip()     # 국가
    dial_code  = (data.get("dial_code") or "").strip()   # 국가 번호*
    phone      = (data.get("phone") or "").strip()       # 전화번호*
    inquiry_type = (data.get("inquiry_type") or "").strip()  # 문의 유형
    category     = (data.get("category") or "").strip()      # 분류
    subject      = (data.get("subject") or "").strip()       # 문의 제목*
    message      = (data.get("message") or "").strip()       # 문의 내용

    # 기본 검증
    missing = []
    for key, val in {
        "last_name": last_name,
        "first_name": first_name,
        "email": email,
        "dial_code": dial_code,
        "phone": phone,
        "subject": subject,
    }.items():
        if not val:
            missing.append(key)
    if missing:
        return JsonResponse({"ok": False, "error": "MISSING_FIELDS", "fields": missing}, status=400)

    if not RE_EMAIL.match(email):
        return JsonResponse({"ok": False, "error": "INVALID_EMAIL"}, status=400)

    # 메일 본문
    full_name = f"{last_name} {first_name}".strip()
    safe = {k: html.escape(v) for k, v in {
        "성": last_name,
        "이름": first_name,
        "이메일": email,
        "소속(회사명)": company,
        "직종": job_title,
        "국가": country,
        "국가 번호": dial_code,
        "전화번호": phone,
        "문의 유형": inquiry_type,
        "분류": category,
        "문의 제목": subject,
        "문의 내용": message,
    }.items()}

    text_body = (
        f"[CONTACT]\n"
        f"성: {safe['성']}\n이름: {safe['이름']}\n이메일: {safe['이메일']}\n"
        f"소속(회사명): {safe['소속(회사명)']}\n직종: {safe['직종']}\n국가: {safe['국가']}\n"
        f"국가 번호: {safe['국가 번호']}\n전화번호: {safe['전화번호']}\n"
        f"문의 유형: {safe['문의 유형']}\n분류: {safe['분류']}\n"
        f"문의 제목: {safe['문의 제목']}\n\n문의 내용:\n{safe['문의 내용']}\n"
    )

    html_body = f"""
    <h2>[CONTACT]</h2>
    <table border="1" cellspacing="0" cellpadding="6">
      <tr><th align="left">성</th><td>{safe['성']}</td></tr>
      <tr><th align="left">이름</th><td>{safe['이름']}</td></tr>
      <tr><th align="left">이메일</th><td>{safe['이메일']}</td></tr>
      <tr><th align="left">소속(회사명)</th><td>{safe['소속(회사명)']}</td></tr>
      <tr><th align="left">직종</th><td>{safe['직종']}</td></tr>
      <tr><th align="left">국가</th><td>{safe['국가']}</td></tr>
      <tr><th align="left">국가 번호</th><td>{safe['국가 번호']}</td></tr>
      <tr><th align="left">전화번호</th><td>{safe['전화번호']}</td></tr>
      <tr><th align="left">문의 유형</th><td>{safe['문의 유형']}</td></tr>
      <tr><th align="left">분류</th><td>{safe['분류']}</td></tr>
      <tr><th align="left">문의 제목</th><td>{safe['문의 제목']}</td></tr>
    </table>
    <h3 style="margin-top:16px;">문의 내용</h3>
    <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;">{safe['문의 내용']}</pre>
    """

    subject_line = f"[JD MEDIA 문의] {subject} - {full_name}"
    to_list = ["js.choi@jdmkorea.com"]   # 수신자
    reply_to = [email]                   # 답장 시 작성자에게 회신

    try:
        msg = EmailMultiAlternatives(
            subject=subject_line,
            body=text_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=to_list,
            reply_to=reply_to,
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send(fail_silently=False)
    except Exception as e:
        return JsonResponse({"ok": False, "error": "EMAIL_SEND_FAILED", "detail": str(e)}, status=500)

    return JsonResponse({"ok": True})
