import {
  Action,
  ActionPanel,
  List,
  showToast,
} from "@raycast/api";
import { useEffect } from "react";

// Mock watchlist, Fetch and Store this in LocalStorage later
const DEFAULT_LIST = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    current_price: 1920.1,
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    market_cap: 231332685109,
    market_cap_rank: 2,
    sparkline_in_7d: { price: null },
    price_change_percentage_24h: -1.7289,
    price_change_percentage_7d_in_currency:
      -4.604934851632596,
    price_change_percentage_1h_in_currency:
      -0.5144566495129091,
    price_change_percentage_24h_in_currency:
      -1.7288976077971079,
    is_pair: false,
    is_default: false,
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "usdt",
    current_price: 1.001,
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
    market_cap: 81444260901,
    market_cap_rank: 3,
    sparkline_in_7d: { price: null },
    price_change_percentage_24h: -0.0456,
    price_change_percentage_7d_in_currency:
      -0.08847957282875195,
    price_change_percentage_1h_in_currency: 0.3950629536659595,
    price_change_percentage_24h_in_currency:
      -0.04559895949970033,
    is_pair: false,
    is_default: false,
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "usdc",
    current_price: 0.999897,
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    market_cap: 31003006263,
    market_cap_rank: 5,
    sparkline_in_7d: { price: null },
    price_change_percentage_24h: 0.02033,
    price_change_percentage_7d_in_currency:
      -0.1345652206379514,
    price_change_percentage_1h_in_currency:
      -0.039900265530247794,
    price_change_percentage_24h_in_currency: 0.02033468592675822,
    is_pair: false,
    is_default: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    current_price: 22.17,
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
    market_cap: 8708035815,
    market_cap_rank: 11,
    sparkline_in_7d: { price: null },
    price_change_percentage_24h: -2.21919,
    price_change_percentage_7d_in_currency:
      -9.244615036959853,
    price_change_percentage_1h_in_currency:
      -0.6738683444516714,
    price_change_percentage_24h_in_currency:
      -2.219194677421727,
    is_pair: false,
    is_default: false,
  },
];

const WatchlistActions = () => {
  useEffect(() => {
    (async () => {
      await showToast({
        title: "",
        message:
          "Default watchlist fetched, Add or Remove to Watchlist",
      });
    })();
  }, []);

  return (
    <List>
      {DEFAULT_LIST.map((coin: any) => (
        <List.Item
          key={coin.id}
          title={coin.name}
          actions={
            <ActionPanel>
              <Action
                title="Add to viewlist"
                onAction={async () => {
                  await showToast({
                    message: `Add ${coin.name} to watchlist`,
                    title: "",
                  });
                }}
              />
              <Action
                title="Remove from viewlist"
                onAction={async () => {
                  await showToast({
                    message: `Remove ${coin.name} from watchlist`,
                    title: "",
                  });
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default WatchlistActions;
