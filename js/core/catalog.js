import { topicLabel } from '../data/topic-labels.js';
import { COURSES } from '../data/courses/index.js';
import { PHYSICS_ENTITIES } from '../data/entities.js';
import { PHYSICS_EQUATIONS } from '../data/equations.js';
import { PHYSICAL_CONSTANTS } from '../data/constants.js';
import { PHYSICS_EXPERIMENTS } from '../data/experiments.js';
import { PHYSICS_DOMAINS } from '../data/domains.js';

export const CATALOG = [
  ...COURSES.map(c=>({...c,name:c.title,indonesianName:c.topics.map(topicLabel).join(" · "),entityType:"Lesson",summary:c.intuition,url:`/lesson/${c.id}`})),
  ...PHYSICS_ENTITIES.map(e => ({...e, url: `/entity/${e.id}`})),
  ...PHYSICS_EQUATIONS.map(e => ({...e, entityType: 'Equation', url: `/equations?id=${e.id}`})),
  ...PHYSICAL_CONSTANTS.map(e => ({...e, entityType: 'Constant', summary: e.description, domainId: e.domainId || (e.category.includes('Kosmologi') ? 'cosmology' : 'foundations'), url: `/constants?id=${e.id}`})),
  ...PHYSICS_EXPERIMENTS.map(e => ({...e, entityType: 'Experiment', summary: e.objective, url: `/experiments?id=${e.id}`}))
];
export function resolveReference(id) {
  const record = CATALOG.find(e => e.id === id);
  if (record) return record;
  const domain = PHYSICS_DOMAINS.find(e => e.id === id);
  return domain ? {...domain, entityType: 'Domain', url: `/explore?domain=${id}`} : null;
}
