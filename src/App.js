import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    basename: "/",
    element: <Login />,
    errorElement:<ErrorBoundary />,
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
