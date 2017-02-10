// import { Promise } from 'es6-promise';

export { EditorServicesConfig } from './editor-services-config';


// type ServiceEnvironment = 'localhost' | 'ddev' | 'staging' | 'production';
// class AtlassianDefaultConfigFactory {
//   // give me a provider for specific service
//   getMentionResourceProvider(environment: ServiceEnvironment): Promise<MentionResource>
//   getEmojiResourceProvider(environment: ServiceEnvironment): Promise<EmojiResource>
//   getMediaResourceProvider(environment: ServiceEnvironment): Promise<MediaResource>
//   getReactionsResourceProvider(environment: ServiceEnvironment): Promise<ReactionsResource>;

//   // give me a ready to use config that is using Atlassian defaults
//   getEditorServicesConfig(environment: ServiceEnvironment): EditorServicesConfig {
//     return {
//       mentionResourceProvider: this.getMentionResourceProvider(environment),
//       emojiResourceProvider: this.getEmojiResourceProvider(environment),
//       reactionsResourceProvider: this.getReactionsResourceProvider(environment),
//       mediaResourceProvider: this.getMediaResourceProvider(environment)
//     };
//   }
// }

// type foo extends EditorServicesConfig = {
//   bar: string;
// }


// interface Resource {};

// type EditorServicesConfig = {
//     [serviceName: string]: Promise<Resource>;
// };

// An async function providing
// async function constructEmojiResource(): Promise<EmojiResource> {
//   return new Promise(function(resolve, reject) {
//     const resource = new DefaultEmojiResource();

//     // Initialize the resource by loading all emoji metadata
//     resource.loadAllEmoji.then(() => {
//       resolve(resource);
//     }, reject);
//   });
// };

