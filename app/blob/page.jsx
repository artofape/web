'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, ScrollControls } from '@react-three/drei'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const Book = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Book), { ssr: false })
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
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase text-slate-400 z-10'>Coming soon..</p>
          <h1 className='my-4 text-5xl font-bold leading-tight text-slate-200 z-10 font-SEVEN'>MOON TZU'S WISDOM</h1>
        </div>
      </div>

      <div className='absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center z-0'>
        <Suspense fallback={Loader}>
          <Canvas>
            <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color='orange' />
            <ScrollControls pages={4}>
              <Book />
            </ScrollControls>
            <PerspectiveCamera makeDefault fov={65} position={[0, 0, 8]} />
            <color attach='background' args={['black']} />
            <ambientLight intensity={0.2} />
            <EffectComposer multisampling={0}>
              <DepthOfField target={[0, 0, 10]} focalLength={0.2} bokehScale={14} height={700} />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>
    </>
  )
}
