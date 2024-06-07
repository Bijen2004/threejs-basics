'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

const Cube = ({position,size,color})=>{
  const ref = useRef()
  useFrame((state,delta)=>{
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta*2
    ref.current.position.z = Math.sin(state.clock.elapsedTime)*2
  })
  return(
<mesh position={position} ref={ref}>
          <boxGeometry args={size}/>
          <meshStandardMaterial color={color}/>
        </mesh>
  )
}

const Sphere=({position,size,color})=>{
  const ref = useRef()
  const [isHovered,setIsHovered] = useState(false)
  const [isClicked,setIsClicked] = useState(false)
  useFrame((state,delta)=>{
    const speed = isHovered?1:0.2
    ref.current.rotation.y += delta*speed
  })
  return(
    <mesh position={position} ref={ref} 
    onPointerEnter={(event)=>(event.stopPropagation(),setIsHovered(true))}
    onPointerLeave={()=>setIsHovered(false)}
    onClick={()=>setIsClicked(!isClicked)}
    scale={isClicked?2:1}
    >
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={isHovered? 'red':'blue'} wireframe/>
    </mesh>
  )
}

const Torus=({position,size,color})=>{
  const ref = useRef()
  useFrame((state,delta)=>{
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta*2
    ref.current.position.z = Math.sin(state.clock.elapsedTime)*2
  })
  return(
    <mesh position={position} ref={ref}>
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot=({position,size,color})=>{
  const ref = useRef()
  useFrame((state,delta)=>{
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta*2
    ref.current.position.z = Math.sin(state.clock.elapsedTime)*2
  })
  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const page = () => {
  return (
    <div>
      <Canvas>
        <directionalLight position={[0,0,2]} intensity={0.5}/>
        <ambientLight intensity={0.1}/>

      {/* <group position={[0,-1,0]}>
        <Cube position={[1,0,0]} color={'green'} size={[1,1,1]}/>
        <Cube position={[-1,0,0]} color={'hotpink'} size={[1,1,1]}/>
        <Cube position={[1,2,0]} color={'yellow'} size={[1,1,1]}/>
        <Cube position={[-1,2,0]} color={'blue'} size={[1,1,1]}/>
      </group>     */}

      {/* <Cube position={[0,0,0]} size={[1,1,1]} color={'orange'}/> */}
        
        <Sphere position={[0,0,0]} size={[1,30,30]}/>
        {/* <Torus position={[2,0,0]} size={[0.8,0.2,30,30]} color={'blue'}/>
        <TorusKnot position={[-2,0,0]} size={[0.5,0.1,1000,50]} color={'yellow'}/> */}

      </Canvas>
    </div>
  )
}

export default page