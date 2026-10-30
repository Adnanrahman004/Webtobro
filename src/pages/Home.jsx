"use client";
import React, { useEffect, useRef, useState } from "react";

/* ================================================================== */
/*  SETTINGS: yahan apni details daalo                                 */
/* ================================================================== */
const BRAND = "Webtobro";
const EMAIL = "info@webtobro.dev";
// Country code ke saath, bina + ya space ke. Example: "919876543210"
// Khali chhodoge to WhatsApp button hide rahega.
const WHATSAPP_NUMBER = "";
const SOCIAL = {
  linkedin: "#", // apna LinkedIn link daalo
  instagram: "#", // apna Instagram link daalo
};

/* ================================================================== */
/*  Small reusable pieces                                              */
/* ================================================================== */

/* Scroll reveal: element screen me aate hi smooth animate hota hai */
function Reveal({ children, className = "", delay = 0, from = "up" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === "left"
      ? "opacity-0 -translate-x-8"
      : from === "right"
        ? "opacity-0 translate-x-8"
        : from === "zoom"
          ? "opacity-0 scale-95"
          : "opacity-0 translate-y-8";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Page content wrapper: laptop pe bhi center + compact */
function Container({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}

/* Smooth open/close (height animation bina max-height hack ke) */
function Collapse({ open, children, className = "" }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${className}`}
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* ---------------- Icons (inline SVG, koi library nahi chahiye) ---------------- */
function LinkedInIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ================================================================== */
/*  Content (sab text yahin se change karo)                            */
/* ================================================================== */
const NAV = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const ROTATING = [
  "restaurants",
  "shops",
  "salons",
  "clinics",
  "factories",
  "coaching centres",
];

const MARQUEE = [
  "Websites",
  "Android apps",
  "iOS apps",
  "Billing & POS",
  "Online ordering",
  "Booking systems",
  "CRM",
  "Dashboards",
  "WhatsApp automation",
  "Inventory",
];

const SERVICES = [
  {
    id: "A",
    title: "Website & Software Development",
    desc: "Fast websites and software your business uses every day",
    fullDesc:
      "From a clean business website to full web software with a database, backend and admin panel. Built to load fast, rank on Google and work smoothly on every phone and laptop.",
    tags: [
      "React / Next.js",
      "Node.js & Python",
      "Database & backend",
      "Admin panel",
      "SEO ready",
    ],
  },
  {
    id: "B",
    title: "App Development",
    desc: "Android & iOS apps your customers actually keep",
    fullDesc:
      "Smooth, native-feeling mobile apps for Android and iOS, built from one codebase so your product looks and behaves the same everywhere, and launched on the Play Store and App Store.",
    tags: [
      "Android",
      "iOS",
      "Cross-platform",
      "Push notifications",
      "Play Store & App Store",
    ],
  },
  {
    id: "C",
    title: "Custom Requirement",
    desc: "Tell us what you need, we build it your way",
    fullDesc:
      "CRMs, billing and POS, dispatch systems, inventory, internal dashboards. If your business needs something special, we shape the software around how you work, so your team stops working around its tools.",
    tags: [
      "CRM & POS",
      "Workflow automation",
      "API integrations",
      "Data dashboards",
    ],
  },
];

const BUSINESSES = [
  {
    emoji: "🍽️",
    title: "Restaurants & cafés",
    items: "Online menu, QR ordering, POS & billing",
  },
  {
    emoji: "🛍️",
    title: "Shops & retail",
    items: "Catalogue site, WhatsApp orders, stock tracking",
  },
  {
    emoji: "💇",
    title: "Salons & clinics",
    items: "Appointment booking, reminders, customer records",
  },
  {
    emoji: "🏭",
    title: "Manufacturers",
    items: "CRM, order tracking, production dashboards",
  },
  {
    emoji: "🎓",
    title: "Coaching & schools",
    items: "Admission pages, attendance, fee tracking",
  },
  {
    emoji: "🚚",
    title: "Delivery & services",
    items: "Dispatch, live tracking, driver app",
  },
];

const PERKS = [
  {
    emoji: "💬",
    title: "WhatsApp-first",
    desc: "Customers order, book and ask from the app they already live in.",
  },
  {
    emoji: "📱",
    title: "Works on every phone",
    desc: "Fast on cheap Androids and slow networks, not just on our laptops.",
  },
  {
    emoji: "🗣️",
    title: "Your language",
    desc: "Hindi, English or both. Your customers, your words.",
  },
  {
    emoji: "🔒",
    title: "You own it",
    desc: "Your data, your customers, your product. No lock-in games.",
  },
];

/* Dono projects same format me hain, isliye card kabhi break nahi hoga */
const PROJECTS = [
  {
    name: "TaskNiri",
    industry: "Rewards platform",
    emoji: "🪙",
    bg: "bg-[#8b5cf6]",
    badge: "Live",
    image: "/taskniri.jpg", // public/taskniri.jpg me rakho. Na mile to card bina image ke dikhega
    url: "https://taskniri-task.vercel.app/",
    description:
      "A rewards platform where users can complete tasks and earn coins.",
    tags: [
      "React",
      "Tailwind",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Firebase",
    ],
  },
  {
    name: "Rakha Bhai Ki Chai",
    industry: "Restaurants & local business",
    emoji: "🏪",
    bg: "bg-[#c27a2e]",
    description: "A website for a local chai shop.",
    tags: ["Next.js", "React", "Firebase"],
  },
];

const PROCESS = [
  {
    title: "Talk",
    desc: "A discovery call. You talk, we ask annoying-but-useful questions, and we hang up with a plan instead of a vibe.",
  },
  {
    title: "Sketch",
    desc: "Flows, wireframes and real interfaces. You’ll click through your product before we write a single line of code.",
  },
  {
    title: "Build",
    desc: "Clean, scalable code, delivered in weekly drops. You watch it grow every week, so nothing is a surprise on delivery day.",
  },
  {
    title: "Break",
    desc: "We try to wreck it before your users can, on every device and every browser, chasing every weird edge case.",
  },
  {
    title: "Ship",
    desc: "Launch day. Then we stick around, because version one is only the first chapter.",
  },
];

const FOUNDERS = [
  {
    no: "01",
    initials: "NR",
    name: "Adnan Rahman",
    role: "Co-founder • Frontend & mobile apps",
    bio: "Designs and builds everything you see and touch: fast websites and smooth Android & iOS apps. If it scrolls, swipes or sparkles, it went through Nimesh.",
    email: "rahmanadnan0551@gmail.com",
  },
  {
    no: "02",
    initials: "AJ",
    name: "SM ZAID",
    role: "Co-founder • Backend & mobile apps",
    bio: "The engine room: servers, databases and the logic behind every app, plus mobile builds end to end. Aditya makes sure it all holds up when the traffic spikes.",
    email: "",
  },
];

const PLANS = [
  {
    name: "Basic",
    tagline: "A clean, fast website to get your business online.",
    price: "₹8,000",
    items: [
      "3 to 4 pages",
      "UI/UX design",
      "Responsive on mobile & laptop",
      "Basic SEO setup",
      "Database",
      "Backend included",
      "Social media links added",
    ],
    featured: false,
  },
  {
    name: "Advance",
    tagline: "For businesses that want to run and grow online.",
    price: "Get a quote", // price fix ho jaye to yahan likh do, jaise "₹18,000"
    items: [
      "6 to 7 pages",
      "Everything in Basic",
      "Advanced UI/UX design",
      "Advanced SEO",
      "Database & backend",
      "Admin panel",
      "Social media & your customer requirements",
      "Domain & hosting included",
    ],
    featured: true,
  },
  {
    name: "Custom",
    tagline: "Tell us what you need and we’ll build it your way.",
    price: "Let’s talk",
    items: [
      "Pages and features built around your business",
      "Custom UI/UX design",
      "Android & iOS app",
      "CRM, POS or workflow automation",
      "Payments & third-party integrations",
      "Dashboards & analytics",
      "Ongoing support after launch",
    ],
    featured: false,
  },
];

const FAQS = [
  {
    q: "I’m not technical. Can I still work with you?",
    a: "Yes. We explain everything in plain language, and the discovery call is just a conversation about your business, not a technical interview.",
  },
  {
    q: "How long does a project take?",
    a: "A simple website can be ready in days to a couple of weeks. Apps and MVPs take weeks, not quarters. You see progress in weekly drops, so there are no surprises.",
  },
  {
    q: "How much will it cost?",
    a: "Every project is shaped around your business, so we share a clear estimate after the free discovery call. No hidden extras.",
  },
  {
    q: "Can I update my menu, prices or content myself?",
    a: "Yes. We can add an admin dashboard so you can change things yourself without calling a developer.",
  },
  {
    q: "What happens after launch?",
    a: "We stick around. Launch is only the first chapter, and we keep fixing, improving and adding features as your business grows.",
  },
];

/* ================================================================== */
/*  Real Earth (canvas): 3D globe, ghoomti hui, clouds + atmosphere    */
/*  Koi image / library nahi chahiye                                   */
/* ================================================================== */
const LAND = [
  {
    c: "#4c8c3e",
    p: [
      [-168, 66],
      [-160, 70],
      [-140, 70],
      [-120, 72],
      [-95, 72],
      [-80, 70],
      [-62, 60],
      [-56, 52],
      [-66, 45],
      [-70, 42],
      [-76, 35],
      [-81, 30],
      [-80, 25],
      [-84, 30],
      [-90, 29],
      [-97, 26],
      [-97, 20],
      [-90, 21],
      [-87, 16],
      [-83, 10],
      [-79, 8],
      [-86, 13],
      [-92, 15],
      [-105, 20],
      [-110, 24],
      [-117, 32],
      [-124, 40],
      [-124, 48],
      [-130, 54],
      [-140, 60],
      [-150, 60],
      [-160, 58],
      [-165, 62],
    ],
  }, // North America
  {
    c: "#3f8a3a",
    p: [
      [-80, 8],
      [-72, 12],
      [-62, 10],
      [-52, 5],
      [-50, 0],
      [-35, -5],
      [-35, -9],
      [-40, -22],
      [-48, -26],
      [-58, -38],
      [-65, -42],
      [-68, -52],
      [-72, -54],
      [-74, -46],
      [-73, -37],
      [-71, -30],
      [-70, -18],
      [-76, -14],
      [-81, -5],
      [-80, 2],
    ],
  }, // South America
  {
    c: "#5b9140",
    p: [
      [-5, 36],
      [-9, 37],
      [-9, 43],
      [-2, 43.5],
      [-1, 46],
      [-4, 48],
      [2, 51],
      [5, 53],
      [8, 54],
      [9, 57],
      [10, 58],
      [5, 59],
      [6, 62],
      [14, 67],
      [20, 70],
      [28, 71],
      [40, 67],
      [44, 68],
      [60, 69],
      [70, 73],
      [80, 73],
      [100, 77],
      [113, 74],
      [130, 71],
      [150, 71],
      [170, 70],
      [180, 68],
      [180, 65],
      [172, 62],
      [163, 60],
      [157, 51],
      [150, 59],
      [141, 53],
      [140, 48],
      [135, 43],
      [129, 41],
      [129, 36],
      [126, 35],
      [125, 39],
      [121, 40],
      [118, 38],
      [121, 31],
      [122, 29],
      [117, 23],
      [110, 21],
      [108, 17],
      [109, 12],
      [105, 9],
      [101, 13],
      [100, 7],
      [103, 1],
      [98, 8],
      [98, 16],
      [94, 20],
      [91, 23],
      [87, 21],
      [80, 15],
      [80, 10],
      [77, 8],
      [73, 17],
      [72, 21],
      [67, 25],
      [62, 25],
      [57, 26],
      [55, 26],
      [50, 29],
      [48, 30],
      [50, 26],
      [52, 24],
      [56, 25],
      [58, 21],
      [52, 16],
      [45, 13],
      [43, 13],
      [39, 21],
      [35, 28],
      [34, 30],
      [35, 33],
      [36, 36],
      [30, 36],
      [27, 37],
      [26, 40],
      [24, 38],
      [22, 37],
      [21, 40],
      [19, 42],
      [14, 45],
      [13, 44],
      [16, 41],
      [18, 40],
      [16, 38],
      [15, 40],
      [12, 42],
      [9, 44],
      [7, 43],
      [3, 43],
      [0, 39],
      [-1, 37],
    ],
  }, // Eurasia
  {
    c: "#8f9a45",
    p: [
      [-17, 21],
      [-16, 14],
      [-13, 9],
      [-8, 5],
      [-2, 5],
      [5, 6],
      [9, 4],
      [9, -1],
      [12, -5],
      [13, -12],
      [12, -17],
      [15, -26],
      [18, -32],
      [20, -35],
      [27, -34],
      [32, -28],
      [35, -22],
      [40, -15],
      [40, -10],
      [39, -5],
      [43, 0],
      [51, 12],
      [43, 12],
      [39, 16],
      [35, 25],
      [33, 30],
      [32, 31],
      [25, 32],
      [20, 31],
      [15, 32],
      [10, 34],
      [10, 37],
      [0, 36],
      [-6, 36],
      [-10, 30],
      [-13, 27],
    ],
  }, // Africa
  {
    c: "#b88a4e",
    p: [
      [114, -22],
      [122, -18],
      [130, -12],
      [137, -12],
      [142, -11],
      [146, -19],
      [153, -26],
      [151, -34],
      [146, -39],
      [140, -38],
      [135, -34],
      [129, -32],
      [115, -34],
      [114, -26],
    ],
  }, // Australia
  {
    c: "#eef3f8",
    p: [
      [-55, 60],
      [-45, 60],
      [-20, 70],
      [-18, 78],
      [-30, 83],
      [-60, 82],
      [-72, 78],
      [-55, 70],
    ],
  }, // Greenland
  {
    c: "#eef3f8",
    p: [
      [-180, -70],
      [-180, -90],
      [180, -90],
      [180, -70],
      [150, -68],
      [100, -66],
      [60, -68],
      [0, -70],
      [-60, -65],
      [-120, -73],
    ],
  }, // Antarctica
  {
    c: "#4c8c3e",
    p: [
      [-5, 50],
      [1, 51],
      [2, 53],
      [-2, 56],
      [-4, 58],
      [-6, 56],
      [-3, 54],
      [-5, 52],
    ],
  }, // UK
  {
    c: "#4c8c3e",
    p: [
      [130, 32],
      [135, 34],
      [140, 36],
      [142, 40],
      [141, 45],
      [140, 41],
      [136, 36],
      [131, 34],
    ],
  }, // Japan
  {
    c: "#3f8a3a",
    p: [
      [109, 1],
      [117, 7],
      [119, 1],
      [116, -4],
      [110, -3],
    ],
  }, // Borneo
  {
    c: "#3f8a3a",
    p: [
      [95, 5],
      [98, 4],
      [106, -4],
      [104, -6],
      [100, 0],
    ],
  }, // Sumatra
  {
    c: "#6a9a45",
    p: [
      [44, -25],
      [47, -25],
      [50, -15],
      [49, -12],
      [44, -17],
    ],
  }, // Madagascar
  {
    c: "#4c8c3e",
    p: [
      [172, -35],
      [178, -38],
      [174, -41],
      [172, -44],
      [167, -46],
      [171, -41],
    ],
  }, // New Zealand
  {
    c: "#c9a863",
    p: [
      [-15, 28],
      [-5, 32],
      [10, 32],
      [25, 31],
      [33, 28],
      [35, 22],
      [25, 16],
      [10, 14],
      [-10, 16],
      [-16, 20],
    ],
  }, // Sahara
  {
    c: "#c9a863",
    p: [
      [36, 28],
      [50, 29],
      [56, 24],
      [58, 21],
      [52, 16],
      [43, 14],
      [39, 21],
    ],
  }, // Arabia
];

function densify(pts, step = 4) {
  const out = [];
  for (let i = 0; i < pts.length; i += 1) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const n = Math.max(
      1,
      Math.ceil(Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) / step),
    );
    for (let k = 0; k < n; k += 1) {
      out.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n]);
    }
  }
  return out;
}

const LAND_DENSE = LAND.map((l) => ({ c: l.c, p: densify(l.p) }));

const CLOUDS = (() => {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 34 }, () => ({
    lon: rnd() * 360 - 180,
    lat: (rnd() - 0.5) * 130,
    size: 5 + rnd() * 9,
    a: 0.35 + rnd() * 0.3,
  }));
})();
const PUFFS = [
  [-0.6, 0],
  [0.5, 0.2],
  [0, -0.45],
];

function Earth({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const S = 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = S * dpr;
    canvas.height = S * dpr;

    const cx = S / 2;
    const cy = S / 2;
    const R = S / 2 - 6;
    const rad = Math.PI / 180;
    const tilt = 18 * rad;
    const sT = Math.sin(tilt);
    const cT = Math.cos(tilt);

    const proj = (lon, lat, lon0) => {
      const l = (lon - lon0) * rad;
      const f = lat * rad;
      const cf = Math.cos(f);
      const sf = Math.sin(f);
      const cl = Math.cos(l);
      return [cf * Math.sin(l), cT * sf - sT * cf * cl, sT * sf + cT * cf * cl];
    };

    const draw = (lon0, t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, S, S);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Ocean
      const ocean = ctx.createRadialGradient(
        cx - R * 0.35,
        cy - R * 0.35,
        R * 0.1,
        cx,
        cy,
        R,
      );
      ocean.addColorStop(0, "#4fa3e0");
      ocean.addColorStop(0.55, "#1d5fa8");
      ocean.addColorStop(1, "#082a5c");
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, S, S);

      // Land
      LAND_DENSE.forEach((land) => {
        let anyVisible = false;
        ctx.beginPath();
        land.p.forEach(([lon, lat], i) => {
          let [x, y, z] = proj(lon, lat, lon0);
          if (z >= 0) anyVisible = true;
          else {
            const h = Math.hypot(x, y) || 1;
            x /= h;
            y /= h;
          }
          const px = cx + x * R;
          const py = cy - y * R;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        if (anyVisible) {
          ctx.fillStyle = land.c;
          ctx.fill();
        }
      });

      // Clouds (land se thoda alag speed me ghoomte hain)
      const drift = t * 0.0015;
      CLOUDS.forEach((cl) => {
        PUFFS.forEach(([dx, dy]) => {
          const [x, y, z] = proj(
            cl.lon + drift + dx * cl.size,
            cl.lat + dy * cl.size,
            lon0,
          );
          if (z < 0.03) return;
          const px = cx + x * R;
          const py = cy - y * R;
          const rr = R * cl.size * rad * (0.5 + 0.5 * z);
          const g = ctx.createRadialGradient(px, py, 0, px, py, rr);
          g.addColorStop(
            0,
            `rgba(255,255,255,${(cl.a * Math.min(1, z * 1.6)).toFixed(3)})`,
          );
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, rr, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Day/night shading (light upar-left se)
      const shade = ctx.createRadialGradient(
        cx - R * 0.4,
        cy - R * 0.4,
        R * 0.2,
        cx - R * 0.4,
        cy - R * 0.4,
        R * 1.6,
      );
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(0.55, "rgba(0,0,12,0.18)");
      shade.addColorStop(1, "rgba(0,0,20,0.8)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, S, S);

      // Specular chamak
      const spec = ctx.createRadialGradient(
        cx - R * 0.4,
        cy - R * 0.42,
        0,
        cx - R * 0.4,
        cy - R * 0.42,
        R * 0.4,
      );
      spec.addColorStop(0, "rgba(255,255,255,0.22)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.fillRect(0, 0, S, S);

      // Atmosphere rim
      const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
      rim.addColorStop(0, "rgba(130,190,255,0)");
      rim.addColorStop(1, "rgba(130,190,255,0.55)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, S, S);
      ctx.restore();

      // India pe pulsing dot (jab samne ho)
      const [mx, my, mz] = proj(78, 21, lon0);
      if (mz > 0.2) {
        const px = cx + mx * R;
        const py = cy - my * R;
        const k = (t % 2000) / 2000;
        ctx.beginPath();
        ctx.arc(px, py, 3 + k * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${(1 - k).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#fde047";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = 0;
    let lon = 78;
    const frame = (now) => {
      if (last) lon -= (now - last) * 0.006;
      last = now;
      draw(lon, now);
      raf = window.requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || reduce) return;
      last = 0;
      raf = window.requestAnimationFrame(frame);
    };
    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    draw(lon, 0);

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? start() : stop(),
      );
      io.observe(canvas);
    } else {
      start();
    }
    return () => {
      stop();
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative rounded-full shadow-[0_0_50px_8px_rgba(96,165,250,0.35)] ${className}`}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Rotating planet Earth"
        className="w-full h-full block"
      />
    </div>
  );
}

/* ================================================================== */
/*  Project card: card apne content jitna bada, image natural size     */
/* ================================================================== */
function ProjectCard({ p }) {
  const [imgOk, setImgOk] = useState(Boolean(p.image));

  const content = (
    <div
      className={`${p.bg} text-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start gap-3">
        <span className="text-xs sm:text-sm font-medium text-white/80">
          {p.industry}
        </span>
        <div className="flex items-center gap-2">
          {p.badge && (
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {p.badge}
            </span>
          )}
          <span className="text-xl lg:text-2xl">{p.emoji}</span>
        </div>
      </div>

      {imgOk && (
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          onError={() => setImgOk(false)}
          className="w-full h-auto block rounded-xl border border-white/20"
        />
      )}

      <div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold uppercase tracking-tight leading-tight">
          {p.name}
          {p.url && <span className="ml-2 text-white/70">↗</span>}
        </h3>
        {p.description && (
          <p className="text-xs sm:text-sm text-white/85 mt-1.5 max-w-md leading-relaxed">
            {p.description}
          </p>
        )}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/40 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return p.url ? (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${p.name}`}
      className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]"
    >
      {content}
    </a>
  ) : (
    content
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", type: "", idea: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [openService, setOpenService] = useState("A");
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const barRef = useRef(null);

  /* Scroll progress bar + navbar state + back-to-top (ek hi listener, rAF se smooth) */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      setScrolled(y > 24);
      setShowTop(y > 700);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Hero me badalte hue business words */
  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);

  /* Mobile menu khula ho to page scroll lock + Esc se band */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Discovery call request");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBusiness type: ${form.type || "-"}\n\nWhat are we building?\n${form.idea}`,
    );
    setFormStatus("opening");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I’d like to talk about a website/app for my business.")}`
    : "";

  const sectionPad = "py-14 sm:py-16 lg:py-20";
  const h2Base =
    "font-extrabold uppercase tracking-tight leading-[1.05] text-2xl sm:text-3xl lg:text-5xl";
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]";
  const inputCls =
    "w-full bg-transparent border-b-2 border-[#0B0C10] py-2 text-base focus:outline-none focus:border-[#8b5cf6] placeholder-gray-400 transition-colors";

  return (
    <div className="w-full bg-[#f4f4f6] overflow-x-hidden font-sans antialiased">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes glowPulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .9; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 1; } }
        .glow-anim { animation: glowPulse 8s ease-in-out infinite; }
        @keyframes nudge { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .nudge-anim { animation: nudge 1.8s ease-in-out infinite; }
        @keyframes tagIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .tag-in { animation: tagIn .45s ease-out both; }
        @keyframes wordIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .word-in { animation: wordIn .5s ease-out both; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .floaty { animation: floaty 7s ease-in-out infinite; }
        .floaty-slow { animation: floaty 10s ease-in-out infinite reverse; }
        @keyframes ping2 { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.7); opacity: 0; } }
        .ping2 { animation: ping2 2.2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .glow-anim, .nudge-anim, .tag-in, .word-in, .marquee-track, .floaty, .floaty-slow, .ping2 { animation: none; }
        }
      `}</style>

      {/* ================= SCROLL PROGRESS ================= */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#ec4899]"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        />
      </div>

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#0B0C10]/90 backdrop-blur-md shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <Container className="flex items-center justify-end h-14 lg:h-16">
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Main"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`text-sm font-medium text-white/70 hover:text-white transition-colors rounded ${focusRing}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#a78bfa] hover:scale-[1.04] active:scale-95 transition ${focusRing}`}
            >
              Book a call
            </a>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-full ${focusRing}`}
          >
            <span
              className={`absolute h-0.5 w-5 bg-white rounded transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-white rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-white rounded transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </Container>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Collapse open={menuOpen}>
            <nav
              className="px-5 pb-6 pt-2 flex flex-col gap-1"
              aria-label="Mobile"
            >
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-white/90 text-lg font-semibold py-2.5 border-b border-white/10 ${focusRing}`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={`mt-4 text-center bg-white text-black font-semibold text-sm px-6 py-3 rounded-full active:scale-95 transition ${focusRing}`}
              >
                Book a discovery call
              </a>
            </nav>
          </Collapse>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="top"
        className="bg-[#0B0C10] text-white relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden px-5 sm:px-8 pt-24 pb-20 lg:py-24"
      >
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="glow-anim absolute top-1/2 left-1/2 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[520px] lg:h-[520px] bg-purple-900/40 blur-[100px] rounded-full z-0" />
        <div className="floaty absolute top-[18%] left-[8%] w-3 h-3 rounded-full bg-[#a78bfa]/60 blur-[1px] z-0" />
        <div className="floaty-slow absolute bottom-[22%] right-[10%] w-4 h-4 rounded-full bg-pink-500/50 blur-[1px] z-0" />
        <div className="floaty absolute top-[30%] right-[16%] w-2 h-2 rounded-full bg-white/40 z-0" />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-xs sm:text-sm text-gray-200 px-3.5 py-1.5 rounded-full mb-5 sm:mb-6">
              <span className="relative flex w-2 h-2">
                <span className="ping2 absolute inline-flex w-full h-full rounded-full bg-green-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
              </span>
              Software for local{" "}
              <span
                key={ROTATING[wordIdx]}
                className="word-in inline-block font-semibold text-[#a78bfa]"
              >
                {ROTATING[wordIdx]}
              </span>
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase">
              You bring the <br className="hidden sm:block" /> Spark <br />
              <span className="text-[#a78bfa]">
                We bring the <br className="hidden sm:block" /> Stack
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 sm:mt-6 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-xl mx-auto">
              We build modern websites and powerful Android & iOS apps for local
              businesses, startups and growing brands. Your idea, turned into a
              beautiful, fast and easy-to-use digital product.
            </p>
          </Reveal>
          <Reveal delay={300} className="w-full">
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <a
                href="#contact"
                className={`w-full max-w-[280px] sm:w-auto sm:max-w-none text-center bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-200 hover:scale-[1.03] active:scale-95 transition ${focusRing}`}
              >
                Book a discovery call →
              </a>
              <a
                href="#projects"
                className={`w-full max-w-[280px] sm:w-auto sm:max-w-none text-center bg-transparent border border-white/30 text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/10 hover:scale-[1.03] active:scale-95 transition ${focusRing}`}
              >
                See what we shipped
              </a>
            </div>
          </Reveal>
        </div>

        <a
          href="#about"
          aria-label="Scroll down"
          className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition text-xl"
        >
          <span className="nudge-anim block">↓</span>
        </a>
      </section>

      {/* ================= MARQUEE ================= */}
      <div
        className="marquee-wrap bg-[#8b5cf6] text-white overflow-hidden py-3 sm:py-3.5"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap"
            >
              <span className="px-5 sm:px-7">{item}</span>
              <span className="text-white/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= MANIFESTO ================= */}
      <section
        id="about"
        className={`scroll-mt-16 bg-[#f4f4f6] text-[#0B0C10] ${sectionPad} border-b border-gray-300`}
      >
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase mb-4 sm:mb-5">
              Manifesto
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-lg sm:text-xl lg:text-3xl font-medium leading-[1.5] lg:leading-[1.4]">
              We’re a small tribe of builders who got tired of software that
              looks great in a pitch deck and falls apart on a Monday morning.
              So we build the other kind. The kind that survives real users,
              real traffic and real deadlines. No account managers. No handing
              you off to strangers. Just senior people who care how your product
              feels at 2 a.m. on launch night.
            </h2>
          </Reveal>
          <Reveal from="zoom" delay={150} className="mt-10 lg:mt-14">
            <div className="relative overflow-hidden rounded-3xl bg-[#04060f] py-8 sm:py-10 flex justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:34px_34px]" />
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:53px_53px] [background-position:17px_23px]" />
              <Earth className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= FOR LOCAL BUSINESS ================= */}
      <section
        id="local"
        className={`scroll-mt-16 bg-white text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} mb-2 lg:mb-3`}>
              Built for local business
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-8 lg:mb-10 max-w-2xl">
              From the chai shop on the corner to the factory on the highway. If
              you serve real customers, we build the software that helps you
              serve them better.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {BUSINESSES.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 100}>
                <div className="group h-full bg-[#f4f4f6] border border-gray-200 rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6] hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="text-3xl mb-3 inline-block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    {b.emoji}
                  </div>
                  <h3 className="text-base lg:text-lg font-extrabold uppercase tracking-tight mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {b.items}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 90} from="zoom">
                <div className="h-full rounded-2xl bg-[#0B0C10] text-white p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-2xl mb-2">{perk.emoji}</div>
                  <h3 className="text-sm lg:text-base font-bold mb-1">
                    {perk.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className={`scroll-mt-16 bg-[#f4f4f6] text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} text-left mb-8 lg:mb-12`}>
              Three ways
              <br />
              we help
            </h2>
          </Reveal>

          <div className="border-t-2 border-[#0B0C10]">
            {SERVICES.map((item, i) => {
              const isOpen = openService === item.id;
              const toggle = () => setOpenService(isOpen ? null : item.id);

              return (
                <Reveal key={item.id} delay={i * 100}>
                  <div className="border-b-2 border-[#0B0C10] overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={toggle}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle();
                        }
                      }}
                      className={`py-5 lg:py-6 flex items-start gap-3 sm:gap-4 lg:gap-10 cursor-pointer select-none transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#8b5cf6] ${isOpen ? "bg-[#8b5cf6] text-white" : "hover:bg-white text-[#0B0C10]"}`}
                    >
                      <span className="text-sm lg:text-base font-bold mt-1 lg:mt-2 pl-3 sm:pl-4 lg:pl-6">
                        {item.id}
                      </span>
                      <div className="flex-1 min-w-0 pr-3 sm:pr-4 lg:pr-6">
                        <div className="flex justify-between items-center gap-4">
                          <h3 className="text-base sm:text-2xl lg:text-4xl font-extrabold uppercase tracking-tight leading-tight break-words min-w-0">
                            {item.title}
                          </h3>
                          <span
                            className={`text-2xl lg:text-4xl font-light leading-none flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                          >
                            +
                          </span>
                        </div>
                        <p
                          className={`text-xs sm:text-sm lg:text-lg mt-1.5 lg:mt-2 ${isOpen ? "text-white/90" : "text-gray-600"}`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <Collapse open={isOpen} className="bg-[#8b5cf6] text-white">
                      <div className="pl-10 sm:pl-12 lg:pl-24 pr-4 sm:pr-6 lg:pr-10 pt-1 pb-6 lg:pb-8">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-5 lg:mb-6 max-w-3xl">
                          {item.fullDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 lg:gap-3">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={isOpen ? `${tag}-open` : tag}
                              style={{ animationDelay: `${idx * 70}ms` }}
                              className={`${isOpen ? "tag-in" : ""} border border-white/40 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm lg:text-base text-white font-medium`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className={`scroll-mt-16 bg-white text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} mb-2 lg:mb-3`}>Our Projects</h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-8 lg:mb-10 max-w-xl">
              A showcase of websites and mobile apps we’ve built. Explore our
              projects, discover our creativity, and see what we can build for
              you.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-start">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 150}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= PROCESS ================= */}
      <section
        id="process"
        className={`scroll-mt-16 bg-[#f4f4f6] text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} mb-8 lg:mb-12`}>
              Five Chapters.
              <br />
              Zero Black Boxes.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {PROCESS.map((step, i) => (
              <Reveal
                key={step.title}
                delay={(i % 2) * 120}
                from={i % 2 === 0 ? "left" : "right"}
                className={i === PROCESS.length - 1 ? "md:col-span-2" : ""}
              >
                <div className="bg-[#ebebef] rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 h-full min-h-[130px] lg:min-h-[170px] flex flex-col justify-center transition-colors duration-300 hover:bg-[#e2e0f5]">
                  <span className="text-xs font-bold text-[#8b5cf6] mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight mb-1.5 lg:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FOUNDERS ================= */}
      <section
        id="team"
        className={`scroll-mt-16 bg-white text-[#0B0C10] ${sectionPad} border-t border-gray-200`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} mb-8 lg:mb-12`}>
              Two Founders,
              <br />
              No Middlemen
            </h2>
          </Reveal>
          <div className="border-t-2 border-[#0B0C10] pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={i * 150}>
                <div
                  className={`flex flex-col sm:flex-row gap-4 sm:gap-5 items-start ${i === 1 ? "border-t border-gray-300 pt-8 lg:border-t-0 lg:pt-0" : ""}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex-shrink-0 border-4 border-white shadow-lg bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] text-white flex items-center justify-center text-lg lg:text-2xl font-extrabold">
                    {f.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-gray-400">
                      {f.no}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-extrabold uppercase leading-tight tracking-tight mb-1">
                      {f.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-3">
                      {f.role}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                      {f.bio}
                    </p>
                    <a
                      href={`mailto:${f.email}`}
                      className={`inline-block text-sm font-bold border-b-2 border-[#0B0C10] pb-0.5 break-all hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-colors ${focusRing}`}
                    >
                      {f.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className={`scroll-mt-16 bg-[#f4f4f6] text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <Reveal>
            <h2 className={`${h2Base} mb-2 lg:mb-3`}>{BRAND} Service List</h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-2xl">
              Pick the plan that fits your business. Not sure which one? Choose
              Custom and we’ll shape it together on a free discovery call.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 120}
                className={`h-full ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className={`relative h-full flex flex-col rounded-2xl lg:rounded-3xl p-5 lg:p-6 transition-transform duration-300 hover:-translate-y-1 ${plan.featured ? "bg-[#8b5cf6] text-white" : "border-2 border-[#0B0C10] bg-white text-[#0B0C10]"}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 right-5 bg-[#e11d48] text-white text-[10px] sm:text-[11px] font-bold uppercase px-3 py-1 rounded-full">
                      Most Loved
                    </div>
                  )}
                  <h3 className="text-xl lg:text-2xl font-extrabold uppercase tracking-tight mb-1.5">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-3xl lg:text-4xl font-black tracking-tight mb-2 ${plan.featured ? "text-white" : "text-[#8b5cf6]"}`}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={`text-sm mb-4 ${plan.featured ? "text-white/80" : "text-gray-600"}`}
                  >
                    {plan.tagline}
                  </p>
                  <div
                    className={`border-t pt-4 flex-1 ${plan.featured ? "border-white/30" : "border-[#0B0C10]"}`}
                  >
                    <ul
                      className={`text-sm space-y-2 ${plan.featured ? "text-white" : "text-gray-700"}`}
                    >
                      {plan.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span aria-hidden="true">+</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#contact"
                    className={`mt-6 text-center font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-[1.03] active:scale-95 transition ${focusRing} ${plan.featured ? "bg-white text-black hover:bg-gray-100" : "bg-[#0B0C10] text-white hover:bg-[#8b5cf6]"}`}
                  >
                    {plan.name === "Custom" ? "Talk to us →" : "Get started →"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className={`scroll-mt-16 bg-white text-[#0B0C10] ${sectionPad}`}
      >
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className={`${h2Base} mb-8 lg:mb-10`}>Quick Answers</h2>
          </Reveal>
          <div className="border-t-2 border-[#0B0C10]">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 70}>
                  <div className="border-b border-gray-300">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className={`w-full flex items-center justify-between gap-4 text-left py-4 lg:py-5 ${focusRing}`}
                    >
                      <span
                        className={`text-sm sm:text-base lg:text-lg font-bold transition-colors ${isOpen ? "text-[#8b5cf6]" : ""}`}
                      >
                        {f.q}
                      </span>
                      <span
                        className={`text-2xl font-light leading-none flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-[#8b5cf6]" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <Collapse open={isOpen}>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed pb-5 pr-8">
                        {f.a}
                      </p>
                    </Collapse>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className={`scroll-mt-16 bg-[#f4f4f6] text-[#0B0C10] ${sectionPad}`}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal from="left">
              <h2 className={`${h2Base} lg:text-6xl`}>
                Let’s Build
                <br />
                <span className="text-[#a78bfa]">Something.</span>
              </h2>
              <div className="mt-6 lg:mt-8 text-sm sm:text-base text-gray-600 max-w-md">
                <p className="mb-2">
                  Free discovery call. No pitch deck required.
                </p>
                <p className="mb-5">
                  We’re in India (IST) and we overlap happily with Europe, the
                  Gulf, Asia-Pacific and the US East Coast.
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className={`inline-block text-base lg:text-lg font-bold text-[#0B0C10] border-b-2 border-[#0B0C10] pb-0.5 hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-colors ${focusRing}`}
                >
                  {EMAIL}
                </a>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 flex w-fit items-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:scale-[1.03] active:scale-95 transition ${focusRing}`}
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal from="right" delay={150}>
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-5 lg:gap-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Priya Sharma"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block text-xs font-bold uppercase mb-1"
                  >
                    Your business
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    className={`${inputCls} cursor-pointer`}
                  >
                    <option value="">Select (optional)</option>
                    <option>Restaurant or café</option>
                    <option>Shop or retail</option>
                    <option>Salon or clinic</option>
                    <option>Manufacturer</option>
                    <option>Coaching or school</option>
                    <option>Delivery or services</option>
                    <option>Startup</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="idea"
                    className="block text-xs font-bold uppercase mb-1"
                  >
                    What are we building?
                  </label>
                  <textarea
                    id="idea"
                    name="idea"
                    rows={3}
                    required
                    value={form.idea}
                    onChange={onChange}
                    placeholder="An app that..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full sm:w-auto sm:self-start bg-[#0B0C10] text-white font-semibold text-sm px-7 py-3 rounded-full mt-1 hover:bg-[#8b5cf6] hover:scale-[1.03] active:scale-95 transition ${focusRing}`}
                >
                  Book my discovery call →
                </button>
                {formStatus === "opening" && (
                  <p role="status" className="text-sm text-gray-600">
                    Opening your email app. If nothing opens, write to us at{" "}
                    <a href={`mailto:${EMAIL}`} className="font-bold underline">
                      {EMAIL}
                    </a>
                    .
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#f4f4f6] text-[#0B0C10] pt-12 lg:pt-14 pb-8 border-t border-gray-300">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl leading-none font-black text-[#8b5cf6] tracking-tighter mb-5 lg:mb-7 uppercase">
              {BRAND}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-1 text-sm text-gray-600 font-medium mb-6">
              <p>Marketing studio</p>
              <p>Software development company in Jamshedpur India</p>
              <p>CRM for manufacturers</p>
              <p>Restaurant & café POS</p>
            </div>
            <nav
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8 lg:mb-10"
              aria-label="Footer"
            >
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className={`text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#8b5cf6] transition-colors ${focusRing}`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </Reveal>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full border-t border-gray-300 pt-6 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 gap-4">
            <p>
              © {new Date().getFullYear()} {BRAND}
            </p>
            <div className="flex gap-3 items-center">
              <a
                href={SOCIAL.linkedin}
                aria-label="LinkedIn"
                className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] hover:-translate-y-0.5 active:scale-95 transition ${focusRing}`}
              >
                <LinkedInIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={SOCIAL.instagram}
                aria-label="Instagram"
                className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] hover:-translate-y-0.5 active:scale-95 transition ${focusRing}`}
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
          <p className="mt-5 text-[11px] lg:text-xs text-gray-400">
            Made in India with too much chai ☕
          </p>
        </Container>
      </footer>

      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed right-4 sm:right-5 bottom-4 sm:bottom-5 z-40 flex flex-col items-end gap-3">
        <a
          href="#top"
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
          className={`w-11 h-11 rounded-full bg-[#0B0C10] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#8b5cf6] active:scale-95 ${focusRing} ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          ↑
        </a>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={`relative w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition ${focusRing}`}
          >
            <span className="ping2 absolute inset-0 rounded-full bg-[#25D366]" />
            <WhatsAppIcon className="relative w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
}
