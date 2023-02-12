import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import { Dungeon } from "../../types/dungeon";
import { Destination } from "../../types/destination";
import { Modifier } from "../../types/modifier";
import { beforePeriodRegex } from "../../utils/helpers";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentDungeon = {
  dungeon: Dungeon;
  destination: Destination;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CURR_SEASON_IN_WEEKS = 12;
const CURR_SEASON_END_DATE = "2023-02-28T17:00:00Z";

const CurrentDungeon = () => {
  const [isLoadingDungeon, setIsLoadingDungeon] = useState<boolean>(true);
  const [currentDungeon, setCurrentDungeon] = useState<CurrentDungeon | null>(
    null
  );
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { isLoading, isSuccess, data } = useQuery("CurrentDungeon", () =>
    getWhDestinyData("dungeon-schedule-s19")
  );

  const resetTime = moment()
    .set("day", 2)
    .set("hour", 11)
    .set("minute", 0)
    .set("second", 0)
    .utc();

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

    let timeLeftInSeasonInWeeks = moment(CURR_SEASON_END_DATE).diff(
      moment(),
      "weeks"
    );

    if (moment().isAfter(resetTime)) {
      timeLeftInSeasonInWeeks -= 1;
    }

    const dungeonData =
      data?.[CURR_SEASON_IN_WEEKS - timeLeftInSeasonInWeeks - 1];

    const dungeons = dungeonData?.activityHashes.map(
      (activityHash) => definitions[0][activityHash]
    );

    const dungeon = dungeons?.[dungeons?.length - 1] as Dungeon;
    const destination = definitions[1][dungeon.destinationHash] as Destination;

    const modifierHashes = [
      ...new Set(
        dungeon.modifiers.map(
          ({ activityModifierHash }) => activityModifierHash
        )
      ),
    ];
    const modifiers = modifierHashes.map(
      (modifierHash) => definitions[2][modifierHash]
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

    loadActivityImage(`${BUNGIE_BASE_URL}/${dungeon.pgcrImage}`);

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
        currentDungeon?.destination.displayProperties?.name.toUpperCase() || ""
      }`}`}
      title={currentDungeon?.dungeon.originalDisplayProperties.name || ""}
      description={`Resets ${moment(resetTime).fromNow()}`}
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
                      <Text size="$sm" weight="normal">
                        {displayProperties?.name}
                      </Text>
                      <Text size="$xs" weight="thin">
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
                      <Text size="$sm" weight="normal">
                        {displayProperties?.name}
                      </Text>
                      <Text size="$xs" weight="thin">
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
