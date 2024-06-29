import { createBrowserRouter } from "react-router-dom";
import LayoutProfil from "../pageProfil/LayoutProfil";
import LayoutAuth from "../pageAuth/LayoutAuth";
import LogIn from "../pageAuth/pages/LogIn";
import Registration from "../pageAuth/pages/Registration";
import { SessionProvider } from "../Provider/Sessions";
import ResetPassword from "../pageAuth/pages/ResetPassword";
import ForgotPassword from "../pageAuth/pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SessionProvider>
        <LayoutProfil />
      </SessionProvider>
    ),
  },
  {
    path: "/auth",
    element: (
      <SessionProvider>
        <LayoutAuth />
      </SessionProvider>
    ),
    children: [
      { path: "/auth/login", element: <LogIn /> },
      { path: "/auth/registration", element: <Registration /> },
      { path: "/auth/reset-password", element: <ResetPassword /> },
      { path: "/auth/forgot", element: <ForgotPassword /> },
    ],
  },
]);
