export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  key?: string;
}

export const BRAND = {
  name: "Alex Rivera",
  role: "Full-Stack Developer & Creative Technologist",
  tagline: "Crafting digital experiences that leave a mark.",
  location: "San Francisco, CA",
  email: "hello@alexrivera.dev",
  github: "https://github.com/alexmorrow",
  linkedin: "https://linkedin.com/in/alexmorrow",
  twitter: "https://twitter.com/alexmorrow_dev",
  readcv: "https://read.cv/alexmorrow",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/alexmorrow",
    handle: "alexmorrow",
    key: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/alexmorrow",
    handle: "alexmorrow",
    key: "linkedin",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/alexmorrow_dev",
    handle: "@alexmorrow_dev",
    key: "twitter",
  },
  {
    platform: "Dribbble",
    url: "https://dribbble.com/alexmorrow",
    handle: "alexmorrow",
    key: "dribbble",
  },
];
