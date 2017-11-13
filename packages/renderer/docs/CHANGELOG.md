# @atlaskit/renderer

## 12.0.0 (2017-11-13)









* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))




* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))




* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))









* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; render DecisionList and DecisionItem (issues closed: fs-1140) ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))


* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* bug fix; make sure renderer wraps unknown nodes in <span> (issues closed: ed-2154) ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

* feature; updated emoji dependency in renderer to have tooltipped emoji (issues closed: fs-1053) ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))



* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))
* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))

* feature; add applicationCard (issues closed: ed-1705) ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

* bug fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

* bug fix; remove numOfCards prop, always render FilmStripNavigator (issues closed: ed-1806) ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))




* feature; export interfaces/implementation of providers from mention, emoji and media (issues closed: fs-1029) ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))
* breaking; upgrade mentions and emoji in the renderer (issues closed: fs-1029) ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* bug fix; fix multiple spaces and tabs rendering (issues closed: ed-1800) ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))
* bug fix; add margin between sibling media groups (issues closed: ed-1798) ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))


* feature; adding code/codeBlock support to renderer/editor-hipchat (issues closed: ed-896) ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))


* bug fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))


* bug fix; handle whitespaces (space & tab) in renderer (issues closed: ed-1416) ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))
* feature; add rule support in renderer (issues closed: ed-901) ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))


* feature; add panel support in renderer (issues closed: ed-900) ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))



* feature; add blockquote support in renderer (issues closed: ed-894) ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* feature; deal with a next text attribute in emoji storage format for the renderer (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; add bulletList, orderedList & listItem support in renderer (issues closed: ed-895, ed-899, ed-905) ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))


* bug fix; render temporary media nodes (issues closed: ed-1669) ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))
* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

* bug fix; open links in new window (issues closed: ed-1236) ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* bug fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* breaking; ED-1690 ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))
* breaking; use new media components (issues closed: ed-1690) ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* bug fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))



* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; show loading in sample emoji data. (issues closed: fs-904) ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))
* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))
* bug fix; upgrade the media component state from mediastate immediately (issues closed: ed-1611) ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))

* breaking;  ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))
* breaking; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

* bug fix; don't render link-marks for unsafe URL-patterns (issues closed: ed-1409) ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

* bug fix; new lines aren't rendering in the web renderer (issues closed: ed-1418) ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))


* bug fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))



* feature; add support for emoji rendering (issues closed: fs-860) ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))





















* bug fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))








* feature; adding media to renderer (issues closed: ed-907) ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; add CodeMark support (issues closed: #ed-1075) ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

* feature; improved node and mark type checking (issues closed: ed-1048) ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))
* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* feature; add hardbreak node (issues closed: ed-903) ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

* bug fix; link now uses the href-attribute instead of URL (issues closed: ed-1002) ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

* bug fix; fixes rendering of text nodes with multiple marks (issues closed: ed-994) ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))




* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))


* bug fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))






## 11.0.0 (2017-11-13)








* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))




* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))




* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))









* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; render DecisionList and DecisionItem (issues closed: fs-1140) ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))


* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* bug fix; make sure renderer wraps unknown nodes in <span> (issues closed: ed-2154) ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

* feature; updated emoji dependency in renderer to have tooltipped emoji (issues closed: fs-1053) ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))



* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))
* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))

* feature; add applicationCard (issues closed: ed-1705) ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

* bug fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

* bug fix; remove numOfCards prop, always render FilmStripNavigator (issues closed: ed-1806) ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))




* feature; export interfaces/implementation of providers from mention, emoji and media (issues closed: fs-1029) ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))
* breaking; upgrade mentions and emoji in the renderer (issues closed: fs-1029) ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* bug fix; fix multiple spaces and tabs rendering (issues closed: ed-1800) ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))
* bug fix; add margin between sibling media groups (issues closed: ed-1798) ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))


* feature; adding code/codeBlock support to renderer/editor-hipchat (issues closed: ed-896) ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))


* bug fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))


* bug fix; handle whitespaces (space & tab) in renderer (issues closed: ed-1416) ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))
* feature; add rule support in renderer (issues closed: ed-901) ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))


* feature; add panel support in renderer (issues closed: ed-900) ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))



* feature; add blockquote support in renderer (issues closed: ed-894) ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* feature; deal with a next text attribute in emoji storage format for the renderer (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; add bulletList, orderedList & listItem support in renderer (issues closed: ed-895, ed-899, ed-905) ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))


* bug fix; render temporary media nodes (issues closed: ed-1669) ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))
* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

* bug fix; open links in new window (issues closed: ed-1236) ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* bug fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* breaking; ED-1690 ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))
* breaking; use new media components (issues closed: ed-1690) ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* bug fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))



* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; show loading in sample emoji data. (issues closed: fs-904) ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))
* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))
* bug fix; upgrade the media component state from mediastate immediately (issues closed: ed-1611) ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))

* breaking;  ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))
* breaking; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

* bug fix; don't render link-marks for unsafe URL-patterns (issues closed: ed-1409) ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

* bug fix; new lines aren't rendering in the web renderer (issues closed: ed-1418) ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))


* bug fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))



* feature; add support for emoji rendering (issues closed: fs-860) ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))





















* bug fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))








* feature; adding media to renderer (issues closed: ed-907) ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; add CodeMark support (issues closed: #ed-1075) ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

* feature; improved node and mark type checking (issues closed: ed-1048) ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))
* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* feature; add hardbreak node (issues closed: ed-903) ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

* bug fix; link now uses the href-attribute instead of URL (issues closed: ed-1002) ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

* bug fix; fixes rendering of text nodes with multiple marks (issues closed: ed-994) ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))




* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))


* bug fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))






## 10.0.0 (2017-11-13)







* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))




* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))




* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))









* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; render DecisionList and DecisionItem (issues closed: fs-1140) ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))


* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* bug fix; make sure renderer wraps unknown nodes in <span> (issues closed: ed-2154) ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

* feature; updated emoji dependency in renderer to have tooltipped emoji (issues closed: fs-1053) ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))



* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))
* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))

* feature; add applicationCard (issues closed: ed-1705) ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

* bug fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

* bug fix; remove numOfCards prop, always render FilmStripNavigator (issues closed: ed-1806) ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))




* feature; export interfaces/implementation of providers from mention, emoji and media (issues closed: fs-1029) ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))
* breaking; upgrade mentions and emoji in the renderer (issues closed: fs-1029) ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* bug fix; fix multiple spaces and tabs rendering (issues closed: ed-1800) ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))
* bug fix; add margin between sibling media groups (issues closed: ed-1798) ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))


* feature; adding code/codeBlock support to renderer/editor-hipchat (issues closed: ed-896) ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))


* bug fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))


* bug fix; handle whitespaces (space & tab) in renderer (issues closed: ed-1416) ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))
* feature; add rule support in renderer (issues closed: ed-901) ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))


* feature; add panel support in renderer (issues closed: ed-900) ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))



* feature; add blockquote support in renderer (issues closed: ed-894) ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* feature; deal with a next text attribute in emoji storage format for the renderer (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; add bulletList, orderedList & listItem support in renderer (issues closed: ed-895, ed-899, ed-905) ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))


* bug fix; render temporary media nodes (issues closed: ed-1669) ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))
* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

* bug fix; open links in new window (issues closed: ed-1236) ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* bug fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* breaking; ED-1690 ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))
* breaking; use new media components (issues closed: ed-1690) ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* bug fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))



* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; show loading in sample emoji data. (issues closed: fs-904) ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))
* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))
* bug fix; upgrade the media component state from mediastate immediately (issues closed: ed-1611) ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))

* breaking;  ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))
* breaking; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

* bug fix; don't render link-marks for unsafe URL-patterns (issues closed: ed-1409) ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

* bug fix; new lines aren't rendering in the web renderer (issues closed: ed-1418) ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))


* bug fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))



* feature; add support for emoji rendering (issues closed: fs-860) ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))





















* bug fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))








* feature; adding media to renderer (issues closed: ed-907) ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; add CodeMark support (issues closed: #ed-1075) ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

* feature; improved node and mark type checking (issues closed: ed-1048) ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))
* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* feature; add hardbreak node (issues closed: ed-903) ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

* bug fix; link now uses the href-attribute instead of URL (issues closed: ed-1002) ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

* bug fix; fixes rendering of text nodes with multiple marks (issues closed: ed-994) ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))




* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))


* bug fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))






## 9.0.0 (2017-11-09)






* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))




* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))




* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))









* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; render DecisionList and DecisionItem (issues closed: fs-1140) ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))


* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* bug fix; make sure renderer wraps unknown nodes in <span> (issues closed: ed-2154) ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

* feature; updated emoji dependency in renderer to have tooltipped emoji (issues closed: fs-1053) ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))



* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))
* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))

* feature; add applicationCard (issues closed: ed-1705) ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

* bug fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

* bug fix; remove numOfCards prop, always render FilmStripNavigator (issues closed: ed-1806) ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))




* feature; export interfaces/implementation of providers from mention, emoji and media (issues closed: fs-1029) ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))
* breaking; upgrade mentions and emoji in the renderer (issues closed: fs-1029) ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* bug fix; fix multiple spaces and tabs rendering (issues closed: ed-1800) ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))
* bug fix; add margin between sibling media groups (issues closed: ed-1798) ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))


* feature; adding code/codeBlock support to renderer/editor-hipchat (issues closed: ed-896) ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))


* bug fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))


* bug fix; handle whitespaces (space & tab) in renderer (issues closed: ed-1416) ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))
* feature; add rule support in renderer (issues closed: ed-901) ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))


* feature; add panel support in renderer (issues closed: ed-900) ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))



* feature; add blockquote support in renderer (issues closed: ed-894) ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* feature; deal with a next text attribute in emoji storage format for the renderer (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; add bulletList, orderedList & listItem support in renderer (issues closed: ed-895, ed-899, ed-905) ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))


* bug fix; render temporary media nodes (issues closed: ed-1669) ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))
* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

* bug fix; open links in new window (issues closed: ed-1236) ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* bug fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* breaking; ED-1690 ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))
* breaking; use new media components (issues closed: ed-1690) ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* bug fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))



* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; show loading in sample emoji data. (issues closed: fs-904) ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))
* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))
* bug fix; upgrade the media component state from mediastate immediately (issues closed: ed-1611) ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))

* breaking;  ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))
* breaking; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

* bug fix; don't render link-marks for unsafe URL-patterns (issues closed: ed-1409) ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

* bug fix; new lines aren't rendering in the web renderer (issues closed: ed-1418) ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))


* bug fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))



* feature; add support for emoji rendering (issues closed: fs-860) ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))





















* bug fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))








* feature; adding media to renderer (issues closed: ed-907) ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; add CodeMark support (issues closed: #ed-1075) ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

* feature; improved node and mark type checking (issues closed: ed-1048) ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))
* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* feature; add hardbreak node (issues closed: ed-903) ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

* bug fix; link now uses the href-attribute instead of URL (issues closed: ed-1002) ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

* bug fix; fixes rendering of text nodes with multiple marks (issues closed: ed-994) ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))




* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))


* bug fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))






## 8.0.0 (2017-11-09)





* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))




* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))




* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))









* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; render DecisionList and DecisionItem (issues closed: fs-1140) ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))


* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* bug fix; make sure renderer wraps unknown nodes in <span> (issues closed: ed-2154) ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

* feature; updated emoji dependency in renderer to have tooltipped emoji (issues closed: fs-1053) ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))



* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))
* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))

* feature; add applicationCard (issues closed: ed-1705) ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

* bug fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

* bug fix; remove numOfCards prop, always render FilmStripNavigator (issues closed: ed-1806) ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))




* feature; export interfaces/implementation of providers from mention, emoji and media (issues closed: fs-1029) ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))
* breaking; upgrade mentions and emoji in the renderer (issues closed: fs-1029) ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* bug fix; fix multiple spaces and tabs rendering (issues closed: ed-1800) ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))
* bug fix; add margin between sibling media groups (issues closed: ed-1798) ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))


* feature; adding code/codeBlock support to renderer/editor-hipchat (issues closed: ed-896) ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))


* bug fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))


* bug fix; handle whitespaces (space & tab) in renderer (issues closed: ed-1416) ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))
* feature; add rule support in renderer (issues closed: ed-901) ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))


* feature; add panel support in renderer (issues closed: ed-900) ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))



* feature; add blockquote support in renderer (issues closed: ed-894) ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))
* feature; deal with a next text attribute in emoji storage format for the renderer (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; add bulletList, orderedList & listItem support in renderer (issues closed: ed-895, ed-899, ed-905) ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))


* bug fix; render temporary media nodes (issues closed: ed-1669) ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))
* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

* bug fix; open links in new window (issues closed: ed-1236) ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* bug fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* breaking; ED-1690 ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))
* breaking; use new media components (issues closed: ed-1690) ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))

* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))
* breaking; renderer handles storage format where emoji's have a text attribute instead of fall (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* bug fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))



* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; show loading in sample emoji data. (issues closed: fs-904) ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))
* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))
* bug fix; upgrade the media component state from mediastate immediately (issues closed: ed-1611) ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))

* breaking;  ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))
* breaking; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

* bug fix; don't render link-marks for unsafe URL-patterns (issues closed: ed-1409) ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

* bug fix; new lines aren't rendering in the web renderer (issues closed: ed-1418) ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))


* bug fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))



* feature; add support for emoji rendering (issues closed: fs-860) ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))





















* bug fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))








* feature; adding media to renderer (issues closed: ed-907) ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; add CodeMark support (issues closed: #ed-1075) ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

* feature; improved node and mark type checking (issues closed: ed-1048) ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))
* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* feature; add hardbreak node (issues closed: ed-903) ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

* bug fix; link now uses the href-attribute instead of URL (issues closed: ed-1002) ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

* bug fix; fixes rendering of text nodes with multiple marks (issues closed: ed-994) ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))




* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))


* bug fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))






## 7.1.0 (2017-10-30)




* feature; migrate renderer from editor core ([a3cfd36](https://bitbucket.org/atlassian/atlaskit/commits/a3cfd36))






## 7.0.2 (2017-10-19)

* bug fix; export default TS file for local development, export couple of functions for React r ([af88191](https://bitbucket.org/atlassian/atlaskit/commits/af88191))
## 7.0.1 (2017-10-19)

* bug fix; copy all small files and validator from editor-core to renderer (issues closed: ed-3026) ([f86e146](https://bitbucket.org/atlassian/atlaskit/commits/f86e146))
## 7.0.0 (2017-10-18)


* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
## 6.0.0 (2017-10-18)

* breaking; Preparation work for splitting editor-core into editor and renderer. Renderer is now an empty ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
* breaking; clean all renderer files ([195d17f](https://bitbucket.org/atlassian/atlaskit/commits/195d17f))
## 5.6.1 (2017-10-12)

* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))
## 5.6.0 (2017-10-05)

* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))








## 5.5.2 (2017-07-25)

## 5.5.1 (2017-07-23)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 5.5.0 (2017-07-20)


* fix; bump test-decision dep due to release ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))


* feature; render DecisionList and DecisionItem ([ddf1ad9](https://bitbucket.org/atlassian/atlaskit/commits/ddf1ad9))

## 5.4.3 (2017-07-14)


* fix; show URL on link hover ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))

## 5.4.2 (2017-07-11)


* fix; bump emoji to the latest version ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

## 5.4.1 (2017-07-04)


* fix; edit blockquote styling ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))
* fix; make sure renderer wraps unknown nodes in <span> ([c0163d0](https://bitbucket.org/atlassian/atlaskit/commits/c0163d0))

## 5.4.0 (2017-06-30)


* feature; updated emoji dependency in renderer to have tooltipped emoji ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))

## 5.3.0 (2017-06-30)


* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))
* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))

## 5.2.0 (2017-06-26)


* feature; add applicationCard ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))

## 5.1.0 (2017-06-23)


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

## 5.0.2 (2017-06-21)


* fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

## 5.0.1 (2017-06-19)


* fix; remove numOfCards prop, always render FilmStripNavigator ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))

## 5.0.0 (2017-06-14)


* feature; export interfaces/implementation of providers from mention, emoji and media ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* feature; upgrade mentions and emoji in the renderer ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md

ISSUES CLOSED: FS-1029

## 4.2.2 (2017-05-31)

## 4.2.1 (2017-05-30)


* fix; add margin between sibling media groups ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))
* fix; fix multiple spaces and tabs rendering ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))

## 4.2.0 (2017-05-26)


* feature; adding code/codeBlock support to renderer/editor-hipchat ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

## 4.1.3 (2017-05-26)


* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

## 4.1.2 (2017-05-25)


* fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

## 4.1.1 (2017-05-24)


* fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))

## 4.1.0 (2017-05-24)

## 4.0.0 (2017-05-23)


* fix; handle whitespaces (space & tab) in renderer ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))


* feature; add rule support in renderer ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))

## 3.4.0 (2017-05-22)


* feature; add panel support in renderer ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))

## 3.3.0 (2017-05-19)


* feature; add blockquote support in renderer ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

## 3.2.0 (2017-05-19)


* feature; add bulletList, orderedList & listItem support in renderer ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))
* feature; deal with a next text attribute in emoji storage format for the renderer ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; renderer handles storage format where emoji's have a text attribute instead of fall ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))


* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 3.1.1 (2017-05-17)

## 3.1.0 (2017-05-17)


* fix; render temporary media nodes ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))


* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

## 3.0.0 (2017-05-17)


* fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* fix; open links in new window ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* fix; use new media components ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))


* feature; renderer handles storage format where emoji's have a text attribute instead of fall ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* breaking; ED-1690

ISSUES CLOSED: ED-1690
* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to
display (i.e. no fallback text)

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 2.1.2 (2017-05-11)


* fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))

## 2.1.1 (2017-05-10)

## 2.1.0 (2017-05-09)


* fix; upgrade the media component state from mediastate immediately ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))
* fix; show loading in sample emoji data. ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))


* feature; upgrade Emoji version to released version with breaking style changes ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))
* feature; upgrade emoji. Remove need for style overrides. ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))

## 2.0.0 (2017-05-04)


* fix; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))


* breaking; in renderer properties and document structure

Renderer component property

"mediaProvider" should now be an instance of the latest @atlaskit/media-core MediaProvider (i.e. it

must have a "viewContext", it can have a "stateManager" etc)

Renderer component property "document"

is changed for media-type nodes: there's no more "collectionId" array, use "collection" string

instead
* breaking; ED-1496

## 1.29.5 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.29.4 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.29.3 (2017-04-11)


* fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

## 1.29.2 (2017-04-11)


* fix; don't render link-marks for unsafe URL-patterns ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

## 1.29.1 (2017-04-11)


* fix; new lines aren't rendering in the web renderer ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))

## 1.29.0 (2017-04-07)


* fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))


* feature; add support for emoji rendering ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-02)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)


* fix; skiping tests on renderer pkg ([8e3d94b](https://bitbucket.org/atlassian/atlaskit/commits/8e3d94b))
* fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)


* feature; adding media to renderer ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))

## 1.6.1 (2017-03-21)

## 1.6.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.6.0 (2017-03-16)


* feature; add CodeMark support ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

## 1.5.0 (2017-03-15)


* feature; improved node and mark type checking ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))

## 1.4.0 (2017-03-13)


* feature; add hardbreak node ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

## 1.3.2 (2017-03-13)


* fix; link now uses the href-attribute instead of URL ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

## 1.3.1 (2017-03-08)


* fix; fixes rendering of text nodes with multiple marks ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))

## 1.1.0 (2017-03-03)

## 1.1.0 (2017-03-02)

## 1.1.0 (2017-03-02)


* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))

## 1.0.1 (2017-02-28)

## 1.0.1 (2017-02-28)


* fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))

## 1.0.0 (2017-02-28)


* Renderer ([ce13c25](https://bitbucket.org/atlassian/atlaskit/commits/ce13c25))
