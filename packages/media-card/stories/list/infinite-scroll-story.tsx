import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/publishReplay';

import { InfiniteScroll, FileCardView } from '../../src';
import { List } from './list';
import { tallImage } from '@atlaskit/media-test-helpers';

storiesOf('Infinite Scroll', {})
    .add('with card views', () => {
        // BUGGED right now, need to select a different story, and return here. See Card List for Infinite Scroll examples.
        const subject = new Subject<JSX.Element>();
        const observable = subject.publishReplay();
        observable.connect();

        const cardView = <FileCardView
            dataURI={tallImage}
        />;

        const loadMore = (something: any, count: number) => {
            Array(count)
                .fill(something)
                .forEach(value => subject.next(value));
        };

        loadMore(cardView, 20);

        return (
            <InfiniteScroll
                height={400}
                delay={100}
                onThresholdReached={() => loadMore(cardView, 20)}
            >
                <List
                    observable={observable}
                />
            </InfiniteScroll>
        );
    });
