import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget, Theme, darkTheme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import jsonRpcProvider from '../web3/provider'
const JSON_RPC_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_API}`
const theme = {
  ...darkTheme,
  secondary: '#ececec',
  primary: '#ffffff',
  interactive: '#001d31',
  container: '#000000',
  module: '#101010',
  accent: '#fff',
  accentSoft: '#001d31',
  outline: '#8b6f0aa1',
  dialog: '#101010',
  networkDefaultShadow: '#8b6f0aa1',
  fontFamily: 'Inter',
  borderRadius: { large: 1, medium: 0.8, small: 0.5, xsmall: 0.5 },
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
    address: '0x3969900c10def45322eb1a3dbf70e8da079eb718',
    symbol: 'MOONTZU',
    decimals: 6,
    chainId: 1,
    // logoURI: '/moontzulogo.jpg',
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
          defaultOutputTokenAddress={'0x3969900c10def45322eb1a3dbf70e8da079eb718'}
          theme={theme}
          convenienceFee={1}
          convenienceFeeRecipient={'0xF679c64D4727f73d806cA71a304B74a321Eb162b'}
          width={400}
          // theme={darkTheme}
        />
      </div>
    </div>
  )
}
