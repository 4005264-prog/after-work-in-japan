import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One More Option",
  description: "福岡で暮らす一人の会社員が、家族のためにもう一つの選択肢を作っていく記録。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
