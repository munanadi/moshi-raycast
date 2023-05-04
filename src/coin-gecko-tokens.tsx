import { Action, ActionPanel, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import coinData from "./data/cg-tokens.json";
import { useRef } from "react";

interface CoinGeckoCoin {
  name: string;
  id: string;
  symbol: string;
}

export default function Command() {
  const abortable = useRef<AbortController>();
  const { isLoading, data, mutate, revalidate } =
    usePromise<any>(
      async () => {
        // // Swap out for real data from CG
        // const res = await axios.get(
        //   "https://api.coingecko.com/api/v3/coins/list"
        // );
        const res = coinData;
        const data = await res.data;
        return data;
      },
      [],
      { abortable }
    );

  return (
    <List isLoading={isLoading}>
      {data?.map((coin: CoinGeckoCoin) => (
        <List.Item
          title={coin.name}
          key={coin.id}
          subtitle={coin.symbol}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                content={coin.id}
                title="Copy CoinID"
              />
              <Action.OpenInBrowser
                title="View in CoinGecko"
                url={`https://www.coingecko.com/en/coins/${coin.id}`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
