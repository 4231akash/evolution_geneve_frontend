import { notFound } from "next/navigation";
import ClientDetail from "./ClientDetail";
import { watchVariants } from "../watchVariants";

export default async function CollectionSlugPage({ params }) {
  // Await params
  const { slug } = await params;  
  const variant = watchVariants.find((w) => w.id === slug);

  if (!variant) {
    // Return Next.js 404 page
    notFound();
  }

  return <ClientDetail initialVariant={variant} variants={watchVariants} />;
}
