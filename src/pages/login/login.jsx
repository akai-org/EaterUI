import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "../../components/Button/Button";
import { handleLoginSuccess } from "../../utils/auth";
import { Icon } from "../../components/Icon/Icon";
import { Text } from "../../components/Text/Text";
import styles from "./login.module.scss";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.login_icons}>
        <Icon
          name="pencil"
          className={styles.ligin_icons_icon}
          size="large"
        ></Icon>
        <Icon
          name="calendar"
          className={styles.ligin_icons_icon}
          size="large"
        ></Icon>
        <Icon
          name="hamburger"
          className={styles.ligin_icons_icon}
          size="large"
        ></Icon>
      </div>
      <Text size="h2"> Witaj w Eater</Text>
      <Text className={styles.login_text}>
        Tu możesz zebrać swoje Przepisy i zaplanować Jadłospis, a następnie
        przygotujemy do Ciebie Listę Zakupów
      </Text>
      <GoogleLogin
        clientId={GoogleClientId}
        onSuccess={handleLoginSuccess}
        isSignedIn={true}
        render={({ onClick, disabled }) => (
          <Button
            onClick={onClick}
            isDisabled={disabled}
            fullwidth={true}
            className={styles.login_button}
          >
            <Icon name="google" color="white" size="small"></Icon>
            <Text className={styles.login_button_text}>
              Zaloguj się z Google
            </Text>
          </Button>
        )}
      />
    </div>
  );
}

export default Login;
