import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import router from "./components/router";
import "./App.css";

function App() {
  return (
    <NextUIProvider theme={theme}>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;
