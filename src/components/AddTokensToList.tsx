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

export default function AddTokensToList() {
  const [searchText, setSearchText] = useState("");
  const [tokensArr, setTokensArr] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  const debouncedSearchText = useDebounce(searchText, 1000);

  const { tokenIdMap } = useTokens();

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
          key={token.id}
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
                  let oldFavList =
                    await LocalStorage.getItem<LocalStorage.Value>(
                      "favList"
                    );
                  await showToast({
                    style: Toast.Style.Success,
                    title: "Added to Favourites",
                  });
                  console.log(
                    `${token.name} is added to list`
                  );

                  let newFavList: string[] = [];
                  if (oldFavList) {
                    newFavList = [
                      ...JSON.parse(oldFavList.toString()),
                      token.name,
                    ];
                  }
                  newFavList.push(token.name);

                  await LocalStorage.setItem(
                    "favList",
                    JSON.stringify(newFavList)
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
