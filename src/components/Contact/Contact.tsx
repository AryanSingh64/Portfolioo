"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

// 4-pointed Star-Neu flare icon
function FlareStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 50,0 Q 50,50 100,50 Q 50,50 50,100 Q 50,50 0,50 Q 50,50 50,0 Z" />
    </svg>
  );
}

// Delicate dangling charm (thread + heart ornament from user image)
function DanglingCharm({ left, height = 32 }: { left: string; height?: number }) {
  return (
    <span className={styles.dangle} style={{ left }}>
      <span className={styles.dangleThread} style={{ height }} />
      <span className={styles.dangleHeart}>♥</span>
    </span>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.0012);

    const width = section.clientWidth || window.innerWidth;
    const height = section.clientHeight || window.innerHeight;

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

    // 2. Cinematic Lighting for Cloud Billows
    const ambientLight = new THREE.AmbientLight(0x7c8ba1, 1.3);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffffff, 2.2);
    moonLight.position.set(200, 350, 500);
    scene.add(moonLight);

    const rimLight = new THREE.PointLight(0xa5b4fc, 2.2, 1800);
    rimLight.position.set(0, -150, 350);
    scene.add(rimLight);

    // 3. Cloud Clusters
    const leftCluster = new THREE.Group();
    const rightCluster = new THREE.Group();
    const topCluster = new THREE.Group();
    scene.add(leftCluster);
    scene.add(rightCluster);
    scene.add(topCluster);

    const clouds: Array<{ mesh: THREE.Mesh; rotSpeed: number }> = [];

    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(
      "/cloud_puff.png",
      () => {
        if (!isDisposed) renderer.render(scene, camera);
      },
      undefined,
      () => {
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
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

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
        const scale = THREE.MathUtils.randFloat(0.85, 1.55);
        mesh.scale.set(scale, scale, 1);

        group.add(mesh);
        clouds.push({
          mesh,
          rotSpeed: (Math.random() - 0.5) * 0.0012,
        });
      }
    };

    // Left Flank Clouds
    spawnClouds(leftCluster, 12, [-700, -250], [-350, 300], [100, 800]);
    // Right Flank Clouds
    spawnClouds(rightCluster, 12, [250, 700], [-350, 300], [100, 800]);
    // Top Atmospheric Clouds
    spawnClouds(topCluster, 10, [-400, 400], [150, 450], [150, 700]);

    // 4. Ambient Drifting Loop
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      clouds.forEach(({ mesh, rotSpeed }) => {
        mesh.rotation.z += rotSpeed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // 5. GSAP ScrollTrigger Scrubbed into Contact Section
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // As you scroll from Projects into Contact:
      // Clouds roll inward as section approaches, then frame the calligraphy
      tl.fromTo(
        leftCluster.position,
        { x: -350, y: 150, z: -100 },
        { x: -80, y: 0, z: 120, duration: 0.5, ease: "power1.out" }
      )
        .fromTo(
          rightCluster.position,
          { x: 350, y: 150, z: -100 },
          { x: 80, y: 0, z: 120, duration: 0.5, ease: "power1.out" },
          "<"
        )
        .fromTo(
          topCluster.position,
          { y: 350, z: -50 },
          { y: 50, z: 100, duration: 0.5, ease: "power1.out" },
          "<"
        )
        .fromTo(
          camera.position,
          { z: 1100 },
          { z: 800, duration: 0.5, ease: "power1.out" },
          "<"
        );

      // As you scroll deeper and through Contact:
      // Clouds part gently to the sides, creating a clear cinematic atmosphere
      tl.to(leftCluster.position, {
        x: -550,
        y: -150,
        z: 200,
        duration: 0.5,
        ease: "power2.inOut",
      })
        .to(
          rightCluster.position,
          {
            x: 550,
            y: -150,
            z: 200,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          topCluster.position,
          {
            y: -250,
            z: 250,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          camera.position,
          {
            z: 600,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        );
    }, section);

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!section || !renderer) return;
      const w = section.clientWidth || window.innerWidth;
      const h = section.clientHeight || window.innerHeight;
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
    <section id="contact" className={styles.contact} ref={sectionRef}>
      {/* 1. Three.js Volumetric Cloud Canvas Background */}
      <canvas className={styles.cloudCanvasBg} ref={canvasRef} />

      {/* 2. Subtle Monochrome Ambient Glow */}
      <div className={styles.monoGlow} />

      {/* 3. Main Center Content Container */}
      <div className={styles.container}>
        <div className={styles.badgeRow}>
          <FlareStar className={styles.badgeStar} />
          <span className={styles.badge}>GET IN TOUCH</span>
          <FlareStar className={styles.badgeStar} />
        </div>

        {/* Ornate Calligraphy Script with Hanging Charms */}
        <a
          href="mailto:aryansingh7598@gmail.com"
          className={styles.contactLink}
          aria-label="Send email to Aryan Pratap Singh"
        >
          <div className={styles.scriptHeading}>
            {/* Word: Contact */}
            <span className={styles.scriptWord}>
              <span className={styles.charContainer}>
                C
                <DanglingCharm left="45%" height={34} />
              </span>
              <span className={styles.charContainer}>o</span>
              <span className={styles.charContainer}>n</span>
              <span className={styles.charContainer}>
                t
                <DanglingCharm left="40%" height={28} />
              </span>
              <span className={styles.charContainer}>a</span>
              <span className={styles.charContainer}>c</span>
              <span className={styles.charContainer}>t</span>
            </span>

            {/* Word: Me */}
            <span className={styles.scriptWord}>
              <span className={styles.charContainer}>
                M
                <DanglingCharm left="48%" height={36} />
              </span>
              <span className={styles.charContainer}>e</span>
            </span>
          </div>
        </a>

        {/* Direct Email & Phone from Resume */}
        <div className={styles.directContactRow}>
          <a href="mailto:aryansingh7598@gmail.com" className={styles.directPill}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.pillIcon}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            aryansingh7598@gmail.com
          </a>
          <a href="tel:+917007839057" className={styles.directPill}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.pillIcon}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 7007839057
          </a>
        </div>

        <p className={styles.tagline}>
          Software Engineer specializing in Full-Stack Web Platforms, Asynchronous Backends, and Generative AI Systems. B.Tech IT at PSIT Kanpur (Class of 2027).
        </p>

        {/* Action Buttons: Download Resume */}
        <div className={styles.actionRow}>
          <a
            href="/Aryan_Resum-SDE.pdf"
            target="_blank"
            rel="noreferrer"
            download="Aryan_Pratap_Singh_Resume.pdf"
            className={styles.resumeDownloadBtn}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.pillIcon}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume (PDF)
          </a>
        </div>

        {/* Social Links from Resume */}
        <div className={styles.socials}>
          <a
            href="https://github.com/AryanSingh64"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <span className={styles.sep}>/</span>
          <a
            href="https://linkedin.com/in/aryan64"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
          <span className={styles.sep}>/</span>
          <a
            href="https://aryans-portfolio-pi.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            Portfolio Vercel
          </a>
        </div>
      </div>

      {/* 4. Black & White Wave at the Bottom with Shiny Stars */}
      <div className={styles.bottomWaveWrapper}>
        <svg
          viewBox="0 0 1440 240"
          className={styles.bottomWaveSvg}
          preserveAspectRatio="none"
        >
          {/* Subtle back wave fill */}
          <path
            d="M 0,140 C 360,80 720,200 1080,120 C 1260,80 1380,150 1440,130 L 1440,240 L 0,240 Z"
            fill="rgba(255, 255, 255, 0.03)"
          />

          {/* Solid deep black wave foundation */}
          <path
            d="M 0,110 C 320,180 640,40 960,135 C 1200,195 1360,95 1440,115 L 1440,240 L 0,240 Z"
            fill="#000000"
          />

          {/* Crisp, shining white wave crest line */}
          <path
            d="M 0,110 C 320,180 640,40 960,135 C 1200,195 1360,95 1440,115"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            className={styles.whiteCrestLine}
          />
        </svg>

        {/* Shiny Diamond Stars glistening across the bottom wave */}
        <div className={styles.shinyStarsLayer}>
          <FlareStar className={`${styles.shinyStar} ${styles.starPos1}`} />
          <FlareStar className={`${styles.shinyStar} ${styles.starPos2}`} />
          <FlareStar className={`${styles.shinyStar} ${styles.starPos3}`} />
          <FlareStar className={`${styles.shinyStar} ${styles.starPos4}`} />
          <FlareStar className={`${styles.shinyStar} ${styles.starPos5}`} />
          <FlareStar className={`${styles.shinyStar} ${styles.starPos6}`} />
        </div>
      </div>
    </section>
  );
}
