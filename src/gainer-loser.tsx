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
  // TODO: The API seems to not work properly
  const {
    data: losersData,
    error: losersError,
    isLoading: losersLoading,
  } = useFetch<any>(
    "https://api.mochi.pod.town/api/v1/defi/market-data?order=price_change_percentage_24h_desc"
  );

  // TODO: The API seems to not work properly
  const {
    data: gainersData,
    error: gainersError,
    isLoading: gainersLoading,
  } = useFetch<any>(
    "https://api.mochi.pod.town/api/v1/defi/market-data?order=price_change_percentage_24h_asc"
  );

  useEffect(() => {
    (async () => {
      if (losersError || gainersError) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Couldn't Fetch data",
        });
      }
    })();
  }, [losersError, gainersError]);

  return (
    <List isLoading={losersLoading || gainersLoading}>
      <List.Section title="Top Gainers">
        {losersData?.data?.slice(0, 5)?.map((coin: any) => (
          <List.Item
            key={coin.name}
            title={coin.name}
            icon={{
              source: coin.image,
              mask: Image.Mask.Circle,
            }}
            subtitle={coin.symbol}
            accessories={[
              {
                tag: {
                  value: `${parseFloat(
                    parseFloat(
                      `${coin.price_change_percentage_24h_in_currency.toString()}`
                    ).toFixed(4)
                  )}`,
                  color: Color.Red,
                },
                icon: Icon.Bolt,
              },
            ]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  url={`https://www.coingecko.com/en/coins/${coin.id}`}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Top Gainers">
        {gainersData?.data
          ?.slice(0, 5)
          ?.map((coin: any) => (
            <List.Item
              key={coin.name}
              title={coin.name}
              icon={{
                source: coin.image,
                mask: Image.Mask.Circle,
              }}
              subtitle={coin.symbol}
              accessories={[
                {
                  tag: {
                    value: `${parseFloat(
                      parseFloat(
                        `${coin.price_change_percentage_24h_in_currency.toString()}`
                      ).toFixed(4)
                    )}`,
                    color: Color.Green,
                  },
                  icon: Icon.Bolt,
                },
              ]}
              actions={
                <ActionPanel>
                  <Action.OpenInBrowser
                    url={`https://www.coingecko.com/en/coins/${coin.id}`}
                  />
                </ActionPanel>
              }
            />
          ))}
      </List.Section>
    </List>
  );
};

export default Command;
