// "use client";

// import { useEffect, useState } from "react";
// import Loader from "../components/Loader";
// import Header from "../components/Header";
// import HeroSection from "../sections/home/HeroSection";
// import TechnicalSpecsSection from "../sections/home/TechnicalSpecsSection";
// import SundialSection from "../sections/home/Sundial_section";
// import SandTimerSection from "../sections/home/SandTimerSection";
// import ManualWindingSection from "../sections/home/ManualWindingSection";
// import SelfWindingSection from "../sections/home/SelfWindingSection";
// import useScrollOverlap from "../hooks/useScrollOverlap";
// import useFullpageScroll from "../hooks/useFullPageScroll";
// import DownScroll from "../components/downScroll";

// export const metadata = {
//   title: "Evolution Geneve | Luxury Lifestyle, Fashion & Timeless Elegance",
//   description:
//     "Discover Evolution Geneve, where luxury meets elegance. Explore curated fashion, lifestyle, and timeless designs crafted for those who value sophistication and style.",
// };

// export default function Home() {
//   const [loaderDone, setLoaderDone] = useState(false);
//   const [bgDone, setBgDone] = useState(false);

//   // Preload hero background while loader plays (avoids circular mount dependency)
//   useEffect(() => {
//     const img = new Image();
//     img.src = "/images/banner_main.svg";

//     if (img.complete) {
//       setBgDone(true);
//       return;
//     }

//     img.onload = () => setBgDone(true);
//     img.onerror = (err) => {
//       console.warn("Hero background failed to load:", err);
//       setBgDone(true); // allow site to proceed even if bg fails
//     };
//   }, []);

//   const ready = loaderDone && bgDone;

//   return (
//     <>
//       {!ready && <Loader onFinish={() => setLoaderDone(true)} />}
//       {ready && (
//         <>
//           <Header />
//           <MainContent />
//         </>
//       )}
//     </>
//   );
// }

// function MainContent() {
//   useScrollOverlap();

//   return (
//     <main>
//       <HeroSection />
//       <TechnicalSpecsSection />
//       <SundialSection />
//       <SandTimerSection />
//       <ManualWindingSection />
//       <SelfWindingSection />

//       <DownScroll />
//     </main>
//   );
// }




export const metadata = {
  title: "Evolution Geneve | Luxury Lifestyle, Fashion & Timeless Elegance",
  description:
    "Discover Evolution Geneve, where luxury meets elegance. Explore curated fashion, lifestyle, and timeless designs crafted for those who value sophistication and style.",
};

import HomePage from "../components/HomePage";

export default function Page() {
  return <HomePage />;
}
