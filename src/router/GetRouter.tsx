import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";
import MoviePage from "../pages/movie/MoviePage.tsx";
import BoardDetail from "../pages/board/BoardDetail.tsx";
import BoardPage from "../pages/board/BoardPage.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "todo", element: <TodoPage /> },
            { path: "coin", element: <CoinPage /> },
            { path: "movie", element: <MoviePage /> },
            {
                path: "board",
                children: [
                    { index: true, element: <BoardPage /> },
                    { path: ":id", element: <BoardDetail /> },
                ],
            },
        ],
    },
]);

export default GetRouter;
