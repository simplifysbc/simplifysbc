export interface ConsultantProject {
  title: string;
  result: string;
  description?: string;
  caseStudyUrl?: string;
}

export const caseStudyLink = (value?: string): string | undefined => {
  const link = value?.trim();
  if (!link) return undefined;
  if (link.startsWith("/") && !link.startsWith("//") && !link.includes("\\")) return link;
  try {
    const url = new URL(link);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
};

export const validateProjects = (projects: ConsultantProject[]): string | undefined => {
  for (const project of projects) {
    if (!project.title.trim()) return "Please add a title for each project.";
    if (!project.result.trim()) return "Please add a result for each project.";
    if (project.caseStudyUrl?.trim() && !caseStudyLink(project.caseStudyUrl)) {
      return "Use a full http or https case study link, or a page path starting with /.";
    }
  }
};