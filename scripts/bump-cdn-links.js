import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Update the pinned `cssfun@<version>` CDN links in the README, the agent skill
// and examples, and the skill's `metadata.version`, to match the current
// package.json version. Run by the `version` npm lifecycle hook, so it runs on
// every `npm version` bump (including prereleases).

const { version } = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

const re = /cssfun@(v)?\d+\.\d+\.\d+(?:-[\w.-]+)?/g;

const skill = 'skills/cssfun/SKILL.md';

const files = [
    'README.md',
    skill,
    'skills/cssfun/references/advanced.md',
    'skills/cssfun/references/ssr.md',
    'skills/cssfun/references/typescript.md',
    'example/rasti/index.html',
    'example/react/index.html',
    'example/vanilla/index.html'
];

files.forEach(file => {
    let text = readFileSync(file, 'utf8').replace(re, (match, prefix) => `cssfun@${prefix || ''}${version}`);
    if (file === skill) text = text.replace(/^(  version: )".*"$/m, `$1"${version}"`);
    writeFileSync(file, text);
});

execSync(`git add ${files.join(' ')}`, { stdio : 'inherit' });
