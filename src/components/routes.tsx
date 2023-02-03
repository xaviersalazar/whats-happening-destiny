import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import { Page, PageLoader, NoMatch } from "./common";

const Home = lazy(() => import("./home/Home"));
const Raids = lazy(() => import("./raids/Raids"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Page title="WHATS HAPPENING" subTitle="This week in Destiny">
              <Home />
            </Page>
          </Suspense>
        ),
      },
      {
        path: "/raids",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Page title="RAIDS" subTitle="Current raids in rotation">
              <Raids />
            </Page>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
];

export default routes;
