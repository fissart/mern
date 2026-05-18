import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
// import { Canvas, useFrame } from "@react-three-fiber"
import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei'
// import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"

const state = proxy({
  current: null,
  items: {
    w1: "#B54192",
    w2: "#591ED1",
    w3: "#3742CC",
    w4: "#B21153",
    w5: "#597ED1",
    inner: "#ffffff",
    stripes: "#ffffff",
  },
})

function Shoe() {
  const ref = useRef()
  const snap = useProxy(state)
  // console.log(snap.items)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF('/wwwww.gltf')

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.z = Math.sin(t / 1.5) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#fff"/>
      <g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g>
      <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
      <text fill="#fff" style="white-space:pre" font-family="Inter var, sans-serif" font-size="11" letter-spacing="-.01em"><tspan x="1" y="63">${hovered}</tspan></text>
    </g>
    <defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : null)}'), auto`
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name), console.log(e.object.material))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.Torus001.geometry} material={materials.w1} material-color={snap.items.w1} position={[0, -1.2, 0]} />
      <mesh geometry={nodes.Suzanne.geometry} material={materials.w2} material-color={snap.items.w2} position={[0, 0, 0]} />
      <mesh geometry={nodes.Suzanne001.geometry} material={materials.w4} material-color={snap.items.w3} position={[0, 0, 0]} />
      <mesh geometry={nodes.Suzanne002.geometry} material={materials.w3} material-color={snap.items.w4} position={[0, 0, 0]} />
      <mesh geometry={nodes.Suzanne003.geometry} material={materials.w5} material-color={snap.items.w5} position={[0, 0, 0]} />
      {/* <mesh geometry={nodes.Torus.geometry} material={materials.www} material-color={snap.items.www} position={[0, 0, 0]} scale={[1, -2.182, 1]} />
      <mesh geometry={nodes.Sphere.geometry} material={materials.wwwww} material-color={snap.items.wwwww} position={[0, 0, 0]} scale={0.485} /> */}
    </group>
  )
}

function Picker() {
  const snap = useProxy(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ height: '70vh', textAlign: 'center' }} >
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 1.9] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <Shoe /> 
          <Environment preset="park"/>
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -1.1, 0]} opacity={1.95} width={5} height={5} blur={1} far={1} />
        </Suspense>
        {/* <Environment files="royal_esplanade_1k.hdr" background="true" /> */}
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI} />
        {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI } enableZoom={false} enablePan={false} /> */}
      </Canvas >
      <Picker />
    </div>
  )
}