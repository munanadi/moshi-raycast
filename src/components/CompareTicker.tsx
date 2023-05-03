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
  const [suggest, setSuggest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [baseCoinSuggestions, setBaseCoinSuggestions] =
    useState<any>();
  const [targetCoinSuggestions, setTargetCoinSuggestions] =
    useState<any>();

  const [selectedBase, setSelectedBase] = useState<any>();
  const [selectedTarget, setSelectedTarget] =
    useState<any>();

  const [currentRatio, setCurrentRatio] = useState();

  useEffect(() => {
    (async () => {
      setSuggest(false);
      setLoading(true);
      const compare = await axios.get(
        `https://api.mochi.pod.town/api/v1/defi/coins/compare?base=${
          selectedBase ?? base
        }&target=${selectedTarget ?? target}&interval=${1}`
      );
      const compareData = compare.data.data;

      const {
        base_coin_suggestions,
        target_coin_suggestions,
      } = compareData;

      // multiple resutls found
      // Push a new picker page to pick which coin.
      if (!selectedBase || !selectedTarget) {
        setLoading(false);
        setSuggest(true);
        setBaseCoinSuggestions(base_coin_suggestions);
        setTargetCoinSuggestions(target_coin_suggestions);
        return;
      }

      setLoading(false);

      const {
        times,
        ratios,
        from,
        to,
        base_coin,
        target_coin,
      } = compareData;

      const currRatio = ratios?.[ratios?.length - 1] ?? 0;
      setCurrentRatio(currRatio);
    })();
  }, [base, target, selectedBase, selectedTarget]);

  return !suggest ? (
    <Detail
      isLoading={loading}
      markdown={`${base} ${target} inputs
      
      current ratio is${currentRatio}`}
    />
  ) : (
    <Detail
      isLoading={loading}
      markdown={
        "Found multiple base options. Select Please?"
      }
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
