import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { CardView, CardContent, CardOverlay } from '../../src';
import { Title, Link } from '../../src/links/cardGenericView/styled';

describe('CardView', () => {
  it('should render an empty card with overlay when supplied with no props', function() {
    const card = shallow(<CardView />);
    expect(card.find(CardContent)).to.have.length(1);
    expect(card.find(CardOverlay)).to.have.length(1);
  });

  it('should render card with non-persisting overlay when supplied mediaType is "image" and dataUri string is supplied', function() {
    const card = shallow(<CardView mediaType="image" dataURI="data" />);
    expect(card.find(CardOverlay).props().persistent).to.deep.equal(false);
  });

  it('should render empty wrapper when error prop is true', function() {
    const card = shallow(<CardView error="Some random error occurred" />);
    expect(card.find('.wrapper').children()).to.have.length(0);
  });

  it('should render card overlay with the error prop true when supplied error prop is true', function() {
    const errorStr = 'Some random error occurred';
    const card = shallow(<CardView error={errorStr} />);
    expect(card.find(CardOverlay).props().error).to.deep.equal(errorStr);
  });

  it('should NOT render an overlay when loading prop is true', function() {
    const card = shallow(<CardView loading={true} />);
    expect(card.find(CardOverlay)).to.have.length(0);
  });

  it('should fire click event when card is clicked', function() {
    const mockEvent = {nativeEvent: 'nativeEvent'};
    const onClickSpy = sinon.spy();
    const card = mount(<CardView onClick={onClickSpy} />);

    card.simulate('click', mockEvent);
    expect(onClickSpy.calledOnce).to.equal(true);
    expect(onClickSpy.calledWithExactly(mockEvent.nativeEvent)).to.equal(true);
  });
});
