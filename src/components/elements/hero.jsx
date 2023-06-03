import { motion } from 'framer-motion'

const Socials = [
  ['/icons/dextools.svg', 'https://www.dextools.io/app/en/ether/pair-explorer/'],
  ['/icons/etherscan.png', 'https://etherscan.io/token/'],
  ['/icons/twitter.png', 'https://twitter.com/'],
  ['/icons/uniswap.svg', 'https://app.uniswap.org/#/swap?outputCurrency='],
]

export const Hero = () => (
  <>
    <div className='flex w-full flex-col items-start justify-center p-12 md:w-4/5 md:text-left z-10'>
      <p className='w-full uppercase text-slate-300 '>0x65fFf8e4dC2d46C4959dC5a006F089528055438D</p>
      <h1 className='my-4 text-5xl font-bold leading-tight text-slate-100  font-SEVEN'>MOON TZU</h1>
      <p className='mb-8 text-2xl leading-normal text-slate-300'>The Art of Ape</p>
    </div>
    <div className='flex flex-col w-1/5 p-12 h-full items-start justify-start z-10'>
      {Socials.map((d, idx) => (
        <div key={idx} className='mb-4'>
          <a href={d[1]}>
            <motion.img src={d[0]} width='30px' whileHover={{ opacity: 0.5 }} />
          </a>
        </div>
      ))}
    </div>
  </>
)