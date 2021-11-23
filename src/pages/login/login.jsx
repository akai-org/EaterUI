import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "../../components/Button/Button";
import { handleLoginSuccess } from "../../utils/auth";
import { Text } from "../../components/Text/Text";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Login() {
  return (
    <div>
      <div>ikony</div>
      <Text size="h1"> Witaj w Eater</Text>
      <Text>
        Tu możesz zebrać swoje Przepisy i zaplanować Jadłospis, a następnie
        przygotujemy do Ciebie Listę Zakupów
      </Text>
      <GoogleLogin
        clientId={GoogleClientId}
        onSuccess={handleLoginSuccess}
        isSignedIn={true}
        render={({ onClick, disabled }) => (
          <Button onClick={onClick} isDisabled={disabled}>
            Zaloguj się z Google
          </Button>
        )}
      />
    </div>
  );
}

export default Login;
