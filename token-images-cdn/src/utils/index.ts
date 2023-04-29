export const detectImageUrlProvider = (imageUrl: string) => {
  if (imageUrl.startsWith("ipfs://")) {
    return {
      type: "ipfs",
      url: imageUrl.replaceAll("ipfs://", ""),
    }
  } else if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://")) {
    return {
      type: "url",
      url: imageUrl,
    }
  } else {
    return {
      type: "error",
      url: "",
    }
  }
}
