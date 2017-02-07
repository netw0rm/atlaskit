import * as React from 'react';
import { expect } from 'chai';
import {mount} from 'enzyme';
import {CardViewProps, CardView} from '../src';
import * as overlayStyles from 'style!../src/styles.less';
// import {Actions} from '@atlaskit/media-domain';
// const {CardActionType, CardAction} = Actions;

describe('@atlaskit/media-cardview', () => {
  it('should display spinner when loading', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        loading={true}
        mediaType={'image'}
      />);

    expect(cardView.find('Spinner')).to.have.length(1);
  });

  it('should display progress when progress is specified', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        progress={63}
        mediaType={'image'}
      />);

    expect(cardView.find('ProgressBar').prop('progress')).to.be.equal(63);
  });

  it('should display image when image is loaded', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        mediaName={'some-name'}
        mediaType={'image'}
        dataURI={'some-data-uri'}
      />);

    expect(cardView.find('img').first().prop('src')).to.be.equal('some-data-uri');
  });

  it('should display placeholder when file is loaded', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        mediaName={'some-name'}
        mediaType={'audio'}
      />);

    expect(cardView.find('Placeholder').first().prop('mediaType')).to.be.equal('audio');
  });

  it('should display file info when file is loaded', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        mediaName={'some-name'}
        mediaSize={1024}
        mediaType={'video'}
      />);

    expect(cardView.find(`.${overlayStyles['title']}`).first().text()).to.be.equal('some-name');
    // expect(cardView.find(`.${overlayStyles['fileSize']}`).first().text()).to.be.equal('1 kB'); // MEDIA-FIX
    expect(cardView.find('FileIcon').first().prop('mediaType')).to.be.equal('video');
  });

  // it('should handle onClick when it is provided', () => {
  //   const onClick = jest.fn();

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       onClick={onClick}
  //     />);

  //   cardView.simulate('click');
  //   expect(onClick.mock.calls.length).to.be.equal(1);
  // });

  // it('should display close button when only delete action is provided', () => {
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

  //   expect(cardView.find(`.${overlayStyles['deleteBtn']}`).length).to.be.equal(1);

  //   cardView.find(`.${overlayStyles['deleteBtn']}`).first().simulate('click');
  //   expect(onDelete.mock.calls.length).to.be.equal(1);
  //   expect(onClick.mock.calls.length).to.be.equal(0);
  // });

  // it('should display more button when multiple actions are provided', () => {
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

  //   expect(cardView.find(`.${overlayStyles['moreBtn']}`).length).to.be.equal(1);
  //   expect(cardView.find('Dropdown').length).to.be.equal(0);

  //   const moreBtn = cardView.find(`.${overlayStyles['moreBtn']}`).first();

  //   // The first click opens the menu
  //   moreBtn.simulate('click');
  //   expect(onClick.mock.calls.length).to.be.equal(0);
  //   expect(cardView.find('Dropdown').length).to.be.equal(1);

  //   // The second click closes the menu
  //   moreBtn.simulate('click');
  //   expect(onClick.mock.calls.length).to.be.equal(0);
  //   expect(cardView.find('Dropdown').length).to.be.equal(0);
  // });

  it('should display error when error is specified', () => {
    const cardView = mount<CardViewProps, {}>(
      <CardView
        error={'some-error'}
        mediaType={'image'}
      />);

    expect(cardView.find('ErrorIcon').length).to.be.equal(1);
    expect(cardView.find(`.${overlayStyles['errorMessage']}`).first().text()).to.be.equal('some-error');
    expect(cardView.find(`.${overlayStyles['retry']}`).length).to.be.equal(0);
  });

  // it('should display error and handler when error and handler is specified', () => {
  //   // We need to be sure that clicking on the retry handler won't invoke card's onClick
  //   const onClick = jest.fn();
  //   const onRetry = jest.fn();

  //   const cardView = mount<CardViewProps, {}>(
  //     <CardView
  //       error={'some-error'}
  //       onRetry={{handler: onRetry}}
  //       onClick={onClick}
  //     />);

  //   expect(cardView.find('ErrorIcon').length).to.be.equal(1);
  //   expect(cardView.find(`.${overlayStyles['errorMessage']}`).first().text()).to.be.equal('some-error');
  //   expect(cardView.find(`.${overlayStyles['retry']}`).first().text()).to.be.equal('Try again');

  //   cardView.find(`.${overlayStyles['retry']}`).childAt(0).simulate('click');
  //   expect(onRetry.mock.calls.length).to.be.equal(1);
  //   expect(onClick.mock.calls.length).to.be.equal(0);
  // });
});