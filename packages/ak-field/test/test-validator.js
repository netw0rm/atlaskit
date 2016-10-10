import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { waitUntil } from 'akutil-common-test';
import {
  setupComponent,
  tearDownComponent,
  generateAkField,
  hasErrorIcon,
  hasSuccessIcon,
  getInputField,
} from './_helpers';

import { ValidatorMinlength } from 'ak-field-validator';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('ak-field', () => {
  let akField;

  describe('with validator', () => {
    beforeEach(() => setupComponent(
      generateAkField({
        validators: [{
          constructor: ValidatorMinlength,
          props: {
            minlength: 5,
          },
        }],
      })
    ).then(component => (akField = component)));
    afterEach(() => (tearDownComponent(akField)));

    describe('with no value entered', () => {
      beforeEach(() => (akField.validate()));

      it('should not show an icon', () => {
        const noIcon = () => (!hasErrorIcon(akField) && !hasSuccessIcon(akField));
        return waitUntil(noIcon).should.be.fulfilled;
      });
    });

    describe('with a valid value entered', () => {
      beforeEach(() => {
        getInputField(akField).value = '12345';
        akField.validate();
      });

      it('should show the success icon only', () => {
        const successIcon = () => (!hasErrorIcon(akField) && hasSuccessIcon(akField));
        return waitUntil(successIcon).should.be.fulfilled;
      });
    });

    describe('with an invalid value entered', () => {
      beforeEach(() => {
        getInputField(akField).value = '123';
        akField.validate();
      });

      it('should show the error icon only', () => {
        const errorIcon = () => hasErrorIcon(akField) && !hasSuccessIcon(akField);
        return waitUntil(errorIcon).should.be.fulfilled;
      });
    });
  });
});
