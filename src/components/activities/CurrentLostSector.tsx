import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { isEmpty, map, uniqueId } from "lodash";
import moment from "moment";
import { getMany } from "idb-keyval";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import useResetTime from "../../hooks/useResetTime";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { beforePeriodRegex } from "../../utils/helpers";
import { Modifier } from "../../types/modifier";
import { LostSector } from "../../types/lostSector";
import { ActivityData } from "../../types/activities";
import { OTHER_ICONS } from "../../utils/d2Data";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentLostSector = {
  lostSector: LostSector;
  whDestinyData: ActivityData;
  destination: string;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentLostSector = () => {
  const { resetTime } = useResetTime();

  const [isLoadingLostSector, setIsLoadingLostSector] = useState<boolean>(true);
  const [currentLostSector, setCurrentLostSector] =
    useState<CurrentLostSector | null>(null);
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { isLoading, isSuccess, data } = useQuery("LostSector", () =>
    getWhDestinyData("lost-sector-data")
  );

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getLostSector = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyActivityModifierDefinition",
    ]);

    const lostSectorToday = data?.find((lostSector) => {
      if (moment().utc().get("hour") <= 17)
        return (
          lostSector.Date === moment().subtract(1, "day").format("DD-MM-YYYY")
        );
      else return lostSector.Date === moment().format("DD-MM-YYYY");
    });

    const lostSectors = map(definitions[0], (value) => {
      if (
        value.displayProperties?.name.includes(
          lostSectorToday?.["Lost sector"]
        ) &&
        (value.displayProperties?.name.includes(": Legend") ||
          value.displayProperties?.name.includes(": Master"))
      ) {
        return value as LostSector;
      }
    }).filter((data) => data);

    const lostSector = lostSectors[lostSectors.length - 1] as LostSector;

    const modifierHashes = [
      ...new Set(
        lostSector?.modifiers.map(
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

    loadActivityImage(`${BUNGIE_BASE_URL}/${lostSector.pgcrImage}`);

    setCurrentLostSector({
      lostSector,
      whDestinyData: lostSectorToday as ActivityData,
      destination: lostSectorToday?.Planet as string,
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingLostSector(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getLostSector();
    }
  }, [isSuccess]);

  if (!isSuccess && !(isLoading || isLoadingLostSector)) return null;

  if (isLoading || isLoadingLostSector) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`LOST SECTOR ${` // ${currentLostSector?.destination.toUpperCase()}`}`}
      title={currentLostSector?.whDestinyData["Lost sector"] || ""}
      description={`Resets ${moment(resetTime.daily).fromNow()}`}
    >
      {!isEmpty(currentLostSector?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentLostSector?.champions.map(
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
      {!isEmpty(currentLostSector?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentLostSector?.modifiers.map(
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
      <Section sectionTitle="REWARDS">
        <div className="grid grid-cols-1 gap-x-2 mt-4">
          <div className="flex gap-x-2">
            <img
              src={OTHER_ICONS.Exotic.iconPath}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text size="$sm" weight="thin">
              Exotic {currentLostSector?.whDestinyData["Exotic reward"]}
            </Text>
          </div>
        </div>
      </Section>
    </Activity>
  );
};

export default CurrentLostSector;
