import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { useSeason } from "../../context/Season";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import useResetTime from "../../hooks/useResetTime";
import { ActivityDefinition, Destination, Modifier } from "../../types/destiny";
import { beforePeriodRegex } from "../../utils/helpers";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentDungeon = {
  dungeon: ActivityDefinition;
  destination: Destination;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentDungeon = () => {
  const { currentSeason } = useSeason();
  const { resetTime } = useResetTime();

  const [isLoadingDungeon, setIsLoadingDungeon] = useState<boolean>(true);
  const [currentDungeon, setCurrentDungeon] = useState<CurrentDungeon | null>(
    null
  );
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { isLoading, isSuccess, data } = useQuery("CurrentDungeon", () =>
    getWhDestinyData("dungeon-schedule-s19")
  );

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getDungeon = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyDestinationDefinition",
      "DestinyActivityModifierDefinition",
    ]);

    const totalDaysInSeason = moment(currentSeason?.endDate).diff(
      currentSeason?.startDate,
      "days"
    );
    const daysLeftInSeason = moment(currentSeason?.endDate).diff(
      moment(),
      "days"
    );

    const currDungeonRotation = Math.floor(
      ((totalDaysInSeason - daysLeftInSeason) / 7) % data!.length
    );

    const dungeonData = data?.[currDungeonRotation];

    const dungeons = dungeonData?.activityHashes.map(
      (activityHash) => definitions[0][activityHash]
    );

    const dungeon = dungeons?.[dungeons?.length - 1] as ActivityDefinition;
    const destination = definitions?.[1][
      dungeon?.destinationHash
    ] as Destination;

    if (!dungeon) {
      setIsLoadingDungeon(false);
      setCurrentDungeon(null);

      return null;
    }

    const modifierHashes = [
      ...new Set(
        dungeon?.modifiers?.map(
          ({ activityModifierHash }) => activityModifierHash
        )
      ),
    ];
    const modifiers = modifierHashes.map(
      (modifierHash) => definitions[2][modifierHash]
    ) as Modifier[];
    const separatedModifiers = [
      modifiers?.filter(({ displayProperties }) =>
        displayProperties.name.match(/Champion|Champions/g)
      ),
      modifiers?.filter(
        ({ displayProperties }) =>
          !displayProperties.name.match(/Champion|Champions/g)
      ),
    ];

    loadActivityImage(`${BUNGIE_BASE_URL}/${dungeon?.pgcrImage}`);

    setCurrentDungeon({
      dungeon,
      destination,
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingDungeon(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getDungeon();
    }
  }, [isSuccess]);

  if (!isSuccess && !(isLoading || isLoadingDungeon)) return null;

  if (isLoading || isLoadingDungeon) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`DUNGEON ${` // ${
        currentDungeon?.destination?.displayProperties.name.toUpperCase() || ""
      }`}`}
      title={currentDungeon?.dungeon?.originalDisplayProperties.name || ""}
      description={`Resets ${moment(resetTime.weekly).fromNow()}`}
    >
      {!isEmpty(currentDungeon?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentDungeon?.champions.map(
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
      {!isEmpty(currentDungeon?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentDungeon?.modifiers.map(
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
    </Activity>
  );
};

export default CurrentDungeon;
