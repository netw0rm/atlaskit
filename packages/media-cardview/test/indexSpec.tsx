import * as React from 'react';
import { expect } from 'chai';
import {mount} from 'enzyme';
import {CardViewProps, CardView} from '../src';
// import * as overlayStyles from 'style!./styles.less';
// import {Actions} from '@atlaskit/media-domain';
// const {CardActionType, CardAction} = Actions;

describe('@atlaskit/media-cardview', () => {
  test('should display spinner when loading', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        loading={true}
        mediaType={'image'}
      />);

    expect(cardView.find('Spinner').length).to.be(1);
  });

  // test('should display progress when progress is specified', () => {
  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       progress={63}
  //     />);

  //   expect(cardView.find('ProgressBar').prop('progress')).toBe(63);
  // });

  // test('should display image when image is loaded', () => {
  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       mediaName={'some-name'}
  //       mediaType={'image'}
  //       dataURI={'some-data-uri'}
  //     />);

  //   expect(cardView.find('img').first().prop('src')).toBe('some-data-uri');
  // });

  // test('should display placeholder when file is loaded', () => {
  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       mediaName={'some-name'}
  //       mediaType={'audio'}
  //     />);

  //   expect(cardView.find('Placeholder').first().prop('mediaType')).toBe('audio');
  // });

  // test('should display file info when file is loaded', () => {
  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       mediaName={'some-name'}
  //       mediaSize={1024}
  //       mediaType={'video'}
  //     />);

  //   expect(cardView.find(`.${overlayStyles['title']}`).first().text()).toBe('some-name');
  //   expect(cardView.find(`.${overlayStyles['fileSize']}`).first().text()).toBe('1 kB');
  //   expect(cardView.find('FileIcon').first().prop('mediaType')).toBe('video');
  // });

  // test('should handle onClick when it is provided', () => {
  //   const onClick = jest.fn();

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       onClick={onClick}
  //     />);

  //   cardView.simulate('click');
  //   expect(onClick.mock.calls.length).toBe(1);
  // });

  // test('should display close button when only delete action is provided', () => {
  //   // We need to be sure that clicking on the close button won't invoke card's onClick
  //   const onClick = jest.fn();
  //   const onDelete = jest.fn();

  //   const actions: Array<CardAction> = [
  //     {type: CardActionType.delete, label: 'Close', handler: onDelete}
  //   ];

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       menuActions={actions}
  //       onClick={onClick}
  //     />);

  //   expect(cardView.find(`.${overlayStyles['deleteBtn']}`).length).toBe(1);

  //   cardView.find(`.${overlayStyles['deleteBtn']}`).first().simulate('click');
  //   expect(onDelete.mock.calls.length).toBe(1);
  //   expect(onClick.mock.calls.length).toBe(0);
  // });

  // test('should display more button when multiple actions are provided', () => {
  //   // We need to be sure that clicking on the more button won't invoke card's onClick
  //   const onClick = jest.fn();

  //   const actions: Array<CardAction> = [
  //     {type: CardActionType.delete, label: 'Close', handler: () => {}},
  //     {type: CardActionType.download, label: 'Download', handler: () => {}}
  //   ];

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       menuActions={actions}
  //       onClick={onClick}
  //     />);

  //   expect(cardView.find(`.${overlayStyles['moreBtn']}`).length).toBe(1);
  //   expect(cardView.find('Dropdown').length).toBe(0);

  //   const moreBtn = cardView.find(`.${overlayStyles['moreBtn']}`).first();

  //   // The first click opens the menu
  //   moreBtn.simulate('click');
  //   expect(onClick.mock.calls.length).toBe(0);
  //   expect(cardView.find('Dropdown').length).toBe(1);

  //   // The second click closes the menu
  //   moreBtn.simulate('click');
  //   expect(onClick.mock.calls.length).toBe(0);
  //   expect(cardView.find('Dropdown').length).toBe(0);
  // });

  // test('should display error when error is specified', () => {
  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       error={'some-error'}
  //     />);

  //   expect(cardView.find('ErrorIcon').length).toBe(1);
  //   expect(cardView.find(`.${overlayStyles['errorMessage']}`).first().text()).toBe('some-error');
  //   expect(cardView.find(`.${overlayStyles['retry']}`).length).toBe(0);
  // });

  // test('should display error and handler when error and handler is specified', () => {
  //   // We need to be sure that clicking on the retry handler won't invoke card's onClick
  //   const onClick = jest.fn();
  //   const onRetry = jest.fn();

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       error={'some-error'}
  //       onRetry={{handler: onRetry}}
  //       onClick={onClick}
  //     />);

  //   expect(cardView.find('ErrorIcon').length).toBe(1);
  //   expect(cardView.find(`.${overlayStyles['errorMessage']}`).first().text()).toBe('some-error');
  //   expect(cardView.find(`.${overlayStyles['retry']}`).first().text()).toBe('Try again');

  //   cardView.find(`.${overlayStyles['retry']}`).childAt(0).simulate('click');
  //   expect(onRetry.mock.calls.length).toBe(1);
  //   expect(onClick.mock.calls.length).toBe(0);
  // });
});