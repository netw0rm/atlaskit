#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

/*
  This script was added as a part of AK-3251 to fix one of the intermittent issues when building
  the website.
   For some reason, occasionally hpack.js installs with no main field in its package.json, so we
   just add it ourself.
*/

const hpackJsonPath = path.join(__dirname, '..', 'node_modules', 'webpack-dev-server', 'node_modules', 'hpack.js', 'package.json');
const hpackJson = require(hpackJsonPath, 'utf-8'); // eslint-disable-line  import/no-dynamic-require

// fix the main field
hpackJson.main = 'lib/hpack.js';

// write the file back to disk
fs.writeFileSync(hpackJsonPath, JSON.stringify(hpackJson));

console.log('hpack.js main field fixed!');
