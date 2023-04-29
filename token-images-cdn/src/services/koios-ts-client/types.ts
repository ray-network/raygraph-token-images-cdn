import { AxiosError } from "axios"

export interface IError {
  type: "error" | "no-response" | "bad-request"
  message: string
  name: string
  error: AxiosError
}

export type NetworkTipResponse = INetworkTip[]
export interface INetworkTip {
  abs_slot: number
  block_no: number
  block_time: number
  epoch_no: number
  epoch_slot: number
  hash: string
}

export type BlockInformationResponse = IBlockInformation[]
export interface IBlockInformation {
  hash: string
  epoch_no: number
  abs_slot: number
  epoch_slot: number
  block_height: number | null
  block_size: number
  block_time: number
  tx_count: number
  vrf_key: string
  op_cert: string
  op_cert_counter: number
  pool: string | null
  proto_major: number | null
  proto_minor: number | null
  total_output: string | null
  total_fees: string | null
  num_confirmations: number
  parent_hash: string
  child_hash: string
}

export type EpochInformationResponse = IEpochInformation[]
export interface IEpochInformation {
  epoch_no: number
  out_sum: string
  fees: string
  tx_count: number
  blk_count: number
  start_time: number
  end_time: number
  first_block_time: number
  last_block_time: number
  active_stake: string | null
  total_rewards: string | null
  avg_blk_reward: string | null
}

export type AccountInformationResponse = IAccountInformation[]
export interface IAccountInformation {
  stake_address: string
  status: "registered" | "not registered"
  delegated_pool: string
  total_balance: string
  utxo: string
  rewards: string
  withdrawals: string
  rewards_available: string
  reserves: string
  treasury: string
}

export type AccountHistoryResponse = {
  stake_address: string
  history: IAccountHistory[]
}[]
export interface IAccountHistory {
  pool_id: string
  epoch_no: number
  active_stake: string
}

export type AccountRewardsResponse = {
  stake_address: string
  rewards: IAccountRewards[]
}[]
export interface IAccountRewards {
  earned_epoch: number
  spendable_epoch: number
  amount: string
  type: "member" | "leader" | "treasury" | "reserves"
  pool_id: string | null
}

export type AccountUpdatesResponse = {
  stake_address: string
  updates: IAccountUpdates[]
}[]
export interface IAccountUpdates {
  action_type: "registration" | "delegation" | "withdrawal" | "deregistration"
  tx_hash: string
  epoch_no: number
  epoch_slot: number
  absolute_slot: number
  block_time: number
}

export type AccountAssetsResponse = {
  stake_address: string
  asset_list: IAccountAssets[]
}[]
export interface IAccountAssets {
  policy_id: string
  asset_name: string | null
  fingerprint: string
  decimals: number
  quantity: string
}

export type AccountAddressesResponse = {
  stake_address: string
  addresses: IAccountAddresses[]
}[]
export type IAccountAddresses = string

export type PoolListResponse = IPoolList[]
export interface IPoolList {
  pool_id_bech32: string
  ticker: string | null
}

export type PoolInformationResponse = IPoolInformation[]
export interface IPoolInformation {
  pool_id_bech32: string
  pool_id_hex: string
  active_epoch_no: number
  vrf_key_hash: string
  margin: number
  fixed_cost: string
  pledge: string
  reward_addr: string
  owners: string[]
  relays: {
    dns: string | null
    srv: string | null
    ipv4: string | null
    ipv6: string | null
    port: number | null
  }
  meta_url: string | null
  meta_hash: string | null
  meta_json: {
    name: string
    ticker: string
    homepage: string
    description: string
  }
  pool_status: "registered" | "retiring" | "retired"
  retiring_epoch: number | null
  op_cert: string | null
  op_cert_counter: number | null
  active_stake: string | null
  sigma: number | null
  block_count: string | null
  live_pledge: string | null
  live_stake: string | null
  live_delegators: number
  live_saturation: number | null
}

export type PoolBlocksResponse = IPoolBlocks[]
export interface IPoolBlocks {
  epoch_no: number
  epoch_slot: number
  abs_slot: number
  block_height: number | null
  block_hash: string
  block_time: number
}

export type PoolHistoryResponse = IPoolHistory[]
export interface IPoolHistory {
  epoch_no: number
  active_stake: string
  active_stake_pct: number
  saturation_pct: number
  block_cnt: number | null
  delegator_cnt: number
  margin: number
  fixed_cost: string
  pool_fees: string
  deleg_rewards: string
  epoch_ros: number
}

export type PoolUpdatesResponse = IPoolUpdates[]
export interface IPoolUpdates {
  tx_hash: string
  block_time: number
  pool_id_bech32: string
  pool_id_hex: string
  active_epoch_no: number
  vrf_key_hash: string
  margin: number
  fixed_cost: string
  pledge: string
  reward_addr: string
  owners: [string]
  relays: {
    dns: string | null
    srv: string | null
    ipv4: string | null
    ipv6: string | null
    port: number | null
  }
  meta_json: {
    meta_url: string | null
    meta_hash: string | null
    name: string
    ticker: string
    homepage: string
    description: string
  }
  pool_status: "registered" | "retiring" | "retired"
  retiring_epoch: number | null
}

export type PoolDelegatorsResponse = IPoolDelegators[]
export interface IPoolDelegators {
  stake_address: string
  amount: string
  active_epoch_no: number
  latest_delegation_tx_hash: string
}

export type AssetInformationResponse = IAssetInformation[]
export interface IAssetInformation {
  policy_id: string
  asset_name: string | null
  asset_name_ascii: string
  fingerprint: string
  minting_tx_hash: string
  total_supply: string
  mint_cnt: number
  burn_cnt: number
  creation_time: number
  minting_tx_metadata: {} | null
  token_registry_metadata: {
    name: string
    description: string
    ticker: string
    url: string
    logo: string
    decimals: number
  }
}
