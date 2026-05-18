// Dropdown options for the contracting form. Edit here to tune wording.

export const COMMUNICATION_PREFERENCES = [
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
] as const;

export const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const YEARS_EXPERIENCE = [
  { value: "none", label: "No experience yet" },
  { value: "<1", label: "Less than 1 year" },
  { value: "1-3", label: "1 – 3 years" },
  { value: "3-5", label: "3 – 5 years" },
  { value: "5-10", label: "5 – 10 years" },
  { value: "10+", label: "10+ years" },
];

export const CURRENT_STATUS = [
  { value: "actively-producing", label: "Actively producing" },
  { value: "pre-licensing", label: "In pre-licensing study" },
  { value: "returning", label: "Returning to the industry" },
  { value: "brand-new", label: "Brand new — researching" },
];

export const CURRENT_SITUATION = [
  { value: "full-time-agent", label: "Full-time agent" },
  { value: "part-time-agent", label: "Part-time agent" },
  { value: "transitioning", label: "Looking to transition" },
  { value: "investigating", label: "Investigating the opportunity" },
];

export const SALES_INTEREST = [
  { value: "life", label: "Life Insurance" },
  { value: "mortgage-protection", label: "Mortgage Protection" },
  { value: "final-expense", label: "Final Expense" },
  { value: "iul-annuity", label: "IUL / Annuities" },
  { value: "health-medicare", label: "Health / Medicare" },
  { value: "multi-line", label: "Multi-line / All of the above" },
];

export const MONTHLY_PRODUCTION_GOAL = [
  { value: "5k-10k", label: "$5K – $10K" },
  { value: "10k-25k", label: "$10K – $25K" },
  { value: "25k-50k", label: "$25K – $50K" },
  { value: "50k-100k", label: "$50K – $100K" },
  { value: "100k+", label: "$100K+" },
];

export const MARKET_SELECTION = [
  { value: "mortgage-protection", label: "Mortgage Protection" },
  { value: "final-expense", label: "Final Expense" },
  { value: "iul-annuity", label: "IUL / Annuity" },
  { value: "aca-health", label: "ACA / Health" },
  { value: "medicare", label: "Medicare" },
  { value: "open", label: "Open — recommend something" },
];

export const WHAT_LOOKING_FOR = [
  { value: "income-replacement", label: "Income replacement" },
  { value: "side-income", label: "Side income" },
  { value: "career-change", label: "Career change" },
  { value: "mentorship", label: "Mentorship / training" },
  { value: "better-comp", label: "Better hierarchy / comp" },
  { value: "more-leads", label: "Lead support" },
];
