import React from 'react';
import { storiesOf } from '@kadira/storybook';
// import { AkSearch } from '@atlaskit/navigation';

import { name } from '../package.json';
import QuickSearch, { AkQuickSearchResultsList } from '../src/';
// import SearchProvider from '../src/api/SearchProvider';
import MockSearchProvider from '../test/helpers/MockSearchProvider';
// import JsonToResultParser from '../src/api/JsonToResultParser';
import BasicNav from '../../navigation/stories/components/BasicNavigation';

/* const searchProvider = new SearchProvider({
  serviceHost: 'https://pf-ppl-directory-service.internal.uswest2.staging.atlassian.io/',
  cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
});*/
const searchProvider = new MockSearchProvider(1000);

storiesOf(name, module)
  /* .add('QuickSearch Component', () => (
    <div>
      <input type="text" onChange={(ev) => { searchProvider.query(ev.target.value); }} />
      <AkQuickSearchResourcedResultsList searchProvider={searchProvider} />
    </div>
    ))
  .add('QuickSearch Component in a SearchDrawer', () => (
    <BasicNav
      searchDrawerContent={(
        <div>
          <AkSearch onChange={(ev) => { searchProvider.query(ev.target.value); }} />
          <AkQuickSearchResourcedResultsList
            searchProvider={searchProvider}
          />
        </div>
      )}
    >
      Hi
    </BasicNav>
  ))*/
  .add('QuickSearch Component in a SearchDrawer', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch searchProvider={searchProvider} />
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
