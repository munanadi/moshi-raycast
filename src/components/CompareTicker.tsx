import { Action, ActionPanel, Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import axios from "axios";
import Suggest from "./Suggest";

const CompareTicker = ({
  base,
  target,
}: {
  base: string;
  target: string;
}) => {
  const [baseCoinSuggestions, setBaseCoinSuggestions] =
    useState<any>();
  const [targetCoinSuggestions, setTargetCoinSuggestions] =
    useState<any>();

  const [selectedBase, setSelectedBase] = useState<any>();
  const [selectedTarget, setSelectedTarget] =
    useState<any>();

  const [data, setData] = useState<any>();
  const [chartUrl, setChartUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const compare = await axios.get(
        `https://api.mochi.pod.town/api/v1/defi/coins/compare?base=${
          selectedBase ?? base
        }&target=${selectedTarget ?? target}&interval=${30}`
      );
      const compareData = compare.data.data;

      const {
        base_coin_suggestions,
        target_coin_suggestions,
      } = compareData;

      // multiple resutls found
      // Push a new picker page to pick which coin.
      if (!selectedBase || !selectedTarget) {
        setBaseCoinSuggestions(base_coin_suggestions);
        setTargetCoinSuggestions(target_coin_suggestions);
        return;
      }

      // Fetch chart
      const res = await axios.get(
        `https://elegant-phoenix-680f0e.netlify.app/.netlify/functions/compareTickers?base=${selectedBase}&target=${selectedTarget}&interval=${30}`
      );
      const chartData = await res.data;

      if (chartData.file_url) {
        setChartUrl(chartData.file_url);
      }
      setData(compareData);
    })();
  }, [base, target, selectedBase, selectedTarget]);

  return selectedBase && selectedTarget && data ? (
    <Detail
      markdown={
        chartUrl
          ? `<img src="${chartUrl}" /> ${data.base_coin.symbol.toUpperCase()} / ${data.target_coin.symbol.toUpperCase()} for past ${30} days`
          : `# Trouble fethcing charts...`
      }
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            icon={data.base_coin.image.small}
            title={`${
              data.base_coin.name
            } (${data.base_coin.symbol.toUpperCase()})`}
            text={`$ ${data.base_coin.market_data.current_price.usd}`}
          />
          <Detail.Metadata.TagList title="Market Cap Rank">
            <Detail.Metadata.TagList.Item
              text={`# ${data.base_coin.market_cap_rank}`}
              color={"#eed535"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Link
            title="More details"
            target={`https://www.coingecko.com/en/coins/${data.base_coin.id}`}
            text="View in CoinGecko"
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            icon={data.target_coin.image.small}
            title={`${
              data.target_coin.name
            } (${data.target_coin.symbol.toUpperCase()})`}
            text={`$ ${data.target_coin.market_data.current_price.usd}`}
          />
          <Detail.Metadata.TagList title="Market Cap Rank">
            <Detail.Metadata.TagList.Item
              text={`# ${data.target_coin.market_cap_rank}`}
              color={"#eed535"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Link
            title="More details"
            target={`https://www.coingecko.com/en/coins/${data.target_coin.id}`}
            text="View in CoinGecko"
          />
        </Detail.Metadata>
      }
    />
  ) : selectedBase && selectedTarget && !data ? (
    <Detail
      isLoading={true}
      markdown={`# Fetching data for ${base} / ${target}...`}
    />
  ) : (
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
                  base={base}
                  suggestions={baseCoinSuggestions}
                  setSelectedValue={setSelectedBase}
                />
              }
            />
          )}
          {!selectedTarget && (
            <Action.Push
              title="Select target options"
              target={
                <Suggest
                  prompt={"Select target coin"}
                  title={"Target Coin"}
                  base={base}
                  suggestions={targetCoinSuggestions}
                  setSelectedValue={setSelectedTarget}
                />
              }
            />
          )}
        </ActionPanel>
      }
    />
  );
};

export default CompareTicker;
