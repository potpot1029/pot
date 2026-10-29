import { cacheLife } from "next/cache";
import { ArrowIcon } from "./icons/arrow";
import { GITHUB_URL, SOURCE_URL } from "@/lib/constants";

const links = [
  { name: "github", href: GITHUB_URL },
  { name: "source", href: SOURCE_URL },
];

export default async function Footer() {
  "use cache";
  // keeps the copyright year static; refreshed daily
  cacheLife("days");

  return (
    <footer className="mt-16 mb-12 border-t-2 border-synthwave-cyan pt-6 font-mono text-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground/70">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-synthwave-cyan [text-shadow:0_0_0.5em_var(--color-synthwave-cyan)]">
            potpot
          </span>{" "}
          · this site is vibe coded
        </p>
        <ul className="flex gap-5">
          {links.map(({ name, href }) => (
            <li key={name}>
              <a
                className="flex items-center gap-1.5 text-brand transition-[color,text-shadow] [text-shadow:var(--glow)] hover:text-synthwave-pink hover:[text-shadow:0_0_0.3em_var(--color-synthwave-pink),0_0_0.8em_var(--color-synthwave-pink)]"
                rel="noopener noreferrer"
                target="_blank"
                href={href}
              >
                <ArrowIcon />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
