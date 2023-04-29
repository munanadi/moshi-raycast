# mochi-raycast

Raycast for Mochi

### Commands

#### 1. heatmap

Shows the market in a heatmap

#### 2. watchlist

Shows the tokens overview in your watchlist

#### 3. ticker

Show details about a given ticker

#### 4. convert

Convert $value between different tokens

---

### Tech Used

Serverless functions are used to render charts as we cannot render chart primitives from within the Raycast extension.

---

#### Coin Gecko APIs are used to fetch data

`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`

---

1. Doesnt' let me add or compile `node-canvas` throws

```
build failed (node_modules/canvas/lib/bindings.js:3:25 const bindings = require('../build/Release/canvas.node')): native bindings (e.g., .node files) are not supported because they are neither cross-platform nor cross-architecture; for example, native bindings built on a M1 mac would not work on an Intel mac
event -  stopped development mode
```
