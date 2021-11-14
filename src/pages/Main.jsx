import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import request from "../api/request";
import { handleLoginSuccess, handleLogoutSuccess } from "../utils/auth";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Main() {
  const [userInfo, setUserInfo] = React.useState();

  async function handleFetchUserInfo() {
    try {
      const data = await request("/auth/user");
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }

    // request("/auth/user")
    //   .then((data) => {
    //     setUserInfo(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  return (
    <div>
      <GoogleLogin
        clientId={GoogleClientId}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login
          </button>
        )}
        onSuccess={handleLoginSuccess}
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
      <hr />
      <button onClick={handleFetchUserInfo}>Fetch UserInfo</button>
      {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
      <hr />
      <Link to="/recipes">Recipes</Link>
    </div>
  );
}

export default Main;
