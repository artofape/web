'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl, ScrollControls } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color, position }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    {/* <pointLight position={[-10, -10, -10]} color='blue' /> */}
    <ambientLight intensity={3} />
    <pointLight position={[20, 30, 10]} intensity={1} color='blue' />
    <PerspectiveCamera makeDefault fov={40} position={position} />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>{children}</ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
