import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EchoSelf - Hear the Voice of Your Future Self",
  description: "Transform your aspirations into immersive audio experiences through AI-generated scripts spoken in your own voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
