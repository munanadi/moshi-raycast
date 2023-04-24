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
import { parseTickerQuery } from "./helpers";
import { useEffect } from "react";
import { useFetch } from "@raycast/utils";

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
    // return <NotCompare base="hello" />;
    return <NotCompare base={base} />;
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

const NotCompare = (props: any) => {
  const { isLoading, data, revalidate } = useFetch<any>(
    `https://api.mochi.pod.town/api/v1/defi/coins?query=${props.base}`
  );

  if (!data || !data.length) {
    // No Tokens like this exists
    console.log("handle this");
  }

  console.log(data);

  return (
    <Detail
      isLoading={isLoading}
      markdown={JSON.stringify(data)}
      actions={
        <ActionPanel>
          <Action
            title="Reload"
            onAction={() => revalidate()}
          />
        </ActionPanel>
      }
    />
  );
};
