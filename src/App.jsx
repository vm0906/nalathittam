import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
  Printer,
  MapPin,
  Clock,
  IndianRupee,
  Save,
  Trash2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS & CSS                                                */
/* ------------------------------------------------------------------ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    :root {
      color-scheme: light;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --bg: #F8FAFC;
      --surface: #ffffff;
      --surface-soft: #ECFDF5;
      --surface-warm: #F0FDF4;
      --text: #0F172A;
      --muted: #475569;
      --border: #E2E8F0;
      --primary: #0F766E;
      --primary-soft: rgba(20, 184, 166, 0.12);
      --accent: #14B8A6;
      --accent-soft: rgba(20, 184, 166, 0.08);
      --danger: #DC2626;
      --danger-soft: rgba(220, 38, 38, 0.08);
      --warning: #D97706;
      --warning-soft: rgba(217, 119, 6, 0.08);
      --success: #059669;
      --success-soft: rgba(5, 150, 105, 0.08);
      --shadow: 0 25px 60px rgba(15, 118, 110, 0.09);
      --shadow-sm: 0 4px 12px rgba(15, 118, 110, 0.06);
      --radius: 20px;
      --radius-sm: 12px;
    }
    .nala-root { min-height: 100vh; background: var(--bg); color: var(--text); line-height: 1.55; }
    .page-shell { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    .nala-focus:focus-visible { outline: 3px solid rgba(20, 184, 166, 0.45); outline-offset: 3px; border-radius: 10px; }

    /* Header */
    .header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .brand-row { display: flex; align-items: center; gap: 12px; }
    .brand-logo-row { display: flex; align-items: center; gap: 12px; }
    .logo-mark { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; display: grid; place-items: center; font-weight: 800; font-size: 14px; }
    .brand-title { font-weight: 800; font-size: 16px; letter-spacing: -0.2px; }
    .brand-subtitle { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .nav-links { display: flex; align-items: center; gap: 8px; }
    .nav-link { background: transparent; border: none; padding: 8px 12px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; transition: all .2s; }
    .nav-link:hover { background: var(--surface-soft); color: var(--primary); }
    .nav-login { background: var(--primary); color: white !important; }
    .nav-login:hover { background: #115e59; }
    .language-toggle { background: var(--surface-soft); border: 1px solid var(--border); padding: 6px 12px; border-radius: 10px; font-weight: 600; font-size: 13px; color: var(--primary); cursor: pointer; }
    .mobile-menu-button { display: none; background: transparent; border: none; padding: 8px; cursor: pointer; color: var(--text); }

    /* Hero */
    .hero-section { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 80px 0 60px; }
    .hero-copy .eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--primary); background: var(--primary-soft); padding: 6px 12px; border-radius: 999px; margin-bottom: 16px; }
    .hero-copy h1 { font-size: 42px; line-height: 1.15; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 16px; }
    .hero-copy > p { font-size: 17px; color: var(--muted); max-width: 520px; margin-bottom: 28px; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-footnote { display: flex; gap: 24px; margin-top: 28px; font-size: 14px; color: var(--muted); }
    .hero-footnote strong { color: var(--text); }
    .hero-panel { display: flex; justify-content: center; }
    .hero-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; width: 100%; max-width: 420px; box-shadow: var(--shadow); }
    .hero-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
    .hero-card-label { font-size: 13px; color: var(--muted); margin-bottom: 4px; }
    .hero-card-header h2 { font-size: 18px; font-weight: 700; }

    /* Buttons */
    .button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 14px; border: 1px solid transparent; cursor: pointer; transition: all .2s; line-height: 1; }
    .button-primary { background: var(--primary); color: white; border-color: var(--primary); }
    .button-primary:hover { background: #115e59; }
    .button-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .button-secondary { background: white; color: var(--text); border-color: var(--border); }
    .button-secondary:hover { background: var(--bg); }
    .button-outline { background: transparent; color: var(--primary); border-color: var(--primary); }
    .button-outline:hover { background: var(--primary-soft); }
    .button-ghost { background: transparent; color: var(--muted); border-color: var(--border); }
    .button-ghost:hover { background: var(--bg); }
    .button-large { padding: 14px 24px; font-size: 15px; border-radius: 14px; }
    .button-full { width: 100%; }
    .provider-icon { width: 18px; height: 18px; }

    .divider-line { display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 13px; margin: 16px 0; }
    .divider-line::before, .divider-line::after { content: ""; flex: 1; height: 1px; background: var(--border); }
    .auth-note { font-size: 12px; color: var(--muted); text-align: center; margin-top: 12px; }

    /* Sections */
    .content-section { padding: 60px 0; }
    .section-header { text-align: center; max-width: 640px; margin: 0 auto 40px; }
    .section-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--primary); }
    .section-header h2 { font-size: 28px; font-weight: 800; margin-top: 8px; letter-spacing: -0.4px; }
    .section-header p { color: var(--muted); margin-top: 8px; }

    /* Feature grid */
    .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; transition: box-shadow .2s; }
    .feature-card:hover { box-shadow: var(--shadow-sm); }
    .feature-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--primary-soft); color: var(--primary); display: grid; place-items: center; margin-bottom: 14px; }
    .feature-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .feature-card p { font-size: 14px; color: var(--muted); line-height: 1.5; }

    /* Steps */
    .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .step-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; position: relative; overflow: hidden; }
    .step-number { position: absolute; top: 12px; right: 16px; font-size: 32px; font-weight: 800; color: var(--border); line-height: 1; }
    .step-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--accent-soft); color: var(--primary); display: grid; place-items: center; margin-bottom: 14px; }
    .step-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .step-card p { font-size: 14px; color: var(--muted); }

    /* Eligibility section */
    .filter-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
    .category-pill { background: white; border: 1px solid var(--border); padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--muted); cursor: pointer; transition: all .2s; }
    .category-pill.active { background: var(--primary); color: white; border-color: var(--primary); }
    .scheme-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .scheme-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; display: flex; flex-direction: column; gap: 12px; }
    .scheme-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .scheme-card-head strong { font-size: 15px; font-weight: 700; line-height: 1.35; }
    .scheme-category { font-size: 12px; color: var(--muted); margin-top: 4px; }
    .scheme-details h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 8px; }
    .scheme-details ul { list-style: disc; padding-left: 18px; font-size: 14px; color: var(--text); display: flex; flex-direction: column; gap: 6px; }
    .scheme-benefits { font-size: 14px; color: var(--muted); line-height: 1.5; }
    .scheme-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--primary); text-decoration: none; margin-top: auto; padding-top: 8px; }
    .scheme-link:hover { text-decoration: underline; }

    /* About */
    .about-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
    .about-section h2 { font-size: 26px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 12px; }
    .about-section > div > p { color: var(--muted); font-size: 15px; line-height: 1.6; }
    .about-cards { display: flex; flex-direction: column; gap: 16px; }
    .about-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; }
    .about-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .about-card p { font-size: 14px; color: var(--muted); }

    /* Form */
    .form-section { padding: 40px 0 80px; }
    .form-frame { max-width: 720px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; box-shadow: var(--shadow-sm); }
    .progress-shell { margin-bottom: 28px; }
    .progress-bar { display: flex; align-items: center; justify-content: space-between; }
    .progress-step { display: flex; align-items: center; flex: 1; }
    .progress-dot { width: 32px; height: 32px; border-radius: 50%; background: var(--border); color: var(--muted); display: grid; place-items: center; font-size: 13px; font-weight: 700; flex-shrink: 0; transition: all .3s; }
    .progress-dot.completed { background: var(--success); color: white; }
    .progress-dot.active { background: var(--primary); color: white; box-shadow: 0 0 0 4px var(--primary-soft); }
    .progress-line { flex: 1; height: 3px; background: var(--border); margin: 0 8px; border-radius: 3px; transition: background .3s; }
    .progress-line.completed { background: var(--success); }
    .progress-label { text-align: center; font-size: 13px; color: var(--muted); margin-top: 10px; font-weight: 500; }

    .step-fields { display: flex; flex-direction: column; gap: 20px; }
    .field-block { display: flex; flex-direction: column; gap: 6px; }
    .field-block label { font-size: 13px; font-weight: 600; color: var(--text); }
    .field-block input, .field-block select { padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border); font-size: 14px; background: var(--surface); color: var(--text); transition: border-color .2s, box-shadow .2s; }
    .field-block input:focus, .field-block select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--primary-soft); outline: none; }
    .field-error { font-size: 12px; color: var(--danger); display: flex; align-items: center; gap: 4px; margin-top: 2px; }
    .button-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .button-grid.two-col { grid-template-columns: repeat(2, 1fr); }
    .toggle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 240px; }
    .choice-button { padding: 12px; border-radius: 12px; border: 1px solid var(--border); background: white; font-size: 14px; font-weight: 500; color: var(--text); cursor: pointer; transition: all .15s; }
    .choice-button:hover { border-color: var(--accent); }
    .choice-button.selected { background: var(--primary); color: white; border-color: var(--primary); }
    .field-note { font-size: 12px; color: var(--muted); margin-top: 4px; }
    .dual-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-actions { display: flex; justify-content: space-between; margin-top: 28px; }

    /* Loader */
    .loader-section { min-height: 60vh; display: grid; place-items: center; }
    .loader-shell { text-align: center; }
    .loader-graphic { width: 120px; height: 120px; border-radius: 50%; background: var(--surface-soft); display: grid; place-items: center; margin: 0 auto 20px; color: var(--primary); }
    .loader-copy p { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
    .loader-copy span { font-size: 14px; color: var(--muted); }

    /* Results */
    .results-section { padding: 40px 0 80px; }
    .results-heading { max-width: 720px; margin: 0 auto 32px; text-align: center; }
    .results-heading h2 { font-size: 26px; font-weight: 800; margin-top: 8px; }
    .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .result-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
    .result-card-surface { border-top: 4px solid var(--primary); }
    .result-card-soft { border-top: 4px solid var(--warning); }
    .result-card-title { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .result-card-title h3 { font-size: 16px; font-weight: 700; }
    .result-list { display: flex; flex-direction: column; gap: 14px; }
    .result-item { display: flex; gap: 10px; align-items: flex-start; }
    .result-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-top: 6px; flex-shrink: 0; }
    .result-item strong { font-size: 14px; font-weight: 600; }
    .result-item p { font-size: 13px; color: var(--muted); margin-top: 2px; line-height: 1.4; }
    .grid-two { display: flex; flex-direction: column; gap: 14px; }
    .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-success { background: var(--success-soft); color: var(--success); }
    .badge-warning { background: var(--warning-soft); color: var(--warning); }
    .badge-danger { background: var(--danger-soft); color: var(--danger); }
    .scheme-reason { font-size: 12px; color: var(--danger); margin-top: 6px; line-height: 1.4; }
    .link-button { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 13px; font-weight: 600; color: var(--primary); text-decoration: none; }
    .link-button:hover { text-decoration: underline; }
    .empty-state { font-size: 14px; color: var(--muted); text-align: center; padding: 20px 0; }
    .panel-subtitle { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
    .missed-list { display: flex; flex-direction: column; gap: 14px; }
    .missed-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; }
    .results-actions { display: flex; justify-content: center; gap: 12px; margin-top: 32px; flex-wrap: wrap; }

    /* Locator */
    .locator-section { margin-bottom: 32px; }
    .locator-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
    .locator-card, .fees-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
    .locator-label { font-size: 13px; font-weight: 600; margin-bottom: 8px; display: block; }
    .locator-select { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border); font-size: 14px; margin-bottom: 16px; background: white; }
    .locator-active { font-size: 13px; font-weight: 600; color: var(--primary); margin-bottom: 12px; }
    .locator-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--primary); margin-top: 8px; }
    .fees-grid { display: grid; grid-template-columns: 1fr auto; gap: 10px 24px; font-size: 14px; margin-top: 12px; }
    .fees-grid > div:nth-child(2n) { font-weight: 700; color: var(--primary); }

    /* Footer */
    .footer-section { background: var(--surface); border-top: 1px solid var(--border); padding: 48px 0 24px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; align-items: start; margin-bottom: 32px; }
    .footer-brand { margin-bottom: 12px; }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-links a { font-size: 14px; color: var(--muted); text-decoration: none; }
    .footer-links a:hover { color: var(--primary); }
    .footer-social { display: flex; gap: 12px; }
    .footer-social a { width: 36px; height: 36px; border-radius: 50%; background: var(--bg); display: grid; place-items: center; color: var(--muted); transition: all .2s; }
    .footer-social a:hover { background: var(--primary-soft); color: var(--primary); }
    .footer-note { text-align: center; font-size: 12px; color: var(--muted); border-top: 1px solid var(--border); padding-top: 24px; max-width: 900px; margin: 0 auto; }

    /* Print styles */
    @media print {
      .header, .footer-section, .form-section, .hero-section, .content-section, .locator-section, .results-actions { display: none !important; }
      .results-section { padding: 0; }
      .result-card { break-inside: avoid; box-shadow: none; border: 1px solid #ccc; }
    }

    /* Responsive */
    @media (max-width: 980px) {
      .hero-section { grid-template-columns: 1fr; }
      .feature-grid { grid-template-columns: repeat(2, 1fr); }
      .about-section { grid-template-columns: 1fr; }
      .results-grid { grid-template-columns: 1fr; }
      .locator-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .feature-grid { grid-template-columns: 1fr; }
      .steps-grid { grid-template-columns: 1fr; }
      .scheme-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
      .hero-copy h1 { font-size: 30px; }
      .mobile-menu-button { display: block; }
      .nav-links { display: none; position: absolute; top: 68px; left: 0; right: 0; background: white; border-bottom: 1px solid var(--border); flex-direction: column; padding: 12px 24px; gap: 4px; }
      .nav-open { display: flex; }
      .dual-fields { grid-template-columns: 1fr; }
      .button-grid { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      .nala-root * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  LOCALIZATION                                                       */
/* ------------------------------------------------------------------ */
const STR = {
  en: {
    tagline: "Nala Thittam · Benefit discovery simplified",
    brandTag: "Find the schemes and certificates that matter to you",
    heroHeadline: "Find Every Government Benefit You're Eligible For",
    heroText: "Stop searching hundreds of government websites. Answer a few questions and instantly discover scholarships, reservations, welfare schemes, certificates and subsidies available for you.",
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
    navLogin: "Get Started",
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
    stepTitles: ["Personal Basics", "Social & Community", "Education Profile", "Employment & Family Economic Status"],
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
    printReport: "Print Report",
    clearSaved: "Clear Saved Data",
    noSchemes: "No specific scheme matches were found for this profile yet — new options arrive regularly.",
    noGaps: "No major gaps found — you already qualify for the schemes we track for this profile.",
    reasonLabel: "Reason",
    footerAbout: "About",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms",
    footerContact: "Contact",
    disclaimer: "Nala Thittam is an independent scheme discovery platform and is not affiliated with the Government of Tamil Nadu or Government of India.",
    copyright: "© 2026 Nala Thittam. All rights reserved.",
    contactEmail: "hello@nala.thittam",
    validation: {
      fullName: "Please enter your full name.",
      dob: "Please enter a valid date of birth.",
      gender: "Please select your gender.",
      locationType: "Please select your location type.",
      community: "Please select your community category.",
      religion: "Please select your religion.",
      education: "Please select your education level.",
      firstGen: "Please indicate if you are a first generation graduate.",
      occupation: "Please select your occupation.",
      farmerFamily: "Please indicate if your family is engaged in farming.",
      income: "Please select your annual family income.",
    },
  },
  ta: {
    tagline: "Nala Thittam · நலத்திட்ட கண்டுபிடிப்பு எளிதாக்கப்பட்டது",
    brandTag: "உங்களுக்கு முக்கியமான திட்டங்கள் மற்றும் சான்றிதழ்களைக் கண்டறியுங்கள்",
    heroHeadline: "நீங்கள் தகுதி பெற்ற அனைத்து அரசாங்க நலன்களையும் கண்டறியுங்கள்",
    heroText: "நூற்றுக்கணக்கான அரசாங்க இணையதளங்களைத் தேடுவதை நிறுத்துங்கள். சில கேள்விகளுக்கு பதிலளித்து, உங்களுக்கு கிடைக்கும் உதவித்தொகை, இடஒதுக்கீடு, நலத்திட்டங்கள், சான்றிதழ்கள் மற்றும் மானியங்களை உடனடியாகக் கண்டறியுங்கள்.",
    heroCta: "தகுதியை சரிபார்க்கவும்",
    heroSecondary: "மேலும் அறிய",
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
    navFeatures: "திறன்கள்",
    navHow: "செயல்முறை",
    navAbout: "பற்றி",
    navContact: "தொடர்பு",
    navLogin: "தொடங்கு",
    signInTitle: "உங்கள் நலன்களைக் கண்டறிய உள்நுழையவும்",
    signInSubtitle: "உங்கள் மின்னஞ்சலுடன் தொடங்கி, விரைவான ஓட்டத்திற்கு DigiLocker அல்லது Google மூலம் தொடரவும்.",
    emailLabel: "மின்னஞ்சல் முகவரி",
    passwordLabel: "கடவுச்சொல் (விருப்பம்)",
    continueBtn: "தொடரவும்",
    digilockerBtn: "DigiLocker மூலம் தொடரவும்",
    googleBtn: "Google மூலம் தொடரவும்",
    orText: "அல்லது",
    emailError: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
    demoNote: "டெமோ பயன்முறை — எந்த உண்மையான அங்கீகாரமும் செய்யப்படவில்லை.",
    stepOf: "படி",
    of: "/",
    stepTitles: ["அடிப்படை விவரங்கள்", "சமூகம் & சமூக வகை", "கல்வி சுயவிவரம்", "வேலைவாய்ப்பு & குடும்ப பொருளாதார நிலை"],
    back: "பின்",
    next: "அடுத்து",
    checkForMe: "எனக்காக சரிபார்க்கவும்",
    loaderTitle: "உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்கிறது...",
    loaderSubtitle: "உங்கள் பதில்களை செயலில் உள்ள திட்டங்கள் மற்றும் சான்றிதழ்களுடன் பொருத்துகிறது",
    fields: {
      fullName: "முழு பெயர்",
      dob: "பிறந்த தேதி",
      gender: "பாலினம்",
      locationType: "இடம் வகை",
      community: "சமூக வகை",
      religion: "மதம்",
      education: "தற்போதைய கல்வி நிலை",
      firstGen: "முதல் தலைமுறை பட்டதாரியா?",
      firstGenNote: "குடும்பத்தில் முதல் பட்டதாரி",
      occupation: "உங்கள் தொழில்",
      fatherOcc: "தந்தையின் தொழில்",
      motherOcc: "தாயின் தொழில்",
      farmerFamily: "விவசாய குடும்பமா?",
      income: "குடும்ப ஆண்டு வருமானம்",
    },
    placeholders: {
      fullName: "எ.கா. மீனா குமாரி",
      community: "சமூக வகையைத் தேர்ந்தெடுக்கவும்",
      religion: "மதத்தைத் தேர்ந்தெடுக்கவும்",
      education: "கல்வி நிலையைத் தேர்ந்தெடுக்கவும்",
      occupation: "தொழிலைத் தேர்ந்தெடுக்கவும்",
      fatherOcc: "எ.கா. விவசாயி",
      motherOcc: "எ.கா. வீட்டு பராமரிப்பாளர்",
      income: "வருமான வரம்பைத் தேர்ந்தெடுக்கவும்",
    },
    yes: "ஆம்",
    no: "இல்லை",
    reportTitle: "உங்கள் தகுதி அறிக்கை",
    reportSubtitle: "நீங்கள் பகிர்ந்த விவரங்களின் அடிப்படையில் — நீங்கள் செயல்படக்கூடிய முழு படம் இங்கே.",
    panelA: "உங்களுக்கு பொருந்தக்கூடிய சான்றிதழ்கள்",
    panelB: "தகுதியான திட்டங்கள் & உதவித்தொகைகள்",
    panelC: "நீங்கள் அருகில் இருக்கும், ஆனால் தற்போது தகுதியற்ற திட்டங்கள்",
    panelCSub: "காணாத தகுதி கண்காணிப்பு — ஒவ்வொன்றையும் தடுக்கும் காரணம்.",
    eligible: "தகுதியான",
    partial: "பகுதியளவு தகுதி",
    ineligible: "தகுதியற்ற",
    applyVia: "e-சேவை மூலம் விண்ணப்பிக்கவும்",
    startOver: "மீண்டும் தொடங்கு",
    printReport: "அறிக்கையை அச்சிடு",
    clearSaved: "சேமித்த தரவை அழி",
    noSchemes: "இந்த சுயவிவரத்திற்கு இதுவரை குறிப்பிட்ட திட்ட பொருத்தங்கள் எதுவும் கிடைக்கவில்லை — புதிய விருப்பங்கள் தவணையாக வருகின்றன.",
    noGaps: "பெரிய இடைவெளிகள் எதுவும் கிடைக்கவில்லை — இந்த சுயவிவரத்திற்காக நாங்கள் கண்காணிக்கும் திட்டங்களுக்கு நீங்கள் ஏற்கனவே தகுதி பெற்றுள்ளீர்கள்.",
    reasonLabel: "காரணம்",
    footerAbout: "பற்றி",
    footerPrivacy: "தனியுரிமை கொள்கை",
    footerTerms: "விதிமுறைகள்",
    footerContact: "தொடர்பு",
    disclaimer: "Nala Thittam ஒரு சுயாதீனமான திட்ட கண்டுபிடிப்பு தளமாகும், இது தமிழ்நாடு அரசு அல்லது இந்திய அரசுடன் இணைக்கப்படவில்லை.",
    copyright: "© 2026 Nala Thittam. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    contactEmail: "hello@nala.thittam",
    validation: {
      fullName: "உங்கள் முழு பெயரை உள்ளிடவும்.",
      dob: "சரியான பிறந்த தேதியை உள்ளிடவும்.",
      gender: "உங்கள் பாலினத்தைத் தேர்ந்தெடுக்கவும்.",
      locationType: "உங்கள் இடம் வகையைத் தேர்ந்தெடுக்கவும்.",
      community: "உங்கள் சமூக வகையைத் தேர்ந்தெடுக்கவும்.",
      religion: "உங்கள் மதத்தைத் தேர்ந்தெடுக்கவும்.",
      education: "உங்கள் கல்வி நிலையைத் தேர்ந்தெடுக்கவும்.",
      firstGen: "நீங்கள் முதல் தலைமுறை பட்டதாரி என்பதைக் குறிப்பிடவும்.",
      occupation: "உங்கள் தொழிலைத் தேர்ந்தெடுக்கவும்.",
      farmerFamily: "உங்கள் குடும்பம் விவசாயத்தில் ஈடுபட்டுள்ளதா என்பதைக் குறிப்பிடவும்.",
      income: "உங்கள் குடும்ப ஆண்டு வருமானத்தைத் தேர்ந்தெடுக்கவும்.",
    },
  },
};

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

const STEP_REQUIRED_FIELDS = [
  ["fullName", "dob", "gender", "locationType"],
  ["community", "religion"],
  ["education", "firstGen"],
  ["occupation", "farmerFamily", "income"],
];

const FEATURE_LIST = [
  { title: "Personalized matching", description: "Understand which scholarships, certificates and subsidies you are eligible for in minutes.", icon: Sparkles },
  { title: "One streamlined form", description: "Answer a few smart questions instead of visiting multiple government sites.", icon: Check },
  { title: "Improved preparation", description: "See the certificates and documents you need before you apply.", icon: FileCheck2 },
  { title: "Instant recommendations", description: "Get a clear list of eligible schemes and partial matches to act on next.", icon: ShieldCheck },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Answer the questions", description: "Provide your profile details through a fast, guided form.", icon: User2 },
  { step: "02", title: "Review your eligibility", description: "See which schemes, certificates and scholarships fit your profile.", icon: Users },
  { step: "03", title: "Act with confidence", description: "Use the tailored next steps to prepare documents and apply.", icon: GraduationCap },
];

const ELIGIBILITY_CATEGORIES = ["All", "Agriculture", "Weavers, Artisans & Micro-Entrepreneurs", "Education, Higher Studies & Youth Development", "Women, Health & Social Security Infrastructure"];

const ELIGIBILITY_SCHEMES = [
  {
    id: "pm-kisan",
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    eligibilityCriteria: ["Must be a land-holding farmer household.", "Must own cultivable land assets.", "Institutional landowners and salaried income taxpayers are excluded."],
    benefits: "Direct income support for eligible farmer households.",
    officialLink: "https://pmkisan.gov.in/",
  },
  {
    id: "kalignar-agri-dev",
    title: "Kalaignar All Village Integrated Agricultural Development Programme",
    category: "Agriculture",
    eligibilityCriteria: ["Residents of designated Tamil Nadu village panchayats.", "Actively engaged in farming or agricultural labour operations."],
    benefits: "Supports village-level agricultural development and fallow-land initiatives.",
    officialLink: "https://www.tn.gov.in/",
  },
  {
    id: "handloom-weavers-comprehensive-welfare",
    title: "Handloom Weavers Comprehensive Welfare Scheme",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: ["Age between 18 and 60 years.", "Active handloom weaver or allied worker residing in Tamil Nadu."],
    benefits: "Health cover and welfare support for active handloom workers.",
    officialLink: "https://www.indiafilings.com/learn/handloom-weavers-comprehensive-welfare-scheme",
  },
  {
    id: "weavers-mudra-scheme",
    title: "Weavers Mudra Scheme (WMS)",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: ["Individual handloom weavers, master weavers or weaver entrepreneurs.", "Members of SHGs or cooperative societies engaged in textile execution."],
    benefits: "Low-cost credit and business loan support for textile enterprises.",
    officialLink: "https://www.jansamarth.in/business-loan-weavers-mudra-scheme",
  },
  {
    id: "pm-vishwakarma",
    title: "PM Vishwakarma Yojana",
    category: "Weavers, Artisans & Micro-Entrepreneurs",
    eligibilityCriteria: ["Minimum age of 18.", "Traditional artisan or craftsperson working with hands and tools.", "One member per family can avail the benefit."],
    benefits: "Support for traditional artisans across recognised trades.",
    officialLink: "https://pmvishwakarma.gov.in/",
  },
  {
    id: "pudhumai-penn",
    title: "Pudhumai Penn Scheme",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: ["Must be a female student enrolled in higher education in Tamil Nadu.", "Must have studied from Class 6 to Class 12 in government-run schools."],
    benefits: "Financial assistance for women pursuing higher education.",
    officialLink: "https://pudhumaippenn.tn.gov.in",
  },
  {
    id: "pm-vidyalaxmi",
    title: "PM Vidyalaxmi Scheme",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: ["Indian national with admission to a recognized higher education course.", "Admission secured via merit-based selection."],
    benefits: "Education loan support and academic advancement assistance.",
    officialLink: "https://www.vidyalakshmi.co.in/",
  },
  {
    id: "naanmudhalvan",
    title: "Naan Mudhalvan Skill Initiative",
    category: "Education, Higher Studies & Youth Development",
    eligibilityCriteria: ["Youth or college students in Tamil Nadu.", "Pursuing engineering, arts, science or polytechnic courses."],
    benefits: "Industry-aligned upskilling modules and career pathways.",
    officialLink: "https://www.naanmudhalvan.tn.gov.in",
  },
  {
    id: "kalignar-magalir-urimai",
    title: "Kalaignar Magalir Urimai Thogai",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: ["Female head of family.", "Age above 21 years.", "Annual household income below ₹2,50,000.", "No four-wheeler vehicle ownership."],
    benefits: "Direct support for women-led households and social security coverage.",
    officialLink: "https://www.tnesevai.tn.gov.in",
  },
  {
    id: "pm-matru-vandana",
    title: "Pradhan Mantri Matru Vandana Yojana",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: ["Pregnant women or lactating mothers for the first child.", "Age 19 years or older.", "Not employed by Central or State Government or PSUs."],
    benefits: "Maternity support and cash assistance for first-child mothers.",
    officialLink: "https://wcd.nic.in/",
  },
  {
    id: "cmchis",
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
    category: "Women, Health & Social Security Infrastructure",
    eligibilityCriteria: ["Legal resident of Tamil Nadu.", "Annual household income below ₹1,20,000."],
    benefits: "Cashless hospitalisation and health insurance coverage for eligible families.",
    officialLink: "https://www.cmchistn.com/",
  },
];

const SCHEME_DEFS = [
  { id: "pm-kisan", title: "PM Kisan Samman Nidhi", category: "Agriculture", authority: "Central", minAge: 18, maxAge: 60, maxIncome: 150000, requiredOccupation: ["Farmer", "Self-Employed"], requiredFarmerFamily: true, requiredDocuments: ["Landholding certificate", "Aadhaar card"], officialLink: "https://pmkisan.gov.in/" },
  { id: "kalignar-agri-dev", title: "Kalaignar All Village Integrated Agricultural Development Programme", category: "Agriculture", authority: "State", minAge: 18, maxAge: 60, maxIncome: 200000, requiredOccupation: ["Farmer", "Self-Employed"], requiredFarmerFamily: true, requiredDocuments: ["Farmer ID", "Income Certificate"], officialLink: "https://www.tn.gov.in/" },
  { id: "handloom-weavers-welfare", title: "Handloom Weavers Comprehensive Welfare Scheme", category: "Weavers Welfare", authority: "State", minAge: 18, maxAge: 50, maxIncome: 150000, requiredOccupation: ["Weaver"], requiredDocuments: ["Ration Card", "Weaver identity proof"], officialLink: "https://www.indiafilings.com/learn/handloom-weavers-comprehensive-welfare-scheme" },
  { id: "weavers-mudra-scheme", title: "Weavers Mudra Scheme (WMS)", category: "Weavers Welfare", authority: "Central", requiredOccupation: ["Weaver"], requiredApplicantType: ["Individual", "Entrepreneur", "SHG", "Cooperative"], requiredDocuments: ["Business plan", "Aadhaar card"], officialLink: "https://www.jansamarth.in/business-loan-weavers-mudra-scheme" },
  { id: "pudhumai-penn", title: "Pudhumai Penn Scheme", category: "Education", authority: "State", requiredGender: "Female", requiredEducation: ["12th Pass", "UG", "PG"], maxIncome: 250000, requiredDocuments: ["Community certificate", "Income certificate"], officialLink: "https://pudhumaippenn.tn.gov.in" },
  { id: "pm-vidyalaxmi", title: "PM Vidyalaxmi Scheme", category: "Education", authority: "Central", minAge: 18, maxAge: 40, maxIncome: 200000, requiredEducation: ["10th Pass", "12th Pass", "UG", "PG"], requiredDocuments: ["Admission proof", "Aadhaar card"], officialLink: "https://www.vidyalakshmi.co.in/" },
  { id: "kalignar-magalir-urimai", title: "Kalaignar Magalir Urimai Thogai", category: "Pension / Social Security", authority: "State", requiredGender: "Female", maxIncome: 250000, requiredResidence: "Rural", requiredVehicle: "No", requiredElectricityUnits: 3600, requiredDocuments: ["Bank passbook", "Aadhaar card"], officialLink: "https://www.tnesevai.tn.gov.in" },
  { id: "pm-matru-vandana", title: "Pradhan Mantri Matru Vandana Yojana", category: "Pension / Social Security", authority: "Central", requiredGender: "Female", minAge: 19, maxAge: 25, maxIncome: 200000, requiredDocuments: ["Pregnancy certificate", "Bank account proof"], officialLink: "https://wcd.nic.in/" },
];

const TALUK_CENTERS = {
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

/* ------------------------------------------------------------------ */
/*  UTILITIES                                                          */
/* ------------------------------------------------------------------ */
function createEmptyForm() {
  return {
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
  };
}

function createDigiLockerSample() {
  return {
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
  };
}

function parseIncome(income) {
  if (!income) return null;
  if (income.includes("Below ₹1 Lakh")) return 100000;
  if (income.includes("₹1 Lakh - ₹2.5 Lakhs")) return 250000;
  if (income.includes("₹2.5 Lakhs - ₹5 Lakhs")) return 500000;
  if (income.includes("Above ₹5 Lakhs")) return 600000;
  return null;
}

function calculateAge(dob) {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
}

function evaluateSchemes(data) {
  return SCHEME_DEFS.map((scheme) => {
    const missing = [];
    const age = calculateAge(data.dob);
    const income = parseIncome(data.income);

    if (scheme.minAge !== undefined && age !== null && age < scheme.minAge) missing.push(`Age must be at least ${scheme.minAge}`);
    if (scheme.maxAge !== undefined && age !== null && age > scheme.maxAge) missing.push(`Age must be between ${scheme.minAge || 0} and ${scheme.maxAge}`);
    if (scheme.maxIncome !== undefined && income !== null && income > scheme.maxIncome) missing.push(`Annual Income must be below ₹${scheme.maxIncome.toLocaleString("en-IN")}`);
    if (scheme.requiredOccupation?.length > 0 && !scheme.requiredOccupation.includes(data.occupation)) missing.push(`Occupation must be ${scheme.requiredOccupation.join(" or ")}`);
    if (scheme.requiredGender && data.gender !== scheme.requiredGender) missing.push(`Gender must be ${scheme.requiredGender}`);
    if (scheme.requiredEducation?.length > 0 && !scheme.requiredEducation.includes(data.education)) missing.push(`Education must be ${scheme.requiredEducation.join(" or ")}`);
    if (scheme.requiredFarmerFamily && data.farmerFamily !== "Yes") missing.push("Farmer Family status must be Yes");
    if (scheme.requiredResidence && data.locationType !== scheme.requiredResidence) missing.push(`Residence must be ${scheme.requiredResidence}`);
    if (scheme.requiredVehicle && data.vehicleOwnership !== scheme.requiredVehicle) missing.push("Vehicle ownership must be No");
    if (scheme.requiredElectricityUnits !== undefined && data.electricityUnits && Number(data.electricityUnits) > scheme.requiredElectricityUnits) missing.push(`Electricity consumption must be under ${scheme.requiredElectricityUnits} units`);

    const tier = missing.length === 0 ? "eligible" : missing.length === 1 ? "partial" : "ineligible";
    return { ...scheme, tier, missing, reason: missing.join(". ") };
  });
}

function buildCertificates(d) {
  const list = [{ name: "Nativity / Residence Certificate", note: "Required as base proof for government scheme applications." }];
  if (d.community && d.community !== "General") list.push({ name: "Community Certificate", note: `Confirms your ${d.community} category status for reserved-quota benefits.` });
  if (d.income) list.push({ name: "Income Certificate", note: "Needed to verify family income slab for scholarships & subsidies." });
  if (d.firstGen === "Yes") list.push({ name: "First Graduate Certificate", note: "Certifies you as the first degree-holder in your family." });
  if (d.farmerFamily === "Yes") list.push({ name: "Farmer ID Card (Kisan)", note: "Required for agriculture insurance & farmer welfare benefits." });
  if (d.occupation === "Unemployed" || d.occupation === "Student") list.push({ name: "Unemployment Card (Employment Office)", note: "Helpful for stipend & skill-training scheme applications." });
  if (d.gender === "Transgender") list.push({ name: "Transgender Welfare Identity Card", note: "Unlocks dedicated welfare benefits." });
  return list;
}

function localize(options, lang) {
  return options.map((option) => ({ value: option.value, label: lang === "ta" ? option.ta : option.en }));
}

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */
const LogoMark = React.memo(() => (
  <div className="logo-mark" aria-hidden="true">NT</div>
));

const Header = React.memo(function Header({ t, onNavigate, onLogin, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleItem = useCallback((section) => {
    setMenuOpen(false);
    onNavigate(section);
  }, [onNavigate]);

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
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Primary">
          <button type="button" className="nav-link" onClick={() => handleItem("home")}>{t.navHome}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("features")}>{t.navFeatures}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("how")}>{t.navHow}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("about")}>{t.navAbout}</button>
          <button type="button" className="nav-link" onClick={() => handleItem("contact")}>{t.navContact}</button>
          <button type="button" className="nav-link nav-login" onClick={() => { setMenuOpen(false); onLogin(); }}>{t.navLogin}</button>
          <button type="button" className="language-toggle nala-focus" onClick={() => setLang((v) => !v)} aria-label="Toggle language">
            {lang ? "EN" : "தமிழ்"}
          </button>
        </nav>
      </div>
    </header>
  );
});

const EligibilitySection = React.memo(function EligibilitySection({ schemes, t }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visible = activeCategory === "All" ? schemes : schemes.filter((s) => s.category === activeCategory);

  return (
    <section className="content-section eligibility-section" id="eligibility">
      <div className="section-header">
        <span className="section-eyebrow">{t.eligibilityTitle}</span>
        <h2>{t.eligibilityTitle}</h2>
        <p>{t.eligibilitySubtitle}</p>
      </div>
      <div className="filter-row" role="tablist" aria-label="Scheme categories">
        {ELIGIBILITY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`category-pill ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="scheme-grid">
        {visible.map((scheme) => (
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
                {scheme.eligibilityCriteria.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="scheme-benefits"><strong>Benefits:</strong> {scheme.benefits}</p>
            </div>
            <a className="scheme-link" href={scheme.officialLink} target="_blank" rel="noreferrer">
              Official scheme details <ExternalLink size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
});

const LandingPage = React.memo(function LandingPage({ t, onContinue, onDigiLocker, onGoogle, onLearnMore }) {
  return (
    <main className="landing-page">
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <span className="eyebrow">Fast benefits. Clear next steps.</span>
          <h1>{t.heroHeadline}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary button-large nala-focus" onClick={onContinue}>{t.heroCta}</button>
            <button type="button" className="button button-secondary button-large nala-focus" onClick={onLearnMore}>{t.heroSecondary}</button>
          </div>
          <div className="hero-footnote">
            <div><strong>4x faster</strong> than searching government portals manually.</div>
            <div><strong>One place</strong> for certificates, scholarships and welfare eligibility.</div>
          </div>
        </div>

        <motion.div className="hero-panel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <p className="hero-card-label">{t.welcomeBack}</p>
                <h2>{t.continueProfile}</h2>
              </div>
              <ShieldCheck size={24} color="#0F766E" aria-hidden="true" />
            </div>
            <div className="auth-form auth-form-simple">
              <div className="form-actions">
                <button type="button" className="button button-primary button-full nala-focus" onClick={onContinue}>{t.continueBtn}</button>
              </div>
              <div className="divider-line"><span>{t.orText}</span></div>
              <button type="button" className="button button-outline button-full nala-focus" onClick={onDigiLocker}>
                <FolderDown size={18} aria-hidden="true" /> {t.digilockerBtn}
              </button>
              <button type="button" className="button button-ghost button-full nala-focus" onClick={onGoogle}>
                <img className="provider-icon" src="https://www.svgrepo.com/show/355037/google.svg" alt="" /> {t.googleBtn}
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
            const Icon = feature.icon;
            return (
              <motion.article key={feature.title} className="feature-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <div className="feature-icon"><Icon size={20} aria-hidden="true" /></div>
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
            const Icon = item.icon;
            return (
              <motion.div key={item.step} className="step-card" whileHover={{ scale: 1.02 }}>
                <div className="step-number" aria-hidden="true">{item.step}</div>
                <div className="step-icon"><Icon size={20} aria-hidden="true" /></div>
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
          <p>Nala Thittam helps individuals find the government programs, scholarships and welfare certificates they qualify for without the noise of multiple portals and confusing eligibility rules.</p>
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
});

const ProgressBar = React.memo(function ProgressBar({ t, step }) {
  return (
    <div className="progress-shell">
      <div className="progress-bar" aria-label={`Progress: step ${step + 1} of 4`}>
        {[0, 1, 2, 3].map((index) => {
          const completed = index < step;
          const active = index === step;
          return (
            <div key={index} className="progress-step">
              <div className={`progress-dot ${completed ? "completed" : active ? "active" : ""}`}>
                {completed ? <Check size={12} aria-hidden="true" /> : index + 1}
              </div>
              {index < 3 ? <div className={`progress-line ${completed ? "completed" : ""}`} /> : null}
            </div>
          );
        })}
      </div>
      <p className="progress-label" aria-live="polite">
        {t.stepOf} {step + 1} {t.of} 4 · {t.stepTitles[step]}
      </p>
    </div>
  );
});

function FieldError({ message }) {
  if (!message) return null;
  return (
    <span className="field-error" role="alert">
      <AlertTriangle size={12} aria-hidden="true" /> {message}
    </span>
  );
}

function Step1({ t, lang, data, set, errors }) {
  const opts = useMemo(() => localize(GENDER_OPTIONS, lang), [lang]);
  const locOpts = useMemo(() => localize(LOCATION_OPTIONS, lang), [lang]);
  return (
    <div className="step-fields">
      <div className="field-block">
        <label htmlFor="fullName">{t.fields.fullName}</label>
        <input id="fullName" autoComplete="name" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={t.placeholders.fullName} aria-invalid={!!errors.fullName} />
        <FieldError message={errors.fullName} />
      </div>
      <div className="field-block">
        <label htmlFor="dob">{t.fields.dob}</label>
        <input id="dob" autoComplete="bday" type="date" value={data.dob} onChange={(e) => set("dob", e.target.value)} aria-invalid={!!errors.dob} />
        <FieldError message={errors.dob} />
      </div>
      <div className="field-block">
        <label>{t.fields.gender}</label>
        <div className="button-grid" role="radiogroup" aria-label={t.fields.gender}>
          {opts.map((opt) => (
            <button type="button" key={opt.value} role="radio" aria-checked={data.gender === opt.value}
              className={`choice-button ${data.gender === opt.value ? "selected" : ""}`}
              onClick={() => set("gender", opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.gender} />
      </div>
      <div className="field-block">
        <label>{t.fields.locationType}</label>
        <div className="button-grid two-col" role="radiogroup" aria-label={t.fields.locationType}>
          {locOpts.map((opt) => (
            <button type="button" key={opt.value} role="radio" aria-checked={data.locationType === opt.value}
              className={`choice-button ${data.locationType === opt.value ? "selected" : ""}`}
              onClick={() => set("locationType", opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.locationType} />
      </div>
    </div>
  );
}

function Step2({ t, lang, data, set, errors }) {
  const commOpts = useMemo(() => localize(COMMUNITY_OPTIONS, lang), [lang]);
  const relOpts = useMemo(() => localize(RELIGION_OPTIONS, lang), [lang]);
  return (
    <div className="step-fields">
      <div className="field-block">
        <label htmlFor="community">{t.fields.community}</label>
        <select id="community" value={data.community} onChange={(e) => set("community", e.target.value)} aria-invalid={!!errors.community}>
          <option value="">{t.placeholders.community}</option>
          {commOpts.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <FieldError message={errors.community} />
      </div>
      <div className="field-block">
        <label htmlFor="religion">{t.fields.religion}</label>
        <select id="religion" value={data.religion} onChange={(e) => set("religion", e.target.value)} aria-invalid={!!errors.religion}>
          <option value="">{t.placeholders.religion}</option>
          {relOpts.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <FieldError message={errors.religion} />
      </div>
    </div>
  );
}

function Step3({ t, lang, data, set, errors }) {
  const eduOpts = useMemo(() => localize(EDUCATION_OPTIONS, lang), [lang]);
  return (
    <div className="step-fields">
      <div className="field-block">
        <label htmlFor="education">{t.fields.education}</label>
        <select id="education" value={data.education} onChange={(e) => set("education", e.target.value)} aria-invalid={!!errors.education}>
          <option value="">{t.placeholders.education}</option>
          {eduOpts.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <FieldError message={errors.education} />
      </div>
      <div className="field-block">
        <label>{t.fields.firstGen}</label>
        <div className="toggle-grid" role="radiogroup" aria-label={t.fields.firstGen}>
          {[
            { value: "Yes", label: t.yes },
            { value: "No", label: t.no },
          ].map((option) => (
            <button type="button" key={option.value} role="radio" aria-checked={data.firstGen === option.value}
              className={`choice-button ${data.firstGen === option.value ? "selected" : ""}`}
              onClick={() => set("firstGen", option.value)}>
              {option.label}
            </button>
          ))}
        </div>
        <p className="field-note">{t.fields.firstGenNote}</p>
        <FieldError message={errors.firstGen} />
      </div>
    </div>
  );
}

function Step4({ t, lang, data, set, errors }) {
  const occOpts = useMemo(() => localize(OCCUPATION_OPTIONS, lang), [lang]);
  const incOpts = useMemo(() => localize(INCOME_OPTIONS, lang), [lang]);
  return (
    <div className="step-fields">
      <div className="field-block">
        <label htmlFor="occupation">{t.fields.occupation}</label>
        <select id="occupation" value={data.occupation} onChange={(e) => set("occupation", e.target.value)} aria-invalid={!!errors.occupation}>
          <option value="">{t.placeholders.occupation}</option>
          {occOpts.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <FieldError message={errors.occupation} />
      </div>
      <div className="dual-fields">
        <div className="field-block">
          <label htmlFor="fatherOcc">{t.fields.fatherOcc}</label>
          <input id="fatherOcc" autoComplete="off" value={data.fatherOcc} onChange={(e) => set("fatherOcc", e.target.value)} placeholder={t.placeholders.fatherOcc} />
        </div>
        <div className="field-block">
          <label htmlFor="motherOcc">{t.fields.motherOcc}</label>
          <input id="motherOcc" autoComplete="off" value={data.motherOcc} onChange={(e) => set("motherOcc", e.target.value)} placeholder={t.placeholders.motherOcc} />
        </div>
      </div>
      <div className="field-block">
        <label>{t.fields.farmerFamily}</label>
        <div className="toggle-grid" role="radiogroup" aria-label={t.fields.farmerFamily}>
          {[
            { value: "Yes", label: t.yes },
            { value: "No", label: t.no },
          ].map((option) => (
            <button type="button" key={option.value} role="radio" aria-checked={data.farmerFamily === option.value}
              className={`choice-button ${data.farmerFamily === option.value ? "selected" : ""}`}
              onClick={() => set("farmerFamily", option.value)}>
              {option.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.farmerFamily} />
      </div>
      <div className="field-block">
        <label htmlFor="income">{t.fields.income}</label>
        <select id="income" value={data.income} onChange={(e) => set("income", e.target.value)} aria-invalid={!!errors.income}>
          <option value="">{t.placeholders.income}</option>
          {incOpts.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <FieldError message={errors.income} />
      </div>
    </div>
  );
}

function validateStep(step, data, t) {
  const errors = {};
  const fields = STEP_REQUIRED_FIELDS[step];
  fields.forEach((key) => {
    if (!data[key] || (typeof data[key] === "string" && data[key].trim() === "")) {
      errors[key] = t.validation[key] || "This field is required.";
    }
  });
  if (step === 0 && data.fullName && data.fullName.trim().length < 2) {
    errors.fullName = "Please enter a valid name (at least 2 characters).";
  }
  if (step === 0 && data.dob) {
    const age = calculateAge(data.dob);
    if (age === null || age < 0 || age > 120) errors.dob = "Please enter a valid date of birth.";
  }
  return errors;
}

const GuidedForm = React.memo(function GuidedForm({ t, lang, data, setData, onSubmit }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const set = useCallback((key, value) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }, [setData]);

  const StepComp = [Step1, Step2, Step3, Step4][step];
  const isLast = step === 3;

  const handleNext = useCallback(() => {
    const errs = validateStep(step, data, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstInvalid = document.querySelector("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }, [step, data, t]);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const errs = validateStep(step, data, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit();
  }, [step, data, t, onSubmit]);

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
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
              <StepComp t={t} lang={lang} data={data} set={set} errors={errors} />
              <div className="form-actions">
                <button type="button" className="button button-outline" onClick={handleBack} disabled={step === 0}>
                  <ArrowLeft size={16} aria-hidden="true" /> {t.back}
                </button>
                {!isLast ? (
                  <button type="button" className="button button-primary" onClick={handleNext}>
                    {t.next} <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="submit" className="button button-primary">
                    <Sparkles size={16} aria-hidden="true" /> {t.checkForMe}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

const CatLoader = React.memo(function CatLoader({ t }) {
  return (
    <section className="loader-section" aria-live="polite" aria-busy="true">
      <div className="loader-shell">
        <div className="loader-graphic" aria-hidden="true">
          <Sparkles size={48} aria-hidden="true" />
        </div>
        <div className="loader-copy">
          <p>{t.loaderTitle}</p>
          <span>{t.loaderSubtitle}</span>
        </div>
      </div>
    </section>
  );
});

const EServaiLocator = React.memo(function EServaiLocator({ t }) {
  const [taluk, setTaluk] = useState("Chennai");
  const centers = TALUK_CENTERS[taluk] || [];
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
          <label className="locator-label" htmlFor="taluk-select">{t.locatorTitle}</label>
          <select id="taluk-select" className="locator-select" value={taluk} onChange={(e) => setTaluk(e.target.value)}>
            {Object.keys(TALUK_CENTERS).map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
          <div className="locator-active">Active centre for {taluk}</div>
          {centers.map((center) => (
            <div key={center.name} className="locator-card" style={{ marginBottom: "12px", padding: "16px", borderRadius: "14px" }}>
              <strong style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>{center.name}</strong>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={14} aria-hidden="true" /> {center.address}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} aria-hidden="true" /> {center.hours}
              </p>
            </div>
          ))}
          <a className="locator-link" href={mapsUrl} target="_blank" rel="noreferrer">
            Locate on Google Maps <ExternalLink size={14} aria-hidden="true" />
          </a>
        </article>

        <article className="fees-card">
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{t.feesTitle}</h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>{t.feesSubtitle}</p>
          <div className="fees-grid">
            <div>Community Certificate</div><div><strong>₹60</strong></div>
            <div>Income Certificate</div><div><strong>₹60</strong></div>
            <div>Nativity Certificate</div><div><strong>₹60</strong></div>
            <div>First Graduate Certificate</div><div><strong>₹60</strong></div>
            <div>Legal Heir Certificate</div><div><strong>₹60</strong></div>
            <div>Extract of Chitta</div><div><strong>₹25</strong></div>
          </div>
        </article>
      </div>
    </section>
  );
});

const ResultsDashboard = React.memo(function ResultsDashboard({ t, data, onRestart, onClearSaved }) {
  const certificates = useMemo(() => buildCertificates(data), [data]);
  const allSchemes = useMemo(() => evaluateSchemes(data), [data]);
  const matched = useMemo(() => allSchemes.filter((item) => item.tier === "eligible" || item.tier === "partial"), [allSchemes]);
  const missedOut = useMemo(() => allSchemes.filter((item) => item.tier === "ineligible"), [allSchemes]);

  const handlePrint = useCallback(() => window.print(), []);

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

          <div className="results-grid">
            <article className="result-card result-card-surface">
              <div className="result-card-title">
                <FileCheck2 size={20} aria-hidden="true" />
                <h3>{t.panelA}</h3>
              </div>
              <div className="result-list">
                {certificates.map((certificate) => (
                  <div key={certificate.name} className="result-item">
                    <span className="result-dot" aria-hidden="true" />
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
                <Sparkles size={20} aria-hidden="true" />
                <h3>{t.panelB}</h3>
              </div>
              {matched.length === 0 ? (
                <p className="empty-state">{t.noSchemes}</p>
              ) : (
                <div className="grid-two">
                  {matched.map((scheme) => (
                    <div key={scheme.id} className="scheme-card" style={{ padding: "18px" }}>
                      <div className="scheme-card-head">
                        <strong>{scheme.title}</strong>
                        <span className={`badge ${scheme.tier === "eligible" ? "badge-success" : "badge-warning"}`}>
                          {scheme.tier === "eligible" ? t.eligible : t.partial}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>{scheme.benefits || "Scheme benefits summary"}</p>
                      {scheme.tier === "partial" && scheme.reason ? <p className="scheme-reason">{scheme.reason}</p> : null}
                      <a href={scheme.officialLink} target="_blank" rel="noreferrer" className="link-button">
                        {t.applyVia} <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="result-card result-card-soft">
              <div className="result-card-title">
                <XCircle size={20} aria-hidden="true" />
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
                      <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>{scheme.benefits || "Scheme benefits summary"}</p>
                      <p className="scheme-reason">
                        <strong>{t.reasonLabel}:</strong> {scheme.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>

          <div className="results-actions">
            <button type="button" className="button button-outline" onClick={onRestart}>
              <RotateCcw size={16} aria-hidden="true" /> {t.startOver}
            </button>
            <button type="button" className="button button-secondary" onClick={handlePrint}>
              <Printer size={16} aria-hidden="true" /> {t.printReport}
            </button>
            <button type="button" className="button button-ghost" onClick={onClearSaved}>
              <Trash2 size={16} aria-hidden="true" /> {t.clearSaved}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const Footer = React.memo(function Footer({ t }) {
  return (
    <footer className="footer-section" id="contact">
      <div className="page-shell footer-grid">
        <div>
          <div className="brand-logo-row footer-brand">
            <LogoMark />
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 800 }}>Nala Thittam</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>{t.brandTag}</p>
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
          <a href="#" aria-label="Twitter"><Share2 size={18} aria-hidden="true" /></a>
          <a href="#" aria-label="LinkedIn"><Globe size={18} aria-hidden="true" /></a>
          <a href="#" aria-label="Instagram"><MessageCircle size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="footer-note">
        <p>{t.disclaimer}</p>
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
});

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */
const STORAGE_KEY = "nala_thittam_form_v1";

export default function NalaThittam() {
  const [stage, setStage] = useState("landing");
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : createEmptyForm();
    } catch {
      return createEmptyForm();
    }
  });
  const [submittedData, setSubmittedData] = useState(createEmptyForm());
  const [isTamil, setIsTamil] = useState(false);
  const timerRef = useRef(null);

  const t = STR[isTamil ? "ta" : "en"];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch { /* ignore */ }
  }, [formData]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  const scrollToSection = useCallback((sectionId) => {
    if (sectionId === "login") { setStage("form"); return; }
    setStage("landing");
    setTimeout(() => {
      const node = document.getElementById(sectionId);
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const handleCheck = useCallback(() => {
    const snapshot = { ...formData };
    setSubmittedData(snapshot);
    setFormData(createEmptyForm());
    setStage("loading");
    timerRef.current = setTimeout(() => setStage("results"), 1800);
  }, [formData]);

  const handleRestart = useCallback(() => {
    setSubmittedData(createEmptyForm());
    setFormData(createEmptyForm());
    setStage("form");
  }, []);

  const handleClearSaved = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setFormData(createEmptyForm());
    setSubmittedData(createEmptyForm());
    setStage("landing");
  }, []);

  const handleDigiLocker = useCallback(() => {
    setSubmittedData(createEmptyForm());
    setFormData(createDigiLockerSample());
    setStage("form");
  }, []);

  const handleGoogle = useCallback(() => {
    setSubmittedData(createEmptyForm());
    setFormData(createDigiLockerSample());
    setStage("form");
  }, []);

  const handleContinue = useCallback(() => {
    setSubmittedData(createEmptyForm());
    setStage("form");
  }, []);

  return (
    <div className="nala-root">
      <GlobalStyles />
      <Header t={t} onNavigate={scrollToSection} onLogin={() => scrollToSection("login")} lang={isTamil} setLang={setIsTamil} />
      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage
              t={t}
              onContinue={handleContinue}
              onDigiLocker={handleDigiLocker}
              onGoogle={handleGoogle}
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
            <ResultsDashboard t={t} data={submittedData} onRestart={handleRestart} onClearSaved={handleClearSaved} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer t={t} />
    </div>
  );
}
