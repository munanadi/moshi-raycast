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
import { parseTickerQuery, searchCoins } from "./helpers";
import { useEffect } from "react";

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

        // TODO: Navigate back to search thing
      }
    };
  }, [base, target]);

  if (!isCompare) {
    return (
      <Detail markdown={`isCompare not true ${base}`} />
    );
  }
  if (!isFiat) {
    return <Detail markdown={`isFiat not true`} />;
  }
  if (isFiat) {
    return <Detail markdown={`isFiat true`} />;
  }

  return (
    <Detail markdown={`Hello you have entered ${base}`} />
  );
}
