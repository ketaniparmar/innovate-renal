// ==========================================
// V3.3 ENTERPRISE PROCUREMENT TYPES
// ==========================================

export type ProductCategory = "EQUIPMENT" | "CONSUMABLE" | "INFRASTRUCTURE" | "SOFTWARE";

// Strictly mapping pricing to financial statements (CAPEX vs OPEX)
export type PricingModel = 
  | "CAPEX_ONE_TIME"      // e.g., Machines, RO Plants (Added to Setup Cost)
  | "OPEX_PER_SESSION"    // e.g., Dialyzers, Tubing (Multiplied by Volume)
  | "OPEX_MONTHLY";       // e.g., Software, AMC, Rent (Added to Fixed Monthly Costs)

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;         // Added for the Frontend UI Catalog Cards
  manufacturer: string;
  category: ProductCategory;
  basePrice: number;           // The exact integer for the Underwriting Engine
  pricingModel: PricingModel;  // Dictates WHERE this price goes in the ROI math
  image: string;               
  specs: string[];
  isNABHCompliant: boolean;
  complianceNote?: string;     
  tag?: string;
  leadTimeWeeks?: number;      // Hospital directors need to know deployment speed
}

// ==========================================
// REAL-WORLD CATALOG (Calibrated for Innovate India)
// ==========================================

export const products: Product[] = [
  // --- MACHINES (CAPEX) ---
  {
    id: "fresenius-4008s-refurb",
    sku: "EQ-FRE-4008S-R",
    name: "Fresenius 4008S (Imported Refurbished)",
    description: "Industry-standard hemodialysis delivery system, fully refurbished with warranty.",
    manufacturer: "Fresenius Medical Care",
    category: "EQUIPMENT",
    basePrice: 650000, 
    pricingModel: "CAPEX_ONE_TIME",
    image: "/assets/products/fresenius-4008s.jpg", 
    specs: ["Volumetric UF Control", "Proven Reliability", "Cost-Effective Scaling"],
    isNABHCompliant: true,
    tag: "Highest ROI",
    leadTimeWeeks: 2,
  },
  {
    id: "diacare-hd-pro",
    sku: "EQ-DIA-HDPRO",
    name: "DiaCare Advanced HD System",
    description: "Next-generation touchscreen dialysis machine optimized for power and fluid efficiency.",
    manufacturer: "DiaCare",
    category: "EQUIPMENT",
    basePrice: 850000,
    pricingModel: "CAPEX_ONE_TIME",
    image: "/assets/products/diacare-machine.jpg",
    specs: ["Touchscreen Interface", "Automated Prime/Rinse", "Low Power Consumption"],
    isNABHCompliant: true,
    tag: "Authorized Distributor",
    leadTimeWeeks: 4,
  },

  // --- INFRASTRUCTURE (CAPEX) ---
  {
    id: "ro-plant-1000-double",
    sku: "INF-RO-1000-DP",
    name: "1000 LPH Double-Pass RO Plant",
    description: "Medical-grade reverse osmosis system sized for up to 12 simultaneous dialysis machines.",
    manufacturer: "Innovate India Engineering",
    category: "INFRASTRUCTURE",
    basePrice: 1200000,
    pricingModel: "CAPEX_ONE_TIME",
    image: "/assets/products/ro-plant.jpg",
    specs: ["AAMI Standard Quality", "Double-Pass Membrane", "Heat Disinfection Ready"],
    isNABHCompliant: true,
    tag: "NABH Mandated",
    leadTimeWeeks: 6,
  },

  // --- CONSUMABLES (VARIABLE OPEX) ---
  {
    id: "diacare-dialyzer-hf",
    sku: "CON-DIA-HF-18",
    name: "DiaCare High-Flux Dialyzer Kit",
    description: "Complete procedural kit optimized for safe, multi-use reprocessing protocols.",
    manufacturer: "DiaCare",
    category: "CONSUMABLE",
    basePrice: 850, 
    pricingModel: "OPEX_PER_SESSION",
    image: "/assets/products/dialyzer-hf.jpg",
    specs: ["Advanced Polysulfone", "Maximized Clearance", "Safe for 6x Reprocessing"],
    isNABHCompliant: true,
    complianceNote: "Not permitted for PM-JAY in Gujarat/TN",
    tag: "Margin Maximizer",
  },
  {
    id: "diacare-dialyzer-single",
    sku: "CON-DIA-SU-18",
    name: "DiaCare Single-Use Dialyzer Kit",
    description: "Zero cross-contamination kit for high-risk patients or strict regulatory environments.",
    manufacturer: "DiaCare",
    category: "CONSUMABLE",
    basePrice: 1250, 
    pricingModel: "OPEX_PER_SESSION",
    image: "/assets/products/dialyzer-single.jpg",
    specs: ["Zero Cross-Contamination", "Includes Bloodlines & Fistula", "Audit-Safe"],
    isNABHCompliant: true,
    complianceNote: "Mandatory for PM-JAY in Gujarat/TN",
    tag: "Compliance Locked",
  },

  // --- SOFTWARE (FIXED OPEX) ---
  {
    id: "clinical-os-license",
    sku: "SFT-OS-ENT",
    name: "Sovereign Clinical OS License",
    description: "Enterprise multi-center management software for real-time QA and inventory tracking.",
    manufacturer: "Innovate India",
    category: "SOFTWARE",
    basePrice: 15000,
    pricingModel: "OPEX_MONTHLY", // Fixed: Now correctly maps to fixed monthly expenses
    image: "/assets/products/clinical-os-dashboard.jpg",
    specs: ["Multi-Center Dashboard", "NABH Automated Logs", "Inventory Forecasting"],
    isNABHCompliant: true,
    tag: "Platform",
  }
];