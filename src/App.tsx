import { useRoutes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import routes from "./components/routes";
import theme from "./theme";

function App() {
  return <NextUIProvider theme={theme}>{useRoutes(routes)}</NextUIProvider>;
}

export default App;
