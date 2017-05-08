import QuickSearch from './components/QuickSearch';
import Result from './components/Result';
import ResultsList from './components/ResultsList';
import SearchResource, { ParsingSearchResource } from './api/SearchResource';
import { GroupedResultsParser, ResultParser } from './api/result-parser/ResultParser';

export {
  GroupedResultsParser,
  ParsingSearchResource,
  Result,
  ResultParser,
  ResultsList,
  SearchResource,
};
export default QuickSearch;
