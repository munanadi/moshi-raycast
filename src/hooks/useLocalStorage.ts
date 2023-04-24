import {
  LocalStorage,
  Toast,
  showToast,
} from "@raycast/api";
import { useEffect, useState } from "react";

export default function useLocalStorage(
  storageKey: string
) {
  const [fetchedItems, setFetchedItems] = useState<any>();

  useEffect(() => {
    (async function () {
      const dataRead = await LocalStorage.getItem(
        storageKey
      );

      setFetchedItems(dataRead);
    })();
  }, [storageKey]);

  const storeData = async (data: any) => {
    const fetchedItems = await LocalStorage.getItem(
      storageKey
    );

    // Set a new state
    let storedData: any[] = [];

    if (!fetchedItems) {
      storedData.push(data);
      await LocalStorage.setItem(
        storageKey,
        JSON.stringify(storedData)
      );
      await showToast({
        style: Toast.Style.Success,
        title: "Added to List",
      });
    } else {
      const oldData = JSON.parse(fetchedItems.toString());

      // Check for present
      const found = oldData.findIndex(
        (d: any) => d === data
      );

      if (found !== -1) {
        await showToast({
          style: Toast.Style.Success,
          title: "Already in List",
        });
      } else {
        storedData = [...oldData, data];
        await LocalStorage.setItem(
          storageKey,
          JSON.stringify(storedData)
        );
        await showToast({
          style: Toast.Style.Success,
          title: "Added to List",
        });
      }
    }
    setFetchedItems(storedData);
  };

  return {
    data: fetchedItems,
    storeData,
  };
}
