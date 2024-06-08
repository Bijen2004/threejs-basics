'use client'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useRef, useState } from 'react'
import {DirectionalLightHelper} from 'three'

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

const TorusKnot=({position,size})=>{
  const ref = useRef()


  const{color,radius} = useControls({
    color:'lightblue',
    radius:{
      value:5,
      min:1,
      max:10,
      step:0.5
    }

  })

  // useFrame((state,delta)=>{
  //   ref.current.rotation.x += delta
  //   ref.current.rotation.y += delta*2
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime)*2
  // })
  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius,...size]}/>
      <MeshWobbleMaterial factor={10} speed={2} color={color}/>
    </mesh>
  )
}

const Scene = ()=>{

  const directionalLightRef = useRef()

  // const {lightColor,lightIntensity} = useControls({
  //   lightColor:'#21c8db',
  //   lightIntensity:{
  //     value:0.5,
  //     min:0,
  //     max:5,
  //   }
  // })
  useHelper(directionalLightRef,DirectionalLightHelper,0.5,'white')

  return(
    <>
    <directionalLight position={[-1,1,2]} intensity={3.9} ref={directionalLightRef}
   color={'#db2121'}
    />
         <ambientLight intensity={0.1}/>
 
       {/* <group position={[0,-1,0]}>
         <Cube position={[1,0,0]} color={'green'} size={[1,1,1]}/>
         <Cube position={[-1,0,0]} color={'hotpink'} size={[1,1,1]}/>
         <Cube position={[1,2,0]} color={'yellow'} size={[1,1,1]}/>
         <Cube position={[-1,2,0]} color={'blue'} size={[1,1,1]}/>
       </group>     */}
 
       {/* <Cube position={[0,0,0]} size={[1,1,1]} color={'orange'}/> */}
         
         {/* <Sphere position={[0,0,0]} size={[1,30,30]}/> */}
         {/* <Torus position={[2,0,0]} size={[0.8,0.2,30,30]} color={'blue'}/> */}
         <TorusKnot position={[0,0,0]} size={[0.1,1000,50]} color={'yellow'}/>
         <OrbitControls enableZoom={false}/>
   </>
  )
 
}

const page = () => {
  return (
    <div>
      <Canvas>
       <Scene />
      </Canvas>
    </div>
  )
}

export default page