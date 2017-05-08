import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mount } from 'enzyme';

import { FileCardView } from '../../src/files';
import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';

describe('FileCardView', () => {

  it('should render card with non-persisting overlay when supplied mediaType is "image" and dataUri string is supplied', function() {
    const card = mount(<FileCardView mediaType="image" dataURI="data" status="complete"/>);
    expect(card.find(CardOverlay).props().persistent).to.deep.equal(false);
  });

  it('should render empty wrapper when error prop is true', function() {
    const card = mount(<FileCardView error="Some random error occurred" status="error" />);
    expect(card.find('.wrapper').children()).to.have.length(0);
  });

  it('should render card overlay with the error prop true when supplied error prop is true', function() {
    const errorStr = 'Some random error occurred';
    const card = mount(<FileCardView error={errorStr} status="error" />);
    expect(card.find(CardOverlay).props().error).to.deep.equal(errorStr);
  });

  it('should NOT render an overlay when loading prop is true', function() {
    const card = mount(<FileCardView status="loading" />);
    expect(card.find(CardOverlay)).to.have.length(0);
  });

  it('should fire click event when card is clicked', function() {
    const mockEvent = {nativeEvent: 'nativeEvent'};
    const onClickSpy = sinon.spy();
    const card = mount(<FileCardView onClick={onClickSpy} status="complete"/>);

    card.simulate('click', mockEvent);
    expect(onClickSpy.calledOnce).to.equal(true);
    expect(onClickSpy.calledWithExactly(mockEvent.nativeEvent)).to.equal(true);
  });
});
