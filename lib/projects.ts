export type Project = {
  slug: string;
  title: string;
  description: string;
};

// TODO: add your projects here
export const projects: Project[] = [];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
