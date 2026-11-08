import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultantProject } from "@/lib/consultant-projects";

interface Props {
  projects: ConsultantProject[];
  onChange: (projects: ConsultantProject[]) => void;
}

const fieldClass = "w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent";

const ConsultantProjectsEditor = ({ projects, onChange }: Props) => {
  const update = (index: number, field: keyof ConsultantProject, value: string) =>
    onChange(projects.map((project, i) => i === index ? { ...project, [field]: value } : project));

  return (
    <fieldset className="mt-5 min-w-0 border-t border-border pt-4">
      <legend className="text-sm font-medium px-1">Past projects & case studies</legend>
      <div className="divide-y divide-border">
        {projects.map((project, index) => (
          <div key={index} className="py-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">Project {index + 1}</span>
              <Button type="button" size="icon" variant="ghost" aria-label={`Remove project ${index + 1}`} onClick={() => onChange(projects.filter((_, i) => i !== index))}>
                <Trash2 size={16} />
              </Button>
            </div>
            <label className="block text-xs text-muted-foreground">Project title
              <input className={fieldClass} value={project.title} onChange={(e) => update(index, "title", e.target.value)} />
            </label>
            <label className="block text-xs text-muted-foreground">Work completed
              <textarea rows={3} className={`${fieldClass} resize-y`} value={project.description ?? ""} onChange={(e) => update(index, "description", e.target.value)} />
            </label>
            <label className="block text-xs text-muted-foreground">Result
              <textarea rows={2} className={`${fieldClass} resize-y`} value={project.result} onChange={(e) => update(index, "result", e.target.value)} />
            </label>
            <label className="block text-xs text-muted-foreground">Case study link (optional)
              <input className={fieldClass} inputMode="url" value={project.caseStudyUrl ?? ""} onChange={(e) => update(index, "caseStudyUrl", e.target.value)} />
            </label>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => onChange([...projects, { title: "", result: "", description: "", caseStudyUrl: "" }])}>
        <Plus size={16} /> Add project
      </Button>
    </fieldset>
  );
};

export default ConsultantProjectsEditor;