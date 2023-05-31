import KoiosTinyClient from "koios-tiny-client"

const { client, methods: Koios } = new KoiosTinyClient('https://mainnet.blockchain.raygraph.io')

export default Koios