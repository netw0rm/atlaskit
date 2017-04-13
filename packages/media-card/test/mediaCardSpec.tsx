import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';

import {shallow, ShallowWrapper} from 'enzyme';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {waitUntil} from '@atlaskit/media-test-helpers';
import {FileDetails, UrlPreview} from '@atlaskit/media-core';

import {MediaCard, MediaCardProps, MediaCardState} from '../src/mediaCard';
import {LinkCard} from '../src/links';
import {FileCard} from '../src/files';

describe('MediaCard', () => {
  const waitUntilCardIsLoaded = (card: ShallowWrapper<MediaCardProps, MediaCardState>) => {
    return waitUntil(() => !!card.instance().state.details, 50);
  };

  it('should initially render LinkCard with details undefined and passed in props', () => {
    const provider = {
      observable: () => Observable.create(() => {/*do nothing*/})
    };

    const dataUriService = {};
    const onLoadingChange = sinon.spy();

    const expectedProps = {
      appearance: 'small',
      cardProcessingStatus: 'loading',
      urlPreview: undefined,
      error: undefined
    };

    const element = shallow(
      <MediaCard
        type="link"
        appearance="small"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.props()).to.deep.equal(expectedProps);
  });

  it('should initially render FileCard with details undefined, passed in props and dataURIService', () => {
    const provider = {
      observable: () => Observable.create(() => {/*do nothing*/})
    };

    const dataUriService = {};
    const onLoadingChange = sinon.spy();

    const expectedProps = {
      actions: [],
      appearance: 'small',
      cardProcessingStatus: 'loading',
      fileDetails: undefined,
      error: undefined,
      dataURIService: dataUriService
    };

    const element = shallow(
      <MediaCard
        type="file"
        appearance="small"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    const fileCard = element.find(FileCard);
    expect(fileCard).to.be.length(1);
    expect(fileCard.props()).to.deep.equal(expectedProps);
  });

  it('should render LinkCard with urlPreview details after provider has returned them', () => {
    const expectedUrlPreview: UrlPreview = {type: 'link', url: 'hello.world', title: 'l33t title'};

    const provider = {
      observable: () => Observable.create(observer => {
        observer.next(expectedUrlPreview);
      })
    };

    const dataUriService = {};
    const onLoadingChange = sinon.spy();

    const element = shallow<MediaCardProps, MediaCardState>(
      <MediaCard
        type="link"
        appearance="small"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();

    return waitUntilCardIsLoaded(element).then(() => {
      const linkCard = element.find(LinkCard);
      expect(linkCard).to.be.length(1);
      expect(linkCard.props().urlPreview).to.deep.equal(expectedUrlPreview);
    });
  });

  it('should render FileCard with FileDetails after provider has returned them', () => {
    const expectedFileDetails: FileDetails = {id: 'abcd', name: 'my-file'};

    const provider = {
      observable: () => Observable.create(observer => {
        observer.next(expectedFileDetails);
      })
    };

    const dataUriService = {};
    const onLoadingChange = sinon.spy();

    const element = shallow<MediaCardProps, MediaCardState>(
      <MediaCard
        type="file"
        appearance="small"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();

    return waitUntilCardIsLoaded(element).then(() => {
      const fileCard = element.find(FileCard);
      expect(fileCard).to.be.length(1);
      expect(fileCard.props().fileDetails).to.deep.equal(expectedFileDetails);
    });
  });

  it('should call onLoadingStateChange() with type "loading" when the component has mounted', () => {
    const provider = {
      observable: () => Observable.create(() => {/*do nothing*/})
    };

    const dataUriService = {};
    const onLoadingChange = sinon.spy();

    const element = shallow(
      <MediaCard
        type="file"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();

    expect(onLoadingChange.calledOnce).to.be.true;
    expect(onLoadingChange.calledWithExactly({ type: 'loading', payload: undefined })).to.be.true;
  });

  it('should call onLoadingStateChange() with type "processing" when the server has started processing the media', done => {
    const fileDetailsPayload: FileDetails = {id: 'cryptic-id', name: 'Some file name'};
    const dataUriService = {};

    const provider = {
      observable: () => Observable.create(observer => {
        observer.next(fileDetailsPayload);
      })
    };

    const onLoadingChange = (state) => {
      if (state.type === 'processing') {
        expect(state.payload).to.be.equal(fileDetailsPayload);
        done();
      }
    };

    const element = shallow(
      <MediaCard
        type="file"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();
  });

  it('should call onLoadingStateChange() with type "complete" when the server has finished processing the media', done => {
    const fileDetailsPayload: FileDetails = {id: 'cryptic-id', name: 'Some file name'};
    const dataUriService = {};

    const provider = {
      observable: () => Observable.create(observer => {
        observer.next(fileDetailsPayload);
        observer.complete();
      })
    };

    const onLoadingChange = (state) => {
      if (state.type === 'complete') {
        expect(state.payload).to.deep.equal(fileDetailsPayload);
        done();
      }
    };

    const element = shallow(
      <MediaCard
        type="file"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();
  });

  it('should call onLoadingStateChange() with type "error" when the server has errored whilst processing the media', done => {
    const fileDetailsPayload: FileDetails = {id: 'cryptic-id', name: 'Some file name'};
    const dataUriService = {};
    const errorPayload = new Error('This is some random error');

    const provider = {
      observable: () => Observable.create(observer => {
        observer.next(fileDetailsPayload);
        observer.error(errorPayload);
      })
    };

    const onLoadingChange = (state) => {
      if (state.type === 'error') {
        expect(state.payload).to.deep.equal(errorPayload);
        done();
      }
    };

    const element = shallow(
      <MediaCard
        type="file"
        provider={provider}
        dataURIService={dataUriService as any}
        onLoadingChange={onLoadingChange}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();
  });

  it('should unsubscribe from the old provider and subscribe to the new provider when the provider changes', () => {
    const dataUriService = {};

    const oldUnsubscribe = sinon.spy();
    const oldSubscribe = sinon.stub().returns({unsubscribe: oldUnsubscribe});

    const newUnsubscribe = sinon.spy();
    const newSubscribe = sinon.stub().returns({unsubscribe: newUnsubscribe});

    const oldObservable = {
      map: () => ({subscribe: oldSubscribe})
    };
    const newObservable = {
      map: () => ({subscribe: newSubscribe})
    };

    const firstProvider = {
      observable: () => oldObservable
    };
    const secondProvider = {
      observable: () => newObservable
    };

    const element = shallow(
      <MediaCard
        type="file"
        provider={firstProvider as any}
        dataURIService={dataUriService as any}
      />
    ) as any;

    (element.instance() as MediaCard).componentDidMount();
    element.setProps({provider: secondProvider});

    expect(oldUnsubscribe.calledOnce).to.be.true;
    expect(oldSubscribe.calledOnce).to.be.true;

    expect(newSubscribe.calledOnce).to.be.true;
    expect(newUnsubscribe.called).to.be.false;
  });

});
