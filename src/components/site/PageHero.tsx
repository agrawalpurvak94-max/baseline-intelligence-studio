import type { ReactNode } from "react";
import { PurpleAurora, StarField } from "./Background";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <StarField density={40} />
      <PurpleAurora className="opacity-60" />
      <div className="container-x relative">
        <div className="text-eyebrow">{eyebrow}</div>
        <h1 className="text-display mt-4 text-4xl md:text-6xl max-w-4xl">{title}</h1>
        {lead ? <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}