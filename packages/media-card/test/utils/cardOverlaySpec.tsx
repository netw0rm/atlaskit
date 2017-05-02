import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';
import { TitleWrapper, Metadata, ErrorMessage } from '../../src/utils/cardImageView/cardOverlay/styled';
import { Ellipsify } from '../../src/utils/';

describe('CardOverlay', () => {
  it('should not render the title or subtitle when the card has errored', function() {
    const errorMessage = 'Loading failed';
    const title = 'card is lyfe';
    const subtitle = 'do you even card?';
    const card = shallow(<CardOverlay error={errorMessage} mediaName={title} subtitle={subtitle} persistent={true} />);

    expect(card.find(ErrorMessage).childAt(0).text()).to.deep.equal(errorMessage);
    expect(card.find(TitleWrapper).find(Ellipsify).props().text).to.equal('');
    expect(card.find(Metadata)).to.have.length(0);
  });
});

