import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export async function generateStaticParams() {
  // Cache Components requires at least one param; the placeholder 404s
  if (projects.length === 0) return [{ slug: "__placeholder__" }];
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {project.title}
      </h1>
      <p>{project.description}</p>
    </section>
  );
}
