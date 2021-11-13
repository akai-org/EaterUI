import React from "react";
import { login, logout } from "./api/auth";

function App() {
  return (
    <div>
      <p>Witaj w EaterUI! #2</p>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
