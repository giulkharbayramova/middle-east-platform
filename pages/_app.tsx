import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin","cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin","cyrillic"], variable: "--font-playfair" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
