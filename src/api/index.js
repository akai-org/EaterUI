// proxy url required to properly handle cookies when accessing the backend on Heroku
const defaultProxyUrl = "https://eater-ui.netlify.app/api";
export const rootUrl = import.meta.env.VITE_ROOT_URL || defaultProxyUrl;
