import { Fragment, useEffect, useState } from "react";
import { Text } from "../../../common/Text";
import { TimeLine } from "../../../common/Timeline";
import { TitleText } from "../../../common/TitleText";
import { uniqueId } from "lodash";
import dungeonData from "./dungeonData.json";

const powerLevelIcon = `${process.env.PUBLIC_URL}/assets/power-level-icon.png`;

const Mode = ({ modeType, powerLevel }) => (
  <div className="flex">
    <Text classes="flex-initial mr-2">{modeType}:</Text>
    <img
      className="flex-none w-2 h-2 relative top-1 mr-0.5"
      src={powerLevelIcon}
    />
    <Text classnames="flex-initial">{powerLevel}</Text>
  </div>
);

console.log(JSON.parse(JSON.stringify(dungeonData)));

export const Dungeons = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(dungeonData)));
  }, [dungeonData]);

  return (
    <div className="mb-5">
      <TitleText>DUNGEONS</TitleText>
      {data &&
        data.dungeons.map(
          ({ name, location, description, modes, modifiers, encounters }) => (
            <div key={uniqueId("dungeon_")} className="py-5 pl-1">
              <Text classes="tracking-widest">{location.toUpperCase()}</Text>
              <h1 className="text-4xl lg:text-6xl text-white bold my-1">
                {name}
              </h1>
              <Text classes="mb-3 italic">{description}</Text>
              <div className="mb-3">
                <h6 className="text-sm text-white">LIGHT LEVEL</h6>
                <div className="my-2">
                  {modes.map(({ type, recommendedLightLevel, uniqueLoot }) => (
                    <Fragment key={uniqueId("modes_")}>
                      <Mode
                        modeType={type}
                        powerLevel={recommendedLightLevel}
                      />
                      {uniqueLoot &&
                        uniqueLoot.map(({ title, description }) => (
                          <div key={uniqueId("unique_loot_")} className="mt-2">
                            <Text regular>{title}</Text>
                            <Text>{description}</Text>
                          </div>
                        ))}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                {modifiers &&
                  modifiers.map(({ type, typeModifiers }) => (
                    <div key={uniqueId("modifier_")} className="my-2">
                      <h6 className="text-sm text-white">
                        MODIFIERS ({type.toUpperCase()})
                      </h6>
                      {typeModifiers.map(({ name, description, iconPath }) => (
                        <div key={uniqueId("type_modifier_")} className="my-2">
                          <Text regular>{name}</Text>
                          <Text>{description}</Text>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
              <div className="mb-3">
                <h6 className="text-sm text-white">ENCOUNTERS</h6>
                <TimeLine encounters={encounters} />
              </div>
            </div>
          )
        )}
    </div>
  );
};
