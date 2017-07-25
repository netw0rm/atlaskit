import { expect } from 'chai';
import defaultSchema from '../../../src/test-helper/schema';
import { isEmojiDocument } from '../../../src/utils';

// tslint:disable:quotemark

describe('@atlaskit/editore-core/utils', () => {
  describe('isEmojiMessage()', () => {
    const assert = (descr, doc, state = true) => it(descr, () => {
      const pmDoc = defaultSchema.nodeFromJSON(doc);

      context('handles JSON documents', () => {
        expect(isEmojiDocument(doc)).to.eq(state);
      });

      context('handles ProseMirror documents', () => {
        expect(isEmojiDocument(pmDoc)).to.eq(state);
      });
    });

    assert(
      'detects messages with just one emoji',
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "text",
                "text": " "
              }
            ]
          }
        ]
      }
    );

    assert(
      "detects messages with emoji interleaved with spaces",
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "text",
                "text": " "
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "text",
                "text": " "
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":laughing:",
                  "id": "1f606",
                  "text": "😆"
                }
              },
              {
                "type": "text",
                "text": " "
              }
            ]
          }
        ]
      }
    );

    assert(
      "accepts leading and trailing whitespace",
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "   "
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "text",
                "text": "    "
              }
            ]
          }
        ]
      }
    );

    assert(
      "accepts tightly adjacent emoji",
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":sweat_smile:",
                  "id": "1f605",
                  "text": "😅"
                }
              }
            ]
          }
        ]
      }
    );

    assert(
      "rejects messages with 4 or more emoji",
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grin:",
                  "id": "1f601",
                  "text": "😁"
                }
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":sweat_smile:",
                  "id": "1f605",
                  "text": "😅"
                }
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":poop:",
                  "id": "1f4a9",
                  "text": "💩"
                }
              },
              {
                "type": "text",
                "text": " "
              }
            ]
          }
        ]
      },
      false
    );

    assert(
      "rejects messages with text mixed with emoji",
      {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "a"
              },
              {
                "type": "emoji",
                "attrs": {
                  "shortName": ":grinning:",
                  "id": "1f600",
                  "text": "😀"
                }
              },
              {
                "type": "text",
                "text": " "
              }
            ]
          }
        ]
      },
      false
    );

  });
});
