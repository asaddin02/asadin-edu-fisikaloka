import { COURSES, LEVELS, findCourse, LEGACY_LESSON_MAP } from '../data/courses/index.js';
const KEY='asadin_physics_study_v2';
const empty=()=>({level:'sd',read:[],passed:[],notes:{},attempts:{}});
export function loadStudy(){
 try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(!raw||typeof raw!=='object'){const fresh=empty();try{const legacy=JSON.parse(localStorage.getItem('asadin_physics_completed_lessons')||'[]');if(Array.isArray(legacy))fresh.read=[...new Set(legacy.map(id=>LEGACY_LESSON_MAP[id]).filter(Boolean))];}catch{}return fresh;}const valid=id=>COURSES.some(c=>c.id===id);return {level:LEVELS.some(l=>l.id===raw.level)?raw.level:'sd',read:Array.isArray(raw.read)?[...new Set(raw.read.filter(valid))]:[],passed:Array.isArray(raw.passed)?[...new Set(raw.passed.filter(valid))]:[],notes:Object.fromEntries(Object.entries(raw.notes||{}).filter(([id,text])=>valid(id)&&typeof text==='string').map(([id,text])=>[id,text.slice(0,10000)])),attempts:Object.fromEntries(Object.entries(raw.attempts||{}).filter(([id,count])=>valid(id)&&Number.isSafeInteger(count)&&count>=0))};}catch{return empty();}
}
export function saveStudy(study){try{localStorage.setItem(KEY,JSON.stringify(study));return true;}catch{return false;}}
export function setStudyLevel(level){const s=loadStudy();if(LEVELS.some(l=>l.id===level))s.level=level;saveStudy(s);return s;}
export function exportStudy(){return JSON.stringify({application:'Fisikaloka',version:2,exportedAt:new Date().toISOString(),study:loadStudy()},null,2);}
export function resetStudy(){try{localStorage.removeItem(KEY);localStorage.removeItem('asadin_physics_completed_lessons');return true;}catch{return false;}}
export function readCourse(id){return findCourse(id);}
