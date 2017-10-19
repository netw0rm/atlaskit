import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Action from '../../../../../src/renderer/react/nodes/action';
import * as sinon from 'sinon';

describe('Renderer - React/Nodes/Action', () => {

  const spyOnClick = sinon.spy();
  const props = {
    eventHandlers: {
      actionGroup: {
        onClick: spyOnClick
      }
    },
    localId: 'test',
    text: 'some text',
    target: {
      app: 'app',
      key: 'key'
    },
    parameters: {
      test: 100
    }
  };

  it('should wrap content with <button>-tag', () => {
    const listItem = mount(<Action {...props}/>);
    expect(listItem.find('button').exists()).to.equal(true);
  });

  it('should render text', () => {
    const listItem = mount(<Action {...props}/>);
    expect(listItem.text()).to.equal('some text');
  });

  it('should call actionGroup event handler on click', () => {
    const listItem = mount(<Action {...props}/>);
    listItem.simulate('click');
    expect(spyOnClick.calledWith({
      target: props.target,
      parameters: props.parameters,
      text: props.text
    })).to.equal(true);
  });
});
