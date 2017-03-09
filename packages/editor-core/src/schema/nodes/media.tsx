import { LinkCard, LinkCardViewHorizontal } from '@atlaskit/media-card';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { Attribute, Block, Node, Schema } from '../../prosemirror';
// import sampleImage from '../../../stories/_sampleImage';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import { MediaCollectionId, default as MediaProvider } from '../../media';
import { ContextConfig, ContextFactory, Context, CardDelete } from '@atlaskit/media-core';

// import { EditorServicesConfig } from '../../config';


const mediaStyle = style({
  display: 'block',
  // width: width,
  // height: height,
  verticalAlign: 'middle',
  '-moz-user-select': 'all',
  '-webkit-user-select': 'all',
  '-ms-user-select': 'all',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      outline: 'none',
      $nest: {
        '&&> div': {
          outline: '2px solid #8cf',
          background: akColorN50,
        }
      }
    },
      // width: width,
      // height: height,

      // $nest: {
      //   '> div': {
      //     margin: '0',
      //     width: width,
      //     height: height,
      //   }
      // }
    }
  // }
});

export type MediaType = 'file' | 'link';

export interface MediaNodeType extends Block {};

interface Attributes {
  id: string;
  type: MediaType;
  collectionId?: MediaCollectionId;
  url?: string;
};

interface Props extends Attributes {
  mediaProvider?: Promise<MediaProvider>;
  onDelete?: () => void;
};

interface State {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
}

export default class MediaComponent extends React.PureComponent<Props, State> {
  state: State = {};

  public componentWillMount() {
    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  render() {
    switch (this.props.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private handleMediaProvider = (mediaProvider: MediaProvider) => {
    this.setState({ ...this.state, mediaProvider });

    mediaProvider.getViewContext().then((contextConfig: ContextConfig) => {
      this.setState({
         ...this.state,
         viewContext: ContextFactory.create(contextConfig)
        });
    });
  }

  private renderLink() {
    const { mediaProvider, viewContext } = this.state;
    const { id, collectionId, url, onDelete } = this.props;

    if ( !mediaProvider || !viewContext ) {
      return <LinkCardViewHorizontal
        title=" ... loading"
        linkUrl=""
        onClick={(event: Event) => event.preventDefault()}
      />;
    }

    return (
      <LinkCard
        context={viewContext}
        menuActions={[ CardDelete(onDelete) ]}
        link={id ? { id: id!, collection: (collectionId ? collectionId : '')} : url!}
      />
    );
  }

  private renderFile() {
    return null;
    /*<CardView
        loading={false}
        selectable={false}
        selected={false}
        mediaName="some image"
        mediaType="image"
        mediaSize={32831}
        dataURI={sampleImage}
      />*/
  }
}

export class MediaNodeType extends Block {
  private mediaProvider?: Promise<MediaProvider>;

  constructor(name: string, schema: Schema) {
    super(name, schema);

    if (name !== 'media') {
      throw new Error('MediaNodeType must be named "media".');
    }
  }

  get attrs() {
    return {
      id: new Attribute({ default: null }),
      type: new Attribute({ default: 'file' }),
      collectionId: new Attribute({ default: null }),
      url: new Attribute({ default: null }),
    };
  }

  get matchDOMTag() {
    return {
      'div[data-node-type="media"]': (dom: Element) => ({
        id: (dom.getAttribute('data-id') || ''),
        type: dom.getAttribute('data-type')!,
        collectionId: dom.getAttribute('data-collection-id')!,
        url: dom.getAttribute('data-url')!,
      })
    };
  }

  toDOM(node: MediaNode): any {
    const div = document.createElement('div');
    // div.setAttribute('contenteditable', 'true');
    div.setAttribute('data-node-type', 'media');
    div.setAttribute('data-id', node.attrs.id);
    div.setAttribute('data-type', node.attrs.type);
    div.setAttribute('data-collection-id', node.attrs.collectionId!);
    div.setAttribute('data-url', node.attrs.url!);
    div.style.marginTop = '5px';
    div.classList.add(mediaStyle);
    // ReactDOM.render(<Media {...node.attrs} />, div);
    ReactDOM.render(
      <MediaComponent
        mediaProvider={this.mediaProvider!}
        onDelete={() => {
          div.dispatchEvent(new CustomEvent('pm-node-delete', {
            bubbles: true,
            cancelable: true,
            detail: { node: node }
          }));
        }}
        {...node.attrs}
      />
      , div
    );

    return div;
  }

  setMediaProvider(mediaProvider: Promise<MediaProvider>) {
    this.mediaProvider = mediaProvider;
  }
}

export interface MediaNode extends Node {
  type: MediaNodeType;
  attrs: Attributes;
}

export function isMediaNode(node: Node): node is MediaNode {
  return node.type instanceof MediaNodeType;
}
