export interface ActivityItem {
  objectId: string;
  name: string;
  container: string;
  url: string;
  iconUrl: string;
}

export interface ActivityResponse {
  data: Array<ActivityItem>;
}

export interface ActivityProvider {
  getRecentItems(): Promise<Array<ActivityItem>>;
  getFrequentItems(): Promise<Array<ActivityItem>>;
  searchRecent(query: string): Promise<Array<ActivityItem>>;
}
