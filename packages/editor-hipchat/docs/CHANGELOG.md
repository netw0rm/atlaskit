# @atlaskit/editor-hipchat

## 5.4.3 (2017-09-12)


* bug fix; long links pushes content and button outside of viewable area (issues closed: ed-2707) ([a830bf1](https://bitbucket.org/atlassian/atlaskit/commits/a830bf1))
## 5.4.2 (2017-09-12)

* bug fix; long links pushes content and button outside of viewable area (issues closed: ed-2707) ([a830bf1](https://bitbucket.org/atlassian/atlaskit/commits/a830bf1))
## 5.4.1 (2017-09-11)

* bug fix; fix dependency in story to get emoji support files via the Editor. ([6b20943](https://bitbucket.org/atlassian/atlaskit/commits/6b20943))
* bug fix; reset version.ts ([e3eccf1](https://bitbucket.org/atlassian/atlaskit/commits/e3eccf1))
* bug fix; remove explicit dependency on emoji and get it via editor-core ([7d83371](https://bitbucket.org/atlassian/atlaskit/commits/7d83371))
## 5.4.0 (2017-09-06)


* feature; support inbuild media/action/decision toolbar buttons (issues closed: fs-1342) ([14d35ed](https://bitbucket.org/atlassian/atlaskit/commits/14d35ed))
## 5.3.1 (2017-09-05)

* bug fix; eNTER on empty action/decision will not submit message, but remove action/decision (issues closed: fs-1329 / fs-1265) ([1ec4bf4](https://bitbucket.org/atlassian/atlaskit/commits/1ec4bf4))
## 5.3.0 (2017-09-01)

* feature; updated core version to 46.12.0 ([c097ac7](https://bitbucket.org/atlassian/atlaskit/commits/c097ac7))

## 5.2.0 (2017-08-29)

* feature; upgrade editor-core to minimum required version for emoji toolbar (issues closed: fs-1320) ([14e9661](https://bitbucket.org/atlassian/atlaskit/commits/14e9661))
* feature; add support for an inbuilt toolbar with Emoji picker button (issues closed: fs-1320) ([5c7209a](https://bitbucket.org/atlassian/atlaskit/commits/5c7209a))
## 5.1.1 (2017-08-29)


* bug fix; refactored canSubmit ([69e4ffc](https://bitbucket.org/atlassian/atlaskit/commits/69e4ffc))
* bug fix; refactored handleSubmit ([113ea08](https://bitbucket.org/atlassian/atlaskit/commits/113ea08))

* bug fix; fixed pressing Enter in hipchat (issues closed: ed-2447) ([c5d6775](https://bitbucket.org/atlassian/atlaskit/commits/c5d6775))


## 5.1.0 (2017-08-28)

* feature; adding list plugin to editor hipchat. ([4b7f461](https://bitbucket.org/atlassian/atlaskit/commits/4b7f461))
## 5.0.0 (2017-08-23)

* breaking; Upgrade to next major editor-core and other deps ([6fc0888](https://bitbucket.org/atlassian/atlaskit/commits/6fc0888))
* breaking; upgrade editor-core and other dependencies. (issues closed: fs-1298) ([6fc0888](https://bitbucket.org/atlassian/atlaskit/commits/6fc0888))
## 4.18.1 (2017-08-15)

* bug fix; fix storybooks for editor-hipchat ([43c6200](https://bitbucket.org/atlassian/atlaskit/commits/43c6200))



## 4.18.0 (2017-08-10)

* feature; fix plaintext link detection, enable markdown and code detection on paste (issues closed: ed-2446) ([8177e36](https://bitbucket.org/atlassian/atlaskit/commits/8177e36))
## 4.17.1 (2017-08-03)

* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))





## 4.17.0 (2017-07-28)


* feature; bump editor-core in all editor-* packages ([afff5ab](https://bitbucket.org/atlassian/atlaskit/commits/afff5ab))

## 4.16.0 (2017-07-25)


* feature; change es2015 build so it transpiles everything except import/export statements ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))

## 4.15.0 (2017-07-24)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))


* feature; enable decision support via <> syntax in editor-hipchat ([a86f80f](https://bitbucket.org/atlassian/atlaskit/commits/a86f80f))

## 4.14.1 (2017-07-13)


* fix; bump editor-core in all editor-* packages ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))
* fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))
* fix; re-releasing packages that failed previous release ([bf1ab9c](https://bitbucket.org/atlassian/atlaskit/commits/bf1ab9c))

## 4.14.0 (2017-07-05)


* feature; updated editor-core package in editor-hipchat to includes media links. ([f4336f6](https://bitbucket.org/atlassian/atlaskit/commits/f4336f6))

## 4.13.1 (2017-06-29)


* fix; use latest editor-core + hipchatSchema ([ceba4a2](https://bitbucket.org/atlassian/atlaskit/commits/ceba4a2))

## 4.13.0 (2017-06-20)


* feature; add support for ascii emoji support to editor-hipchat ([1800e0a](https://bitbucket.org/atlassian/atlaskit/commits/1800e0a))

## 4.12.0 (2017-06-19)


* fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))


* feature; enabling blockquotes ([d026540](https://bitbucket.org/atlassian/atlaskit/commits/d026540))

## 4.11.1 (2017-06-16)


* fix; use latest editor-core with new dropdowns/popup ([d78e36b](https://bitbucket.org/atlassian/atlaskit/commits/d78e36b))

## 4.11.0 (2017-06-15)


* fix; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))


* feature; export resource/providers from editor-hipchat ([c9a127b](https://bitbucket.org/atlassian/atlaskit/commits/c9a127b))
* feature; upgrade editor-core along with emoji/mentions. ([ebd4dbd](https://bitbucket.org/atlassian/atlaskit/commits/ebd4dbd))


* breaking; ED-1704

## 4.10.0 (2017-06-07)


* feature; updated Hipchat to have hyperlink new behaviours. ([8cc200f](https://bitbucket.org/atlassian/atlaskit/commits/8cc200f))

## 4.9.1 (2017-06-05)


* fix; removing floating toolbars ([acd499b](https://bitbucket.org/atlassian/atlaskit/commits/acd499b))
* fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))

## 4.9.0 (2017-06-02)


* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

## 4.8.2 (2017-05-30)

## 4.8.1 (2017-05-29)


* fix; bump editor-core dependency to publish a new editor-hipchat ([1d9b429](https://bitbucket.org/atlassian/atlaskit/commits/1d9b429))
* fix; remove docCompact and "compact" behaviour ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))

## 4.8.0 (2017-05-26)


* fix; pulling out styling ([b545b4f](https://bitbucket.org/atlassian/atlaskit/commits/b545b4f))


* feature; adding code/codeBlock support to renderer/editor-hipchat ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

## 4.7.2 (2017-05-26)


* fix; use latest editor-core without jquery peerDep ([90a62ab](https://bitbucket.org/atlassian/atlaskit/commits/90a62ab))

## 4.7.1 (2017-05-26)


* fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))
* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))
* fix; use new nodeviews ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))

## 4.7.0 (2017-05-17)


* feature; add API for adding media files from data urls. ([49aaf57](https://bitbucket.org/atlassian/atlaskit/commits/49aaf57))

## 4.6.1 (2017-05-17)


* fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))
* fix; use new storyMediaProviderFactory API for stories and tests ([23053f3](https://bitbucket.org/atlassian/atlaskit/commits/23053f3))

## 4.6.0 (2017-05-11)


* feature; adds support for analytics handler ([bc0405c](https://bitbucket.org/atlassian/atlaskit/commits/bc0405c))

## 4.5.2 (2017-05-10)

## 4.5.1 (2017-05-10)


* fix; relax schema, disable compact media plugin behaviour. ([ea2f8e5](https://bitbucket.org/atlassian/atlaskit/commits/ea2f8e5))

## 4.5.0 (2017-05-10)


* fix; fix peer dependency version for emoji in editor-hipchat ([845eb6c](https://bitbucket.org/atlassian/atlaskit/commits/845eb6c))


* feature; adds support for autoformatting ([264e5b8](https://bitbucket.org/atlassian/atlaskit/commits/264e5b8))

## 4.4.0 (2017-05-09)


* feature; bump editor-core with squashed emoji fix ([b1f109b](https://bitbucket.org/atlassian/atlaskit/commits/b1f109b))

## 4.3.0 (2017-05-09)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; use createSchema helper in editor-hipchat ([02cf399](https://bitbucket.org/atlassian/atlaskit/commits/02cf399))

## 4.2.1 (2017-05-03)

## 4.2.1 (2017-05-03)

## 4.2.0 (2017-05-03)


* fix; fix editor-hipchat tslint errors ([509f604](https://bitbucket.org/atlassian/atlaskit/commits/509f604))


* feature; export HipChat schema. ([c50efd7](https://bitbucket.org/atlassian/atlaskit/commits/c50efd7))

## 4.1.0 (2017-05-03)


* feature; add support for compact behaviour, add media support to editor-hipchat, update editor-hipchat schema to one paragraph only ([f8fe04d](https://bitbucket.org/atlassian/atlaskit/commits/f8fe04d))

## 4.0.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 4.0.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 4.0.0 (2017-04-19)


* feature; use new fabric format ([477145c](https://bitbucket.org/atlassian/atlaskit/commits/477145c))


* breaking; The editor will now use the new format by default. Use the "useLegacyFormat" property if you need to

use the old format.

ISSUES CLOSED: ED-998

## 2.0.0 (2017-04-12)

## 2.0.0 (2017-04-12)


* feature; adding emoji support ([2ac5673](https://bitbucket.org/atlassian/atlaskit/commits/2ac5673))
* feature; upgrading to latest version of editor-core ([cb221c7](https://bitbucket.org/atlassian/atlaskit/commits/cb221c7))


* breaking; Renamed prop mentionResourceProvider to mentionProvider. Renamed prop presenceResourceProvider to

presenceProvider. Prop mentionProvider now expects a Promise.

## 1.5.2 (2017-03-31)


* fix; bumped editor-core in editor-hipchat so it uses mentions v4 ([b80b585](https://bitbucket.org/atlassian/atlaskit/commits/b80b585))

## 1.5.1 (2017-03-24)


* fix; bumped editor-core dependency (^5.0.0 to ^7.6.0) for editor-hipchat ([ba2387e](https://bitbucket.org/atlassian/atlaskit/commits/ba2387e))

## 1.5.0 (2017-03-22)


* feature; repalce ak* -> [@atlaskit](https://github.com/atlaskit), remove redundant deps ([d282cf4](https://bitbucket.org/atlassian/atlaskit/commits/d282cf4))

## 1.4.1 (2017-03-21)

## 1.4.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))
* fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))

## 1.4.0 (2017-03-08)

## 1.3.1 (2017-03-07)


* fix; bumping editor-core ([c2139ab](https://bitbucket.org/atlassian/atlaskit/commits/c2139ab))


* feature; adding DefaultKeymapsPlugin to HipChat editor for new redo commands. ([704a053](https://bitbucket.org/atlassian/atlaskit/commits/704a053))

## 1.3.0 (2017-03-06)


* feature; adding support for em, strong and underline ([12f0f47](https://bitbucket.org/atlassian/atlaskit/commits/12f0f47))

## 1.2.3 (2017-03-03)


* fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* fix; updating editor-core version ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))

## 1.2.2 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 1.2.1 (2017-02-23)


* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.2.0 (2017-02-20)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.1.0 (2017-02-16)


* feature; Mention improvments ([4af4638](https://bitbucket.org/atlassian/atlaskit/commits/4af4638))

## 1.0.1 (2017-02-07)


* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))
