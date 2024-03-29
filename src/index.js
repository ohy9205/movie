import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/auth/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Pick from "./pages/Pick";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import NewPost from "./components/community/NewPost";
import PostDetail from "./components/community/PostDetail";

document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "search",
          element: (
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          ),
        },
        {
          path: "community",
          element: (
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          ),
        },
        {
          path: "community/new",
          element: (
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          ),
        },
        {
          path: `community/detail/:postId`,
          element: (
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: `community/edit/:postId`,
          element: (
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          ),
        },
        {
          path: "my_pick",
          element: (
            <ProtectedRoute>
              <Pick />
            </ProtectedRoute>
          ),
        },
        { path: "sign_in", element: <SignIn /> },
        { path: "sign_up", element: <SignUp /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </AuthProvider>
  //  </React.StrictMode>
);
