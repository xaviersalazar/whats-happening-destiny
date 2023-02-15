import { Box } from "../../components/common";
import {
  CurrentLostSector,
  CurrentNightfall,
  CurrentRaid,
  CurrentDungeon,
  CurrentPsiOps,
} from "../../components/activities";

const Home = () => (
  <Box
    css={{
      paddingTop: "$12",
      paddingBottom: "$4",
    }}
  >
    <div className="grid grid-cols-1 gap-10 px-0 lg:grid-cols-2">
      <CurrentNightfall />
      <CurrentLostSector />
      <CurrentRaid />
      <CurrentDungeon />
      <CurrentPsiOps />
    </div>
  </Box>
);

export default Home;
