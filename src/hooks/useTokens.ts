import { useEffect, useState } from "react";
import axios from "axios";
import { LocalStorage } from "@raycast/api";
// TODO: Fetch tokens here instead of reading from local file
import tokenData from "../data/tokens.json";
// import tokenData from "../data/cg-tokens.json";

interface tokenData {
  id: "string";
  name: "string";
  symbol: "string";
}

// Fetches all tokens available from coin gecko
function useTokens() {
  const [tokenIdMap, setTokenIdMap] = useState<any>();

  useEffect(() => {
    async () => {
      if (!tokenIdMap) return;
      await LocalStorage.setItem("tokenIdMap", tokenIdMap);
    };
  }, [tokenIdMap]);

  useEffect(() => {
    const tokenMap: any = {};

    tokenData.data.data.forEach((token) => {
      // tokenData.forEach((token) => {
      tokenMap[token.name] = {
        ...token,
      };
    });

    setTokenIdMap(tokenMap);
  }, []);

  return {
    tokenIdMap,
  };
}

export default useTokens;
