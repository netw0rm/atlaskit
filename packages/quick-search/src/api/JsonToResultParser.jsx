import React from 'react';
import { AkContainerItemGroup } from '@atlaskit/navigation';
import { HipChatPersonResult, HipChatRoomResult, UnknownResult } from '../components/Result';

class /* interface */ ResultDataTransformer {
  /* Required method.  Takes object[], returns object[] */
  // transform() {}
}

class DefaultJsonParser extends /* implements*/ ResultDataTransformer {
  // eslint-disable-next-line class-methods-use-this
  formatMetaData(metaData) {
    return metaData.reduce(
      (obj, { key, value }) => ({ ...obj, [key]: value })
    , {});
  }

  // eslint-disable-next-line class-methods-use-this
  transform(jsonArray) {
    if (!jsonArray || !jsonArray.length) {
      return [];
    }
    return jsonArray.map(item => (
      item.meta && item.meta.length
        ? { ...item, meta: this.formatMetaData(item.meta) }
        : item
    ));
  }
}

class /* interface*/ ResultRenderer {
  /* Required method.  Takes object[], returns Component[] */
  render() {}
}

class DefaultResultRenderer extends /* implements*/ ResultRenderer {
  render(dataList) {
    if (!dataList || !dataList.length) {
      return [];
    }
    return dataList.map((data) => {
      if (!data || !data.type) {
        return null;
      }

      let className;
      let key = 'huh';
      switch (data.type) {
        case 'hc.room':
          className = HipChatRoomResult;
          key = `hc.room.${data.id}`;
          break;
        case 'mention':
          className = HipChatPersonResult;
          key = `hc.person.${data.id}`;
          break;
        default:
          className = UnknownResult;
          key = `${data.type}.${data.id}`;
      }

      return React.createElement(className, { key, ...data });
    });
  }
}

class /* interface*/ ResultComponentTransformer {
  /* Required method.  Takes Component[], returns Component[] */
  // transform() {}
}

class DefaultResultGrouper extends /* implements*/ ResultComponentTransformer {
  groupNameDictionary = {
    hc: 'HipChat',
    mention: 'HipChat',
    'jira-board': 'JIRA Boards',
    'jira-issue': 'JIRA Issues',
    'jira-project': 'JIRA Projects',
    'confluence-page': 'Confluence Pages',
    'confluence-space': 'Confluence Spaces',
  };

  getGroupName(key, defaultGroup = 'Other') {
    const groupKey = key.split('.')[0];
    return this.groupNameDictionary[groupKey] || defaultGroup;
  }

  transform(components) {
    if (!components || !components.length) {
      return [];
    }
    const groupedCmpnts = components.reduce((groups, result) => {
      const groupName = this.getGroupName(result.props.type);
      groups[groupName] = groups[groupName] || [];
      groups[groupName].push(result);
      return groups;
    }, {});

    return Object.keys(groupedCmpnts).map((group) => {
      const memberCmpnts = groupedCmpnts[group];
      return (
        <AkContainerItemGroup title={group} key={group}>
          {memberCmpnts}
        </AkContainerItemGroup>
      );
    });
  }
}

export default class JsonToResultParser {

  constructor(options) {
    /** todo: TS checks */
    const dataTransf =
      options
      && Array.isArray(options.dataTransformers)
      && options.dataTransformers;

    const renderer = options && options.renderer;

    const cmpntTransf =
      options
      && Array.isArray(options.componentTransformers)
      && options.componentTransformers;

    this.dataTransformers = dataTransf || [new DefaultJsonParser()];
    this.renderer = renderer || new DefaultResultRenderer();
    this.componentTransformers = cmpntTransf || [new DefaultResultGrouper()];
  }

  parse(data) {
    if (!data) {
      return null;
    }
    const XformedData = this.applyDataTransformations(data);
    const componentList = this.renderer.render(XformedData);
    const XformedCmpntList = this.applyComponentTransformations(componentList);
    return XformedCmpntList;
  }

  /** TODO: Should these accept functions as well as transformer objects? */
  applyDataTransformations(data) {
    return this.dataTransformers.reduce(
        ((XformedData, transformer) => transformer.transform(data))
      , data);
  }

  applyComponentTransformations(componentList) {
    return this.componentTransformers.reduce(
      (XformedCmpnts, transformer) => transformer.transform(componentList)
    , componentList);
  }

}
