import { Detail } from "@raycast/api";
import useTickerData from "../hooks/useTickerData";

const Ticker = (props: any) => {
  const {
    marketCap,
    marketPrice,
    symbol,
    name,
    marketRank,
    loading,
    coinId,
    chartUrl,
  } = useTickerData(props.base);

  const markdown =
    !name || !symbol
      ? `# Fetching data...`
      : !chartUrl
      ? `# Trouble fetching chart...`
      : `
# ${name} (${symbol.toUpperCase()})
<img alt="heatmap" height="345" src="${chartUrl}">
`;

  return (
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
