import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {fakeContext} from '@atlaskit/media-test-helpers';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {CardList, CardListProps, CardListState, InfiniteScroll} from '../../src/list';
import {MediaCard} from '../../src/mediaCard';

describe('CardList', () => {

  it('should create a MediaItemProvider for each MediaItem in the collection', () => {
    const collectionName = 'MyMedia';

    const expectedMediaItemProvider = 'the media item provider';
    const expectedMediaItems = [
      {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link'
        }
      },
      {
        type: 'file',
        details: {
          id: 'efgh',
          type: 'file'
        }
      }
    ];

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.of({
            items: expectedMediaItems,
            nextInclusiveStartKey: 'xyz'
          });
        }
      },
      getMediaItemProvider: expectedMediaItemProvider
    });

    mount(<CardList context={context} collectionName={collectionName}/>);

    expect(context.getMediaItemProvider.callCount).to.be.equal(expectedMediaItems.length);
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[0].details.id, expectedMediaItems[0].type, collectionName, expectedMediaItems[0])).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[1].details.id, expectedMediaItems[1].type, collectionName, expectedMediaItems[1])).to.be.true;
  });

  it('should pass a provider to MediaCard', () => {
    const collectionName = 'MyMedia';

    const expectedMediaItemProvider = 'the media item provider';
    const expectedMediaItems = [
      {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link'
        }
      },
      {
        type: 'file',
        details: {
          id: 'efgh',
          type: 'file'
        }
      }
    ];

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.of({
            items: expectedMediaItems,
            nextInclusiveStartKey: 'xyz'
          });
        }
      },
      getMediaItemProvider: expectedMediaItemProvider
    });

    const card = mount(<CardList context={context} collectionName={collectionName}/>);

    // re-render now that we've subscribed (relying on the stubbed provider being synchronous)
    card.update();

    card.find(MediaCard).forEach(mediaCard => expect(mediaCard.prop('provider')).to.be.equal(expectedMediaItemProvider));

  });

  it('should be loading=true when mounted', () => {
    const context = fakeContext();
    const collectionName = 'MyMedia';
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>);
    expect(card.state().loading).to.be.true;
  });

  it('should be loading=false when we start loading the next page', () => {
    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next({
              items: [],
              nextInclusiveStartKey: 'xyz'
            });
          });
        }
      }
    });
    const collectionName = 'MyMedia';
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>);
    card.setState({loading: false, loadNextPage: sinon.spy()});
    card.instance().loadNextPage();
    expect(card.state().loading).to.be.false;
  });
});
