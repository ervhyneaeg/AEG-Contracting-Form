import { Bot, Check, Lock, MessageCircle } from "lucide-react";

const AI_CAPABILITIES = [
  "Licensing requirements",
  "Hierarchy structure",
  "Onboarding steps",
  "Contracting questions",
  "Schedule onboarding call",
];

const APPLICATION_STATUS = [
  { label: "Pending Review", sub: "Application submitted", active: true },
  { label: "Licensing Verification", sub: "In progress" },
  { label: "Carrier Processing", sub: "Pending" },
  { label: "Approved for Training", sub: "Pending" },
  { label: "Ready for Orientation", sub: "Pending" },
];

export function RightSidebar() {
  return (
    <aside className="space-y-6">
      {/* Trust badge */}
      <div className="flex items-start gap-3 rounded-2xl border border-gold/15 bg-card/40 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
          <Lock className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Secure. Encrypted. Trusted.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Your information is protected</p>
        </div>
      </div>

      {/* AI Concierge — Phase 3 placeholder */}
      <div className="rounded-2xl border border-gold/15 bg-card/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
            AEG AI Concierge
          </p>
          <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-gold">
            AI
          </span>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-transparent ring-1 ring-gold/30">
            <Bot className="h-12 w-12 text-gold" />
          </div>
        </div>

        <p className="text-center text-sm font-medium text-foreground">
          Need help completing<br />your contracting?
        </p>

        <ul className="mt-4 space-y-2">
          {AI_CAPABILITIES.map((label) => (
            <li key={label} className="flex items-center gap-2 text-xs text-foreground/80">
              <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold to-gold-deep px-4 py-3 text-xs font-semibold tracking-wider uppercase text-black opacity-60"
          title="AI Concierge ships in Phase 3"
        >
          <MessageCircle className="h-4 w-4" />
          Chat with AI
        </button>
      </div>

      {/* Application Status */}
      <div className="rounded-2xl border border-gold/15 bg-card/40 p-6">
        <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
          Application Status
        </h3>
        <ol className="space-y-4">
          {APPLICATION_STATUS.map((s) => (
            <li key={s.label} className="flex items-start gap-3">
              <span
                className={
                  s.active
                    ? "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold shadow-[0_0_0_3px_oklch(82%_0.13_85_/_0.15)] animate-pulse"
                    : "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/20"
                }
              />
              <div>
                <p
                  className={
                    s.active
                      ? "text-sm font-semibold text-gold"
                      : "text-sm font-medium text-foreground/70"
                  }
                >
                  {s.label}
                </p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
