import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Mail,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  RotateCcw,
  ExternalLink,
  User2,
  Users,
  GraduationCap,
  Briefcase,
  FolderDown,
  Languages,
  Info,
  Menu,
  X,
  Lock,
  Share2,
  Globe,
  MessageCircle,
} from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    :root {
      color-scheme: light;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --bg: #F8FAFC;
      --surface: #ffffff;
      --surface-soft: #ECFDF5;
      --text: #111827;
      --muted: #4B5563;
      --border: #E5E7EB;
      --primary: #0F766E;
      --primary-soft: rgba(20, 184, 166, 0.12);
      --accent: #14B8A6;
      --accent-soft: rgba(20, 184, 166, 0.08);
      --shadow: 0 30px 80px rgba(15, 118, 110, 0.08);
      --shadow-soft: 0 12px 30px rgba(15, 118, 110, 0.08);
      --radius: 28px;
    }
    .nala-root {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
    }
    .nala-focus:focus-visible {
      outline: 3px solid rgba(20, 184, 166, 0.35);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      .nala-root * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
);

const STR = {
  en: {
    tagline: "Nala Thittam · Benefit discovery simplified",
    brandTag: "Find the schemes and certificates that matter to you",
    heroHeadline: "Find Every Government Benefit You're Eligible For",
    heroText:
      "Stop searching hundreds of government websites. Answer a few questions and instantly discover scholarships, reservations, welfare schemes, certificates and subsidies available for you.",
    heroCta: "Check Eligibility",
    heroSecondary: "Learn More",
    welcomeBack: "Welcome back",
    continueProfile: "Continue with your profile",
    eligibilityTitle: "Verified welfare schemes",
    eligibilitySubtitle: "Explore schemes by sector with clear criteria and official links.",
    locatorTitle: "Find your nearest e-Sevai centre",
    locatorSubtitle: "Select a taluk to view the closest support hub and standard service fees.",
    feesTitle: "Standard government service charges",
    feesSubtitle: "These are the commonly applied fees at Tamil Nadu e-Sevai centres.",
    loaderAlt: "Loading content...",
    featuresTitle: "Capabilities",
    featuresSubtitle: "A cleaner path to discover the support you can access.",
    howTitle: "How it works",
    howSubtitle: "A guided journey from profile details to action-ready outcomes.",
    navHome: "Home",
    navFeatures: "Features",
    navHow: "How it Works",
    navAbout: "About",
    navContact: "Contact",
    navLogin: "Login",
    signInTitle: "Sign in to discover your benefits",
    signInSubtitle: "Start with your email and continue with DigiLocker or Google for a faster flow.",
    emailLabel: "Email address",
    passwordLabel: "Password (optional)",
    continueBtn: "Continue",
    digilockerBtn: "Continue with DigiLocker",
    googleBtn: "Continue with Google",
    orText: "or",
    emailError: "Enter a valid email address.",
    demoNote: "Demo mode — no real authentication is performed.",
    stepOf: "Step",
    of: "of",
    stepTitles: [
      "Personal Basics",
      "Social & Community",
      "Education Profile",
      "Employment & Family Economic Status",
    ],
    back: "Back",
    next: "Next",
    checkForMe: "Check For Me",
    loaderTitle: "Analyzing your profile...",
    loaderSubtitle: "Matching your answers to active schemes and certificates",
    fields: {
      fullName: "Full Name",
      dob: "Date of Birth",
      gender: "Gender",
      locationType: "Location Type",
      community: "Community Category",
      religion: "Religion",
      education: "Current Education Level",
      firstGen: "First Generation Graduate?",
      firstGenNote: "First degree holder in the entire family",
      occupation: "Your Occupation",
      fatherOcc: "Father's Occupation",
      motherOcc: "Mother's Occupation",
      farmerFamily: "Farmer Family?",
      income: "Annual Family Income",
    },
    placeholders: {
      fullName: "e.g. Meena Kumari",
      community: "Select community category",
      religion: "Select religion",
      education: "Select education level",
      occupation: "Select occupation",
      fatherOcc: "e.g. Farmer",
      motherOcc: "e.g. Homemaker",
      income: "Select income range",
    },
    yes: "Yes",
    no: "No",
    reportTitle: "Your Eligibility Report",
    reportSubtitle: "Based on the details you shared — here's the full picture of what you can act on.",
    panelA: "Your Applicable Certificates",
    panelB: "Eligible Schemes & Scholarships",
    panelC: "Schemes You're Close to, But Currently Ineligible For",
    panelCSub: "Missing eligibility tracker — exactly what's holding each one back.",
    eligible: "Eligible",
    partial: "Partially Eligible",
    ineligible: "Not Eligible",
    applyVia: "Apply via e-Service",
    startOver: "Start Over",
    noSchemes: "No specific scheme matches were found for this profile yet — new options arrive regularly.",
    noGaps: "No major gaps found — you already qualify for the schemes we track for this profile.",
    reasonLabel: "Reason",
    footerAbout: "About",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms",
    footerContact: "Contact",
    disclaimer:
      "Nala Thittam is an independent scheme discovery platform and is not affiliated with the Government of Tamil Nadu or Government of India.",
    copyright: "© 2026 Nala Thittam. All rights reserved.",
    contactEmail: "hello@nala.thittam",
  },
  ta: {
    tagline: "Nala Thittam · Benefit discovery simplified",
    brandTag: "Find the schemes and certificates that matter to you",
    heroHeadline: "Find Every Government Benefit You're Eligible For",
    heroText:
      "Stop searching hundreds of government websites. Answer a few of questions and instantly discover scholarships, reservations, welfare schemes, certificates and subsidies available for you.",
    heroCta: "Check Eligibility",
    heroSecondary: "Learn More",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    continueProfile: "உங்கள் சுயவிவரத்துடன் தொடரவும்",
    eligibilityTitle: "சரிபார்க்கப்பட்ட நலத்திட்டங்கள்",
    eligibilitySubtitle: "தெளிவான தகுதிகள் மற்றும் அதிகாரப்பூர்வ இணைப்புகளுடன் துறைகளின் அடிப்படையில் திட்டங்களை ஆராயுங்கள்.",
    locatorTitle: "உங்களின் அருகிலுள்ள e-Sevai மையத்தைக் கண்டறியுங்கள்",
    locatorSubtitle: "ஒரு தாலுக்கைத் தேர்ந்தெடுத்து, அருகிலுள்ள ஆதரவு மையம் மற்றும் நிலையான கட்டணங்களைப் பார்க்கவும்.",
    feesTitle: "நிலையான அரசாங்க சேவை கட்டணங்கள்",
    feesSubtitle: "இவை தமிழ்நாடு e-Sevai மையங்களில் பொதுவாக வசூலிக்கப்படும் கட்டணங்கள்.",
    loaderAlt: "உள்ளடக்கம் ஏற்றப்படுகிறது...",
    featuresTitle: "திறன்கள்",
    featuresSubtitle: "நீங்கள் பயன்படுத்தக்கூடிய ஆதரவை கண்டறிய ஒரு தெளிவான பாதை.",
    howTitle: "இது எப்படி செயல்படுகிறது",
    howSubtitle: "சுயவிவர விவரங்களிலிருந்து செயல்பாட்டு முடிவுகளுக்கு ஒரு வழிகாட்டும் பயணம்.",
    navHome: "முகப்பு",
    navFeatures: "Features",
    navHow: "How it Works",
    navAbout: "About",
    navContact: "Contact",
    navLogin: "Login",
    signInTitle: "Sign in to discover your benefits",
    signInSubtitle: "Start with your email and continue with DigiLocker or Google for a faster flow.",
    emailLabel: "Email address",
    passwordLabel: "Password (optional)",
    continueBtn: "Continue",
    digilockerBtn: "Continue with DigiLocker",
    googleBtn: "Continue with Google",
    orText: "or",
    emailError: "Enter a valid email address.",
    demoNote: "Demo mode — no real authentication is performed.",
    stepOf: "Step",
    of: "of",
    stepTitles: [
      "Personal Basics",
      "Social & Community",
      "Education Profile",
      "Employment & Family Economic Status",
    ],
    back: "Back",
    next: "Next",
    checkForMe: "Check For Me",
    loaderTitle: "Analyzing your profile...",
    loaderSubtitle: "Matching your answers to active schemes and certificates",
    fields: {
      fullName: "Full Name",
      dob: "Date of Birth",
      gender: "Gender",
      locationType: "Location Type",
      community: "Community Category",
      religion: "Religion",
      education: "Current Education Level",
      firstGen: "First Generation Graduate?",
      firstGenNote: "First degree holder in the entire family",
      occupation: "Your Occupation",
      fatherOcc: "Father's Occupation",
      motherOcc: "Mother's Occupation",
      farmerFamily: "Farmer Family?",
      income: "Annual Family Income",
    },
    placeholders: {
      fullName: "e.g. Meena Kumari",
      community: "Select community category",
      religion: "Select religion",
      education: "Select education level",
      occupation: "Select occupation",
      fatherOcc: "e.g. Farmer",
      motherOcc: "e.g. Homemaker",
      income: "Select income range",
    },
    yes: "Yes",
    no: "No",
    reportTitle: "Your Eligibility Report",
    reportSubtitle: "Based on the details you shared — here's the full picture of what you can act on.",
    panelA: "Your Applicable Certificates",
    panelB: "Eligible Schemes & Scholarships",
    panelC: "Schemes You're Close to, But Currently Ineligible For",
    panelCSub: "Missing eligibility tracker — exactly what's holding each one back.",
    eligible: "Eligible",
    partial: "Partially Eligible",
    ineligible: "Not Eligible",
    applyVia: "Apply via e-Service",
    startOver: "Start Over",
    noSchemes: "No specific scheme matches were found for this profile yet — new options arrive regularly.",
    noGaps: "No major gaps found — you already qualify for the schemes we track for this profile.",
    reasonLabel: "Reason",
    footerAbout: "About",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms",
    footerContact: "Contact",
    disclaimer:
      "Nala Thittam is an independent scheme discovery platform and is not affiliated with the Government of Tamil Nadu or Government of India.",
    copyright: "© 2026 Nala Thittam. All rights reserved.",
    contactEmail: "hello@nala.thittam",
  },
};

/* ------------------------------------------------------------------ */
/*  FORM OPTIONS & INITIAL DATA                                        */
/* ------------------------------------------------------------------ */
const GENDER_OPTIONS = [
  { value: "Male", en: "Male", ta: "ஆண்" },
  { value: "Female", en: "Female", ta: "பெண்" },
  { value: "Transgender", en: "Transgender", ta: "திருநங்கை" },
];
const LOCATION_OPTIONS = [
  { value: "Rural", en: "Rural", ta: "கிராமப்புறம்" },
  { value: "Urban", en: "Urban", ta: "நகர்ப்புறம்" },
];
const COMMUNITY_OPTIONS = [
  { value: "General", en: "General", ta: "பொது" },
  { value: "BC", en: "BC", ta: "பிசி" },
  { value: "MBC", en: "MBC", ta: "எம்பிசி" },
  { value: "SC", en: "SC", ta: "எஸ்சி" },
  { value: "ST", en: "ST", ta: "எஸ்டி" },
];
const RELIGION_OPTIONS = [
  { value: "Hindu", en: "Hindu", ta: "இந்து" },
  { value: "Christian", en: "Christian", ta: "கிறிஸ்தவர்" },
  { value: "Muslim", en: "Muslim", ta: "முஸ்லிம்" },
  { value: "Sikh", en: "Sikh", ta: "சீக்கியர்" },
  { value: "Jain", en: "Jain", ta: "ஜைனர்" },
  { value: "Others", en: "Others", ta: "மற்றவை" },
];
const EDUCATION_OPTIONS = [
  { value: "Below 10th", en: "Below 10th", ta: "10ஆம் வகுப்புக்கு கீழ்" },
  { value: "10th Pass", en: "10th Pass", ta: "10ஆம் வகுப்பு தேர்ச்சி" },
  { value: "12th Pass", en: "12th Pass", ta: "12ஆம் வகுப்பு தேர்ச்சி" },
  { value: "UG", en: "UG", ta: "இளங்கலை" },
  { value: "PG", en: "PG", ta: "முதுகலை" },
  { value: "Above PG", en: "Above PG", ta: "முதுகலைக்கு மேல்" },
];
const OCCUPATION_OPTIONS = [
  { value: "Student", en: "Student", ta: "மாணவர்" },
  { value: "Unemployed", en: "Unemployed", ta: "வேலையில்லாதவர்" },
  { value: "Working (Govt)", en: "Working (Govt)", ta: "அரசு பணி" },
  { value: "Working (Pvt)", en: "Working (Pvt)", ta: "தனியார் பணி" },
  { value: "Self-Employed", en: "Self-Employed", ta: "சுயதொழில்" },
  { value: "Weaver", en: "Weaver", ta: "நூலணி" },
  { value: "Local/Daily Wage Worker", en: "Local/Daily Wage Worker", ta: "தினக்கூலி தொழிலாளி" },
];
const INCOME_OPTIONS = [
  { value: "Below ₹1 Lakh", en: "Below ₹1 Lakh", ta: "₹1 லட்சத்திற்கு கீழ்" },
  { value: "₹1 Lakh - ₹2.5 Lakhs", en: "₹1 Lakh - ₹2.5 Lakhs", ta: "₹1 - ₹2.5 லட்சம்" },
  { value: "₹2.5 Lakhs - ₹5 Lakhs", en: "₹2.5 Lakhs - ₹5 Lakhs", ta: "₹2.5 - ₹5 லட்சம்" },
  { value: "Above ₹5 Lakhs", en: "Above ₹5 Lakhs", ta: "₹5 லட்சத்திற்கு மேல்" },
];

const createEmptyForm = () => ({
  fullName: "",
  dob: "",
  gender: "",
  locationType: "",
  community: "",
  religion: "",
  education: "",
  firstGen: "",
  occupation: "",
  fatherOcc: "",
  motherOcc: "",
  farmerFamily: "",
  income: "",
  taluk: "",
  schooling: "",
  vehicleOwnership: "",
  electricityUnits: "",
});

const createDigiLockerSample = () => ({
  fullName: "Karthika R",
  dob: "2003-06-14",
  gender: "Female",
  locationType: "Rural",
  community: "MBC",
  religion: "Hindu",
  education: "UG",
  firstGen: "Yes",
  occupation: "Student",
  fatherOcc: "Farmer",
  motherOcc: "Homemaker",
  farmerFamily: "Yes",
  income: "₹1 Lakh - ₹2.5 Lakhs",
  taluk: "Chengalpattu",
  schooling: "12th Pass",
  vehicleOwnership: "No",
  electricityUnits: "2400",
});

const STEP_REQUIRED_FIELDS = [
  ["fullName", "dob", "gender", "locationType"],
  ["community", "religion"],
  ["education", "firstGen"],
  ["occupation", "farmerFamily", "income"],
];

const FEATURE_LIST = [
  {
    title: "Personalized matching",
    description: "Understand which scholarships, certificates and subsidies you are eligible for in minutes.",
    icon: Sparkles,
  },
  {
    title: "One streamlined form",
    description: "Answer a few smart questions instead of visiting multiple government sites.",
    icon: Check,
  },
  {
    title: "Improved preparation",
    description: "See the certificates and documents you need before you apply.",
    icon: FileCheck2,
  },
  {
    title: "Instant recommendations",
    description: "Get a clear list of eligible schemes and partial matches to act on next.",
    icon: ShieldCheck,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Answer the questions",
    description: "Provide your profile details through a fast, guided form.",
    icon: User2,
  },
  {
    step: "02",
    title: "Review your eligibility",
    description: "See which schemes, certificates and scholarships fit your profile.",
    icon: Users,
  },
  {
    step: "03",
    title: "Act with confidence",
    description: "Use the tailored next steps to prepare documents and apply.",
    icon: GraduationCap,
  },
];

const ELIGIBILITY_CATEGORIES = [
  "All",
  "Agriculture",
  "Weavers, Artisans & Micro-Entrepreneurs",
  "Education, Higher Studies & Youth Development",
  "Women, Health & Social Security Infrastructure",
];

const ELIGIBILITY_SCHEMES = [
  {
    id: "pm-kisan",
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    eligibilityCriteria: [
      "Must be a land-holding farmer household.",
      "Must own cultivable land assets.",
      "Institutional landowners and salaried income taxpayers are excluded.",
    ],
    benefits: "Direct income support for eligible farmer households.",
    officialLink: "https://pmkisan.gov.in/",
  },
  {
    id: "kalignar-agri-dev",
    title: "Kalaignar All Village Integrated Agricultural Development Programme",
    category: "Agriculture",
    eligibilityCriteria: [
      "Residents of designated Tamil Nadu village panchayats.",
      "Actively engaged in farming or agricultural labour operations.",
    ],
    benefits: "Supports village-level agricultural development and fallow-land initiatives.",
    officialLink: "https://www.tn.gov.in/",
  },
  {
    id: "handloom-weavers-comprehensive-welfare",
    title: "Handloom Weavers Comprehensive Welfare Scheme",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: [
      "Age between 18 and 60 years.",
      "Active handloom weaver or allied worker residing in Tamil Nadu.",
    ],
    benefits: "Health cover and welfare support for active handloom workers.",
    officialLink: "https://www.indiafilings.com/learn/handloom-weavers-comprehensive-welfare-scheme",
  },
  {
    id: "weavers-mudra-scheme",
    title: "Weavers Mudra Scheme (WMS)",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: [
      "Individual handloom weavers, master weavers or weaver entrepreneurs.",
      "Members of SHGs or cooperative societies engaged in textile execution.",
    ],
    benefits: "Low-cost credit and business loan support for textile enterprises.",
    officialLink: "https://www.jansamarth.in/business-loan-weavers-mudra-scheme",
  },
  {
    id: "pm-vishwakarma",
    title: "PM Vishwakarma Yojana",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: [
      "Minimum age of 18.",
      "Traditional artisan or craftsperson working with hands and tools.",
      "One member per family can avail the benefit.",
    ],
    benefits: "Support for traditional artisans across recognised trades.",
    officialLink: "https://pmvishwakarma.gov.in/",
  },
  {
    id: "pudhumai-penn",
    title: "Pudhumai Penn Scheme",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: [
      "Must be a female student enrolled in higher education in Tamil Nadu.",
      "Must have studied from Class 6 to Class 12 in government-run schools.",
    ],
    benefits: "Financial assistance for women pursuing higher education.",
    officialLink: "https://pudhumaippenn.tn.gov.in",
  },
  {
    id: "pm-vidyalaxmi",
    title: "PM Vidyalaxmi Scheme",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: [
      "Indian national with admission to a recognized higher education course.",
      "Admission secured via merit-based selection.",
    ],
    benefits: "Education loan support and academic advancement assistance.",
    officialLink: "https://www.vidyalakshmi.co.in/",
  },
  {
    id: "naanmudhalvan",
    title: "Naan Mudhalvan Skill Initiative",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: [
      "Youth or college students in Tamil Nadu.",
      "Pursuing engineering, arts, science or polytechnic courses.",
    ],
    benefits: "Industry-aligned upskilling modules and career pathways.",
    officialLink: "https://www.naanmudhalvan.tn.gov.in",
  },
  {
    id: "kalignar-magalir-urimai",
    title: "Kalaignar Magalir Urimai Thogai",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: [
      "Female head of family.",
      "Age above 21 years.",
      "Annual household income below ₹2,50,000.",
      "No four-wheeler vehicle ownership.",
    ],
    benefits: "Direct support for women-led households and social security coverage.",
    officialLink: "https://www.tnesevai.tn.gov.in",
  },
  {
    id: "pm-matru-vandana",
    title: "Pradhan Mantri Matru Vandana Yojana",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: [
      "Pregnant women or lactating mothers for the first child.",
      "Age 19 years or older.",
      "Not employed by Central or State Government or PSUs.",
    ],
    benefits: "Maternity support and cash assistance for first-child mothers.",
    officialLink: "https://wcd.nic.in/",
  },
  {
    id: "cmchis",
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: [
      "Legal resident of Tamil Nadu.",
      "Annual household income below ₹1,20,000.",
    ],
    benefits: "Cashless hospitalisation and health insurance coverage for eligible families.",
    officialLink: "https://www.cmchistn.com/",
  },
];

function EligibilitySection({ schemes, t }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleSchemes = activeCategory === "All" ? schemes : schemes.filter((scheme) => scheme.category === activeCategory);

  return (
    <section className="content-section eligibility-section" id="eligibility">
      <div className="section-header">
        <span className="section-eyebrow">{t.eligibilityTitle}</span>
        <h2>{t.eligibilityTitle}</h2>
        <p>{t.eligibilitySubtitle}</p>
      </div>

      <div className="filter-row">
        {ELIGIBILITY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-pill ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="scheme-grid">
        {visibleSchemes.map((scheme) => (
          <article key={scheme.id} className="scheme-card">
            <div className="scheme-card-head">
              <div>
                <strong>{scheme.title}</strong>
                <p className="scheme-category">{scheme.category}</p>
              </div>
            </div>
            <div className="scheme-details">
              <h4>Eligibility</h4>
              <ul>
                {scheme.eligibilityCriteria.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="scheme-benefits"><strong>Benefits:</strong> {scheme.benefits}</p>
            </div>
            <a className="scheme-link" href={scheme.officialLink} target="_blank" rel="noreferrer">
              Official scheme details
              <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <div className="logo-mark" aria-hidden="true">
      NT
    </div>
  );
}

function Header({ t, onNavigate, onLogin, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleItem = (section) => {
    setMenuOpen(false);
    onNavigate(section);
  };

  return (
    <header className="header">
      <div className="page-shell header-inner">
        <div className="brand-row">
          <div className="brand-logo-row">
            <LogoMark />
            <div>
              <div className="brand-title">Nala Thittam</div>
              <div className="brand-subtitle">{t.brandTag}</div>
            </div>
          </div>
          <button
            type="button"
            className="mobile-menu-button nala-focus"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <button type="button" className="nav-link" onClick={() => handleItem("home")}>{t.navHome}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("features")}>{t.navFeatures}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("how")}>{t.navHow}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("about")}>{t.navAbout}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("contact")}>{t.navContact}</button>
          <button type="button" className="nav-link nav-login" onClick={() => { setMenuOpen(false); onLogin(); }}>{t.navLogin}</button>
          <button type="button" className="language-toggle nala-focus" onClick={() => setLang((value) => !value)}> {lang ? "தமிழ்" : "EN"} </button>
        </nav>
      </div>
    </header>
  );
}

function LandingPage({ t, onContinue, onDigiLocker, onGoogle, onScrollToLogin, onLearnMore }) {
  const handleContinue = () => onContinue();

  return (
    <main className="landing-page">
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <span className="eyebrow">Fast benefits. Clear next steps.</span>
          <h1>{t.heroHeadline}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary button-large nala-focus" onClick={onContinue}>
              {t.heroCta}
            </button>
            <button type="button" className="button button-secondary button-large nala-focus" onClick={onLearnMore}>
              {t.heroSecondary}
            </button>
          </div>
          <div className="hero-footnote">
            <div>
              <strong>4x faster</strong> than searching government portals manually.
            </div>
            <div>
              <strong>One place</strong> for certificates, scholarships and welfare eligibility.
            </div>
          </div>
        </div>

        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <p className="hero-card-label">{t.welcomeBack}</p>
                <h2>{t.continueProfile}</h2>
              </div>
              <ShieldCheck size={24} color="#0F766E" />
            </div>

            <div className="auth-form auth-form-simple">
              <div className="form-actions">
                <button type="button" className="button button-primary button-full nala-focus" onClick={handleContinue}>
                  {t.continueBtn}
                </button>
              </div>

              <div className="divider-line">
                <span>{t.orText}</span>
              </div>

              <button type="button" className="button button-outline button-full nala-focus" onClick={onDigiLocker}>
                <FolderDown size={18} />
                {t.digilockerBtn}
              </button>
              <button type="button" className="button button-ghost button-full nala-focus" onClick={onGoogle}>
                <img className="provider-icon" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google logo" />
                {t.googleBtn}
              </button>
              <p className="auth-note">{t.demoNote}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="content-section" id="features">
        <div className="section-header">
          <span className="section-eyebrow">Capabilities</span>
          <h2>{t.featuresTitle}</h2>
          <p>{t.featuresSubtitle}</p>
        </div>
        <div className="feature-grid">
          {FEATURE_LIST.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                className="feature-card"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="feature-icon">
                  <FeatureIcon size={20} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="content-section" id="how">
        <div className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h2>{t.howTitle}</h2>
          <p>{t.howSubtitle}</p>
        </div>
        <div className="steps-grid">
          {HOW_IT_WORKS.map((item) => {
            const StepIcon = item.icon;
            return (
              <motion.div key={item.step} className="step-card" whileHover={{ scale: 1.02 }}>
                <div className="step-number">{item.step}</div>
                <div className="step-icon">
                  <StepIcon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <EligibilitySection schemes={ELIGIBILITY_SCHEMES} t={t} />

      <section className="content-section about-section" id="about">
        <div>
          <span className="section-eyebrow">About Nala Thittam</span>
          <h2>Built to make scheme discovery simple and reliable.</h2>
          <p>
            Nala Thittam helps individuals find the government programs, scholarships and welfare certificates they qualify
            for without the noise of multiple portals and confusing eligibility rules.
          </p>
        </div>
        <div className="about-cards">
          <div className="about-card">
            <h3>Designed for clarity</h3>
            <p>Clean guidance and eligibility scoring helps you understand what matters most.</p>
          </div>
          <div className="about-card">
            <h3>Action-oriented</h3>
            <p>See eligibility status, required documents and the next steps to apply.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgressBar({ t, step }) {
  return (
    <div className="progress-shell">
      <div className="progress-bar">
        {[0, 1, 2, 3].map((index) => {
          const completed = index < step;
          const active = index === step;
          return (
            <div key={index} className="progress-step">
              <div className={`progress-dot ${completed ? "completed" : active ? "active" : ""}`}>
                {completed ? <Check size={12} /> : index + 1}
              </div>
              {index < 3 ? <div className={`progress-line ${completed ? "completed" : ""}`} /> : null}
            </div>
          );
        })}
      </div>
      <p className="progress-label">
        {t.stepOf} {step + 1} {t.of} {4} · {t.stepTitles[step]}
      </p>
    </div>
  );
}

function localize(options, lang) {
  return options.map((option) => ({ value: option.value, label: lang === "ta" ? option.ta : option.en }));
}

function Step1({ t, lang, data, set }) {
  return (
    <div className="step-fields">
      <div className="field-block">
        <label>{t.fields.fullName}</label>
        <input autoComplete="off" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={t.placeholders.fullName} />
      </div>
      <div className="field-block">
        <label>{t.fields.dob}</label>
        <input autoComplete="off" type="date" value={data.dob} onChange={(e) => set("dob", e.target.value)} />
      </div>
      <div className="field-block">
        <label>{t.fields.gender}</label>
        <div className="button-grid">
          {localize(GENDER_OPTIONS, lang).map((opt) => (
            <button type="button" key={opt.value} className={`choice-button ${data.gender === opt.value ? "selected" : ""}`} onClick={() => set("gender", opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="field-block">
        <label>{t.fields.locationType}</label>
        <div className="button-grid two-col">
          {localize(LOCATION_OPTIONS, lang).map((opt) => (
            <button type="button" key={opt.value} className={`choice-button ${data.locationType === opt.value ? "selected" : ""}`} onClick={() => set("locationType", opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ t, lang, data, set }) {
  return (
    <div className="step-fields">
      <div className="field-block">
        <label>{t.fields.community}</label>
        <select value={data.community} onChange={(e) => set("community", e.target.value)}>
          <option value="">{t.placeholders.community}</option>
          {localize(COMMUNITY_OPTIONS, lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field-block">
        <label>{t.fields.religion}</label>
        <select value={data.religion} onChange={(e) => set("religion", e.target.value)}>
          <option value="">{t.placeholders.religion}</option>
          {localize(RELIGION_OPTIONS, lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Step3({ t, lang, data, set }) {
  return (
    <div className="step-fields">
      <div className="field-block">
        <label>{t.fields.education}</label>
        <select value={data.education} onChange={(e) => set("education", e.target.value)}>
          <option value="">{t.placeholders.education}</option>
          {localize(EDUCATION_OPTIONS, lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field-block">
        <label>{t.fields.firstGen}</label>
        <div className="toggle-grid">
          {[
            { value: "Yes", label: t.yes },
            { value: "No", label: t.no },
          ].map((option) => (
            <button type="button" key={option.value} className={`choice-button ${data.firstGen === option.value ? "selected" : ""}`} onClick={() => set("firstGen", option.value)}>
              {option.label}
            </button>
          ))}
        </div>
        <p className="field-note">{t.fields.firstGenNote}</p>
      </div>
    </div>
  );
}

function Step4({ t, lang, data, set }) {
  return (
    <div className="step-fields">
      <div className="field-block">
        <label>{t.fields.occupation}</label>
        <select value={data.occupation} onChange={(e) => set("occupation", e.target.value)}>
          <option value="">{t.placeholders.occupation}</option>
          {localize(OCCUPATION_OPTIONS, lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="dual-fields">
        <div className="field-block">
          <label>{t.fields.fatherOcc}</label>
          <input autoComplete="off" value={data.fatherOcc} onChange={(e) => set("fatherOcc", e.target.value)} placeholder={t.placeholders.fatherOcc} />
        </div>
        <div className="field-block">
          <label>{t.fields.motherOcc}</label>
          <input autoComplete="off" value={data.motherOcc} onChange={(e) => set("motherOcc", e.target.value)} placeholder={t.placeholders.motherOcc} />
        </div>
      </div>
      <div className="field-block">
        <label>{t.fields.farmerFamily}</label>
        <div className="toggle-grid">
          {[
            { value: "Yes", label: t.yes },
            { value: "No", label: t.no },
          ].map((option) => (
            <button type="button" key={option.value} className={`choice-button ${data.farmerFamily === option.value ? "selected" : ""}`} onClick={() => set("farmerFamily", option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="field-block">
        <label>{t.fields.income}</label>
        <select value={data.income} onChange={(e) => set("income", e.target.value)}>
          <option value="">{t.placeholders.income}</option>
          {localize(INCOME_OPTIONS, lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function isStepComplete(step, data) {
  return STEP_REQUIRED_FIELDS[step].every((key) => data[key]);
}

function GuidedForm({ t, lang, data, setData, onSubmit }) {
  const [step, setStep] = useState(0);
  const set = (key, value) => setData((current) => ({ ...current, [key]: value }));
  const StepComp = [Step1, Step2, Step3, Step4][step];
  const complete = isStepComplete(step, data);
  const isLast = step === 3;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="form-section">
      <div className="page-shell">
        <div className="form-frame">
          <ProgressBar t={t} step={step} />
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="form-panel"
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <StepComp t={t} lang={lang} data={data} set={set} />
              <div className="form-actions">
                <button type="button" className="button button-outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
                  <ArrowLeft size={16} /> {t.back}
                </button>
                {!isLast ? (
                  <button type="button" className="button button-primary" onClick={() => setStep((current) => current + 1)} disabled={!complete}>
                    {t.next} <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="button button-primary" disabled={!complete}>
                    <Sparkles size={16} /> {t.checkForMe}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CatLoader({ t }) {
  return (
    <section className="loader-section">
      <div className="loader-shell">
        <div className="loader-graphic" aria-hidden="true">
          <img src="/assets/cat-playing-ball.gif" alt={t.loaderAlt} className="loader-image w-48 h-48 mx-auto" />
        </div>
        <div className="loader-copy">
          <p>{t.loaderTitle}</p>
          <span>{t.loaderSubtitle}</span>
        </div>
      </div>
    </section>
  );
}

function buildCertificates(d) {
  const list = [{ name: "Nativity / Residence Certificate", note: "Required as base proof for government scheme applications." }];
  if (d.community && d.community !== "General") {
    list.push({ name: "Community Certificate", note: `Confirms your ${d.community} category status for reserved-quota benefits.` });
  }
  if (d.income) {
    list.push({ name: "Income Certificate", note: "Needed to verify family income slab for scholarships & subsidies." });
  }
  if (d.firstGen === "Yes") {
    list.push({ name: "First Graduate Certificate", note: "Certifies you as the first degree-holder in your family." });
  }
  if (d.farmerFamily === "Yes") {
    list.push({ name: "Farmer ID Card (Kisan)", note: "Required for agriculture insurance & farmer welfare benefits." });
  }
  if (d.occupation === "Unemployed" || d.occupation === "Student") {
    list.push({ name: "Unemployment Card (Employment Office)", note: "Helpful for stipend & skill-training scheme applications." });
  }
  if (d.gender === "Transgender") {
    list.push({ name: "Transgender Welfare Identity Card", note: "Unlocks dedicated welfare benefits." });
  }
  return list;
}

const isReservedCommunity = (d) => ["BC", "MBC", "SC", "ST"].includes(d.community);
const isLowIncome = (d) => d.income === "Below ₹1 Lakh" || d.income === "₹1 Lakh - ₹2.5 Lakhs";
const isMidIncome = (d) => isLowIncome(d) || d.income === "₹2.5 Lakhs - ₹5 Lakhs";
const isSchoolLevel = (d) => ["Below 10th", "10th Pass", "12th Pass"].includes(d.education);
const isStudentLevel = (d) => ["12th Pass", "UG", "PG"].includes(d.education);

const SCHEME_DEFS = [
  {
    id: "pm-kisan",
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    authority: "Central",
    minAge: 18,
    maxAge: 60,
    maxIncome: 150000,
    requiredOccupation: ["Farmer", "Self-Employed"],
    requiredFarmerFamily: true,
    requiredDocuments: ["Landholding certificate", "Aadhaar card"],
    officialLink: "https://pmkisan.gov.in/",
  },
  {
    id: "kalignar-agri-dev",
    title: "Kalaignar All Village Integrated Agricultural Development Programme",
    category: "Agriculture",
    authority: "State",
    minAge: 18,
    maxAge: 60,
    maxIncome: 200000,
    requiredOccupation: ["Farmer", "Self-Employed"],
    requiredFarmerFamily: true,
    requiredDocuments: ["Farmer ID", "Income Certificate"],
    officialLink: "https://www.tn.gov.in/",
  },
  {
    id: "handloom-weavers-welfare",
    title: "Handloom Weavers Comprehensive Welfare Scheme",
    category: "Weavers Welfare",
    authority: "State",
    minAge: 18,
    maxAge: 50,
    maxIncome: 150000,
    requiredOccupation: ["Weaver"],
    requiredDocuments: ["Ration Card", "Weaver identity proof"],
    officialLink: "https://www.indiafilings.com/learn/handloom-weavers-comprehensive-welfare-scheme",
  },
  {
    id: "weavers-mudra-scheme",
    title: "Weavers Mudra Scheme (WMS)",
    category: "Weavers Welfare",
    authority: "Central",
    requiredOccupation: ["Weaver"],
    requiredApplicantType: ["Individual", "Entrepreneur", "SHG", "Cooperative"],
    requiredDocuments: ["Business plan", "Aadhaar card"],
    officialLink: "https://www.jansamarth.in/business-loan-weavers-mudra-scheme",
  },
  {
    id: "pudhumai-penn",
    title: "Pudhumai Penn Scheme",
    category: "Education",
    authority: "State",
    requiredGender: "Female",
    requiredEducation: ["12th Pass", "UG", "PG"],
    maxIncome: 250000,
    requiredDocuments: ["Community certificate", "Income certificate"],
    officialLink: "https://pudhumaippenn.tn.gov.in",
  },
  {
    id: "pm-vidyalaxmi",
    title: "PM Vidyalaxmi Scheme",
    category: "Education",
    authority: "Central",
    minAge: 18,
    maxAge: 40,
    maxIncome: 200000,
    requiredEducation: ["10th Pass", "12th Pass", "UG", "PG"],
    requiredDocuments: ["Admission proof", "Aadhaar card"],
    officialLink: "https://www.vidyalakshmi.co.in/",
  },
  {
    id: "kalignar-magalir-urimai",
    title: "Kalaignar Magalir Urimai Thogai",
    category: "Pension / Social Security",
    authority: "State",
    requiredGender: "Female",
    maxIncome: 250000,
    requiredResidence: "Rural",
    requiredVehicle: "No",
    requiredElectricityUnits: 3600,
    requiredDocuments: ["Bank passbook", "Aadhaar card"],
    officialLink: "https://www.tnesevai.tn.gov.in",
  },
  {
    id: "pm-matru-vandana",
    title: "Pradhan Mantri Matru Vandana Yojana",
    category: "Pension / Social Security",
    authority: "Central",
    requiredGender: "Female",
    minAge: 19,
    maxAge: 25,
    maxIncome: 200000,
    requiredDocuments: ["Pregnancy certificate", "Bank account proof"],
    officialLink: "https://wcd.nic.in/",
  },
];

function parseIncome(income) {
  if (!income) {
    return null;
  }
  if (income.includes("Below ₹1 Lakh")) {
    return 100000;
  }
  if (income.includes("₹1 Lakh - ₹2.5 Lakhs")) {
    return 250000;
  }
  if (income.includes("₹2.5 Lakhs - ₹5 Lakhs")) {
    return 500000;
  }
  if (income.includes("Above ₹5 Lakhs")) {
    return 600000;
  }
  return null;
}

function calculateAge(dob) {
  if (!dob) {
    return null;
  }
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

function evaluateSchemes(data) {
  return SCHEME_DEFS.map((scheme) => {
    const missing = [];
    const age = calculateAge(data.dob);
    const income = parseIncome(data.income);

    if (scheme.minAge !== undefined && age !== null && age < scheme.minAge) {
      missing.push(`Age must be at least ${scheme.minAge}`);
    }
    if (scheme.maxAge !== undefined && age !== null && age > scheme.maxAge) {
      missing.push(`Age must be between ${scheme.minAge || 0} and ${scheme.maxAge}`);
    }
    if (scheme.maxIncome !== undefined && income !== null && income > scheme.maxIncome) {
      missing.push(`Annual Income must be below ₹${scheme.maxIncome.toLocaleString()}`);
    }
    if (scheme.requiredOccupation && scheme.requiredOccupation.length > 0 && !scheme.requiredOccupation.includes(data.occupation)) {
      missing.push(`Occupation must be ${scheme.requiredOccupation.join(" or ")}`);
    }
    if (scheme.requiredGender && data.gender !== scheme.requiredGender) {
      missing.push(`Gender must be ${scheme.requiredGender}`);
    }
    if (scheme.requiredEducation && scheme.requiredEducation.length > 0 && !scheme.requiredEducation.includes(data.education)) {
      missing.push(`Education must be ${scheme.requiredEducation.join(" or ")}`);
    }
    if (scheme.requiredFarmerFamily && data.farmerFamily !== "Yes") {
      missing.push("Farmer Family status must be Yes");
    }
    if (scheme.requiredResidence && data.locationType !== scheme.requiredResidence) {
      missing.push(`Residence must be ${scheme.requiredResidence}`);
    }
    if (scheme.requiredVehicle && data.vehicleOwnership !== scheme.requiredVehicle) {
      missing.push("Vehicle ownership must be No");
    }
    if (scheme.requiredElectricityUnits !== undefined && data.electricityUnits !== undefined && Number(data.electricityUnits) > scheme.requiredElectricityUnits) {
      missing.push(`Electricity consumption must be under ${scheme.requiredElectricityUnits} units`);
    }

    const tier = missing.length === 0 ? "eligible" : missing.length === 1 ? "partial" : "ineligible";
    return {
      ...scheme,
      tier,
      missing,
      reason: missing.join(". "),
    };
  });
}

function ResultsDashboard({ t, data, onRestart }) {
  const certificates = useMemo(() => buildCertificates(data), [data]);
  const allSchemes = useMemo(() => evaluateSchemes(data), [data]);
  const matched = allSchemes.filter((item) => item.tier === "eligible" || item.tier === "partial");
  const missedOut = allSchemes.filter((item) => item.tier === "ineligible");

  return (
    <section className="results-section">
      <div className="page-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="results-heading">
            <div>
              <p className="eyebrow">Eligibility report</p>
              <h2>{t.reportTitle}</h2>
            </div>
            <p>{t.reportSubtitle}</p>
          </div>

          <EServaiLocator t={t} />

          <div className="results-grid responsive-grid grid-cols-1 w-full p-4 md:grid-cols-2 gap-4 px-6 lg:grid-cols-3 max-w-7xl mx-auto p-8">
            <article className="result-card result-card-surface">
              <div className="result-card-title">
                <FileCheck2 size={20} />
                <h3>{t.panelA}</h3>
              </div>
              <div className="result-list">
                {certificates.map((certificate) => (
                  <div key={certificate.name} className="result-item">
                    <span className="result-dot" />
                    <div>
                      <strong>{certificate.name}</strong>
                      <p>{certificate.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="result-card result-card-surface">
              <div className="result-card-title">
                <Sparkles size={20} />
                <h3>{t.panelB}</h3>
              </div>
              {matched.length === 0 ? (
                <p className="empty-state">{t.noSchemes}</p>
              ) : (
                <div className="grid-two">
                  {matched.map((scheme) => (
                    <div key={scheme.id} className="scheme-card">
                      <div className="scheme-card-head">
                        <strong>{scheme.title}</strong>
                        <span className={`badge ${scheme.tier === "eligible" ? "badge-success" : "badge-warning"}`}>
                          {scheme.tier === "eligible" ? t.eligible : t.partial}
                        </span>
                      </div>
                      <p>{scheme.benefits || scheme.benefit || "Scheme benefits summary"}</p>
                      {scheme.tier === "partial" && scheme.reason ? <p className="scheme-reason">{scheme.reason}</p> : null}
                      <a href={scheme.officialLink} target="_blank" rel="noreferrer" className="link-button">
                        {t.applyVia}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>

          <article className="result-card result-card-soft">
            <div className="result-card-title">
              <XCircle size={20} />
              <h3>{t.panelC}</h3>
            </div>
            <p className="panel-subtitle">{t.panelCSub}</p>
            {missedOut.length === 0 ? (
              <p className="empty-state">{t.noGaps}</p>
            ) : (
              <div className="missed-list">
                {missedOut.map((scheme) => (
                  <div key={scheme.id} className="missed-card">
                    <div className="scheme-card-head">
                      <strong>{scheme.title}</strong>
                      <span className="badge badge-danger">{t.ineligible}</span>
                    </div>
                    <p>{scheme.benefits || scheme.benefit || "Scheme benefits summary"}</p>
                    <p className="scheme-reason">
                      <strong>{t.reasonLabel}:</strong> {scheme.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>

          <div className="results-actions">
            <button type="button" className="button button-outline" onClick={onRestart}>
              <RotateCcw size={16} /> {t.startOver}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EServaiLocator({ t }) {
  const [taluk, setTaluk] = useState("Chennai");
  const talukCenters = {
    Chennai: [
      { name: "Alandur Arasu e-Sevai Centre", address: "Alandur", hours: "9am - 6pm" },
      { name: "Mylapore Arasu e-Sevai Centre", address: "Mylapore", hours: "9am - 6pm" },
    ],
    Chengalpattu: [
      { name: "Tambaram Arasu e-Sevai Centre", address: "Tambaram", hours: "9am - 6pm" },
      { name: "Vandalur Arasu e-Sevai Centre", address: "Vandalur", hours: "9am - 6pm" },
    ],
    Tiruvallur: [
      { name: "Avadi Arasu e-Sevai Centre", address: "Avadi", hours: "9am - 5:30pm" },
      { name: "Poonamallee Arasu e-Sevai Centre", address: "Poonamallee", hours: "9am - 5:30pm" },
    ],
    Erode: [
      { name: "Erode Arasu e-Sevai Centre", address: "Erode Town", hours: "9am - 6pm" },
      { name: "Perundurai Arasu e-Sevai Centre", address: "Perundurai", hours: "9am - 5:30pm" },
    ],
    Coimbatore: [
      { name: "Coimbatore South Arasu e-Sevai Centre", address: "Coimbatore South", hours: "9am - 6pm" },
      { name: "Pollachi Arasu e-Sevai Centre", address: "Pollachi", hours: "9am - 6pm" },
    ],
    Salem: [
      { name: "Salem Arasu e-Sevai Centre", address: "Salem Town", hours: "9am - 6pm" },
      { name: "Mettur Arasu e-Sevai Centre", address: "Mettur", hours: "9am - 5:30pm" },
    ],
    Madurai: [
      { name: "Madurai North Arasu e-Sevai Centre", address: "Madurai North", hours: "9am - 6pm" },
      { name: "Thirumangalam Arasu e-Sevai Centre", address: "Thirumangalam", hours: "9am - 6pm" },
    ],
    Tirunelveli: [
      { name: "Tirunelveli Arasu e-Sevai Centre", address: "Tirunelveli", hours: "9am - 6pm" },
      { name: "Palayamkottai Arasu e-Sevai Centre", address: "Palayamkottai", hours: "9am - 5:30pm" },
    ],
    Thoothukudi: [
      { name: "Thoothukudi Arasu e-Sevai Centre", address: "Thoothukudi", hours: "9am - 6pm" },
      { name: "Tiruchendur Arasu e-Sevai Centre", address: "Tiruchendur", hours: "9am - 5:30pm" },
    ],
    Tiruchirappalli: [
      { name: "Trichy West Arasu e-Sevai Centre", address: "Trichy West", hours: "9am - 6pm" },
      { name: "Srirangam Arasu e-Sevai Centre", address: "Srirangam", hours: "9am - 6pm" },
    ],
    Thanjavur: [
      { name: "Thanjavur Arasu e-Sevai Centre", address: "Thanjavur", hours: "9am - 6pm" },
      { name: "Kumbakonam Arasu e-Sevai Centre", address: "Kumbakonam", hours: "9am - 5:30pm" },
    ],
  };
  const centers = talukCenters[taluk] || [];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Arasu+e-Sevai+Centre+${encodeURIComponent(taluk)}`;

  return (
    <section className="locator-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.locatorTitle}</span>
        <h2>{t.locatorTitle}</h2>
        <p>{t.locatorSubtitle}</p>
      </div>

      <div className="locator-grid">
        <article className="locator-card">
          <label className="locator-label">{t.locatorTitle}</label>
          <select className="locator-select" value={taluk} onChange={(e) => setTaluk(e.target.value)}>
            {Object.keys(talukCenters).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <div className="locator-active">Active centre for {taluk}</div>
          {centers.map((center) => (
            <div key={center.name} className="locator-card" style={{ marginBottom: "16px", padding: "18px" }}>
              <strong>{center.name}</strong>
              <p>{center.address}</p>
              <p>{center.hours}</p>
            </div>
          ))}
          <a className="locator-link" href={mapsUrl} target="_blank" rel="noreferrer">
            Locate on Google Maps
          </a>
        </article>

        <article className="fees-card">
          <h3>{t.feesTitle}</h3>
          <p>{t.feesSubtitle}</p>
          <div className="fees-grid overflow-x-auto">
            <div>Community Certificate</div>
            <div><strong>₹60</strong></div>
            <div>Income Certificate</div>
            <div><strong>₹60</strong></div>
            <div>Nativity Certificate</div>
            <div><strong>₹60</strong></div>
            <div>First Graduate Certificate</div>
            <div><strong>₹60</strong></div>
            <div>Legal Heir Certificate</div>
            <div><strong>₹60</strong></div>
            <div>Extract of Chitta</div>
            <div><strong>₹25</strong></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer-section" id="contact">
      <div className="page-shell footer-grid">
        <div>
          <div className="brand-logo-row footer-brand">
            <LogoMark />
            <div>
              <h3>Nala Thittam</h3>
              <p>{t.brandTag}</p>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <a href="#about">{t.footerAbout}</a>
          <a href="#privacy">{t.footerPrivacy}</a>
          <a href="#terms">{t.footerTerms}</a>
          <a href={`mailto:${t.contactEmail}`}>{t.footerContact}</a>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Twitter">
            <Share2 size={18} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Globe size={18} />
          </a>
          <a href="#" aria-label="Instagram">
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
      <div className="footer-note">
        <p>{t.disclaimer}</p>
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}

const BACKEND_BLUEPRINT = {
  route: "/api/process-eligibility",
  method: "POST",
  cors: ["https://nala-thittam.app", "http://localhost:5173"],
  parse: ["age", "income", "occupation", "taluk", "schooling"],
  response: {
    eligibleSchemes: [],
    ineligibleSchemes: [],
    targetCentres: [],
  },
  handler: {
    tryCatch: true,
    successStatus: 200,
    badRequestStatus: 400,
    serverErrorStatus: 500,
  },
};

export default function NalaThittam() {
  const [stage, setStage] = useState("landing");
  const [formData, setFormData] = useState(createEmptyForm);
  const [submittedData, setSubmittedData] = useState(createEmptyForm);
  const [isTamil, setIsTamil] = useState(false);
  const timerRef = useRef(null);

  const t = STR[isTamil ? "ta" : "en"];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  const scrollToSection = (sectionId) => {
    if (sectionId === "login") {
      // Open the guided form when navigation asks for login
      setStage("form");
      return;
    }

    setStage("landing");
    setTimeout(() => {
      const node = document.getElementById(sectionId);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  const handleCheck = () => {
    const snapshot = { ...formData };
    setSubmittedData(snapshot);
    setFormData(createEmptyForm());
    setStage("loading");
    timerRef.current = setTimeout(() => setStage("results"), 1800);
  };

  const handleRestart = () => {
    setSubmittedData(createEmptyForm());
    setFormData(createEmptyForm());
    setStage("form");
  };

  const handleDigiLocker = () => {
    setSubmittedData(createEmptyForm());
    setFormData(createDigiLockerSample());
    setStage("form");
  };

  const handleGoogle = () => {
    setSubmittedData(createEmptyForm());
    setFormData(createDigiLockerSample());
    setStage("form");
  };

  const handleContinue = () => {
    setSubmittedData(createEmptyForm());
    setStage("form");
  };

  return (
    <div className="nala-root">
      <Tokens />
      <Header t={t} onNavigate={scrollToSection} onLogin={() => scrollToSection("login")} lang={isTamil} setLang={setIsTamil} />
      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage
              t={t}
              onContinue={handleContinue}
              onDigiLocker={handleDigiLocker}
              onGoogle={handleGoogle}
              onScrollToLogin={() => scrollToSection("login")}
              onLearnMore={() => scrollToSection("features")}
            />
            <div className="page-shell" id="login" />
          </motion.div>
        )}

        {stage === "form" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GuidedForm t={t} lang={isTamil ? "ta" : "en"} data={formData} setData={setFormData} onSubmit={handleCheck} />
          </motion.div>
        )}

        {stage === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CatLoader t={t} />
          </motion.div>
        )}

        {stage === "results" && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <ResultsDashboard t={t} data={submittedData} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer t={t} />
    </div>
  );
}
