import { createBrowserRouter } from "react-router-dom";
import { Home,Cart } from "./pages";
import { Layout } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  }
]);
