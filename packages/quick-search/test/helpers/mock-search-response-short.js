import raw from './mock-search-response-short.json';

const parsed = {
  Conversations: [
    {
      id: 'abcd-1234',
      type: 'mention',
      title: 'Jonathan Yeo',
      meta: {
        mentionName: 'jyeo',
        avatarUrl: 'https://avatar-cdn.stg.internal.atlassian.com/618f93d035043e3f9e2d4c243b5372fe',
      },
    },
    {
      id: 'abcd-1239',
      type: 'hc.room',
      title: 'Product Fabric Team',
      meta: {
        avatarUrl: 'https://product-fabric.atlassian.net/wiki/download/attachments/200360/PRODUCT?version=7&modificationDate=1487829825632&cacheVersion=1&api=v2',
        privacy: 'private',
        conversation_id: '20000000-1326-4663-a9f0-042054c5a0fe',
        is_archived: 'false',
      },
    },
  ],
  Issues: [
    {
      id: 'abcd-1234',
      type: 'jira.issue',
      title: 'Build analytics wallboard to highlight key metrics for each component',
      meta: {
        type: 'epic',
      },
    },
  ],
  Projects: [
    {
      id: 'abcd-1238',
      type: 'jira.project',
      title: 'Fabric (FAB)',
      meta: {
        avatarUrl: '',
      },
    },
  ],
  Boards: [
    {
      id: 'abcd-1240',
      type: 'jira.board',
      title: 'Fabric Services',
      meta: {
        avatarUrl: '',
      },
    },
  ],
};

export default { raw, parsed };
