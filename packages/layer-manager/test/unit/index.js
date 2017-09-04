import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Gateway, GatewayDest, GatewayProvider } from '../../src';
import { name } from '../../package.json';

function render(jsx) {
  return ReactDOMServer.renderToStaticMarkup(jsx);
}
function assertEqual(actual, expected) {
  expect(render(actual)).toBe(render(expected));
}

describe(name, () => {
  it('should render Gateway in GatewayDest', () => {
    assertEqual(
      <GatewayProvider>
        <div>
          <section>
            <Gateway into="foo">
              <span>Hello World</span>
            </Gateway>
          </section>
          <GatewayDest name="foo" />
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <section />
        <div>
          <span>Hello World</span>
        </div>
      </div>
    );
  });
  it('should be able to customize the GatewayDest element', () => {
    assertEqual(
      <GatewayProvider>
        <GatewayDest component="section" className="elf" id="striped" name="foo" />
      </GatewayProvider>,
      // should equal
      <section className="elf" id="striped" />
    );
  });
  it('should be able to customize the GatewayDest with custom components', () => {
    // eslint-disable-next-line react/prop-types
    const Child = ({ children, id }) => <h1 id={id}>{children}</h1>;

    assertEqual(
      <GatewayProvider>
        <GatewayDest component={Child} id="test" name="foo" />
      </GatewayProvider>,
      // should equal
      <Child id="test" />
    );
  });
  it('should render into the correct GatewayDest', () => {
    assertEqual(
      <GatewayProvider>
        <div>
          <Gateway into="foo"><span>One</span></Gateway>
          <Gateway into="bar"><span>Two</span></Gateway>
          <GatewayDest name="bar" />
          <GatewayDest name="foo" />
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <div><span>Two</span></div>
        <div><span>One</span></div>
      </div>
    );
  });
  it('should render multiple children into a single GatewayDest', () => {
    assertEqual(
      <GatewayProvider>
        <div>
          <section>
            <Gateway into="foo">
              <div>One</div>
            </Gateway>
            <div>
              <Gateway into="foo">
                <div>Two</div>
              </Gateway>
            </div>
            <Gateway into="foo">
              <div>Three</div>
            </Gateway>
          </section>
          <GatewayDest name="foo" />
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <section>
          <div />
        </section>
        <div>
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </div>
      </div>
    );
  });
});
