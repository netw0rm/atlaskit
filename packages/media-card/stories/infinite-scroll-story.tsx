import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';
import { InfiniteScroll, CardView } from '../src';
import { List } from './list';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/publishReplay';
import {tallImage} from './images';

storiesOf('Infinite Scroll', {})
    .add('with card views', () => {
        // BUGGED right now, need to select a different story, and return here. See Card List for Infinite Scroll examples.
        const subject = new Subject<JSX.Element>();
        const observable = subject.publishReplay();
        observable.connect();

        const cardView = <CardView
            dataURI={tallImage}
        />;

        const loadMore = (something: any, count: number) => {
            Array(count)
                .fill(something)
                .forEach(value => subject.next(value));
        };

        loadMore(cardView, 20);

        return <InfiniteScroll
            // width={200}
            height={400}
            delay={100}
            onThresholdReached={() => loadMore(cardView, 20)}
        >
            <List
                observable={observable}
            />
        </InfiniteScroll>;
    });
