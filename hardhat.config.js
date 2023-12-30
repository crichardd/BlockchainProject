require("@nomicfoundation/hardhat-toolbox");

const {
  mnemonic,
  infuraProjectId,
  sepoliaPrivateKey,
} = require("./secrets.json");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan: {
    apiKey: "SIAUM5Q6WW5U3P1GUBBSHHS9RR9GS13R1M",
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: [sepoliaPrivateKey],
      gasPrice: 20000000000,
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
