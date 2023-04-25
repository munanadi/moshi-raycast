import {
  Action,
  ActionPanel,
  List,
  showToast,
  Toast,
  LaunchProps,
  Detail,
  useNavigation,
  popToRoot,
} from "@raycast/api";
import { getColorScale, parseTickerQuery } from "./helpers";
import { useEffect } from "react";
import { useFetch } from "@raycast/utils";
import useTickerData from "./hooks/useTickerData";
import NotCompare from "./components/NotCompare";
import NotFiat from "./components/NotFiat";

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
    async () => {
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
    };
  }, [base, target]);

  if (!isCompare) {
    return <NotCompare base={base} />;
  }
  if (!isFiat) {
    return <NotFiat base={base} target={target} />;
  }
  if (isFiat) {
    return <Detail markdown={`isFiat true`} />;
  }

  return (
    <Detail markdown={`Hello you have entered ${base}`} />
  );
}
