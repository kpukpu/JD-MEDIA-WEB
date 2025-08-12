from pathlib import Path
import os
from dotenv import load_dotenv   # 추가
# ── 기본 경로 ──────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

# ── 보안/실행 ──────────────────────────────────────
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-secret-key-change-me")
DEBUG = os.getenv("DEBUG", "True") == "True"
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "43.202.174.232"]

# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
load_dotenv(BASE_DIR / ".env", override=True)  # ★ override=True 추가

# ── 앱 ─────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",   # CORS
    "contactus",     # 당신의 앱 이름
]

# ── 미들웨어 (corsheaders는 CommonMiddleware보다 위) ─────────
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",   # ★ 위치 중요
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # ※ LoginRequiredMiddleware 같은 로그인 강제 미들웨어가 있다면 주석 처리하거나
    #    /api/csrf/, /api/contact/ 는 화이트리스트로 제외하세요.
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# ── DB (로컬 기본 sqlite3) ─────────────────────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ── 비밀번호 검증 ──────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ── 국제화 ────────────────────────────────────────
LANGUAGE_CODE = "ko-kr"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_TZ = False

# ── 정적 파일 ─────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── 이메일 (SMTP; 환경변수로 세팅 권장) ─────────────────────
# 실제 발송하려면 .env 또는 환경변수에 아래 값들을 채우세요.
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.naver.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "465"))
EMAIL_USE_SSL = os.getenv("EMAIL_USE_SSL", "True") == "True"  # ★ 465용
#EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "false") == "False"   # 587용
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "daejo99@naver.com")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "******")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "daejo99@jdmkorea.com")

# ── CORS / CSRF (로컬 개발용) ───────────────────────
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://43.202.174.232",
]
CORS_ALLOW_CREDENTIALS = True  # 쿠키 전송 허용

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http//43.202.174.232",
]

CORS_ALLOW_METHODS = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
CORS_ALLOW_HEADERS = [
    "accept", "accept-encoding", "authorization", "content-type", "dnt",
    "origin", "user-agent", "x-csrftoken", "x-requested-with",
]
