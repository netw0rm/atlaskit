import AkQuickSearch from './components/QuickSearch';
import AkQuickSearchResult from './components/Result';
import AkQuickSearchResultsList from './components/ResultsList';
import SearchResource, { ParsingSearchResource } from './api/SearchResource';
import { GroupedResultsParser, ResultParser } from './api/result-parser/ResultParser';

export {
  AkQuickSearchResult,
  AkQuickSearchResultsList,
  GroupedResultsParser,
  ParsingSearchResource,
  ResultParser,
  SearchResource,
};
export default AkQuickSearch;
