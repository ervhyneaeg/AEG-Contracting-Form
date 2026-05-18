import {
  Briefcase,
  GraduationCap,
  Headphones,
  LifeBuoy,
  LogOut,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { BrandMark } from "./BrandMark";

type NavItem = { label: string; icon: LucideIcon; href: string; active?: boolean };

const NAV: NavItem[] = [
  { label: "AEG Contracting", icon: Headphones, href: "/contracting", active: true },
  { label: "Opportunity", icon: Briefcase, href: "/opportunity" },
  { label: "Training", icon: GraduationCap, href: "/training" },
  { label: "Resources", icon: LifeBuoy, href: "/resources" },
  { label: "Support", icon: ShieldCheck, href: "/support" },
  { label: "Logout", icon: LogOut, href: "#" },
];

const SECURITY_ITEMS = [
  { title: "Secure Submission", description: "Your data is protected" },
  { title: "Encrypted Access", description: "Bank-level encryption" },
  { title: "Compliance Review", description: "All submissions reviewed" },
  { title: "Protected Data Handling", description: "Your data is never shared" },
];

export function LeftSidebar() {
  return (
    <aside className="space-y-6">
      {/* Brand */}
      <div className="rounded-2xl border border-gold/15 bg-card/40 p-6">
        <BrandMark />
      </div>

      {/* Primary Navigation */}
      <nav className="rounded-2xl border border-gold/15 bg-card/40 p-2">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={
                    item.active
                      ? "flex items-center gap-3 rounded-lg bg-gradient-to-r from-gold/20 to-transparent px-4 py-3 text-sm font-semibold text-gold ring-1 ring-gold/30"
                      : "flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-gold"
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Enterprise Security */}
      <div className="rounded-2xl border border-gold/15 bg-card/40 p-6">
        <h3 className="mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-gold/80">
          Enterprise Security
        </h3>
        <ul className="space-y-4">
          {SECURITY_ITEMS.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Legacy Card */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-card/80 to-accent/40 p-6">
        <p className="font-display text-sm leading-relaxed tracking-wide text-foreground/90">
          YOU&apos;RE BUILDING<br />
          <span className="text-gold/90">MORE THAN AN INCOME.</span>
        </p>
        <p className="mt-3 font-display text-sm tracking-wide text-foreground/90">
          YOU&apos;RE BUILDING<br />
          <span className="text-gold">A LEGACY.</span>
        </p>
        <p className="mt-4 font-display text-2xl text-gold italic">AEG</p>
      </div>
    </aside>
  );
}
