'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useGLTF, useCursor, MeshDistortMaterial, MeshTransmissionMaterial, useScroll, Float } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { useSpring, animated, a } from '@react-spring/web'

const AnimatedMeshTransmissionMaterial = animated(MeshTransmissionMaterial)
const AnimatedFloat = animated(Float)
const config = {
  backside: true,
  backsideThickness: 5,
  samples: 16,
  resolution: 1024,
  // transmission: 1,
  clearcoat: 0,
  clearcoatRoughness: 0,
  thickness: 0.3,
  chromaticAberration: 5,
  anisotropy: 0.3,
  roughness: 0,
  distortion: 0.2,
  distortionScale: 1,
  temporalDistortion: 0,
  ior: 1.5,
  color: '#1f0e05',
  gColor: '#ffed62',
  shadow: '#0a0202',
}

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Book = ({ route = '/', ...props }) => {
  const ref = useRef(null)
  const { scene } = useGLTF('/book.glb')
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  const data = useScroll()
  useCursor(hovered)
  useFrame((state, delta) => {
    ref.current.rotation.y = data.offset * 1.5
  })
  const { intensity } = useSpring({
    intensity: hovered ? 0.01 : 0.5,
    config: { tension: 280, friction: 120 },
  })
  return (
    <AnimatedFloat
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={2} // XYZ rotation intensity, defaults to 1
      floatIntensity={intensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-5, 5]}
    >
      <primitive
        ref={ref}
        object={scene}
        onClick={() => router.push(route)}
        {...props}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
    </AnimatedFloat>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()
  const data = useScroll()

  const [hovered, hover] = useState(false)
  const { nodes } = useGLTF('/sunTsu.gltf')

  const spring = useSpring({
    color: hovered ? '#0c182b' : '#1f0e05',
  })

  // const material =
  useCursor(hovered)
  useFrame((state, delta) => {
    // const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = data.offset * 0.5
    mesh.current.position.z = data.offset * 0.5
    //Math.cos(t * 0.5) * (Math.PI / 12)
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      <mesh
        geometry={nodes.LowPoly004_CUGP_Layer016.geometry}
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <AnimatedMeshTransmissionMaterial attach='material' transmission={0.8} {...config} color={spring.color} />
        {/* {hovered && (
          <Edges
            scale={1.001}
            threshold={35} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
            color='#9d6a22'
            transition={{ duration: 0.5 }}
          />
        )} */}
      </mesh>
    </group>
  )
}
