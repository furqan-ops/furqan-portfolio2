import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="px-2 py-1 text-xs border border-border rounded hover:border-accent hover:text-accent transition"
    >
      {theme === "dark" ? "[ light ]" : "[ dark ]"}
    </button>
  );
}
