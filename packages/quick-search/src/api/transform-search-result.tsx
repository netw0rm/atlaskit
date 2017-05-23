import { Result } from '../types';

/**
 * Transform raw search result items from directory service's GraphQL API into objects adhering to
 * the shape expected by @atlaskit/quick-search.
 */
export function transform(item: GraphQLResult): Result {
  switch (item.type) {
    case 'hc.room': {
      let meta = mergedMeta(item.meta) as { [key in ChatRoomGraphQLResultMetaKey]: string };
      return {
        id: meta.conversationId,
        title: item.title,
        type: item.type,
        category: 'Conversations',
        avatarUrl: meta.avatarUrl,
        privacy: meta.privacy === 'private' ? 'private' : 'public',
      };
    }
    case 'mention': {
      let meta = mergedMeta(item.meta) as { [key in MentionGraphQLResultMetaKey]: string };
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        category: 'Conversations',
        avatarUrl: meta.avatarUrl,
      };
    }
    case 'jira.board':
    case 'jira.project':
    case 'confluence.page':
    case 'confluence.space':
      return {
        id: item.id,
        category: 'Other',
        title: item.title,
        type: item.type,
      };
  }
}

type ChatRoomGraphQLResultMetaKey = 'privacy' | 'topic' | 'conversationId' | 'isArchived' | 'avatarUrl';
interface ChatRoomGraphQLResult {
  type: 'hc.room';
  title: string;
  meta: { key: ChatRoomGraphQLResultMetaKey, value: string }[];
}

type MentionGraphQLResultMetaKey = 'mentionName' | 'avatarUrl';
interface MentionGraphQLResult {
  type: 'mention';
  id: string;
  title: string;
  meta: { key: MentionGraphQLResultMetaKey, value: string }[];
}

interface JiraBoardGraphQLResult {
  type: 'jira.board';
  id: string;
  title: string;
}

interface JiraProjectGraphQLResult {
  type: 'jira.project';
  id: string;
  title: string;
}

interface ConfluencePageGraphQLResult {
  type: 'confluence.page';
  id: string;
  title: string;
}

interface ConfluenceSpaceGraphQLResult {
  type: 'confluence.space';
  id: string;
  title: string;
}

export type GraphQLResult = ChatRoomGraphQLResult
  | MentionGraphQLResult
  | JiraBoardGraphQLResult
  | JiraProjectGraphQLResult
  | ConfluencePageGraphQLResult
  | ConfluenceSpaceGraphQLResult;

type GraphQLResultMeta = { key: string, value: string };

/**
 * Merge an array of meta items into a single object. An object data structure makes it trivial to
 * pluck out values for a particular key.
 */
function mergedMeta(metas: GraphQLResultMeta[]) {
  const merged = {};
  for (let meta of metas) {
    merged[meta.key] = meta.value;
  }
  return merged;
}
