export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  category: string;
  requirements: string[];
  opportunities: string[];
  image: string;
  price: string;
}

export const courses: Course[] = [
  {
    id: "broadcast-journalism",
    title: "Broadcast Journalism",
    description: "Master the art of storytelling for TV, radio, and digital platforms.",
    longDescription: "This comprehensive course covers everything from news gathering and scriptwriting to on-camera presentation and digital reporting. Students will gain hands-on experience in our state-of-the-art studio and learn from industry professionals.",
    duration: "12 Months",
    category: "Media",
    requirements: [
      "WASSCE / SSCE Certificate",
      "Good command of English",
      "Passion for storytelling"
    ],
    opportunities: [
      "News Reporter",
      "TV/Radio Presenter",
      "Content Producer",
      "Digital Journalist"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,500.00"
  },
  {
    id: "sound-engineering",
    title: "Sound Engineering",
    description: "Learn the technical aspects of sound recording, mixing, and mastering.",
    longDescription: "Dive deep into the world of audio production. This course covers acoustics, signal processing, microphone techniques, and advanced mixing and mastering using industry-standard software and hardware.",
    duration: "6 Months",
    category: "Media",
    requirements: [
      "Basic computer literacy",
      "A keen ear for sound",
      "Interest in music or audio production"
    ],
    opportunities: [
      "Studio Engineer",
      "Live Sound Technician",
      "Foley Artist",
      "Music Producer"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,500.00"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Grow brands using social media, SEO, and data-driven strategies.",
    longDescription: "In the digital age, marketing is essential. Learn how to create compelling campaigns, manage social media presence, optimize for search engines, and analyze data to drive growth and ROI.",
    duration: "3 Months",
    category: "IT",
    requirements: [
      "Basic computer literacy",
      "Analytical mindset",
      "Interest in business growth"
    ],
    opportunities: [
      "Digital Marketing Manager",
      "Social Media Strategist",
      "SEO Specialist",
      "Content Marketer"
    ],
    image: "/images/3.jpeg",
    price: "GHS 1,500.00"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Transform ideas into stunning visuals using industry-standard tools.",
    longDescription: "Master the principles of design, typography, and color theory. Learn to use Adobe Creative Suite (Photoshop, Illustrator, InDesign) to create professional logos, branding materials, and digital assets.",
    duration: "4 Months",
    category: "Design",
    requirements: [
      "Creativity and eye for detail",
      "Basic computer skills",
      "Passion for visual arts"
    ],
    opportunities: [
      "Brand Designer",
      "UI/UX Designer Apprentice",
      "Creative Director",
      "Freelance Designer"
    ],
    image: "/images/3.jpeg",
    price: "GHS 1,800.00"
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Build modern, responsive websites and web applications from scratch.",
    longDescription: "From HTML and CSS to JavaScript and React, this course takes you on a journey to becoming a full-stack developer. Learn to create interactive, high-performance websites that work on any device.",
    duration: "6 Months",
    category: "IT",
    requirements: [
      "Logical thinking",
      "Patience and problem-solving skills",
      "Interest in coding"
    ],
    opportunities: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Engineer",
      "Web Architect"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,500.00"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Create compelling videos with professional editing and motion graphics.",
    longDescription: "Learn the art of post-production. Master Adobe Premiere Pro and After Effects to edit footage, add special effects, create motion graphics, and deliver high-quality video content for various platforms.",
    duration: "4 Months",
    category: "Media",
    requirements: [
      "A good computer",
      "Creativity",
      "Eye for pacing and timing"
    ],
    opportunities: [
      "Professional Video Editor",
      "Motion Graphics Artist",
      "Colorist",
      "Post-production Supervisor"
    ],
    image: "/images/3.jpeg",
    price: "GHS 1,800.00"
  },
  {
    id: "fashion-designing",
    title: "Fashion Designing",
    description: "Learn the fundamentals of fashion design, pattern making, and garment construction.",
    longDescription: "Master the art of fashion creation. From conceptual sketching and fabric selection to advanced sewing techniques, you will learn how to bring your creative clothing designs to life under the guidance of industry experts.",
    duration: "24 Months",
    category: "Fashion",
    requirements: [
      "Creativity and sense of style",
      "Passion for clothing design",
      "Basic sketching skills"
    ],
    opportunities: [
      "Fashion Designer",
      "Wardrobe Stylist",
      "Pattern Maker",
      "Fashion Illustrator"
    ],
    image: "/images/3.jpeg",
    price: "GHS 1,800.00"
  },
  {
    id: "film-and-tv-production",
    title: "Film and TV Production",
    description: "Master the entire production process of creating compelling films and television programming.",
    longDescription: "A comprehensive journey through directing, producing, cinematography, and screenwriting. Learn how to transform a script into a broadcast-ready production with hands-on practice on real sets.",
    duration: "6 Months",
    category: "Media",
    requirements: [
      "Passion for storytelling",
      "Ability to work in a team",
      "Creative vision"
    ],
    opportunities: [
      "Film Director",
      "TV Producer",
      "Cinematographer",
      "Screenwriter"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,500.00"
  }
];
