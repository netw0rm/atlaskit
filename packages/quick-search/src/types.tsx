export interface RoomResult {
  id: string;
  title: string;
  type: 'hc.room';
  category: string;
  avatarUrl: string;
  privacy: 'private' | 'public';
}

export interface MentionResult {
  id: string;
  title: string;
  type: 'mention';
  category: string;
  avatarUrl: string;
}

export interface OtherResult {
  id: string;
  title: string;
  type: 'jira.board' | 'jira.project' | 'confluence.page' | 'confluence.space';
  category: string;
}

/**
 * A search result.
 */
export type Result = RoomResult
  | MentionResult
  | OtherResult;
