"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface Milestone {
  id: number;
  number: string;
  label: string;
  tag: string;
  period: string;
  title: string;
  note: string;
  iconType: string;
  anchorX: number; // coordinate on the road (0-100)
  anchorY: number; // coordinate on the road (0-100)
  badgeY: number;  // vertical position of badge (0-100)
  align: "up" | "down";
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    number: "01",
    label: "Education",
    tag: "PSIT KANPUR",
    period: "2023 - 2027",
    title: "B.Tech in Information Technology",
    note: "Pranveer Singh Institute of Technology. Rigorous foundations in computer science, software engineering, databases, and network architecture.",
    iconType: "spark",
    anchorX: 8,
    anchorY: 28,
    badgeY: 15,
    align: "up",
  },
  {
    id: 2,
    number: "02",
    label: "QA & Testing",
    tag: "AUTOMATION",
    period: "Test Engineering",
    title: "Playwright, Selenium & pytest",
    note: "Architecting automated E2E test suites with Playwright, regression testing, REST API validation, defect lifecycle tracking, and boundary value analysis.",
    iconType: "code",
    anchorX: 24,
    anchorY: 30,
    badgeY: 46,
    align: "down",
  },
  {
    id: 3,
    number: "03",
    label: "Algorithms",
    tag: "DSA 150+",
    period: "LeetCode & GFG",
    title: "Data Structures & Algorithms",
    note: "Solved 150+ competitive programming challenges across dynamic programming, graph algorithms, trees, and system optimization.",
    iconType: "system",
    anchorX: 18,
    anchorY: 65,
    badgeY: 82,
    align: "down",
  },
  {
    id: 4,
    number: "04",
    label: "Hackathons",
    tag: "TOP 5% NATIONWIDE",
    period: "Rift & IntrusionX",
    title: "National Hackathon Semifinalist",
    note: "National Semifinalist at Rift Hackathon 2026 (Physics Wallah, 700+ teams) with GitFixAI. Top 5% at IntrusionX Hackathon (GLA University, 17th of 354 teams).",
    iconType: "briefcase",
    anchorX: 42,
    anchorY: 72,
    badgeY: 55,
    align: "up",
  },
  {
    id: 5,
    number: "05",
    label: "Production",
    tag: "FULL-STACK & RAG",
    period: "Shipped Projects",
    title: "ThreadLine & Mi:RAG",
    note: "Engineered ThreadLine (real-time SSE communication) and Mi:RAG (production multimodal RAG with 6-module automated test pipeline & ChromaDB).",
    iconType: "layers",
    anchorX: 58,
    anchorY: 46,
    badgeY: 30,
    align: "up",
  },
  {
    id: 6,
    number: "06",
    label: "Agentic AI",
    tag: "DEEPLEARNING.AI",
    period: "Frontier Credentials",
    title: "Certified AI Specializations",
    note: "DeepLearning.AI certified in Retrieval Augmented Generation (RAG), Agentic AI Systems, and Generative AI for Software Development.",
    iconType: "rocket",
    anchorX: 80,
    anchorY: 48,
    badgeY: 32,
    align: "up",
  },
];

// SVG Curved Roadway Path
const ROAD_PATH =
  "M 60,280 Q 150,220 240,300 Q 200,480 180,650 Q 290,750 420,720 Q 500,580 580,460 Q 690,410 800,480 Q 880,400 950,330";

function MilestoneIcon({ type }: { type: string }) {
  switch (type) {
    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "system":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconSvg}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      );
    default:
      return <span>✦</span>;
  }
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);

  const closeModal = useCallback(() => {
    setActiveMilestone(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (activeMilestone) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeMilestone, closeModal]);

  useEffect(() => {
    const section = sectionRef.current;
    const roadmap = roadmapRef.current;
    if (!section || !roadmap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // Animate road center line
      const roadCenter = roadmap.querySelector<SVGPathElement>(".roadCenterLine");
      if (roadCenter) {
        const len = roadCenter.getTotalLength ? roadCenter.getTotalLength() : 1200;
        gsap.set(roadCenter, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(roadCenter, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      {/* 90-degree rotated landscape visual */}
      <div className={styles.imageWrapper} ref={imageRef}>
        <Image
          src="/image.png"
          alt="About visual landscape"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      {/* Seamless transition blends */}
      <div className={styles.topBlend} />
      <div className={styles.sideBlend} />
      <div className={styles.bottomBlend} />

      {/* Centered Section Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.badge}>SECTION 02</span>
        <h2 className={styles.title}>Roadmap &amp; Milestones</h2>
        <p className={styles.hint}>Click any milestone to explore</p>
      </div>

      {/* Interactive Infographic Roadmap Layer */}
      <div className={styles.roadmapLayer} ref={roadmapRef}>
        {/* SVG Curved Road Ribbon & Connector Pins */}
        <svg
          className={styles.svgOverlay}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* 1. Road Outer Shadow & Base */}
          <path
            d={ROAD_PATH}
            className={styles.roadOuterGlow}
          />
          <path
            d={ROAD_PATH}
            className={styles.roadSurface}
          />

          {/* 2. Road Animated Center Markings */}
          <path
            d={ROAD_PATH}
            className={`roadCenterLine ${styles.roadCenterLine}`}
          />

          {/* 3. Vertical Connector Stem Pins (Inspo Image 1 & 2) */}
          {MILESTONES.map((m) => {
            const x1 = m.anchorX * 10;
            const y1 = m.anchorY * 10;
            const x2 = m.anchorX * 10;
            const y2 = m.badgeY * 10;
            return (
              <g key={`pin-${m.id}`}>
                {/* Pin Stem Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={styles.pinStem}
                />
                {/* Anchor Dot on the road */}
                <circle
                  cx={x1}
                  cy={y1}
                  r="6"
                  className={styles.roadAnchorDot}
                />
              </g>
            );
          })}
        </svg>

        {/* Milestone Pin Badges & Cards (Alternating Up/Down) */}
        {MILESTONES.map((m) => {
          return (
            <button
              key={m.id}
              type="button"
              className={styles.milestonePin}
              style={{
                left: `${m.anchorX}%`,
                top: `${m.badgeY}%`,
              }}
              onClick={() => setActiveMilestone(m)}
              aria-label={`Milestone ${m.number}: ${m.title}`}
            >
              {/* Circular Icon Badge */}
              <div className={styles.pinBadge}>
                <MilestoneIcon type={m.iconType} />
                <span className={styles.badgeNumber}>{m.number}</span>
              </div>

              {/* Beside Card with Title & Era */}
              <div className={styles.pinCard}>
                <span className={styles.pinLabel}>{m.label}</span>
                <span className={styles.pinPeriod}>{m.period}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Popup Modal Window */}
      {activeMilestone && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTag}>{activeMilestone.tag}</span>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeModal}
                aria-label="Close modal"
              >
                ESC
              </button>
            </div>

            <div className={styles.modalBody}>
              <h3 className={styles.modalTitle}>{activeMilestone.title}</h3>
              <p className={styles.modalPeriod}>{activeMilestone.period}</p>
              <p className={styles.modalNote}>{activeMilestone.note}</p>

              {/* Minimal placeholder space for user content */}
              <div className={styles.contentPlaceholder}>
                <div className={styles.placeholderLine} />
                <div className={styles.placeholderLineShort} />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.dismissBtn}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
