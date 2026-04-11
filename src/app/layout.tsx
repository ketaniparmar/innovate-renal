import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Innovate India | Advanced Dialysis Solutions",
  description: "Premium Dialysis Equipment, AMC Services, and AI-Driven Hospital Consulting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(GeistSans.className, "min-h-screen")}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent" />
        <main>{children}</main>
      </body>
    </html>
  );
}