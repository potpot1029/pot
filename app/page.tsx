import { AvatarFlow } from "@/components/avatar-flow";
import { CodeforcesIcon } from "@/components/icons/codeforces";
import { GitHubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { MailIcon } from "@/components/icons/mail";
import { PinIcon } from "@/components/icons/pin";
import { Terminal } from "@/components/terminal";
import {
  CODEFORCES_URL,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  STATUS,
  TIMEZONE,
} from "@/lib/constants";

const links = [
  { name: "github", href: GITHUB_URL, icon: GitHubIcon },
  { name: "linkedin", href: LINKEDIN_URL, icon: LinkedInIcon },
  { name: "codeforces", href: CODEFORCES_URL, icon: CodeforcesIcon },
  { name: "email", href: `mailto:${EMAIL}`, icon: MailIcon },
];

export default function Home() {
  return (
    <section className="flex grow flex-col gap-6">
      <h1 className="font-mono text-2xl font-bold">
        <span className="sr-only">potpot · </span># home/
      </h1>
      <div className="flex grow flex-col gap-16">
        <div className="flex flex-col items-center gap-6">
          <AvatarFlow />
          <div className="flex flex-col items-center gap-3">
            {/* boot-log style status, like a systemd "[ OK ]" line */}
            <p className="flex items-center gap-2 font-mono text-sm">
              <span className="font-bold">
                <span className="text-foreground/60">[</span>
                <span className="text-ok [text-shadow:0_0_0.5em_var(--color-ok)]">
                  {" "}
                  OK{" "}
                </span>
                <span className="text-foreground/60">]</span>
              </span>
              {STATUS}
              <span aria-hidden className="h-4 w-2 animate-pulse bg-ok" />
            </p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-foreground/60">
              <PinIcon />
              {LOCATION} · {TIMEZONE}
            </p>
            <span aria-hidden className="h-px w-24 bg-synthwave-cyan/40" />
            <ul className="flex items-center gap-3">
              {links.map(({ name, href, icon: Icon }, i) => (
                <li key={name} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="size-1 rounded-full bg-synthwave-cyan/50"
                    />
                  )}
                  <a
                    href={href}
                    aria-label={name}
                    title={name}
                    className="block text-brand drop-shadow-[0_0_4px_var(--color-brand)] transition-[color,filter,translate] duration-150 hover:-translate-y-0.5 hover:text-synthwave-pink hover:drop-shadow-[0_0_6px_var(--color-synthwave-pink)]"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
