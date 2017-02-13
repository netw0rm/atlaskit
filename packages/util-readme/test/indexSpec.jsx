import { mount } from 'enzyme';
import Markdown from 'react-remarkable';
import React from 'react';

import Readme, { Code, Description, Heading } from '../src';

function test() {
  return mount(
    <Readme name="@scope/test" description="Test description.">
      Paragraph 1.

      Paragraph 2.
    </Readme>
  );
}

describe(name, () => {
  it('should display the name', () => {
    const wrap = test();
    expect(wrap.contains(<Heading>Test</Heading>)).to.equal(true, wrap.html());
  });

  it('should display the description', () => {
    const wrap = test();
    expect(wrap.contains(<Description>Test description.</Description>)).to.equal(true);
  });

  it('should display installation information', () => {
    const wrap = test();
    expect(wrap.contains(<Code language="bash">npm install @scope/test</Code>)).to.equal(true);
  });

  it('should parse markdown', () => {
    const wrap = test();
    // const html = wrap.html();
    expect(wrap.contains(
      <Markdown>
        Paragraph 1.

        Paragraph 2.
      </Markdown>
    )).to.equal(true);
    // expect(html).to.contain('<p>Paragraph 1.</p>');
    // expect(html).to.contain('<p>Paragraph 2.</p>');
  });
});
