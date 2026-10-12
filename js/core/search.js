import { topicLabel } from '../data/topic-labels.js';
import { COURSES } from '../data/courses/index.js';
import { LESSONS } from './learning.js';
// Phsyco · Global Fast Search Indexing Engine

import { PHYSICS_DOMAINS } from '../data/domains.js';
import { PHYSICS_ENTITIES } from '../data/entities.js';
import { PHYSICS_EQUATIONS } from '../data/equations.js';
import { PHYSICAL_CONSTANTS } from '../data/constants.js';
import { PHYSICS_EXPERIMENTS } from '../data/experiments.js';

class PhysicsSearchEngine {
  constructor() {
    this.index = [];
    this.buildIndex();
  }

  buildIndex() {
    const items = [];

    // 1. Entities
    for (const ent of PHYSICS_ENTITIES) {
      items.push({
        type: 'entity',
        id: ent.id,
        title: ent.name,
        subtitle: ent.indonesianName,
        badge: ent.entityType,
        domainId: ent.domainId,
        url: `/entity/${ent.id}`,
        searchTerms: `${ent.name} ${ent.indonesianName} ${ent.symbol || ''} ${ent.summary} ${ent.entityType} ${ent.subdomain || ''}`.toLowerCase()
      });
    }

    // 2. Domains
    for (const dom of PHYSICS_DOMAINS) {
      items.push({
        type: 'domain',
        id: dom.id,
        title: dom.name,
        subtitle: dom.indonesianName,
        badge: 'Domain',
        icon: dom.icon,
        domainId: dom.id,
        url: `/explore?domain=${dom.id}`,
        searchTerms: `${dom.name} ${dom.indonesianName} ${dom.description} ${dom.subdomains.join(' ')}`.toLowerCase()
      });
    }

    // 3. Equations
    for (const eq of PHYSICS_EQUATIONS) {
      items.push({
        type: 'equation',
        id: eq.id,
        title: eq.name,
        subtitle: eq.indonesianName,
        badge: 'Equation',
        symbol: eq.latexDisplay,
        domainId: eq.domainId,
        url: `/equations?id=${eq.id}`,
        searchTerms: `${eq.name} ${eq.indonesianName} ${eq.latexDisplay} ${eq.summary} ${eq.variables.map(v => v.name + ' ' + v.symbol).join(' ')}`.toLowerCase()
      });
    }

    // 4. Constants
    for (const c of PHYSICAL_CONSTANTS) {
      items.push({
        type: 'constant',
        id: c.id,
        title: `${c.symbol} · ${c.name}`,
        subtitle: `${c.indonesianName} (${c.value} ${c.unit})`,
        badge: 'Constant',
        url: `/constants?id=${c.id}`,
        searchTerms: `${c.name} ${(c.aliases || []).join(' ')} ${c.indonesianName} ${c.symbol} ${c.unit} ${c.category} ${c.description}`.toLowerCase()
      });
    }

    // 5. Experiments
    for (const exp of PHYSICS_EXPERIMENTS) {
      items.push({
        type: 'experiment',
        id: exp.id,
        title: exp.name,
        subtitle: `${exp.indonesianName} (${exp.scientist}, ${exp.year})`,
        badge: 'Experiment',
        domainId: exp.domainId,
        url: `/experiments?id=${exp.id}`,
        searchTerms: `${exp.name} ${exp.indonesianName} ${exp.scientist} ${exp.objective} ${exp.relatedLaw}`.toLowerCase()
      });
    }

    for (const lesson of LESSONS) {
      items.push({type:'lesson', id:lesson.id, title:lesson.title, subtitle:`${lesson.levelTitle} · ${lesson.moduleTitle}`, badge:'Lesson',
        url:`/learn?level=${lesson.levelId}&lesson=${lesson.id}`,
        searchTerms:`${lesson.title} ${lesson.concepts.join(' ')} ${lesson.takeaway} ${lesson.levelTitle} lesson pelajaran`.toLowerCase()});
    }
    for (const course of COURSES) items.push({type:'lesson',id:course.id,title:course.title,subtitle:course.intuition,badge:'Pelajaran',domainId:course.domainId,url:`/lesson/${course.id}`,searchTerms:`${course.title} ${course.topics.join(' ')} ${course.topics.map(topicLabel).join(' ')} ${course.intuition} ${course.explanation}`.toLowerCase()});
    this.index = items;
  }

  search(query, options = {}) {
    if (!query || query.trim().length === 0) return [];

    const clean = query.trim().toLowerCase();
    const tokens = clean.split(/\s+/);
    const limit = options.limit || 15;

    const matches = [];

    for (const item of this.index) {
      let score = 0;

      // Exact title match gets massive boost
      if (item.title.toLowerCase() === clean || (item.subtitle && item.subtitle.toLowerCase() === clean)) {
        score += 100;
      } else if (item.title.toLowerCase().startsWith(clean) || (item.subtitle && item.subtitle.toLowerCase().startsWith(clean))) {
        score += 50;
      }

      // Check all tokens
      let allTokensMatch = true;
      for (const token of tokens) {
        if (!item.searchTerms.includes(token)) {
          allTokensMatch = false;
          break;
        } else {
          score += 10;
        }
      }

      if (allTokensMatch) {
        matches.push({ item, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, limit).map(m => m.item);
  }
}

export const searchEngine = new PhysicsSearchEngine();
