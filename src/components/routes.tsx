import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import { Page } from "./shared";
import PageLoader from "./shared/PageLoader";

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
    ],
  },
];

export default routes;
