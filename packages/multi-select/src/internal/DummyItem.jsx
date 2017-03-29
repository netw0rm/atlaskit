import { PureComponent, PropTypes } from 'react';

/** ************************************************************************************************
  This file exists so that we have a component we can pass the @atlaskit/readme Props component
  We reuse the definition to define the itemShape in StatelessMultiSelect as well
**************************************************************************************************/

export default class DummyItem extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    description: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line react/no-unused-prop-types, max-len
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    elemBefore: PropTypes.node,
    tagElemBefore: PropTypes.node, // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }
}
