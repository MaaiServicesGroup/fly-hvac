"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import FloatingCTA from "@/components/FloatingCTA";

/* ─────────────────────────────────────────────
   Animation Variants (from design-system-library)
   Pattern 105: Staggered Scroll Reveals
   ───────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

/* ─────────────────────────────────────────────
   Animated Counter Component
   Pattern 006: useSpring counter on viewport entry
   ───────────────────────────────────────────── */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  fallback,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  fallback?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2,
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      spring.set(value);
    }
  }, [isInView, spring, value, hasAnimated]);

  // Show fallback text until animation starts (better SSR)
  if (!hasAnimated && fallback) {
    return <span ref={ref}>{fallback}</span>;
  }

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */
const services = [
  {
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
    title: "AC Repair & Service",
    description:
      "Fast, reliable air conditioning repair for all makes and models. Same-day emergency service available with expert diagnostics.",
    href: "/services#ac-repair",
  },
  {
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    title: "Installation & Replacement",
    description:
      "Professional HVAC installation with Manual J heat load sizing. We install the highest-rated systems for maximum comfort and efficiency.",
    href: "/services#ac-installation",
  },
  {
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.078A6.75 6.75 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632",
    title: "Heating Services",
    description:
      "Complete heating repair and installation — gas furnaces, heat pumps, electric heat. Keep your Houston home warm when temperatures drop.",
    href: "/services#heating",
  },
  {
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Preventative Maintenance",
    description:
      "Residential and commercial maintenance plans that extend equipment life, reduce breakdowns, and cut energy costs year-round.",
    href: "/services#maintenance",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "Whole-House Dehumidifiers",
    description:
      "Houston humidity specialists. Modern AC systems dehumidify less — we install whole-house solutions that transform your comfort.",
    href: "/services#dehumidifiers",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
    title: "Energy Audits & Testing",
    description:
      "Comprehensive home energy audits with blower door infiltration testing and Manual J calculations. Know exactly what your home needs.",
    href: "/services#energy-audits",
  },
];

const stats = [
  { value: 25, suffix: "+", label: "Years Experience", displayStatic: "25+" },
  { value: 5.0, suffix: "", label: "Google Rating", decimals: 1, displayStatic: "5.0" },
  { value: 62, suffix: "+", label: "5-Star Reviews", displayStatic: "62+" },
  { value: 0, suffix: "", label: "Emergency Service", displayStatic: "24/7" },
];

const reviews = [
  {
    name: "Maria G.",
    rating: 5,
    text: "Randy was helpful and knowledgeable. An absolute pleasure to work with. Our AC was back up and running the same day.",
    date: "2 months ago",
  },
  {
    name: "James T.",
    rating: 5,
    text: "My AC condenser failed and Randy arrived in less than 15 minutes and had it running in less than 10. Honesty and skill at affordable rates with true integrity.",
    date: "1 month ago",
  },
  {
    name: "Patricia H.",
    rating: 5,
    text: "Best HVAC service in Houston. Randy takes the time to explain everything and never pushes unnecessary repairs. Highly recommend FLY HVAC!",
    date: "3 weeks ago",
  },
];

const benefits = [
  {
    title: "Owner-Operated Excellence",
    desc: "Randy personally oversees every major installation. With 25+ years of experience overseeing thousands of systems, you get a master craftsman — not a revolving door of technicians.",
  },
  {
    title: "Houston Humidity Specialists",
    desc: "Modern efficient AC systems actually dehumidify less. We specialize in whole-house dehumidifier solutions that transform your indoor comfort in Houston's muggy climate.",
  },
  {
    title: "Precision-Sized Systems",
    desc: "We perform Manual J heat load calculations on every installation — not guesswork. The right-sized system runs efficiently, lasts longer, and keeps every room comfortable.",
  },
  {
    title: "Transparent & Honest",
    desc: "We provide thorough exams before recommending replacements. If a repair can fix it, we'll tell you. No upselling, no pressure — just honest expert advice.",
  },
];

const serviceAreas = [
  "Southwest Houston", "Bellaire", "Meyerland", "West University",
  "MedCenter", "Montrose", "Midtown", "Uptown", "The Heights",
  "EaDo", "Sharpstown", "Westbury", "Sugar Land", "Stafford",
  "Missouri City", "Katy", "Richmond", "Rosenberg",
];

/* ─────────────────────────────────────────────
   Testimonial Carousel Component
   Pattern 304/509: Auto-advance with manual controls
   ───────────────────────────────────────────── */
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -60 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(reviews[current].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-blue-50 leading-relaxed mb-6 italic">
              &ldquo;{reviews[current].text}&rdquo;
            </p>
            <div className="flex justify-between items-center text-sm text-blue-200">
              <span className="font-bold text-white">{reviews[current].name}</span>
              <span>{reviews[current].date}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Homepage
   ───────────────────────────────────────────── */
export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Instant variants for reduced motion
  const instantVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  const motionContainer = prefersReducedMotion ? instantVariants : containerVariants;
  const motionChild = prefersReducedMotion ? instantVariants : childVariants;
  const motionFadeUp = prefersReducedMotion ? instantVariants : fadeInUp;
  const motionFadeLeft = prefersReducedMotion ? instantVariants : fadeInLeft;
  const motionFadeRight = prefersReducedMotion ? instantVariants : fadeInRight;

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
          Pattern 301: Emergency-First Split Hero
          Pattern 505: Trust badges + dual CTA
          Pattern 403: Conversion architecture
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--gray-900)] text-white"
      >
        {/* Parallax grid background */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"
          style={prefersReducedMotion ? {} : { y: heroParallaxY }}
        />

        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 } },
            }}
          >
            {/* Emergency badge with pulse */}
            <motion.div variants={motionChild}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm border border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                Available Now &mdash; Licensed TACLA#26688C
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
              variants={motionChild}
            >
              Houston&apos;s Most Trusted{" "}
              <span className="text-[var(--accent)] inline-block">
                HVAC Experts
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed"
              variants={motionChild}
            >
              With 25+ years of experience and a perfect 5.0 Google rating,
              FLY HVAC delivers expert air conditioning repair, installation,
              and maintenance across the Houston metro area.
            </motion.p>

            {/* Dual CTA - Pattern 403: Phone primary, quote secondary */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={motionChild}
            >
              <motion.a
                href="tel:832-605-6239"
                className="inline-flex items-center justify-center bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg shadow-orange-500/30"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, boxShadow: "0 20px 40px rgba(249,115,22,0.3)" }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (832) 605-6239
              </motion.a>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-white/20 w-full"
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges Row - Pattern 505 */}
            <motion.div
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
              variants={motionChild}
            >
              {[
                { icon: "★", text: "5.0 Google Rating" },
                { icon: "🛡️", text: "25+ Years Experience" },
                { icon: "✓", text: "TACLA Licensed" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm text-blue-100"
                >
                  <span className="text-[var(--accent)]">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
          Pattern 006: Animated Counters on viewport
          ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-[var(--gray-200)]">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={motionContainer}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={motionChild}
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--primary)]">
                  {stat.displayStatic === "24/7" ? (
                    "24/7"
                  ) : (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix || ""}
                      decimals={stat.decimals || 0}
                      fallback={stat.displayStatic}
                    />
                  )}
                </p>
                <p className="text-sm text-[var(--gray-500)] mt-2 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES GRID
          Pattern 302: Icon Morph Cards
          ═══════════════════════════════════════════ */}
      <section className="bg-[var(--gray-50)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={motionContainer}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-[var(--gray-900)] mb-4 tracking-tight"
              variants={motionFadeUp}
            >
              Complete HVAC Solutions for Houston Homes
            </motion.h2>
            <motion.p
              className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto"
              variants={motionFadeUp}
            >
              From emergency AC repairs to whole-house comfort systems, we
              deliver expert service backed by 25+ years of hands-on experience.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={motionContainer}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={motionChild}>
                <Link href={service.href} className="group block h-full">
                  <motion.div
                    className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--gray-200)] h-full relative overflow-hidden transition-colors hover:border-[var(--primary-light)]"
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: -4,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                          }
                    }
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    {/* Left accent border on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    <motion.div
                      className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors duration-300"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <svg
                        className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={service.icon}
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFadeUp}
          >
            <Link
              href="/services"
              className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-bold text-lg transition-colors group"
            >
              View All Services
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE FLY HVAC
          Pattern 106: Alternating Split Panel
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Benefits */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
              }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-[var(--gray-900)] mb-6 tracking-tight"
                variants={motionFadeLeft}
              >
                Why Houston Homeowners Choose FLY HVAC
              </motion.h2>
              <motion.p
                className="text-lg text-[var(--gray-600)] mb-10 leading-relaxed"
                variants={motionFadeLeft}
              >
                When Randy Fly founded FLY HVAC, he made one commitment: treat
                every home like it&apos;s your own. That philosophy has earned us a
                perfect 5.0 Google rating and the trust of families across the
                Houston metro.
              </motion.p>
              <div className="space-y-6">
                {benefits.map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 group"
                    variants={motionFadeLeft}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-300">
                      <svg
                        className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--gray-900)] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Rating Card with Reviews */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={motionFadeRight}
            >
              <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl p-10 text-white">
                <motion.div
                  className="text-center mb-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={motionContainer}
                >
                  <motion.p
                    className="text-6xl font-extrabold mb-2"
                    variants={motionChild}
                  >
                    5.0
                  </motion.p>
                  <motion.div
                    className="flex justify-center gap-1 mb-3"
                    variants={motionChild}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-6 h-6 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </motion.div>
                  <motion.p className="text-blue-200 text-sm" variants={motionChild}>
                    Based on 62+ Google Reviews
                  </motion.p>
                </motion.div>

                {/* Testimonial Carousel */}
                <TestimonialCarousel />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════ */}
      <motion.section
        className="bg-[var(--accent)] py-16 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={motionContainer}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            variants={motionFadeUp}
          >
            Ready for Reliable HVAC Service?
          </motion.h2>
          <motion.p
            className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto"
            variants={motionFadeUp}
          >
            Whether you need an emergency repair or a complete system
            replacement, FLY HVAC is here for you. Call now for a free quote or
            schedule online.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={motionFadeUp}
          >
            <motion.a
              href="tel:832-605-6239"
              className="inline-flex items-center justify-center bg-white text-[var(--accent-dark)] font-bold py-4 px-8 rounded-lg text-lg hover:bg-orange-50 transition-colors shadow-lg"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call (832) 605-6239
            </motion.a>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white/10 transition-colors w-full"
              >
                Schedule Online
              </Link>
            </motion.div>
          </motion.div>
          <motion.p
            className="text-sm text-orange-200 mt-6"
            variants={motionFadeUp}
          >
            Financing available through Synchrony &mdash;{" "}
            <a
              href="https://mysynchrony.com/mmc/M9223950300"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Apply Now
            </a>
          </motion.p>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SERVICE AREA
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={motionContainer}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-[var(--gray-900)] mb-4 tracking-tight"
              variants={motionFadeUp}
            >
              Serving the Greater Houston Metro
            </motion.h2>
            <motion.p
              className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto"
              variants={motionFadeUp}
            >
              FLY HVAC proudly serves Houston and surrounding communities across
              Harris, Fort Bend, and Brazoria counties.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={motionContainer}
          >
            {serviceAreas.map((area) => (
              <motion.div key={area} variants={motionChild}>
                <Link
                  href="/service-areas"
                  className="inline-block bg-white px-5 py-2.5 rounded-full text-sm font-medium text-[var(--gray-700)] border border-[var(--gray-200)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-sm transition-all duration-200"
                >
                  {area}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFadeUp}
          >
            <Link
              href="/service-areas"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-bold transition-colors"
            >
              View All Service Areas &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FLOATING MOBILE CTA
          Pattern 303: Scroll-direction aware
          ═══════════════════════════════════════════ */}
      <FloatingCTA />
    </>
  );
}
