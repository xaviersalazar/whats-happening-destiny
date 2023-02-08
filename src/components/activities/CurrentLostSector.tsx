import { Text } from "@nextui-org/react";
import { isEmpty, uniqueId } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import {
  BUNGIE_BASE_URL,
  fetchDestinyActivityDefinition,
  fetchDestinyActivityModifierDefinition,
  fetchWhDestinyData,
  searchDestinyEntities,
} from "../../api/api";
import { CHAMPIONS, OTHER_ICONS } from "../../utils/d2Data";
import { beforePeriodRegex, beforeParenRegex } from "../../utils/helpers";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";

const CurrentLostSector = () => {
  const [resetTime, setResetTime] = useState<string>("");

  useEffect(() => {
    const now = moment();

    if (now.isBefore(moment().hour(11))) {
      const resetTime = moment()
        .set("hour", 11)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(moment(resetTime).fromNow());
    } else {
      const nextDailyReset = moment()
        .add(1, "day")
        .set("hour", 11)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(moment(nextDailyReset).utc().fromNow());
    }
  }, []);

  const { isLoading, isSuccess, data } = useQuery("LostSector", () =>
    fetchWhDestinyData("lost-sector-data.json")
  );

  const currentLostSector = data?.find((lostSector) => {
    const now = moment().utc();

    if (
      now.isSameOrBefore(
        moment().set("hour", 11).set("minute", 0).set("second", 0).utc()
      )
    )
      return (
        lostSector.Date === moment().subtract(1, "day").format("DD-MM-YYYY")
      );
    else return lostSector.Date === moment().format("DD-MM-YYYY");
  });

  const {
    isLoading: isLoadingLostSector,
    isSuccess: isLostSectorSuccess,
    data: lostSectorData,
  } = useQuery(
    "SearchLostSector",
    () =>
      searchDestinyEntities(
        "LostSectorSearch",
        currentLostSector?.["Lost sector"] as string
      ),
    { enabled: !!data }
  );

  const lostSectorSearchResults = [
    lostSectorData?.Response?.results?.results?.find((result: any) =>
      result?.displayProperties?.name.includes(": Legend")
    ) || [],
    lostSectorData?.Response?.results?.results?.find((result: any) =>
      result?.displayProperties?.name.includes(": Master")
    ) || [],
  ];

  const lostSectorQueries = useQueries(
    lostSectorSearchResults.map((lostSector) => ({
      queryKey: ["LostSectorActivityDefinition", lostSector.hash],
      queryFn: () => fetchDestinyActivityDefinition(lostSector.hash),
      enabled:
        !isEmpty(lostSectorSearchResults[0]) &&
        !isEmpty(lostSectorSearchResults[1]),
    }))
  );

  const isLoadingActivities = lostSectorQueries.every(
    (lostSector: any) => lostSector.isLoading
  );

  const masterLostSector = lostSectorQueries?.[1]?.data?.Response;

  const modifierHashes = [
    ...new Set(
      masterLostSector?.modifiers.map(
        (modifier: any) => modifier.activityModifierHash
      )
    ),
  ] as string[];

  const modifierQueries = useQueries(
    modifierHashes.map((activityModifierHash) => ({
      queryKey: ["LostSectorActivityModifierDefinition", activityModifierHash],
      queryFn: () =>
        fetchDestinyActivityModifierDefinition(activityModifierHash),
      enabled: !!lostSectorQueries,
    }))
  ) as any;

  const isLoadingModifiers = modifierQueries.every(
    (modifier: any) => modifier.isLoading
  );

  const modifiers = [
    modifierQueries?.filter((modifierData: any) =>
      modifierData.data?.Response?.displayProperties?.name.match(
        /Champion|Champions/g
      )
    ) || [],
    modifierQueries?.filter(
      (modifierData: any) =>
        !modifierData.data?.Response?.displayProperties?.name.match(
          /Champion|Champions/g
        )
    ) || [],
  ];

  if (
    isLoading ||
    isLoadingLostSector ||
    (isLoadingActivities && isLoadingModifiers)
  )
    return <Loader />;

  if (
    !isSuccess &&
    !isLostSectorSuccess &&
    lostSectorQueries.every((lostSector) => lostSector.isSuccess)
  )
    return null;

  return (
    <Activity
      imageSrc={`${BUNGIE_BASE_URL}/${lostSectorQueries[0]?.data?.Response?.pgcrImage}`}
      subTitle={`LOST SECTOR ${
        currentLostSector && ` // ${currentLostSector?.Planet.toUpperCase()}`
      }`}
      title={currentLostSector?.["Lost sector"] as string}
      description={`Resets ${resetTime}`}
    >
      <Section sectionTitle="CHAMPIONS">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
          {currentLostSector?.Champions.split(",").map((champion) => {
            const champ = champion.match(beforeParenRegex)?.[0].trim() || "";

            return !isEmpty(champ) ? (
              <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                <ModifierImage
                  src={CHAMPIONS[champ as keyof typeof CHAMPIONS].iconPath}
                  className="h-6 w-6"
                />
                <Box css={{ marginLeft: "$4" }}>
                  <Text size="$sm" weight="normal">
                    Champions: {champion.split("(")[0]}
                  </Text>
                  <Text size="$xs" weight="thin">
                    {CHAMPIONS[champ as keyof typeof CHAMPIONS].description}
                  </Text>
                </Box>
              </Box>
            ) : null;
          })}
        </div>
      </Section>
      {!isEmpty(modifiers?.[1]) && !isLoadingModifiers && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {modifiers[1].map(
              (modifierData: any) =>
                modifierData.data?.Response?.displayProperties.name && (
                  <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                    <ModifierImage
                      src={`${BUNGIE_BASE_URL}${modifierData.data?.Response?.displayProperties.icon}`}
                      className="h-6 w-6"
                    />
                    <Box css={{ marginLeft: "$4" }}>
                      <Text size="$sm" weight="normal">
                        {modifierData.data?.Response?.displayProperties?.name}
                      </Text>
                      <Text size="$xs" weight="thin">
                        {modifierData.data?.Response?.displayProperties?.description?.match(
                          beforePeriodRegex
                        )?.[0] ||
                          modifierData.data?.Response?.displayProperties
                            ?.description}
                      </Text>
                    </Box>
                  </Box>
                )
            )}
          </div>
        </Section>
      )}
      <Section sectionTitle="REWARDS">
        <div className="grid grid-cols-1 gap-x-2 mt-4">
          <div className="flex gap-x-2">
            <img
              src={OTHER_ICONS.Exotic.iconPath}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text size="$sm" weight="thin">
              Exotic {currentLostSector?.["Exotic reward"]}
            </Text>
          </div>
        </div>
      </Section>
    </Activity>
  );
};

export default CurrentLostSector;
