import { shallow } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import * as styles from '../../src/components/Mention/styles';
import Mention from '../../src/components/Mention';

const mentionData = {
  id: 'ABCD-ABCD-ABCD',
  text: '@Oscar Wallhult'
};

describe('<Mention />', () => {
  it('should render based on mention data', () => {
    const mention = shallow(<Mention {...mentionData} />);
    expect(mention.text()).to.equal(mentionData.text);
  });

  it('should add a highlight class if `isHighlighted` is set to true', () => {
    const mention = shallow(<Mention {...mentionData} isHighlighted={true} />);
    expect(mention.hasClass(styles.highlighted)).to.equal(true);
  });
});
