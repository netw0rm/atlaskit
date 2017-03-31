import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Observable } from 'rxjs';
import { mount, shallow } from 'enzyme';
import { Context } from '@atlaskit/media-core';
import { LinkCard, LinkCardPlayer, LinkCardGenericView, LinkCardTrelloBoardView } from '../../src';
import { fakeContext } from '@atlaskit/media-test-helpers';

describe('LinkCard', () => {
  it('should render the default preview when is a external link', () => {
    const context = fakeContext({
      getUrlPreviewProvider: {
        observable() {
          return Observable.of({
            type: 'link',
            title: 'Atlassian',
            resources: {}
          });
        }
      }
    });
    const link = 'https://atlassian.com';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardGenericView)).to.have.length(1);
    linkCard.unmount();
  });

  it('should use cardPlayer component if we have an embed available', () => {
    const context = fakeContext({
      getUrlPreviewProvider: {
        observable() {
          return Observable.of({
            type: 'media',
            resources: {
              player: 'https://www.youtube.com/embed/zso6jskUaS8?feature=oembed',
            }
          });
        }
      }
    });
    const link = 'https://www.youtube.com/watch?v=zso6jskUaS8';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardPlayer)).to.have.length(1);
    linkCard.unmount();
  });

  it('should render a TrelloBoard preview when link contains a trello board url', () => {
    const context = fakeContext({
      getUrlPreviewProvider: {
        observable() {
          return Observable.of({
            type: 'media',
            resources: {
              app: {
                type: 'trello_board',
                name: 'Public Trello boards list',
                lists: [{
                  name: 'todo',
                  count: 20
                }],
                member: [{
                  avatarUrl: 'https://robohash.org/hectorzarco.png?set=set2&size=80x80',
                  username: 'hector'
                }]
              }
            }
          });
        }
      }
    });
    const link = 'https://trello.com/b/rq2mYJNn/public-trello-boards';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardTrelloBoardView)).to.have.length(1);
    linkCard.unmount();
  });

  it('should call onLoadingStateChange() with type "loading" when the component has mounted', () => {
    const context = fakeContext({
      getUrlPreviewProvider: {observable: () => Observable.create(() => {/*do nothing*/})}
    });

    const onLoadingChange = sinon.spy();

    const element = shallow(
      <LinkCard
        context={context}
        link="https://trello.com/b/rq2mYJNn/public-trello-boards"
        onLoadingChange={onLoadingChange}
      />
    );

    (element.instance() as LinkCard).componentDidMount();

    expect(onLoadingChange.calledOnce).to.be.true;
    expect(onLoadingChange.calledWithExactly({
      type: 'loading',
      payload: undefined
    })).to.be.true;
    element.unmount();
  });

  it('should call onLoadingStateChange() with type "processing" when the server has started processing the media', done => {
    const urlPreviewPayload = {type: 'link', url: 'https://hello.is.it.me.youre.looking.for'};

    const context = fakeContext({
      getUrlPreviewProvider: {observable: () => Observable.create(observer => {
        observer.next(urlPreviewPayload);
      })}
    });

    const onLoadingChange = (state) => {
      if (state.type === 'processing') {
        expect(state.payload).to.be.equal(urlPreviewPayload);
        done();
      }
    };

    const element = shallow(
      <LinkCard
        context={context}
        link="https://trello.com/b/rq2mYJNn/public-trello-boards"
        onLoadingChange={onLoadingChange}
      />
    );

    (element.instance() as LinkCard).componentDidMount();
    element.unmount();
  });

  it('should call onLoadingStateChange() with type "complete" when the server has finished processing the media', done => {
    const context = fakeContext({
      getUrlPreviewProvider: {observable: () => Observable.create(observer => {
        observer.next({});
        observer.complete();
      })}
    });

    const onLoadingChange = (state) => {
      if (state.type === 'complete') {
        expect(state.payload).to.deep.equal({});
        done();
      }
    };

    const element = shallow(
      <LinkCard
        context={context}
        link="https://trello.com/b/rq2mYJNn/public-trello-boards"
        onLoadingChange={onLoadingChange}
      />
    );

    (element.instance() as LinkCard).componentDidMount();
    element.unmount();
  });

  it('should call onLoadingStateChange() with type "error" when the server has errored whilst processing the media', done => {
    const errorPayload = new Error('This is some random error');

    const context = fakeContext({
      getUrlPreviewProvider: {observable: () => Observable.create(observer => {
        observer.next({});
        observer.error(errorPayload);
      })}
    });

    const onLoadingChange = (state) => {
      if (state.type === 'error') {
        expect(state.payload).to.deep.equal(errorPayload);
        done();
      }
    };

    const element = shallow(
      <LinkCard
        context={context}
        link="https://trello.com/b/rq2mYJNn/public-trello-boards"
        onLoadingChange={onLoadingChange}
      />
    );

    (element.instance() as LinkCard).componentDidMount();
    element.unmount();
  });

});
