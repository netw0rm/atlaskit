import React from 'react';
import { storiesOf } from '@kadira/storybook';
// import { AkSearch } from '@atlaskit/navigation';

import { name } from '../package.json';
import QuickSearch, { AkQuickSearchResultsList } from '../src/';
import { ParsingSearchResource } from '../src/api/SearchResource';
// import MockSearchResource from '../test/helpers/MockSearchResource';
import { ResultParser } from '../src/api/JsonToResultParser';
import BasicNav from '../../navigation/stories/components/BasicNavigation';

const searchResource = new ParsingSearchResource({
  userId: '655363:7c218e11-d210-43fd-9830-bcc1874e4736',
  cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
});
// const searchResource = new MockSearchResource(200);

storiesOf(name, module)
  .add('Ungrouped Results', () => {
    const resultCallbacks = {
      HipChatConversation: () => console.log('*click*'),
    };
    const resultParser = new ResultParser(() => {}, resultCallbacks);
    return (
      <BasicNav
        searchDrawerContent={(
          <QuickSearch
            searchResource={searchResource}
            jsonToResultParser={resultParser}
          />
        )}
      >
        Hi
      </BasicNav>
    );
  })
  .add('Grouped Results', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch
          searchResource={searchResource}
          resultCallbacks={{
            HipChatConversation: () => console.log('*click*'),
          }}
        />
      )}
    >
      Hi
    </BasicNav>
  ))
  .addCodeExampleStory('Stateful QuickSearch', () => {
    class TestDataSearchResults extends React.PureComponent {
      constructor() {
        super();
        this.handleDataChange = this.handleDataChange.bind(this);
        this.state = {
          data: [],
        };
      }

      componentWillUpdate() {
        console.log(this.state);
      }

      handleDataChange = (e) => {
        const data = JSON.parse(e.target.value);
        console.log(data);
        this.setState({
          data,
        });
      }

      render() {
        return (
          <div>
            <AkQuickSearchResultsList items={this.state.data} />
            <input type="text" onChange={this.handleDataChange} />
          </div>
        );
      }
    }

    return <TestDataSearchResults />;
  });
