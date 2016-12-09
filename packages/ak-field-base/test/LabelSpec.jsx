import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Label from '../src/Label';
import styles from '../src/styles.less';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('ak-field-base', () =>
  describe('Label', () => {
    describe('by default', () =>
      it('should render a label element', () =>
        expect(shallow(<Label />)).to.have.descendants('label')
      )
    );

    describe('label prop', () => {
      it('should be reflected in the label element', () => {
        const label = 'This is a label';
        const wrapper = shallow(<Label label={label} />);
        expect(wrapper.find('label')).to.have.text(label);
      });
    });

    describe('hideLabel prop', () => {
      it('should be reflected in the label element', () => {
        const label = 'This is a label';
        const wrapper = shallow(<Label label={label} isLabelHidden />);
        expect(wrapper.find(`.${styles.locals.labelText}`))
          .to.have.className(styles.locals.hidden);
      });
    });

    describe('required prop', () => {
      it('should append an asterisk to the content', () =>
        expect(shallow(<Label isRequired />).find(`.${styles.locals.required}`)).to.have.text('*')
      );

      it('should not append an asterisk to the content if required is not set', () => {
        expect(shallow(<Label />)).to.not.have.descendants(`.${styles.locals.required}`);
        expect(shallow(<Label />)).to.not.have.text('*');
      });
    });

    describe('onLabelClick prop', () =>
      it('should fire handler when the span is clicked', () => {
        const handler = sinon.spy();
        const wrapper = shallow(<Label onLabelClick={handler} />);
        wrapper.find('span').simulate('click');
        expect(handler).to.have.been.calledOnce;
      })
    );

    describe('.children', () =>
      it('should render any children passed to it', () => {
        const wrapper = shallow(
          <Label>
            <div className="foo">Here is some child content!</div>
          </Label>
        );
        expect(wrapper.find('div.foo')).to.be.present;
      })
    );
  })
);
