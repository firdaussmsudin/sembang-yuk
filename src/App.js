import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "https://firdaussmsudin.github.io/sembang-yuk/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
