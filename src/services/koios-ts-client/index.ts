import axios, { AxiosError, AxiosResponse, GenericAbortSignal } from "axios"
import dotenv from "dotenv"
import * as KoiosTypes from "./types"

dotenv.config()
const GREST_API = process.env.GREST_API

export const koiosClient = axios.create({
  baseURL: GREST_API,
})

koiosClient.interceptors.response.use(
  (response: AxiosResponse): any => {
    return {
      success: response.data,
      headers: response.headers,
    }
  },
  (error: AxiosError): { error: KoiosTypes.IError } => {
    return {
      error: {
        type: error?.response ? "error" : error?.request ? "no-response" : "bad-request",
        message: error.message,
        name: error.name,
        error,
      },
    }
  }
)

export async function raw({ signal, url }: { signal?: GenericAbortSignal; url: string }) {
  return koiosClient.get(`${url}`, { signal })
}

export async function networkTip({
  signal,
}: {
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.NetworkTipResponse; error: KoiosTypes.IError }> {
  return koiosClient.get("/tip", { signal })
}

export async function epochInformation({
  epoch_no,
  include_next_epoch,
  signal,
}: {
  epoch_no: number
  include_next_epoch?: boolean
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.EpochInformationResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/epoch_info",
    {
      _epoch_no: epoch_no,
      _include_next_epoch: include_next_epoch,
    },
    { signal }
  )
}

export async function accountInformation({
  stakeKey,
  signal,
}: {
  stakeKey: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountInformationResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_info",
    {
      _stake_addresses: [stakeKey],
    },
    { signal }
  )
}

export async function accountHistory({
  stakeKey,
  epoch_no,
  signal,
}: {
  stakeKey: string
  epoch_no?: number
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountHistoryResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_history",
    {
      _stake_addresses: [stakeKey],
      _epoch_no: epoch_no,
    },
    { signal }
  )
}

export async function accountRewards({
  stakeKey,
  epoch_no,
  signal,
}: {
  stakeKey: string
  epoch_no?: number
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountRewardsResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_rewards",
    {
      _stake_addresses: [stakeKey],
      _epoch_no: epoch_no,
    },
    { signal }
  )
}

export async function accountUpdates({
  stakeKey,
  signal,
}: {
  stakeKey: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountUpdatesResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_updates",
    {
      _stake_addresses: [stakeKey],
    },
    { signal }
  )
}

export async function accountAssets({
  stakeKey,
  signal,
}: {
  stakeKey: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountAssetsResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_assets",
    {
      _stake_addresses: [stakeKey],
    },
    { signal }
  )
}

export async function accountAddresses({
  stakeKey,
  _first_only,
  _empty,
  signal,
}: {
  stakeKey: string
  _first_only?: boolean
  _empty?: boolean
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AccountAddressesResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/account_addresses",
    {
      _stake_addresses: [stakeKey],
      _first_only,
      _empty,
    },
    { signal }
  )
}

export async function poolList({
  signal,
  headers,
  paramsString,
}: {
  signal?: GenericAbortSignal
  headers?: object
  paramsString?: string
}): Promise<{ success: KoiosTypes.PoolListResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(`/pool_list${paramsString ? paramsString : ""}`, { signal, headers })
}

export async function poolInformation({
  poolIds,
  signal,
}: {
  poolIds: string[]
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.PoolInformationResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/pool_info",
    {
      _pool_bech32_ids: poolIds,
    },
    { signal }
  )
}

export async function poolBlocks({
  poolId,
  epochNo,
  headers,
  paramsString,
  signal,
}: {
  poolId: string
  epochNo?: string
  headers?: object
  paramsString?: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.PoolBlocksResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(
    `/pool_blocks?${poolId ? "&_pool_bech32=" + poolId : ""}${epochNo ? "&_epoch_no=" + epochNo : ""}${
      paramsString ? paramsString : ""
    }`,
    {
      signal,
      headers,
    }
  )
}

export async function poolHistory({
  poolId,
  epochNo,
  headers,
  paramsString,
  signal,
}: {
  poolId: string
  epochNo?: string
  headers?: object
  paramsString?: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.PoolHistoryResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(
    `/pool_history?${poolId ? "&_pool_bech32=" + poolId : ""}${epochNo ? "&_epoch_no=" + epochNo : ""}${
      paramsString ? paramsString : ""
    }`,
    {
      signal,
      headers,
    }
  )
}

export async function poolDelegators({
  poolId,
  headers,
  paramsString,
  signal,
}: {
  poolId: string
  headers?: object
  paramsString?: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.PoolDelegatorsResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(
    `/pool_delegators?${poolId ? "&_pool_bech32=" + poolId : ""}${paramsString ? paramsString : ""}`,
    {
      signal,
      headers,
    }
  )
}

export async function poolUpdates({
  poolId,
  headers,
  paramsString,
  signal,
}: {
  poolId: string
  headers?: object
  paramsString?: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.PoolUpdatesResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(
    `/pool_updates?${poolId ? "&_pool_bech32=" + poolId : ""}${paramsString ? paramsString : ""}`,
    {
      signal,
      headers,
    }
  )
}

export async function assetList({
  headers,
  paramsString,
  signal,
}: {
  headers?: object
  paramsString?: string
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AssetListResponse; error: KoiosTypes.IError }> {
  return koiosClient.get(
    `/asset_list?${paramsString ? paramsString : ""}`,
    {
      signal,
      headers,
    }
  )
}

export async function assetInformation({
  assets,
  signal,
}: {
  assets: [string, string][]
  signal?: GenericAbortSignal
}): Promise<{ success: KoiosTypes.AssetInformationResponse; error: KoiosTypes.IError }> {
  return koiosClient.post(
    "/asset_info",
    {
      _asset_list: assets,
    },
    { signal }
  )
}
