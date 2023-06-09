import { motion } from 'framer-motion'

const Socials = [
  [
    '/icons/dextools.svg',
    'https://www.dextools.io/app/en/ether/pair-explorer/0xd25f4eccd9299b3b770a3d1163e2204101ae7c3d',
  ],
  ['/icons/etherscan.png', 'https://etherscan.io/token/0x3969900c10def45322eb1a3dbf70e8da079eb718'],
  ['/icons/twitter.png', 'https://twitter.com/moontzuerc20'],
  ['/icons/telegram.png', 'https://t.me/Moontzuportal'],
  ['/icons/uniswap.svg', 'https://app.uniswap.org/#/swap?outputCurrency=0x3969900c10def45322eb1a3dbf70e8da079eb718'],
]

export const Hero = () => (
  <>
    <div className='flex w-full flex-col items-start justify-center p-12 md:w-4/5 md:text-left z-10'>
      <p className='w-full uppercase text-slate-300 '>0x3969900c10def45322eb1a3dbf70e8da079eb718</p>
      <img src='/logo.svg' width={'400px'} className='py-10' />
      <p className='mb-8 text-2xl leading-normal text-slate-300'>The Art of Ape</p>
    </div>
    <div className='flex flex-col w-1/5 p-12 h-full items-start justify-start z-10'>
      {Socials.map((d, idx) => (
        <div key={idx} className='mb-4'>
          <a href={d[1]}>
            <motion.img
              src={d[0]}
              width='30px'
              style={{ filter: 'brightness(0) invert(1)' }}
              whileHover={{ opacity: 0.5 }}
            />
          </a>
        </div>
      ))}
    </div>
    <div className='flex absolute top-16 items-center right-24 z-10'>
      <p className='w-full uppercase text-slate-300 '>erc-20</p>
      <img src='/icons/Ethereum.svg' width={'35px'} />
    </div>
  </>
)
