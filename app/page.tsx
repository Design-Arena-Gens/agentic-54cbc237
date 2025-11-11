"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateEcoVibePptx } from "../lib/ppt";

const slides = [
  {
    title: "Eco Vibe Bottles",
    subtitle: "Smart, Self?Cleaning, Sustainable Hydration",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Business Plan 2025", "Inspired by LARQ's UV?C innovation", "Premium design ? Sustainable impact"],
  },
  {
    title: "The Problem",
    subtitle: "Hydration is inconvenient, unhygienic, and wasteful",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "3 in 5 users distrust tap water on?the?go",
      "Reusable bottles require frequent, tedious cleaning",
      "Single?use plastics create massive environmental harm",
    ],
  },
  {
    title: "Our Solution",
    subtitle: "Eco Vibe: self?cleaning bottle with UV?C purification",
    image: "https://images.unsplash.com/photo-1621961458348-f013d2bcaf45?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Neutralizes bio?contaminants in 60 seconds",
      "Double?wall insulation keeps drinks cold 24h / hot 12h",
      "Odor removal auto?clean cycle every 2 hours",
    ],
  },
  {
    title: "How It Works (inspired by LARQ)",
    subtitle: "UV?C LED in cap + reflective geometry",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Ultraviolet_c.svg",
    bullets: [
      "UV?C (275?285nm) disrupts DNA/RNA of microbes",
      "Food?grade stainless steel with mirror finish aids exposure",
      "Smart sensor prevents UV exposure when cap is off",
    ],
  },
  {
    title: "Product Line",
    subtitle: "Core ? Pro ? Kids ? Filter Cap",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Core: 500ml/740ml premium, everyday finish",
      "Pro: quick?charge, app?connected usage analytics",
      "Optional filter cap for taste/particulates (non?UV)",
    ],
  },
  {
    title: "Market Opportunity",
    subtitle: "TAM $12B ? SAM $4B ? SOM $250M",
    image: "https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "D2C health & wellness growth >10% CAGR",
      "Premium hydration and smart devices converging",
      "Corporate gifting & outdoor segments expanding",
    ],
  },
  {
    title: "Business Model",
    subtitle: "Hardware margin + accessories + B2B",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "ASP: $99 Core / $149 Pro; GM target 58%",
      "Accessories: sleeves, caps, filters, lid packs",
      "B2B: co?branding and corporate bulk sales",
    ],
  },
  {
    title: "Go?to?Market",
    subtitle: "D2C first, partners second",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Launch via pre?order, creator marketing, PR",
      "Retail pilots: REI, MoMA Design Store, premium gyms",
      "Campus & corporate ambassadors drive word?of?mouth",
    ],
  },
  {
    title: "Competitive Landscape",
    subtitle: "Positioned vs. LARQ, Hydro Flask, Brita",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "UV?C parity with LARQ; improved cap ergonomics",
      "Better accessory ecosystem and B2B customization",
      "Sustainability reporting dashboard for enterprises",
    ],
  },
  {
    title: "SWOT",
    subtitle: "Leverage strengths ? Mitigate risks",
    image: "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd18?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Strength: premium brand, smart features, sustainability",
      "Weakness: electronics add cost and support risk",
      "Threat: fast followers and supply?chain shocks",
    ],
  },
  {
    title: "Financial Outlook (3?Year)",
    subtitle: "Revenue $0 ? $28M; GM 58% ? 62%",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Year 1: $3.2M (pre?order + early retail)",
      "Year 2: $12.4M (retail scale, B2B)",
      "Year 3: $28M (intl expansion, accessories)",
    ],
  },
  {
    title: "Roadmap",
    subtitle: "Design ? Pilot ? Launch ? Scale",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Pilot 500 units with QA and field data",
      "V1 firmware OTA; 18?month accessory cadence",
      "Sustainability LCA published by Q3",
    ],
  },
  {
    title: "Team",
    subtitle: "Hardware ? Brand ? Supply Chain ? Ops",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Consumer hardware & D2C experience",
      "Industrial design + reliability engineering",
      "Sourcing in Taiwan/China; EU/US logistics",
    ],
  },
  {
    title: "Sustainability Impact",
    subtitle: "Reduce single?use plastic and odors",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Target: 50M bottles averted by Year 3",
      "Recycled materials + carbon?aware freight",
      "Repair program and end?of?life takeback",
    ],
  },
  {
    title: "The Ask",
    subtitle: "$3.5M seed for 18 months runway",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Team expansion, tooling, first PO",
      "Regulatory, QA, and retail launch",
      "Working capital and accessory R&D",
    ],
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  const go = (delta: number) => setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta)));

  const variants = useMemo(
    () => ({
      enter: { opacity: 0, y: 12 },
      center: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
    }),
    []
  );

  return (
    <div className="container">
      <div className="header">
        <h1 style={{ margin: 0 }}>Eco Vibe Bottles ? Business Plan</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => generateEcoVibePptx()}>Download PowerPoint (.pptx)</button>
          <button className="btn" onClick={() => go(-1)} disabled={!canPrev} style={{ opacity: canPrev ? 1 : 0.5 }}>Prev</button>
          <button className="btn" onClick={() => go(1)} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.5 }}>Next</button>
        </div>
      </div>

      <div className="hero">
        <div className="card">
          <AnimatePresence mode="wait">
            <motion.div key={index} initial="enter" animate="center" exit="exit" variants={variants} transition={{ duration: 0.35 }}>
              <div className="slide">
                <div>
                  <h2>{current.title}</h2>
                  <p className="small">{current.subtitle}</p>
                  <ul>
                    {current.bullets.map((b, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}>{b}</motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Image src={current.image} alt="slide" width={800} height={600} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>About LARQ</h3>
          <p className="small">LARQ popularized self?cleaning bottles using UV?C LEDs. Eco Vibe adopts a similar scientific approach with emphasis on ergonomics, accessory ecosystem, and sustainability reporting for enterprises.</p>
          <div className="grid-3">
            <Image src="https://images.unsplash.com/photo-1526404079164-3ae3ee5726eb?q=80&w=1200&auto=format&fit=crop" alt="bottle" width={400} height={280} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10 }} />
            <Image src="https://cdn.pixabay.com/photo/2016/11/29/12/54/ultraviolet-1867422_1280.jpg" alt="uv" width={400} height={280} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10 }} />
            <Image src="https://picsum.photos/seed/eco3d/800/600" alt="3d" width={400} height={280} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10 }} />
          </div>
        </div>
      </div>

      <div className="footer">? {new Date().getFullYear()} Eco Vibe Bottles. Professional deck with downloadable PPTX.</div>
    </div>
  );
}
