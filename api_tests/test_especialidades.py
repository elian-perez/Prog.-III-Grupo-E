import requests

API = "http://localhost:3000/api/especialidades"


def test_especialidades_rbac(get_token, decode_jwt, test_users, auth_headers):

    print("\n================ ESPECIALIDADES RBAC ================\n")

    for email, password in test_users:

        token = get_token(email, password)
        decoded = decode_jwt(token)
        rol = int(decoded["rol"])

        headers = auth_headers(token)

        print(f"\n👤 Usuario: {email}")
        print(f"🔐 Rol: {rol}")

        # --------------------------------------------------
        # 🔴 ROLES 1 Y 2
        # --------------------------------------------------
        if rol in [1, 2]:

            r = requests.get(API, headers=headers)
            print("GET  →", r.status_code)

            if r.status_code == 200:
                print("📋 Especialidades:")
                for esp in r.json():
                    print(f"  - ID: {esp['id_especialidad']} | Nombre: {esp['nombre']}")

            assert r.status_code in [200, 401, 403]

            r = requests.post(API, json={"nombre": "TEST"}, headers=headers)
            print("POST →", r.status_code)
            assert r.status_code in [401, 403]

            r = requests.put(f"{API}/999999", json={"nombre": "EDIT"}, headers=headers)
            print("PUT  →", r.status_code)
            assert r.status_code in [401, 403]

            r = requests.delete(f"{API}/999999", headers=headers)
            print("DEL  →", r.status_code)
            assert r.status_code in [401, 403]

        # --------------------------------------------------
        # 🟢 ROL 3
        # --------------------------------------------------
        elif rol == 3:

            # GET
            r = requests.get(API, headers=headers)
            print("GET  →", r.status_code)

            if r.status_code == 200:
                print("📋 Especialidades:")
                for esp in r.json():
                    print(f"  - ID: {esp['id_especialidad']} | Nombre: {esp['nombre']}")

            assert r.status_code == 200

            # CREATE
            r = requests.post(
                API,
                json={"nombre": "CARDIOLOGÍA TEST"},
                headers=headers
            )

            print("POST →", r.status_code)
            assert r.status_code in [200, 201]

            data = r.json()
            id_created = data.get("id")

            print("🆔 ID creado:", id_created)
            assert id_created is not None

            # UPDATE
            r = requests.put(
                f"{API}/{id_created}",
                json={"nombre": "EDITADO TEST"},
                headers=headers
            )

            print("PUT →", r.status_code)
            assert r.status_code in [200, 400, 404]

            # DELETE
            r = requests.delete(f"{API}/{id_created}", headers=headers)
            print("DELETE →", r.status_code)
            assert r.status_code in [200, 404]

        print("--------------------------------------------------")

    print("\n================ OK ESPECIALIDADES ================\n")