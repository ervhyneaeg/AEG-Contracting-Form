import { Clock, Handshake, Mail, Phone, ShieldCheck, Trophy, Users } from "lucide-react";

const STATS = [
  { value: "25K+", label: "Agents Contracted", icon: Users },
  { value: "50+", label: "Carrier Partners", icon: Handshake },
  { value: "500K+", label: "Families Protected", icon: ShieldCheck },
  { value: "10+", label: "Years of Excellence", icon: Trophy },
];

export function FooterStats({
  supportEmail,
  supportPhone,
  supportHours,
}: {
  supportEmail?: string;
  supportPhone?: string;
  supportHours?: string;
}) {
  return (
    <footer className="mt-16 border-t border-gold/20 bg-gradient-to-b from-background to-background/80">
      {/* Stats strip */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:gap-12">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex flex-col items-center text-center">
              <Icon className="mb-3 h-6 w-6 text-gold/70" />
              <span className="font-display text-3xl font-bold text-gold sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contact bar */}
      <div className="border-t border-gold/15 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-xs md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-gold/80">
            <ShieldCheck className="h-4 w-4" />
            <div>
              <p className="font-semibold tracking-wider uppercase">Secure &amp; Compliant</p>
              <p className="text-muted-foreground normal-case tracking-normal">
                Enterprise-grade security you can trust.
              </p>
            </div>
          </div>

          <p className="font-semibold tracking-[0.2em] uppercase text-foreground/80">
            Questions? We&apos;re here to help.
          </p>

          <div className="flex flex-col items-center gap-2 text-muted-foreground md:flex-row md:gap-6">
            {supportEmail && (
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-1.5 hover:text-gold">
                <Mail className="h-3.5 w-3.5" />
                {supportEmail}
              </a>
            )}
            {supportPhone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {supportPhone}
              </span>
            )}
            {supportHours && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {supportHours}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
