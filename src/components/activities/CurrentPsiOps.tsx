import { useEffect } from "react";
import { useQuery } from "react-query";
import { getWhDestinyData } from "../../api/api";

const CurrentPsiOps = () => {
  const { isLoading, isSuccess, data } = useQuery("CurrentPsiOps", () =>
    getWhDestinyData("psiops-schedule-s19")
  );

  const getPsiOps = async () => {
    // const currPsiOps = Math.floor((daysInSeason - daysLeft) / 7 % psiOpsRotation.length)
  };

  useEffect(() => {
    if (isSuccess) {
      getPsiOps();
    }
  }, [isSuccess]);
};

export default CurrentPsiOps;
