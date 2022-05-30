import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./utils/yup";
import { Layout } from "@/components";
import App from "./App";
import queryClient from "./queryClient";
import { AuthProvider } from "./utils/auth";

const isDevelopment = import.meta.env.DEV;

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <App />
          </Layout>
          {isDevelopment && <ReactQueryDevtools />}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
