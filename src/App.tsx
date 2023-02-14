import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import router from "./components/router";
import "./App.css";
import { SeasonProvider } from "./context/Season";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 30 * (60 * 1000),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <SeasonProvider>
          <RouterProvider router={router} />
        </SeasonProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
