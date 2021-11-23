const tokenKey = "token";
export const getToken = () => localStorage.getItem(tokenKey);

export function handleLoginSuccess(data) {
  const { accessToken, profileObj } = data;
  // eslint-disable-next-line no-console
  console.log({ profileObj });
  localStorage.setItem(tokenKey, accessToken);
}

export function handleLogoutSuccess() {
  localStorage.removeItem(tokenKey);
}
