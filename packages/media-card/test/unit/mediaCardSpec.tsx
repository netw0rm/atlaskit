import * as React from 'react';

import {shallow, ShallowWrapper} from 'enzyme';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {waitUntil} from '@atlaskit/media-test-helpers';
import {FileDetails, UrlPreview} from '@atlaskit/media-core';

import {CardEvent} from '../../src';
import {MediaCard, MediaCardProps, MediaCardState} from '../../src/root/mediaCard';

const createNoopProvider = () => ({
  observable: () => Observable.create(() => {/*do nothing*/})
});

describe('MediaCard', () => {
  const waitUntilCardIsLoaded = (card: ShallowWrapper<MediaCardProps, MediaCardState>) => {
    return waitUntil(() => !!card.instance().state.metadata, 50);
  };

  describe('.render()', () => {
    it('should pass down other props', () => {
      const element = shallow(
        <MediaCard
          appearance="small"
          provider={createNoopProvider()}
        />
      ) as any;
      expect(element.props()).toMatchObject({
        appearance: 'small'
      });
    });

    it('should pass down the status when we have one', () => {
      const status = 'complete';

      const element = shallow(
        <MediaCard
          provider={createNoopProvider()}
        />
      ) as any;

      element.setState({status});

      expect(element.props().status).toBe(status);
    });

    it('should render metadata=object when we have metadata', () => {
      const metadata = {
        mediaType: 'image'
      };

      const element = shallow(
        <MediaCard
          provider={createNoopProvider()}
        />
      ) as any;

      element.setState({metadata});

      expect(element.props().metadata).toBe(metadata);
    });

    it('should NOT pass down the error when we have one', () => {
      const error = new Error('test');

      const element = shallow(
        <MediaCard
          provider={createNoopProvider()}
        />
      ) as any;

      element.setState({error});

      expect(element.props().error).toBe(undefined);
    });

    it('should pass onClick to root node', function() {
      const clickHandler = (result: CardEvent) => {};
      const card = shallow(<MediaCard provider={createNoopProvider()} onClick={clickHandler} />);

      expect(card.props().onClick).toEqual(clickHandler);
    });

    it('should pass onMouseEnter to root node', function() {
      const hoverHandler = (result: CardEvent) => {};
      const card = shallow(<MediaCard provider={createNoopProvider()} onMouseEnter={hoverHandler} />);

      expect(card.props().onMouseEnter).toEqual(hoverHandler);
    });
  });

  describe('.updateState()', () => {

    it('should retrieve metadata for a UrlPreviewProvider', () => {
      const expectedMetadata: UrlPreview = {
        type: 'link',
        url: 'hello.world',
        title: 'l33t title'
      };

      const provider = {
        observable: () => Observable.create(observer => {
          observer.next(expectedMetadata);
        })
      };

      const element = shallow<MediaCardProps, MediaCardState>(
        <MediaCard provider={provider}/>
      ) as any;

      (element.instance() as MediaCard).componentDidMount();

      return waitUntilCardIsLoaded(element).then(() => {
        expect(element.state().metadata).toBe(expectedMetadata);
      });
    });

    it('should retrieve metadata for a MediaItemProvider', () => {
      const expectedMetadata: FileDetails = {
        id: 'abcd',
        name: 'my-file'
      };

      const provider = {
        observable: () => Observable.create(observer => {
          observer.next(expectedMetadata);
        })
      };

      const element = shallow<MediaCardProps, MediaCardState>(
        <MediaCard provider={provider}/>
      ) as any;

      (element.instance() as MediaCard).componentDidMount();

      return waitUntilCardIsLoaded(element).then(() => {
        expect(element.state().metadata).toBe(expectedMetadata);
      });
    });

    it('should call onLoadingStateChange() with type "loading" when the component has mounted', () => {
      const onLoadingChange = jest.fn();

      const element = shallow(
        <MediaCard
          provider={createNoopProvider()}
          onLoadingChange={onLoadingChange}
        />
      ) as any;

      (element.instance() as MediaCard).componentDidMount();

      expect(onLoadingChange).toHaveBeenCalledTimes(1);
      expect(onLoadingChange).toHaveBeenCalledWith({ type: 'loading', payload: undefined });
    });

    it('should call onLoadingStateChange() with type "processing" when the server has started processing the media', done => {
      const fileDetailsPayload: FileDetails = {
        id: 'cryptic-id',
        name: 'Some file name'
      };

      const provider = {
        observable: () => Observable.create(observer => {
          observer.next(fileDetailsPayload);
        })
      };

      const onLoadingChange = (state) => {
        if (state.type === 'processing') {
          expect(state.payload).toBe(fileDetailsPayload);
          done();
        }
      };

      const element = shallow(
        <MediaCard
          provider={provider}
          onLoadingChange={onLoadingChange}
        />
      ) as any;

      (element.instance() as MediaCard).componentDidMount();
    });

    it('should call onLoadingStateChange() with type "complete" when the server has finished processing the media', done => {
      const fileDetailsPayload: FileDetails = {
        id: 'cryptic-id',
        name: 'Some file name'
      };

      const provider = {
        observable: () => Observable.create(observer => {
          observer.next(fileDetailsPayload);
          observer.complete();
        })
      };

      const onLoadingChange = (state) => {
        if (state.type === 'complete') {
          expect(state.payload).toEqual(fileDetailsPayload);
          done();
        }
      };

      const element = shallow(
        <MediaCard
          provider={provider}
          onLoadingChange={onLoadingChange}
        />
      ) as any;

      (element.instance() as MediaCard).componentDidMount();
    });

    it('should call onLoadingStateChange() with type "error" when the server has errored whilst processing the media', done => {
      const fileDetailsPayload: FileDetails = {
        id: 'cryptic-id',
        name: 'Some file name'
      };
      const errorPayload = new Error('This is some random error');

      const provider = {
        observable: () => Observable.create(observer => {
          observer.next(fileDetailsPayload);
          observer.error(errorPayload);
        })
      };

      const onLoadingChange = (state) => {
        if (state.type === 'error') {
          expect(state.payload).toEqual(errorPayload);
          done();
        }
      };

      const element = shallow(
        <MediaCard
          provider={provider}
          onLoadingChange={onLoadingChange}
        />
      ) as any;

      (element.instance() as MediaCard).componentDidMount();
    });

    it('should unsubscribe from the old provider and subscribe to the new provider when the provider changes', () => {
      const oldUnsubscribe = jest.fn();
      const oldSubscribe = jest.fn(() => ({unsubscribe: oldUnsubscribe}));

      const newUnsubscribe = jest.fn();
      const newSubscribe = jest.fn(() => ({unsubscribe: newUnsubscribe}));

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
          provider={firstProvider as any}
        />
      ) as any;

      (element.instance() as MediaCard).componentDidMount();
      element.setProps({provider: secondProvider});

      expect(oldUnsubscribe).toHaveBeenCalledTimes(1);
      expect(oldSubscribe).toHaveBeenCalledTimes(1);

      expect(newSubscribe).toHaveBeenCalledTimes(1);
      expect(newUnsubscribe).not.toHaveBeenCalled();
    });

    it('should reset the state when onRetry method is called', () => {
      const successResponse = {foo: 1};
      const error = 'some error';
      const provider = {
        observable: () => Observable.throw(new Error(error))
      }  as any;
      const element = shallow(
        <MediaCard
          provider={provider}
        />
      ) as any;
      const instance = element.instance() as MediaCard;

      instance.componentDidMount();
      expect(element.prop('status')).toEqual('error');
      provider.observable = () => Observable.of(successResponse);
      element.simulate('retry');
      expect(element.prop('status')).toEqual('complete');
      expect(element.prop('metadata')).toEqual(successResponse);
    });

  });

});
