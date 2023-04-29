/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `market-data` command */
  export type MarketData = ExtensionPreferences & {}
  /** Preferences accessible in the `coin-gecko-tokens` command */
  export type CoinGeckoTokens = ExtensionPreferences & {}
  /** Preferences accessible in the `watchlist` command */
  export type Watchlist = ExtensionPreferences & {}
  /** Preferences accessible in the `heatmap` command */
  export type Heatmap = ExtensionPreferences & {}
  /** Preferences accessible in the `tokens-list` command */
  export type TokensList = ExtensionPreferences & {}
  /** Preferences accessible in the `ticker` command */
  export type Ticker = ExtensionPreferences & {}
  /** Preferences accessible in the `convert` command */
  export type Convert = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `market-data` command */
  export type MarketData = {}
  /** Arguments passed to the `coin-gecko-tokens` command */
  export type CoinGeckoTokens = {}
  /** Arguments passed to the `watchlist` command */
  export type Watchlist = {}
  /** Arguments passed to the `heatmap` command */
  export type Heatmap = {}
  /** Arguments passed to the `tokens-list` command */
  export type TokensList = {}
  /** Arguments passed to the `ticker` command */
  export type Ticker = {
  /** Symbol/Base_Target */
  "base": string
}
  /** Arguments passed to the `convert` command */
  export type Convert = {
  /** 2.0 */
  "amount": string,
  /** SOL */
  "from": string,
  /** ETH */
  "to": string
}
}
