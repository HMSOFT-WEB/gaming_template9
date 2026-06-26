import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Search, Crosshair } from 'lucide-react';
import * as THREE from 'three';
import './index.css';

import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import prod1 from './assets/prod1.png';

// 3D Abstract Mechanical Switch / Core
function CyberCore() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 1.5;
    }
  });

  return (
    <group>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        {/* Outer Wireframe Box (Switch Housing) */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#00ffcc" wireframe transparent opacity={0.3} />
        </mesh>
        
        {/* Inner Glowing Core (Switch Stem) */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <img src={logo} alt="HMSOFT GEAR" onError={(e) => e.target.style.display='none'} />
          HMSOFT GEAR
        </div>
        
        <nav className="nav-links">
          <a href="#">Keyboards</a>
          <a href="#">Switches</a>
          <a href="#">Keycaps</a>
          <a href="#">Accessories</a>
        </nav>
        
        <div className="nav-icons">
          <button><Search size={22} /></button>
          <button><User size={22} /></button>
          <button><ShoppingCart size={22} /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Cyberpunk Keyboard" />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.span 
          className="hero-kicker"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          PROJECT: NEON
        </motion.span>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ABSOLUTE<br/>PRECISION
        </motion.h1>
        <motion.p 
          className="hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Engineered for esports professionals. Aerospace-grade aluminum, custom linear switches, and sub-millisecond latency. Dominate the server.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn-cyber">PRE-ORDER NOW</button>
        </motion.div>
      </div>
    </section>
  );
}

function Showcase3D() {
  return (
    <section className="showcase-3d">
      <div className="showcase-text">
        <h2>QUANTUM SWITCH</h2>
        <p>ACTUATION: 1.0MM // FORCE: 45G</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#0a0a0e']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#00ffcc" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#39ff14" />
        
        <PresentationControls global rotation={[0, 0, 0]} polar={[-0.5, 0.5]} azimuth={[-Math.PI, Math.PI]} config={{ mass: 1, tension: 170, friction: 26 }}>
          <CyberCore />
        </PresentationControls>
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} intensity={2} />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
    </section>
  );
}

function Products() {
  const products = [
    {
      type: "BAREBONE KIT",
      name: "NEON 65% ALUMINUM",
      price: "$249.00",
      img: prod1
    },
    {
      type: "LINEAR SWITCHES",
      name: "QUANTUM V2 (90 PCS)",
      price: "$59.00",
      img: prod1
    },
    {
      type: "KEYCAP SET",
      name: "PBT CYBERPUNK PROFILE",
      price: "$89.00",
      img: prod1
    }
  ];

  return (
    <section className="products">
      <div className="section-header">
        <h2 className="section-title">ARSENAL</h2>
        <button className="btn-cyber green">VIEW ALL GEAR</button>
      </div>
      
      <div className="product-grid">
        {products.map((item, idx) => (
          <motion.div 
            className="product-card" 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <img src={item.img} alt={item.name} className="product-img" />
            <div className="product-meta">
              <span className="product-type">{item.type}</span>
              <span className="product-price">{item.price}</span>
            </div>
            <h3 className="product-name">{item.name}</h3>
            <div className="product-actions">
              <button className="btn-cyber" style={{ width: '100%' }}>ADD TO LOADOUT</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase3D />
        <Products />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h2>HMSOFT GEAR</h2>
            <p>Forged in code. Built for victory. The ultimate hardware for the digital frontier.</p>
          </div>
          <div className="footer-links">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">Downloads</a></li>
              <li><a href="#">Firmware</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>COMMUNITY</h4>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Reddit</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>LEGAL</h4>
            <ul>
              <li><a href="#">Terms of Sale</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 HMSOFT Gaming Gear. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
