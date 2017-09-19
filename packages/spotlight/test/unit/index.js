import React from 'react';
// import { mount, shallow } from 'enzyme';
import ReactDOMServer from 'react-dom/server';

import { name } from '../../package.json';
import { Spotlight, SpotlightManager, SpotlightTarget } from '../../src';

function render(jsx) {
  return ReactDOMServer.renderToStaticMarkup(jsx);
}
function assertEqual(actual, expected) {
  expect(render(actual)).toBe(render(expected));
}

describe(name, () => {
  // eslint-disable-next-line jest/no-focused-tests
  describe.only('target', () => {
    it('should render its children only', () => {
      assertEqual(
        <SpotlightManager>
          <SpotlightTarget name="foo">
            <span>foo</span>
          </SpotlightTarget>
        </SpotlightManager>,
        // should equal
        <span>foo</span>
      );
    });
  });
  describe('spotlight', () => {
    it('should render content', () => {
      assertEqual(
        <SpotlightManager>
          <div>
            <SpotlightTarget name="qux">
              <span>qux</span>
            </SpotlightTarget>
            <Spotlight
              header={() => <span>foo</span>}
              footer={() => <span>baz</span>}
              target="qux"
            >
              <span>bar</span>
            </Spotlight>
          </div>
        </SpotlightManager>,
        // should equal
        <div>
          <span>foo</span>
          <span>bar</span>
          <span>baz</span>
        </div>
      );
    });
    it('should render SpotlightTarget in Spotlight', () => {
      assertEqual(
        <SpotlightManager>
          <div>
            <section>
              <Spotlight target="foo">
                <span>dialog</span>
              </Spotlight>
            </section>
            <SpotlightTarget name="foo">
              <span>target</span>
            </SpotlightTarget>
          </div>
        </SpotlightManager>,
        // should equal
        <div>
          <section>
            <span>dialog</span>
          </section>
          <span>target</span>
        </div>
      );
    });
  });
});
