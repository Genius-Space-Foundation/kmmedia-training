export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "september-admission-2025/2026",
    title: "YOUR DREAM IN MEDIA STARTS THIS SEPTEMBER – AND WE'RE READY FOR YOU!",
    category: "Admissions",
    date: "September 02, 2026",
    image: "/images/september-admission.jpg",
    excerpt: "Have you always dreamed of being behind the camera, on radio, on TV, or creating content that the whole Ghana watches? Admission is now open for September.",
    content: `
      <p><strong>🎙️ YOUR DREAM IN MEDIA STARTS THIS SEPTEMBER – AND WE'RE READY FOR YOU!</strong></p>
      <p>Have you always dreamed of being behind the camera, on radio, on TV, or creating content that the whole Ghana watches?</p>
      <p>At <strong>KM MEDIA TRAINING INSTITUTE</strong>, we don't just teach media — we live it.</p>
      <p>Since 2018, we've been that Great institute in Accra, Sogakope and Akatsi where passion meets practice. No long boring theory. Just you, a camera in your hand, a mic in front of you, and real industry people guiding you every step.</p>
      
      <h3>This September, we are opening our doors again for YOU.</h3>
      <p>Whether you just completed SHS, you're 25+ and want to switch careers, or you've always loved media but never had the chance — there is a place for you here.</p>
      
      <h3>Come learn what you love:</h3>
      <p>If it's News, we have Journalism & Broadcast Journalism. If you love to talk, try Radio & TV Presenting. If you see stories in pictures, join Photography, Video Editing, or TV & Film Production. If you're the creative who loves design, sound, or social media — we have Graphic Design, Sound Engineering, Digital Marketing, Content Creation & Live Streaming, PR, and even Fashion Design. Computer literacy (I.C.T), Software engineering and Robotics for kids.</p>
      <p><strong>15+ courses. One goal: To make you job-ready.</strong></p>
      
      <h3>Why students love KM MEDIA:</h3>
      <p>Because we are accredited, yes. But more importantly, because we believe in you. We teach you with the same cameras and equipment used on real TV sets. Our lecturers are people you already hear on radio and see on TV. And when you're done, we don't leave you — we guide you to internships and jobs.</p>
      <p>We are in Accra, Sogakope and Akatsi, but our students come from everywhere because creativity has no location.</p>
      
      <div style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid #2563eb; padding: 1rem; margin: 2rem 0; border-radius: 0 0.5rem 0.5rem 0;">
        <p style="margin: 0;"><strong>September 2025/2026 Admission is OPEN. Slots are limited.</strong></p>
        <p style="margin: 0.5rem 0 0 0;">Don't wait for next year to chase that dream.</p>
      </div>
      
      <p><em>KM MEDIA TRAINING INSTITUTE – Creativity is our Hallmark. Empowering Media Professionals.</em></p>
      
      <div style="margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://wa.me/233555587754?text=I'm%20interested%20in%20the%20September%20admissions!" target="_blank" rel="noopener noreferrer" style="background: #25d366; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 0.5rem;">
          Chat on WhatsApp
        </a>
        <a href="/programmes" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 0.5rem;">
          View All Programmes
        </a>
      </div>
    `
  },
  {
    id: "robotics-lab",
    title: "New Robotics Lab Inaugurated for Tech Programmes",
    category: "Campus News",
    date: "October 15, 2024",
    image: "/images/3.jpeg",
    excerpt: "We are thrilled to announce the opening of our state-of-the-art robotics laboratory, providing hands-on experience for our new Robotics for Kids programme.",
    content: `
      <p>We are thrilled to announce the opening of our state-of-the-art robotics laboratory at KM Media Training Institute.</p>
      <p>This brand new facility will serve as the primary hands-on training ground for our recently launched "Robotics for Kids" programme, as well as providing advanced resources for our older Tech Programme students.</p>
      <h3>Equipping the Next Generation</h3>
      <p>The lab is fully equipped with the latest educational robotics kits, 3D printers, soldering stations, and programming terminals. Our goal is to ensure that every student has access to the tools they need to bring their innovative ideas to life.</p>
      <p>"This is a monumental step for the institute," said the Director during the ribbon-cutting ceremony. "By integrating practical robotics into our curriculum, we are preparing our students for the technological challenges of tomorrow."</p>
      <p>Classes in the new lab will begin next week. We encourage all interested parents to enroll their children in the upcoming introductory sessions.</p>
    `
  },
  {
    id: "journalism-award",
    title: "KM Media Graduates Win National Journalism Award",
    category: "Achievement",
    date: "September 28, 2024",
    image: "/images/4.jpg",
    excerpt: "Three of our alumni have been recognized at the National Media Excellence Awards for their outstanding investigative documentary series.",
    content: `
      <p>We are incredibly proud to announce that three of our esteemed alumni have been recognized at the prestigious National Media Excellence Awards.</p>
      <p>The team won the 'Best Investigative Documentary' category for their hard-hitting series that exposed environmental challenges in rural communities.</p>
      <h3>A Testament to Quality Education</h3>
      <p>The graduates, who completed their Broadcast Journalism diploma last year, credited the rigorous practical training they received at KM Media for their success.</p>
      <p>"The hands-on experience and the mentorship from industry professionals at the institute gave us the foundation we needed to tackle complex stories," the team lead stated during their acceptance speech.</p>
      <p>This award serves as an inspiration to our current students, proving that with dedication and the right training, they too can achieve national recognition.</p>
    `
  },
  {
    id: "international-partnership",
    title: "Partnership with International Media Network Announced",
    category: "Partnership",
    date: "September 10, 2024",
    image: "/images/5.jpg",
    excerpt: "This new collaboration will provide our top students with internship opportunities at leading international broadcast stations.",
    content: `
      <p>KM Media Training Institute is excited to officially announce a groundbreaking partnership with a leading International Media Network.</p>
      <p>This strategic alliance is designed to bridge the gap between local training and global media standards, offering unprecedented opportunities to our students.</p>
      <h3>Global Internship Opportunities</h3>
      <p>As part of this partnership, our top-performing students will now have the chance to apply for exclusive internship programs at various international broadcast stations across Europe and North America.</p>
      <p>Additionally, the network will be providing guest lectures, workshops, and updated curriculum resources to ensure our programmes remain at the cutting edge of the global media landscape.</p>
      <p>We look forward to seeing our students take full advantage of these new avenues for career development.</p>
    `
  }
];

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  content: string;
}

export const upcomingEvents: EventItem[] = [
  {
    id: "student-orientation",
    title: "New Student Orientation",
    date: "Aug 03, 2026",
    time: "9:00 AM ",
    location: "Main Campus, Akatsi",
    image: "/images/5.jpg",
    description: "Welcome to all new students! Join us for a day of introductions and campus tours.",
    content: `
      <p>We are excited to welcome the newest batch of creatives and technologists to KM Media Training Institute!</p>
      <h3>Your Journey Begins Here</h3>
      <p>The New Student Orientation is designed to help you transition smoothly into campus life. You will meet the faculty, connect with your peers, and learn about the resources available to you.</p>
      <p>The day will begin with a keynote address from our Director, followed by departmental breakouts where you will receive your schedules and course outlines.</p>
      <p>We will conclude with a guided campus tour, ensuring you know exactly where your labs, studios, and lecture halls are located. We can't wait to meet you!</p>
    `
  },
  // {
  //   id: "tech-exhibition",
  //   title: "Annual Media & Tech Exhibition",
  //   date: "Nov 12, 2024",
  //   time: "10:00 AM - 4:00 PM",
  //   location: "Main Campus, Akatsi",
  //   image: "/images/3.jpeg",
  //   description: "Join us for our biggest event of the year showcasing student projects in media and tech.",
  //   content: `
  //     <p>The KM Media Training Institute is proud to host our Annual Media & Tech Exhibition. This event brings together industry leaders, students, and the community to celebrate innovation and creativity.</p>
  //     <h3>What to Expect</h3>
  //     <p>Attendees will have the opportunity to explore interactive booths featuring projects from our Web Development, Graphic Design, and Sound Engineering students.</p>
  //     <p>Special highlights include live robotics demonstrations from our new Robotics for Kids program and premier screenings of short films produced by our Film and TV Production cohorts.</p>
  //     <p>Admission is free and open to the public. Don't miss this chance to network with the next generation of media and tech professionals!</p>
  //   `
  // },
  // {
  //   id: "marketing-masterclass",
  //   title: "Digital Marketing Masterclass",
  //   date: "Nov 25, 2024",
  //   time: "2:00 PM - 5:00 PM",
  //   location: "Virtual Event",
  //   image: "/images/4.jpg",
  //   description: "An intensive virtual masterclass on modern SEO and social media strategies.",
  //   content: `
  //     <p>Elevate your digital marketing skills with our exclusive 3-hour masterclass led by industry veterans.</p>
  //     <h3>Masterclass Agenda</h3>
  //     <p>This intensive session will cover the latest trends in Search Engine Optimization (SEO), focusing on algorithm updates and organic growth strategies.</p>
  //     <p>The second half of the event will dive into data-driven Social Media Management, exploring how to leverage analytics to maximize ROI on platforms like Instagram, TikTok, and LinkedIn.</p>
  //     <p>Registered participants will receive a certificate of attendance and exclusive access to the recorded session. Ensure you register early as virtual seats are limited!</p>
  //   `
  // },
];
