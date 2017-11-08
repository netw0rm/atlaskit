import React, { PureComponent } from 'react';
import { mount } from 'enzyme';

import { colors } from '../../../theme/src';
import { name } from '../../package.json';
import Icon, { size } from '../../src';
import { Span, spanStyles } from '../../src/components/Icon';

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

    describe('exports', () => {
      it('exports the React component, and size', () => {
        expect(Icon).not.toBe(undefined);
        expect(size).not.toBe(undefined);

        expect(new Icon({ label: 'My icon' })).toBeInstanceOf(PureComponent);
        expect(Object.values(size)).toEqual(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('should be possible to create an Icon via a subclass', () => {
      const myIcon = mount(<MyIcon label="My icon" />);
      expect(myIcon.text()).toBe(secretContent);
    });

    describe('label property', () => {
      it('is accessed by glyph', () => {
        /* eslint-disable react/prop-types */
        const LabelWriter = props => <div>{props.label}</div>;
        /* eslint-enable react/prop-types */
        const LabelIcon = props => <Icon glyph={LabelWriter} {...props} />;

        const labelContent = 'label content';
        const wrapper = mount(<LabelIcon label={labelContent} />);
        expect(wrapper.text()).toBe(labelContent);
      });
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        const span = mount(<Icon glyph={empty} label="My icon" size={s} />).find(Span);
        const iconSize = spanStyles[5](span.props());

        it(`with value ${s}`, () => {
          expect(iconSize).toBe(sizeValues[s]);
          expect(iconSize).toBe(sizeValues[s]);
        });
      });
    });

    describe('primaryColor property', () => {
      it('is set to inherit the text color by default', () => {
        const span = mount(<MyIcon label="default primaryColor" />).find(Span);
        const color = spanStyles[1](span.props());

        expect(color).toBe('currentColor');
      });
      it('can be changed to a hex value', () => {
        const primaryColor = '#ff0000';
        const span = mount(<MyIcon label="hex primaryColor" primaryColor={primaryColor} />).find(Span);
        const color = spanStyles[1](span.props());

        expect(color).toBe(primaryColor);
      });
      it('can be changed to a named color', () => {
        const primaryColor = 'rebeccapurple';
        const span = mount(<MyIcon label="hex primaryColor" primaryColor={primaryColor} />).find(Span);
        const color = spanStyles[1](span.props());

        expect(color).toBe(primaryColor);
      });
    });

    describe('secondaryColor property', () => {
      it('is set to the default theme background color by default', () => {
        const span = mount(<MyIcon label="default secondaryColor" />).find(Span);
        const props = span.props();
        const fill = spanStyles[3](props)(props);

        expect(fill).toBe(colors.background(props));
      });
      it('can be changed to a hex value', () => {
        const secondaryColor = '#ff0000';
        const span = mount(<MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />).find(Span);
        const fill = spanStyles[3](span.props());

        expect(fill).toBe(secondaryColor);
      });
      it('can be changed to a named color', () => {
        const secondaryColor = 'rebeccapurple';
        const span = mount(<MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />).find(Span);
        const fill = spanStyles[3](span.props());

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

    describe('glyphs', () => {
      // eslint-disable-next-line react/prop-types
      const glyph = (props) => (<div>{props.id}</div>);

      it('should be passed an ID prop that is unique between icons', () => {
        const icon = mount(<Icon glyph={glyph} label="My icon" />);
        const uidLength = 7;

        const id = icon.find(glyph).prop('id');
        expect(typeof id).toBe('string');
        expect(id.length).toBe(uidLength);

        const otherIcon = mount(<Icon glyph={glyph} label="My icon" />);
        const otherId = otherIcon.find(glyph).prop('id');
        expect(otherId).not.toBe(id);
      });
    });
  });
});
