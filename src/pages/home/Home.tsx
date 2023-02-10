import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import {
  DEFINITIONS,
  getDestinyDefinition,
  getDestinyManifest,
} from "../../api/api";
import { get, setMany } from "idb-keyval";
import { Box, Loader } from "../../components/common";
import {
  CurrentLostSector,
  CurrentNightfall,
} from "../../components/activities";

const Home = () => {
  const [isUpdatingManifest, setIsUpdatingManifest] = useState(true);

  const { isLoading, isSuccess, data } = useQuery(
    "Manifest",
    getDestinyManifest
  );
  const definitions = useQueries(
    DEFINITIONS.map((definition) => ({
      queryKey: [
        definition,
        data?.Response.jsonWorldComponentContentPaths.en[definition],
      ],
      queryFn: () =>
        getDestinyDefinition(
          data?.Response.jsonWorldComponentContentPaths.en[definition] as string
        ),
      enabled: false,
    }))
  );

  const isLoadingDefinitions = definitions.every(
    (definition) => definition.isLoading
  );

  const isDefinitionsSuccess = definitions.every(
    (definition) => definition.isSuccess
  );

  const checkVersion = async () => {
    // Get stored manifest version
    const storedManifestVersion = await get("ManifestVersion");

    if (!storedManifestVersion) {
      // Set the ManifestVersion and manifests needed if no stored version is found
      console.log("don't have a manifest version, fetch them all");

      definitions.forEach((definition) => {
        definition.refetch();
      });
    } else {
      // Manifest version found, check to see if its outdated
      if (storedManifestVersion !== data?.Response.version) {
        // Update ManifestVersion and manifests
        console.log("update stored manifest with new data");
      } else {
        // Got the latest manifest, continue on
        console.log("got the latest manifest");
        setIsUpdatingManifest(false);
      }
    }
  };

  useEffect(() => {
    if (data) {
      checkVersion();
    }
  }, [data]);

  useEffect(() => {
    if (isDefinitionsSuccess) {
      setMany([
        ["ManifestVersion", data?.Response?.version],
        [DEFINITIONS[0], definitions[0].data],
        [DEFINITIONS[1], definitions[1].data],
        [DEFINITIONS[2], definitions[2].data],
        [DEFINITIONS[3], definitions[3].data],
      ])
        .then(() => {
          console.log("saved the manifest(s)!");
          setIsUpdatingManifest(false);
        })
        .catch(() => {
          console.log("something went wrong trying to save the manifest(s)");
          setIsUpdatingManifest(false);
        });
    }
  }, [isDefinitionsSuccess]);

  if (!isSuccess && !(isUpdatingManifest || isLoading || isLoadingDefinitions))
    return null;

  if (isUpdatingManifest || isLoading || isLoadingDefinitions)
    return <Loader />;

  return (
    <Box
      css={{
        paddingTop: "$12",
        paddingBottom: "$4",
      }}
    >
      <div className="grid grid-cols-1 gap-10 px-0 lg:grid-cols-2">
        <CurrentNightfall />
        <CurrentLostSector />
      </div>
    </Box>
  );
};

export default Home;
