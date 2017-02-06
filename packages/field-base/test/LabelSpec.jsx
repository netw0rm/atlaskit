import React from 'react';
import { shallow, mount } from 'enzyme';
import Label from '../src/Label';
import styles from '../src/styles.less';

const defaultProps = {
  label: 'test',
  isLabelHidden: true,
};

describe('ak-field-base', () =>
  describe('Label', () => {
    describe('by default', () =>
      it('should render a label element', () =>
        expect(shallow(<Label {...defaultProps} />).find('label').length).to.be.above(0)
      )
    );

    describe('label prop', () => {
      it('should be reflected in the label element', () => {
        const label = 'This is a label';
        const wrapper = shallow(<Label label={label} />);
        expect(wrapper.find('label').text()).to.equal(label);
      });
    });

    describe('hideLabel prop', () => {
      it('should be reflected in the label element', () => {
        const label = 'This is a label';
        const wrapper = shallow(<Label label={label} isLabelHidden />);
        expect(wrapper.find(`.${styles.locals.labelText}`).hasClass(styles.locals.hidden)).to.equal(true);
      });
    });

    describe('required prop', () => {
      it('should append an asterisk to the content', () =>
        expect(shallow(<Label {...defaultProps} isRequired />).find(`.${styles.locals.required}`).text()).to.equal('*')
      );

      it('should not append an asterisk to the content if required is not set', () => {
        expect(shallow(<Label {...defaultProps} />).find(`.${styles.locals.required}`).length).to.equal(0);
        expect(shallow(<Label {...defaultProps} />).text()).to.equal('test');
      });
    });

    describe('type prop', () => {
      it('should by "form" type by default', () => {
        expect(mount(<Label />).prop('type')).to.equal('form');
      });

      it('should set className for it', () => {
        expect(mount(<Label />).find(`.${styles.locals.inlineEdit}`).length).to.equal(0);
        expect(mount(<Label type="inline-edit" />).find(`.${styles.locals.inlineEdit}`).length).to.equal(1);
      });
    });

    describe('isFirstChild prop', () => {
      it('should set className for it', () => {
        expect(mount(<Label />).find(`.${styles.locals.firstChild}`).length).to.equal(0);
        expect(mount(<Label isFirstChild />).find(`.${styles.locals.firstChild}`).length).to.equal(1);
      });
    });

    describe('onClick prop', () =>
      it('should fire handler when the span is clicked', () => {
        const handler = sinon.spy();
        const wrapper = shallow(<Label {...defaultProps} onClick={handler} />);
        wrapper.find('span').simulate('click');
        expect(handler.callCount).to.equal(1);
      })
    );

    describe('.children', () =>
      it('should render any children passed to it', () => {
        const wrapper = shallow(
          <Label {...defaultProps} >
            <div className="foo">Here is some child content!</div>
          </Label>
        );
        expect(wrapper.find('div.foo')).to.not.equal(undefined);
      })
    );
  })
);
