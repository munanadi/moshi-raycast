import {
  Action,
  ActionPanel,
  Detail,
  Toast,
  showToast,
} from "@raycast/api";
import WatchlistActions from "./components/WatchlistActions";
import { useEffect } from "react";
import { useFetch } from "@raycast/utils";

const Command = () => {
  const {
    data: fetchedData,
    isLoading,
    error,
  } = useFetch<any>(
    "https://elegant-phoenix-680f0e.netlify.app/.netlify/functions/renderWatchlist"
  );

  const data = JSON.parse(fetchedData ?? "{}");

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
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel title="Watchlist Actions">
          <Action.Push
            title="View watchlsit"
            target={<WatchlistActions />}
          />
        </ActionPanel>
      }
    />
  );
};

export default Command;
