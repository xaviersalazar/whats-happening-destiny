import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Text } from "@nextui-org/react";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { BUNGIE_BASE_URL, getDestinyMilestones } from "../../api/api";
import { RAID_MILESTONE_HASHES } from "../../utils/d2Data";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { ActivityDefinition, Destination, Modifier } from "../../types/destiny";
import { beforePeriodRegex } from "../../utils/helpers";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentRaid = {
  raid: ActivityDefinition;
  destination: Destination;
  startDate: string;
  endDate: string;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentRaid = () => {
  const [isLoadingRaid, setIsLoadingRaid] = useState<boolean>(true);
  const [currentRaid, setCurrentRaid] = useState<CurrentRaid | null>(null);
  const [activityImage, setActivityImage] = useState(placeholderImage);
  const { data, isSuccess, isLoading } = useQuery(
    "Milestones",
    getDestinyMilestones
  );

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getRaid = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyDestinationDefinition",
      "DestinyActivityModifierDefinition",
    ]);

    const raidMilestones = Object.keys(data!.Response)
      .map((key) => {
        if (RAID_MILESTONE_HASHES.find((hash) => key == (hash as any))) {
          const activities = data!.Response[key].activities;

          if (
            activities.every(
              (activity) => activity.challengeObjectiveHashes.length > 0
            )
          ) {
            return data?.Response[key];
          }
        }
      })
      .filter((milestone) => milestone);

    const raidActivity =
      raidMilestones[0]?.activities[raidMilestones[0]?.activities.length - 1];

    const raid = definitions[0][
      raidActivity?.activityHash as keyof Object
    ] as ActivityDefinition;
    const destination = definitions[1][raid.destinationHash] as Destination;

    if (!raid) {
      setIsLoadingRaid(false);
      setCurrentRaid(null);
      return null;
    }

    const modifierHashes = [
      ...new Set(
        raid.modifiers.map(({ activityModifierHash }) => activityModifierHash)
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

    loadActivityImage(`${BUNGIE_BASE_URL}/${raid.pgcrImage}`);

    setCurrentRaid({
      raid,
      destination,
      startDate: raidMilestones[0]?.startDate || "",
      endDate: raidMilestones[0]?.endDate || "",
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingRaid(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getRaid();
    }
  }, [isSuccess]);

  if (!isSuccess && !(isLoading || isLoadingRaid)) return null;

  if (isEmpty(currentRaid)) return null;

  if (isLoading || isLoadingRaid) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`RAID ${` // ${
        currentRaid?.destination.displayProperties?.name.toUpperCase() || ""
      }`}`}
      title={currentRaid?.raid.originalDisplayProperties.name || ""}
      description={`Resets ${moment(currentRaid?.endDate).fromNow()}`}
    >
      {!isEmpty(currentRaid?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentRaid?.champions.map(
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
      {!isEmpty(currentRaid?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentRaid?.modifiers.map(
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

export default CurrentRaid;
