import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "../../components/Button/Button";
import { handleLoginSuccess } from "../../utils/auth";
import { rootUrl } from "../../api/index";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function fetchUserInfo() {
  const token = localStorage.getItem("token");

  return fetch(`${rootUrl}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log({ data }))
    .catch((error) => console.error({ error }));
}

function Login() {
  return (
    <div>
      <div>ikony</div>
      <h1>Witaj w Eater!</h1>
      <p>
        Tu możesz zebrać swoje Przepisy i zaplanować Jadłospis, a następnie
        przygotujemy do Ciebie Listę Zakupów
      </p>
      <GoogleLogin
        clientId={GoogleClientId}
        onSuccess={handleLoginSuccess}
        isSignedIn={true}
        render={({ onClick, disabled }) => (
          <Button onClick={onClick}>Zaloguj się z Google</Button>
        )}
      />
      <Button onClick={fetchUserInfo}>User info</Button>
    </div>
  );
}

export default Login;
