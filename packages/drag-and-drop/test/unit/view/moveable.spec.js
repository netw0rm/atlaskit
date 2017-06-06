// @flow
import React from 'react';
import { describe, it, before, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Moveable from '../../../src/view/moveable/';
import type { Position } from '../../../src/types';
// eslint-disable-next-line no-duplicate-imports
import type { Speed } from '../../../src/view/moveable/';

const Child = () => <div>hi there</div>;

describe.only('Moveable', () => {
  let clock;
  let wrapper;

  before(() => {
    requestAnimationFrame.reset();
  });

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    wrapper = mount(
      <Moveable
        speed="STANDARD"
      >
        <Child />
      </Moveable>
    );
  });

  afterEach(() => {
    clock.restore();
  });

  const moveTo = (point: Position, speed?: Speed = 'STANDARD', onMoveEnd?: () => void) => {
    wrapper.setProps({
      destination: point,
      onMoveEnd,
      speed,
    });

      // flush the animation
    requestAnimationFrame.flush();

      // callback is called on the next tick after
      // the animation is finished.
    clock.tick();
  };

  const hasMoved = (point: Position) =>
    wrapper.find('div').first().props().style.transform ===
    `translate(${point.x}px, ${point.y}px)`;

  it('should move to the provided destination', () => {
    const destination: Position = {
      x: 100,
      y: 200,
    };

    moveTo(destination);

    expect(hasMoved(destination)).to.equal(true);
  });

  it('should call onMoveEnd when the movement is finished', () => {
    const stub = sinon.stub();
    const destination: Position = {
      x: 100,
      y: 200,
    };

    moveTo(destination, 'STANDARD', stub);

    expect(stub.called).to.equal(true);
  });

  it('should move instantly if required', () => {
    const stub = sinon.stub();
    const destination: Position = {
      x: 100,
      y: 200,
    };

    // Only releasing one frame
    // ReactMotion uses this to trigger the initial animation
    requestAnimationFrame.step();

    wrapper.setProps({
      speed: 'INSTANT',
      destination,
      onMoveEnd: stub,
    });

    // Only releasing one frame
    requestAnimationFrame.flush();

    // onMoveEnd fired after a tick
    clock.tick();

    expect(hasMoved(destination)).to.equal(true);
    expect(stub.called).to.equal(true);
  });

  it('should allow multiple movements', () => {
    const positions: Array<Position> = [
      { x: 100, y: 100 },
      { x: 400, y: 200 },
      { x: 10, y: -20 },
    ];

    positions.forEach((position: Position) => {
      moveTo(position);
      expect(hasMoved(position)).to.equal(true);
    });
  });

  it('should allow you to provide extra styles to the component', () => {
    const style = {
      color: 'red',
    };

    const customWrapper = mount(
      <Moveable
        speed="STANDARD"
        style={style}
      >
        <Child />
      </Moveable>
    );

    expect(customWrapper.find('div').first().props().style.color)
      .to.equal('red');
  });
});
