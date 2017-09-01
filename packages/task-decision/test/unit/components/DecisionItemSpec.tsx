import * as React from 'react';
import { mount } from 'enzyme';
import DecisionItem from '../../../src/components/DecisionItem';
import Participants from '../../../src/components/Participants';
import { ContentWrapper } from '../../../src/styled/Item';
import { Placeholder } from '../../../src/styled/Placeholder';
import { getParticipants } from '../../../src/support/test-data';

describe('<DecisionItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <DecisionItem>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(component.find(ContentWrapper).text()).toBe('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <DecisionItem contentRef={handleContentRef}>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(contentRef).not.toBe(undefined);
    expect(contentRef!.textContent).toBe('Hello world');
  });

  describe('showPlaceholder', () => {
    it('shoud render placeholder if decision is empty', () => {
      const component = mount(<DecisionItem showPlaceholder={true} />);
      expect(component.find(Placeholder).length).toEqual(1);
    });

    it('should not render placeholder deciision is not empy', () => {
      const component = mount(
        <DecisionItem showPlaceholder={true}>Hello <b>world</b></DecisionItem>
      );
      expect(component.find(Placeholder).length).toEqual(0);
    });
  });

  describe('participants', () => {
    const participants = getParticipants(2);

    it('participants not used for inline style item', () => {
      const component = mount(<DecisionItem appearance="inline" participants={participants} />);
      expect(component.find(Participants).length).toEqual(0);
    });

    it('participants used for card style item', () => {
      const component = mount(<DecisionItem appearance="card" participants={participants} />);
      const participantsComponents = component.find(Participants);
      expect(participantsComponents.length).toEqual(1);
      expect(participantsComponents.at(0).prop('participants')).toEqual(participants);
    });
  });
});
