import KoiosTinyClient from "koios-tiny-client"
import dotenv from "dotenv"

dotenv.config()
const KOIOS_API = process.env.KOIOS_API

const { client, methods: Koios } = new KoiosTinyClient(KOIOS_API)

export default Koios