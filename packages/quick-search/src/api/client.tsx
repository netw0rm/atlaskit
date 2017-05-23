import { transform, GraphQLResult } from './transform-search-result';
import { Result } from '../types';

export function search(serviceUrl: string, query: string, userId: string, cloudId: string): Promise<Result[]> {
  const headers = buildHeaders();

  return fetch(new Request(serviceUrl, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers,
      body: JSON.stringify({
        query: `query Search($userId: String!, $cloudId: String!, $query: String!) { Search(userId: $userId, cloudId: $cloudId, query: $query) { id type title meta { key value } } }`,
        variables: { query, userId, cloudId },
      }),
    }))
    .then((response) => {
      if (!response.ok) {
        return buildError(response);
      }

      return response.json()
        .then((json: GraphQLResponse) => {
          return json.data.Search.map(transform);
        });
    });
}

function buildError(response: Response) {
  return Promise.reject({
    code: response.status,
    reason: response.statusText,
  });
}

function buildHeaders() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
}

type GraphQLResponse = {
  data: {
    Search: GraphQLResult[]
  }
};
