'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import {
  Line,
  useCursor,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  useScroll,
} from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { Geometry } from 'three-stdlib'

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
  distortion: 0.1,
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

export const ReflectorPlane = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={15}
        depthScale={1}
        minDepthThreshold={0.85}
        color='#07052d'
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()
  const data = useScroll()

  const [hovered, hover] = useState(false)

  const { nodes } = useGLTF('/sunTsu.gltf')
  const material = <MeshTransmissionMaterial attach='material' transmission={0.8} {...config} />

  useCursor(hovered)
  console.log(data)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
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
        {material}
      </mesh>
    </group>
  )
}
