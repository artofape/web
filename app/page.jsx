'use client'

import { ScrollControls, PerspectiveCamera, Environment, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), {
  ssr: false,
})

const Loader = (
  <div className='flex h-96 w-full flex-col items-center justify-center'>
    <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-slate-400 z-10' fill='none' viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  </div>
)
export default function Page() {
  return (
    <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
      {/* jumbo */}
      <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
        <p className='w-full uppercase text-slate-300 z-10'>0x65fFf8e4dC2d46C4959dC5a006F089528055438D</p>
        <h1 className='my-4 text-5xl font-bold leading-tight text-slate-100 z-10 font-SEVEN'>MOON TZU</h1>
        <p className='mb-8 text-2xl leading-normal text-slate-300 z-10'>The Art of Ape.</p>
      </div>

      <div className='absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center z-0'>
        <Suspense fallback={Loader}>
          <Canvas>
            <ScrollControls pages={4}>
              <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
            </ScrollControls>
            <Environment files={'/dikhololo_night_1k.hdr'}>
              <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, 1, 10]} scale={[10, 2, 1]} />
                <Lightformer type='ring' intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, 15]} scale={10} />
              </group>
            </Environment>
            <color attach='background' args={['black']} />
            <ambientLight intensity={3} />
            <pointLight position={[20, 30, 10]} intensity={0.5} />
            <PerspectiveCamera makeDefault fov={40} position={[0, 3, 5]} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}
