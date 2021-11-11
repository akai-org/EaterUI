import React from "react";
import { login, logout } from "./api/auth";

function App() {
  return (
    <>
      <p>Witaj w EaterUI!</p>
      <button onClick={login}>Login with Google</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default App;
