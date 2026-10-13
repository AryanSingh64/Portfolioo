import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aryan Pratap Singh | Software Engineer, Full-Stack & Generative AI",
  description: "Portfolio of Aryan Pratap Singh, Software Engineer specializing in Python, TypeScript, FastAPI, Next.js 15, RAG pipelines, and Generative AI systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&family=Cinzel:wght@400;600;700&family=Pinyon+Script&family=Mea+Culpa&family=Monsieur+La+Doulaise&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
