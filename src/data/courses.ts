export interface Programme {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  category: string;
  certificate: string;
  requirements: string[];
  opportunities: string[];
  modules?: string[];
  image: string;
  price: string;
}

// Keep Course for backward compatibility during migration
export type Course = Programme;

export const programmes: Programme[] = [
  {
    id: "broadcast-journalism",
    title: "Broadcast Journalism",
    description: "Master the art of storytelling for TV, radio, and digital platforms.",
    longDescription: "This comprehensive course covers everything from news gathering and scriptwriting to on-camera presentation and digital reporting. Students will gain hands-on experience in our state-of-the-art studio and learn from industry professionals.",
    duration: "1 Year 6 Months",
    category: "Media",
    requirements: [
      "WASSCE / SSCE or any Certificate",
      "Good command of English",
      "Passion for storytelling",
      "Matured applicants (25+) should be able to read, write and understand"
    ],
    opportunities: [
      "News Reporter",
      "TV/Radio Presenter",
      "Content Producer",
      "Digital Journalist"
    ],
    modules: [
      "Radio & Television Broadcast Journalism (News, Sports & General Presentation)",
      "Disc Jockeying",
      "Basic Camera Handling, Video Editing & Graphic Designing",
      "Basic Sound Production (Voice Recording, Editing & Mixing)",
      "Media Marketing, PR and Communication"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,500.00",
    certificate: "Diploma"
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
      "Interest in music production"
    ],
    opportunities: [
      "Studio Engineer",
      "Music Producer",
      "Sound Designer",
      "Mix Engineer"
    ],
    modules: [
      "Console Operation, Engineering",
      "Beat Making & Vocal Recording",
      "MIDI Composition and Sequencing",
      "Voice Recording and Editing",
      "Mixing & Mastering"
    ],
    image: "/images/3.jpeg",
    price: "GHS 3,200.00",
    certificate: "Professional Certificate"
  },
  {
    id: "fashion-designing-dip",
    title: "Fashion Designing",
    description: "Learn the fundamentals of fashion design and garment construction.",
    longDescription: "Master the art of fashion creation. From conceptual sketching and fabric selection to advanced tailoring techniques, you will learn how to bring your creative designs to life.",
    duration: "2 Years 6 Months",
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
    modules: [
      "Garment Construction Techniques",
      "Tailoring",
      "Freehand Cutting",
      "Fashion Illustration",
      "Pattern Making",
      "Fashion Styling"
    ],
    image: "/images/4.jpg",
    price: "GHS 1,800.00",
    certificate: "Diploma"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Grow brands using social media, SEO, and data-driven strategies.",
    longDescription: "In the digital age, marketing is essential. Learn how to create compelling campaigns, manage social media presence, optimize for search engines, and analyze data to drive growth and ROI.",
    duration: "6 Months",
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
    modules: [
      "Social Media Management",
      "Search Engine Optimization (SEO)",
      "Content Marketing Strategy",
      "Email Marketing & Automation",
      "Digital Analytics & ROI",
      "Online Advertising (PPC)"
    ],
    image: "/images/3.jpeg",
    price: "GHS 1,650.00",
    certificate: "Professional Certificate"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Transform ideas into stunning visuals using industry-standard tools.",
    longDescription: "Master the principles of design, typography, and color theory. Learn to use Adobe Creative Suite (Photoshop, Illustrator, InDesign) to create professional logos, branding materials, and digital assets.",
    duration: "6 Months",
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
    modules: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "InDesign",
      "Typography & Color Theory",
      "Branding & Logo Design"
    ],
    image: "/images/3.jpeg",
    price: "GHS 2,300.00",
    certificate: "Professional Certificate"
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
    modules: [
      "HTML5 & Semantic Web",
      "CSS3 & Modern Layouts (Flexbox/Grid)",
      "JavaScript Fundamentals & ES6+",
      "React.js & Frontend Frameworks",
      "Database Management (SQL/NoSQL)",
      "Server-side Development with Node.js"
    ],
    image: "/images/5.jpg",
    price: "GHS 2,800.00",
    certificate: "Professional Certificate"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Create compelling videos with professional editing and motion graphics.",
    longDescription: "Learn the art of post-production. Master Adobe Premiere Pro and After Effects to edit footage, add special effects, create motion graphics, and deliver high-quality video content for various platforms.",
    duration: "6 Months",
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
    modules: [
      "Getting Started with Adobe Premiere Pro",
      "Advanced Cutting & Pacing Techniques",
      "Color Correction and Grading",
      "Audio Synchronization & Foley Integration",
      "Motion Graphics with After Effects",
      "Multi-camera Editing Workflow"
    ],
    image: "/images/3.jpeg",
    price: "GHS 3,200.00",
    certificate: "Professional Certificate"
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
    modules: [
      "Scriptwriting and Storyboarding",
      "Cinematography & Lighting Techniques",
      "Directing for Screen & Set Management",
      "Sound Design & Location Audio Recording",
      "Production Management & Budgeting",
      "Visual Effects and Cinematic Storytelling"
    ],
    image: "/images/3.jpeg",
    price: "GHS 3,500.00",
    certificate: "Professional Certificate"
  }
];

// Keep courses alias for backward compatibility
export const courses = programmes;
