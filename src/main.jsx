import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./utils/yup";
import App from "./App";
import { Layout } from "./components/Layout/Layout";
import queryClient from "./queryClient";

const isDevelopment = import.meta.env.DEV;

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <App />
      </Layout>
      {isDevelopment && <ReactQueryDevtools />}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
