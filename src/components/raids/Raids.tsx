import { Text } from "@nextui-org/react";
import useSupabase from "../../supabase/useSupabase";
import { Loader } from "../common";
import { fileMap } from "../utils/fileMap";

const Raids = () => {
  const { data, loading } = useSupabase(`activities/${fileMap.RAIDS}`);

  if (loading) return <Loader />;

  console.log(data);

  return <Text h1>Raids</Text>;
};

export default Raids;
