# contact/urls.py
from django.urls import path
from .views import csrf_cookie, contact_submit

urlpatterns = [
    path("csrf/", csrf_cookie, name="csrf_cookie"),
    path("contact/", contact_submit, name="contact_submit"),
]
