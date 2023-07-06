# Registry and NFT (CIP-25) Images CDN

## Overview
This tool caches token images with specified sizes from [cardano-token-registry](https://github.com/cardano-foundation/cardano-token-registry) and 721 metadata ([CIP-25](https://cips.cardano.org/cips/cip25/)). Available as a docker container. Visit [RayGraph.io](https://raygraph.io) for details.

## Accessing CDN
``` console
https://cdn.mainnet.raygraph.io/${type}/${size}/${fingerprint}
```
``` console
https://cdn.mainnet.raygraph.io/${type}/${size}/${fingerprint}
```
``` console
https://cdn.mainnet.raygraph.io/${type}/${size}/${fingerprint}
```
``` console
type = "registry" | "721"
default registry sizes = ["32", "64", "128", "256"]
default 721 sizes = ["32", "64", "128", "256", "512", "1024"]

examples
https://cdn.mainnet.raygraph.io/registry/64/asset1y7lphaaxkvjw5hl2kpq37nvlvg09qfqsh4qyme
https://cdn.mainnet.raygraph.io/721/512/asset1y7lphaaxkvjw5hl2kpq37nvlvg09qfqsh4qyme
```

## Getting Started
``` console
git clone \
    https://github.com/ray-network/raygraph-token-images-cdn.git \
    && cd raygraph-token-images-cdn \
    && cp .env.example .env
```
<details open>
  <summary><b>mainnet</b></summary>
  
``` console
docker compose -p mainnet-cdn up -d --build &&\
docker compose logs -f
```
</details>

<details>
  <summary><b>preview</b></summary>
  
``` console
PORT=4101 \
KOIOS_API="https://output.preview.raygraph.io" \
docker compose -p preview-cdn up -d --build &&\
docker compose logs -f
```
</details>

<details>
  <summary><b>preprod</b></summary>
  
``` console
PORT=4102 \
KOIOS_API="https://output.preprod.raygraph.io" \
docker compose -p preprod-cdn up -d --build &&\
docker compose logs -f
```
</details>

## Env Variables
``` env
HOST=0.0.0.0
PORT=4100
KOIOS_API=https://output.mainnet.raygraph.io
IPFS_API=https://nftstorage.link
CDN_FOLDER=/var/lib/token-images-cdn
IMG_REGISTRY_SIZES=["32", "64", "128", "256"]
IMG_721_SIZES=["32", "64", "128", "256", "512", "1024"]
```
