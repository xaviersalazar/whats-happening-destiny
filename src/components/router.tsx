import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import { Page, NoMatch, Loader } from "./common";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./home/Home"));
const RnD = lazy(() => import("./rnd/RnD"));

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
              <RnD activityType="dungeon" />
            </Suspense>
          </Page>
        ),
      },
      {
        path: "/raids",
        element: (
          <Page title="RAIDS" subTitle="Current raids in rotation">
            <Suspense fallback={<Loader />}>
              <RnD activityType="raid" />
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
