import axios, { AxiosRequestConfig } from 'axios';

export default class EmojiSuggestionsProviderMock {
  search(query: string): Promise<AxiosRequestConfig> {
    const config = {
      headers: {},
      baseURL: 'https://pf-nlp-service.us-west-2.staging.atl-paas.net/deepmoji'
    };

    return new Promise((resolve, reject) => {
      axios.get(`/${query}`, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  }
}

export const emojiSuggestionsProvider = new EmojiSuggestionsProviderMock();
export const emojiSuggestionsProviderPromise = Promise.resolve(
  emojiSuggestionsProvider
);
