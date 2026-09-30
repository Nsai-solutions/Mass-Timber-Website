import contractorsData from '@/data/contractors.json';
import projectsData from '@/data/projects.json';
import type { Contractor, Project } from '@/types';

const contractors = contractorsData as Contractor[];
const projects = projectsData as Project[];

// Names may differ slightly between datasets ("FOUST Fabrication & Erectors" vs
// "Foust Fabrication and Erectors, Inc."), so match on a normalized form.
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|corp|corporation|company|co)\b/g, '')
    .replace(/\band\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function findContractorByName(name: string | undefined): Contractor | undefined {
  if (!name) return undefined;
  const target = normalizeName(name);
  return contractors.find((c) => normalizeName(c.name) === target);
}

export function projectsForContractor(contractor: Contractor): Project[] {
  const target = normalizeName(contractor.name);
  return projects.filter((p) => p.contractor && normalizeName(p.contractor) === target);
}
