import { Detail, Toast, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect } from "react";

const Command = () => {
  const {
    data: fetchedData,
    isLoading,
    error,
  } = useFetch<any>(
    "https://elegant-phoenix-680f0e.netlify.app/.netlify/functions/renderHeatmap"
  );

  const data = JSON.parse(fetchedData);

  useEffect(() => {
    (async () => {
      if (error || !data?.file_url) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Fetching data went wrong",
        });
      }
    })();
  }, [error, data]);

  const markdown =
    isLoading || !data?.file_url
      ? `# Fetching data...`
      : `<img alt="heatmap" height="345" src="${data.file_url}">`;

  return (
    <Detail isLoading={isLoading} markdown={markdown} />
  );
};

export default Command;
