import { Node } from '@atlaskit/editor-core';
import { chaiPlugin } from '@atlaskit/editor-core/dist/es5/test-helper';
import { encode, parse } from '../src/html';
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
};

export function checkEncode(description: string, schema, node: Node, html: string) {
  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema);
    expect(encoded).to.deep.equal(html);
  });
};

export function checkParseEncodeRoundTrips(description: string, schema, html: string, node: Node, customEncoders?) {
  it(`parses HTML: ${description}`, () => {
    const actual = parse(html, schema);
    expect(actual).to.deep.equal(node);
  });

  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema, customEncoders);
    expect(html).to.deep.equal(encoded);
  });

  it(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node, schema, customEncoders), schema);
    expect(roundTripped).to.deep.equal(node);
  });
};
