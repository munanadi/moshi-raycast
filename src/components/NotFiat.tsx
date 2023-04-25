import {
  Action,
  ActionPanel,
  Detail,
  useNavigation,
} from "@raycast/api";
import useTickerData from "../hooks/useTickerData";
import { useEffect } from "react";
import axios from "axios";
import Suggest from "./Suggest";

const NotFiat = ({
  base,
  target,
}: {
  base: string;
  target: string;
}) => {
  const { push } = useNavigation();

  useEffect(() => {
    (async () => {
      const compare = await axios.get(
        `https://api.mochi.pod.town/api/v1/defi/coins/compare?base=${base}&target=${target}&interval=${1}`
      );
      const compareData = compare.data;

      const {
        base_coin_suggestions,
        target_coin_suggestions,
      } = compareData;
      // multiple resutls found
      // Push a new picker page to pick which coin.
      if (
        base_coin_suggestions ||
        target_coin_suggestions
      ) {
        return (
          <Detail
            markdown="Found many possiblities"
            actions={
              <ActionPanel>
                <Action
                  title="Push"
                  onAction={() => push(<Suggest />)}
                />
              </ActionPanel>
            }
          />
        );

        // return suggest(
        //   base_coin_suggestions,
        //   target_coin_suggestions,
        //   base,
        //   target
        // )
      }

      console.log(compareData);
    })();
  }, [base, target]);

  return <Detail markdown={`${base} ${target} inputs`} />;

  const {
    marketCap,
    marketPrice,
    symbol,
    name,
    marketRank,
    loading,
  } = useTickerData(props.base);

  console.log(loading, marketPrice);

  const markdown = `
# ${name} ${symbol}
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
            target={`https://www.coingecko.com/en/coins/${name?.toLowerCase()}`}
            text="Link"
          />
        </Detail.Metadata>
      }
    />
  );
};

export default NotFiat;
