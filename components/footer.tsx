import { cacheLife } from "next/cache";
import { CodeIcon } from "./icons/code";
import { GitHubIcon } from "./icons/github";
import { GITHUB_URL, SOURCE_URL } from "@/lib/constants";

const links = [
  { name: "github", href: GITHUB_URL, icon: GitHubIcon },
  { name: "source", href: SOURCE_URL, icon: CodeIcon },
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
          {links.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                className="group flex items-center gap-1.5 text-brand transition-[color,text-shadow] [text-shadow:var(--glow)] hover:text-synthwave-pink hover:[text-shadow:0_0_0.3em_var(--color-synthwave-pink),0_0_0.8em_var(--color-synthwave-pink)]"
                rel="noopener noreferrer"
                target="_blank"
                href={href}
              >
                {/* text-shadow doesn't reach svgs, so glow the icon separately */}
                <Icon className="size-3.5 transition-[filter] drop-shadow-[0_0_3px_var(--color-brand)] group-hover:drop-shadow-[0_0_4px_var(--color-synthwave-pink)]" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
