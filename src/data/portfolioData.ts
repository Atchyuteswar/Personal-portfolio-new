// ============================================================================
// ATCHYUTESWAR GOTTUMUKKALA — ACADEMIC, PATENT & COLLEGIATE PORTFOLIO DATA
// ============================================================================
// Central configuration file powering the entire portfolio.
// Populated with your official Indian Patent Application No. 202641112485,
// the full WasteAI Deep Learning Research Case Study, and all 7 resumes.
// ============================================================================

export interface PatentItem {
  id: string;
  title: string;
  applicationNumber: string;
  filingDate: string;
  jurisdiction: string;
  applicants?: string[];
  status: "Patent Filed" | "Published" | "Under Examination" | "Granted";
  domain: string;
  inventors: string[];
  abstract: string;
  keyClaims: string[];
  systemModules?: { code: string; name: string; role: string }[];
  relatedProjectId?: string;
  citationText: string;
  bibtex: string;
}

export interface BenchmarkRow {
  model: string;
  accuracy: string;
  precision: string;
  recall: string;
  f1: string;
  size: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category:
    | "Patented Healthcare & Edge AI"
    | "AI, ML & Data Science"
    | "Enterprise & Cloud (SAP / Web)"
    | "Web3 & Blockchain";
  semester: string;
  courseOrLab: string;
  advisor?: string;
  featured: boolean;
  status: "Completed" | "Live Research Prototype (v1.0.0)" | "Patented (App. 202641112485)";
  summary: string;
  problemStatement: string;
  methodology: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  benchmarkTable?: {
    caption: string;
    rows: BenchmarkRow[];
  };
  caseStudySections?: {
    workflow?: string[];
    preprocessingNotes?: { model: string; transform: string }[];
    challengesAndDecisions?: string[];
    limitations?: string;
    futureWork?: string[];
  };
  links: {
    github?: string;
    reportPdf?: string;
    liveDemo?: string;
    huggingFace?: string;
    releaseTag?: string;
    slides?: string;
  };
}

export interface CertificationGroup {
  id: string;
  issuer: string;
  category: string;
  period: string;
  badgeText: string;
  credentialId?: string;
  summary: string;
  items: string[];
}

export interface SemesterRecord {
  semester: string;
  period: string;
  status: "Completed" | "Current Semester" | "Upcoming (Final)";
  sgpa?: string;
  highlight: string;
  courses: {
    code: string;
    name: string;
    tag: "Core CS" | "Data Science" | "Systems" | "Capstone";
  }[];
}

export interface AcademicRole {
  id: string;
  role: string;
  organization: string;
  departmentOrLab: string;
  period: string;
  location: string;
  mentor?: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface CampusActivity {
  id: string;
  title: string;
  organization: string;
  category: "Leadership & Chapters" | "Open Source & Agile" | "Campus & Social Impact";
  period: string;
  badge: string;
  description: string;
  impactMetric?: string;
  link?: string;
}

export const portfolioData = {
  // --------------------------------------------------------------------------
  // 1. IDENTITY & ACADEMIC METADATA
  // --------------------------------------------------------------------------
  profile: {
    monogram: "AG",
    fullName: "Atchyuteswar Gottumukkala",
    rollNumber: "237Y1A67D3",
    academicTitle:
      "Final-Year B.Tech. CSE (Data Science) Undergraduate · Patent Inventor · SAP Certified ABAP Cloud & AI Engineer",
    degree: "Bachelor of Technology (B.Tech.) in Computer Science & Engineering (Data Science)",
    specialization: "Data Science, Deep Learning / Computer Vision, Edge AI & SAP ABAP Cloud",
    university: "Marri Laxman Reddy Institute of Technology and Management (MLRITM)",
    department: "Department of Computer Science & Engineering (Data Science)",
    location: "Dundigal, Hyderabad - 500043, Telangana, India",
    phone: "+91 7702850277",
    enrollmentYear: "2023",
    graduationMonthYear: "March 2027",
    graduationProgressPercent: 88,
    currentSemesterLabel: "Semester VII · Roll No. 237Y1A67D3 (Graduating March 2027)",
    cgpa: "7.65 / 10.0",
    rankOrDistinction:
      "Patent Inventor (IPO App. 202641112485) · SAP Certified (ABAP Cloud) · Chapter Head (1,000+ Members)",
    shortBio:
      "Final-year Computer Science & Engineering (Data Science) undergraduate at Marri Laxman Reddy Institute of Technology and Management (MLRITM), Hyderabad (Roll No. 237Y1A67D3, Class of March 2027). Co-inventor of a filed Indian Patent (Application No. 202641112485) on Portable Multimodal Edge-AI Healthcare Screening, creator of the WasteAI multi-CNN computer vision benchmark (91.29% test accuracy), and SAP Certified ABAP Cloud Developer.",
    researchStatement:
      "Across my undergraduate tenure (2023–2027), my work has focused on translating applied Data Science, Deep Learning, and core Computer Science principles into formal intellectual property and reproducible engineering artifacts—spanning modality-adaptive osteoarthritis risk screening (Indian Patent 202641112485), multi-architecture CNN benchmarks hosted on Hugging Face Hub (WasteAI), multimodal Gemini 2.5 Android apps (Volt), and SAP S/4HANA Clean Core business objects.",
    email: "atchyuteswar.gottumukkala@gmail.com",
    collegeEmail: "237y1a67d3@mlritm.ac.in",
    altEmail: "yt.atchyut@gmail.com",
    links: {
      cvPdf: "#certifications",
      googleScholar: "#patents",
      github: "https://github.com/Atchyuteswar",
      linkedin: "https://linkedin.com/in/Atchyuteswar",
      freelanceSite: "https://atchyut.vercel.app",
    },
    freelanceBridge: {
      enabled: true,
      label: "Looking for my commercial & freelance software studio?",
      ctaText: "Visit atchyut.vercel.app",
      url: "https://atchyut.vercel.app",
      description:
        "This site serves as my dedicated Academic, Patent & Collegiate Monograph for MLRITM (2023–2027). To view my commercial client engagements, freelance web platforms, and studio services, visit my primary portfolio at atchyut.vercel.app.",
      stats: [
        { label: "Patent Application", value: "202641112485" },
        { label: "Cloud & AI Badges", value: "30+ Earned" },
      ],
    },
    musicConfig: {
      enabled: true,
      autoplayOnVisit: true,
      randomizeOnVisit: true,
      defaultVolume: 0.35,
      customMp3Url: "",
      tracks: [
        {
          id: "track-01-rhodes",
          title: "I. Archival Study — Warm Rhodes & Chimes",
          subtitle: "Fmaj9 Jazz Harmony & Bell Overtones",
          mode: "chords",
        },
        {
          id: "track-02-arpeggio",
          title: "II. Glass Monograph — Minimalist Arpeggios",
          subtitle: "Flowing Felt-Piano & Harp Patterns",
          mode: "arpeggio",
        },
        {
          id: "track-03-lofi",
          title: "III. Midnight Thesis — Lo-Fi Beat & Sub Pulse",
          subtitle: "Neo-Soul Chords with Soft Lo-Fi Rhythm",
          mode: "lofi",
        },
        {
          id: "track-04-cosmos",
          title: "IV. Observatory — Ethereal Lydian Pad",
          subtitle: "Deep Shimmering Space & Harmonic Swells",
          mode: "cosmos",
        },
        {
          id: "track-05-conservatory",
          title: "V. Courtyard Conservatory — Chamber Plucks",
          subtitle: "Classical Counterpoint & Acoustic Strings",
          mode: "baroque",
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // 2. RESEARCH & ENGINEERING VECTORS
  // --------------------------------------------------------------------------
  researchAreas: [
    {
      code: "RV-01",
      title: "Multimodal Edge AI & Digital Healthcare",
      description:
        "Modality-adaptive sensor fusion, wearable IMU/gait analysis, and offline-capable edge AI screening for rural and low-connectivity clinics (Indian Patent 202641112485).",
    },
    {
      code: "RV-02",
      title: "Deep Learning, Computer Vision & NLP",
      description:
        "Multi-CNN transfer-learning benchmarks (WasteAI on Hugging Face & Streamlit), custom NLP dataset curation (Aira), and Gemini 2.5 Flash + ML Kit mobile inference (Volt).",
    },
    {
      code: "RV-03",
      title: "Enterprise SAP ABAP Cloud & Full-Stack",
      description:
        "SAP S/4HANA Clean Core extensibility, ABAP RAP & CDS Views alongside scalable Next.js, Kotlin Jetpack Compose, and Web3 architectures.",
    },
  ],

  // --------------------------------------------------------------------------
  // 3. FILED PATENTS & INTELLECTUAL PROPERTY (§ 01)
  // --------------------------------------------------------------------------
  patents: [
    {
      id: "PAT-01",
      title:
        "Portable Multimodal AI-Assisted Osteoarthritis Risk Screening and Early Detection System",
      applicationNumber: "202641112485",
      filingDate: "2026 (Form 2 Complete Specification under The Patent Act, 1970)",
      jurisdiction: "Indian Patent Office (IPO) · Chennai",
      applicants: [
        "Marri Laxman Reddy Institute of Technology and Management (MLRITM), Dundigal, Hyderabad-500043",
        "MLR Institute of Technology (MLRIT), Dundigal, Hyderabad-500043",
      ],
      status: "Patent Filed",
      domain: "Edge AI, Multimodal Biomedical Sensing & Rural Digital Healthcare",
      inventors: [
        "R. Tejasree",
        "Beemarthi Soumya Laxmi",
        "Atchyuteswar Gottumukkala",
        "Ch. Sathwika",
        "G. Karthik",
        "G. Srinivas",
        "Prof. Kavati Sridhar (Asst. Prof, ECE)",
        "Prof. Banoth Prasad (Assoc. Prof, CSE)",
        "Dr. S. P. Jani (Prof, Mech. Engg.)",
      ],
      abstract:
        "Discloses a Portable Multimodal AI-Assisted Osteoarthritis Risk Screening and Early Detection System (100) for preliminary screening of osteoarthritis (OA)-associated risk markers in resource-constrained, rural, and low-connectivity healthcare environments. The system integrates a Patient Assessment Module (110), Joint Movement Sensing Module (120), Gait and Posture Assessment Module (130), Optional Imaging/Sensor Acquisition Module (140), Edge AI Preprocessing Module (150), AI-Based OA Risk Analysis Module (160), Modality-Adaptive Risk Fusion and Severity Assessment Module (170), Healthcare Worker Interface Module (180), Offline Data and Synchronization Module (190), and Preventive Guidance and Reporting Module (200). Available and quality-qualified modality outputs are selectively combined on an edge computing platform to generate a preliminary OA risk profile without requiring simultaneous availability of all acquisition modalities, while supporting local offline storage and deferred synchronization with a Remote Healthcare System (102).",
      systemModules: [
        { code: "110", name: "Patient Assessment Module", role: "Pain, stiffness, mobility & guided functional assessment" },
        { code: "120", name: "Joint Movement Sensing Module", role: "IMU, accelerometer, gyroscope & wearable range/symmetry signals" },
        { code: "130", name: "Gait & Posture Assessment Module", role: "Camera/sensor walking pattern, balance & posture deviation" },
        { code: "140", name: "Optional Imaging/Sensor Module", role: "Thermal, pressure, force or imaging capture when available" },
        { code: "150", name: "Edge AI Preprocessing Module", role: "Noise reduction, segmentation, feature extraction & quality gating" },
        { code: "160", name: "AI-Based OA Risk Analysis Module", role: "Edge ML inference generating modality-specific OA risk indicators" },
        { code: "170", name: "Modality-Adaptive Risk Fusion (Core)", role: "Excludes unavailable/low-quality inputs & fuses qualified modalities" },
        { code: "180", name: "Healthcare Worker Interface", role: "Multilingual guided field workflow & digital screening record" },
        { code: "190", name: "Offline Data & Sync Module", role: "Local storage during network outage & deferred sync to System (102)" },
        { code: "200", name: "Preventive Guidance & Reporting", role: "Digital risk report & non-diagnostic joint-care guidance" },
      ],
      keyClaims: [
        "Claim 1 (Independent System Claim): A 10-module portable multimodal AI-assisted osteoarthritis risk screening system (100) configured to generate a preliminary OA risk profile using available and quality-qualified modality outputs without requiring simultaneous availability of all acquisition modalities.",
        "Claim 2 (Joint Movement Sensing — 120): Comprises inertial measurement units (IMUs), accelerometers, gyroscopes, magnetometers, or wearable/mobile motion sensors capturing movement range, pattern, symmetry, and stability during guided joint activities.",
        "Claim 3 (Gait & Posture Assessment — 130): Acquires walking pattern, step characteristics, balance, posture deviation, and movement asymmetry using wearable sensors, cameras, smartphones, or portable computing devices.",
        "Claim 4 (Edge AI Preprocessing & Quality Gating — 150): Performs noise reduction, signal conditioning, normalization, temporal segmentation, feature extraction, data-quality assessment, and modality availability determination prior to AI risk analysis.",
        "Claim 5 (Modality-Adaptive Risk Fusion — 170): Identifies available modalities, evaluates quality status (Stage 240), excludes unavailable or unsuitable modality outputs (Stage 241) without terminating screening, and selectively fuses qualified outputs.",
        "Claim 6 (Multilingual Field Interface — 180): Provides a guided multilingual workflow for healthcare workers comprising patient registration, language selection, assessment instructions, acquisition-status indication, and digital report generation.",
        "Claim 7 (Offline Storage & Controlled Sync — 190): Maintains locally stored patient assessments, extracted features, and screening results during network unavailability (Stage 300) and synchronizes with a Remote Healthcare System (102) upon connectivity restoration (Stage 320).",
        "Claim 8 (Preventive Guidance & Reporting — 200): Generates a digital screening report comprising the preliminary OA risk classification (Low / Moderate / High), observed risk indicators, and non-diagnostic preventive joint-care and lifestyle guidance.",
      ],
      relatedProjectId: "PRJ-01",
      citationText:
        "Tejasree, R., Beemarthi Soumya Laxmi, Atchyuteswar Gottumukkala, Ch. Sathwika, G. Karthik, G. Srinivas, Kavati Sridhar, Banoth Prasad, and S. P. Jani. \"Portable Multimodal AI-Assisted Osteoarthritis Risk Screening and Early Detection System.\" Indian Patent Application No. 202641112485, filed 2026 by Marri Laxman Reddy Institute of Technology and Management & MLR Institute of Technology, Hyderabad.",
      bibtex: `@misc{gottumukkala2026oapatent,
  title={Portable Multimodal AI-Assisted Osteoarthritis Risk Screening and Early Detection System},
  author={Tejasree, R. and Laxmi, Beemarthi Soumya and Gottumukkala, Atchyuteswar and Sathwika, Ch. and Karthik, G. and Srinivas, G. and Sridhar, Kavati and Prasad, Banoth and Jani, S. P.},
  year={2026},
  howpublished={Indian Patent Application No. 202641112485 (Form 2 Complete Specification)},
  note={Applicants: Marri Laxman Reddy Institute of Technology and Management (MLRITM) and MLR Institute of Technology, Dundigal, Hyderabad-500043 (Patent Filed)}
}`,
    },
  ] as PatentItem[],

  // --------------------------------------------------------------------------
  // 4. COLLEGIATE, PATENTED & PRODUCTION PROJECTS (§ 02)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "PRJ-01",
      title: "Portable Multimodal AI-Assisted Osteoarthritis Risk Screening System (100)",
      subtitle: "Patented Edge-AI Healthcare Platform · Modality-Adaptive Sensor Fusion · Offline Field Sync",
      category: "Patented Healthcare & Edge AI",
      semester: "2026 (Patent App. 202641112485)",
      courseOrLab: "MLRITM Interdisciplinary Research & IPR Cell",
      advisor: "Prof. Kavati Sridhar, Prof. Banoth Prasad & Dr. S. P. Jani",
      featured: true,
      status: "Patented (App. 202641112485)",
      summary:
        "Architected a 10-module portable edge-AI screening platform (System 100) for early detection of osteoarthritis (OA) risk markers across primary health centers, rural health camps, and mobile medical units with intermittent connectivity.",
      problemStatement:
        "Conventional osteoarthritis assessment relies on specialist consultation and fixed diagnostic imaging that are unavailable in rural and underserved healthcare locations, while rigid multi-sensor systems fail when individual sensors or network links are missing.",
      methodology: [
        "Designed a 4-channel multimodal acquisition layer: Patient Assessment Module (110), IMU/Wearable Joint Movement Sensing Module (120), Camera/Sensor Gait & Posture Assessment Module (130), and Optional Thermal/Pressure/Imaging Module (140).",
        "Formulated an Edge AI Preprocessing & Quality Gating pipeline (Module 150, Stages 230–241) and Modality-Adaptive Risk Fusion Engine (Module 170, Stage 260) that dynamically excludes unavailable or noisy modalities while fusing remaining qualified features.",
        "Integrated a multilingual Healthcare Worker Interface (Module 180), Preventive Guidance & Reporting Engine (Module 200), and Offline Data & Synchronization Module (190) for local storage (Stage 300) and deferred cloud sync (Stage 320) to Remote Healthcare System (102).",
      ],
      outcomes: [
        "Filed Form 2 Complete Specification under The Indian Patent Act, 1970 — Patent Application No. 202641112485.",
        "Established complete Examiner-Ready Section 3(k) technical hardware-software integration across 8 formal patent claims and 2 architectural workflow figures.",
      ],
      metrics: [
        { label: "Patent App No.", value: "202641112485" },
        { label: "System Architecture", value: "10 Modules" },
        { label: "Formal Claims", value: "8 Claims" },
      ],
      techStack: [
        "Edge AI",
        "Multimodal Sensor Fusion",
        "IMU & Wearable Sensing",
        "Computer Vision (Gait/Posture)",
        "Signal Conditioning",
        "Offline-First Sync",
        "Digital Healthcare",
      ],
      links: {
        reportPdf: "#patents",
      },
    },
    {
      id: "PRJ-02",
      title: "WasteAI — Deep Learning-Based Waste Classification & Multi-CNN Benchmark",
      subtitle: "End-to-End Computer Vision Research Prototype · 4 CNN Architectures · Hugging Face Hub & Streamlit",
      category: "AI, ML & Data Science",
      semester: "Academic Research Prototype (v1.0.0)",
      courseOrLab: "Computer Vision & Deep Learning Experimentation (B.Tech CSE — Data Science)",
      featured: true,
      status: "Live Research Prototype (v1.0.0)",
      summary:
        "Built and deployed an end-to-end six-class waste image classification research prototype comparing four CNN architectures (VGG19, VGG16, MobileNetV2, and a 4-block Custom CNN) across 2,526 images, achieving 91.29% held-out test accuracy and serving on-demand Keras weights from Hugging Face Hub via Streamlit.",
      problemStatement:
        "Effective waste sorting relies on accurate material identification prior to disposal. WasteAI was engineered to go beyond an isolated notebook experiment by connecting reproducible dataset splits, multi-architecture CNN benchmarking, training-to-inference preprocessing parity, decoupled Hugging Face model hosting, and public interactive deployment in one cohesive research artifact.",
      methodology: [
        "Prepared a reproducible Stage 2 experiment manifest on the 6-class Garbage Classification dataset (`cardboard`, `glass`, `metal`, `paper`, `plastic`, `trash` — 2,526 total images split 70% train [1,768] / 15% val [379] / 15% test [379] with seed 42, balanced class weights, and flip/rotation/zoom/contrast augmentation).",
        "Trained and evaluated four distinct architectures on the identical 379-image held-out split: a 4-block Custom CNN from scratch (32/64/128/256 filters, BatchNorm, MaxPool, Dropout, GAP) and transfer-learning pipelines for MobileNetV2, VGG16, and VGG19.",
        "Guaranteed strict training-to-inference preprocessing parity: EXIF orientation normalization, RGB conversion, TensorFlow bilinear resizing to 224 × 224 (`antialias=False`), and architecture-specific input scaling (`[0, 1]` for Custom CNN vs `* 255` + Keras `preprocess_input` for MobileNetV2/VGG16/VGG19).",
        "Decoupled 289+ MB of `.keras` model weights from Git into a dedicated Hugging Face Hub repository (`Atchyuteswar/wasteai-models`) with on-demand downloading and a 1-model-at-a-time memory cache inside a 5-module Streamlit application.",
      ],
      outcomes: [
        "Achieved 91.29% held-out test accuracy (89.93% Macro F1) with VGG19, while demonstrating an 87.07% accuracy / 22.60 MB lightweight deployment trade-off with MobileNetV2 (6.6x smaller than VGG19).",
        "Published full v1.0.0 release with live Streamlit deployment, public Hugging Face model repository, and portable project-relative split manifests.",
      ],
      metrics: [
        { label: "Best Test Accuracy", value: "91.29% (VGG19)" },
        { label: "Dataset Split", value: "2,526 Images" },
        { label: "Architectures", value: "4 CNN Models" },
      ],
      benchmarkTable: {
        caption:
          "Held-out evaluation across all 4 trained architectures on the identical 379-image test split (Seed 42):",
        rows: [
          {
            model: "VGG19 (Best Accuracy)",
            accuracy: "91.29%",
            precision: "90.43%",
            recall: "89.76%",
            f1: "89.93%",
            size: "150.03 MB",
            highlight: true,
          },
          {
            model: "VGG16",
            accuracy: "88.65%",
            precision: "87.58%",
            recall: "88.14%",
            f1: "87.69%",
            size: "111.76 MB",
          },
          {
            model: "MobileNetV2 (Best Size/Acc Trade-off)",
            accuracy: "87.07%",
            precision: "87.29%",
            recall: "85.67%",
            f1: "86.01%",
            size: "22.60 MB",
          },
          {
            model: "Custom CNN (4-Block Baseline)",
            accuracy: "73.09%",
            precision: "70.27%",
            recall: "72.12%",
            f1: "69.62%",
            size: "4.92 MB",
          },
        ],
      },
      caseStudySections: {
        workflow: [
          "1. Image Input: User uploads an RGB waste image via the Streamlit interface.",
          "2. Image Preparation: EXIF orientation is normalized, converted to 3-channel RGB, and resized to 224 × 224 using TensorFlow bilinear interpolation (`antialias=False`).",
          "3. Model-Specific Preprocessing: Applies exact training normalization (`[0, 1]` for Custom CNN; `* 255` then architecture-specific `preprocess_input` for MobileNetV2, VGG16, and VGG19).",
          "4. On-Demand Inference: Selected `.keras` model is pulled from Hugging Face Hub (cached 1 model at a time to bound RAM) to produce 6 class scores.",
          "5. Presentation & Analytics: Displays predicted category, 6-class probability distribution, disposal guidance, and comparative training/test analytics.",
        ],
        preprocessingNotes: [
          { model: "Custom CNN", transform: "Common RGB tensor normalized to [0, 1]" },
          { model: "MobileNetV2", transform: "Multiply by 255, then MobileNetV2 preprocess_input" },
          { model: "VGG16", transform: "Multiply by 255, then VGG16 preprocess_input" },
          { model: "VGG19", transform: "Multiply by 255, then VGG19 preprocess_input" },
        ],
        challengesAndDecisions: [
          "Fair Multi-Model Comparison: Enforced the exact same Stage 2 train/val/test split (1,768 / 379 / 379, seed 42) across all four architectures.",
          "Training-Inference Parity: Replaced Pillow resizing with TensorFlow bilinear interpolation (`antialias=False`) to match notebook `tf.image.resize` behavior.",
          "Decoupled Weight Hosting: Stored `.keras` models (up to 150 MB) on Hugging Face Hub rather than bloating Git history.",
          "Cloud Memory Management: Implemented single-model active caching so switching between VGG19 and VGG16 does not exhaust Streamlit Cloud RAM.",
          "Portable Experiment Metadata: Converted Colab-specific absolute paths into portable project-relative dataset manifests.",
        ],
        limitations:
          "WasteAI is an academic computer-vision research prototype, not a certified industrial sorting system. Predictions reflect visual dataset categories rather than chemical resin composition, contamination state, or municipal recyclability rules, and softmax outputs are uncalibrated.",
        futureWork: [
          "Evaluate generalization on larger external out-of-distribution waste datasets captured under varied lighting and backgrounds.",
          "Add per-class precision/recall confusion analysis and temperature-scaled probability calibration.",
          "Explore INT8 quantization and model compression on MobileNetV2 for edge/mobile deployment.",
          "Profile cold-start Hugging Face download time, warm inference latency, and peak RAM footprint.",
        ],
      },
      techStack: [
        "Python 3.11",
        "TensorFlow 2.21",
        "Keras 3.13",
        "Streamlit",
        "Hugging Face Hub",
        "VGG19 / VGG16",
        "MobileNetV2",
        "Custom CNN",
        "Altair",
        "scikit-learn",
      ],
      links: {
        liveDemo: "https://wasteai-atchyuteswar.streamlit.app/",
        github: "https://github.com/Atchyuteswar/WasteAI",
        huggingFace: "https://huggingface.co/Atchyuteswar/wasteai-models",
        releaseTag: "https://github.com/Atchyuteswar/WasteAI/releases/tag/v1.0.0",
      },
    },
    {
      id: "PRJ-03",
      title: "Volt — AI-Powered Multimodal Nutrition & Hydration Tracker",
      subtitle: "Native Android (Kotlin + Jetpack Compose) · Gemini 2.5 Flash · ML Kit · Supabase",
      category: "AI, ML & Data Science",
      semester: "Sem IV (March 2025)",
      courseOrLab: "Applied AI & Mobile Systems Engineering",
      featured: true,
      status: "Completed",
      summary:
        "Built a 5,500+ LOC native Android application in Kotlin and Jetpack Compose for AI-powered nutrition and hydration tracking via camera vision, voice input, and barcode scanning using Google Gemini 2.5 Flash and ML Kit.",
      problemStatement:
        "Manual calorie and macro logging suffers from high user drop-off due to tedious text search and inaccurate portion estimation for regional Indian and global meals.",
      methodology: [
        "Engineered a multimodal food-logging pipeline combining camera vision, natural voice input, and ML Kit barcode scanning powered by Google Gemini 2.5 Flash.",
        "Built deep nutritional analytics dashboards, an interactive Android Glance home-screen widget, and an AI Coach that synthesizes personalized weekly debriefs from longitudinal user telemetry.",
        "Architected a serverless backend on Supabase (PostgreSQL, Row-Level Security, Edge Functions, Auth) integrated with RevenueCat subscription scaffolding across ~5,500 lines of idiomatic Kotlin.",
      ],
      outcomes: [
        "Delivered a production-grade native Android codebase (~5,500 LOC) with end-to-end multimodal AI inference.",
        "Unified three input modalities (Vision, Voice, Barcode) into a single low-latency Supabase data model.",
      ],
      metrics: [
        { label: "Codebase Scale", value: "~5,500 LOC" },
        { label: "AI Modalities", value: "Vision + Voice" },
        { label: "Core Engine", value: "Gemini 2.5 Flash" },
      ],
      techStack: [
        "Kotlin",
        "Jetpack Compose",
        "Android Glance",
        "Gemini 2.5 Flash",
        "Google ML Kit",
        "Supabase",
        "PostgreSQL",
        "Edge Functions",
        "RevenueCat",
      ],
      links: {
        github: "https://github.com/Atchyuteswar",
      },
    },
    {
      id: "PRJ-04",
      title: "Aira — Custom NLP Emotional Support Companion & FastAPI Engine",
      subtitle: "Dataset Curation · Model Fine-Tuning (Google Colab) · FastAPI · React Native (Expo)",
      category: "AI, ML & Data Science",
      semester: "Sem V (August 2025)",
      courseOrLab: "Data Science & Natural Language Processing",
      featured: true,
      status: "Completed",
      summary:
        "Curated a specialized emotional-support conversational dataset, fine-tuned a lightweight NLP model in Google Colab, and deployed it via a FastAPI inference server integrated with a cross-platform React Native (Expo) mobile app.",
      problemStatement:
        "Generic off-the-shelf LLM wrappers often lack empathetic tone calibration and lightweight deployment characteristics needed for accessible student mental-wellness support.",
      methodology: [
        "Designed and cleaned a custom supervised dataset focused on empathetic active listening and emotional support dialogues.",
        "Trained and evaluated a lightweight NLP model in Google Colab, optimizing for conversational coherence and low-latency CPU/cloud inference.",
        "Exposed the trained model via an asynchronous Python FastAPI REST service and built a responsive React Native (Expo) mobile client.",
      ],
      outcomes: [
        "Successfully demonstrated the complete Data Science lifecycle: raw dataset curation → Colab model training → FastAPI serving → mobile UI deployment.",
        "Published live interactive mobile build on Expo (`expo.dev/accounts/kazexyt/projects/aira-frontend`).",
      ],
      metrics: [
        { label: "Pipeline", value: "End-to-End NLP" },
        { label: "Backend", value: "Python FastAPI" },
        { label: "Mobile Client", value: "React Native Expo" },
      ],
      techStack: [
        "Python",
        "NLP / Model Training",
        "Dataset Curation",
        "Google Colab",
        "FastAPI",
        "React Native",
        "Expo",
      ],
      links: {
        github: "https://github.com/Atchyuteswar",
        liveDemo: "https://expo.dev/accounts/kazexyt/projects/aira-frontend",
      },
    },
    {
      id: "PRJ-05",
      title: "SAP S/4HANA Clean Core & ABAP RAP Business Object Suite",
      subtitle: "ABAP RESTful Application Programming Model · CDS Views · ADT/Eclipse · BOR",
      category: "Enterprise & Cloud (SAP / Web)",
      semester: "Sem VII (Aug – Sep 2026)",
      courseOrLab: "Naxrita Devcon Associate — Enterprise Systems",
      featured: true,
      status: "Completed",
      summary:
        "Independently architected and delivered multiple enterprise business objects and data models using ABAP RAP, Core Data Services (CDS) Views, and ABAP Dictionary in ADT/Eclipse, strictly validated against SAP S/4HANA Clean Core extensibility guidelines.",
      problemStatement:
        "Legacy ERP modifications tightly couple custom code to core tables, breaking upgrade paths in cloud-native SAP S/4HANA environments.",
      methodology: [
        "Modeled normalized database tables, domains, and data elements in the ABAP Dictionary (SE11/SE80) and exposed semantic layers via CDS Views.",
        "Implemented Behavior Definitions and Business Objects using the ABAP RESTful Application Programming Model (RAP) inside ADT/Eclipse.",
        "Developed classical and interactive ALV reports, Smart Forms, and Business Object Repository (BOR) integrations adhering to Clean Core principles.",
      ],
      outcomes: [
        "Earned official SAP Certified Back-End Developer — ABAP Cloud credential (Sep 2026).",
        "Delivered multiple end-to-end RAP applications validated against SAP S/4HANA Clean Core standards.",
      ],
      metrics: [
        { label: "Architecture", value: "SAP Clean Core" },
        { label: "Framework", value: "ABAP RAP + CDS" },
        { label: "Certification", value: "SAP Certified" },
      ],
      techStack: [
        "SAP ABAP Cloud",
        "ABAP RAP",
        "CDS Views",
        "OO ABAP",
        "ABAP Dictionary",
        "SAP S/4HANA",
        "ADT / Eclipse",
        "ALV Reports",
      ],
      links: {
        github: "https://github.com/Atchyuteswar",
      },
    },
    {
      id: "PRJ-06",
      title: "Cryptolit — Full-Stack Web3 Wallet & Decentralized Bounty Platform",
      subtitle: "Next.js · BSV Blockchain · Smart Contracts · Neon DB · Prisma ORM",
      category: "Web3 & Blockchain",
      semester: "Sem III (July 2024)",
      courseOrLab: "Timechain Labs Blockchain Fellowship",
      featured: true,
      status: "Completed",
      summary:
        "Engineered a full-stack Web3 platform supporting raw cryptographic wallet creation, cloud wallet synchronization, saved user profiles, and smart-contract-backed bounty workflows.",
      problemStatement:
        "Onboarding users to Web3 applications requires bridging raw cryptographic key management with familiar cloud-backed profile and bounty experiences.",
      methodology: [
        "Implemented BSV blockchain smart contract interactions, raw wallet keypair generation, and cloud wallet authentication flows.",
        "Designed the relational persistence layer using PostgreSQL on Neon DB with type-safe Prisma ORM migrations.",
        "Built a responsive Next.js full-stack interface deployed on Vercel (`cryptolit.vercel.app`).",
      ],
      outcomes: [
        "Shipped live Web3 platform with integrated Raw Wallet, Cloud Wallet, Saved Profiles, and Bounty modules.",
        "Awarded 'Skilled Developer' certification from Timechain Labs.",
      ],
      metrics: [
        { label: "Wallet Modes", value: "Raw + Cloud" },
        { label: "Database", value: "Neon + Prisma" },
        { label: "Deployment", value: "Live on Vercel" },
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "BSV Blockchain",
        "Smart Contracts",
        "Neon DB",
        "Prisma ORM",
        "Tailwind CSS",
      ],
      links: {
        github: "https://github.com/Atchyuteswar",
        liveDemo: "https://cryptolit.vercel.app",
      },
    },
    {
      id: "PRJ-07",
      title: "BBH-MLRITM — Campus Blockchain Chapter Portal & Event Hub",
      subtitle: "Official College Club Platform for Big Blockers Hyderabad @ MLRITM",
      category: "Web3 & Blockchain",
      semester: "Sem III (December 2024)",
      courseOrLab: "MLRITM Campus Technical Society",
      featured: false,
      status: "Completed",
      summary:
        "Designed and deployed the official campus chapter website for Big Blockers Hyderabad at MLRITM (`bbh-mlritm.vercel.app`), showcasing the student leadership roster, technical bootcamps, and event gallery.",
      problemStatement:
        "Needed a central digital hub at MLRITM to coordinate blockchain bootcamps, workshop registrations, and event archives for 1,000+ student community members.",
      methodology: [
        "Built a fast, mobile-first Next.js web portal featuring structured event listings, core team directories, and workshop photo galleries.",
        "Deployed with continuous integration on Vercel for instant updates during campus hackathons and seminars.",
      ],
      outcomes: [
        "Supported campus outreach across 3+ major blockchain bootcamps and workshops training 700+ students.",
      ],
      metrics: [
        { label: "Chapter Reach", value: "1,000+ Members" },
        { label: "Students Trained", value: "700+" },
        { label: "Status", value: "Live Portal" },
      ],
      techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      links: {
        github: "https://github.com/Atchyuteswar",
        liveDemo: "https://bbh-mlritm.vercel.app",
      },
    },
    {
      id: "PRJ-08",
      title: "Climate Action Front (CAF) — Climate Governance & Data Repository",
      subtitle: "Policy & Investor Decision-Support Platform + Climate Data Analysis",
      category: "Enterprise & Cloud (SAP / Web)",
      semester: "Sem III–IV (Dec 2024 – Jan 2025)",
      courseOrLab: "Data Science & Social Impact Engineering",
      featured: false,
      status: "Completed",
      summary:
        "Developed the web platform (`climate-action-front.vercel.app`) and organized the underlying climate data repository for a Delhi-based climate governance initiative, enabling data-driven policy and investor decisions.",
      problemStatement:
        "Climate policy researchers and green investors needed structured access to curated environmental datasets, governance publications, and organizational resources.",
      methodology: [
        "Architected and deployed the full organization portal with team directories, policy blog publishing, and resource libraries.",
        "Organized and maintained the climate data repository, analyzing datasets to extract actionable insights for climate governance stakeholders.",
      ],
      outcomes: [
        "Live production platform serving climate governance insights and research publications.",
      ],
      metrics: [
        { label: "Focus", value: "Climate Data" },
        { label: "Role", value: "Tech Contributor" },
        { label: "Platform", value: "Next.js / Vercel" },
      ],
      techStack: ["Next.js", "Data Analysis", "Python", "Tailwind CSS", "Vercel"],
      links: {
        github: "https://github.com/Atchyuteswar",
        liveDemo: "https://climate-action-front.vercel.app",
      },
    },
    {
      id: "PRJ-09",
      title: "Simple Todo REST API & Earth Leaders Sustainability Portal",
      subtitle: "Swagger OpenAPI Backend + Interactive Environmental Education Web App",
      category: "Enterprise & Cloud (SAP / Web)",
      semester: "Sem II–III (Jan – Aug 2024)",
      courseOrLab: "Full-Stack Web Engineering & API Design",
      featured: false,
      status: "Completed",
      summary:
        "A pair of early undergraduate web systems: (1) a RESTful task service documented with interactive Swagger/OpenAPI specs, and (2) 'Earth Leaders' & 'Dhara', interactive web platforms promoting ecological restoration.",
      problemStatement:
        "Demonstrating clean REST API contract documentation with Swagger alongside engaging educational web interfaces.",
      methodology: [
        "Built RESTful CRUD endpoints with full Swagger UI schema documentation (`simple-todo-two-coral.vercel.app/swagger`).",
        "Developed interactive gamified awareness modules in Earth Leaders (`earth-leaders.vercel.app`) and team qualification portal Dhara (`dhara-website.netlify.app`).",
      ],
      outcomes: [
        "3 live deployed web applications demonstrating progressive mastery of REST APIs, Svelte, and Next.js.",
      ],
      metrics: [
        { label: "API Spec", value: "Swagger OpenAPI" },
        { label: "Deployments", value: "3 Live Apps" },
        { label: "Year", value: "2024" },
      ],
      techStack: ["Next.js", "Svelte", "Node.js", "REST API", "Swagger", "Vercel", "Netlify"],
      links: {
        liveDemo: "https://simple-todo-two-coral.vercel.app/swagger",
        github: "https://github.com/Atchyuteswar",
      },
    },
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // 5. CERTIFICATIONS, CREDENTIALS & TECHNICAL BADGES (§ 03)
  // --------------------------------------------------------------------------
  certifications: [
    {
      id: "CERT-SAP",
      issuer: "SAP",
      category: "Enterprise Cloud Certification",
      period: "Issued Sep 2026 · Valid Sep 2026 – Sep 2027",
      badgeText: "Official SAP Certified",
      credentialId: "09dc84ad-438c-4d0e-a216-29110195af66",
      summary:
        "SAP Certified – Back-End Developer, ABAP Cloud. Validates proficiency in ABAP RESTful Application Programming Model (RAP), Core Data Services (CDS), Object-Oriented ABAP, and Clean Core extensibility for SAP S/4HANA.",
      items: [
        "ABAP RESTful Application Programming Model (RAP)",
        "Core Data Services (CDS Views) & ABAP Dictionary",
        "SAP S/4HANA Clean Core Extensibility",
        "ABAP Development Tools (ADT / Eclipse) & OO ABAP",
      ],
    },
    {
      id: "CERT-CLOUD-AI",
      issuer: "Google Cloud, AWS Academy & NVIDIA DLI",
      category: "Cloud Computing & Generative AI (18+ Credentials)",
      period: "Sep 2023 – Aug 2026",
      badgeText: "AWS + GCP + NVIDIA",
      summary:
        "Completed AWS Academy Cloud Foundations (20-hr badge, Aug 2026), NVIDIA Deep Learning Institute's 'Generative AI Explained', Google Cloud Computing Foundations Certificate, and 16 hands-on Google Cloud Skill Badges.",
      items: [
        "AWS Academy Graduate — Cloud Foundations (Aug 2026)",
        "NVIDIA Deep Learning Institute — Generative AI Explained",
        "Manage Kubernetes in Google Cloud & Load Balancing on Compute Engine",
        "Explore Generative AI with the Gemini API in Vertex AI",
        "Inspect Rich Documents with Gemini Multimodality & Multimodal RAG",
        "Develop GenAI Apps with Gemini & Streamlit + Prompt Design in Vertex AI",
        "Build Real World AI Applications with Gemini & Imagen",
        "Prepare Data for ML APIs & Google Cloud Computing Foundations (4-Course Suite)",
      ],
    },
    {
      id: "CERT-CISCO",
      issuer: "Cisco Networking Academy",
      category: "Data Science, AI, Cybersecurity & Networking (12+ Courses)",
      period: "2024 – 2026",
      badgeText: "12+ Cisco Credentials",
      summary:
        "Comprehensive academic credential track across Data Analytics, Python programming, Modern AI, Cybersecurity, and Computer Networking through Cisco Networking Academy.",
      items: [
        "Data Analytics Essentials & Introduction to Data Science",
        "Introduction to Modern AI & Apply AI: Analyze Customer Reviews",
        "Python Essentials 1 & Python Essentials 2",
        "Junior Cybersecurity Analyst Career Path & Security/Connectivity Support",
        "Network Technician Career Path, Network Addressing & OS/Hardware Support",
        "CCNA: Introduction to Networks & CCNA 200-301 Track",
      ],
    },
    {
      id: "CERT-DEV",
      issuer: "Microsoft, BSV Academy, Postman, FreeCodeCamp & EF SET",
      category: "Software Engineering, Security, Web3 & Language Proficiency",
      period: "2024 – 2025",
      badgeText: "Multi-Domain Verified",
      summary:
        "Industry certifications spanning API engineering, Web3 smart contracts, security operations, frontend/DSA foundations, and C1 Advanced English proficiency.",
      items: [
        "EF SET English Certificate — Score: 67/100 (C1 Advanced, Sep 2025)",
        "Microsoft — Copilot for Security Ninja Training",
        "BSV Academy — Bitcoin Script & Bitcoin Enterprise",
        "Timechain Labs — Skilled Developer Credential",
        "Postman — API Fundamentals Student Expert",
        "FreeCodeCamp — JavaScript Algorithms & Data Structures, Responsive Web Design, Front End Libraries",
        "Unity — Unity Essentials Pathway",
      ],
    },
  ] as CertificationGroup[],

  // --------------------------------------------------------------------------
  // 6. EDUCATION & ROAD TO MARCH 2027 (§ 04)
  // --------------------------------------------------------------------------
  education: {
    degreeTitle: "Bachelor of Technology (B.Tech.) — Computer Science & Engineering (Data Science)",
    institution: "Marri Laxman Reddy Institute of Technology and Management (MLRITM)",
    location: "Dundigal, Hyderabad - 500043, Telangana, India",
    duration: "2023 — March 2027 (Expected Graduation · Roll No. 237Y1A67D3)",
    cgpa: "7.65 / 10.0",
    priorEducation: {
      level: "Intermediate MPC (Mathematics, Physics, Chemistry — Science)",
      institution: "Sri Chaitanya Junior Kalasala, Telangana, India",
      duration: "2021 — 2023",
    },
    thesisTitle:
      "Portable Multimodal AI-Assisted Osteoarthritis Risk Screening and Early Detection System (Indian Patent Application No. 202641112485)",
    advisor: "Prof. Kavati Sridhar (ECE), Prof. Banoth Prasad (CSE) & Dr. S. P. Jani (MLRITM)",
    honors: [
      "Filed Utility Patent Co-Inventor — Indian Patent Application No. 202641112485 (Form 2 Complete Specification, MLRITM & MLRIT)",
      "Author of WasteAI Multi-CNN Computer Vision Benchmark (91.29% Held-Out Test Accuracy · Hosted on Hugging Face Hub & Streamlit)",
      "SAP Certified Back-End Developer — ABAP Cloud (Credential ID: 09dc84ad-438c-4d0e-a216-29110195af66)",
      "Head of Hyderabad Chapter — Big Blockers Community (Grew chapter to 1,000+ members & trained 700+ students)",
      "Earned 30+ Verified Industry Certifications & Cloud/AI Skill Badges (Google Cloud, AWS, NVIDIA, Cisco, Microsoft)",
    ],
    semesters: [
      {
        semester: "Year 1 (Sem I & II)",
        period: "2023 – 2024",
        status: "Completed",
        sgpa: "Completed",
        highlight: "Foundational Programming, Data Structures, Cloud Foundations & Swecha Volunteering",
        courses: [
          { code: "CS101", name: "Programming for Problem Solving & Data Structures", tag: "Core CS" },
          { code: "MA101", name: "Linear Algebra, Calculus & Statistical Methods", tag: "Data Science" },
          { code: "CS104", name: "Object-Oriented Programming (Python & Java)", tag: "Core CS" },
          { code: "GCP-23", name: "Google Cloud Computing Foundations & ML APIs", tag: "Systems" },
        ],
      },
      {
        semester: "Year 2 (Sem III & IV)",
        period: "2024 – 2025",
        status: "Completed",
        sgpa: "Completed",
        highlight: "DBMS, Operating Systems, Timechain Labs Web3 Internship, GSSoC '24 & Volt AI App",
        courses: [
          { code: "CS201", name: "Database Management Systems (DBMS) & SQL", tag: "Core CS" },
          { code: "CS202", name: "Operating Systems & Process Synchronization", tag: "Systems" },
          { code: "DS204", name: "Exploratory Data Analysis with Python, R & Power BI", tag: "Data Science" },
          { code: "CS206", name: "Software Development & REST API Engineering", tag: "Systems" },
        ],
      },
      {
        semester: "Year 3 (Sem V & VI)",
        period: "2025 – 2026",
        status: "Completed",
        sgpa: "Completed",
        highlight: "Computer Networks, Compiler Design, WasteAI CNN Benchmark & Aira NLP Companion",
        courses: [
          { code: "CS301", name: "Computer Networks & Protocol Engineering", tag: "Core CS" },
          { code: "CS302", name: "Compiler Design & Formal Languages", tag: "Core CS" },
          { code: "DS305", name: "Deep Learning, CNNs & Natural Language Processing", tag: "Data Science" },
          { code: "IP390", name: "Multimodal Sensor Fusion & Edge-AI Prototyping", tag: "Capstone" },
        ],
      },
      {
        semester: "Semester VII (Current)",
        period: "Aug 2026 – Dec 2026",
        status: "Current Semester",
        sgpa: "7.65 CGPA",
        highlight: "Patent Filing (App. 202641112485), Naxrita SAP ABAP Internship & SAP Cloud Certification",
        courses: [
          { code: "PAT-26", name: "Patent Filing: Multimodal AI Osteoarthritis Screening (202641112485)", tag: "Capstone" },
          { code: "CS401", name: "Enterprise Systems & SAP ABAP Cloud (RAP / CDS)", tag: "Systems" },
          { code: "DS402", name: "Deep Learning & Multimodal Generative AI (Gemini / Vertex)", tag: "Data Science" },
          { code: "CS498", name: "B.Tech. Major Capstone Project — Phase I", tag: "Capstone" },
        ],
      },
      {
        semester: "Semester VIII (Graduation)",
        period: "Jan 2027 – March 2027",
        status: "Upcoming (Final)",
        sgpa: "Graduating Mar 2027",
        highlight: "Final B.Tech. Thesis Defense, Patent Prosecution & Degree Conferral (March 2027)",
        courses: [
          { code: "CS499", name: "B.Tech. Major Capstone Project — Phase II & Final Defense", tag: "Capstone" },
          { code: "DS410", name: "Production Data Engineering & Enterprise Deployment", tag: "Data Science" },
        ],
      },
    ] as SemesterRecord[],
  },

  // --------------------------------------------------------------------------
  // 7. INTERNSHIPS & TECHNICAL EXPERIENCE (§ 05)
  // --------------------------------------------------------------------------
  academicExperience: [
    {
      id: "EXP-01",
      role: "Devcon Associate — SAP ABAP Development Intern",
      organization: "Naxrita",
      departmentOrLab: "Enterprise SAP S/4HANA & ABAP Cloud Practice",
      period: "Aug 2026 — Sep 2026",
      location: "Hyderabad, Telangana, India · On-site",
      description:
        "Completed an intensive on-site enterprise engineering internship focused on SAP S/4HANA Clean Core extensibility, ABAP RESTful Application Programming Model (RAP), and Core Data Services (CDS).",
      highlights: [
        "Built ABAP RESTful Application Programming Model (RAP) applications in ADT/Eclipse, covering behavior definitions and business object modeling.",
        "Created CDS Views for semantic data modeling aligned with SAP's Clean Core principles for S/4HANA extensibility.",
        "Trained in core SAP ABAP development including T-Codes (SE80, SE11, SE37, SE24), Domains, Data Elements, and Database Tables in the ABAP Dictionary.",
        "Developed classical and interactive ALV reports, worked with the Business Object Repository (BOR) for OO ABAP integration, and independently delivered multiple RAP projects.",
      ],
      tags: ["SAP ABAP Cloud", "ABAP RAP", "CDS Views", "Clean Core", "SAP S/4HANA", "ADT/Eclipse"],
    },
    {
      id: "EXP-02",
      role: "Tech Contributor & Climate Data Repository Lead",
      organization: "Climate Action Front (CAF)",
      departmentOrLab: "Climate Governance & Data Analytics Team",
      period: "Dec 2024 — Present",
      location: "Delhi, India · Remote",
      description:
        "Driving web engineering and environmental dataset curation to support climate governance transparency and investor decision-making.",
      highlights: [
        "Developed and deployed the official CAF web platform (climate-action-front.vercel.app) to facilitate timely climate governance information.",
        "Organized and maintained the central climate data repository; analyzed datasets to generate actionable insights for clients in climate policy and investment.",
      ],
      tags: ["Next.js", "Data Analysis", "Data Repositories", "Climate Tech", "Vercel"],
    },
    {
      id: "EXP-03",
      role: "Blockchain Developer Intern",
      organization: "Timechain Labs",
      departmentOrLab: "Full-Stack Web3 & Smart Contract Engineering",
      period: "Jun 2024 — Oct 2024",
      location: "Remote",
      description:
        "Engineered full-stack Web2 and Web3 applications using Next.js, Node.js, Svelte, and BSV smart contracts.",
      highlights: [
        "Implemented Web3 smart contract and multi-mode wallet functionality in the Cryptolit platform (cryptolit.vercel.app).",
        "Built full-stack web applications using Next.js, Node.js, and Svelte, including a RESTful To-Do application documented with Swagger OpenAPI.",
        "Managed relational database schemas and migrations using Neon DB (Serverless PostgreSQL) and Prisma ORM.",
      ],
      tags: ["Next.js", "Svelte", "Node.js", "Web3 / Smart Contracts", "Neon DB", "Prisma ORM", "Swagger"],
    },
    {
      id: "EXP-04",
      role: "Scrum Master Intern & Open-Source Volunteer",
      organization: "Swecha Telangana & GirlScript Summer of Code (GSSoC '24)",
      departmentOrLab: "Agile Delivery & Open-Source Engineering",
      period: "Oct 2023 — Dec 2025",
      location: "Hyderabad, India & Remote",
      description:
        "Combined Agile project leadership at Swecha Telangana with open-source code contributions during GirlScript Summer of Code 2024.",
      highlights: [
        "Swecha Telangana (May – Aug 2024): Led Agile ceremonies (sprint planning, standups, retrospectives) as a certified Scrum Master across 2 internal projects, improving delivery timelines by 90%.",
        "GirlScript Summer of Code 2024 (Oct – Nov 2024): Fixed 10+ bugs and implemented 10+ features across open-source web repositories, earning the 'Contributor (WoB)' badge.",
      ],
      tags: ["Agile / Scrum Master", "Open Source", "GSSoC 2024", "Swecha Telangana", "Web Engineering"],
    },
  ] as AcademicRole[],

  // --------------------------------------------------------------------------
  // 8. CAMPUS LEADERSHIP, CLUBS & EXTRACURRICULARS (§ 06)
  // --------------------------------------------------------------------------
  campusLife: [
    {
      id: "CL-01",
      title: "Head of Hyderabad Chapter",
      organization: "Big Blockers Community (MLRITM & Hyderabad Chapter)",
      category: "Leadership & Chapters",
      period: "Sep 2024 — Aug 2025",
      badge: "1,000+ Chapter Members",
      description:
        "Led the Hyderabad and MLRITM collegiate chapter, spearheading community outreach across 3+ major blockchain events and bootcamps. Conducted hands-on workshops on smart contract development and legal/real-world Web3 applications.",
      impactMetric: "Grew Chapter to 1,000+ Members · Trained 700+ Students & Professionals",
      link: "https://bbh-mlritm.vercel.app",
    },
    {
      id: "CL-02",
      title: "Certified Scrum Master & Volunteer Staff",
      organization: "Swecha Telangana (Free & Open-Source Software Movement)",
      category: "Campus & Social Impact",
      period: "Oct 2023 — Dec 2025",
      badge: "90% Faster Sprint Delivery",
      description:
        "Contributed over two years to statewide education, open-source software adoption, and social-impact engineering campaigns. Served as Scrum Master (May–Aug 2024) facilitating Agile ceremonies for internal engineering teams.",
      impactMetric: "2+ Years Active Service · 2 Internal Projects Led as Scrum Master",
    },
    {
      id: "CL-03",
      title: "Open Source Contributor — Winter of Blockchain (WoB)",
      organization: "GirlScript Summer of Code (GSSoC) 2024",
      category: "Open Source & Agile",
      period: "Oct 2024 — Nov 2024",
      badge: "Contributor (WoB) Badge",
      description:
        "Collaborated with project maintainers across distributed open-source repositories, resolving 10+ bug reports and shipping 10+ frontend and full-stack feature enhancements.",
      impactMetric: "10+ Features & 10+ Bugs Resolved",
    },
    {
      id: "CL-04",
      title: "Algorithmic Problem Solving & Competitive Coding",
      organization: "LeetCode, HackerRank & GeeksforGeeks",
      category: "Leadership & Chapters",
      period: "2023 — 2027",
      badge: "DSA & Core CS",
      description:
        "Active problem solver practicing Data Structures, Algorithms, Object-Oriented Programming (Java, Python, Kotlin), and SQL query optimization alongside B.Tech coursework at MLRITM.",
      impactMetric: "50+ DSA Problems Solved · C1 Advanced English (EF SET 67/100)",
    },
  ] as CampusActivity[],
};
