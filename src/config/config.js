import { config } from "@onflow/fcl"

config({
  "accessNode.api": process.env.REACT_APP_ACCESS_NODE,
  "discovery.wallet": process.env.REACT_APP_WALLET_DISCOVERY,
  "0xFungibleToken": process.env.REACT_APP_FT_CONTRACT,
  "0xFlowToken": process.env.REACT_APP_FUSD_CONTRACT,
  "0xATTANFT": process.env.REACT_APP_DAPPY_CONTRACT,
  "0xNonFungibleToken": process.env.FLOW_NONFUNGIBLE_ADDRESS
})