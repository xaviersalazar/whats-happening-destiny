import { Outlet } from "react-router-dom";
import { Box } from "../shared";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => (
  <Box
    css={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      height: "100vh",
    }}
  >
    <Navbar />
    <Outlet />
    <Footer />
  </Box>
);

export default Layout;
