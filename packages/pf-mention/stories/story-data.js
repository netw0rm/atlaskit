import MentionResource from '../src/api/pf-mention-resource';
import debug, { enableLogger } from '../src/util/logger';

enableLogger(true);

export const mentions = [
  {
    id: '666',
    avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
    name: 'Craig Petchell',
    mentionName: 'petch',
    presence: {
      status: 'online',
      time: '11:57am',
    },
  },
  {
    id: '2234',
    avatarUrl: 'https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64',
    name: 'Jack Sparrow',
    mentionName: 'captainjack',
    presence: {
      status: 'away',
    },
  },
  {
    id: '55',
    avatarUrl: 'http://www.dystopianmovies.org/wp-content/uploads/malcolm-reynolds-serenity-nathon-fillion-64x64.jpg',
    name: 'Captain Mal',
    mentionName: 'captaintightpants',
    presence: {
      status: 'mobile',
      time: '12:57pm',
    },
  },
  {
    id: '11',
    avatarUrl: 'http://66.media.tumblr.com/avatar_2072eeb45575_64.png',
    name: 'Doctor Who',
    mentionName: 'thedoctor',
    presence: {
      status: 'dnd',
    },
  },
  {
    id: '27',
    avatarUrl: 'http://seatfleet.io/system/users/pictures/54a7/6630/7365/6111/ba00/0000/thumb/picard_s5hq_pbvariant.jpg?1420256904',
    name: 'Jean Luc Picard',
    mentionName: 'makeitso',
    presence: {
      status: 'unavailable',
      time: '1:57am',
    },
  },
  {
    id: '1701',
    avatarUrl: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ab/abee9ce4fbd1c9c94b695b16062b8fdf57a21de7_medium.jpg',
    name: 'James T. Kirk',
    mentionName: 'wheresmyshirt',
  },
  {
    id: '12312312',
    avatarUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cf845e576741bd2db28c079b279c6a81dcc33666_medium.jpg',
    name: 'Dude with long name that doesn\'t seem to stop and should overflow',
    mentionName: 'Dudewithlongnamethatdoesn\'tseemtostopandshouldoverflow',
  },
  {
    id: '12312412',
    name: 'Dude with long name and time that doesn\'t seem to stop and should overflow',
    mentionName: 'Dudewithlongnamethatdoesn\'tseemtostopandshouldoverflowwithtime',
    presence: {
      time: '1:57pm',
    },
  },
];

export const apiConfig = {
  url: 'https://pf-mentions-service.internal.domain.dev.atlassian.io/',
  securityProvider() {
    return {
      headers: {
        // Dummy jwt token for testing in dev service
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0Njg1NjA4NjUsImV4cCI6MTQ2ODU2MDkyNSwiaXNzIjoiaGlwY2hhdCIsInN1YiI6IjEwMTQ5IiwiYXVkIjoicGYtbWVudGlvbnMtc2VydmljZSJ9.pwU_1DUAhNPTUmOvzqnMOwgzlFf8Ig7US0AVOhGBL-Y',
        'X-Bogus': 'single',
        'X-Bogus-Array': ['1', 'Hello'],
      },
      params: {
        bogus1: 'onlyone',
        bogusArray: ['first', 'second'],
      },
    };
  },
  containerId: 2595975,
};

export const resourceProvider = new MentionResource(apiConfig);

export class MockPresenceProvider {

  constructor(minTimeout, maxTimeout) {
    this._minTimeout = minTimeout || 0;
    this._maxTimeout = maxTimeout || 0;
    this._statuses = [
      'online',
      'away',
      'mobile',
      'dnd',
      'unavailable',
      null,
    ];
    this._listeners = new Map();
  }

  _getTimeout() {
    return this._minTimeout + (this._maxTimeout - this._minTimeout) * Math.random();
  }

  _getStatus() {
    return this._statuses[Math.floor(Math.random() * this._statuses.length)];
  }

  _getTime() {
    const minFormat = new Intl.NumberFormat('us-EN', { minimumIntegerDigits: 2 });
    let time;
    if (Math.random() > 0.5) {
      const hour = Math.floor(Math.random() * 12 + 1);
      const min = minFormat.format(new Date().getMinutes());
      const ampm = ['am', 'pm'][Math.floor(Math.random() * 2)];
      time = `${hour}:${min}${ampm}`;
    }
    return time;
  }

  refreshPresence(ids) {
    const precences = {};
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const status = this._getStatus();
      const time = this._getTime();

      if (status || time) {
        precences[id] = {
          status,
          time,
        };
      }
    }
    setTimeout(() => {
      this._listeners.forEach((listener, key) => {
        try {
          listener(precences);
        } catch (e) {
          // ignore error from listener
          debug(`error from listener '${key}', ignoring`, e);
        }
      });
    }, this._getTimeout());
  }

  subscribe(key, listener) {
    this._listeners.set(key, listener);
  }

  unsubscribe(key) {
    this._listeners.delete(key);
  }
}
