import Section from "./Section";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <Section id="experience" cmd="git log --oneline --career" path="~/career">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        Where I have shipped automations
      </h2>
      <div className="space-y-8">
        {experience.map((e) => (
          <div key={e.company} className="border-l-2 border-border pl-6 relative">
            <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_#7ee787]" />
            <div className="text-xs text-muted mb-1">{e.period} · {e.location}</div>
            <div className="text-white font-semibold">
              {e.role} <span className="text-accent">@ {e.company}</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {e.bullets.map((b, i) => (
                <li key={i} className="before:content-['>'] before:text-accent before:mr-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
