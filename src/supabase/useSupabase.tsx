import { useEffect, useState } from "react";
import supabase from "./client";

const useSupabase = (fileName: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    downloadFile();
  }, [fileName]);

  const downloadFile = async () => {
    const { data, error } = await supabase.storage
      .from("public")
      .download(fileName);

    if (error) setError(error);

    const jsonData = await data?.text();
    const activityData = JSON.parse(jsonData as any);

    setData(activityData);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
  };
};

export default useSupabase;
