import { footer } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 text-xs text-muted flex flex-col md:flex-row justify-between gap-2">
        <div>{footer.message}</div>
        <div>© {new Date().getFullYear()} Muhammad Furqan Tahir</div>
      </div>
    </footer>
  );
}
