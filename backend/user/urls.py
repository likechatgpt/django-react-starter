# File: backend/user/urls.py
from django.urls import path
from .views import CurrentUserViewSet

app_name = "user"

# 将 ViewSet 的 action 映射为可路由的视图
account_view = CurrentUserViewSet.as_view({
    "get": "account",
    "put": "account",
    "delete": "account",
})

password_update_view = CurrentUserViewSet.as_view({
    "put": "password",
})

urlpatterns = [
    # 统一映射到 account action，根据 HTTP 方法区分 GET/PUT/DELETE
    path("account/", account_view, name="self-account"),
    # 为兼容你原先的前端路径，额外暴露 update/delete 两个 URL，仍指向同一 action
    path("account/update/", account_view, name="self-account-update"),
    path("account/delete/", account_view, name="self-account-delete"),

    # 修改密码（PUT） - 改为匹配前端的路径
    path("password/", password_update_view, name="self-password-update"),
]