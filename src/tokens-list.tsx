import {
  Action,
  ActionPanel,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { getColorScale } from "./helpers";

export default function Command() {
  const [state, setState] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setLoading(true);
        const data: any = await (
          await axios.get(
            "https://api.mochi.pod.town/api/v1/defi/tokens"
          )
        ).data;

        if (data.data) {
          const filteredData = data.data.data;

          await showToast({
            style: Toast.Style.Success,
            title: "Data feteched",
          });

          setState(filteredData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        await showToast({
          style: Toast.Style.Failure,
          title: "Couldn't Fetch data",
          message:
            "Something went wrong while fetching data",
        });
        setState(null);
      }
    }

    fetchMarketData();
  }, []);

  return (
    <List isLoading={loading}>
      {state?.map((coin: any, index: number) => {
        return (
          <List.Item
            key={index}
            title={coin.name}
            subtitle={coin.address}
            actions={
              <ActionPanel title="More Actions">
                <Action.OpenInBrowser
                  url={`https://www.coingecko.com/en/coins/${coin.coin_gecko_id}`}
                  title="Check out in Coingecko"
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
