import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { DecorativeDoodles } from "./DecorativeDoodles";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell relative min-h-screen overflow-hidden bg-white">
      <DecorativeDoodles variant="page" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
