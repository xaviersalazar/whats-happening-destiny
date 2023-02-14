import { Page } from "../../components/common";
import { useSeason } from "../../context/Season";

const Season = () => {
  const { currentSeason } = useSeason();

  return <Page title="SEASON" subTitle={currentSeason?.name} />;
};

export default Season;
