import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { StoryList, createStorybookContext, collectionNames, fileCollectionName, defaultCollectionName} from '@atlaskit/media-test-helpers';
import { CardList } from '../../src';

const wrongCollection = 'adfasdf';
const wrongClientId = 'wrong-client-id';

const deleteAction = ListCardDelete((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
  action('delete')(item, items);
});

const clickAction = ListCardClick((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
  action('click')(item, items);
});

const annotateAction = {
  label: 'Annotate',
  handler: (item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
    action('annotate')(item, items);
  }
};

const cardsActions = [deleteAction, clickAction, annotateAction];
const context = createStorybookContext();
const wrongContext = createStorybookContext(wrongClientId);

storiesOf('CardList', {})
  .add('Normal cards', () => (
    <CardList
      context={context}
      collectionName={defaultCollectionName}
      actions={[clickAction]}
    />
  ))
  .add('Loaded list toggling', () => {
    interface CardSwitcherProps {
      delay?: number;
      dataURI?: string;
    }

    interface CardSwitcherState {
      collectionName: string;
    }

    class CardSwitcher extends Component<CardSwitcherProps, CardSwitcherState> {
      constructor(props) {
        super(props);
        this.state = {collectionName: this.collections[0]};
      }

      render() {
        return <div style={{width: '300px', height: '400px', overflow: 'hidden', border: '1px solid'}}>
          <button style={{margin: '10px auto', display: 'block'}} onClick={this.toggle}>Toggle collection</button>
          <div style={{borderBottom: '1px solid', textAlign: 'center'}}>{this.state.collectionName}</div>
          <CardList
            context={context}
            collectionName={this.state.collectionName}
            // actions={[clickAction]}
            pageSize={30}
            cardType={'small'}
          />
        </div>;
      }

      private get collections() {
        return collectionNames;
      }

      toggle = () => {
        const index = this.collections.indexOf(this.state.collectionName) === 0 ? 1 : 0;

        this.setState({collectionName: this.collections[index]});
      }
    }

    return <CardSwitcher />;
  })
  .add('Caching', () => (
     <StoryList>
       {[{
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
         />
       }, {
         title: 'Small card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
           cardType={'small'}
         />
       }, {
         title: 'Small card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
           cardType={'small'}
         />
       }, {
         title: 'Normal Card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
         />
       }, {
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
         />
       }, {
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={fileCollectionName}
           actions={[clickAction]}
           pageSize={30}
         />
       }]}
     </StoryList>
   ))
   .add('Small cards', () => (
     <StoryList>
       {[{
         title: 'No parent width',
         content: <div style={{border: '1px solid', overflow: 'hidden'}}>
           <CardList
             context={context}
             collectionName={defaultCollectionName}
             actions={[clickAction]}
             cardType={'small'}
           />
         </div>
       }, {
         title: 'Small parent width',
         content: <div style={{border: '1px solid', width: '50px', overflow: 'hidden'}}>
           <CardList
             context={context}
             collectionName={defaultCollectionName}
             actions={[clickAction]}
             cardType={'small'}
           />
         </div>
       }, {
         title: 'Large parent width',
         content: (
            <div style={{border: '1px solid', width: '400px', overflow: 'hidden'}}>
              <CardList
                context={context}
                collectionName={defaultCollectionName}
                actions={[clickAction]}
                cardType={'small'}
              />
          </div>
          )
       }]}
     </StoryList>
   ))
   .add('Custom actions dropdown', () => (
     <CardList
       context={context}
       collectionName={fileCollectionName}
       actions={cardsActions}
     />
   ))
   .add('Custom loading state', () => {
     const customLoadingComponent = <div>loading...</div>;
     return <CardList
       context={context}
       loadingComponent={customLoadingComponent}
       collectionName={fileCollectionName}
       actions={cardsActions}
     />;
   })
   .add('Custom error state', () => {
     const style = {
       color: 'red',
       fontSize: '30px'
     };
     const customErrorComponent = <div style={style}>Something went wrong :\</div>;
     return <CardList
       context={wrongContext}
       errorComponent={customErrorComponent}
       collectionName={wrongCollection}
       actions={cardsActions}
     />;
   })
   .add('Custom empty state', () => {
     const customEmptyComponent = <div>No items (this is a custom component)</div>;
     return <CardList
       context={context}
       emptyComponent={customEmptyComponent}
       collectionName={wrongCollection}
       actions={cardsActions}
     />;
   })
   .add('With pageSize (3)', () => {
     return <CardList
       context={context}
       collectionName={fileCollectionName}
       actions={cardsActions}
       pageSize={3}
     />;
   })
  .add('With Card Width and Height', () => {
    return <CardList
      context={context}
      collectionName={fileCollectionName}
      cardDimensions={{width: '200px', height: '100px'}}
      actions={cardsActions}
      pageSize={3}
    />;
  })
  .add('With infinite scroll', () => {
    return <div style={{display: 'inline-block'}}>
      <CardList
        context={context}
        collectionName={fileCollectionName}
        actions={cardsActions}
        pageSize={10}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll with small cards', () => {
    return <div style={{display: 'inline-block', width: '300px', background: 'white', border: '2px solid'}}>
      <CardList
        context={context}
        collectionName={fileCollectionName}
        actions={cardsActions}
        cardType={'small'}
        pageSize={20}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll and card width', () => {
    return <CardList
      context={context}
      collectionName={fileCollectionName}
      cardDimensions={{width: '200px', height: '100px'}}
      actions={cardsActions}
      pageSize={10}
      height={500}
    />;
  });
