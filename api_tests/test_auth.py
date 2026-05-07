def test_login_y_roles(get_token, decode_jwt, test_users):

    print("\n================ LOGIN & ROLES ================\n")

    for email, password in test_users:

        token = get_token(email, password)
        decoded = decode_jwt(token)

        print(f"👤 Usuario: {email}")
        print(f"🆔 ID     : {decoded['id']}")
        print(f"🔐 Rol    : {decoded['rol']}")
        print("--------------------------------------------------")

        assert decoded["email"] == email
        assert decoded["rol"] in [1, 2, 3]

    print("\n================ OK ================\n")