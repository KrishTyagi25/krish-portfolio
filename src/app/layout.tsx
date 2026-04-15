import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krish Tyagi – Full Stack Developer & B.Tech Student",
  description:
    "Portfolio of Krish Tyagi – 2nd Year B.Tech student at Ajay Kumar Garg Engineering College. Full Stack Developer specialising in Next.js, React, TypeScript, Node.js and AI.",
  keywords: ["Krish Tyagi", "Full Stack Developer", "Portfolio", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Krish Tyagi" }],
  openGraph: {
    title: "Krish Tyagi – Full Stack Developer",
    description: "2nd Year B.Tech Student | Full Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
