import { styled, Text } from "@nextui-org/react";
import { useQueries, useQuery } from "react-query";
import {
  BUNGIE_BASE_URL,
  fetchDestinyActivityDefinition,
  fetchDestinyActivityModifierDefinition,
  fetchDestinyDestinationDefinition,
  fetchDestinyMilestones,
} from "../../api/api";
import { ACTIVITY_HASH, ACTIVITY_REWARDS_ICONS } from "../../utils/d2Data";
import { Activity, Box, Loader } from "../common";
import { isEmpty, uniqueId } from "lodash";
import moment from "moment";
import { firstPeriodRegex } from "../../utils/helpers";

type SectionProps = {
  sectionTitle: string;
  children?: any;
};

const Section = ({ sectionTitle, children }: SectionProps) => (
  <Box
    css={{
      marginTop: "$4",
      marginBottom: "$4",
      marginLeft: "$1",
      marginRight: "$2",
    }}
  >
    <Box css={{ width: "fit-content", marginBottom: "$4" }}>
      <Text size="$xl" weight="bold">
        {sectionTitle}
      </Text>
      <Box
        css={{
          width: "75%",
          height: "0.12rem",
          borderRadius: "$2xl",
          background: "$almostBlack",
        }}
      />
    </Box>
    {children}
  </Box>
);

const ModifierImage = styled("img", {
  maxWidth: "initial",
  background: "$almostBlack",
  borderRadius: "50%",
  padding: "$1",
  position: "relative",
  top: "0.25rem",
});

const Nightfall = () => {
  const { data, isSuccess, isLoading } = useQuery(
    "Milestones",
    fetchDestinyMilestones
  );

  const nightfallActivities =
    data?.Response?.[ACTIVITY_HASH.Nightfall]?.activities || [];

  const nightfallEndDate =
    data?.Response?.[ACTIVITY_HASH.Nightfall]?.endDate || "";

  const nightfalls = useQueries(
    nightfallActivities?.map((activity: any) => ({
      queryKey: ["ActivityDefinition", activity.activityHash],
      queryFn: () => fetchDestinyActivityDefinition(activity.activityHash),
      enabled: !!activity.activityHash,
    }))
  ) as any;

  const isLoadingNightfalls =
    isLoading && nightfalls.every((nightfall: any) => nightfall.isLoading);

  const nightfall = nightfalls[nightfalls.length - 1]?.data?.Response;

  const { data: destinationData } = useQuery(
    "DestinationDefinition",
    () => fetchDestinyDestinationDefinition(nightfall.destinationHash),
    {
      enabled: !!nightfall,
    }
  );

  const modifierHashes = [
    ...new Set(
      nightfall?.modifiers.map((modifier: any) => modifier.activityModifierHash)
    ),
  ] as string[];

  const modifierQueries = useQueries(
    modifierHashes.map((activityModifierHash) => ({
      queryKey: ["ActivityModifierDefinition", activityModifierHash],
      queryFn: () =>
        fetchDestinyActivityModifierDefinition(activityModifierHash),
      enabled: !!nightfall,
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

  if (isLoading || isLoadingNightfalls || isLoadingModifiers) return <Loader />;

  if (!isSuccess && nightfalls.every((nightfall: any) => nightfall.isSuccess))
    return null;

  return (
    <Activity
      imageSrc={`${BUNGIE_BASE_URL}/${nightfall?.pgcrImage}`}
      subTitle={`NIGHTFALL ${
        destinationData &&
        ` // ${destinationData?.Response?.displayProperties?.name.toUpperCase()}`
      }`}
      title={nightfall?.displayProperties.description}
      description={`Resets ${moment(nightfallEndDate).fromNow()}`}
    >
      {!isEmpty(modifiers?.[0]) && !isLoadingModifiers && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {modifiers[0].map(
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
                          firstPeriodRegex
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
                          firstPeriodRegex
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

export default Nightfall;
