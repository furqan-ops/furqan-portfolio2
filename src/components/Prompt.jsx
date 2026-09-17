export default function Prompt({ user = "furqan@portfolio", path = "~", cmd }) {
  return (
    <div className="font-mono text-sm md:text-base mb-4">
      <span className="text-accent">{user}</span>
      <span className="text-muted"> </span>
      <span className="text-accent2">{path}</span>
      <span className="text-muted"> % </span>
      <span className="text-text">{cmd}</span>
    </div>
  );
}
