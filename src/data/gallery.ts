export type GalleryCategory =
  | "Campus Life"
  | "Studios & Labs"
  | "Events";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  description?: string;
  /** Tailwind row-span class used to create a masonry-style layout */
  span?: "short" | "tall" | "wide";
}

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Campus Life",
  "Studios & Labs",
  "Events",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "broadcast-studio",
    title: "Live Radio & Broadcast Studio Session",
    category: "Studios & Labs",
    image: "/images/gallery/WhatsApp Image 2026-09-30 at 1.54.25 AM.jpeg",
    description:
      "Hands-on broadcasting practice at the radio console with microphones, production cameras, and live on-air hosting.",
    span: "wide",
  },
  {
    id: "faculty-mentorship",
    title: "Academic Mentorship & Leadership",
    category: "Campus Life",
    image: "/images/gallery/WhatsApp Image 2026-09-30 at 1.46.49 AM.jpeg",
    description:
      "KM Media students receiving personal mentorship from senior faculty members dedicated to cultivating media talent.",
    span: "tall",
  },
  {
    id: "campus-camaraderie",
    title: "Student Camaraderie & Campus Life",
    category: "Campus Life",
    image: "/images/gallery/cc.jpeg",
    description:
      "Passionate media students enjoying campus life and peer collaboration between practical lecture sessions.",
    span: "wide",
  },
  {
    id: "public-safety-outreach",
    title: "Public Engagement & Safety Outreach",
    category: "Events",
    image: "/images/gallery/WhatsApp Image 2026-09-30 at 1.46.53 AM.jpeg",
    description:
      "KM Media students collaborating with law enforcement and public service officers during community awareness initiatives.",
    span: "wide",
  },
  {
    id: "cultural-heritage-visit",
    title: "Community Leadership & Cultural Heritage",
    category: "Events",
    image: "/images/gallery/WhatsApp Image 2026-09-30 at 1.46.50 AM.jpeg",
    description:
      "Engaging with respected community leaders and traditional dignitaries on campus.",
    span: "tall",
  },
  {
    id: "campus-coordination",
    title: "Professional Development & Networking",
    category: "Campus Life",
    image: "/images/gallery/WhatsApp Image 2026-09-30 at 1.46.52 AM.jpeg",
    description:
      "Connecting students with industry professionals and institutional partners right on campus.",
    span: "tall",
  },
];

