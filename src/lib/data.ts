import {
  HeartPulse,
  Microscope,
  ShieldCheck,
  Award,
  Users,
  Activity,
  Flame,
  AlertCircle,
  Pill,
  ClipboardList,
  Search,
  CalendarCheck,
  Syringe,
  Sparkles,
  BadgeCheck,
  GraduationCap,
  Building2,
  Clock,
  Droplet,
  Waves,
  Radiation,
  ScanLine,
  Workflow,
  Stethoscope,
  Landmark,
  Globe2,
  Users2,
  Crown,
  ScanSearch,
  Layers,
  Droplets,
  Ribbon,
  HeartHandshake,
  BrainCircuit,
  ClipboardCheck,
  AlertTriangle,
  Info,
  AudioWaveform,
  Salad,
  TestTube,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

// Text for every entry below lives in messages/{locale}.json under the
// matching namespace + key (e.g. stats -> "stats.healed"). This file only
// holds the locale-agnostic bits: icons, keys, and non-text values.

export type Stat = {
  key: string;
  icon: LucideIcon;
  value: number;
  suffix: string;
};

export const stats: Stat[] = [
  { key: "healed", icon: HeartPulse, value: 15000, suffix: "+" },
  { key: "experience", icon: Award, value: 18, suffix: "" },
  { key: "endoscopies", icon: Microscope, value: 10000, suffix: "+" },
  { key: "patients", icon: Users, value: 25000, suffix: "+" },
];

export const symptomCards: { key: string; icon: LucideIcon }[] = [
  { key: "reflux", icon: Flame },
  { key: "stomach", icon: AlertCircle },
  { key: "liver", icon: Pill },
];

export const treatments: { key: string; icon: LucideIcon }[] = [
  { key: "ulcer", icon: Droplet },
  { key: "varices", icon: Waves },
  { key: "chronic", icon: Activity },
];

export const endoscopyProcedures: { key: string; icon: LucideIcon }[] = [
  { key: "gastroscopy", icon: ScanLine },
  { key: "colonoscopy", icon: Radiation },
  { key: "ercp", icon: Workflow },
];

export const journeySteps: { key: string; icon: LucideIcon }[] = [
  { key: "consultation", icon: ClipboardList },
  { key: "diagnosis", icon: Search },
  { key: "treatment", icon: Syringe },
  { key: "followup", icon: CalendarCheck },
];

export const whyChooseUsPoints: { key: string; icon: LucideIcon }[] = [
  { key: "academic", icon: GraduationCap },
  { key: "devices", icon: Microscope },
  { key: "safety", icon: ShieldCheck },
  { key: "care", icon: Sparkles },
];

export const patientGuideBefore: { key: string }[] = [
  { key: "fasting" },
  { key: "reports" },
  { key: "medications" },
];

export const patientGuideAfter: { key: string }[] = [
  { key: "rest" },
  { key: "diet" },
  { key: "symptoms" },
];

export const topVideos: { key: string; duration: string }[] = [
  { key: "gastroscopy101", duration: "03:12" },
  { key: "refluxCauses", duration: "04:45" },
  { key: "colonoscopyTips", duration: "02:58" },
];

export const reviews: { key: string; rating: number }[] = [
  { key: "ahmed", rating: 5 },
  { key: "sara", rating: 5 },
  { key: "mahmoud", rating: 5 },
  { key: "mona", rating: 5 },
];

// ---------- About page ----------

export const academicTrack: { key: string; year: string; icon: LucideIcon }[] = [
  { key: "bachelor", year: "2004", icon: GraduationCap },
  { key: "masters", year: "2010", icon: Landmark },
  { key: "phd", year: "2014", icon: Award },
  { key: "fellowship", year: "2017", icon: Globe2 },
  { key: "conferences", year: "2022", icon: Users2 },
];

export const careerHistory: { key: string; year: string; icon: LucideIcon }[] = [
  { key: "houseOfficer", year: "2005", icon: Stethoscope },
  { key: "resident", year: "2008", icon: ClipboardCheck },
  { key: "specialist", year: "2013", icon: Microscope },
  { key: "unitHead", year: "2018", icon: Crown },
  { key: "consultant", year: "2021", icon: Building2 },
];

export const expertiseAreas: { key: string; icon: LucideIcon }[] = [
  { key: "diagnostics", icon: ScanSearch },
  { key: "liver", icon: Droplets },
  { key: "endoscopy", icon: Layers },
  { key: "earlyDetection", icon: Ribbon },
];

export const coreSpecializations: { key: string; icon: LucideIcon }[] = [
  { key: "cancerDetection", icon: Ribbon },
  { key: "advancedEndoscopy", icon: Layers },
  { key: "liverDiseases", icon: Droplets },
  { key: "ibd", icon: Activity },
];

export const philosophyPoints: { key: string; icon: LucideIcon }[] = [
  { key: "patientFirst", icon: HeartHandshake },
  { key: "modernTech", icon: BrainCircuit },
  { key: "personalizedCare", icon: Sparkles },
  { key: "followUp", icon: ClipboardCheck },
];

export const badges = [BadgeCheck, ShieldCheck, Building2, Clock, Activity];

// ---------- Services page ----------

export const serviceCategories: { key: string; icon: LucideIcon; anchor: string }[] = [
  { key: "endoscopy", icon: Layers, anchor: "endoscopy" },
  { key: "liver", icon: Droplets, anchor: "liver-diseases" },
  { key: "colon", icon: Activity, anchor: "colon-health" },
  { key: "diagnostics", icon: ScanSearch, anchor: "diagnostics" },
];

export const categoryDetailItems: Record<string, { key: string; icon: LucideIcon }[]> = {
  endoscopy: [
    { key: "overview", icon: Info },
    { key: "beforeCare", icon: ClipboardCheck },
    { key: "afterCare", icon: HeartHandshake },
  ],
  liver: [
    { key: "chronicCare", icon: Droplets },
    { key: "cirrhosis", icon: ShieldCheck },
    { key: "monitoring", icon: Activity },
  ],
  colon: [
    { key: "ibs", icon: AlertCircle },
    { key: "polyps", icon: ScanSearch },
    { key: "nutrition", icon: Salad },
  ],
  diagnostics: [
    { key: "earlyScreening", icon: Ribbon },
    { key: "labTests", icon: TestTube },
    { key: "imaging", icon: ScanLine },
  ],
};

export const endoscopyTypes: { key: string; icon: LucideIcon }[] = [
  { key: "gastroscopy", icon: ScanLine },
  { key: "colonoscopy", icon: Radiation },
  { key: "ercp", icon: Workflow },
  { key: "eus", icon: AudioWaveform },
];

export const endoscopyTriggers: { key: string; icon: LucideIcon }[] = [
  { key: "chronicIndigestion", icon: AlertCircle },
  { key: "persistentPain", icon: Flame },
  { key: "bleeding", icon: AlertTriangle },
  { key: "severeReflux", icon: Waves },
];

export const servicesFaqs: { key: string }[] = [
  { key: "isSafe" },
  { key: "sedation" },
  { key: "pain" },
  { key: "recoveryTime" },
  { key: "afterEffects" },
  { key: "cost" },
  { key: "howToBook" },
];

// ---------- Videos page ----------

export const videoCategories = ["endoscopy", "liver", "prevention"] as const;

export const videoCategoryIcons: Record<(typeof videoCategories)[number], LucideIcon> = {
  endoscopy: Microscope,
  liver: Droplets,
  prevention: Salad,
};

export const videoLibrary: { key: string; category: (typeof videoCategories)[number]; duration: string }[] = [
  { key: "gastroscopy101", category: "endoscopy", duration: "03:12" },
  { key: "colonoscopyTips", category: "endoscopy", duration: "02:58" },
  { key: "ercpExplained", category: "endoscopy", duration: "04:05" },
  { key: "hepatitisSigns", category: "liver", duration: "03:40" },
  { key: "liverCirrhosisPrevention", category: "liver", duration: "04:20" },
  { key: "fattyLiverTypes", category: "liver", duration: "03:15" },
  { key: "refluxCauses", category: "prevention", duration: "04:45" },
  { key: "colonNutritionTips", category: "prevention", duration: "03:30" },
  { key: "whenToSeeDoctor", category: "prevention", duration: "02:50" },
];

// ---------- Reviews page ----------

export const patientReviews: { key: string; rating: number }[] = [
  { key: "ahmedFull", rating: 5 },
  { key: "saraFull", rating: 5 },
  { key: "mahmoud", rating: 5 },
  { key: "mona", rating: 5 },
  { key: "youssef", rating: 5 },
  { key: "heba", rating: 5 },
  { key: "amr", rating: 5 },
  { key: "nour", rating: 5 },
  { key: "khaled", rating: 5 },
];

// ---------- Articles page ----------

export const articleCategories = ["digestive", "liver", "endoscopy"] as const;

export const articleCategoryIcons: Record<(typeof articleCategories)[number], LucideIcon> = {
  digestive: Flame,
  liver: Droplets,
  endoscopy: Layers,
};

export const featuredArticle: { key: string; icon: LucideIcon; category: (typeof articleCategories)[number]; readTime: string } = {
  key: "completeGuide",
  icon: BookOpen,
  category: "digestive",
  readTime: "8",
};

export const articleList: {
  key: string;
  icon: LucideIcon;
  category: (typeof articleCategories)[number];
  readTime: string;
}[] = [
  { key: "refluxVsHeartburn", icon: Flame, category: "digestive", readTime: "5" },
  { key: "ibsCauses", icon: AlertCircle, category: "digestive", readTime: "6" },
  { key: "fattyLiverGuide", icon: Droplets, category: "liver", readTime: "7" },
];

export const articleGrid: {
  key: string;
  icon: LucideIcon;
  category: (typeof articleCategories)[number];
  readTime: string;
}[] = [
  { key: "endoscopyPrep", icon: ClipboardCheck, category: "endoscopy", readTime: "4" },
  { key: "postEndoscopyNutrition", icon: Salad, category: "endoscopy", readTime: "5" },
  { key: "liverFunctionTests", icon: TestTube, category: "liver", readTime: "4" },
];
