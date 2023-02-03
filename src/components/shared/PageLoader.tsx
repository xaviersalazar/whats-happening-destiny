import Box from "./Box";

const PageLoader = () => (
  <Box
    css={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      height: "100vh",
    }}
  >
    Loading...
  </Box>
);

export default PageLoader;
