import { expect } from 'chai';

import { convertMediaToImageEmoji, convertMediaToImageRepresentation } from '../../src/type-helpers';
import { evilburnsEmoji, mediaEmoji } from '../../src/support/test-data';
import { MediaApiRepresentation } from '../../index';


const newPath = 'http://new-path/';

describe('#convertMediaToImageEmoji', () => {
  it('should return original if not media emoji', () => {
    expect(convertMediaToImageEmoji(evilburnsEmoji), 'Returns same emoji').to.deep.equal(evilburnsEmoji);
  });

  it('should convert MediaApiRepresentation to ImageRepresentation', () => {
    expect(convertMediaToImageEmoji(mediaEmoji)).to.deep.equal({
      ...mediaEmoji,
      representation: convertMediaToImageRepresentation(mediaEmoji.representation as MediaApiRepresentation),
      altRepresentation: convertMediaToImageRepresentation(mediaEmoji.altRepresentation as MediaApiRepresentation),
    });
  });

  it('should not include altRepresentation field if mediaEmoji does not contain it', () => {
    const { altRepresentation, ...newEmoji } = mediaEmoji;
    expect(convertMediaToImageEmoji(newEmoji)).to.deep.equal({
      ...newEmoji,
      representation: convertMediaToImageRepresentation(mediaEmoji.representation as MediaApiRepresentation),
    });
  });

  it('should apply the new image path to representation if not useAlt', () => {
    const newRepresentation = {
      ...convertMediaToImageRepresentation(mediaEmoji.representation as MediaApiRepresentation),
      imagePath: newPath,
    };
    expect(convertMediaToImageEmoji(mediaEmoji, newPath)).to.deep.equal({
      ...mediaEmoji,
      representation: newRepresentation,
      altRepresentation: convertMediaToImageRepresentation(mediaEmoji.altRepresentation as MediaApiRepresentation),
    });
  });

  it('should apply the new image path to altRepresentation if useAlt', () => {
    const newAltRepresentation = {
      ...convertMediaToImageRepresentation(mediaEmoji.altRepresentation as MediaApiRepresentation),
      imagePath: newPath,
    };
    expect(convertMediaToImageEmoji(mediaEmoji, newPath, true)).to.deep.equal({
      ...mediaEmoji,
      representation: convertMediaToImageRepresentation(mediaEmoji.representation as MediaApiRepresentation),
      altRepresentation: newAltRepresentation,
    });
  });
});
