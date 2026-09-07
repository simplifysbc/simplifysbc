import consultant1 from "@/assets/consultants/consultant-1.jpg";
import consultant2 from "@/assets/consultants/consultant-2.jpg";
import consultant3 from "@/assets/consultants/consultant-3.jpg";

export interface Consultant {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  focus: string[];
  availability: { day: string; hours: string }[];
  projects: { title: string; result: string }[];
}

export const ANY_CONSULTANT = "Any available consultant";

export const consultants: Consultant[] = [
  {
    slug: "automation-consultant",
    name: "Dale Whitmore",
    role: "Automation Consultant",
    photo: consultant1,
    bio: "Dale has spent fifteen years helping family run businesses swap paperwork and spreadsheets for simple tools that do the repeat work on their own. He is happiest on a shop floor, watching how a job really gets done before suggesting a single change.",
    focus: ["Order and invoice automation", "Customer follow ups", "Inventory alerts"],
    availability: [
      { day: "Monday", hours: "09:00 - 13:00" },
      { day: "Tuesday", hours: "09:00 - 17:00" },
      { day: "Thursday", hours: "11:00 - 17:00" },
    ],
    projects: [
      { title: "Family hardware store, Nebraska", result: "Cut order paperwork from 6 hours a week to under 1." },
      { title: "Regional feed supplier", result: "Automatic low stock alerts ended weekend emergency runs." },
      { title: "Rural plumbing crew", result: "Text reminders dropped missed appointments by 40 percent." },
    ],
  },
  {
    slug: "process-improvement-consultant",
    name: "Renata Alvarez",
    role: "Process Improvement Consultant",
    photo: consultant2,
    bio: "Renata maps how work moves through a business and finds the steps that quietly cost the most. She explains everything in plain language, so owners and staff can see the fix and agree on it together.",
    focus: ["Process mapping", "Team handoffs", "Cost and waste reduction"],
    availability: [
      { day: "Monday", hours: "12:00 - 17:00" },
      { day: "Wednesday", hours: "09:00 - 17:00" },
      { day: "Friday", hours: "09:00 - 14:00" },
    ],
    projects: [
      { title: "Cold storage facility", result: "Reworked intake steps and saved 11 staff hours a week." },
      { title: "Small town clinic", result: "New check in flow cut patient wait times in half." },
      { title: "Farm equipment repair shop", result: "Clear job handoffs reduced rework jobs by a third." },
    ],
  },
  {
    slug: "digital-transformation-consultant",
    name: "Marcus Feld",
    role: "Digital Transformation Consultant",
    photo: consultant3,
    bio: "Marcus helps businesses move off paper and legacy systems without disruption, choosing tools that work even where internet is slow. He stays on through the switch so nobody is left guessing.",
    focus: ["Cloud tools for slow internet", "Data cleanup and migration", "Staff training"],
    availability: [
      { day: "Tuesday", hours: "13:00 - 17:00" },
      { day: "Thursday", hours: "09:00 - 15:00" },
      { day: "Friday", hours: "10:00 - 16:00" },
    ],
    projects: [
      { title: "Grain cooperative", result: "Moved 12 years of records into one searchable system." },
      { title: "Rural retail chain", result: "Offline first point of sale kept stores running during outages." },
      { title: "Landscaping company", result: "Crews moved to mobile job sheets, ending lost paperwork." },
    ],
  },
];

export const consultantNames = consultants.map((c) => c.role);
