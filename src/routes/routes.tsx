import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Conversation from "../components/Layout/Conversation";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SearchPeople from "../components/Layout/SearchPeople";
import Login from "../components/Auth/Login";
import Registration from "../components/Auth/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/app",
    element: <Layout />,

    children: [
      { index: true, element: <Conversation /> },
      { path: "search_people", element: <SearchPeople /> },
    ],
  },
]);

export default router;
