import { denormaliseEmojis } from '../src/api/EmojiResource';
import EmojiService from '../src/api/EmojiService';
import emojiData from './story-data.json';

const testingImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWP4//8/AAX+Av5Y8msOAAAAAElFTkSuQmCC';

const testify = (emojis) => {
  const copy = JSON.parse(JSON.stringify(emojis));
  copy.forEach((emoji) => {
    if (emoji.representation) {
      if (emoji.representation.imagePath) {
        emoji.representation.imagePath = testingImage;
      }
      if (emoji.representation.sprite) {
        emoji.representation.sprite.url = testingImage;
      }
      if (emoji.representation.spriteRef) {
        emoji.representation.spriteRef = testingImage;
      }
    }
    if (emoji.skinVariations && emoji.skinVariations.length) {
      emoji.skinVariations.forEach((variation) => {
        if (variation.imagePath) {
          variation.imagePath = testingImage;
        }
        if (variation.sprite) {
          variation.sprite.url = testingImage;
        }
        if (variation.spriteRef) {
          variation.spriteRef = testingImage;
        }
      });
    }
  });
  return copy;
};

export const storyEmojis = denormaliseEmojis(emojiData);
export const testingEmojis = testify(storyEmojis);

// Double check we've not missed any (e.g. data structure changes)
JSON.stringify(testingEmojis, null, 2).split('\n').forEach((line) => {
  if (line.indexOf('http') > -1) {
    console.log('WARNING - still some urls in testingEmojis', line);
  }
});

export const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
a semper massa dignissim nec.
`;

export const storyEmojiService = new EmojiService(storyEmojis);
export const testingEmojiService = new EmojiService(testingEmojis);
