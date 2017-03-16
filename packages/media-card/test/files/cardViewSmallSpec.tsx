import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import { CardViewSmall, CardViewSmallProps, FileIcon, ErrorIcon } from '../../src';

describe('CardViewSmall', () => {
  it('should display a file icon when loading', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        loading={true}
      />);
    expect(cardView.find('.loading')).to.have.lengthOf(1);
  });

  it('should display image when image loaded', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        mediaName={'some-name'}
        mediaType={'image'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />);

    expect(cardView.find('.card-img').first().props().style.backgroundImage).to.contain('some-data-uri');
    expect(cardView.find('.title').first().text()).to.equal('some-name');
    expect(cardView.find('.size').first().text()).to.equal('1 kB');
  });

  it('should display file icon when file loaded', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        mediaName={'some-audio'}
        mediaType={'audio'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />);

    expect(cardView.find(FileIcon).length).to.equal(1);
    expect(cardView.find('.title').first().text()).to.equal('some-audio');
    expect(cardView.find('.size').first().text()).to.equal('1 kB');
  });

  it('should display error and try again message when error with handler passed', () => {
    // We need to be sure that we can click on the "Try again" message and this click doesn't trigger
    // click on the card
    const errorActionMock = sinon.spy();
    const onClickMock = sinon.spy();

    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        error={'some-error'}
        onRetry={{handler: errorActionMock}}
        onClick={onClickMock}
      />);

    expect(cardView.find(ErrorIcon).length).to.equal(1);
    expect(cardView.find('.error').length).to.equal(1);
    expect(cardView.find('.retry').length).to.equal(1);

    cardView.simulate('click');
    expect(onClickMock.callCount).to.equal(1);

    cardView.find('.retry').first().childAt(0).simulate('click');
    expect(errorActionMock.callCount).to.equal(1);
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should display error when error without handler passed', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        error={'some-error'}
      />);

    expect(cardView.find(ErrorIcon).length).to.equal(1);
    expect(cardView.find('.error').length).to.equal(1);
    expect(cardView.find('.retry').length).to.equal(0);
  });
});
