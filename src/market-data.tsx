import {
  Action,
  ActionPanel,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import fetch from "node-fetch";
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
          await fetch(
            "https://api.mochi.pod.town/api/v1/defi/market-data"
          )
        ).json();
        if (data.data) {
          const filteredData = data.data.filter((i: any) =>
            ["busd", "usdc", "usdt", "dai", "sol"].includes(
              i.symbol.toLowerCase()
            )
          );

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
    <List isLoading={loading} isShowingDetail>
      {state?.map((coin: any, index: number) => {
        return (
          <List.Item
            key={index}
            title={coin.name}
            subtitle={coin.symbol}
            icon={coin.image}
            detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label
                      title="Current Price"
                      text={`$${coin.current_price.toLocaleString()}`}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                      title="Market Cap"
                      text={`$${coin.market_cap.toLocaleString()}`}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.TagList title="Price Change 24H%">
                      <List.Item.Detail.Metadata.TagList.Item
                        text={`${coin.price_change_percentage_24h.toFixed(
                          2
                        )} %`}
                        color={getColorScale(
                          coin.price_change_percentage_24h
                        )}
                      />
                    </List.Item.Detail.Metadata.TagList>
                    <List.Item.Detail.Metadata.Separator />
                  </List.Item.Detail.Metadata>
                }
              />
            }
            actions={
              <ActionPanel title="#1 in raycast/extensions">
                <Action.CopyToClipboard
                  title="Copy the name"
                  content={coin.name}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
