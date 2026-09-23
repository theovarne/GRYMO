import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const coreLayers = ['genome','breeding','mutation','behaviour','lineage','renderer','deterministic'];
let checked = 0;
const problems = [];
for (const layer of coreLayers) {
  for (const file of fs.readdirSync(path.join('src',layer)).filter(f=>f.endsWith('.ts'))) {
    const name=path.join('src',layer,file), text=fs.readFileSync(name,'utf8');checked++;
    const tree=ts.createSourceFile(name,text,ts.ScriptTarget.Latest,true);
    function visit(node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const spec=node.moduleSpecifier.text;
        if (!spec.startsWith('.') || /(?:^|\/)chain(?:\/|$)/.test(spec)) problems.push(name+': core import crosses offline boundary');
      }
      if (ts.isCallExpression(node)) {
        const call=node.expression.getText(tree);
        if (['fetch','Math.random','Date.now','eval'].includes(call)) problems.push(name+': forbidden nondeterministic/network call '+call);
      }
      ts.forEachChild(node,visit);
    }
    visit(tree);
  }
}
for (const file of ['README.md',...fs.readdirSync('docs').filter(x=>x.endsWith('.md')).map(x=>'docs/'+x)]) {
  const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file),target))) problems.push(file+': missing local link '+target);
  }
}
if(problems.length)throw Error(problems.join('\n'));
console.log(`Offline import/call boundaries: ${checked} core modules; Markdown links: PASS.`);
