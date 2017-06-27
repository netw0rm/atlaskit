// @flow
import React, { PureComponent } from 'react';
import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DimensionPublisher from '../../../src/view/dimension-publisher/dimension-publisher';
import type { Id, Dimension } from '../../../src/types';
import getDimension from '../get-dimension-util';

const itemId: Id = 'item-1';

class Item extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: {
    publish: Function,
    shouldPublish?: boolean,
  }

  state: {|
    ref: ?Element
  |}

  state = {
    ref: null,
  }

  setRef = (ref: ?Element) => {
    this.setState({
      ref,
    });
  }

  render() {
    return (
      <DimensionPublisher
        shouldPublish={this.props.shouldPublish}
        publish={this.props.publish}
        itemId={itemId}
        targetRef={this.state.ref}
        typeId="TYPE"
      >
        <div ref={this.setRef}>hi</div>
      </DimensionPublisher>
    );
  }
}

describe('DimensionPublisher', () => {
  afterEach(() => {
    // clean up any stubs
    if (Element.prototype.getBoundingClientRect.restore) {
      Element.prototype.getBoundingClientRect.restore();
    }
    if (window.getComputedStyle.restore) {
      window.getComputedStyle.restore();
    }
  });

  it('should not publish if not asked to', () => {
    const publish = sinon.stub();
    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: false,
    });

    expect(publish.called).to.equal(false);
  });

  it('should publish the dimensions of the target', () => {
    const publish = sinon.stub();
    const dimension: Dimension = getDimension({ id: itemId });

    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: dimension.withoutMargin.top,
      bottom: dimension.withoutMargin.bottom,
      left: dimension.withoutMargin.left,
      right: dimension.withoutMargin.right,
      height: dimension.withoutMargin.height,
      width: dimension.withoutMargin.width,
    });
    sinon.stub(window, 'getComputedStyle').returns({
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    });

    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: true,
    });

    expect(publish.calledWith(dimension)).to.equal(true);
  });

  it('should consider any margins when calculating dimensions', () => {
    const margin: number = 10;
    const publish = sinon.stub();
    const base: Dimension = getDimension({ id: itemId });
    const expected: Dimension = getDimension({ id: itemId, margin });
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: base.withoutMargin.top,
      bottom: base.withoutMargin.bottom,
      left: base.withoutMargin.left,
      right: base.withoutMargin.right,
      height: base.withoutMargin.height,
      width: base.withoutMargin.width,
    });
    sinon.stub(window, 'getComputedStyle').returns({
      marginTop: `${margin}`,
      marginRight: `${margin}`,
      marginBottom: `${margin}`,
      marginLeft: `${margin}`,
    });

    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: true,
    });

    expect(publish.args[0][0]).to.deep.equal(expected);
  });

  it('should not publish unless it is freshly required to do', () => {
    const publish = sinon.stub();
    const dimension: Dimension = getDimension({ id: itemId });
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: dimension.withMargin.top,
      bottom: dimension.withMargin.bottom,
      left: dimension.withMargin.left,
      right: dimension.withMargin.right,
      height: dimension.withMargin.height,
      width: dimension.withMargin.width,
    });

    // initial publish
    const wrapper = mount(<Item publish={publish} />);
    wrapper.setProps({
      shouldPublish: true,
    });
    expect(publish.calledOnce).to.equal(true);

    // should not publish if the props have not changed
    wrapper.update();
    expect(publish.calledOnce).to.equal(true);

    // should publish when freshly required to do so
    wrapper.setProps({
      shouldPublish: false,
      publish,
    });
    wrapper.setProps({
      shouldPublish: true,
      publish,
    });
    expect(publish.calledTwice).to.equal(true);
  });
});
