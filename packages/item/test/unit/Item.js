import React from 'react';
import { shallow, mount } from 'enzyme';

import Item, { itemThemeNamespace } from '../../src';

import { name } from '../../package.json';
import { BeforeAfter, Content, Description } from '../../src/styled/ItemParts';

describe(`${name} - Item`, () => {
  describe('root element type', () => {
    describe('if href prop supplied', () => {
      test('should match props.linkComponent if supplied', () => {
        const MyLinkComponent = () => <span />;
        const wrapper = mount(<Item href="//atlassian.com" linkComponent={MyLinkComponent} />);
        expect(wrapper.getDOMNode().tagName).toBe('SPAN');
      });

      test('should be <a> if props.linkComponent not supplied', () => {
        const wrapper = mount(<Item href="//atlassian.com" />);
        expect(wrapper.getDOMNode().tagName).toBe('A');
      });

      test('should be <span> if props.linkComponent not supplied but props.isDisabled = true', () => {
        const wrapper = mount(<Item href="//atlassian.com" isDisabled />);
        expect(wrapper.getDOMNode().tagName).toBe('SPAN');
      });
    });

    describe('if href prop not supplied', () => {
      test('should be a <span>', () => {
        const wrapper = mount(<Item />);
        expect(wrapper.getDOMNode().tagName).toBe('SPAN');
      });
    });
  });

  describe('disabled state', () => {
    let clickSpy;
    let wrapper;

    beforeEach(() => {
      clickSpy = jest.fn();
      wrapper = mount(<Item onClick={clickSpy} />);
    });

    test('should cause onClick to not be fired when isDisabled true', () => {
      wrapper.setProps({ isDisabled: true });
      wrapper.simulate('click');
      expect(clickSpy).not.toHaveBeenCalled();
    });

    test('should allow onClick to be fired when isDisabled false', () => {
      wrapper.simulate('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('should prevent default onMouseDown event to avoid focus ring when clicked', () => {
    const wrapper = mount(<Item />);
    const preventDefault = jest.fn();
    wrapper.simulate('mousedown', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  describe('shouldAllowMultiline prop', () => {
    test('should be passed to the Content element', () => {
      const wrapper = mount(<Item />);
      expect(wrapper.find(Content).prop('allowMultiline')).toBe(false);
      wrapper.setProps({ shouldAllowMultiline: true });
      expect(wrapper.find(Content).prop('allowMultiline')).toBe(true);
    });
  });

  describe('optional layout props', () => {
    const testElem = <div className="testElem" />;
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Item />);
    });

    test('elemBefore should only be rendered if supplied', () => {
      expect(wrapper.find(BeforeAfter).length).toBe(0);
      wrapper.setProps({ elemBefore: testElem });
      expect(wrapper.find(BeforeAfter).length).toBe(1);
      expect(wrapper.find('.testElem').length).toBe(1);
    });

    test('description should only be rendered if supplied', () => {
      expect(wrapper.find(Description).length).toBe(0);
      wrapper.setProps({ description: 'Description text' });
      expect(wrapper.find(Description).length).toBe(1);
    });

    test('elemAfter should only be rendered if supplied', () => {
      expect(wrapper.find(BeforeAfter).length).toBe(0);
      wrapper.setProps({ elemAfter: testElem });
      expect(wrapper.find(BeforeAfter).length).toBe(1);
      expect(wrapper.find('.testElem').length).toBe(1);
    });
  });

  describe('accessibility', () => {
    let wrapper;
    let rootElem;

    beforeEach(() => {
      wrapper = mount(<Item />);
      rootElem = wrapper.at(0);
    });

    describe('role', () => {
      test('root element should have role="presentation"', () => {
        expect(rootElem.find('[role="presentation"]').length).toBe(1);
      });

      test('should accept role as an optional prop', () => {
        expect(rootElem.find('[role="menuitem"]').length).toBe(0);
        wrapper.setProps({ role: 'menuitem' });
        expect(rootElem.find('[role="menuitem"]').length).toBe(1);
      });
    });

    test('should set aria-disabled based on props.isDisabled', () => {
      const isDisabled = () => rootElem.find('[aria-disabled=true]').length === 1;
      expect(isDisabled()).toBe(false);
      wrapper.setProps({ isDisabled: true });
      expect(isDisabled()).toBe(true);
    });

    test('should set title prop on root element', () => {
      wrapper.setProps({ title: 'Item title' });
      expect(rootElem.prop('title')).toBe('Item title');
    });

    describe('tabIndex = 0', () => {
      const hasTabIndex = () => rootElem.find('[tabIndex=0]').length === 1;
      test('should be applied by default', () => {
        expect(hasTabIndex()).toBe(true);
      });
      test('should not be applied if props.isDisabled = true', () => {
        wrapper.setProps({ isDisabled: true });
        expect(hasTabIndex()).toBe(false);
      });
      test('should not be applied if props.isHidden = true', () => {
        wrapper.setProps({ isHidden: true });
        expect(hasTabIndex()).toBe(false);
      });
    });
  });

  describe('theme exports', () => {
    test('should export a named itemThemeNamespace string', () => {
      expect(itemThemeNamespace).toBe('@atlaskit-shared-theme/item');
    });
  });
});
