import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { isEmpty, uniqueId } from "lodash";
import moment from "moment";
import { getMany } from "idb-keyval";
import { BUNGIE_BASE_URL, getDestinyMilestones } from "../../api/api";
import { ACTIVITY_HASH, ACTIVITY_REWARDS_ICONS } from "../../utils/d2Data";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { beforePeriodRegex } from "../../utils/helpers";
import { Nightfall } from "../../types/nightfall";
import { Modifier } from "../../types/modifier";
import { Destination } from "../../types/destination";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentNightfall = {
  nightfall: Nightfall;
  destination: Destination;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentNightfall = () => {
  const [isLoadingNightfall, setIsLoadingNightfall] = useState<boolean>(true);
  const [currentNightfall, setCurrentNightfall] =
    useState<CurrentNightfall | null>(null);
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { data, isSuccess, isLoading } = useQuery(
    "Milestones",
    getDestinyMilestones
  );

  const nightfallActivities =
    data?.Response?.[ACTIVITY_HASH.Nightfall]?.activities || [];

  const nightfallEndDate =
    data?.Response?.[ACTIVITY_HASH.Nightfall]?.endDate || "";

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getNightfall = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyDestinationDefinition",
      "DestinyActivityModifierDefinition",
    ]);

    const nightfalls = nightfallActivities?.map(
      ({ activityHash }) => definitions[0][activityHash]
    );

    const nightfall = nightfalls[nightfalls.length - 1] as Nightfall;
    const destination = definitions[1][
      nightfall.destinationHash
    ] as Destination;

    const modifierHashes = [
      ...new Set(
        nightfall.modifiers.map(
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

    loadActivityImage(`${BUNGIE_BASE_URL}/${nightfall.pgcrImage}`);

    setCurrentNightfall({
      nightfall,
      destination,
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingNightfall(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getNightfall();
    }
  }, [isSuccess]);

  if (!isSuccess && !(isLoading || isLoadingNightfall)) return null;

  if (isLoading || isLoadingNightfall) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`NIGHTFALL ${` // ${
        currentNightfall?.destination.displayProperties?.name.toUpperCase() ||
        ""
      }`}`}
      title={currentNightfall?.nightfall.displayProperties.description || ""}
      description={`Resets ${moment(nightfallEndDate).fromNow()}`}
    >
      {!isEmpty(currentNightfall?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentNightfall?.champions.map(
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
      {!isEmpty(currentNightfall?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentNightfall?.modifiers.map(
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
        <div className="grid grid-cols-1 gap-x-2 gap-y-3 mt-4">
          <div className="flex gap-x-2">
            <img
              src={ACTIVITY_REWARDS_ICONS["Ascendant Shard"]}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text size="$sm" weight="thin">
              Ascendant Shard
            </Text>
          </div>
          <div className="flex gap-x-2">
            <img
              src={ACTIVITY_REWARDS_ICONS["Exotic Gear"]}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text size="$sm" weight="thin">
              Exotic Gear
            </Text>
          </div>
          <div className="flex gap-x-2">
            <img
              src={ACTIVITY_REWARDS_ICONS["Adept Nightfall Weapon"]}
              className="h-6 w-6 rounded-[0.25rem]"
            />
            <Text size="$sm" weight="thin">
              Adept Nightfall Weapon
            </Text>
          </div>
        </div>
      </Section>
    </Activity>
  );
};

export default CurrentNightfall;
