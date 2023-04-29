import Router from "express-promise-router"
import dotenv from "dotenv"
import axios from "axios"
import sharp from "sharp"
import fs from "fs"
import * as Koios from "../services/koios-ts-client"
import * as CGraphql from "../services/cardano-graphql-ts-client"
import { detectImageUrlProvider } from "../utils"

dotenv.config()
const router = Router()
const CDN_FOLDER = process.env.CDN_FOLDER
const IPFS_API = process.env.IPFS_API
const IMG_SIZES = JSON.parse(process.env.IMG_SIZES) as string[]
const cacheHeaders = {
  "Cache-Control": "public, max-age=864000",
  Expires: new Date(Date.now() + 864_000_000).toUTCString(),
  "Content-Type": "image/png",
}

const process721Image = async (base64Image: string, fingerprint: string, sizes: string[], cdnPath: string) => {
  let images: { [size: string]: any } = {}
  for (const size of sizes) {
    const image = sharp(base64Image).resize(Number(size)).png()
    await image.toFile(`${cdnPath}/${fingerprint}.${size}.png`)
    images[size] = await image.toBuffer()
  }
  return images
}

const getImagesFromRegistry = async (policyId: string, assetName: string) => {
  if (!policyId) throw new Error("No policy id provided")

  const getAssetInfo = await Koios.assetInformation({
    assets: [[policyId, assetName]],
  })

  if (getAssetInfo.error) throw new Error("Error getting asset info")
  if (getAssetInfo.success) {
    return getAssetInfo.success[0]?.token_registry_metadata?.logo
  }
}

const getImagesFromIPFS = async (fingerprint: string) => {
  if (!fingerprint) throw new Error("No policy id provided")

  const getAssetData = await CGraphql.assetByFingerprint({ fingerprint })
  if (getAssetData.error) throw new Error("Error getting asset data")
  const { policyId, assetName } = getAssetData.success?.assets[0] || {}

  const getAssetInfo = await Koios.assetInformation({
    assets: [[policyId, assetName]],
  })

  if (getAssetInfo.error) throw new Error("Error getting asset info")
  if (getAssetInfo.success) {
    const assetNameAscii = Buffer.from(assetName || "", "hex").toString("utf-8")
    const txMetadata: any = getAssetInfo.success[0]?.minting_tx_metadata
    const ipfsImageUrl = txMetadata?.["721"]?.[policyId]?.[assetNameAscii]?.image || ""

    let base64Image
    if (ipfsImageUrl) {
      const ipfsImageUrlProvider = detectImageUrlProvider(ipfsImageUrl)
      if (ipfsImageUrlProvider.type === "error") throw new Error("Error getting ipfs image url")
      const url =
        ipfsImageUrlProvider.type === "ipfs" ? `${IPFS_API}/ipfs/${ipfsImageUrlProvider.url}` : ipfsImageUrlProvider.url

      // const bufferedImage = await axios.get(url, { responseType: "arraybuffer" })
      // base64Image = `data:${bufferedImage.headers["content-type"]};base64,${Buffer.from(bufferedImage.data).toString(
      //   "base64"
      // )}`

      const bufferedImage = await axios.get(url, { responseType: "arraybuffer" })
      base64Image = bufferedImage.data
    }

    return base64Image
  }
}

router.get("/721/:size/:fingerprint", async (req, res, next) => {
  const { size, fingerprint } = req.params
  try {
    if (!IMG_SIZES.includes(size)) throw new Error("Invalid size")
    try {
      const image = fs.readFileSync(`${CDN_FOLDER}/${fingerprint}.${size}.png`)
      res.set(cacheHeaders)
      res.send(image)
    } catch {
      const ipfsImage = await getImagesFromIPFS(fingerprint)
      if (!ipfsImage) throw new Error(`No ipfs image found :: ${fingerprint}`)
      const processedImages = await process721Image(ipfsImage, fingerprint, IMG_SIZES, CDN_FOLDER)
      res.set(cacheHeaders)
      res.send(processedImages[size])
    }
  } catch (error) {
    console.log(fingerprint, error)
    res.set(cacheHeaders)
    res.status(404).send()
  }
})

export default router
