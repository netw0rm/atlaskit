import { shallow, mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Logo, { logoColoursThemeKey } from '../../src/components/LogoBase';
import Size from '../../src/styled/Size';

describe('<Logo />', () => {
  describe('props', () => {
    it('should render an svg', () => {
      const wrapper = mount(<Logo><svg /></Logo>);
      expect(wrapper.find('svg')).toHaveLength(1);
    });

    describe('collapseTo prop', () => {
      it('should not collapse by default', () => {
        const wrapper = shallow(<Logo><svg /></Logo>);
        expect(wrapper.props().collapseTo).toBe(undefined);
      });

      it('should pass collapseTo to the Size component', () => {
        const wrapper = shallow(
          <Logo collapseTo="type">
            <svg />
          </Logo>
        );
        expect(wrapper.find(Size).prop('collapseTo')).toBe('type');
      });
    });

    describe('size prop', () => {
      it('should be medium by default', () => {
        const wrapper = shallow(<Logo><svg /></Logo>);
        expect(wrapper.find(Size).props().size).toBe('medium');
      });

      it('should pass size to the Size component', () => {
        const wrapper = shallow(<Logo size="large"><svg /></Logo>);
        expect(wrapper.find(Size).prop('size')).toBe('large');
      });
    });

    describe('color props', () => {
      it('should be passed to child component via namespaced theme', () => {
        const wrapper = shallow(
          <Logo
            textColor="red"
            iconColor="blue"
            iconGradientStart="purple"
            iconGradientStop="green"
          >
            <svg />
          </Logo>
        );
        expect(wrapper.find(ThemeProvider).prop('theme')).toEqual({
          [logoColoursThemeKey]: {
            textColor: 'red',
            iconColor: 'blue',
            iconGradientStart: 'purple',
            iconGradientStop: 'green',
          },
        });
      });
    });
  });
});
