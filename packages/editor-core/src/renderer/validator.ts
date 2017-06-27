import { Mark as PMMark } from '../prosemirror';

export interface Doc {
  version: 1;
  type: 'doc';
  content: Node[];
}

export interface Node {
  type: string;
  attrs?: any;
  content?: Node[];
  marks?: Mark[];
  text?: string;
}

export interface Mark {
  type: string;
  attrs?: any;
}

export interface MarkSimple {
  type: {
    name: string
  };
  attrs?: any;
}

/*
 * It's important that this order follows the marks rank defined here:
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Rank
 */
export const markOrder = [
  'link',
  'em',
  'strong',
  'strike',
  'subsup',
  'underline',
  'code',
];

const whitelistedURLPatterns = [
  /^https?:\/\//im,
  /^ftps?:\/\//im,
  /^\/\//im,
  /^mailto:/im,
  /^skype:/im,
  /^callto:/im,
  /^facetime:/im,
  /^git:/im,
  /^irc6?:/im,
  /^news:/im,
  /^nntp:/im,
  /^feed:/im,
  /^cvs:/im,
  /^svn:/im,
  /^mvn:/im,
  /^ssh:/im,
  /^scp:\/\//im,
  /^sftp:\/\//im,
  /^itms:/im,
  /^notes:/im,
  /^smb:/im,
  /^hipchat:\/\//im,
  /^sourcetree:/im,
  /^urn:/im,
  /^tel:/im,
  /^xmpp:/im,
  /^telnet:/im,
  /^vnc:/im,
  /^rdp:/im,
  /^whatsapp:/im,
  /^slack:/im,
  /^sips?:/im,
  /^magnet:/im,
];

export const isSafeUrl = (url: string): boolean => {
  return whitelistedURLPatterns.some(p => p.test(url.trim()) === true);
};

export const isSubSupType = (type: string): type is 'sub' | 'sup' => {
  return type === 'sub' || type === 'sup';
};

/*
 * Sorts mark by the predfined order above
 */
export const getMarksByOrder = (marks: PMMark[] ) => {
  return [...marks].sort((a, b) => markOrder.indexOf(a.type.name) - markOrder.indexOf(b.type.name));
};

/*
 * Check if two marks are the same by comparing type and attrs
 */
export const isSameMark = (mark: PMMark | null, otherMark: PMMark | null) => {
  if (!mark || !otherMark) {
    return false;
  }

  return mark.eq(otherMark);
};

export const getValidDocument = (doc: Doc): Doc | null => {
  const node = getValidNode(doc as Node);

  if (node.type === 'doc') {
    return node as Doc;
  }

  return null;
};

export const getValidContent = (content: Node[]): Node[] => {
  return content.map(node => getValidNode(node));
};

/*
 * This method will validate a Node according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Nodes
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return 'unknown'
 *
 */
export const getValidNode = (node: Node): Node => {
  const { attrs, text, type } = node;
  let { content } = node;

  if (content) {
    content = getValidContent(content);
  }

  if (type) {
    switch (type) {
      case 'doc': {
        const { version } = node as Doc;
        if (version && content && content.length) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'emoji': {
        if (attrs && attrs.shortName) {
          return {
            type,
            attrs
          };
        }
        break;
      }
      case 'hardBreak': {
        return {
          type
        };
      }
      case 'media': {
        let mediaId = '';
        let mediaType = '';
        let mediaCollection = [];
        if (attrs) {
          const { id, collection, type } = attrs;
          mediaId = id;
          mediaType = type;
          mediaCollection = collection;
        }
        if (mediaId && mediaType && mediaCollection.length) {
          return {
            type,
            attrs: {
              type: mediaType,
              id: mediaId,
              collection: mediaCollection
            }
          };
        }
        break;
      }
      case 'mediaGroup': {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'mention': {
        let mentionText = '';
        let mentionId;
        let mentionAccess;
        if (attrs) {
          const { text, displayName, id, accessLevel } = attrs;
          mentionText = text || displayName;
          mentionId = id;
          mentionAccess = accessLevel;
        }

        if (!mentionText) {
          mentionText = text || '@unknown';
        }

        if (mentionText && mentionId) {
          const mentionNode = {
            type,
            attrs: {
              id: mentionId,
              text: mentionText
            }
          };
          if (mentionAccess) {
            mentionNode.attrs['accessLevel'] = mentionAccess;
          }

          return mentionNode;
        }
        break;
      }
      case 'paragraph': {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'rule': {
        return {
          type,
        };
      }
      case 'text': {
        let { marks } = node;
        if (text) {
          if (marks) {
            marks = marks.reduce((acc, mark ) => {
              const validMark = getValidMark(mark);
              if (validMark) {
                acc.push(validMark);
              }

              return acc;
            }, [] as Mark[]);
          }
          return marks ? { type, text, marks: marks } : { type, text };
        }
        break;
      }
      case 'heading': {
        if (attrs && content) {
          const { level } = attrs;
          const between = (x, a, b) => x >= a && x <= b;
          if (level && between(level, 1, 6)) {
            return {
              type,
              content,
              attrs: {
                level
              },
            };
          }
        }
        break;
      }
      case 'bulletList': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'orderedList': {
        if (content) {
          return {
            type,
            content,
            attrs: {
              order: attrs && attrs.order
            },
          };
        }
        break;
      }
      case 'listItem': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'blockquote': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'panel': {
        const types = ['info', 'note', 'tip', 'warning'];
        if (attrs && content) {
          const { panelType } = attrs;
          if (types.indexOf(panelType) > -1) {
            return {
              type,
              attrs: { panelType },
              content,
            };
          }
        }
        break;
      }
    }
  }

  return {
    type: 'unknown',
    text: text || undefined,
    attrs: attrs || undefined,
    content: content || undefined
  };
};

/*
 * This method will validate a Mark according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Marks
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return null
 *
 */
export const getValidMark = (mark: Mark): Mark | null => {
  const { attrs, type } = mark;

  if (type) {
    switch (type) {
      case 'code': {
        return {
          type,
        };
      }
      case 'em': {
        return {
          type,
        };
      }
      case 'link': {
        if (attrs) {
          const { href, url } = attrs;
          let linkHref = href || url;

          if (linkHref.indexOf(':') === -1) {
            linkHref = `//${linkHref}`;
          }

          if (linkHref && isSafeUrl(linkHref)) {
            return {
              type,
              attrs: {
                href: linkHref
              }
            };
          }
        }
        break;
      }
      case 'strike': {
        return {
          type,
        };
      }
      case 'strong': {
        return {
          type,
        };
      }
      case 'subsup': {
        if (attrs && attrs['type']) {
          const subSupType = attrs['type'];
          if (isSubSupType(subSupType)) {
            return {
              type,
              attrs: {
                type: subSupType
              }
            };
          }
        }
        break;
      }
      case 'underline': {
        return {
          type,
        };
      }
    }
  }

  return null;
};
