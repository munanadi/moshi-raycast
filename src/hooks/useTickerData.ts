import { useFetch } from "@raycast/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { RectangleStats } from "../types/canvas";
// import { renderChartImage } from "../helpers/chart";
// import { createCanvas } from "canvas";

export default function useTickerData(base: string) {
  const [loading, setLoading] = useState<any>();
  const [marketCap, setMarketCap] = useState<any>();
  const [marketPrice, setMarketPrice] = useState<any>();
  const [marketRank, setMarketRank] = useState<any>();
  const [name, setName] = useState<any>();
  const [symbol, setSymbol] = useState<any>();
  const [priceChangeIn1D, setPriceChangeIn1D] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // console.log({ base });
        // Search coins
        const coinsList = await axios.get(
          `https://api.mochi.pod.town/api/v1/defi/coins?query=${base}`
        );

        const coinsListData = await coinsList.data;
        // console.log(coinsListData);

        if (!coinsListData.data.length) {
          // No Tokens like this exists
          console.log("handle right here");
          return;
        }

        // Show the ticker response here -> coinId, days = 1day, symbol
        // TODO: Show options if more than one choice exists in a drop down
        // Contiunue wiht the first response

        const { id, symbol, name } = coinsListData.data[0];
        const ticker = await axios.get(
          `https://api.mochi.pod.town/api/v1/defi/coins/${id}`
        );
        const tickerData = await ticker.data.data;

        const currency = "usd";
        const {
          market_cap,
          current_price,
          price_change_percentage_1h_in_currency,
          price_change_percentage_24h_in_currency,
          price_change_percentage_7d_in_currency,
        } = tickerData.market_data;

        const currentPrice = +current_price[currency];
        const marketCap = +market_cap[currency];

        // draw chart

        setMarketCap(marketCap.toLocaleString());
        setMarketPrice(currentPrice);
        setSymbol(symbol);
        setName(name);
        setMarketRank(tickerData.market_cap_rank);
        setPriceChangeIn1D(
          price_change_percentage_24h_in_currency
        );
      } catch (e) {
        console.log("Some error fetching data", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [base]);

  return {
    marketCap,
    marketPrice,
    symbol,
    name,
    marketRank,
    loading,
    priceChangeIn1D,
  };
}
