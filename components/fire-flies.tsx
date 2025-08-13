import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'

const r = () => Math.max(0.2, Math.random())

interface FatlineProps {
  curve: THREE.Vector3[]
  width?: number
  color: string
}

function Fatline({ curve, color }: FatlineProps) {
  return (
    <Line
      points={curve}
      color={color}
      lineWidth={1}
      dashed={true}
      dashScale={50}
      dashSize={1}
      dashOffset={0}
    />
  )
}

interface FirefliesProps {
  count: number
  colors: string[]
  radius?: number
}

export default function Fireflies({ count, colors, radius = 10 }: FirefliesProps) {
  const lines = useMemo(
    () =>
      new Array(count).fill(null).map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
        const points = new Array(30).fill(null).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone()
        })
        const curve = new THREE.CatmullRomCurve3(points).getPoints(100)
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          curve,
        }
      }),
    [count, radius, colors],
  )
  return (
    <group position={[-radius * 2, -radius, 0]}>
      {lines.map((props, index) => (
        <Fatline key={index} {...props} />
      ))}
    </group>
  )
}
