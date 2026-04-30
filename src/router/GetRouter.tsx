import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/todo", element: <TodoPage /> },
            { path: "/coin", element: <CoinPage /> },
        ],
    },
]);

export default GetRouter;
