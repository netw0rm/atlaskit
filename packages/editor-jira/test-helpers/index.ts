import { Node } from '@atlaskit/editor-core';
import { chaiPlugin } from '@atlaskit/editor-core/dist/es5/test-helper';
import { encode, parse, JIRACustomEncoders, MediaContextInfo } from '../src/html';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

export function checkParse(description: string, schema, htmls: string[], node: Node) {
  it(`parses HTML: ${description}`, () => {
    for (const html of htmls) {
      const actual = parse(html, schema);
      expect(actual).to.deep.equal(node);
    }
  });
}

export function checkEncode(
  description: string, schema, node: Node, html: string,
  customEncoders: JIRACustomEncoders = {}, mediaContextInfo?: MediaContextInfo
) {
  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema, customEncoders, mediaContextInfo);
    const encodedTree = new DOMParser().parseFromString(encoded, 'text/html');
    const htmlTree = new DOMParser().parseFromString(html, 'text/html');

    expect(isElementEqual(encodedTree, htmlTree)).to.equal(true, `htmls are not matched \n expected:\n- ${encoded} \n actual:\n- ${html} \n`);
  });
}

export function checkParseEncodeRoundTrips(
  description: string, schema, html: string, node: Node,
  customEncoders: JIRACustomEncoders = {}, mediaContextInfo?: MediaContextInfo
) {
  it(`parses HTML: ${description}`, () => {
    const actual = parse(html, schema);
    expect(actual).to.deep.equal(node);
  });

  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema, customEncoders, mediaContextInfo);
    const encodedTree = new DOMParser().parseFromString(encoded, 'text/html');
    const htmlTree = new DOMParser().parseFromString(html, 'text/html');

    expect(isElementEqual(encodedTree, htmlTree)).to.equal(true, `htmls are not matched \n expected:\n- ${encoded} \n actual:\n- ${html} \n`);
  });

  it(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node, schema, customEncoders, mediaContextInfo), schema);
    expect(roundTripped).to.deep.equal(node);
  });
}

function getAttributeNames(tags: HTMLElement) {
  const { attributes } = tags;

  if (!attributes) {
    return [];
  }

  const attributeNames = Array.prototype.slice.call(attributes)
    .map((attribute) => (attribute.nodeName));

  attributeNames.sort();
  return attributeNames;
}

// This function comes from https://stackoverflow.com/questions/10679762/how-to-compare-two-html-elements
// It was renamed
function isElementEqual(thisElement, otherElement): boolean {

  // Compare attributes without order sensitivity
  const thisAttributeNames = getAttributeNames(thisElement);
  const otherAttributeNames = getAttributeNames(otherElement);

  if (thisAttributeNames.join(',') !== otherAttributeNames.join(',')) {
    return false;
  }

  for (let index = 0; index < thisAttributeNames.length; ++index) {
    const name = thisAttributeNames[index];
    if (thisElement.getAttribute(name) !== otherElement.getAttribute(name)) {
      return false;
    }
  }

  // Walk the children
  thisElement = thisElement.firstChild;
  otherElement = otherElement.firstChild;

  while (thisElement && otherElement) {
    if (thisElement.nodeType !== otherElement.nodeType) {
      return false;
    }
    if (thisElement.nodeType === 1) { // Element Node
      if (!isElementEqual(thisElement, otherElement)) {
        return false;
      }
    }
    else if (thisElement.nodeValue !== otherElement.nodeValue) {
      return false;
    }

    thisElement = thisElement.nextSibling;
    otherElement = otherElement.nextSibling;
  }

  if (thisElement || otherElement) {
    // One of the elements had more nodes than the other
    return false;
  }

  // Seem the same
  return true;
}
