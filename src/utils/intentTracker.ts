export const saveUserIntent = (key: string, value: string | number) => {
  if (typeof window !== "undefined") {
    const existingIntent = localStorage.getItem("innovate_funnel_intent");
    const intentData = existingIntent ? JSON.parse(existingIntent) : {};
    
    intentData[key] = value;
    intentData.lastActive = new Date().toISOString();
    
    localStorage.setItem("innovate_funnel_intent", JSON.stringify(intentData));
  }
};

export const getWhatsAppPayload = (baseMessage: string) => {
  if (typeof window !== "undefined") {
    const existingIntent = localStorage.getItem("innovate_funnel_intent");
    if (existingIntent) {
      const data = JSON.parse(existingIntent);
      let context = `%0A%0A*Captured Intent:*`;
      if (data.machines) context += `%0A- Planned Machines: ${data.machines}`;
      if (data.location) context += `%0A- Location: ${data.location}`;
      if (data.interest) context += `%0A- Primary Interest: ${data.interest}`;
      
      return encodeURIComponent(baseMessage) + context;
    }
  }
  return encodeURIComponent(baseMessage);
};