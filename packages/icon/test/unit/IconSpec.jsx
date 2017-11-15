import React, { PureComponent } from 'react';
import { mount } from 'enzyme';

import { colors } from '../../../theme/src';
import { name } from '../../package.json';
import Icon, { size } from '../../src';
import { spanStyles } from '../../src/components/Icon';

const sizeValues = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

describe(name, () => {
  describe('Icon', () => {
    const secretContent = 'secret content';
    const secretWrapper = () => (<div>{secretContent}</div>);
    const empty = () => (<div>Icon</div>);

    const MyIcon = props => <Icon glyph={secretWrapper} {...props} />;

    describe('glyph prop', () => {
      const id = 'customSvg';
      const customGlyphJsx = () => <svg id={id} />;
      const wrapper = mount(<Icon glyph={customGlyphJsx} label="" />);

      it('should render an SVG provided via JSX', () => {
        expect(wrapper.html().includes(`<svg id="${id}"`)).toBe(true);
      });
    });

    describe('dangerouslySetGlyph prop', () => {
      const id = 'customSvg';
      const customGlyphString = `<svg id=${id}></svg>`;
      const wrapper = mount(<Icon dangerouslySetGlyph={customGlyphString} label="" />);

      it('should render an SVG provided as a string', () => {
        expect(wrapper.html().includes(`<svg id="${id}"`)).toBe(true);
      });
    });

    describe('exports', () => {
      it('exports the React component, and size', () => {
        expect(Icon).not.toBe(undefined);
        expect(size).not.toBe(undefined);

        expect(new Icon({ label: 'My icon' })).toBeInstanceOf(PureComponent);
        expect(Object.values(size)).toEqual(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('should be possible to create an Icon via a subclass', () => {
      const wrapper = mount(<MyIcon label="My icon" />);
      expect(wrapper.find('span').is('[aria-label="My icon"]')).toBe(true);
    });

    describe('label property', () => {
      it('is accessed by glyph', () => {
        /* eslint-disable react/prop-types */
        const LabelWriter = props => <div>{props.label}</div>;
        /* eslint-enable react/prop-types */
        const LabelIcon = props => <Icon glyph={LabelWriter} {...props} />;

        const labelContent = 'label content';
        const wrapper = mount(<LabelIcon label={labelContent} />);
        expect(wrapper.find('span').is(`[aria-label="${labelContent}"]`)).toBe(true);
      });
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        const span = mount(<Icon glyph={empty} label="My icon" size={s} />);
        const iconSize = spanStyles[1](span.props());

        it(`with value ${s}`, () => {
          expect(iconSize.includes(sizeValues[s])).toBe(true);
        });
      });
    });

    describe('primaryColor property', () => {
      it('is set to inherit the text color by default', () => {
        const span = mount(<MyIcon label="default primaryColor" />);
        const color = spanStyles[3](span.props());
        expect(color).toBe('currentColor');
      });
      it('can be changed to a hex value', () => {
        const primaryColor = '#ff0000';
        const span = mount(<MyIcon label="hex primaryColor" primaryColor={primaryColor} />);
        const color = spanStyles[3](span.props());

        expect(color).toBe(primaryColor);
      });
      it('can be changed to a named color', () => {
        const primaryColor = 'rebeccapurple';
        const span = mount(<MyIcon label="hex primaryColor" primaryColor={primaryColor} />);
        const color = spanStyles[3](span.props());

        expect(color).toBe(primaryColor);
      });
    });

    describe('secondaryColor property', () => {
      it('is set to the default theme background color by default', () => {
        const span = mount(<MyIcon label="default secondaryColor" />);
        const props = span.props();
        const fill = spanStyles[5](props)(props);

        expect(fill).toBe(colors.background(props));
      });
      it('can be changed to a hex value', () => {
        const secondaryColor = '#ff0000';
        const span = mount(<MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />);
        const fill = spanStyles[5](span.props());

        expect(fill).toBe(secondaryColor);
      });
      it('can be changed to a named color', () => {
        const secondaryColor = 'rebeccapurple';
        const span = mount(<MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />);
        const fill = spanStyles[5](span.props());

        expect(fill).toBe(secondaryColor);
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        const handler = jest.fn().mockImplementation(() => {}); // eslint-disable-line no-undef

        const wrapper = mount(<Icon glyph={empty} label="My icon" onClick={handler} />);
        expect(wrapper.prop('onClick')).toBe(handler);

        wrapper.find('span').simulate('click');
        expect(handler.mock.calls.length).toBe(1);
      });
    });
  });
});
