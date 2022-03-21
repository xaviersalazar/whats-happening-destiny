import { Fragment } from "react";
import { Text } from "./Text";
import { uniqueId } from "lodash";
import styled from "styled-components";

const Timeline = styled.div`
  margin: 0;
  height: auto;
  padding: 0;
`;

const TimelineList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  transition: all 0.5s linear;
  top: 0;
`;

const TimelineListItem = styled.li`
  margin: 28px 36px;
  position: relative;
  padding: 12px 0;
  color: #fff;
  border-radius: 10px;
  line-height: 20px;
  width: 90%;
`;

const TimelineDisplay = styled.span`
  content: "";
  display: block;
  width: 0;
  height: 100%;
  border: 1px solid #fff;
  position: absolute;
  left: -30px;

  &::before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ dropsLoot }) => (dropsLoot ? "#fff" : "transparent")};
    border: 1px solid #fff;
    position: absolute;
    top: -20px;
    left: -5px;
  }
`;

const TimelineTitle = ({ children }) => (
  <div className="timeline-title">
    <Text regular>{children}</Text>
  </div>
);

const TimelineInfo = ({ children }) => (
  <div className="timeline-info">
    <Text>{children}</Text>
  </div>
);

const LootItems = ({ doubleLoot, children }) => (
  <div className="mt-3">
    <Text regular>Possible Rewards {doubleLoot ? "(x2)" : ""}</Text>
    {children}
  </div>
);

export const TimeLine = ({ encounters }) => (
  <Timeline>
    <TimelineList>
      {encounters.map(({ title, info, dropsLoot, doubleLoot, loot }) => (
        <Fragment key={uniqueId("title_")}>
          <TimelineListItem>
            <TimelineDisplay dropsLoot={dropsLoot} />
            <TimelineTitle>{title}</TimelineTitle>
            <TimelineInfo>{info}</TimelineInfo>
            {dropsLoot && (
              <LootItems doubleLoot={doubleLoot}>
                <div className="grid grid-rows-1 grid-cols-2 lg:grid-cols-4">
                  <div className="mb-3 lg:mb-0">
                    {loot.weapons.map(({ name, iconPath }, i) => (
                      <Text key={uniqueId("weapon_")}>{name}</Text>
                    ))}
                  </div>
                  {loot.armor.map(({ character, items }) => (
                    <div
                      key={uniqueId(`${character}_`)}
                      className="mb-3 lg:mb-0"
                    >
                      {items.map(({ name, iconPath }) => (
                        <Text key={uniqueId("armor_")}>{name}</Text>
                      ))}
                    </div>
                  ))}
                </div>
              </LootItems>
            )}
          </TimelineListItem>
        </Fragment>
      ))}
    </TimelineList>
  </Timeline>
);
