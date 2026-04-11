export interface Product {
  id: string;
  name: string;
  category: "Machine" | "Consumable" | "Infrastructure";
  price: string;
  image: string;
  specs: string[];
  tag: string;
}

export const products: Product[] = [
  {
    id: "nx-2000",
    name: "Innovate NX-2000 Pro",
    category: "Machine",
    price: "Contact for Quote",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", // Medical tech placeholder
    specs: ["AI-Driven Fluid Calc", "Dual-Stage Filtration", "Remote Monitoring"],
    tag: "Flagship",
  },
  {
    id: "elite-v3",
    name: "Elite V3 Hemodialysis",
    category: "Machine",
    price: "Contact for Quote",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    specs: ["Ultra-Silent Pump", "Self-Sanitizing", "Energy Efficient"],
    tag: "Best Seller",
  },
  {
    id: "infra-01",
    name: "Standard Dialysis Bay",
    category: "Infrastructure",
    price: "Custom Setup",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    specs: ["Ergonomic Design", "Integrated UPS", "Antibacterial Surface"],
    tag: "Consulting",
  },
];