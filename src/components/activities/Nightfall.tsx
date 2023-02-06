import { Card, Col, Row, Text } from "@nextui-org/react";
import { useQueries, useQuery } from "react-query";
import {
  BUNGIE_BASE_URL,
  fetchDestinyActivityDefinition,
  fetchDestinyDestinationDefinition,
  fetchDestinyMilestones,
} from "../../api/api";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import { ACTIVITY_HASH, ACTIVITY_REWARDS_ICONS } from "../../utils/d2Data";
import { Box, Loader } from "../common";
import placeholderImg from "../../assets/black-bg.jpg";

type SectionProps = {
  sectionTitle: string;
  children?: any;
};

const Section = ({ sectionTitle, children }: SectionProps) => (
  <Box css={{ width: "auto", marginBottom: "$4" }}>
    <Box css={{ width: "fit-content" }}>
      <Text
        className="text-sm tracking-widest"
        weight="semibold"
        color="$white"
      >
        {sectionTitle}
      </Text>
      <Box
        css={{
          width: "75%",
          height: "0.05rem",
          borderRadius: "$2xl",
          background: "$white",
        }}
      />
    </Box>
    {children}
  </Box>
);

const Nightfall = () => {
  const { data, isSuccess, isLoading } = useQuery(
    "Milestones",
    fetchDestinyMilestones
  );

  const nightfallActivities =
    data?.Response?.[ACTIVITY_HASH.Nightfall]?.activities || [];

  const nightfalls = useQueries(
    nightfallActivities?.map((activity: any) => ({
      queryKey: ["ActivityDefinition", activity.activityHash],
      queryFn: () => fetchDestinyActivityDefinition(activity.activityHash),
      enabled: !!activity.activityHash,
    }))
  ) as any;

  const loadingNightfall =
    isLoading && nightfalls.every((nightfall: any) => nightfall.isLoading);

  const nightfall = nightfalls[0]?.data?.Response;

  const { data: destinationData } = useQuery(
    "DestinationDefinition",
    () => fetchDestinyDestinationDefinition(nightfall.destinationHash),
    {
      enabled: !!nightfall,
    }
  );

  const nightfallImg = useProgressiveImage(
    `${BUNGIE_BASE_URL}/${nightfall?.pgcrImage}`
  );

  if (!isSuccess && nightfalls.every((nightfall: any) => nightfall.isSuccess))
    return null;

  return loadingNightfall ? (
    <Loader />
  ) : (
    <Card
      css={{
        display: "grid",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${nightfallImg || placeholderImg})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      }}
    >
      <div className="bg-[#0f1114] opacity-50 h-full w-full row-start-1 col-start-1" />
      <div className="w-full h-full z-10 row-start-1 col-start-1">
        <Card.Header
          css={{ paddingLeft: "$8", paddingRight: "$8", paddingTop: "$10" }}
        >
          <Col>
            <Text
              className="tracking-widest"
              size="xx-small"
              weight="thin"
              color="$white"
            >
              NIGHTFALL{" "}
              {destinationData &&
                ` // ${destinationData?.Response?.displayProperties?.name.toUpperCase()}`}
            </Text>
            <Text className="text-3xl" weight="bold" color="$white">
              {nightfall?.displayProperties.description}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ paddingLeft: "$8", paddingRight: "$8" }}>
          <div className="grid grid-cols-1 gap-4">
            <Section sectionTitle="CHAMPIONS" />
            <Section sectionTitle="MODIFIERS" />
            <Section sectionTitle="REWARDS">
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div className="flex gap-x-2">
                  <img
                    src={ACTIVITY_REWARDS_ICONS["Ascendant Shard"]}
                    className="h-4 w-4 rounded-[0.25em]"
                  />
                  <Text className="text-xs" weight="thin" color="$white">
                    Ascendant Shard
                  </Text>
                </div>
                <div className="flex gap-x-2">
                  <img
                    src={ACTIVITY_REWARDS_ICONS["Exotic Gear"]}
                    className="h-4 w-4 rounded-[0.25em]"
                  />
                  <Text className="text-xs" weight="thin" color="$white">
                    Exotic Gear
                  </Text>
                </div>
                <div className="flex gap-x-2">
                  <img
                    src={ACTIVITY_REWARDS_ICONS["Adept Nightfall Weapon"]}
                    className="h-4 w-4 rounded-[0.25em]"
                  />
                  <Text className="text-xs" weight="thin" color="$white">
                    Adept Nightfall Weapon
                  </Text>
                </div>
              </div>
            </Section>
          </div>
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$dark solid #0f1114",
            bottom: "$0",
          }}
        >
          <Row>
            <Col>
              <Text className="text-xs" weight="normal" color="$white">
                Resets in 1 day
              </Text>
            </Col>
          </Row>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default Nightfall;
