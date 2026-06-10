#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file.replace(/\?.*$/, '')));

const checks = [];
const add = (name, fn) => checks.push({ name, fn });
const fail = msg => {
  throw new Error(msg);
};

function parseJson(file) {
  JSON.parse(read(file));
}

function extractModuleScript() {
  const html = read('index.html');
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  if (!match) fail('index.html module script not found');
  return match[1].replace(/^import[^;]+;\n/gm, '');
}

function localRefs() {
  const files = ['index.html', 'manifest.webmanifest', 'sw.js', 'quick-test.html'];
  const refs = new Set();
  const patterns = [
    /url\(['"]?([^'")]+)['"]?\)/g,
    /(?:href|src)=["']([^"']+)["']/g,
    /"src"\s*:\s*"([^"]+)"/g
  ];
  for (const file of files) {
    const body = read(file);
    for (const re of patterns) {
      for (const match of body.matchAll(re)) {
        const ref = match[1].replace(/^\.\//, '');
        if (!/^https?:/.test(ref) && !ref.startsWith('#') && !ref.startsWith('data:') && !ref.includes('${')) {
          refs.add(ref);
        }
      }
    }
  }
  return [...refs].filter(ref => /\.(jpg|jpeg|png|svg|webp|webmanifest|js|html)(\?|$)/i.test(ref));
}

add('database.rules.json parses', () => parseJson('database.rules.json'));
add('manifest.webmanifest parses', () => parseJson('manifest.webmanifest'));
add('index.html module script parses', () => new Function(extractModuleScript()));
add('quick-test opens demo mode', () => {
  if (!read('quick-test.html').includes('index.html?demo=1')) fail('quick-test.html does not point at index.html?demo=1');
});
add('production not-configured state exists', () => {
  const html = read('index.html');
  if (!html.includes('App not configured') || !html.includes('owner needs to finish setup')) {
    fail('friendly not-configured state not found');
  }
});
add('demo boot returns before Firebase config', () => {
  const html = read('index.html');
  if (!html.includes('if(DEMO_MODE){startDemo();return;}')) fail('demo boot shortcut not found');
});
add('service worker cached assets exist', () => {
  const sw = read('sw.js');
  const match = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/);
  if (!match) fail('APP_SHELL not found in sw.js');
  const refs = [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1].replace(/^\.\//, ''));
  const missing = refs.filter(ref => ref && ref !== '.' && !exists(ref));
  if (missing.length) fail('missing service worker asset(s): ' + missing.join(', '));
});
add('all referenced local assets exist', () => {
  const missing = localRefs().filter(ref => !exists(ref));
  if (missing.length) fail('missing referenced asset(s): ' + missing.join(', '));
});
add('no stale nickname-keyed production writes', () => {
  const html = read('index.html');
  const bad = [
    /gref\([`'"]users\//,
    /groups\/\$\{[^}]+\}\/users\//,
    /users\/\$\{(?:me|displayName|name|nickname)/,
    /collections\/\$\{displayName/,
    /wish\/\$\{displayName/,
    /presence\/\$\{displayName/
  ].filter(re => re.test(html));
  if (bad.length) fail('possible stale nickname-keyed production write path found');
});
add('forbidden quick-complete labels absent', () => {
  const html = read('index.html');
  const forbidden = [
    ['Mark', 'done'].join(' '),
    'Swapped ' + String.fromCharCode(0x2713),
    ['Complete', 'swap'].join(' '),
    ['group', 'chat', 'export'].join(' '),
    ['Export', 'to', 'WhatsApp'].join(' ')
  ];
  const hits = forbidden.filter(term => html.includes(term));
  if (hits.length) fail('forbidden quick-complete/export label(s): ' + hits.join(', '));
});
add('rules are not open by group code alone', () => {
  const rules = read('database.rules.json');
  if (!rules.includes('".read": false') || !rules.includes('".write": false')) fail('root read/write denial not found');
  if (!rules.includes('auth != null')) fail('auth requirement not found in rules');
  if (!rules.includes('root.child(\'groups\').child($group).child(\'members\').child(auth.uid).exists()')) {
    fail('member-gated group read expression not found');
  }
});

const groups = {
  all: checks.map(c => c.name),
  rules: ['database.rules.json parses', 'rules are not open by group code alone'],
  syntax: ['manifest.webmanifest parses', 'index.html module script parses'],
  stale: ['no stale nickname-keyed production writes'],
  swaps: ['forbidden quick-complete labels absent'],
  pwa: ['manifest.webmanifest parses', 'service worker cached assets exist', 'all referenced local assets exist'],
  demo: ['quick-test opens demo mode', 'demo boot returns before Firebase config', 'production not-configured state exists']
};

const requested = process.argv.slice(2);
const wanted = requested.length ? requested : ['all'];
const names = new Set();
for (const item of wanted) {
  if (groups[item]) groups[item].forEach(name => names.add(name));
  else names.add(item);
}

let failed = 0;
for (const check of checks.filter(c => names.has(c.name))) {
  try {
    check.fn();
    console.log('PASS ' + check.name);
  } catch (err) {
    failed++;
    console.error('FAIL ' + check.name + ': ' + err.message);
  }
}

if (!checks.some(c => names.has(c.name))) {
  console.error('No checks matched: ' + wanted.join(', '));
  process.exit(2);
}
if (failed) process.exit(1);
