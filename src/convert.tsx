import {
  Action,
  ActionPanel,
  Detail,
  LaunchProps,
} from "@raycast/api";
import { useEffect, useState } from "react";
import Suggest from "./components/Suggest";
import axios from "axios";

interface ConvertArgs {
  amount: string;
  from: string;
  to: string;
}

const Command = (
  props: LaunchProps<{ arguments: ConvertArgs }>
) => {
  const {
    amount,
    from: base,
    to: target,
  } = props.arguments;

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
        setBaseCoinSuggestions(base_coin_suggestions);
        setTargetCoinSuggestions(target_coin_suggestions);
        return;
      }

      const { ratios } = compareData;

      const currRatio = ratios?.[ratios?.length - 1] ?? 0;
      setCurrentRatio(currRatio);
    })();
  }, [base, target, selectedBase, selectedTarget]);

  return selectedBase && selectedTarget && currentRatio ? (
    <Detail
      markdown={`# ${amount} ${base?.toUpperCase()} = ${parseFloat(
        (
          parseFloat(amount) *
          parseFloat(currentRatio ?? "1")
        ).toString()
      )
        .toFixed(4)
        .toString()} ${target?.toUpperCase()}`}
    />
  ) : selectedBase && selectedTarget && !currentRatio ? (
    <Detail
      isLoading={true}
      markdown={`# Fetching data for ${base?.toUpperCase()} / ${target?.toUpperCase()}...`}
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

export default Command;
