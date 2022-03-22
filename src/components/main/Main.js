import { useEffect } from "react";
import { getDefinition, getMilestones } from "../../api/destinyApi";
import { DEFINITIONS } from "../../utils/destinyData";
import { Daily } from "./activities/daily/Daily";
import { Weekly } from "./activities/weekly/Weekly";
import { Dungeons } from "./activities/dungeons/Dungeons";
import { Raids } from "./activities/raids/Raids";
import { Season } from "./activities/season/Season";

export const Main = () => {
  useEffect(() => {
    // getDestinyActivities();
  }, []);

  // const getDestinyActivities = async () => {
  //   await getMilestones().then((data) => {
  //     Object.keys(data).map((milestoneHash) => {
  //       const milestone = data[milestoneHash];

  //       if (milestone.activities) {
  //         const activities = milestone.activities;

  //         activities.forEach(({ activityHash }) => {
  //           getDefinition(
  //             DEFINITIONS.DestinyActivityDefinition,
  //             activityHash
  //           ).then((activity) => {
  //             getDefinition(
  //               DEFINITIONS.DestinyActivityTypeDefinition,
  //               activity.activityTypeHash
  //             ).then((activityType) => {
  //               console.log(
  //                 `${milestoneHash}/${activityHash}/${activity.displayProperties.name}/${activityType.displayProperties.name}`
  //               );
  //             });
  //           });
  //         });
  //       }
  //     });
  //   });
  // };

  return (
    <div className="p-2">
      <Daily />
      <Weekly />
      <Dungeons />
      <Raids />
      <Season />
    </div>
  );
};
