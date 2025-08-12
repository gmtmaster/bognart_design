import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "gsap";
import Showcase from "@/app/components/Showcase";
import AboutMe from "@/app/components/AboutMe";
import Partners from "@/app/components/Partners";
import Footer from "@/app/components/Footer";
import PricingSection from "@/app/components/PricingSection";
import Cards from "@/app/components/Cards";
import FAQ from "@/app/components/FAQ";
import MoreOptions from "@/app/components/MoreOptions";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (

        <>
            <Navbar/>
            <Hero />
            <AboutMe />
          <Cards />
            <Showcase />
          <Partners />
          <PricingSection />
            <MoreOptions />
            <FAQ />
          <Footer />
        </>


  );
}
