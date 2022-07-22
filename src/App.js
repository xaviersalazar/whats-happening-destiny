// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { getMilestones, getDefinition } from "./api/destinyApi";
// import { DEFINITIONS } from "./utils/destinyData";
import { Menu } from "./components/menu/Menu";
import { Daily } from "./components/activities/daily/Daily";
import { Dungeons } from "./components/activities/dungeons/Dungeons";
import { Weekly } from "./components/activities/weekly/Weekly";
import { Raids } from "./components/activities/raids/Raids";
import { Season } from "./components/activities/season/Season";

function App() {
  // useEffect(() => {
  //   getDestinyActivities();
  // }, []);

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
    <>
      <Menu>
        <Routes>
          <Route path="/" element={<Daily />} />
          <Route path="weekly" element={<Weekly />} />
          <Route path="dungeons" element={<Dungeons />} />
          <Route path="raids" element={<Raids />} />
          <Route path="season" element={<Season />} />
        </Routes>
      </Menu>
    </>
  );
}

export default App;
