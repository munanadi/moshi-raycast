import {
  LocalStorage,
  Toast,
  showToast,
} from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useMarketData() {
  const { data, isLoading, mutate, revalidate, error } =
    useFetch<any>(
      "https://api.mochi.pod.town/api/v1/defi/market-data"
    );

  const [filteredData, setFilteredData] = useState<any>();

  const { data: favTokenList } = useLocalStorage("favList");

  useEffect(() => {
    async function fetchData() {
      try {
        if (data.data) {
          let processedData = data.data.filter((i: any) =>
            ["busd", "usdc", "usdt", "dai", "sol"].includes(
              i.symbol.toLowerCase()
            )
          );

          // Fetch Favourite tokens as well
          processedData.concat(
            data.data.filter((i: any) =>
              favTokenList.includes(i.symbol.toLowerCase())
            )
          );

          await showToast({
            style: Toast.Style.Success,
            title: "Data feteched",
          });

          setFilteredData(processedData);
        }
      } catch (e) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Data fetching failed",
        });
      }
    }
    fetchData();
  }, [favTokenList]);

  return {
    filteredData,
    isLoading,
    error,
  };
}
