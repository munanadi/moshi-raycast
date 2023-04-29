import {
  Action,
  ActionPanel,
  Detail,
  LaunchProps,
} from "@raycast/api";
import WatchlistActions from "./components/WatchlistActions";

const Command = () => {
  /* 
    1. Hit the API and get FUNCTION/market-data API and get the chart src
    2. display a loading spinner until it prepares the chart
    3. Displayt the chat data.
  */

  let markdown = `<img height="345" src="/Users/aadhi/Desktop/chart.png"/>`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel title="Watchlist Actions">
          <Action.Push
            title="View watchlsit"
            target={<WatchlistActions />}
          />
          {/* <Action
            title="Add to watchlsit"
            onAction={() => {
              console.log("Add this to watchilist");
            }}
          />
          <Action
            title="Remove from watchlsit"
            onAction={() => {
              console.log("Remove from watchilist");
            }}
          /> */}
        </ActionPanel>
      }
    />
  );
};

export default Command;
