import propTypes from "prop-types";
import * as React from "react";
import { useGoogleLogin } from "react-use-googlelogin";
import { useNavigate } from "react-router";
import request from "@/api/request";

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const authContext = React.createContext({
  login: () => {},
  logout: () => {},
  authorizedRequest: () => {},
  loading: true,
  isLoggedIn: false,
});

const { Provider: AuthContextProvider } = authContext;

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const {
    googleUser,
    grantOfflineAccess,
    signOut,
    isSignedIn,
    refreshUser,
    isInitialized,
  } = useGoogleLogin({
    clientId: GoogleClientId,
    onSuccess: () => navigate("/"),
  });

  async function authorizedRequest(endpoint, { body, ...customConfig } = {}) {
    let { accessToken: token } = googleUser;

    try {
      return await request(endpoint, { body, token, ...customConfig });
    } catch (error) {
      const shouldRefreshToken = error.message === "Unauthorized";

      if (shouldRefreshToken) {
        const tokenObj = await refreshUser();
        token = tokenObj?.accessToken ?? token;
      }

      return request(endpoint, { body, token, ...customConfig });
    }
  }

  return (
    <AuthContextProvider
      value={{
        login: grantOfflineAccess,
        logout: signOut,
        authorizedRequest,
        loading: !isInitialized,
        isLoggedIn: isSignedIn,
        user: googleUser,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}

AuthProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};

export function useAuth() {
  const { login, logout, isLoggedIn, loading, user } =
    React.useContext(authContext);

  return { login, logout, isLoggedIn, loading, user };
}

export function useRequest() {
  const { authorizedRequest } = React.useContext(authContext);

  return authorizedRequest;
}
