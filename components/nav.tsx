"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "./icons/home";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./nav.module.css";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <HomeIcon />
        /pot
      </Link>
      <nav
        className={`${styles.nav} ml-auto flex justify-between items-start relative px-0 fade md:overflow-auto scroll-pr-6 md:relative`}
        id="nav"
      >
        <div className="w-full items-center">
          <section className="flex space-x-4">
            {NAV_ITEMS.map(({ href: path, name }) => {
              const active = isActive(pathname, path);
              return (
                <Link
                  key={path}
                  href={path}
                  aria-current={active ? "page" : undefined}
                  className={styles.link}
                >
                  {name}
                </Link>
              );
            })}
          </section>
        </div>
      </nav>
    </header>
  );
}
