import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import Todo from "../pages/Todo.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "/todo", element: <Todo/>}
        ]
    },
]);

export default GetRouter;