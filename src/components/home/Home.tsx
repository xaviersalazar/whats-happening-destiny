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
      <div className="grid grid-cols-1 gap-x-10 gap-y-2 px-0 lg:grid-cols-2">
        <Nightfall />
      </div>
    </Box>
  );
};

export default Home;
