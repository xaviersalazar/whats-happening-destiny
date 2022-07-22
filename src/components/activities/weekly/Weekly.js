import { useEffect, useState } from "react";
import { SubTitleText } from "../../common/SubTitleText";
import { TitleText } from "../../common/TitleText";
import moment from "moment";

export const Weekly = () => {
  const [resetDays, setResetDays] = useState("");

  useEffect(() => {
    const start = moment().day(2).format("MMMM Do");
    const end = moment().day(9).format("MMMM Do");

    setResetDays({ start, end });
  }, []);

  return (
    <div className="p-2 mb-5">
      <TitleText>WEEKLY</TitleText>
      <SubTitleText>
        {resetDays.start} to {resetDays.end}
      </SubTitleText>
    </div>
  );
};
