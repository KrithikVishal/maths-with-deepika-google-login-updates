import type { Metadata } from "next";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Maths with Deepika",
  description: "Vedic Maths learning for mothers, children, and confident home practice.",
  icons: {
    icon: "/logo-bg.svg",
    shortcut: "/logo-bg.svg",
    apple: "/logo-bg.svg",
  },
  openGraph: {
    title: "Maths with Deepika",
    description: "Vedic Maths learning for mothers, children, and confident home practice.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
