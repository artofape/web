'use client'

import {
  ScrollControls,
  Scroll,
  PerspectiveCamera,
  Environment,
  Lightformer,
  Html,
  AsciiRenderer,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Hero } from '@/components/elements/hero'
import { Content } from '@/components/elements/content'
const Logo = dynamic(() => import('@/components/canvas/Models').then((mod) => mod.Logo), {
  ssr: false,
})

const Grid = dynamic(() => import('@/components/canvas/Models').then((mod) => mod.Grid), { ssr: false })

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
    <div className='mx-auto flex w-full flex-col flex-wrap items-start justify-between md:flex-col  lg:w-4/5'>
      {/* jumbo */}
      <Hero />

      <div className='absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center z-0'>
        <Canvas>
          <Suspense fallback={<Html as='div'>{Loader}</Html>}>
            <ScrollControls pages={3}>
              <Logo route='/wisdom' scale={0.6} position={[0, 0, 0]} />
              <Content />
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
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
