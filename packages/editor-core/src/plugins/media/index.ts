// import { MediaNode } from './../../schema/nodes/media';
import {  Plugin, ProseMirror, Schema, inputRules } from '../../prosemirror';

import {
  MediaType,
  MediaNodeType
} from '../../schema';

import inputRule from './input-rule';
import { URL } from '../hyperlink/regex';

// import { MediaProvider } from '../../media';
// import { MediaPicker } from '@atlassian/mediapicker';
// import { StorybookTokenProvider } from '@atlaskit/media-test-helper';


// const collectionName = 'MediaServicesSample';

export type StateChangeHandler = (state: MediaPluginState) => any;

export class MediaPluginState {
  private pm: PM;
  public picker: any;

  constructor(pm: PM) {
    this.pm = pm;

    const rules = inputRules.ensure(pm);
    rules.addRule(inputRule);

    pm.content.addEventListener('pm-node-delete', (e: CustomEvent) => {
      // const node = e.detail.node as MediaNode;
      // TODO: Remove the node
      // debugger;
    });

    const urlRegex = new RegExp(`${URL.source}`);
    pm.on.domPaste.add((event: ClipboardEvent) => {
      const text = event.clipboardData.getData('text/plain');
      if (!text) {
        return;
      }

      const match = urlRegex.exec(text);

      if (!match || !match.length) {
        return;
      }

      const url = match[3] ? match[1] : `http://${match[1]}`;
      pm.content.dispatchEvent(new CustomEvent('shipit-link-added', {
        bubbles: true,
        cancelable: true,
        detail: {
          url: url
        }
      }));
    });

    // StorybookTokenProvider.tokenProvider().then(token => {
    //   this.picker = MediaPicker('popup', {
    //     apiClientId: '5a9812fc-d029-4a39-8a46-d3cc36eed7ab',
    //     apiUrl: 'https://dt-api.internal.app.dev.atlassian.io',
    //     tokenSource: {
    //       getter: (error, success) => {
    //         success(token);
    //       }
    //     },
    //     uploadParams: {
    //       collection: collectionName
    //     }
    //   });

    //   this.picker.on('upload-start', (obj) => {
    //     const file = obj.file;

    //     if (this.isImage(file.type) && file.size < 15728640) {
    //       this.fileToBase64(file.raw).then((base64) => {
    //         const trayItems2 = this.state.trayItems;
    //         const file2 = trayItems2[obj.file.id];
    //         file2.base64 = base64;
    //         this.setState({trayItems: trayItems2});
    //       });
    //     }
    //   });
    // });

    // StorybookTokenProvider.tokenProvider
  }

  insertMedia(mediaData?: MediaData) {
    const { media } = this.pm.schema.nodes;

    if (media && mediaData) {
      this.pm.tr.replaceSelection(media.create()).applyAndScroll();
    }
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(MediaPluginState, 'name', { value: 'MediaPluginState' });

export default function MediaPluginFactory () {
  return new Plugin(MediaPluginState);
};

export interface MediaPlugin extends Plugin<MediaPluginState> {};

export interface MediaData {
  id: string;
  type?: MediaType;
}

export interface S extends Schema {
  nodes: {
    media?: MediaNodeType
  };
}

export interface PM extends ProseMirror {
  schema: S;
}
