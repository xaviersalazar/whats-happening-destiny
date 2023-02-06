import { Box } from "../common";
import { Nightfall } from "../activities";

const Home = () => {
  return (
    <Box
      css={{
        paddingTop: "$12",
        paddingBottom: "$4",
      }}
    >
      <div className="grid grid-cols-1 gap-10 px-0 md:grid-cols-2 xl:grid-cols-3">
        <Nightfall />
      </div>
    </Box>
  );
};

export default Home;
