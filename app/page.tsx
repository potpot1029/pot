import Image from "next/image";
import { BranchIcon } from "@/components/icons/branch";
import { CodeforcesIcon } from "@/components/icons/codeforces";
import { GitHubIcon } from "@/components/icons/github";
import { HomeIcon } from "@/components/icons/home";
import { MailIcon } from "@/components/icons/mail";
import { CODEFORCES_URL, EMAIL, GITHUB_URL, STATUS } from "@/lib/constants";

// TODO: replace the placeholder content below with your own

const links = [
  { name: "github", href: GITHUB_URL, icon: GitHubIcon },
  { name: "codeforces", href: CODEFORCES_URL, icon: CodeforcesIcon },
  { name: "email", href: `mailto:${EMAIL}`, icon: MailIcon },
];

export default function Home() {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/cat_drooling.webp"
          alt="pot"
          width={160}
          height={160}
          preload
          className="size-40 rounded-full object-cover ring-2 ring-synthwave-cyan shadow-[0_0_24px_var(--color-synthwave-cyan)]"
        />
        <div className="flex flex-col items-center gap-3">
          {/* boot-log style status, like a systemd "[ OK ]" line */}
          <p className="flex items-center gap-2 font-mono text-sm">
            <span className="font-bold">
              <span className="text-foreground/60">[</span>
              <span className="text-[#72f1b8] [text-shadow:0_0_0.5em_#72f1b8]">
                {" "}
                OK{" "}
              </span>
              <span className="text-foreground/60">]</span>
            </span>
            {STATUS}
            <span aria-hidden className="h-4 w-2 animate-pulse bg-[#72f1b8]" />
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

      <div>
        {/* mirrors ~/.config/starship.toml: directory + character, git branch on the right */}
        <div className="mb-3 flex items-center justify-between gap-4 font-mono text-sm">
          <p className="flex items-center gap-2">
            <span className="flex items-center font-bold text-[#36f9f6]">
              <HomeIcon />
              /pot
            </span>
            <span className="font-bold text-[#f222ff]">❯</span>
            <span>whoami</span>
          </p>
          <p className="flex items-center gap-1 font-bold text-[#f3e70f]">
            <BranchIcon />
            main
          </p>
        </div>
        <h1 className="mb-6 text-2xl font-semibold tracking-tighter">
          potpot
          <span className="animate-pulse text-brand">_</span>
        </h1>
      </div>
    </section>
  );
}
