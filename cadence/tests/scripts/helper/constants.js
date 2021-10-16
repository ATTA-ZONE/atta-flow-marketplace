import dotenv from 'dotenv'
dotenv.config()

export const nodeUrl = process.env.FLOW_ACCESS_NODE

export const privateKey = process.env.FLOW_ACCOUNT_PRIVATE_KEY

export const accountKeyId = process.env.FLOW_ACCOUNT_KEY_ID

export const accountAddr = process.env.FLOW_ACCOUNT_ADDRESS

export const flowTokenAddr = process.env.FLOW_TOKEN_ADDRESS

export const flowFungibleAddr = process.env.FLOW_FUNGIBLE_ADDRESS

export const flowNonFungibleAddr = process.env.FLOW_NONFUNGIBLE_ADDRESS

export const publicKey = process.env.FLOW_ACCOUNT_PUBLIC_KEY

export const alchemyKey = process.env.ALCHEMY_KEY

export const network = process.env.NETWORK

const buildPath = (fileName, type = 'transactions') => {
  let filePath = ''
  switch (type) {
    case 'script':
      filePath = `../../../scripts/${fileName}`
      break
    default:
      filePath = `../../../transactions/${fileName}`
  }
  return filePath
}

export const paths = {
  scripts: {
    checkNFTCollection: buildPath('check_nft_collection.cdc', 'script'),
    getBaseURI: buildPath('get_base_uri.cdc', 'script'),
    getFlowBalance: buildPath('get_flow_balance.cdc', 'script'),
    getIsPause: buildPath('get_is_pause.cdc', 'script'),
    getMintPrice: buildPath('get_mint_price.cdc', 'script'),
    getNFTData: buildPath('get_nft_data.cdc', 'script'),
    getTotalSupply: buildPath('get_total_supply.cdc', 'script'),
    getUserNFTIds: buildPath('get_user_nft_ids.cdc', 'script'),
    getVaultBal: buildPath('get_vault_bal.cdc', 'script'),
  },
  transactions: {
    adminMinfNFT: buildPath('admin_mint_nft.cdc'),
    adminSetBaseURI: buildPath('admin_set_base_uri.cdc'),
    adminSetPause: buildPath('admin_set_pause.cdc'),
    adminSetPrice: buildPath('admin_set_price.cdc'),
    adminWithdrawVault: buildPath('admin_withdraw_vault.cdc'),
    initCollection: buildPath('init_user_collection.cdc'),
    initFlowVault: buildPath('init_flow_vault.cdc'),
    mintFlow: buildPath('mint_flow_token.cdc'),
    buyNFT: buildPath('buy_nft.cdc'),
    transferNFT: buildPath('transfer_nft.cdc'),
  },
}
