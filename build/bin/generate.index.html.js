#!/usr/bin/env node

const fs = require('fs');

const dir = process.argv[2];
fs.readdir(dir, (err, files) => {
  // eslint-disable-next-line no-console
  console.log(`
    <html>
      <head>
        <title>Index</title>
      </head>
      <body>
        <h1>${dir}</h1>
        <h2>Generated ${new Date()}</h2>
        <ul>
          ${files.map(file => `<li><a href="${file}/index.html">${file}</a></li>`).join('\n')}
        </ul>
      </body>
    </html>
  `);
});

