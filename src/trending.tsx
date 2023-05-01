import {
  Action,
  ActionPanel,
  Color,
  Icon,
  Image,
  List,
  Toast,
  showToast,
} from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect } from "react";

const Command = () => {
  const { data, isLoading, error } = useFetch<any>(
    "https://api.mochi.pod.town/api/v1/defi/trending"
  );

  useEffect(() => {
    (async () => {
      if (error) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Couldn't Fetch data",
        });
      }
    })();
  }, [error]);

  return (
    <List isLoading={isLoading}>
      {data?.data?.coins?.map((coin: any) => (
        <List.Item
          key={coin.item.id}
          title={coin.item.name}
          icon={{
            source: coin.item.small,
            mask: Image.Mask.Circle,
          }}
          subtitle={coin.item.symbol}
          accessories={[
            {
              tag: {
                value: `Market Rank #${coin.item.market_cap_rank.toString()}`,
                color: Color.Blue,
              },
              icon: Icon.Bolt,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                url={`https://www.coingecko.com/en/coins/${coin.item.id}`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default Command;
