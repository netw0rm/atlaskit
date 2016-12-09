import { AbstractPresenceResource } from '../src/api/ak-mention-resource';
import debug from '../src/util/logger';

export default class MockPresenceProvider extends AbstractPresenceResource {

  constructor(minTimeout, maxTimeout) {
    super();
    this._minTimeout = minTimeout || 0;
    this._maxTimeout = maxTimeout || 0;
    this._statuses = [
      'online',
      'offline',
      'busy',
      'none',
      undefined,
    ];
    this._listeners = new Map();
  }

  _getTimeout() {
    return this._minTimeout + ((this._maxTimeout - this._minTimeout) * Math.random());
  }

  _getStatus() {
    return this._statuses[Math.floor(Math.random() * this._statuses.length)];
  }

  // eslint-disable-next-line class-methods-use-this
  _getTime() {
    const minFormat = new Intl.NumberFormat('us-EN', { minimumIntegerDigits: 2 });
    let time;
    if (Math.random() > 0.5) {
      const hour = Math.floor(Math.random() * 12) + 1;
      const min = minFormat.format(new Date().getMinutes());
      const ampm = ['am', 'pm'][Math.floor(Math.random() * 2)];
      time = `${hour}:${min}${ampm}`;
    }
    return time;
  }

  refreshPresence(ids) {
    debug('_mock_presence_provider.refreshPresence', ids);
    const presences = {};
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const status = this._getStatus();
      const time = this._getTime();

      if (status || time) {
        presences[id] = {
          status,
          time,
        };
      }
    }
    setTimeout(() => {
      this._notifyListeners(presences);
    }, this._getTimeout());
  }
}
