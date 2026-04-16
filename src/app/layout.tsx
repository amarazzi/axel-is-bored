import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { LanguageProvider } from "@/components/Language/LanguageProvider";
import { DynamicTitle } from "@/components/DynamicTitle";
import { Analytics } from "@vercel/analytics/react";
import { SkipLink } from "@/components/SkipLink";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axelmarazzi.com"),
  title: "axel haciendo cosas",
  description: "Proyectos simples, listas, y autoficción.",
  openGraph: {
    title: "axel haciendo cosas",
    description: "Proyectos simples, listas, y autoficción.",
    url: "https://axelmarazzi.com",
    siteName: "axel is bored",
    images: [{ url: "/axel2.jpg", width: 800, height: 800, alt: "Axel Marazzi" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "axel haciendo cosas",
    description: "Proyectos simples, listas, y autoficción.",
  },
};

// Inline script to apply saved theme + language before first paint (prevents FOUC)
const initScript = `
(function(){
  try {
    var THEMES = {
      standard: { bg:"#080808",fg:"#E8E8E8",accent:"#E8E8E8",accent2:"#ABABAB",muted:"#7A7A7A",border:"#282828",btnBg:"#141414",logoFilter:"none" },
      light:    { bg:"#F0EFEC",fg:"#141414",accent:"#141414",accent2:"#4A4A4A",muted:"#666666",border:"#D8D6D1",btnBg:"#E4E2DE",logoFilter:"invert(1)" }
    };
    var id = localStorage.getItem("axel-theme");
    if (!id && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      id = "light";
    }
    var t = id && THEMES[id];
    if (t) {
      var s = document.documentElement.style;
      s.setProperty("--theme-bg",t.bg);
      s.setProperty("--theme-fg",t.fg);
      s.setProperty("--theme-accent",t.accent);
      s.setProperty("--theme-accent2",t.accent2);
      s.setProperty("--theme-muted",t.muted);
      s.setProperty("--theme-border",t.border);
      s.setProperty("--theme-btn-bg",t.btnBg);
      s.setProperty("--logo-filter",t.logoFilter);
    }
    var lang = localStorage.getItem("axel-lang");
    if (lang === "en" || lang === "es") {
      document.documentElement.lang = lang;
    }
  } catch(e){}
})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={ibmPlexMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <SkipLink />
            <DynamicTitle />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
