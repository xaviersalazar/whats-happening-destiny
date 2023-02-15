import { get, setMany, update } from "idb-keyval";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import {
  DEFINITIONS,
  getDestinyDefinition,
  getDestinyManifest,
  getDestinySettings,
} from "../../api/api";
import { useSeason } from "../../context/Season";
import { Settings } from "../../types/destiny/settings";
import { Season } from "../../types/season";
import { Box, Loader } from "../common";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const { currentSeason, setCurrentSeason } = useSeason();

  const [isCurrVersion, setIsCurrVersion] = useState<boolean>(true);
  const [isUpdatingManifest, setIsUpdatingManifest] = useState<boolean>(true);

  const { isLoading, isSuccess, data } = useQuery(
    "Manifest",
    getDestinyManifest
  );
  const {
    isLoading: isLoadingSettings,
    isSuccess: isSettingsSuccess,
    data: settingsData,
    refetch: refetchSettings,
  } = useQuery("Settings", getDestinySettings, {
    enabled: false,
  });
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

  const getSeason = async () => {
    const settings = settingsData as Settings;
    const seasonDefinitions = await get("DestinySeasonDefinition");

    const currSeasonHash =
      settings?.Response.destiny2CoreSettings.currentSeasonHash;
    const currSeason = seasonDefinitions[
      settings?.Response.destiny2CoreSettings.currentSeasonHash
    ] as Season;

    // No current season found yet or
    // Current season found is different from saved season
    // Set season in context
    if (isEmpty(currentSeason) || currentSeason?.seasonHash != currSeasonHash) {
      setCurrentSeason({
        name: currSeason?.displayProperties.name,
        description: currSeason?.displayProperties.description,
        startDate: currSeason?.startDate,
        endDate: currSeason?.endDate,
        seasonHash: currSeason?.hash,
        seasonPassHash: currSeason?.seasonPassHash,
      });

      setIsUpdatingManifest(false);
    } else {
      // Season already in context and up to date, continue on
      console.log("season is up to date");

      setIsUpdatingManifest(false);
    }
  };

  const checkVersion = async () => {
    // Get stored manifest version
    const storedManifestVersion = await get("ManifestVersion");

    if (!storedManifestVersion) {
      // Set the manifest version and manifests needed if no stored version is found
      console.log("don't have a manifest version, fetch them all");

      definitions.forEach((definition) => {
        definition.refetch();
      });
    } else {
      // Manifest version found, check to see if its outdated
      if (storedManifestVersion !== data?.Response.version) {
        // Update manifest version and definitions
        console.log("update stored manifest with new data");

        setIsCurrVersion(false);

        definitions.forEach((definition) => {
          definition.refetch();
        });
      } else {
        // Got the latest manifest, continue on
        // Save current season in context
        console.log("got the latest manifest, get settings");

        refetchSettings();
      }
    }
  };

  useEffect(() => {
    if (data) {
      checkVersion();
    }
  }, [data]);

  useEffect(() => {
    if (isDefinitionsSuccess && isCurrVersion) {
      // Manifest up to date or is a first-time save
      setMany([
        ["ManifestVersion", data?.Response?.version],
        [DEFINITIONS[0], definitions[0].data],
        [DEFINITIONS[1], definitions[1].data],
        [DEFINITIONS[2], definitions[2].data],
        [DEFINITIONS[3], definitions[3].data],
        [DEFINITIONS[4], definitions[4].data],
        [DEFINITIONS[5], definitions[5].data],
      ])
        .then(() => {
          // Get the current season
          console.log("saved the manifest(s)!");

          getSeason();
        })
        .catch(() => {
          console.log("something went wrong trying to save the manifest(s)");

          setIsUpdatingManifest(false);
        });
    }

    if (isDefinitionsSuccess && !isCurrVersion) {
      // Manifest wasn't up to date, update values
      update("ManifestVersion", () => data?.Response?.version);
      update(DEFINITIONS[0], () => definitions[0].data);
      update(DEFINITIONS[1], () => definitions[1].data);
      update(DEFINITIONS[2], () => definitions[2].data);
      update(DEFINITIONS[3], () => definitions[3].data);
      update(DEFINITIONS[4], () => definitions[4].data);
      update(DEFINITIONS[5], () => definitions[5].data).then(() => {
        // Set current version of manifest
        // Get the current season
        console.log("finished updating all definitions");

        setIsCurrVersion(true);

        getSeason();
      });
    }
  }, [isDefinitionsSuccess]);

  useEffect(() => {
    if (isSettingsSuccess) {
      getSeason();
    }
  }, [isSettingsSuccess]);

  const notYetSuccessfulButNotLoading =
    !isSuccess &&
    !(
      isUpdatingManifest ||
      isLoadingSettings ||
      isLoading ||
      isLoadingDefinitions
    );

  const loadingAnything =
    isUpdatingManifest ||
    isLoadingSettings ||
    isLoading ||
    isLoadingDefinitions;

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {notYetSuccessfulButNotLoading || loadingAnything ? (
        <Loader />
      ) : (
        <Outlet />
      )}
      <Footer />
    </Box>
  );
};

export default Layout;
