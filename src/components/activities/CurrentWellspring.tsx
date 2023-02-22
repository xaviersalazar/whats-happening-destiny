import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Text } from "@nextui-org/react";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { useSeason } from "../../context/Season";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import useResetTime from "../../hooks/useResetTime";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { WellspringRotator } from "../../types/whDestinyData";
import { ActivityDefinition, Collectible, Modifier } from "../../types/destiny";
import { beforePeriodRegex } from "../../utils/helpers";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentWellspring = {
  wellspring: ActivityDefinition;
  reward: Collectible;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentWellspring = () => {
  const { currentSeason } = useSeason();
  const { resetTime } = useResetTime();

  const [isLoadingWellspring, setIsLoadingWellspring] = useState<boolean>(true);
  const [currentWellspring, setCurrentWellspring] =
    useState<CurrentWellspring | null>(null);
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { isLoading, isSuccess, data } = useQuery("CurrentWellspring", () =>
    getWhDestinyData("wellspring-schedule-s19")
  );

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getWellspring = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyActivityModifierDefinition",
      "DestinyCollectibleDefinition",
    ]);

    const totalDaysInSeason = moment(currentSeason?.endDate).diff(
      currentSeason?.startDate,
      "days"
    );
    const daysLeftInSeason = moment(currentSeason?.endDate).diff(
      moment(),
      "days"
    );

    const currWellspringRotation = Math.floor(
      ((totalDaysInSeason - daysLeftInSeason) / 7) % data!.length
    );

    let currWellspring = {} as WellspringRotator;

    if (moment().utc().get("hour") <= 17)
      currWellspring = data?.[currWellspringRotation] as WellspringRotator;
    else {
      if (currWellspringRotation === 2)
        currWellspring = data?.[0] as WellspringRotator;
      else currWellspring = data?.[currWellspringRotation] as WellspringRotator;
    }

    const wellspring = definitions[0][
      currWellspring?.activityHashes?.[1]
    ] as ActivityDefinition;
    const weapon = definitions[2][
      currWellspring?.collectibleHashes[0]
    ] as Collectible;

    const modifierHashes = [
      ...new Set(
        wellspring?.modifiers.map(
          ({ activityModifierHash }) => activityModifierHash
        )
      ),
    ];
    const modifiers = modifierHashes.map(
      (modifierHash) => definitions[1][modifierHash]
    ) as Modifier[];
    const separatedModifiers = [
      modifiers.filter(({ displayProperties }) =>
        displayProperties.name.match(/Champion|Champions/g)
      ),
      modifiers.filter(
        ({ displayProperties }) =>
          !displayProperties.name.match(/Champion|Champions/g)
      ),
    ];

    loadActivityImage(`${BUNGIE_BASE_URL}/${wellspring?.pgcrImage}`);

    setCurrentWellspring({
      wellspring,
      reward: weapon,
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingWellspring(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getWellspring();
    }
  }, [isSuccess]);

  if (
    (!isSuccess || isEmpty(currentWellspring?.wellspring)) &&
    !(isLoading || isLoadingWellspring)
  )
    return null;

  if (isLoading || isLoadingWellspring) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle="WELLSPRING // SAVATHÛN'S THRONE WORLD"
      title={currentWellspring?.wellspring.originalDisplayProperties.name || ""}
      description={`Resets ${moment(resetTime.daily).fromNow()}`}
    >
      {!isEmpty(currentWellspring?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentWellspring?.champions.map(
              ({ displayProperties }) =>
                displayProperties.name && (
                  <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                    <ModifierImage
                      src={`${BUNGIE_BASE_URL}${displayProperties.icon}`}
                      className="h-6 w-6"
                    />
                    <Box css={{ marginLeft: "$4" }}>
                      <Text className="text-sm font-medium">
                        {displayProperties?.name}
                      </Text>
                      <Text className="text-xs font-light">
                        {displayProperties?.description?.match(
                          beforePeriodRegex
                        )?.[0] || displayProperties?.description}
                      </Text>
                    </Box>
                  </Box>
                )
            )}
          </div>
        </Section>
      )}
      {!isEmpty(currentWellspring?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentWellspring?.modifiers.map(
              ({ displayProperties }) =>
                displayProperties.name && (
                  <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                    <ModifierImage
                      src={`${BUNGIE_BASE_URL}${displayProperties.icon}`}
                      className="h-6 w-6"
                    />
                    <Box css={{ marginLeft: "$4" }}>
                      <Text className="text-sm font-medium">
                        {displayProperties?.name}
                      </Text>
                      <Text className="text-xs font-light">
                        {displayProperties?.description?.match(
                          beforePeriodRegex
                        )?.[0] || displayProperties?.description}
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
              src={`${BUNGIE_BASE_URL}/${currentWellspring?.reward?.displayProperties?.icon}`}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text className="text-sm font-medium">
              {currentWellspring?.reward?.displayProperties?.name}
            </Text>
          </div>
        </div>
      </Section>
    </Activity>
  );
};

export default CurrentWellspring;
