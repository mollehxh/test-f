import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FactoryFlow",
  description: "Обработка заводских архивов и отчётов",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${fontSans.variable} bg-background`}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
