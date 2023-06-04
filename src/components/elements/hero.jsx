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
      <h1
        style={{
          background: 'linear-gradient(45deg, #ff8400, #ffff660, #ff7300F)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 3px #df610d, 0 0 5px #db9d0c, 0 0 8px #9c7312, 0 0 10px #6f0913',
          WebkitTextStroke: '0.5px #db9d0c',
          textStroke: '0.5px #db9d0c',
        }}
        className='my-4 text-5xl font-bold leading-tight text-slate-100  font-SEVEN'
      >
        MOON TZU
      </h1>
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
  </>
)
