import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import fon from "./assets/Login.svg";

function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${fon})` }}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
