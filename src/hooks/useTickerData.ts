import { useEffect, useState } from "react";
import axios from "axios";

export default function useTickerData(base: string) {
  const [loading, setLoading] = useState<boolean>();
  const [marketCap, setMarketCap] = useState<any>();
  const [marketPrice, setMarketPrice] = useState<any>();
  const [marketRank, setMarketRank] = useState<any>();
  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [priceChangeIn1D, setPriceChangeIn1D] = useState();
  const [coinId, setCoinId] = useState<string>();
  const [chartUrl, setChartUrl] = useState<string>();

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
        const chartData = await axios.get(
          `https://elegant-phoenix-680f0e.netlify.app/.netlify/functions/ticker?base=${base}`
        );
        const fetchedData = await chartData.data;

        setMarketCap(marketCap.toLocaleString());
        setMarketPrice(currentPrice);
        setSymbol(symbol);
        setName(name);
        setMarketRank(tickerData.market_cap_rank);
        setPriceChangeIn1D(
          price_change_percentage_24h_in_currency
        );
        setCoinId(id);
        if (fetchedData) {
          setChartUrl(fetchedData.file_url);
        }
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
    coinId,
    chartUrl,
  };
}
