"use client";

import LuminousGrid from "@/components/Layout/LuminousGrid";
import AboutTitle from "./components/AboutTitle";
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import AboutBottom from "./components/AboutBottom";
import OurLeaders from "./components/OurLeaders";

export default function AboutPage() {
  return (
    <>
      <LuminousGrid />
      <AboutTitle />
      <TopSection />
      <BottomSection />
      <AboutBottom />
      <OurLeaders />
    </>
  );
}
