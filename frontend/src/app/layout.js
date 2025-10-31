import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../hooks/useAuth";
import { ThemeProvider } from "../contexts/ThemeContext";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "onCare - Cancer Support Network",
  description: "A compassionate social support network for cancer patients, survivors, caregivers, and health coaches",
  keywords: "cancer support, social network, healing, caregivers, survivors, health coaches, community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
