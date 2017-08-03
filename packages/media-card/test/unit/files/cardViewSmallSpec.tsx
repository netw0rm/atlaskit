import * as React from 'react';
import { mount } from 'enzyme';
import { FileCardViewSmall, FileCardViewSmallProps } from '../../../src/files';
import { FileIcon, ErrorIcon } from '../../../src/utils/index';

describe('FileCardViewSmall', () => {
  it('should display a file icon when loading', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        loading={true}
      />);
    expect(cardView.find('.loading')).toHaveLength(1);
  });

  it('should display image when image loaded', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        mediaName={'some-name'}
        mediaType={'image'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />) as any;

    expect(cardView.find('.media-card').first().props().style.backgroundImage).toContain('some-data-uri');
    expect(cardView.find('.title').first().text()).toBe('some-name');
    expect(cardView.find('.size').first().text()).toBe('1 KB');
  });

  it('should display file icon when file loaded and dataURI is undefined', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        mediaName={'some-audio'}
        mediaType={'audio'}
        mediaSize={1024}
      />);

    expect(cardView.find(FileIcon).length).toBe(1);
    expect(cardView.find('.title').first().text()).toBe('some-audio');
    expect(cardView.find('.size').first().text()).toBe('1 KB');
  });

  it('should display error and try again message when error with handler passed', () => {
    // We need to be sure that we can click on the "Try again" message and this click doesn't trigger
    // click on the card
    const errorActionMock = jest.fn();

    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        error={'some-error'}
        onRetry={{handler: errorActionMock}}
      />);

    expect(cardView.find(ErrorIcon).length).toBe(1);
    expect(cardView.find('.error').length).toBe(1);
    expect(cardView.find('.retry').length).toBe(1);

    cardView.simulate('click');

    cardView.find('.retry').first().childAt(0).simulate('click');
    expect(errorActionMock).toHaveBeenCalledTimes(1);
  });

  it('should display error when error without handler passed', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        error={'some-error'}
      />);

    expect(cardView.find(ErrorIcon).length).toBe(1);
    expect(cardView.find('.error').length).toBe(1);
    expect(cardView.find('.retry').length).toBe(0);
  });
});
