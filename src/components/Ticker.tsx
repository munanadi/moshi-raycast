import {
  Action,
  ActionPanel,
  Detail,
  Toast,
  popToRoot,
  showToast,
} from "@raycast/api";
import useTickerData from "../hooks/useTickerData";
import { useEffect, useState } from "react";
import axios from "axios";
import Suggest from "./Suggest";

const Ticker = (props: any) => {
  const [selectedBase, setSelectedBase] = useState<any>();
  const [baseCoinSuggestions, setBaseCoinSuggestions] =
    useState<any>();

  useEffect(() => {
    (async () => {
      const coinsList = await axios.get(
        `https://api.mochi.pod.town/api/v1/defi/coins?query=${props.base}`
      );

      const coinsListData = await coinsList.data;

      if (!coinsListData.data.length) {
        // No Tokens like this exists
        await showToast({
          style: Toast.Style.Failure,
          title: `No token like ${props.base} found. Try one of the Coin Gecko tokens`,
        });

        popToRoot({
          clearSearchBar: false,
        });
        return;
      }

      setBaseCoinSuggestions(coinsListData.data);
    })();
  }, [props.base]);

  const {
    marketCap,
    marketPrice,
    symbol,
    name,
    marketRank,
    loading,
    coinId,
    chartUrl,
  } = useTickerData(selectedBase);

  const markdown = !chartUrl
    ? `# Trouble fetching chart...`
    : `
# ${name} (${symbol?.toUpperCase()})
<img alt="heatmap" height="345" src="${chartUrl}">
`;

  return !selectedBase ? (
    <Detail
      markdown={`# Found multiple ${
        selectedBase ? "target" : "base"
      } options. Select Please?`}
      actions={
        <ActionPanel>
          {!selectedBase && (
            <Action.Push
              title="Select base options"
              target={
                <Suggest
                  prompt={"Select base coin"}
                  title={"Base Coin"}
                  base={props.base}
                  suggestions={baseCoinSuggestions}
                  setSelectedValue={setSelectedBase}
                />
              }
            />
          )}
        </ActionPanel>
      }
    />
  ) : !name || !symbol ? (
    <Detail
      isLoading={true}
      markdown={`# Fetching data...`}
    />
  ) : (
    <Detail
      isLoading={loading && !marketPrice}
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            title="Market Cap"
            text={`$${marketCap?.toString()}`}
          />
          <Detail.Metadata.Label
            title="Market Price"
            text={`$${marketPrice?.toString()}`}
          />
          <Detail.Metadata.TagList title="Market Rank">
            <Detail.Metadata.TagList.Item
              text={`# ${marketRank?.toString()}`}
              color={"#eed535"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Link
            title="View in Coingecko"
            target={`https://www.coingecko.com/en/coins/${coinId?.toLowerCase()}`}
            text="Link"
          />
        </Detail.Metadata>
      }
    />
  );
};

export default Ticker;
