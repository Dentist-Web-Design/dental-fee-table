import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('preserves all four approved price states',()=>{const r=analyse(data);assert.deepEqual(r.fees.map(f=>f.display),['£42.00','£60.00 to £95.00','From £80.00','Quote after discussion']);});
test('rejects reversed ranges and unstated approval dates',()=>{const d=structuredClone(data);d.fees[1].min_amount='100';assert.throws(()=>analyse(d),/minimum/);d.fees[1].min_amount='60';delete d.fees[0].reviewed_on;assert.throws(()=>analyse(d),/date/);});
test('does not disguise mixed price fields as an exact amount',()=>{const d=structuredClone(data);d.fees[0].max_amount='60';assert.throws(()=>analyse(d),/range fields/);});
