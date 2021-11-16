import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Button } from "../../components/Button/Button";
import { handleLoginSuccess } from "../../utils/auth";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
        render={({onClick,disabled}) => (
          <Button onClick={onClick}>Zaloguj się z Google</Button>
        )}
      />
      
    </div>
  );
}

export default Login;
