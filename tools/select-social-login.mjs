// Select an existing screen in the isolated, generated screenshot preview.
// This changes only the starting route, not the screen or original application.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundle = path.join(root, '.capture-social-export/_expo/static/js/web/AppEntry-523c52482dd3b85490270890c15e517f.js');
const source = fs.readFileSync(bundle, 'utf8');
const marker = 'initialRouteName:"TabNavigator"';
if (source.split(marker).length !== 2) throw new Error('Expected exactly one original starting route.');
fs.writeFileSync(bundle, source.replace(marker, 'initialRouteName:"Login"'));
console.log('Isolated preview now opens the original Login screen.');
