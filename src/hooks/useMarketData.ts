import { Toast, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";

export default function useMarketData() {
  const { data, isLoading, mutate, revalidate, error } =
    useFetch<any>(
      "https://api.mochi.pod.town/api/v1/defi/market-data"
    );

  const [filteredData, setFilteredData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (data.data) {
          const processedData = data.data.filter((i: any) =>
            ["busd", "usdc", "usdt", "dai", "sol"].includes(
              i.symbol.toLowerCase()
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
  }, []);

  return {
    filteredData,
    isLoading,
    error,
  };
}
