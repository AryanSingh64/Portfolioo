"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CloudTransition.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function CloudTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.001);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Cinematic Lighting for Volumetric Highlights
    const ambientLight = new THREE.AmbientLight(0x7c8ba1, 1.2);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffffff, 2.5);
    moonLight.position.set(200, 400, 500);
    scene.add(moonLight);

    const rimLight = new THREE.PointLight(0xa5b4fc, 2.0, 2000);
    rimLight.position.set(0, -200, 300);
    scene.add(rimLight);

    // 3. Cloud Clusters
    const leftCluster = new THREE.Group();
    const rightCluster = new THREE.Group();
    const centerCluster = new THREE.Group();
    scene.add(leftCluster);
    scene.add(rightCluster);
    scene.add(centerCluster);

    const clouds: Array<{ mesh: THREE.Mesh; rotSpeed: number }> = [];

    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(
      "/cloud_puff.png",
      () => {
        if (!isDisposed) renderer.render(scene, camera);
      },
      undefined,
      () => {
        // Fallback to cloud10.png if cloud_puff has any issue
        textureLoader.load("/cloud10.png", (fallback) => {
          cloudMaterial.map = fallback;
          cloudMaterial.needsUpdate = true;
        });
      }
    );

    const cloudGeo = new THREE.PlaneGeometry(750, 750);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    // Helper to spawn clouds into groups
    const spawnClouds = (
      group: THREE.Group,
      count: number,
      xRange: [number, number],
      yRange: [number, number],
      zRange: [number, number]
    ) => {
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(cloudGeo, cloudMaterial.clone());
        mesh.position.set(
          THREE.MathUtils.randFloat(xRange[0], xRange[1]),
          THREE.MathUtils.randFloat(yRange[0], yRange[1]),
          THREE.MathUtils.randFloat(zRange[0], zRange[1])
        );
        mesh.rotation.z = Math.random() * Math.PI * 2;
        const scale = THREE.MathUtils.randFloat(0.9, 1.6);
        mesh.scale.set(scale, scale, 1);

        group.add(mesh);
        clouds.push({
          mesh,
          rotSpeed: (Math.random() - 0.5) * 0.0015,
        });
      }
    };

    // Left Bank
    spawnClouds(leftCluster, 14, [-650, -200], [-300, 300], [100, 800]);
    // Right Bank
    spawnClouds(rightCluster, 14, [200, 650], [-300, 300], [100, 800]);
    // Center Bottom Surge
    spawnClouds(centerCluster, 12, [-250, 250], [-400, 50], [200, 750]);

    // 4. Subtle Ambient Floating Loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      clouds.forEach(({ mesh, rotSpeed }) => {
        mesh.rotation.z += rotSpeed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // 5. GSAP ScrollTrigger Pinned Scrub
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1: Clouds billow in & converge, filling the viewport (0 -> 0.45)
      tl.fromTo(
        leftCluster.position,
        { x: -500, y: 150, z: 0 },
        { x: 120, y: 0, z: 150, duration: 0.45, ease: "power1.out" }
      )
        .fromTo(
          rightCluster.position,
          { x: 500, y: 150, z: 0 },
          { x: -120, y: 0, z: 150, duration: 0.45, ease: "power1.out" },
          "<"
        )
        .fromTo(
          centerCluster.position,
          { y: -350, z: 0 },
          { y: 80, z: 200, duration: 0.45, ease: "power1.out" },
          "<"
        )
        .fromTo(
          camera.position,
          { z: 1050 },
          { z: 750, duration: 0.45, ease: "power1.out" },
          "<"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "<0.1"
        );

      // Phase 2: Clouds part like curtains to the left and right, clearing into Contact (0.55 -> 1.0)
      tl.to(leftCluster.position, {
        x: -1100,
        y: -100,
        z: 300,
        duration: 0.55,
        ease: "power2.inOut",
      })
        .to(
          rightCluster.position,
          {
            x: 1100,
            y: -100,
            z: 300,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          centerCluster.position,
          {
            y: -600,
            z: 400,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          camera.position,
          {
            z: 450,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          textRef.current,
          {
            opacity: 0,
            y: -40,
            scale: 1.15,
            duration: 0.4,
            ease: "power2.in",
          },
          "<"
        );
    }, container);

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      renderer.dispose();
      cloudGeo.dispose();
      cloudMaterial.dispose();
      cloudTexture.dispose();
    };
  }, []);

  return (
    <section className={styles.cloudTransitionZone} ref={containerRef}>
      {/* Three.js Volumetric Cloud Canvas */}
      <canvas className={styles.cloudCanvas} ref={canvasRef} />

      {/* Atmospheric Horizon Marker */}
      <div className={styles.textOverlay} ref={textRef}>
        <span className={styles.badge}>STRATOSPHERE</span>
        <h3 className={styles.title}>Crossing the Clouds</h3>
        <p className={styles.hint}>Scroll to descend to contact</p>
      </div>
    </section>
  );
}
