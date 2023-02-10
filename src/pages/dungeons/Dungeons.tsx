import { useQuery } from "react-query";
import { getWhDestinyData } from "../../api/api";
import { Loader } from "../../components/common";
import RnD from "../../components/common/RnD/RnD";

const Dungeon = () => {
  const { isLoading, data } = useQuery("Dungeons", () =>
    getWhDestinyData("dungeon-data")
  );

  if (isLoading) return <Loader />;

  return <RnD data={data} />;
};

export default Dungeon;
