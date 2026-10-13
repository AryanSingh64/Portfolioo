"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Projects.module.css";

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  url: string;
  githubUrl: string;
  isIframe: boolean;
  image?: string;
  description?: string;
  features?: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "mirag",
    name: "Mi-RAG",
    tagline: "Autonomous Offline RAG with 6-Module Automated Pytest Suite",
    url: "https://mirag.me/",
    githubUrl: "https://github.com/AryanSingh64/Mi-RAG",
    isIframe: true,
  },
  {
    id: "gitfixai",
    name: "GitFixAI",
    tagline: "Automated Code Patch Tool (Rift Hackathon Semifinalist, 700+ Teams)",
    url: "https://gitfixai.vercel.app/",
    githubUrl: "https://github.com/AryanSingh64/GItFIxAI",
    isIframe: true,
  },
  {
    id: "threadline",
    name: "ThreadLine",
    tagline: "Data Aggregation & SSE Platform with Playwright E2E Coverage",
    url: "https://thread-line-five.vercel.app/",
    githubUrl: "https://github.com/AryanSingh64/ThreadLine",
    isIframe: true,
  },
  {
    id: "aethereye",
    name: "AetherEye",
    tagline: "Hybrid-Edge Multi-Modal Surveillance System",
    url: "https://github.com/AetherEye/AetherEye",
    githubUrl: "https://github.com/AetherEye/AetherEye",
    isIframe: false,
    image: "https://raw.githubusercontent.com/AetherEye/AetherEye/main/look.jpg",
    description:
      "A next-generation hybrid-edge surveillance system built to cut latency and protect privacy. It splits sensing and inference across tiny edge devices (ESP32) and an on-premise server, delivering real-time, context-aware alerts for visual, audio, and environmental threats without sending sensitive data to the cloud.",
    features: [
      "Hybrid-Edge Architecture (ESP32 sensors + on-premise neural engine)",
      "Multi-Modal Sensor Fusion (Visual, Audio & MQ-2 environmental triggers)",
      "Dual-Purpose YOLO Inference (Urgent threats & safety compliance)",
      "Offline Voice Command Flow with local TTS feedback",
      "Bi-directional WebSocket real-time event streaming",
    ],
  },
  {
    id: "wordlens",
    name: "WordLens",
    tagline: "In-Context Reading Companion & Summarizer",
    url: "https://wordlens-prod.vercel.app/",
    githubUrl: "https://github.com/AryanSingh64/WordLens",
    isIframe: true,
  },
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string>("mirag");

  const currentProject =
    PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  return (
    <section id="projects" className={styles.projects}>
      {/* 1. Far Left: Rotated PROJECTS title strip */}
      <div className={styles.rotatedStrip}>
        <span className={styles.rotatedText}>PROJECTS</span>
      </div>

      {/* 2. Center-Left: Directory List */}
      <div className={styles.directoryColumn}>
        <div className={styles.directoryHeader}>
          <span className={styles.directoryBadge}>DIRECTORY</span>
          <span className={styles.directoryCount}>{PROJECTS.length} REPOS</span>
        </div>

        <nav className={styles.directoryList} aria-label="Projects directory">
          {PROJECTS.map((project) => {
            const isActive = project.id === currentProject.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedId(project.id)}
                className={`${styles.dirItem} ${
                  isActive ? styles.dirItemActive : ""
                }`}
                aria-selected={isActive}
              >
                <div className={styles.itemRow}>
                  <span className={styles.itemName}>{project.name}</span>
                  <span className={styles.activeDot} />
                </div>
                <div className={styles.underline} />
                <span className={styles.itemTagline}>{project.tagline}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Right: Full-Screen Live Webpage Viewport */}
      <div className={styles.webpageColumn}>
        {/* Browser Top Navigation Bar */}
        <div className={styles.webpageHeader}>
          <div className={styles.browserDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>

          <div className={styles.urlDisplay}>
            <span className={styles.liveIndicator}>
              {currentProject.isIframe ? "● LIVE" : "● GITHUB SYSTEM"}
            </span>
            <span className={styles.urlText}>{currentProject.url}</span>
          </div>

          <div className={styles.headerActions}>
            <a
              href={currentProject.url}
              target="_blank"
              rel="noreferrer"
              className={styles.actionBtn}
              title="Open full page in new tab"
            >
              Open Page ↗
            </a>
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.actionBtn}
              title="View on GitHub"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Viewport Content */}
        <div className={styles.iframeWrapper}>
          {currentProject.isIframe ? (
            <iframe
              key={currentProject.id}
              src={currentProject.url}
              title={`${currentProject.name} Live Webpage`}
              className={styles.iframe}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          ) : (
            /* Dedicated AetherEye Architecture & Hardware Screen */
            <div className={styles.showcaseView}>
              {currentProject.image && (
                <div className={styles.showcaseBanner}>
                  <Image
                    src={currentProject.image}
                    alt={currentProject.name}
                    fill
                    priority
                    sizes="60vw"
                    className={styles.showcaseImage}
                    unoptimized
                  />
                  <div className={styles.showcaseOverlay} />
                  <div className={styles.showcaseHeading}>
                    <span className={styles.showcaseBadge}>
                      HYBRID-EDGE SYSTEM
                    </span>
                    <h3 className={styles.showcaseTitle}>
                      {currentProject.name}
                    </h3>
                    <p className={styles.showcaseTagline}>
                      {currentProject.tagline}
                    </p>
                  </div>
                </div>
              )}

              <div className={styles.showcaseContent}>
                <h4 className={styles.sectionSubtitle}>SYSTEM OVERVIEW</h4>
                <p className={styles.showcaseDesc}>
                  {currentProject.description}
                </p>

                {currentProject.features && (
                  <div className={styles.featuresSection}>
                    <h4 className={styles.sectionSubtitle}>
                      KEY ARCHITECTURAL HIGHLIGHTS
                    </h4>
                    <div className={styles.featureGrid}>
                      {currentProject.features.map((feat, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <span className={styles.featureBullet}>✦</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.showcaseActions}>
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.githubBigBtn}
                  >
                    Explore AetherEye on GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
