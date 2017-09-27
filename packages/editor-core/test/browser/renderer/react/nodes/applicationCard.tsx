import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ApplicationCard from '../../../../../src/renderer/react/nodes/applicationCard';
import { AppCardView } from '@atlaskit/media-card';
import { EventHandlers } from '../../../../../src/ui/Renderer';
import * as sinon from 'sinon';

describe('Renderer - React/Nodes/ApplicationCard', () => {

  let applicationCard;
  let spyOnClick;
  let spyOnActionClick;

  beforeEach(() => {
    spyOnClick = sinon.spy();
    spyOnActionClick = sinon.spy();
    const eventHandlers: EventHandlers = {
      applicationCard: {
        onClick: spyOnClick,
        onActionClick: spyOnActionClick
      }
    };
    const attrs = {
      text: 'applicationCard',
      title: {
        text: 'applicationCard'
      },
      link: {
        url: 'link-url'
      }
    };
    applicationCard = shallow(
      <ApplicationCard
        eventHandlers={eventHandlers}
        {...attrs}
      />
    );
  });

  it('should wrap content with <AppCardView>-tag', () => {
    expect(applicationCard.find(AppCardView)).to.have.length(1);
  });

  it('should pass onActionClick to AppCardView', () => {
    expect(applicationCard.find(AppCardView).prop('onActionClick')).to.equal(spyOnActionClick);
  });

  it('should call onClick with link.url', () => {
    applicationCard.simulate('click');
    expect(spyOnClick.callCount).to.equal(1);
    expect(spyOnClick.calledWith('link-url')).to.equal(true);
  });

});
