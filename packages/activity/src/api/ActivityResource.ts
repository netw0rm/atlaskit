import { RequestServiceOptions, ServiceConfig, utils } from '@atlaskit/util-service-support';
import { ActivityItem, ActivityResponse, ActivityProvider } from '../types';

export default class ActivityResource implements ActivityProvider {
  private frequentPromise?: Promise<ActivityResponse>;
  private recentPromise?: Promise<ActivityResponse>;

  private serviceConfig: ServiceConfig;
  private cloudId: string;

  constructor(baseUrl: string, cloudId: string) {
    this.serviceConfig = { url: baseUrl };
    this.cloudId = cloudId;
  }

  public async getFrequentItems() {
    if (!this.frequentPromise) {
      const options: RequestServiceOptions = {
        path: 'api/frequent',
        queryParams: {
          'cloudId': this.cloudId
        },
        requestInit: {
          mode: 'cors' as 'cors'
        }
      };

      this.frequentPromise = utils.requestService(this.serviceConfig, options);
    }

    const response = await this.frequentPromise;
    return response.data;
  }

  public async getRecentItems() {
    if (!this.recentPromise) {
      const options: RequestServiceOptions = {
        path: 'api/client/recent',
        queryParams: {
          'cloudId': this.cloudId
        },
        requestInit: {
          mode: 'cors' as 'cors'
        }
      };

      this.recentPromise = utils.requestService(this.serviceConfig, options);
    }

    const response = await this.recentPromise;
    return response.data;
  }

  public async searchRecent(search: string) {
    const items = await this.getRecentItems();
    return this.filterItems(items, search);
  }

  private filterItems(items: Array<ActivityItem>, searchTerm: string) {
    if (searchTerm.length === 0) {
      return [];
    }

    searchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm) > -1;
    });
  }
}
