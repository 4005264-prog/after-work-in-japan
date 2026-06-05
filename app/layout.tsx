import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "after work in japan",
  description: "A personal archive about work, family, engineering, and keeping options open."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
