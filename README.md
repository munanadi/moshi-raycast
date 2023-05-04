# Mochi Raycast Extension

A raycast extension that lets you

1. get overall market information
2. fetch gainers/losers tokens
3. see trending tokens
4. peeks at your wathclist
5. convert between tokens
6. see information about your favourite tokens

### Commands

#### 1. heatmap

Shows the market in a heatmap
[](./demos/heatmap.mov)

#### 2. watchlist

Shows the tokens overview in your watchlist

#### 3. ticker

Show details about a given ticker

#### 4. convert

Convert $value between different tokens

---

### Tech Used

1. [Serverless functions](https://github.com/munanadi/ntl-moshi-chart) are used to render charts as we cannot render chart primitives from within the Raycast extension.

2. [Mochi's APIs](https://mochibot.gitbook.io/mochi-bot/functions/mochi-apis/crypto-management) from their docs to call various end points

3.

---

#### Coin Gecko APIs are used to fetch data

`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`

---

1. Doesnt' let me add or compile `node-canvas` throws

```
build failed (node_modules/canvas/lib/bindings.js:3:25 const bindings = require('../build/Release/canvas.node')): native bindings (e.g., .node files) are not supported because they are neither cross-platform nor cross-architecture; for example, native bindings built on a M1 mac would not work on an Intel mac
event -  stopped development mode
```
