import { Routes, Route } from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Daily } from "./components/main/activities/daily/Daily";
import { Dungeons } from "./components/main/activities/dungeons/Dungeons";
import { Weekly } from "./components/main/activities/weekly/Weekly";
import { Raids } from "./components/main/activities/raids/Raids";
import { Season } from "./components/main/activities/season/Season";

function App() {
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
