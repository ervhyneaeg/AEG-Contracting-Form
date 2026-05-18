import { Crown, Globe, TrendingUp, UserCircle, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  crown: Crown,
  user: UserCircle,
  "trending-up": TrendingUp,
};

export type FeatureCard = {
  title?: string;
  description?: string;
  icon?: string;
};

const DEFAULT_CARDS: FeatureCard[] = [
  {
    title: "Global Opportunity",
    description: "Build a legacy that transcends borders.",
    icon: "globe",
  },
  {
    title: "Elite Training",
    description: "Proven systems. Limitless possibilities.",
    icon: "crown",
  },
  {
    title: "Executive Support",
    description: "World-class support when you need it.",
    icon: "user",
  },
  {
    title: "Financial Freedom",
    description: "Create time, wealth and generational impact.",
    icon: "trending-up",
  },
];

export function FeatureCards({ cards }: { cards?: FeatureCard[] | null }) {
  const items = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  return (
    <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((card, idx) => {
        const Icon = ICON_MAP[card.icon || "globe"] || Globe;
        return (
          <div
            key={card.title || idx}
            className="group rounded-2xl border border-gold/15 bg-card/40 p-5 transition-colors hover:border-gold/35"
          >
            <Icon className="mb-3 h-6 w-6 text-gold transition-transform group-hover:scale-110" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              {card.title}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
