import React from 'react';
import { mount } from 'enzyme';
import { colors } from '@atlaskit/theme';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';

import Checkbox, { CheckboxStateless, CheckboxGroup } from '../../src';
import { HiddenCheckbox } from '../../src/styled/Checkbox';
import { name } from '../../package.json';

describe(name, () => {
  // Helper function to generate <Flag /> with base props
  describe('<CheckboxStateless />', () => {
    it('should be unchecked by default', () => {
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={() => {}}
        value="stub value"
      />);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.N30);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N30);
    });
    it('should have correct checked styles', () => {
      const cb = mount(<CheckboxStateless
        isChecked
        onChange={() => {}}
        value="stub value"
      />);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.B400);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N0);
    });
    it('should be correctly styled disabled', () => {
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={() => {}}
        value="stub value"
        isDisabled
      />);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.N30);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N30);
    });
    it('should be correctly styled when hovered', () => {
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={() => {}}
        value="stub value"
      />);
      cb.simulate('mouseenter');
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.N50);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N50);
    });
    it('should be correctly styled when hovered and checked', () => {
      const cb = mount(<CheckboxStateless
        isChecked
        onChange={() => {}}
        value="stub value"
      />);
      cb.simulate('mouseenter');
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.B300);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N0);
    });
    it('should be base state if mouseenter then mouseleave', () => {
      const cb = mount(<CheckboxStateless
        isChecked
        onChange={() => {}}
        value="stub value"
      />);
      cb.simulate('mouseenter');
      cb.simulate('mouseleave');
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.B400);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N0);
    });
    it('should be active if mousedown and checked', () => {
      const cb = mount(<CheckboxStateless
        isChecked
        onChange={() => {}}
        value="stub value"
      />);
      cb.simulate('mousedown');
      expect(cb.state('isActive')).toBe(true);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.B400);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.B50);
    });
    it('should be active if mousedown and unchecked', () => {
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={() => {}}
        value="stub value"
      />);
      cb.simulate('mousedown');
      expect(cb.state('isActive')).toBe(true);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.B400);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.B50);
    });
    it('should not be active if mousedown and disabled', () => {
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={() => {}}
        value="stub value"
        isDisabled
      />);
      cb.simulate('mousedown');
      expect(cb.state('isActive')).toBe(true);
      expect(cb.find(CheckboxIcon).prop('primaryColor')).toBe(colors.N30);
      expect(cb.find(CheckboxIcon).prop('secondaryColor')).toBe(colors.N30);
    });
    it('should call onchange on change', () => {
      const myMock = jest.fn();
      const cb = mount(<CheckboxStateless
        isChecked={false}
        onChange={myMock}
        value="stub value"
      />);
      cb.find(HiddenCheckbox).simulate('change', { target: { checked: true } });
      expect(cb.prop('isChecked')).toBe(false);
      expect(myMock.mock.calls.length).toBe(1);
    });
  });
  describe('<Checkbox />', () => {
    it('should render initiallyChecked', () => {
      const cb = mount(<Checkbox value="stub value" initiallyChecked />);
      expect(cb.find(CheckboxStateless).prop('isChecked')).toBe(true);
    });
    it('should render initiallyChecked={false}', () => {
      const cb = mount(<Checkbox value="stub value" />);
      expect(cb.find(CheckboxStateless).prop('isChecked')).toBe(false);
    });
  });
  describe('<CheckboxGroup />', () => {
    it('sanity check for CheckboxGroup', () => {
      const cb = mount(<CheckboxGroup>
        <Checkbox value="stub value" />
        <Checkbox value="stub value2" />
        <Checkbox value="stub value3" />
        <Checkbox value="stub value4" />
      </CheckboxGroup>);
      expect(cb.find(Checkbox).length).toBe(4);
    });
  });
});
