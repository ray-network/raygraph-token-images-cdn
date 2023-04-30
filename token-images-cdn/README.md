# Registry and NFT (CIP-25) Images CDN

## Overview
This tool caches an images with specified sizes from [cardano-token-registry](https://github.com/cardano-foundation/cardano-token-registry) and 721 metadata ([CIP-25](https://cips.cardano.org/cips/cip25/)). Available as a docker container. Visit RayGraph.io for details.

## Accessing CDN
``` console
https://mainnet.cdn.raygraph.io/${type}/${size}/${fingerprint}

type = "registry" | "721"
default registry sizes = ["32", "64", "128", "256"]
default 721 sizes = ["32", "64", "128", "256", "512", "1024"]

examples
https://mainnet.cdn.raygraph.io/registry/64/asset1zwa4chw9xm7xwk7g46ef94qsj28hmnd7qffhgx
https://mainnet.cdn.raygraph.io/721/511/asset1zwa4chw9xm7xwk7g46ef94qsj28hmnd7qffhgx
```

## Getting Started
``` console
git clone \
    https://github.com/ray-network/raygraph-tools.git \
    && cd raygraph-tools/token-images-cdn
```
<details open>
  <summary><b>mainnet</b></summary>
  
``` console
docker compose -p mainnet up -d --build &&\
docker compose logs -f
```
</details>

<details>
  <summary><b>preprod</b></summary>
  
``` console
PORT=4101 \
GRAPHQL_API="https://preprod.blockchain.raygraph.io/graphql" \
GREST_API="https://preprod.blockchain.raygraph.io/grest" \
docker compose -p preprod up -d --build &&\
docker compose logs -f
```
</details>

<details>
  <summary><b>preview</b></summary>
  
``` console
PORT=4102 \
GRAPHQL_API="https://preview.blockchain.raygraph.io/graphql" \
GREST_API="https://preview.blockchain.raygraph.io/grest" \
docker compose -p preprod up -d --build &&\
docker compose logs -f
```
</details>

## Env Variables
``` env
HOST=0.0.0.0
PORT=4100
GRAPHQL_API=https://preview.blockchain.raygraph.io/graphql
GREST_API=https://preview.blockchain.raygraph.io/grest
IPFS_API=https://cloudflare-ipfs.com
CDN_FOLDER=/var/lib/token-images-cdn
IMG_REGISTRY_SIZES=["32", "64", "128", "256"]
IMG_721_SIZES=["32", "64", "128", "256", "512", "1024"]
```
