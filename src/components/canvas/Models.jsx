'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Instances, Instance, useGLTF, useCursor, MeshTransmissionMaterial, useScroll, Float } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { useSpring, animated } from '@react-spring/web'
import { PlaneGeometry, MeshBasicMaterial, Group, GridHelper } from 'three'

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

export const Logo = ({ route = '/Wisdom', ...props }) => {
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
    mesh.current.position.y = data.offset * 0.2
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
      </mesh>
    </group>
  )
}

// export const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => {
//   // console.log('Grid positions:')
//   // for (let y = 0; y < number; y++) {
//   //   for (let x = 0; x < number; x++) {
//   //     const posX = x * 2 - Math.floor(number / 2) * 2
//   //     const posY = -0.01
//   //     const posZ = y * 2 - Math.floor(number / 2) * 2
//   //     console.log(`[${posX}, ${posY}, ${posZ}]`)
//   //   }
//   // }
//   return (
//     // Renders a grid and crosses as instances
//     <Instances position={[0, -1.02, 0]}>
//       <planeGeometry args={[lineWidth, height]} />
//       <meshBasicMaterial color='#fff' />
//       {Array.from({ length: number }, (_, y) =>
//         Array.from({ length: number }, (_, x) => (
//           <group
//             key={x + ':' + y}
//             position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}
//           >
//             <Instance rotation={[-Math.PI / 2, Math.PI / 2, 1]} />
//             <Instance rotation={[0, 0, 1]} />
//           </group>
//         )),
//       )}
//       <gridHelper args={[100, 100, '#fff', '#fff']} position={[0, 0, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 1]} />
//     </Instances>
//   )
// }
