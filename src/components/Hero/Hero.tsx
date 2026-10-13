"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

// Three images from public/abs/ - one per sliding box
const BOX_IMAGES = [
  { src: "/abs/image.png",         alt: "Abstract thorn sculpture" },
  { src: "/abs/image copy.png",    alt: "Abstract liquid chrome"   },
  { src: "/abs/image copy 2.png",  alt: "Abstract gloss form"      },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const box1Ref    = useRef<HTMLDivElement>(null);
  const box2Ref    = useRef<HTMLDivElement>(null);
  const box3Ref    = useRef<HTMLDivElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const roleRef    = useRef<HTMLParagraphElement>(null);
  const navRef     = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const boxes = [box1Ref.current, box2Ref.current, box3Ref.current];

    const ctx = gsap.context(() => {

      /* ── ENTRANCE: name + role ── */
      gsap.fromTo(nameRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(roleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.5 }
      );

      /* ── ENTRANCE: nav links slide in from right ── */
      const navLinks = navRef.current
        ? navRef.current.querySelectorAll("a")
        : null;
      if (navLinks) {
        gsap.fromTo(
          navLinks,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out", stagger: 0.12, delay: 0.4 }
        );
      }

      /* ── BOXES: start off-screen left ── */
      gsap.set(boxes, { x: "-110vw" });

      /* ── SCROLL-DRIVEN: pin hero, scrub boxes left → right ── */
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      tl.to(box1Ref.current, { x: 0 }, 0)
        .to(box2Ref.current, { x: 0 }, 0.25)
        .to(box3Ref.current, { x: 0 }, 0.5);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1.4,
        animation: tl,
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className={styles.hero} ref={sectionRef}>

      {/* Right-side nav */}
      <nav className={styles.nav} ref={navRef}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href="/Aryan_Resum-SDE.pdf" target="_blank" rel="noreferrer" className={styles.resumeNavBtn}>Resume</a>
      </nav>

      {/* Center: name + role */}
      <div className={styles.center}>
        <h1 className={styles.name} ref={nameRef}>ARYAN</h1>
        <p className={styles.role} ref={roleRef}>Software Engineer &bull; Full-Stack, Backend &amp; GenAI</p>
      </div>

      {/* Scroll-driven boxes with real images */}
      <div className={styles.boxesTrack}>
        {BOX_IMAGES.map((img, i) => {
          const ref = [box1Ref, box2Ref, box3Ref][i];
          return (
            <div key={i} className={styles.box} ref={ref}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 40vw, 22vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          );
        })}
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <div className={styles.scrollLine} />
        <div className={styles.scrollDot} />
      </div>

    </section>
  );
}
