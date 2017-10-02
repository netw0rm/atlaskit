import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Action from '../../../../../src/renderer/react/marks/action';
import { EventHandlers } from '../../../../../src/ui/Renderer';

describe('Renderer - React/Marks/Action', () => {

  const createAction = (eventHandlers = {}) => mount(<Action target="test-target" eventHandlers={eventHandlers}>This is an action</Action>);

  it('should wrap content with <span>-tag', () => {
    const mark = createAction();
    expect(mark.find('span').length).to.equal(1);
    mark.unmount();
  });

  it('should pass target to event handler', (done) => {
    const eventHandlers: EventHandlers = {
      actionTarget: {
        onClick: (actionTarget) => {
          expect(actionTarget).to.deep.equal({
            target: 'test-target'
          });
          done();
        }
      }
    };
    const mark = createAction(eventHandlers);
    mark.find('span').simulate('click');
    mark.unmount();
  });

  it('should not throw if event handler is not defined', () => {
    const eventHandlers: EventHandlers = {
      actionTarget: {}
    };
    const mark = createAction(eventHandlers);
    expect(() => {
      mark.find('span').simulate('click');
    }).not.to.throw();
    mark.unmount();
  });
});
