import {
  showToast,
  Toast,
  LaunchProps,
  Detail,
  popToRoot,
} from "@raycast/api";
import { parseTickerQuery } from "./helpers";
import { useEffect } from "react";
import CompareTicker from "./components/CompareTicker";
import Ticker from "./components/Ticker";

interface TickerArgs {
  base: string;
}

export default function Command(
  props: LaunchProps<{ arguments: TickerArgs }>
) {
  const { base: enteredArg } = props.arguments;

  const { base, target, isCompare, isFiat } =
    parseTickerQuery(enteredArg);

  useEffect(() => {
    (async () => {
      if (base === target) {
        // This comparison cannot happen
        await showToast({
          style: Toast.Style.Failure,
          title: "Base and Target cannot be same",
        });

        popToRoot({
          clearSearchBar: false,
        });
      }
    })();
  }, [base, target]);

  if (!isCompare) {
    return <Ticker base={base} />;
  } else if (!isFiat) {
    return <CompareTicker base={base} target={target} />;
  } else {
    return (
      <Detail
        markdown={`This is used to show comparisoin between fiat tokens`}
      />
    );
  }
}
