import { akColorB100 } from '@atlaskit/util-shared-styles';

export default function () {
  return `
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 2px ${akColorB100};
    }
  `;
}
