import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ManagerReqPage from "./pages/ManagerReqPage";
import { AuthProvider } from "./AuthProvider";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/postanimenadzer", element: <ManagerReqPage /> },
  { path: "/admin", element: <AdminPage/>},
  { path: "/manager", element: <ManagerPage/>}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
