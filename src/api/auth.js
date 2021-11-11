import { rootUrl } from "./index";

export function login() {
  const { origin } = window.location;
  window.open(`${rootUrl}/auth/google?origin=${origin}`, "_self");
}

export function logout() {
  const { origin } = window.location;
  window.open(`${rootUrl}/auth/logout?origin=${origin}`, "_self");
}
