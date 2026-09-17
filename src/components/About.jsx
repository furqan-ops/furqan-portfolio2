import Section from "./Section";
import { about } from "../data/portfolio";

export default function About() {
  return (
    <Section id="about" cmd="cat about.md" path="~/about">
      <div className="space-y-4 text-text/90 leading-relaxed">
        {about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
