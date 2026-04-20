export const PROJECTS = [
  {
    id: "01",
    title: "Nexus AI",
    description:
      "AI-based interview preparation platform powered by Gemini. Practice technical and behavioral interviews with real-time feedback and personalized question generation.",
    tech: ["React", "Node.js", "MongoDB", "Gemini API"],
    live: "https://nexus-ai-nu-dusky.vercel.app/",
    github: "https://github.com/Phoenix-91/Nexus_AI",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "02",
    title: "ChatFlow",
    description:
      "Real-time chat application with WebSocket support. Features rooms, private messaging, typing indicators, and online presence — built for scale.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    live: null,
    github: "https://github.com/Phoenix-91/ChatFlow",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "03",
    title: "Ecommerce Store",
    description:
      "Full-featured e-commerce platform with product management, cart, wishlist, and Stripe payment integration. Optimized for conversion.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    live: null,
    github: "https://github.com/Phoenix-91/ecommarce-store",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "04",
    title: "AI Fitness Tracker",
    description:
      "AI-powered calorie and workout tracking application. Get personalized meal plans, exercise routines, and progress insights.",
    tech: ["React", "Node.js", "Gemini API", "MongoDB"],
    live: null,
    github: null,
    gradient: "from-orange-500 to-red-500",
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: "🎨",
    items: [
      { name: "HTML", slug: "html5" },
      { name: "CSS", slug: "css3" },
      { name: "JavaScript", slug: "javascript" },
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Redux", slug: "redux" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express.js", slug: "express" },
      { name: "REST APIs", slug: "fastapi" },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    items: [
      { name: "MongoDB", slug: "mongodb" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    category: "Tools",
    icon: "🛠️",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Vercel", slug: "vercel" },
      { name: "DigitalOcean", slug: "digitalocean" },
    ],
  },
  {
    category: "Languages",
    icon: "💻",
    items: [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
    ],
  },
];

// Flat list for the grid-style skills section (matching screenshot UI)
export const SKILLS_FLAT = [
  { name: "React JS",       slug: "react",          label: "Framework",          color: "#20232a" },
  { name: "Next JS",        slug: "nextdotjs",       label: "Framework",          color: "#000000" },
  { name: "Tailwind CSS",   slug: "tailwindcss",     label: "Framework",          color: "#0ea5e9" },
  { name: "JavaScript",     slug: "javascript",      label: "Language",           color: "#f7df1e" },
  { name: "TypeScript",     slug: "typescript",      label: "Language",           color: "#3178c6" },
  { name: "Redux",          slug: "redux",           label: "State Management",   color: "#764abc" },
  { name: "HTML",           slug: "html5",           label: "Language",           color: "#e34f26" },
  { name: "CSS",            slug: "css3",            label: "Language",           color: "#1572b6" },
  { name: "Node JS",        slug: "nodedotjs",       label: "Javascript Runtime", color: "#339933" },
  { name: "Express JS",     slug: "express",         label: "Framework",          color: "#404d59" },
  { name: "MongoDB",        slug: "mongodb",         label: "Database",           color: "#47a248" },
  { name: "PostgreSQL",     slug: "postgresql",      label: "Database",           color: "#4169e1" },
  { name: "Docker",         slug: "docker",          label: "DevOps",             color: "#2496ed" },
  { name: "Git",            slug: "git",             label: "Version Control",    color: "#f05032" },
  { name: "GitHub",         slug: "github",          label: "Repository",         color: "#181717" },
  { name: "Vercel",         slug: "vercel",          label: "Deployment",         color: "#000000" },
  { name: "DigitalOcean",   slug: "digitalocean",    label: "Cloud",              color: "#0080ff" },
  { name: "Firebase",       slug: "firebase",        label: "Backend Platform",   color: "#dd2c00" },
  { name: "Figma",          slug: "figma",           label: "Design Tool",        color: "#f24e1e" },
  { name: "Canva",          slug: "canva",           label: "Design App",         color: "#00c4cc" },
  { name: "Prisma",         slug: "prisma",          label: "ORM",                color: "#2d3748" },
];

export const EXPERIENCE = [
  {
    role: "React JS Developer",
    company: "The Entrepreneurship Network",
    duration: "3 Months",
    period: "2024",
    responsibilities: [
      "Built reusable UI components using React",
      "Improved overall user experience and interface quality",
      "Collaborated effectively in a team environment",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Chandigarh University",
    year: "2023 – 2026",
    icon: "GraduationCap",
    status: "Pursuing",
  },
  {
    degree: "12th Non-Medical (Science)",
    school: "Sharda Sarvhitkari Model School, Chandigarh",
    year: "Completed",
    icon: "BookOpen",
    status: "Completed",
  },
];

export const STATS = [
  { label: "Projects",    value: "4+",   icon: "Rocket"       },
  { label: "Experience",  value: "3mo",  icon: "Clock"        },
  { label: "Technologies",value: "10+",  icon: "Layers"       },
  { label: "Graduating",  value: "2026", icon: "GraduationCap"},
];

export const ABOUT_CARDS = [
  {
    icon: "Layers",
    title: "Full Stack Engineer",
    desc: "Building end-to-end apps with React, Node.js, MongoDB",
  },
  {
    icon: "Bot",
    title: "AI Integration",
    desc: "Creating intelligent tools using modern AI APIs",
  },
  {
    icon: "Lightbulb",
    title: "Problem Solver",
    desc: "Turning complex problems into elegant solutions",
  },
];

export const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:paramveerpc2211@gmail.com",
    display: "paramveerpc2211@gmail.com",
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/Phoenix-91",
    display: "github.com/Phoenix-91",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paramveer-rana-719545324/",
    display: "linkedin.com/in/paramveer-rana",
    icon: "linkedin",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/paramveer_91",
    display: "x.com/paramveer_91",
    icon: "twitter",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
