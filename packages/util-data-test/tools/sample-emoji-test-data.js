#!/usr/local/bin/node

// Samples 10 emoji from each category for use as test data

const stdin = process.stdin;
const stdout = process.stdout;
const inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (chunk) => {
  inputChunks.push(chunk);
});

stdin.on('end', () => {
  const inputJSON = inputChunks.join('');
  const parsedData = JSON.parse(inputJSON);

  const { emojis, meta } = parsedData;
  const categoryCount = new Map(); // Map<string, number>
  const filteredEmojis = emojis.filter((emoji) => {
    const { category, shortName, type } = emoji;
    const count = categoryCount.get(category) || 0;
    if (shortName === ':thumbsup:' && type === 'STANDARD') {
      // has skin variations need for testing
      return true;
    }
    if ((category === 'PEOPLE' && count < 9) || (category !== 'PEOPLE' && count < 10)) {
      // 1 less to allow for thumbsup in PEOPLE category
      categoryCount.set(category, count + 1);
      return true;
    }
    return false;
  });

  const outputJSON = JSON.stringify({ emojis: filteredEmojis, meta }, null, 2);
  stdout.write(outputJSON);
  stdout.write('\n');
});
