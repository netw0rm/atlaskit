import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

/**
 * Transform response from GraphQL
 * - Prefix `timestring` with `remoteWeekdayString` depending on `remoteWeekdayIndex`
 * - Remove properties which will be not used later
 * @ignore
 * @param  {object} response
 * @return {object}
 */
export const modifyResponse = (response) => {
  const presence = response.Presence && response.Presence.state;
  const data = Object.assign({}, response.User, { presence });

  const localWeekdayIndex = new Date().getDay().toString();

  if (data.remoteWeekdayIndex && data.remoteWeekdayIndex !== localWeekdayIndex) {
    data.remoteTimeString = `${data.remoteWeekdayString} ${data.remoteTimeString}`;
  }

  data.timestring = data.remoteTimeString;

  delete data.remoteWeekdayIndex;
  delete data.remoteWeekdayString;
  delete data.remoteTimeString;
  delete data.id;

  return data;
};

const buildHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return headers;
};

/**
 * Build query string for GraphQL
 * @ignore
 * @param  {string} userId
 * @param  {string} [timeformat='h:mma']
 * @return {string}
 */
const buildQueryString = (userId, cloudId, timeformat = 'h:mma') => {
  const fields = [
    'id',
    'fullName',
    'nickname',
    'email',
    'meta: position',
    'location',
    'companyName',
    'avatarUrl(size: 100)',
    'remoteWeekdayIndex: localTime(format: "d")',
    'remoteWeekdayString: localTime(format: "ddd")',
    `remoteTimeString: localTime(format: "${timeformat}")`,
  ];

  const presence = [
    'state',
    'type',
    'date',
  ];

  const queryUser = `User(id: "${userId}") {${fields.join(', ')}}`;
  const queryPresence = `Presence(organizationId: "${cloudId}", userId: "${userId}") {${presence.join(', ')}}`;

  return `{${queryUser} ${queryPresence}}`;
};

const requestService = (baseUrl, options) => {
  const headers = buildHeaders();
  const query = buildQueryString(options.userId, options.cloudId, options.timeformat);

  return fetch(new Request(baseUrl, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers,
    body: JSON.stringify({ query }),
  }))
  .then((response) => {
    if (!response.ok) {
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    }

    return response.json().then((json) => {
      if (json.data.User === null) {
        return Promise.reject({
          reason: (json.errors && json.errors[0]) || 'Empty User data',
        });
      }

      return modifyResponse(json.data);
    });
  });
};

class ProfileClient {
  constructor(config) {
    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }

    this.config = config;
  }

  fetch(options) {
    return requestService(this.config.url, options);
  }
}

export default ProfileClient;
