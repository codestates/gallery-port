import * as THREE from 'three';
import React, { useState, Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import data from '../../data';
import arrow from '../../images/arrow_low_w.svg';
import './LandingGallery.css';
import { scrollTo } from '../../utils/etc';

function Image({ url, canvasWidth }) {
  const [active, setActive] = useState(0);

  const mesh = useRef();
  const random = require('lodash.random');
  const { spring } = useSpring({
    spring: Number(active),
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.2]);
  const position = useMemo(() => {
    return [
      random(-35, 35, true),
      random(-10, 10, true),
      random(-13, 13, true),
    ];
  }, []);
  const timeMod = useMemo(() => random(0.1, 4), []);

  const texture = useLoader(THREE.TextureLoader, url);
  useFrame(() => {
    mesh.current.position.x += 0.02 * timeMod * 0.5;

    if (mesh.current.position.x + 5 > canvasWidth / 40) {
      mesh.current.position.x = -(canvasWidth / 40);
    }
  });

  return (
    <a.mesh
      ref={mesh}
      position={position}
      scale-x={scale}
      scale-y={scale}
      onClick={() => setActive(!active)}
    >
      <planeBufferGeometry attach="geometry" args={[5, 8]} />
      <MeshWobbleMaterial
        attach="material"
        factor={active ? 0.1 : 0}
        speed={10}
        map={texture}
        side={THREE.DoubleSide}
      />
    </a.mesh>
  );
}
function Images() {
  const size = useThree(state => state.size);
  return data.map(el => (
    <Suspense fallback={null}>
      <Image key={el} url={el} canvasWidth={size.width} />
    </Suspense>
  ));
}
function LandingGallery() {
  return (
    <div
      className="canvasWrapper"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    >
      <div className="back stop-dragging">
        Gallery:port
        <br />
        <div className="mainText">
          ????????? ??????????????? ????????????,
          <br />
          ?????? ????????? ????????? ??? ?????? ??????,
          <br />
          Gallery:port ?????????.
        </div>
        <p>
          <img src={arrow} alt="arrow" className="mainArrow"></img>
        </p>
        <div
          className="mainProjectGo"
          style={{ cursor: 'pointer' }}
          onClick={() => scrollTo(200)}
        >
          ???????????? ????????????
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 15] }}>
        <Images />
        <directionalLight position={[0, 20, 20]} color="#ffffff" />
        <ambientLight color="#ffffff" />
      </Canvas>
      <div className="front stop-dragging">
        Gallery:port
        <br />
        <div className="mainText">
          ????????? ??????????????? ????????????,
          <br />
          ?????? ????????? ????????? ??? ?????? ??????,
          <br />
          Gallery:port ?????????.
        </div>
        <p>
          <img src={arrow} alt="arrow" className="mainArrow"></img>
        </p>
        <div
          className="mainProjectGo"
          style={{ cursor: 'pointer' }}
          onClick={() => scrollTo(window.innerHeight)}
        >
          ???????????? ????????????
        </div>
      </div>
    </div>
  );
}

export default LandingGallery;
