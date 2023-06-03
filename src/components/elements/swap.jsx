import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget, Theme, darkTheme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useRef, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import jsonRpcProvider from '../web3/provider'
const JSON_RPC_URL = 'https://mainnet.infura.io/v3/1f9d33a510e443dc8ffe3721d5affe2d'
const theme = {
  secondary: '#ececec',
  primary: '#ffffff',
  interactive: '#1190f1',
  container: '#071f31',
  module: '#000000',
  accent: '#bdbdbd',
  outline: '#004ceec7',
  dialog: '#FFF',
  fontFamily: 'Inter',
  borderRadius: 1,
}

const TOKEN_LIST = [
  {
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
  },
  {
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    name: 'MOONTZU',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'MOONTZU',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://github.com/bbacondevs/web/blob/master/assets/BACONDisk.png?raw=true',
  },
]
export const Swap = () => {
  // const connectors = useRef(null)
  // const focusConnectors = useCallback(() => connectors.current?.focus(), [])
  const [locale, setLocale] = useState('en-US')
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), [])
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [shortAddress, setShortAddress] = useState(undefined)

  const checkWallet = async (autoConnect = false) => {
    const walletAddress = await connectWallet(autoConnect)
    if (walletAddress) {
      setWalletAddress(walletAddress)
      setShortAddress(sliceAddress(walletAddress))
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex mx-8'>
        <SwapWidget
          jsonRpcEndpoint={JSON_RPC_URL}
          tokenList={TOKEN_LIST}
          provider={jsonRpcProvider}
          locale={locale}
          defaultInputTokenAddress='NATIVE'
          defaultInputAmount='1'
          defaultOutputTokenAddress={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'}
          // theme={theme}
          convenienceFee={1}
          convenienceFeeRecipient={'0x2BBc3577dec0aA8e1bd1E8F6Dd62327c903D2077'}
          width={400}
          theme={darkTheme}
        />
      </div>
    </div>
  )
}
