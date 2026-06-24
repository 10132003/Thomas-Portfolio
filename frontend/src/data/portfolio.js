export const profile = {
  name: "Thomas M",
  location: "Durgapur, West Bengal, India",
  email: "thomasmicheal9601@gmail.com",
  phone: "+91 7208787842",
  github: "https://github.com/10132003",
  linkedin: "https://linkedin.com/in/thomasm-tech",
  leetcode: "https://leetcode.com/u/thomasmicheal9601/",

  resume: "/thomas-m-resume.pdf",
  roles: [
    "Backend Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Software Engineer",
  ],
  tagline:
    "Building scalable backend systems, secure APIs, distributed applications, and real-world software solutions using Java, Spring Boot, Redis, JWT Authentication, and modern backend technologies.",
};

export const aboutEducation = [
  {
    degree: "B.E. Computer Science and Engineering",
    school: "Sri Sairam Institute of Technology",
    detail: "CGPA 8.53 / 10",
    period: "2022 – 2026",
    location: "Chennai, Tamil Nadu",
  },
  {
    degree: "M.Tech, Operations Research",
    school: "National Institute of Technology Durgapur",
    detail: "Pursuing",
    period: "2026 – 2028",
    location: "Durgapur, West Bengal",
  },
];

export const skills = {
  Languages: ["Java", "C++", "Python", "SQL", "C"],
  Backend: ["Spring Boot", "Spring Security", "JWT", "REST APIs", "JPA", "Hibernate"],
  Databases: ["MySQL", "MongoDB", "Redis", "Firebase"],
  Tools: ["Git", "GitHub", "Maven", "Postman"],
  "Core CS": [
    "Data Structures",
    "Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ],
};

export const projects = [
  {
    id: "quantmatch",
    name: "QuantMatch",
    badge: "FLAGSHIP",
    short:
      "High-performance electronic trading platform inspired by real-world stock exchanges.",
    description:
      "QuantMatch is a backend-intensive trading platform that simulates a real stock exchange using a matching engine and a limit order book. It models the architecture used in modern financial venues — secure user identity, fast order routing, deterministic matching, and persistent trade processing.",
    features: [
      "User & order management with stateless JWT auth",
      "Matching engine running a Limit Order Book (Price-Time Priority)",
      "Redis caching for order book snapshots — 40% fewer DB lookups",
      "7+ secure REST endpoints behind Spring Security filters",
      "Immutable trade journal across 3 normalized tables",
      "Production-grade backend split into 4 specialized modules",
    ],
    architecture: [
      "Client",
      "JWT Authentication Filter",
      "Spring Boot REST APIs",
      "Redis Cache Layer",
      "MySQL (orders / trades / users)",
      "Matching Engine (LOB)",
      "Trade Processor",
    ],
    highlights: [
      "Price-Time Priority Matching",
      "Redis Performance Optimization",
      "Stateless JWT Security",
      "Real-Time Trade Processing",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "Redis", "MySQL"],
    github: "https://github.com/10132003/QuantMatch",
    accent: "#00FF88",
  },
  {
    id: "travelassist",
    name: "TravelAssist",
    badge: "FULL-STACK",
    short:
      "Emergency roadside assistance and vehicle support platform with native Android client.",
    description:
      "TravelAssist is a full-stack emergency assistance platform that connects vehicle owners with fuel delivery, EV charging support, and roadside services. The Android client streams real-time requests to a Spring Boot backend with MongoDB persistence.",
    features: [
      "Native Android client (Java + XML)",
      "Real-time service request workflow",
      "10+ secured REST endpoints in Spring Boot",
      "5+ normalized MongoDB collections",
      "GPS-aware user-tracking options",
      "Authentication & role-based routing",
    ],
    architecture: [
      "Android App (Java + XML)",
      "Spring Boot REST APIs",
      "Auth & Routing Layer",
      "MongoDB Collections",
      "Admin Dashboard",
    ],
    highlights: [
      "Real-Time Service Requests",
      "Native Android Development",
      "Multi-tier MongoDB Modeling",
    ],
    tech: ["Java", "Android Studio", "XML", "Spring Boot", "MongoDB"],
    github: "https://github.com/10132003/TravelAssistApp",
    accent: "#00CC66",
  },
];

export const experience = [
  {
    company: "Hexaind Technologies Pvt Ltd",
    role: "AI/ML Intern",
    mode: "Remote",
    period: "Jun 2024 – Sep 2024",
    points: [
      "Built a real-time face & eye detection pipeline with OpenCV.",
      "Engineered a dataset of 500+ image samples for fine-tuning.",
      "Reduced frame processing latency by 15% via algorithmic optimizations.",
      "Integrated independent vision modules into one cohesive automated system.",
    ],
  },
];

export const achievements = [
  { value: 440, suffix: "+", label: "LeetCode Problems Solved" },
  { value: 2, suffix: "x", label: "GATE CS Qualified" },
  { value: 8.53, suffix: "", label: "B.E. CGPA / 10", decimals: 2 },
  { value: 4, suffix: "+", label: "Production-Grade Projects" },
];

export const certifications = [
  { title: "Cloud Computing", issuer: "NPTEL" },
  { title: "Internet of Things", issuer: "NPTEL" },
  { title: "Python for Data Science", issuer: "NPTEL" },
  { title: "Software Conceptual Design", issuer: "NPTEL" },
  { title: "Machine Learning Onramp", issuer: "MathWorks" },
  { title: "Deep Learning Onramp", issuer: "MathWorks" },
  { title: "Introduction to MongoDB", issuer: "MongoDB" },
  { title: "AI and Vector Search", issuer: "MongoDB" },
  { title: "Business Analysis & Process Management", issuer: "Coursera" },
];
