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
const IMG_721_SIZES = JSON.parse(process.env.IMG_721_SIZES) as string[]
const IMG_REGISTRY_SIZES = JSON.parse(process.env.IMG_REGISTRY_SIZES) as string[]
const cacheHeaders = {
  "Cache-Control": "public, max-age=864000",
  Expires: new Date(Date.now() + 864_000_000).toUTCString(),
  "Content-Type": "image/png",
}

const resizeAndSaveImages = async ({
  rawImage,
  fingerprint,
  sizes,
  cdnPath,
  registry,
}: {
  rawImage: Buffer
  fingerprint: string
  sizes: string[]
  cdnPath: string
  registry?: boolean
}) => {
  let images: { [size: string]: any } = {}
  for (const size of sizes) {
    const image = sharp(rawImage).resize(Number(size)).png()
    await image.toFile(`${cdnPath}/${fingerprint}${registry ? ".registry" : ""}.${size}.png`)
    images[size] = await image.toBuffer()
  }
  return images
}

const getImageFromRegistry = async (fingerprint: string) => {
  if (!fingerprint) throw new Error("No fingerprint provided")

  const getAssetData = await CGraphql.assetByFingerprint({ fingerprint })
  const { policyId, assetName } = getAssetData.success?.assets[0] || {}

  const getAssetInfo = await Koios.assetInformation({
    assets: [[policyId, assetName]],
  })

  if (getAssetInfo.error) throw new Error("Error getting asset data")
  if (getAssetInfo.success) {
    return Buffer.from(getAssetInfo.success[0]?.token_registry_metadata?.logo, "base64")
  }
}

const getImagesFromIPFS = async (fingerprint: string) => {
  if (!fingerprint) throw new Error("No fingerprint provided")

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
    const ipfsImageUrlProvider = detectImageUrlProvider(ipfsImageUrl)
    switch (ipfsImageUrlProvider.type) {
      case "ipfs":
        return (await axios.get(`${IPFS_API}/ipfs/${ipfsImageUrlProvider.data}`, { responseType: "arraybuffer" })).data
      case "http":
        return (await axios.get(ipfsImageUrlProvider.data, { responseType: "arraybuffer" })).data
      case "base64":
        return Buffer.from(ipfsImageUrlProvider.data, "base64")
      default:
        throw new Error("Error getting ipfs image url")
    }
  }
}

router.get("/registry/:size/:fingerprint", async (req, res, next) => {
  const { size, fingerprint } = req.params
  try {
    if (!IMG_REGISTRY_SIZES.includes(size)) throw new Error("Invalid size")
    try {
      const image = fs.readFileSync(`${CDN_FOLDER}/${fingerprint}.registry.${size}.png`)
      res.set(cacheHeaders)
      res.send(image)
    } catch {
      const registryImage = await getImageFromRegistry(fingerprint)
      if (!registryImage) throw new Error(`No registry image found :: ${fingerprint}`)
      const processedImages = await resizeAndSaveImages({
        rawImage: registryImage,
        fingerprint,
        sizes: IMG_REGISTRY_SIZES,
        cdnPath: CDN_FOLDER,
        registry: true,
      })
      res.set(cacheHeaders)
      res.send(processedImages[size])
    }
  } catch (error) {
    console.log("registry", fingerprint, error)
    res.set(cacheHeaders)
    res.status(404).send()
  }
})

router.get("/721/:size/:fingerprint", async (req, res, next) => {
  const { size, fingerprint } = req.params
  try {
    if (!IMG_721_SIZES.includes(size)) throw new Error("Invalid size")
    try {
      const image = fs.readFileSync(`${CDN_FOLDER}/${fingerprint}.${size}.png`)
      res.set(cacheHeaders)
      res.send(image)
    } catch {
      const ipfsImage = await getImagesFromIPFS(fingerprint)
      if (!ipfsImage) throw new Error(`No ipfs image found :: ${fingerprint}`)
      const processedImages = await resizeAndSaveImages({
        rawImage: ipfsImage,
        fingerprint,
        sizes: IMG_721_SIZES,
        cdnPath: CDN_FOLDER,
        registry: false,
      })
      res.set(cacheHeaders)
      res.send(processedImages[size])
    }
  } catch (error) {
    console.log("721", fingerprint, error)
    res.set(cacheHeaders)
    res.status(404).send()
  }
})

export default router
