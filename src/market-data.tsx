import { Action, ActionPanel, List } from "@raycast/api";
import { getColorScale } from "./helpers";
import useTokens from "./hooks/useTokens";
import useMarketData from "./hooks/useMarketData";
import AddTokensToList from "./components/AddTokensToList";

export default function Command() {
  const { tokenIdMap } = useTokens();

  const {
    filteredData: marketData,
    isLoading: marketDataLoading,
    error: marketDataError,
  } = useMarketData();

  return (
    <List isLoading={marketDataLoading} isShowingDetail>
      {marketData?.map((coin: any, index: number) => {
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
              <ActionPanel>
                <Action.CopyToClipboard
                  title="Copy the name"
                  content={coin.name}
                />
                {/* Add new coins to watchlist */}
                <Action.Push
                  title="Add to watchlist"
                  target={<AddTokensToList />}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
