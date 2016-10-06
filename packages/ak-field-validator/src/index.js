import 'style!./host.less';
import { prop } from 'skatejs';
import defineValidator from './index.define-validator';

const prefix = 'ak-field-validator-';

/**
 * @description Minimum length validator.
 * @class ValidatorMinlength
 * @example @js import ValidatorMinlength from 'ak-field-validator';
 * const myValidator = new ValidatorMinlength();
 * @example @js
 * <ak-field-validator-minlength minlength="5" slot="validator">
 *   Must have at least 5 characters
 * </ak-field-validator-minlength>
 */
const ValidatorMinlength = defineValidator(`${prefix}minlength`,
  (value, elem) => value.length >= elem.minlength,
  {
    /**
     * @description The minimum length of the value
     * @memberof ValidatorMinlength
     * @instance
     * @type {number}
     * @default 1
     */
    minlength: prop.number({
      attribute: true,
      default: 1,
    }),
  },
  (elem) => `Field should have at least ${elem.minlength} character${elem.minlength > 1 ? 's' : ''}`
);

/**
 * @description Maximum length validator.
 * @class ValidatorMaxlength
 * @example @js import ValidatorMaxlength from 'ak-field-validator';
 * const myValidator = new ValidatorMaxlength();
 * @example @js
 * <ak-field-validator-maxlength maxlength="10" slot="validator">
 *   Must have at most 10 characters
 * </ak-field-validator-maxlength>
 */
const ValidatorMaxlength = defineValidator(`${prefix}maxlength`,
  (value, elem) => value.length <= elem.maxlength,
  {
    /**
     * @description The maximum length of the value
     * @memberof ValidatorMaxlength
     * @instance
     * @type {number}
     * @default 10
     */
    maxlength: prop.number({
      attribute: true,
      default: 10,
    }),
  },
  (elem) => `Field should have at most ${elem.maxlength} character${elem.maxlength > 1 ? 's' : ''}`
);

/**
 * @description Required validator.
 * @class ValidatorRequired
 * @example @js import ValidatorRequired from 'ak-field-validator';
 * const myValidator = new ValidatorRequired();
 * @example @js
 * <ak-field-validator-required slot="validator">
 *   This field is required
 * </ak-field-validator-required>
 */
const ValidatorRequired = defineValidator(`${prefix}required`,
  (value) => !!value,
  {},
  () => 'Field is required'
);

export {
  defineValidator,
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
};
