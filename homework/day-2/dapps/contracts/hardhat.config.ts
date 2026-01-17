import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    // avalancheFuji: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   chainId: 43113,
    //   accounts: [process.env.PRIVATE_KEY!],
    // },
    snowtrace: {
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    accounts: [process.env.PRIVATE_KEY!],
  },
  },
  etherscan: {
    // apiKey: {
    //   avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
    // },
    apiKey: {
    snowtrace: "snowtrace", // placeholder
  },
  customChains: [
    {
      network: "snowtrace",
      chainId: 43113,
      urls: {
        apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
        browserURL: "https://testnet.snowtrace.io",
      },
    },
  ],
  },
};

export default config;
