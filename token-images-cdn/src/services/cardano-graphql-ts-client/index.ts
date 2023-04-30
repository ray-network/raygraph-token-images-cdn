import axios, { AxiosError, AxiosResponse, GenericAbortSignal } from "axios"
import dotenv from "dotenv"
import * as CGraphqlTypes from "./types"

dotenv.config()
const GRAPHQL_API = process.env.GRAPHQL_API

const client = axios.create({
  baseURL: GRAPHQL_API,
})

client.interceptors.response.use(
  (response: AxiosResponse): any => {
    return {
      success: response.data?.data,
      headers: response.headers,
    }
  },
  (error: AxiosError): { error: CGraphqlTypes.IError } => {
    return {
      error: {
        type: error.response ? "error" : error.request ? "no-response" : "bad-request",
        message: error.message,
        name: error.name,
        error: error,
      },
    }
  }
)

export async function assetByFingerprint({
  fingerprint,
  signal,
}: {
  fingerprint: string
  signal?: GenericAbortSignal
}): Promise<{ success: CGraphqlTypes.IAssetsResponse; error: CGraphqlTypes.IError }> {
  return client.post(
    "/",
    {
      query: `
        query assetByFingerprint($fingerprint: String!) {
          assets(where: { fingerprint: { _eq: $fingerprint } }) {
            policyId
            assetName
          }
        }
    `,
      variables: {
        fingerprint,
      },
    },
    { signal }
  )
}

export async function assetWithLogoByFingerprint({
  fingerprint,
  signal,
}: {
  fingerprint: string
  signal?: GenericAbortSignal
}): Promise<{ success: CGraphqlTypes.IAssetsWithLogoResponse; error: CGraphqlTypes.IError }> {
  return client.post(
    "/",
    {
      query: `
        query assetByFingerprint($fingerprint: String!) {
          assets(where: { fingerprint: { _eq: $fingerprint } }) {
            policyId
            assetName
            logo
          }
        }
    `,
      variables: {
        fingerprint,
      },
    },
    { signal }
  )
}
