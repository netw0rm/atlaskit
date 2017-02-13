import { EditorServicesConfig, MediaResource, MediaViewContextScope } from '../../src';
import { JwtTokenProvider } from '@atlaskit/media-core';
import { name } from '../../package.json';
import { EmojiResource } from 'ak-emoji';
import { MentionResource } from 'ak-mention';
import * as chai from 'chai';
const { expect } = chai;

describe(name, () => {
  describe('EditorServicesConfig interface', () => {
    // The following test is non-functional but reinforces the types we import
    // from editor-core and external packages. This file will fail to compile
    // if any of the related packages' APIs change.
    it('should compile with TypeScript.', () => {
      const stubJwtTokenProvider: JwtTokenProvider = (collectionName?: string) => {
        return new Promise((resolve) => {
          resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
        });
      };

      const configInstance: EditorServicesConfig = {
        emojiResourceProvider: function (): Promise<EmojiResource> {
          return new Promise((resolve) => {
            resolve(new EmojiResource());
          });
        },
        mediaResourceProvider: function (): Promise<MediaResource> {
          return new Promise((resolve) => {
            resolve({
              getUploadContext() {
                  return resolve({
                    clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
                    serviceHost: 'http://media-api.host.com',
                    tokenProvider: stubJwtTokenProvider
                  });
              },
              getViewContext(scope?: MediaViewContextScope){
                return new Promise((resolve) => {
                  return resolve({
                    clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
                    serviceHost: 'http://media-api.host.com',
                    tokenProvider: stubJwtTokenProvider
                  });
                });
              }
            });
          });
        },
        mentionResourceProvider: function (): Promise<MentionResource> {
          return new Promise((resolve) => {
            resolve(new MentionResource());
          });
        },
        reactionsResourceProvider: function (): Promise<any> {
          return new Promise((resolve) => {
            resolve({
              TBD: 'TBD'
            });
          });
        },
      };

      expect(configInstance).to.be.an('object');
      expect(configInstance.emojiResourceProvider!()).to.be.a('Promise');
      expect(configInstance.mediaResourceProvider!()).to.be.a('Promise');
      expect(configInstance.mentionResourceProvider!()).to.be.a('Promise');
      expect(configInstance.reactionsResourceProvider!()).to.be.a('Promise');
    });
  });
});
