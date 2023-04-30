import { AxiosError } from "axios"

export interface IError {
  type: "error" | "no-response" | "bad-request"
  message: string
  name: string
  error: AxiosError
}

export interface IAssetsResponse {
  assets: IAsset[]
}
export interface IAsset {
  policyId: string
  assetName: string
}

export interface IAssetsWithLogoResponse {
  assets: IAssetWithLogo[]
}
export interface IAssetWithLogo extends IAsset {
  logo: string
}
