export const detectImageUrlProvider = (imageUrl: string) => {
  if (Array.isArray(imageUrl)) {
    return {
      type: "base64",
      data: imageUrl.join("").split(";base64,").pop(),
    }
  }
  if (typeof imageUrl == "string") {
    if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://")) {
      return {
        type: "http",
        data: imageUrl,
      }
    } else if (imageUrl.startsWith("ipfs://")) {
      return {
        type: "ipfs",
        data: imageUrl.replaceAll("ipfs://", ""),
      }
    } else if (imageUrl.startsWith("data:image/")) {
      return {
        type: "base64",
        data: imageUrl.split(";base64,").pop(),
      }
    }
  }
  return {
    type: "error",
    data: "",
  }
}
