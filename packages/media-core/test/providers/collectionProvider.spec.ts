import { expect } from 'chai';
import { defaultCollectionName } from '@atlaskit/media-test-helpers';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

import { CollectionServiceStub } from '../stubs/collection-service-stub';
import { CollectionProvider } from '../../src/providers/collectionProvider';
import { MediaCollection } from '../../src/collection';

describe('CollectionProvider', () => {
  const pageCount = 10;
  const pageSize = 10;
  const items = pageCount * pageSize;
  const sortDirection = 'desc';

  it('should load the first page on construction', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, items, pageSize);
    const collectionProvider = CollectionProvider.fromCollectionService(
      collectionService,
      defaultCollectionName,
      pageSize,
      sortDirection
    );

    const subscription = collectionProvider.observable()
      .subscribe({
        next: collection => {
          expect(collection.id).to.be.equal(defaultCollectionName);
          expect(collection.items).to.be.length(pageSize);
          subscription.unsubscribe();
          done();
        }
      });
  });

  it('should load the next page', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, items, pageSize);
    const collectionProvider = CollectionProvider.fromCollectionService(
      collectionService,
      defaultCollectionName,
      pageSize,
      sortDirection
    );

    // Load next page when we have finished loading the first one.
    const subscription1 = collectionProvider.observable()
      .take(1)
      .do(collection => collectionProvider.controller().loadNextPage())
      .subscribe({
        complete: () => subscription1.unsubscribe()
      });

    const subscription2 = collectionProvider.observable()
      .skip(1)
      .take(1)
      .subscribe({
        next: collection => {
          expect(collection.items).to.be.length(2 * pageSize);
          expect(collection.items[2 * pageSize - 1].details.occurrenceKey).to.be.equal('file-19');
        },
        complete: () => {
          subscription2.unsubscribe();
          done();
        }
      });
  });

  it('should load all the pages until it finds occurence key', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, items, pageSize);
    const collectionProvider = CollectionProvider.fromCollectionService(
      collectionService,
      defaultCollectionName,
      pageSize,
      sortDirection
    );

    collectionProvider.controller().loadNextPageUntil(item => item.details.occurrenceKey === 'file-66');

    const subscription = collectionProvider.observable()
      .skip(6)
      .take(1)
      .subscribe({
        next: collection => {
          expect(collection.items).to.be.length(7 * pageSize);
          expect(collection.items[7 * pageSize - 1].details.occurrenceKey).to.be.equal('file-69');
        },
        complete: () => {
          subscription.unsubscribe();
          done();
        }
      });
  });

  it('should load all the pages if it can\'t find the occurence key', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, items, pageSize);
    const collectionProvider = CollectionProvider.fromCollectionService(
      collectionService,
      defaultCollectionName,
      pageSize,
      sortDirection
    );

    collectionProvider.controller().loadNextPageUntil(item => item.details.occurrenceKey === 'file-not-found');

    let lastEmittedCollection: MediaCollection;
    const subscription = collectionProvider.observable()
      .subscribe({
        next: collection => lastEmittedCollection = collection,
        complete: () => {
          expect(lastEmittedCollection.items).to.be.length(items);
          expect(lastEmittedCollection.items[items - 1].details.occurrenceKey).to.be.equal('file-99');
          subscription.unsubscribe();
          done();
        }
      });
  });
});
