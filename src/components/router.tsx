import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import { Page, NoMatch, Loader } from "./common";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/home/Home"));
const Raids = lazy(() => import("../pages/raids/Raids"));
const Dungeons = lazy(() => import("../pages/dungeons/Dungeons"));
const Season = lazy(() => import("../pages/season/Season"));

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
        element: (
          <Page title="SEASON" subTitle="Current season">
            <Suspense fallback={<Loader />}>
              <Season />
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
