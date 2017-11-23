import { AbstractPresenceResource } from '../api/PresenceResource';
import debug from '../util/logger';

export default class MockPresenceProvider extends AbstractPresenceResource {
  private minTimeout: number;
  private maxTimeout: number;
  private statuses: (string | undefined)[];

  constructor(minTimeout?: number, maxTimeout?: number) {
    super();
    this.minTimeout = minTimeout || 0;
    this.maxTimeout = maxTimeout || 0;
    this.statuses = [
      'online',
      'offline',
      'busy',
      'focus',
      'none',
      undefined,
    ];
  }

  private getTimeout() {
    return this.minTimeout + ((this.maxTimeout - this.minTimeout) * Math.random());
  }

  private getStatus() {
    return this.statuses[Math.floor(Math.random() * this.statuses.length)];
  }

  // eslint-disable-next-line class-methods-use-this
  private getTime() {
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
      const status = this.getStatus();
      const time = this.getTime();

      if (status || time) {
        presences[id] = {
          status,
          time,
        };
      }
    }
    setTimeout(() => {
      this.notifyListeners(presences);
    }, this.getTimeout());
  }
}
