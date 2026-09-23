import test from 'node:test';
import assert from 'node:assert/strict';
import {generateGenome, renderSvg} from '../dist/index.js';
test('renderer revision 2 responds to every phenotype locus',()=>{
  const g=generateGenome('741190'), original=renderSvg(g);
  for(const key of ['palette','eyes','eye_size','eye_spread','snout','fangs','warts','brow','skull'] as const){
    const copy=structuredClone(g); copy.phenotype[key]+=.1;
    if(['palette','eyes','fangs','warts'].includes(key)) copy.phenotype[key]=key==='eyes'?1:copy.phenotype[key]+1;
    assert.notEqual(renderSvg(copy),original,key);
  }
  for(const key of ['size','droop'] as const){const copy=structuredClone(g);copy.phenotype.ears[key]+=.1;assert.notEqual(renderSvg(copy),original,key);}
});
