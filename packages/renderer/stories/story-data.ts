export const document = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' Look I can do '
        },
        {
          type: 'text',
          text: 'italic text!',
          marks: [
            {
              type: 'em'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'My name is '
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'text',
          text: ' :D',
          marks: [
            {
              type: 'unkown mark'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a displayName'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
            displayName: '@oscar'
          }
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a text-property'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
          },
          text: '@oscar'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em'
            }
          ]
        },
        {
          type: 'text',
          text: 'link',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'monospace',
          marks: [
            {
              type: 'mono'
            }
          ]
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike'
            }
          ]
        },
        {
          type: 'text',
          text: 'strong',
          marks: [
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'sub',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'sup',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline'
            }
          ]
        },
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'unkown type',
          attrs: {
            text: 'fallback text'
          }
        },
        {
          type: 'very unkown'
        }
      ]
    }
  ]
};
