import Home from "./home/Home";
import Layout from "./layout/Layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default routes;
