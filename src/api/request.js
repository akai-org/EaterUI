import { rootUrl } from ".";
import { getToken } from "../utils/auth";

export default function request(endpoint, { body, ...customConfig } = {}) {
  const token = getToken();
  const headers = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${rootUrl}${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }

      const { message } = await response.json();
      return Promise.reject(new Error(message));
    });
}
