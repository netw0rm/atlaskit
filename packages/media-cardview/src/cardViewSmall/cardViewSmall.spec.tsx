// MEDIA-FIX --> Can we keep this folder structure for specs?
import * as React from 'react';
import 'jest';
import {mount, ReactWrapper} from 'enzyme';
import {CardViewSmall, CardViewSmallProps} from './cardViewSmall';
import * as styles from './cardViewSmall.less';

describe('CardViewSmall', () => {
  test('should display a spinner when loading', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        loading={true}
      />);

    expect(cardView.find('Spinner').length).toBe(1);
  });

  test('should display image when image loaded', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        mediaName={'some-name'}
        mediaType={'image'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />);

    expect(cardView.find('img').first().props().src).toBe('some-data-uri');
    expect(cardView.find(`.${styles['title']}`).first().text()).toBe('some-name');
    expect(cardView.find(`.${styles['size']}`).first().text()).toBe('1 kB');
  });

  test('should display file icon when file loaded', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        mediaName={'some-audio'}
        mediaType={'audio'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />);

    expect(cardView.find('FileIcon').length).toBe(1);
    expect(cardView.find(`.${styles['title']}`).first().text()).toBe('some-audio');
    expect(cardView.find(`.${styles['size']}`).first().text()).toBe('1 kB');
  });

  test('should display error and try again message when error with handler passed', () => {
    // We need to be sure that we can click on the "Try again" message and this click doesn't trigger
    // click on the card
    const errorActionMock = jest.fn();
    const onClickMock = jest.fn();

    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        error={'some-error'}
        onRetry={{handler: errorActionMock}}
        onClick={onClickMock}
      />);

    expect(cardView.find('ErrorIcon').length).toBe(1);
    expect(cardView.find(`.${styles['error']}`).length).toBe(1);
    expect(cardView.find(`.${styles['retry']}`).length).toBe(1);

    cardView.simulate('click');
    expect(onClickMock.mock.calls.length).toBe(1);

    cardView.find(`.${styles['retry']}`).first().childAt(0).simulate('click');
    expect(errorActionMock.mock.calls.length).toBe(1);
    expect(onClickMock.mock.calls.length).toBe(1);
  });

  test('should display error when error without handler passed', () => {
    const cardView = mount<CardViewSmallProps, {}>(
      <CardViewSmall
        error={'some-error'}
      />);

    expect(cardView.find('ErrorIcon').length).toBe(1);
    expect(cardView.find(`.${styles['error']}`).length).toBe(1);
    expect(cardView.find(`.${styles['tryAgain']}`).length).toBe(0);
  });
});
