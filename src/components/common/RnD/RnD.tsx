import { Fragment } from "react";
import { styled, Text } from "@nextui-org/react";
import { isEmpty, uniqueId } from "lodash";
import { ActivityData } from "../../../types/activities";
import powerLevelIcon from "../../../assets/power-level-icon.png";
import Encounters from "./Encounters";
import Box from "../Box";
import Activity from "../Activity";
import Section from "../Section";

interface RnDProps {
  data: [ActivityData] | undefined;
}

interface ModeProps {
  modeType?: string;
  powerLevel?: string;
}

const Mode = ({ modeType, powerLevel }: ModeProps) => (
  <Box
    css={{
      display: "flex",
    }}
  >
    <Text
      size="$sm"
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
      size="$sm"
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
  position: "relative",
  top: "0.25rem",
});

const RnD = ({ data }: RnDProps) => (
  <Box
    css={{
      paddingTop: "$12",
      paddingBottom: "$4",
    }}
  >
    <div className="grid grid-cols-1 gap-x-10 gap-y-2 px-0 lg:grid-cols-2">
      {data?.map(
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
          <Activity
            key={name}
            imageSrc={image}
            subTitle={location.toUpperCase()}
            title={name}
            description={description}
          >
            <Section id="light_level_" sectionTitle="LIGHT LEVEL">
              {modes.map(({ type, recommendedLightLevel }) => (
                <Fragment key={uniqueId("mode_")}>
                  <Mode modeType={type} powerLevel={recommendedLightLevel} />
                </Fragment>
              ))}
            </Section>
            {!isEmpty(extraRewards) && (
              <Section id="extras_" sectionTitle="EXTRAS">
                {extraRewards.map(({ title, description }) => (
                  <Box
                    key={uniqueId("extra_rewards_")}
                    css={{ marginBottom: "$2" }}
                  >
                    <Text size="$sm" weight="normal">
                      {title}
                    </Text>
                    <Text size="$sm" weight="thin">
                      {description}
                    </Text>
                  </Box>
                ))}
              </Section>
            )}
            {!isEmpty(modifiers) && (
              <Section id="modifiers_" sectionTitle="MODIFIERS">
                {modifiers.map(({ typeModifiers }) => (
                  <Fragment key={uniqueId("modifier_")}>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {typeModifiers?.map(({ name, description, iconPath }) => (
                        <Box
                          key={uniqueId("type_modifier_")}
                          css={{ display: "flex" }}
                        >
                          <ModifierImage src={iconPath as string} height={28} />
                          <Box css={{ marginLeft: "$4" }}>
                            <Text size="$sm" weight="normal">
                              {name}
                            </Text>
                            <Text size="$sm" weight="thin">
                              {description}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                    </div>
                  </Fragment>
                ))}
              </Section>
            )}
            <Section id="encounters_" sectionTitle="ENCOUNTERS">
              <Encounters encounters={encounters} />
            </Section>
          </Activity>
        )
      )}
    </div>
  </Box>
);

export default RnD;
