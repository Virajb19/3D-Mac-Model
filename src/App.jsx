import { Environment, OrbitControls, ScrollControls, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

export default function App(){

     const navbar = [" iPhone" ,
          " iPad" ,
          " services" ,
          " iOS" ,
          "mac" ,
          "products" ,
          " iPhone" ,
          " iPad" ,
          " services" ,
          " iOS" ,
          "mac" ,
          "products" ,]

 return <div className="w-full h-screen bg-black"> 
 <div id="navbar" className="absolute text-white top-10 left-[30%] flex gap-5 p-1 text-xs border-b border-white items-start h-[6vh]">
     {navbar.map((e,i) => {
          return <a key={i} href="" className="font-light capitalize">{e}</a>
     })}
 </div>
  <div className="p-1 text-white flex flex-col gap-1 absolute top-[15%] left-[27%] items-center">
    <span className="text-7xl tracking-tighter font-extrabold p-1">macbook pro .</span>
    <span>Oh so pro !</span>
    <p className="text-sm w-3/4 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, maxime <br /> ullam adipisci earum quo soluta excepturi perferendis ut a, autem molestiae assumenda recusandae vero dolor!</p>
  </div>
 <Canvas camera={{fov: 20, position: [0, -2, 120]}}>
      <OrbitControls enableZoom={false} />
      <Environment files={["https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_09_2k.hdr"]} />
      <ScrollControls pages={3}>
      <MacContainer />
      </ScrollControls>
 </Canvas> 
</div>
}

function MacContainer(){

   let model = useGLTF('./mac.glb')
   let texture = useTexture('./red.jpg')
   let meshes = {}

   model.scene.traverse(e => {
        meshes[e.name] = e
   })

   meshes.screen.rotation.x = THREE.MathUtils.degToRad(180)
   meshes.matte.material.map = texture
   meshes.matte.material.metalness = 0
   meshes.matte.material.roughness = 1
let data = useScroll()

useFrame((state,delta) => {
     meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90)
})

    return <group position={[0,-5,5]}>
        <primitive object={model.scene}/>
    </group>
}
