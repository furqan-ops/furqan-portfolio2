import Section from "./Section";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <Section id="contact" cmd="ssh contact" path="~/connect">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">
        Let us build something.
      </h2>
      <p className="text-muted mb-8 max-w-xl">
        Open to software engineering, automation, and AI-adjacent roles — remote or hybrid.
        I typically reply within a day.
      </p>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-accent">$ </span>
          <span className="text-muted">email -&gt; </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(profile.email);
              window.dispatchEvent(new CustomEvent("email-copied"));
            }}
            className="text-accent2 hover:underline"
          >
            {profile.email}
          </button>
        </div>
        <div>
          <span className="text-accent">$ </span>
          <span className="text-muted">github -&gt; </span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-accent2 hover:underline">
            furqan-ops
          </a>
        </div>
      </div>
    </Section>
  );
}
