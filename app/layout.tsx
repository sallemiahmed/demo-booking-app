import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookEasy - Simple Scheduling for Everyone",
  description: "Schedule meetings without the back-and-forth emails. Share your availability and let others book time with you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
