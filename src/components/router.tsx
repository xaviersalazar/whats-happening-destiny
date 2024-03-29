import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { Page, NoMatch, Loader } from "./common";
import Season from "../pages/season/Season";

const Home = lazy(() => import("../pages/home/Home"));
const Raids = lazy(() => import("../pages/raids/Raids"));
const Dungeons = lazy(() => import("../pages/dungeons/Dungeons"));

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
        path: "/dungeons",
        element: (
          <Page title="DUNGEONS" subTitle="Current dungeons in rotation">
            <Suspense fallback={<Loader />}>
              <Dungeons />
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
        path: "/season",
        element: <Season />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default router;
