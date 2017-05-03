import BaseGraphQlClient from './BaseGraphQlClient';

const buildSearchString = (cloudId, userId, query) => {
  const graphQl = `{
    Search(userId: "${userId}", cloudId: "${cloudId}", query: "${query}") {
      id
      type
      title
      meta {
        key
        value
      }
    }
  }`;

  return JSON.stringify({
    query: graphQl,
  });
};

export class SearchClient extends BaseGraphQlClient {

  query(queryString, userId, cloudId) {
    const query = buildSearchString(
      cloudId,
      userId,
      queryString
    );

    this.cancelPreviousRequest();

    return this.makeGraphQLRequest(query);
  }
}

export default new SearchClient();
