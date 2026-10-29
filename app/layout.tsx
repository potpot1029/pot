import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import { cx } from "@/lib/utils";

const BlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-blex-mono",
});

const BlexSans = IBM_Plex_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-blex-sans",
});

export const metadata: Metadata = {
  title: "/pot",
  description: "a personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cx("h-full antialiased", BlexMono.variable, BlexSans.variable)}
    >
      <body className="">
        <div className="page-outer">
          <div className="page-column max-w-4xl flex flex-col mx-auto min-h-screen">
            <main className="mx-(--fade) flex flex-col grow">
              <Navbar />
              <div className="flex grow flex-col">{children}</div>
              <Footer />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
