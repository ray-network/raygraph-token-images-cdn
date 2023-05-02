# Registry and NFT (CIP-25) Images CDN

## Overview
This tool caches token images with specified sizes from [cardano-token-registry](https://github.com/cardano-foundation/cardano-token-registry) and 721 metadata ([CIP-25](https://cips.cardano.org/cips/cip25/)). Available as a docker container. Visit )[RayGraph.io](https://raygraph.io) for details.

## Accessing CDN
``` console
https://mainnet.cdn.raygraph.io/${type}/${size}/${fingerprint}

type = "registry" | "721"
default registry sizes = ["32", "64", "128", "256"]
default 721 sizes = ["32", "64", "128", "256", "512", "1024"]

examples
https://mainnet.cdn.raygraph.io/registry/64/asset1y7lphaaxkvjw5hl2kpq37nvlvg09qfqsh4qyme
https://mainnet.cdn.raygraph.io/721/512/asset1y7lphaaxkvjw5hl2kpq37nvlvg09qfqsh4qyme
```

## Getting Started
``` console
git clone \
    https://github.com/ray-network/raygraph-tools.git \
    && cd raygraph-tools/token-images-cdn \
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
GRAPHQL_API="https://preview.blockchain.raygraph.io/graphql" \
GREST_API="https://preview.blockchain.raygraph.io/grest" \
docker compose -p preview-cdn up -d --build &&\
docker compose logs -f
```
</details>

<details>
  <summary><b>preprod</b></summary>
  
``` console
PORT=4102 \
GRAPHQL_API="https://preprod.blockchain.raygraph.io/graphql" \
GREST_API="https://preprod.blockchain.raygraph.io/grest" \
docker compose -p preprod-cdn up -d --build &&\
docker compose logs -f
```
</details>

## Env Variables
``` env
HOST=0.0.0.0
PORT=4100
GRAPHQL_API=https://mainnet.blockchain.raygraph.io/graphql
GREST_API=https://mainnet.blockchain.raygraph.io/grest
IPFS_API=https://cloudflare-ipfs.com
CDN_FOLDER=/var/lib/token-images-cdn
IMG_REGISTRY_SIZES=["32", "64", "128", "256"]
IMG_721_SIZES=["32", "64", "128", "256", "512", "1024"]
```
