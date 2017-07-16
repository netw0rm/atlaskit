import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { CardOverlay } from '../../../src/utils/cardImageView/cardOverlay';
import { TitleWrapper, Metadata, ErrorMessage } from '../../../src/utils/cardImageView/cardOverlay/styled';
import { Ellipsify } from '../../../src/utils/';
import { CardActions } from '../../../src/utils/cardActions';

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

  it('should pass theme=light to CardActions component when overlay is NOT persistent', () => {
    const card = shallow(<CardOverlay persistent={false} />);
    expect(card.find(CardActions).props().theme).to.deep.equal('light');
  });

  it('should pass theme=dark to CardActions component when overlay is persistent', () => {
    const card = shallow(<CardOverlay persistent={true} />);
    expect(card.find(CardActions).props().theme).to.deep.equal('dark');
  });
});

