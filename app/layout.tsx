import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "after work in japan",
  description: "A Japanese office worker's record of work, family, and the hours after."
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
