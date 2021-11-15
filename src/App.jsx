import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { handleLoginSuccess, handleLogoutSuccess } from "./utils/auth";
import request from "./api/request";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

async function handleFetchUserInfo() {
  const userInfo = await request("/auth/user");
  // eslint-disable-next-line no-console
  console.log({ userInfo });
}

function App() {
  return (
    <div>
      <p>Witaj w EaterUI! #2</p>
      <GoogleLogin
        clientId={GoogleClientId}
        onSuccess={handleLoginSuccess}
        isSignedIn={true}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login
          </button>
        )}
      />
      <GoogleLogout
        clientId={GoogleClientId}
        onLogoutSuccess={handleLogoutSuccess}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Logout
          </button>
        )}
      />
      <button onClick={handleFetchUserInfo}>Fetch UserInfo</button>
    </div>
  );
}

export default App;
