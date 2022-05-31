import React from "react";
import { useAuth } from "@/utils/auth";
import { Button, Icon, Text } from "@/components";
import styles from "./Login.module.scss";

function Login() {
  const { login, loading } = useAuth();

  return (
    <div className={styles.login}>
      <div className={styles.login_icons}>
        <Icon name="pencil" size="large" />
        <Icon name="calendar" size="large" />
        <Icon name="hamburger" size="large" />
      </div>
      <Text size="h2"> Witaj w Eater</Text>
      <Text className={styles.login_text}>
        Tu możesz zebrać swoje Przepisy i zaplanować Jadłospis, a następnie
        przygotujemy do Ciebie Listę Zakupów
      </Text>
      <Button
        onClick={() => login()}
        isDisabled={loading}
        fullwidth
        className={styles.login_button}
      >
        <Icon name="google" color="white" size="small"></Icon>
        <Text className={styles.login_button_text}>Zaloguj się z Google</Text>
      </Button>
    </div>
  );
}

export default Login;
