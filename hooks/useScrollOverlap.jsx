// "use client";
// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function useScrollOverlap() {
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const sections = gsap.utils.toArray("section");

//       sections.forEach((section, i) => {
//         if (i === sections.length - 1) return;

//         const next = sections[i + 1];

//         // spacing below current section (dynamic for mobile)
//         const spacing = Math.min(window.innerHeight * 0.3, 200); // max 200px
//         gsap.set(next, { marginTop: spacing });

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             end: () => `+=${window.innerHeight + spacing}`, // dynamic end distance
//             pin: true,
//             pinSpacing: false,
//             scrub: Math.max(0.02, window.innerHeight / 1200), // adapt scrub speed
//             anticipatePin: 1,
//             fastScrollEnd: true,
//             invalidateOnRefresh: true,
//           },
//         });

//         tl.to(section, {
//           opacity: 1,
//           duration: 2.5,
//           ease: "power2.out",
//         });
//       });

//       // Parallax effect (dynamic based on section height)
//       gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
//         const parentHeight = bg.closest("section").offsetHeight;
//         gsap.to(bg, {
//           yPercent: 20,
//           ease: "none",
//           scrollTrigger: {
//             trigger: bg.closest("section"),
//             start: "top bottom",
//             end: "bottom top",
//             scrub: Math.max(0.5, window.innerHeight / 1200), // slower scrub on mobile
//             invalidateOnRefresh: true,
//           },
//         });
//       });

//       ScrollTrigger.refresh();
//     });

//     return () => ctx.revert();
//   }, []);
// }






// "use client";
// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function useScrollOverlap() {
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const sections = gsap.utils.toArray("section");

//       sections.forEach((section, i) => {
//         if (i === sections.length - 1) return;

//         const next = sections[i + 1];
//         const spacing = Math.min(window.innerHeight * 0.3, 200);
//         gsap.set(next, { marginTop: spacing });

//         // smoother scrub: use a fixed value for consistency
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             end: () => `+=${window.innerHeight + spacing}`,
//             pin: true,
//             pinSpacing: false,
//             scrub: 0.5, // smoother fixed scrub
//             anticipatePin: 1,
//             fastScrollEnd: true,
//             invalidateOnRefresh: true,
//           },
//         });

//         tl.to(section, {
//           opacity: 1,
//           duration: 1.5, // shorter duration to prevent stutter
//           ease: "power2.out",
//         });
//       });

//       // Parallax effect
//       gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
//         const parentHeight = bg.closest("section").offsetHeight;
//         gsap.to(bg, {
//           yPercent: 20,
//           ease: "none",
//           scrollTrigger: {
//             trigger: bg.closest("section"),
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 0.5, // fixed scrub for smoother effect
//             invalidateOnRefresh: true,
//           },
//         });
//       });
//     });

//     // refresh once after setup, avoid multiple refresh calls
//     ScrollTrigger.refresh();

//     return () => ctx.revert();
//   }, []);
// }



"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollOverlap() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("section");

      sections.forEach((section, i) => {
        if (i === sections.length - 1) return;

        const next = sections[i + 1];
        const spacing = Math.min(window.innerHeight * 0.3, 200);
        gsap.set(next, { marginTop: spacing });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight + spacing}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,

            // 👇 Snap to each section
            snap: {
              snapTo: 1,          // snap to the closest section
              duration: 0.8,      // how long the snap takes
              ease: "power2.inOut"
            }
          },
        }).to(section, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      // Parallax effect
      gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);
}
