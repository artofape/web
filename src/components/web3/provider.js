import { ethers } from 'ethers'

let chain = 'mainnet'
const infura_address = `https://${chain}.infura.io/v3/${process.env.INFURA_API}`
const jsonRpcProvider = new ethers.JsonRpcProvider(infura_address)

export default jsonRpcProvider
