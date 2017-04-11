#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const allureReport = path.join(process.cwd(), 'allure-results');
const directories = fs.readdirSync(allureReport).filter(f => fs.statSync(`${allureReport}/${f}`).isDirectory());

// eslint-disable-next-line
console.log(`<html>
  <head>
    <title>Allure Reports</title>
    <link rel="stylesheet" href="https://unpkg.com/@atlaskit/css-reset" />
  </head>
  <body>
    <h1>Allure Reports for packages:</h1>
    <h2>Generated on ${new Date()}</h2>
    <ul>
      ${directories.map(directory => `<li><a href="${directory}/allure-report/index.html">${directory}</a></li>`).join('\n')}
    </ul>
  </body>
</html>`);
