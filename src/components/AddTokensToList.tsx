import {
  Action,
  ActionPanel,
  Detail,
  List,
  LocalStorage,
  Toast,
  showToast,
} from "@raycast/api";
import useTokens from "../hooks/useTokens";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Icon } from "@raycast/api";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AddTokensToList() {
  const [searchText, setSearchText] = useState<any>("");
  const [tokensArr, setTokensArr] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  const debouncedSearchText = useDebounce(searchText, 1000);

  const { tokenIdMap } = useTokens();
  const { data, storeData } = useLocalStorage("favList");

  useEffect(() => {
    setLoading(true);
    const tokensMap: any[] = [];
    if (!tokenIdMap) return;

    for (const name of Object.keys(tokenIdMap)) {
      tokensMap.push({ ...tokenIdMap[name] });
    }
    setLoading(false);
    setTokensArr(tokensMap);
  }, [tokenIdMap]);

  useEffect(() => {
    setTokensArr(
      tokensArr?.filter((token: any) =>
        tokensArr.includes(debouncedSearchText)
      )
    );
  }, [debouncedSearchText]);

  return (
    <List
      isLoading={loading}
      filtering={true}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Tokens"
      searchBarPlaceholder="Search For Tokens in Coin Gecko"
    >
      {tokensArr?.map((token: any) => (
        <List.Item
          key={token.symbol}
          title={token.name}
          accessories={[
            {
              text: "Add",

              // TODO: Check if already in list and show appropriate icons
              icon: Icon.Star,
            },
          ]}
          actions={
            <ActionPanel>
              <Action
                title="Add to Favourites"
                onAction={async () => {
                  await storeData(
                    token.symbol.toLowerCase()
                  );
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
