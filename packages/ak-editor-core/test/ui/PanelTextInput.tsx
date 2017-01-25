import * as chai from 'chai';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import PanelTextInput from '../../src/ui/PanelTextInput';

chai.use(sinonChai);

describe('ak-editor-core/ui/PanelTextInput', () => {
  it('should call onSubmit when ENTER key is pressed', () => {
    const onSubmitHandler = sinon.stub();
    const panel = mount(<PanelTextInput onSubmit={onSubmitHandler} />);

    const input = panel.find('input');
    (input.get(0) as any).value = 'http://atlassian.com';
    input.simulate('keydown', { which: 'enter', keyCode: 13 });

    expect(onSubmitHandler).to.have.been.calledWith('http://atlassian.com');
  });

  it('should prevent KeyDown event if ENTER key is pressed', () => {
    const onSubmitHandler = sinon.stub();
    const preventDefault = sinon.stub();
    const panel = mount(<PanelTextInput onSubmit={onSubmitHandler} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'enter', keyCode: 13, preventDefault });

    expect(preventDefault, 'component didn`t call preventDefault').to.be.calledOnce;
  });

  it('should not prevent KeyDown event if any other key is pressed', () => {
    const preventDefault = sinon.stub();
    const panel = mount(<PanelTextInput onSubmit={() => {}}/>);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'a', keyCode: 65, preventDefault });

    expect(preventDefault).to.be.not.called;
  });

  it('should call onCancel when ESC key is pressed', () => {
    const onCancelHandler = sinon.stub();
    const panel = mount(<PanelTextInput onCancel={onCancelHandler} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'esc', keyCode: 27 });

    expect(onCancelHandler).to.have.been.called;
  });
});
