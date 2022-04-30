import { rootUrl } from "./index";

export default function request(
  endpoint,
  { body, token, ...customConfig } = {},
) {
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
      if (response.status === 401) {
        return Promise.reject(new Error("Unauthorized"));
      }

      if (response.ok) {
        return response.json();
      }

      const { message } = await response.json();
      return Promise.reject(new Error(message));
    });
}
