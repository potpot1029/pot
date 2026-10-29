"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "./icons/home";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./nav.module.css";

function isActive(pathname: string, href: string) {
  // match the section and its children, but not e.g. /postscript for /posts
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <HomeIcon />
        /pot
      </Link>
      <nav className={`${styles.nav} ml-auto flex space-x-4`}>
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
      </nav>
    </header>
  );
}
