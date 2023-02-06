import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import router from "./components/router";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
