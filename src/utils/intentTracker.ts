"use client";

// --- STRICT TYPES ---
export interface IntentData {
  machines?: string | number;
  location?: string;
  budget?: string;
  projectType?: string;
  interest?: string[];
  action?: string[];
  lead?: string[];
  firstTouch?: string;
  lastActive?: string;
  [key: string]: any; // Allow dynamic expansion
}

/**
 * Saves user actions, inputs, and interests to local storage to build a behavioral profile.
 */
export const saveUserIntent = (key: string, value: string | number) => {
  if (typeof window === "undefined") return;

  try {
    const existingIntent = localStorage.getItem("innovate_funnel_intent");
    const intentData: IntentData = existingIntent ? JSON.parse(existingIntent) : {};
    
    // Set First Touch timestamp if it's a new profile
    if (!intentData.firstTouch) {
      intentData.firstTouch = new Date().toISOString();
    }

    // Array-based tracking for behavioral journey (Cap at 5 to prevent bloat)
    if (key === "action" || key === "interest" || key === "lead") {
      if (!intentData[key]) intentData[key] = [];
      
      // Prevent duplicate consecutive entries
      const arrayRef = intentData[key] as string[];
      if (arrayRef[arrayRef.length - 1] !== value) {
        arrayRef.push(String(value));
        if (arrayRef.length > 5) arrayRef.shift(); // Keep only the 5 most recent
      }
    } else {
      // Standard key-value overwrite for inputs (e.g., location, machines)
      intentData[key] = value;
    }
    
    intentData.lastActive = new Date().toISOString();
    
    localStorage.setItem("innovate_funnel_intent", JSON.stringify(intentData));
  } catch (error) {
    console.error("[Intent Tracker] Failed to save intent:", error);
  }
};

/**
 * Generates a perfectly URL-encoded payload for the WhatsApp API, 
 * appending the user's hidden behavioral data for the sales team.
 */
export const getWhatsAppPayload = (baseMessage: string): string => {
  if (typeof window === "undefined") return encodeURIComponent(baseMessage);

  try {
    const existingIntent = localStorage.getItem("innovate_funnel_intent");
    if (!existingIntent) return encodeURIComponent(baseMessage);

    const data: IntentData = JSON.parse(existingIntent);
    
    // Build the raw string FIRST
    let rawMessage = baseMessage + "\n\n*--- System Context ---*";
    
    // 1. Hard Project Variables
    if (data.location) rawMessage += `\n📍 *Location:* ${data.location}`;
    if (data.machines) rawMessage += `\n⚙️ *Capacity:* ${data.machines}`;
    if (data.budget) rawMessage += `\n💰 *Budget:* ${data.budget}`;
    if (data.projectType) rawMessage += `\n🏥 *Type:* ${data.projectType}`;

    // 2. Lead Capture Data (Emails/Contacts)
    if (data.lead && data.lead.length > 0) {
      const latestLead = data.lead[data.lead.length - 1];
      rawMessage += `\n📧 *Captured Lead:* ${latestLead}`;
    }

    // 3. Behavioral Journey (What did they click before messaging you?)
    if (data.action && data.action.length > 0) {
      const recentActions = data.action.slice(-2).join(" → "); // Show last 2 actions
      rawMessage += `\n👣 *Recent Actions:* ${recentActions}`;
    }

    // THEN encode the entire combined string
    return encodeURIComponent(rawMessage);

  } catch (error) {
    console.error("[Intent Tracker] Failed to parse payload:", error);
    // Fallback to safely encoding just the base message if parsing fails
    return encodeURIComponent(baseMessage);
  }
};

/**
 * Optional: Clear intent after a successful conversion.
 */
export const clearUserIntent = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("innovate_funnel_intent");
  }
};