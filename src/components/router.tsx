import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import { Page, NoMatch, Loader } from "./common";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./home/Home"));
const Raids = lazy(() => import("./raids/Raids"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Page title="WHATS HAPPENING" subTitle="This week in Destiny">
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </Page>
        ),
      },
      {
        path: "/raids",
        element: (
          <Page title="RAIDS" subTitle="Current raids in rotation">
            <Suspense fallback={<Loader />}>
              <Raids />
            </Suspense>
          </Page>
        ),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default router;
