import { AbstractMentionResource } from '@atlaskit/mention';

import { Search } from 'js-search';
import mentionData from './mention-data';

const search = new Search('id');
search.addIndex(['attributes', 'display_name']);
search.addIndex(['attributes', 'username']);
search.addDocuments(mentionData.results);

export default class MentionResource extends AbstractMentionResource {
  filter(query: string) {
    const notify = (mentions: any) => {
      this._notifyListeners(mentions);
    };

    const notifyInfo = (info: string) => {
      this._notifyInfoListeners(info);
    };

    if (query.length < 3) {
      notifyInfo('Continue typing to search for a user');
      return;
    }

    const results = search.search(query);

    if (!results.length) {
      if (query.length >= 3) {
        notifyInfo(`Found no matches for ${query}`);
      }
      notify({mentions: []});
    } else {
      const allMentions = results.map((item, index) => {
        return {
          'id': item.attributes.username,
          'name': item.attributes.display_name,
          'mentionName': item.attributes.username,
          'avatarUrl': item.attributes.avatar_url,
          'lozenge': item.attributes.is_teammate ? 'teammate' : null
        };
      }).sort((itemA, itemB) => itemA.name < itemB.name ? 0 : 1 ); // Sort by name

      // Display teammates first
      const mentions = [
        ...allMentions.filter(item => !!item.lozenge),
        ...allMentions.filter(item => !item.lozenge)
      ];

      notify({ mentions });
    }
  }
}
