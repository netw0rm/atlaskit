#!/usr/local/bin/node

const stdin = process.stdin;
const stdout = process.stdout;
const inputChunks = [];

const ORDERED_CATEGORIES = {
  FREQUENT: 1,
  PEOPLE: 2,
  NATURE: 3,
  FOODS: 4,
  PLACES: 5,
  ACTIVITY: 6,
  OBJECTS: 7,
  SYMBOLS: 8,
  FLAGS: 9,
  ATLASSIAN: 10,
  CUSTOM: 11,
};

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (chunk) => {
  inputChunks.push(chunk);
});

stdin.on('end', () => {
  const inputJSON = inputChunks.join('');
  const parsedData = JSON.parse(inputJSON);

  const sortedEmoji = parsedData.emojis.sort((e1, e2) => {
    const c1 = e1.category;
    const c2 = e2.category;
    const co1 = ORDERED_CATEGORIES[c1];
    const co2 = ORDERED_CATEGORIES[c2];
    if (co1 !== co2) {
      if (!co1) {
        return -1;
      }
      if (!co2) {
        return 1;
      }
      return co1 - co2;
    }

    const o1 = e1.order || 9999999;
    const o2 = e2.order || 9999999;
    if (o1 !== o2) {
      return o1 - o2;
    }

    const id1 = e1.id;
    const id2 = e2.id;

    return id1.localeCompare(id2);
  });

  const outputJSON = JSON.stringify({ emojis: sortedEmoji, meta: parsedData.meta }, null, 2);
  stdout.write(outputJSON);
  stdout.write('\n');
});
