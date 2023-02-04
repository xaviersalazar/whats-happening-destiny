import { Card, Grid, Image, styled, Text } from "@nextui-org/react";
import { Fragment } from "react";
import useSupabase from "../../supabase/useSupabase";
import { Box, Loader } from "../common";
import { fileMap } from "../utils/fileMap";
import { isEmpty, uniqueId } from "lodash";
import powerLevelIcon from "../../assets/power-level-icon.png";

type SectionProps = {
  id?: string;
  sectionTitle: string;
  children?: any;
};

type ModeProps = {
  modeType?: string;
  powerLevel?: string;
};

const Section = ({ id, sectionTitle, children }: SectionProps) => (
  <Box
    id={uniqueId(id)}
    css={{
      marginTop: "$4",
      marginBottom: "$4",
      marginLeft: "$2",
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

const Mode = ({ modeType, powerLevel }: ModeProps) => (
  <Box
    css={{
      display: "flex",
    }}
  >
    <Text
      size="$xs"
      weight="normal"
      css={{ marginRight: "$2", flex: "0 1 auto" }}
    >
      {modeType}:
    </Text>
    <img
      src={powerLevelIcon}
      height={8}
      style={{
        flex: "none",
        position: "relative",
        top: "0.25rem",
        marginRight: "0.1rem",
      }}
    />
    <Text
      size="$xs"
      weight="semibold"
      css={{ color: "$warning", flex: "0 1 auto" }}
    >
      {powerLevel}
    </Text>
  </Box>
);

const ModifierImage = styled("img", {
  maxWidth: "initial",
  background: "$almostBlack",
  borderRadius: "50%",
  padding: "$1",
});

const Raids = () => {
  const { data, loading } = useSupabase(`activities/${fileMap.RAIDS}`);

  if (loading) return <Loader />;

  console.log(data);

  return (
    <Box
      css={{
        paddingTop: "$4",
        paddingBottom: "$4",
      }}
    >
      <Grid.Container
        gap={4}
        justify="center"
        css={{
          paddingLeft: "$0",
          paddingRight: "$0",
        }}
      >
        {data?.data.map(
          ({
            name,
            location,
            description,
            image,
            modes,
            extraRewards,
            modifiers,
            encounters,
          }) => (
            <Grid
              key={name}
              xs={12}
              css={{ paddingLeft: "$8", paddingRight: "$8" }}
              id={name}
            >
              <Card
                variant="flat"
                css={{
                  background: "inherit",
                }}
              >
                <Box id={uniqueId("information_")} css={{ padding: "$4" }}>
                  <Card.Image
                    src={image}
                    css={{ borderRadius: "$md", marginBottom: "$8" }}
                  />
                  <Text
                    weight="thin"
                    size="$xs"
                    css={{
                      letterSpacing: "$widest",
                      marginBottom: "$0",
                      marginLeft: "$1",
                    }}
                  >
                    {location.toUpperCase()}
                  </Text>
                  <Text
                    size="$5xl"
                    weight="extrabold"
                    css={{
                      margin: "$0",
                      lineHeight: "$xs",
                    }}
                  >
                    {name}
                  </Text>
                  <Text
                    size="$xs"
                    weight="thin"
                    css={{
                      fontStyle: "italic",
                      marginTop: "$4",
                      marginLeft: "$1",
                    }}
                  >
                    {description}
                  </Text>
                  <Section id="light_level_" sectionTitle="LIGHT LEVEL">
                    {modes.map(({ type, recommendedLightLevel }) => (
                      <Fragment key={uniqueId("mode_")}>
                        <Mode
                          modeType={type}
                          powerLevel={recommendedLightLevel}
                        />
                      </Fragment>
                    ))}
                  </Section>
                  {!isEmpty(modifiers) && (
                    <Section id="modifiers_" sectionTitle="MODIFIERS">
                      {modifiers.map(({ typeModifiers }) => (
                        <Fragment key={uniqueId("modifier_")}>
                          <Grid.Container
                            gap={2}
                            css={{
                              paddingLeft: "$0",
                              paddingRight: "$0",
                            }}
                          >
                            {typeModifiers?.map(
                              ({ name, description, iconPath }) => (
                                <Grid key={uniqueId("type_modifier_")} xs={12}>
                                  <Box css={{ display: "flex" }}>
                                    <ModifierImage
                                      src={iconPath as string}
                                      height={28}
                                    />
                                    <Box css={{ marginLeft: "$4" }}>
                                      <Text size="$xs" weight="normal">
                                        {name}
                                      </Text>
                                      <Text size="$xs" weight="thin">
                                        {description}
                                      </Text>
                                    </Box>
                                  </Box>
                                </Grid>
                              )
                            )}
                          </Grid.Container>
                        </Fragment>
                      ))}
                    </Section>
                  )}
                  {!isEmpty(extraRewards) && (
                    <Section id="extras_" sectionTitle="EXTRAS">
                      {extraRewards.map(({ title, description }) => (
                        <Fragment key={uniqueId("extra_rewards_")}>
                          <Text size="$xs" weight="normal">
                            {title}
                          </Text>
                          <Text size="$xs" weight="thin">
                            {description}
                          </Text>
                        </Fragment>
                      ))}
                    </Section>
                  )}
                  <Section id="encounters_" sectionTitle="ENCOUNTERS"></Section>
                </Box>
              </Card>
            </Grid>
          )
        )}
      </Grid.Container>
    </Box>
  );
};

export default Raids;
