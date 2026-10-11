import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import consultant1 from "@/assets/consultants/consultant-1.jpg";
import consultant2 from "@/assets/consultants/consultant-2.jpg";
import consultant3 from "@/assets/consultants/consultant-3.jpg";

export interface ConsultantRow {
  id: string;
  slug: string;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string;
  specialties: string[];
  availability: { day: string; hours: string }[];
  projects: { title: string; result: string }[];
  active: boolean;
  sort_order: number;
}

const fallbackPhotos: Record<string, string> = {
  "automation-consultant": consultant1,
  "process-improvement-consultant": consultant2,
  "digital-transformation-consultant": consultant3,
};

export const consultantPhoto = (c: Pick<ConsultantRow, "photo_url" | "slug">) =>
  c.photo_url || fallbackPhotos[c.slug] || "/placeholder.svg";

export const useConsultants = (includeInactive = false) => {
  const [consultants, setConsultants] = useState<ConsultantRow[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("consultants").select("*").order("sort_order").order("name");
    if (!includeInactive) q = q.eq("active", true);
    const { data, error } = await q;
    if (error) console.error(error);
    setConsultants((data ?? []) as unknown as ConsultantRow[]);
    setLoading(false);
  }, [includeInactive]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { consultants, loading, reload };
};
