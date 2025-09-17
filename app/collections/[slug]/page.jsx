// import { notFound } from "next/navigation";
// import ClientDetail from "./ClientDetail";
// import { watchVariants } from "../watchVariants";

// export default async function CollectionSlugPage({ params }) {
//   // Await params
//   const { slug } = await params;  
//   const variant = watchVariants.find((w) => w.id === slug);

//   if (!variant) {
//     // Return Next.js 404 page
//     notFound();
//   }

//   return <ClientDetail initialVariant={variant} variants={watchVariants} />;
// }

import { notFound } from "next/navigation";
import ClientDetail from "./ClientDetail";
import { watchVariants } from "../watchVariants";

// ✅ Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // <-- await here
  const variant = watchVariants.find((w) => w.id === slug);

  if (!variant) {
    return {
      title: "Evolution Geneve",
      description: "Luxury lifestyle, fashion & timeless elegance.",
    };
  }

  return {
    title: `${variant.name} | Evolution Geneve Luxury & Style`,
    description:
      variant.description ||
      "Discover exclusive designs by Evolution Geneve.",
  };
}

export default async function CollectionSlugPage({ params }) {
  const { slug } = await params; // <-- also await here
  const variant = watchVariants.find((w) => w.id === slug);

  if (!variant) {
    notFound();
  }

  return <ClientDetail initialVariant={variant} variants={watchVariants} />;
}
