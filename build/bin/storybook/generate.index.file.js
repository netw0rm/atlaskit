#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateIndexFile(storiesDir, title) {
  const pathToIndexFile = path.join(storiesDir, 'index.html');
  const packages = fs.readdirSync(storiesDir)
    .filter(pkgName => fs.statSync(`${storiesDir}/${pkgName}`).isDirectory());

  const indexContents = `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="https://unpkg.com/@atlaskit/css-reset" />
      </head>
      <body>
        <h1>${title}</h1>
        <h2>Generated on ${new Date()}</h2>
        <ul>
          ${packages.map((pkgName) => {
            const version = fs.readdirSync(path.join(storiesDir, pkgName))[0];
            return `<li><a href="${pkgName}/${version}/index.html">${pkgName}@${version}</a></li>`;
          }).join('\n')}
        </ul>
      </body>
    </html>
    `;
  fs.writeFileSync(pathToIndexFile, indexContents);
}

module.exports = generateIndexFile;
