import { HomeIcon } from "@/components/icons/home";

// mirrors ~/.config/starship.toml: directory + character, then the command
export function Prompt({ children }: { children?: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2">
      <span className="flex items-center font-bold text-prompt-dir">
        <HomeIcon />
        /pot
      </span>
      <span className="font-bold text-brand">❯</span>
      {children}
    </p>
  );
}
