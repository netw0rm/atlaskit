// @flow
import React, { PureComponent } from 'react';
import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DimensionPublisher from '../../../src/view/dimension-publisher/dimension-publisher';
import type { Id, Dimension } from '../../../src/types';

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

const getDimension = ({
  id = itemId,
  top = 0,
  bottom = 100,
  left = 0,
  right = 100,
  margin = 0,
}: Object = {}): Dimension => {
  const dimension: Dimension = (() => {
    const height = (top + margin) + (bottom + margin);
    const width = (left + margin) + (right + margin);
    return {
      id,
      top: top + margin,
      bottom: bottom + margin,
      left: left + margin,
      right: right + margin,
      center: {
        x: width / 2,
        y: height / 2,
      },
      height,
      width,
    };
  })();

  return dimension;
};

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
    const dimension: Dimension = getDimension();

    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: dimension.top,
      bottom: dimension.bottom,
      left: dimension.left,
      right: dimension.right,
      height: dimension.height,
      width: dimension.width,
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
    const base: Dimension = getDimension();
    const expected: Dimension = getDimension({ margin });
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: base.top,
      bottom: base.bottom,
      left: base.left,
      right: base.right,
      height: base.height,
      width: base.width,
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

    expect(publish.calledWith(expected)).to.equal(true);
  });
});
