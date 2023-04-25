import { Action, ActionPanel, Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import axios from "axios";
import Suggest from "./Suggest";

const NotFiat = ({
  base,
  target,
}: {
  base: string;
  target: string;
}) => {
  const [suggest, setSuggest] = useState<boolean>(false);
  const [baseCoinSuggestions, setBaseCoinSuggestions] =
    useState<any>();
  const [targetCoinSuggestions, setTargetCoinSuggestions] =
    useState<any>();

  const [selectedBase, setSelectedBase] = useState<any>();
  const [selectedTarget, setSelectedTarget] =
    useState<any>();

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      setSuggest(false);
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
        setSuggest(true);
        setBaseCoinSuggestions(base_coin_suggestions);
        setTargetCoinSuggestions(target_coin_suggestions);
        return;
      }

      console.log("Reached here? ", compareData);
      setData(compareData.toString());
    })();
  }, [base, target, selectedBase, selectedTarget]);

  console.log(selectedBase, " is the selected base coin");
  console.log(
    selectedTarget,
    " is the selected target coin"
  );

  return !suggest ? (
    <Detail markdown={`${base} ${target} inputs`} />
  ) : (
    <Detail
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

export default NotFiat;
