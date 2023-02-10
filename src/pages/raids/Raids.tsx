import { useQuery } from "react-query";
import { getWhDestinyData } from "../../api/api";
import { Loader } from "../../components/common";
import RnD from "../../components/common/RnD/RnD";

const Raids = () => {
  const { isLoading, data } = useQuery("Raids", () =>
    getWhDestinyData("raid-data")
  );

  if (isLoading) return <Loader />;

  return <RnD data={data} />;
};

export default Raids;
