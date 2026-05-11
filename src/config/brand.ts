export const brand = {
  // ── Core identity ──────────────────────────────────────────
  name: "Commerce OS",
  tagline: "Crafted for Everyday Luxury",
  description:
    "A premium commerce experience built for those who understand that true luxury is never loud.",

  // ── URLs ───────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  // ── Contact ────────────────────────────────────────────────
  email: "hello@commerce-os.com",
  phone: "+91 98765 43210",

  // ── Commerce ───────────────────────────────────────────────
  currency: "₹",
  currencyCode: "INR",
  freeShippingThreshold: 2999,

  // ── Announcement / ticker ──────────────────────────────────
  announcement: "Complimentary shipping on orders above ₹2,999",
  tickerItems: [
    "8L+ Happy Customers",
    "Ships in 24 hours",
    "Free shipping above ₹2,999",
    "Handcrafted with care",
    "Easy returns",
    "New collection now live",
  ],

  // ── Navigation ─────────────────────────────────────────────
  navLinks: [
    { label: "New Arrivals", href: "/products" },
    { label: "Collections", href: "/products" },
    { label: "Our Story", href: "/" },
    { label: "Boutiques", href: "/" },
  ],

  // ── Footer links ───────────────────────────────────────────
  footerLinks: {
    Shop: [
      { label: "New Arrivals", href: "/products" },
      { label: "Collections", href: "/products" },
      { label: "Best Sellers", href: "/products" },
      { label: "Gift Cards", href: "/" },
    ],
    Company: [
      { label: "Our Story", href: "/" },
      { label: "Boutiques", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
    ],
    Support: [
      { label: "Contact", href: "/" },
      { label: "Shipping", href: "/" },
      { label: "Returns", href: "/" },
      { label: "Care Guide", href: "/" },
    ],
  },

  // ── Social ─────────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    twitter: "https://twitter.com",
  },

  // ── SEO ────────────────────────────────────────────────────
  seo: {
    title: "Commerce OS — Crafted for Everyday Luxury",
    description:
      "Curated pieces crafted with timeless design, elevated materials, and quiet sophistication.",
    keywords: ["luxury", "fashion", "jewellery", "premium", "handcrafted"],
  },
};
