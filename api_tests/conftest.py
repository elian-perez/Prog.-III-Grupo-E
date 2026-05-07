import pytest
import requests
import jwt

BASE_AUTH = "http://localhost:3000/api/auth"
SECRET = "mi_clave_super_secreta_123"


# -----------------------------
# USUARIOS DE PRUEBA
# -----------------------------
@pytest.fixture
def test_users():
    return [
        ("grojas@mail.com", "grojas"),     # rol 1
        ("sgiles@mail.com", "Uno.Dos"),    # rol 2
        ("agiles@mail.com", "Dos.Tres"),   # rol 3
    ]


# -----------------------------
# LOGIN → TOKEN
# -----------------------------
@pytest.fixture
def get_token():
    def _login(email, password):
        response = requests.post(
            f"{BASE_AUTH}/login",
            json={
                "email": email,
                "contrasenia": password
            }
        )

        assert response.status_code == 200, f"Fallo login {email}"

        return response.json()["token"]

    return _login


# -----------------------------
# DECODE JWT
# -----------------------------
@pytest.fixture
def decode_jwt():
    def _decode(token):
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    return _decode


# -----------------------------
# HEADERS AUTH
# -----------------------------
@pytest.fixture
def auth_headers():
    def _headers(token):
        return {
            "Authorization": f"Bearer {token}"
        }
    return _headers