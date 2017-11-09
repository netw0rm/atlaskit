# @atlaskit/editor-cq

## 6.0.0 (2017-11-09)


* breaking; Upgraded mediaProvider API to use the new media picker authentication ([af6da7f](https://bitbucket.org/atlassian/atlaskit/commits/af6da7f))
* breaking; fixed mentions and upgrade editor-core version. ([af6da7f](https://bitbucket.org/atlassian/atlaskit/commits/af6da7f))

* bug fix; added missing method _notifyAllResultsListeners to mention mock service and fixed re ([f057300](https://bitbucket.org/atlassian/atlaskit/commits/f057300))
* feature; bumping editor-core to 47.17.0 (issues closed: ed-2953) ([fcb32af](https://bitbucket.org/atlassian/atlaskit/commits/fcb32af))

* feature; bump editor-core to the latest version (issues closed: ed-2879) ([ad1a82e](https://bitbucket.org/atlassian/atlaskit/commits/ad1a82e))

* bug fix; bump editor-core major version ([fca90e4](https://bitbucket.org/atlassian/atlaskit/commits/fca90e4))

* bug fix; fix save button has spinner during media upload (issues closed: ed-2273) ([67a5997](https://bitbucket.org/atlassian/atlaskit/commits/67a5997))


* bug fix; fire onChange only when docChanged = true (issues closed: ed-2421) ([5605a74](https://bitbucket.org/atlassian/atlaskit/commits/5605a74))
* bug fix; remove encoder/parser from editor-cq (issues closed: ed-2615) ([42bb27c](https://bitbucket.org/atlassian/atlaskit/commits/42bb27c))





* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))

* bug fix; trigger a release for editor-cq (issues closed: ed-2359) ([9ac1dae](https://bitbucket.org/atlassian/atlaskit/commits/9ac1dae))
* bug fix; Merged in ED-2359/just-trigger-the-release (pull request #3899) (issues closed: ed-2359) ([6693362](https://bitbucket.org/atlassian/atlaskit/commits/6693362))



* bug fix; analytics' events for media not being sent. (issues closed: ed-2422) ([dec1fb4](https://bitbucket.org/atlassian/atlaskit/commits/dec1fb4))

* bug fix; fix plaintext link detection, enable markdown and code detection on paste ([00385bd](https://bitbucket.org/atlassian/atlaskit/commits/00385bd))





* feature; expose EditorView from editor-cq (issues closed: ed-2463) ([1312b8d](https://bitbucket.org/atlassian/atlaskit/commits/1312b8d))
* bug fix; cxHTML decoder doesn't support media in a non-empty <p> (issues closed: ed-2438) ([e7d78be](https://bitbucket.org/atlassian/atlaskit/commits/e7d78be))


* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))





* feature; bump editor-core in all editor-* packages ([afff5ab](https://bitbucket.org/atlassian/atlaskit/commits/afff5ab))

* feature; added tablesEnabled prop to editor-cq (issues closed: ed-2335) ([bb727d6](https://bitbucket.org/atlassian/atlaskit/commits/bb727d6))



* bug fix; fix media node to comply with editor-core breaking changes (issues closed: ed-2333) ([771dbdb](https://bitbucket.org/atlassian/atlaskit/commits/771dbdb))
* feature; made weakmap with parsed nodes global ([81b3244](https://bitbucket.org/atlassian/atlaskit/commits/81b3244))

* feature; added tables encoder for cq ([54414b8](https://bitbucket.org/atlassian/atlaskit/commits/54414b8))
* bug fix; fixed table parser for CQ ([1ed29af](https://bitbucket.org/atlassian/atlaskit/commits/1ed29af))
* feature; added parser for tables (issues closed: ed-2215) ([5fc4a0b](https://bitbucket.org/atlassian/atlaskit/commits/5fc4a0b))

* feature; change es2015 build so it transpiles everything except import/export statements (issues closed: ed-2272) ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))
* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))




* bug fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))

* bug fix; bump editor-core in all editor-* packages (issues closed: ed-2038) ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))


* bug fix; suppress Firefox memory issues (object is no more accessible) for tests ([3d8cc6b](https://bitbucket.org/atlassian/atlaskit/commits/3d8cc6b))
* bug fix; focus editor only when editorView exists (issues closed: ed-2041) ([50fd9c7](https://bitbucket.org/atlassian/atlaskit/commits/50fd9c7))

* bug fix; fIxing plugin order in editorcq, editor-jira and editor-bitbucket. ([4ac0594](https://bitbucket.org/atlassian/atlaskit/commits/4ac0594))


* bug fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))

* feature; use schemas from editor-core. ([6e5a982](https://bitbucket.org/atlassian/atlaskit/commits/6e5a982))
* bug fix; use latest editor-core with new dropdowns/popup ([d78e36b](https://bitbucket.org/atlassian/atlaskit/commits/d78e36b))

* bug fix; fixed bug that cannot encode/decode nested macros. ([6dc7091](https://bitbucket.org/atlassian/atlaskit/commits/6dc7091))
* bug fix; fixed bug that cannot encode/parse panel with empty content. ([2b1a162](https://bitbucket.org/atlassian/atlaskit/commits/2b1a162))



* breaking; ED-1369 ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))
* breaking; remove context prop from the editors (not used anymore) ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))
* breaking; ED-1704 ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))
* breaking; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))

* feature; updated cq to have hyperlink new behaviours. ([e0b3b39](https://bitbucket.org/atlassian/atlaskit/commits/e0b3b39))


* bug fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))

* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage (issues closed: ed-1694) ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

* feature; introduce disabled (boolean) property for editor-cq (issues closed: ed-1612) ([59ef545](https://bitbucket.org/atlassian/atlaskit/commits/59ef545))



* bug fix; remove docCompact and "compact" behaviour (issues closed: ed-1648) ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))

* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))
* bug fix; move react components into nodeviews ([b687d68](https://bitbucket.org/atlassian/atlaskit/commits/b687d68))

* feature; dummy commit to mark release of editor-cq ([594c047](https://bitbucket.org/atlassian/atlaskit/commits/594c047))


* bug fix; use new nodeviews (issues closed: ed-1491) ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))

* bug fix; resolved conflicts with master ([af82687](https://bitbucket.org/atlassian/atlaskit/commits/af82687))

* bug fix; strip @ sign from mention text (issues closed: ed-1736) ([13bda8f](https://bitbucket.org/atlassian/atlaskit/commits/13bda8f))

* bug fix; preserve whitespace when pasting codeblock ([5547154](https://bitbucket.org/atlassian/atlaskit/commits/5547154))
* bug fix; change mention wrapper from <link> to <fab:link> (issues closed: ed-1748) ([5c94ace](https://bitbucket.org/atlassian/atlaskit/commits/5c94ace))
* bug fix; undoing would revert to a state with temporary media id. ([660ad0a](https://bitbucket.org/atlassian/atlaskit/commits/660ad0a))

* bug fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))


* bug fix; resolved conflicts with master ([830b4eb](https://bitbucket.org/atlassian/atlaskit/commits/830b4eb))
* feature; added support for PRE, pasting PRE tag and test to cover this case ([c212ea4](https://bitbucket.org/atlassian/atlaskit/commits/c212ea4))


* bug fix; change encoder/parser to wrap mention in a link. (issues closed: ed-1639) ([0e72a8f](https://bitbucket.org/atlassian/atlaskit/commits/0e72a8f))
* feature; added pasting of codeblock and noformat support ([e3b7b05](https://bitbucket.org/atlassian/atlaskit/commits/e3b7b05))

* bug fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))
* bug fix; use new storyMediaProviderFactory API for stories and tests (issues closed: ed-1688) ([23053f3](https://bitbucket.org/atlassian/atlaskit/commits/23053f3))
* bug fix; encoding and parsing of media nodes (issues closed: ed-1674) ([6a7817d](https://bitbucket.org/atlassian/atlaskit/commits/6a7817d))


* feature; add onExpanded property. (issues closed: ed-1561) ([5be954c](https://bitbucket.org/atlassian/atlaskit/commits/5be954c))



* feature; use createSchema helper in editor-cq (issues closed: ed-1525) ([b24d896](https://bitbucket.org/atlassian/atlaskit/commits/b24d896))
* bug fix; make sure .focus() isn't called when editor is already focused (issues closed: ed-1510) ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))






* bug fix; update editor-core ([6df8f42](https://bitbucket.org/atlassian/atlaskit/commits/6df8f42))







* bug fix; convert noformat macros to code blocks without language ([28bbdf0](https://bitbucket.org/atlassian/atlaskit/commits/28bbdf0))

* bug fix; bump editor-core version. ([e9b1ae4](https://bitbucket.org/atlassian/atlaskit/commits/e9b1ae4))


* breaking;  ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))
* breaking; media support in core, media support for editor-cq ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))


* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* bug fix; editor-cq value has undefined for mentions creator (issues closed: ed-1527) ([6deaa59](https://bitbucket.org/atlassian/atlaskit/commits/6deaa59))


* bug fix; rename embedded content to unsupported content (issues closed: ed-1382) ([fa73491](https://bitbucket.org/atlassian/atlaskit/commits/fa73491))


* bug fix; upgrade the editor-core (issues closed: ed-1449) ([0c9b1ec](https://bitbucket.org/atlassian/atlaskit/commits/0c9b1ec))


* feature; updated package to use latest core. ([00d5644](https://bitbucket.org/atlassian/atlaskit/commits/00d5644))
* feature; updated editor cq and hipchat to use the latest plugin structure. ([9a81587](https://bitbucket.org/atlassian/atlaskit/commits/9a81587))

* bug fix; fix tslint errors ([ede0df8](https://bitbucket.org/atlassian/atlaskit/commits/ede0df8))
* bug fix; send unsupported nodes usage stat (issues closed: ed-1391) ([766d361](https://bitbucket.org/atlassian/atlaskit/commits/766d361))
* bug fix; resolved conflicts with master ([89b20ec](https://bitbucket.org/atlassian/atlaskit/commits/89b20ec))
* bug fix; fixed test after updating codeBlock header to heading tag instead of paragraph ([f524a8e](https://bitbucket.org/atlassian/atlaskit/commits/f524a8e))
* bug fix; resolved conflicts with master ([ce89e32](https://bitbucket.org/atlassian/atlaskit/commits/ce89e32))
* feature; bumped editor-core version in package.json, cleaned up story ([d4ab550](https://bitbucket.org/atlassian/atlaskit/commits/d4ab550))
* feature; added styles to codeblock, changed codeblock header from paragraph to h5 ([f4b6995](https://bitbucket.org/atlassian/atlaskit/commits/f4b6995))


* bug fix; fixed typo after resolving conflicts ([3ac7694](https://bitbucket.org/atlassian/atlaskit/commits/3ac7694))
* bug fix; resolved conflicts with master ([2a49b58](https://bitbucket.org/atlassian/atlaskit/commits/2a49b58))
* feature; added mentions plugin to CQ ([2140d59](https://bitbucket.org/atlassian/atlaskit/commits/2140d59))

* bug fix; resolved conflicts, updated story to pass supportedLanguages into codeBlock plugin ([77035ea](https://bitbucket.org/atlassian/atlaskit/commits/77035ea))
* feature; added parsing/encoding of links ([774a6c4](https://bitbucket.org/atlassian/atlaskit/commits/774a6c4))


* bug fix; export schema interfaces ([ac3c9ac](https://bitbucket.org/atlassian/atlaskit/commits/ac3c9ac))











* bug fix; restore copy-paste for jiraIssue ([cc2b13b](https://bitbucket.org/atlassian/atlaskit/commits/cc2b13b))

* bug fix; use nodeView for jiraIssue rendering ([c528b3f](https://bitbucket.org/atlassian/atlaskit/commits/c528b3f))
* bug fix; restore userSelect property ([89112ee](https://bitbucket.org/atlassian/atlaskit/commits/89112ee))
* bug fix; use Logo react element for rendering ([ea73355](https://bitbucket.org/atlassian/atlaskit/commits/ea73355))
* bug fix; use @atlaskit/logo component for SVG icon ([49b05a9](https://bitbucket.org/atlassian/atlaskit/commits/49b05a9))
* bug fix; render JIRA issue macros (issues closed: ed-1193) ([3a9bb75](https://bitbucket.org/atlassian/atlaskit/commits/3a9bb75))

* bug fix; resolved conflicts with master ([9bf56e5](https://bitbucket.org/atlassian/atlaskit/commits/9bf56e5))
* bug fix; fixed IE10 innerHTML issue in parser.ts ([b99ae84](https://bitbucket.org/atlassian/atlaskit/commits/b99ae84))
* bug fix; resolved conflicts with master ([8ccb1c3](https://bitbucket.org/atlassian/atlaskit/commits/8ccb1c3))
* bug fix; fixing code mark in schema for editor-cq ([220131b](https://bitbucket.org/atlassian/atlaskit/commits/220131b))

* bug fix; schema nodes order issues in editor-cq (issues closed: ed-1410) ([c9ea664](https://bitbucket.org/atlassian/atlaskit/commits/c9ea664))

* feature; added support for multiple top-level nodes inside panel ([687596f](https://bitbucket.org/atlassian/atlaskit/commits/687596f))


* feature; added panel to CQ storybook ([edeaddb](https://bitbucket.org/atlassian/atlaskit/commits/edeaddb))
* feature; enabled panels for CQ ([c2c08c4](https://bitbucket.org/atlassian/atlaskit/commits/c2c08c4))
* feature; added tests for codeblock in editor-cq ([e3e1164](https://bitbucket.org/atlassian/atlaskit/commits/e3e1164))



* bug fix; use prescribed order for marks ([a1dcf2e](https://bitbucket.org/atlassian/atlaskit/commits/a1dcf2e))
* bug fix; restore marks default order for editor-cq ([4af0ebc](https://bitbucket.org/atlassian/atlaskit/commits/4af0ebc))
* feature; added better support for codeblock languages ([9c4735a](https://bitbucket.org/atlassian/atlaskit/commits/9c4735a))

* bug fix; remove xmlns attribute from final HTML ([89af636](https://bitbucket.org/atlassian/atlaskit/commits/89af636))
* bug fix; use namespaces for createElement ([dceb350](https://bitbucket.org/atlassian/atlaskit/commits/dceb350))
* bug fix; use existing mention component for UI ([9dcc99d](https://bitbucket.org/atlassian/atlaskit/commits/9dcc99d))
* bug fix; add mentions node (issues closed: ed-1291) ([15b65f9](https://bitbucket.org/atlassian/atlaskit/commits/15b65f9))

* bug fix; add expanded property for editor-cq (issues closed: ed-1353) ([11e9b29](https://bitbucket.org/atlassian/atlaskit/commits/11e9b29))






* bug fix; add HyperLinks plugin to editor-cq (issues closed: ed-414) ([a58af05](https://bitbucket.org/atlassian/atlaskit/commits/a58af05))




* bug fix; fixes namespace issue in IE ([9741260](https://bitbucket.org/atlassian/atlaskit/commits/9741260))

* feature; Added support for code blocks ([2101620](https://bitbucket.org/atlassian/atlaskit/commits/2101620))




* feature; add support for unsupported content. ([20ff4b5](https://bitbucket.org/atlassian/atlaskit/commits/20ff4b5))


* bug fix; bumped editor-core dependency (^5.0.0 to ^7.6.0) for editor-cq ([f62ce7d](https://bitbucket.org/atlassian/atlaskit/commits/f62ce7d))


* feature; remove redundant deps ([54f8d47](https://bitbucket.org/atlassian/atlaskit/commits/54f8d47))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* bug fix; upgrade TypeScript to 2.2.1 (issues closed: ed-1104) ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))
* bug fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))


* feature; adding clear formatting option to editor-bitbucket, editor-jira and editor-cq. ([995877f](https://bitbucket.org/atlassian/atlaskit/commits/995877f))



* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))


* bug fix; adding DefaultKeymapsPlugin for new Redo keymaps to editor-bitbucket, editor-jira an ([b70508b](https://bitbucket.org/atlassian/atlaskit/commits/b70508b))
* bug fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* bug fix; updating editor-core version (issues closed: fab-2616) ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))





* bug fix; merged master into ED-738 ([8afd112](https://bitbucket.org/atlassian/atlaskit/commits/8afd112))









* bug fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))












## 5.0.0 (2017-10-16)

* breaking; Upgraded mediaProvider API to use the new media picker authentication ([af6da7f](https://bitbucket.org/atlassian/atlaskit/commits/af6da7f))
* breaking; fixed mentions and upgrade editor-core version. ([af6da7f](https://bitbucket.org/atlassian/atlaskit/commits/af6da7f))
* bug fix; added missing method _notifyAllResultsListeners to mention mock service and fixed re ([f057300](https://bitbucket.org/atlassian/atlaskit/commits/f057300))
## 4.10.0 (2017-10-10)

* feature; bumping editor-core to 47.17.0 (issues closed: ed-2953) ([fcb32af](https://bitbucket.org/atlassian/atlaskit/commits/fcb32af))
## 4.9.0 (2017-10-05)

* feature; bump editor-core to the latest version (issues closed: ed-2879) ([ad1a82e](https://bitbucket.org/atlassian/atlaskit/commits/ad1a82e))
## 4.8.4 (2017-09-14)

* bug fix; bump editor-core major version ([fca90e4](https://bitbucket.org/atlassian/atlaskit/commits/fca90e4))
## 4.8.3 (2017-09-06)

* bug fix; fix save button has spinner during media upload (issues closed: ed-2273) ([67a5997](https://bitbucket.org/atlassian/atlaskit/commits/67a5997))
## 4.8.2 (2017-09-01)

* bug fix; fire onChange only when docChanged = true (issues closed: ed-2421) ([5605a74](https://bitbucket.org/atlassian/atlaskit/commits/5605a74))
## 4.8.1 (2017-08-31)

* bug fix; remove encoder/parser from editor-cq (issues closed: ed-2615) ([42bb27c](https://bitbucket.org/atlassian/atlaskit/commits/42bb27c))





## 4.8.0 (2017-08-23)


* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))
## 4.7.0 (2017-08-23)

* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))
## 4.6.3 (2017-08-23)

* bug fix; trigger a release for editor-cq (issues closed: ed-2359) ([9ac1dae](https://bitbucket.org/atlassian/atlaskit/commits/9ac1dae))
* bug fix; Merged in ED-2359/just-trigger-the-release (pull request #3899) (issues closed: ed-2359) ([6693362](https://bitbucket.org/atlassian/atlaskit/commits/6693362))
## 4.6.2 (2017-08-17)

* bug fix; analytics' events for media not being sent. (issues closed: ed-2422) ([dec1fb4](https://bitbucket.org/atlassian/atlaskit/commits/dec1fb4))
## 4.6.1 (2017-08-16)

* bug fix; fix plaintext link detection, enable markdown and code detection on paste ([00385bd](https://bitbucket.org/atlassian/atlaskit/commits/00385bd))





## 4.6.0 (2017-08-11)

* feature; expose EditorView from editor-cq (issues closed: ed-2463) ([1312b8d](https://bitbucket.org/atlassian/atlaskit/commits/1312b8d))
## 4.5.2 (2017-08-11)

* bug fix; cxHTML decoder doesn't support media in a non-empty <p> (issues closed: ed-2438) ([e7d78be](https://bitbucket.org/atlassian/atlaskit/commits/e7d78be))
## 4.5.1 (2017-08-03)

* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))





## 4.5.0 (2017-07-28)


* feature; bump editor-core in all editor-* packages ([afff5ab](https://bitbucket.org/atlassian/atlaskit/commits/afff5ab))

## 4.4.0 (2017-07-28)


* feature; added tablesEnabled prop to editor-cq ([bb727d6](https://bitbucket.org/atlassian/atlaskit/commits/bb727d6))

## 4.3.1 (2017-07-26)

## 4.3.0 (2017-07-26)


* fix; fix media node to comply with editor-core breaking changes ([771dbdb](https://bitbucket.org/atlassian/atlaskit/commits/771dbdb))
* fix; fixed table parser for CQ ([1ed29af](https://bitbucket.org/atlassian/atlaskit/commits/1ed29af))


* feature; added parser for tables ([5fc4a0b](https://bitbucket.org/atlassian/atlaskit/commits/5fc4a0b))
* feature; added tables encoder for cq ([54414b8](https://bitbucket.org/atlassian/atlaskit/commits/54414b8))
* feature; made weakmap with parsed nodes global ([81b3244](https://bitbucket.org/atlassian/atlaskit/commits/81b3244))

## 4.2.0 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))


* feature; change es2015 build so it transpiles everything except import/export statements ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))

## 4.1.4 (2017-07-12)


* fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))

## 4.1.3 (2017-07-11)


* fix; bump editor-core in all editor-* packages ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))

## 4.1.2 (2017-06-30)


* fix; focus editor only when editorView exists ([50fd9c7](https://bitbucket.org/atlassian/atlaskit/commits/50fd9c7))
* fix; suppress Firefox memory issues (object is no more accessible) for tests ([3d8cc6b](https://bitbucket.org/atlassian/atlaskit/commits/3d8cc6b))

## 4.1.1 (2017-06-26)


* fix; fIxing plugin order in editorcq, editor-jira and editor-bitbucket. ([4ac0594](https://bitbucket.org/atlassian/atlaskit/commits/4ac0594))

## 4.1.0 (2017-06-19)

## 4.0.2 (2017-06-19)


* fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))

## 4.0.1 (2017-06-16)


* fix; fixed bug that cannot encode/decode nested macros. ([6dc7091](https://bitbucket.org/atlassian/atlaskit/commits/6dc7091))
* fix; fixed bug that cannot encode/parse panel with empty content. ([2b1a162](https://bitbucket.org/atlassian/atlaskit/commits/2b1a162))
* fix; use latest editor-core with new dropdowns/popup ([d78e36b](https://bitbucket.org/atlassian/atlaskit/commits/d78e36b))


* feature; use schemas from editor-core. ([6e5a982](https://bitbucket.org/atlassian/atlaskit/commits/6e5a982))

## 3.0.0 (2017-06-12)

## 3.0.0 (2017-06-09)


* fix; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))
* fix; remove context prop from the editors (not used anymore) ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))


* breaking; ED-1369
* breaking; ED-1704

## 2.7.0 (2017-06-07)


* feature; updated cq to have hyperlink new behaviours. ([e0b3b39](https://bitbucket.org/atlassian/atlaskit/commits/e0b3b39))

## 2.6.1 (2017-06-02)


* fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))

## 2.6.0 (2017-06-02)


* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

## 2.5.0 (2017-06-02)


* feature; introduce disabled (boolean) property for editor-cq ([59ef545](https://bitbucket.org/atlassian/atlaskit/commits/59ef545))

## 2.4.0 (2017-05-31)

## 2.3.3 (2017-05-30)


* fix; remove docCompact and "compact" behaviour ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))

## 2.3.2 (2017-05-26)


* fix; move react components into nodeviews ([b687d68](https://bitbucket.org/atlassian/atlaskit/commits/b687d68))
* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

## 2.3.1 (2017-05-25)


* fix; use new nodeviews ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))


* feature; dummy commit to mark release of editor-cq ([594c047](https://bitbucket.org/atlassian/atlaskit/commits/594c047))

## 2.3.0 (2017-05-24)

## 2.2.6 (2017-05-24)


* fix; strip @ sign from mention text ([13bda8f](https://bitbucket.org/atlassian/atlaskit/commits/13bda8f))

## 2.2.5 (2017-05-23)


* fix; change mention wrapper from <link> to <fab:link> ([5c94ace](https://bitbucket.org/atlassian/atlaskit/commits/5c94ace))
* fix; preserve whitespace when pasting codeblock ([5547154](https://bitbucket.org/atlassian/atlaskit/commits/5547154))
* fix; undoing would revert to a state with temporary media id. ([660ad0a](https://bitbucket.org/atlassian/atlaskit/commits/660ad0a))

## 2.2.4 (2017-05-22)


* fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))

## 2.2.3 (2017-05-19)


* feature; added support for PRE, pasting PRE tag and test to cover this case ([c212ea4](https://bitbucket.org/atlassian/atlaskit/commits/c212ea4))

## 2.2.2 (2017-05-18)


* fix; change encoder/parser to wrap mention in a link. ([0e72a8f](https://bitbucket.org/atlassian/atlaskit/commits/0e72a8f))


* feature; added pasting of codeblock and noformat support ([e3b7b05](https://bitbucket.org/atlassian/atlaskit/commits/e3b7b05))

## 2.2.1 (2017-05-17)


* fix; encoding and parsing of media nodes ([6a7817d](https://bitbucket.org/atlassian/atlaskit/commits/6a7817d))
* fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))
* fix; use new storyMediaProviderFactory API for stories and tests ([23053f3](https://bitbucket.org/atlassian/atlaskit/commits/23053f3))

## 2.2.0 (2017-05-11)


* feature; add onExpanded property. ([5be954c](https://bitbucket.org/atlassian/atlaskit/commits/5be954c))

## 2.1.0 (2017-05-09)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; use createSchema helper in editor-cq ([b24d896](https://bitbucket.org/atlassian/atlaskit/commits/b24d896))

## 2.0.4 (2017-05-01)

## 2.0.3 (2017-05-01)


* fix; update editor-core ([6df8f42](https://bitbucket.org/atlassian/atlaskit/commits/6df8f42))

## 2.0.2 (2017-05-01)


* fix build errors ([7a297bd](https://bitbucket.org/atlassian/atlaskit/commits/7a297bd))
* update editor-core dep in editor-cq ([e24bfdd](https://bitbucket.org/atlassian/atlaskit/commits/e24bfdd))

## 2.0.1 (2017-05-01)


* fix; bump editor-core version. ([e9b1ae4](https://bitbucket.org/atlassian/atlaskit/commits/e9b1ae4))
* fix; convert noformat macros to code blocks without language ([28bbdf0](https://bitbucket.org/atlassian/atlaskit/commits/28bbdf0))

## 2.0.0 (2017-04-28)


* feature; media support in core, media support for editor-cq ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))


* breaking; Large number of changes in editor-core, playing it safe and marking as BC break.

## 1.33.5 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.33.4 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.33.3 (2017-04-24)


* fix; editor-cq value has undefined for mentions creator ([6deaa59](https://bitbucket.org/atlassian/atlaskit/commits/6deaa59))

## 1.33.2 (2017-04-23)


* fix; rename embedded content to unsupported content ([fa73491](https://bitbucket.org/atlassian/atlaskit/commits/fa73491))

## 1.33.1 (2017-04-18)


* fix; upgrade the editor-core ([0c9b1ec](https://bitbucket.org/atlassian/atlaskit/commits/0c9b1ec))

## 1.33.0 (2017-04-18)


* feature; updated editor cq and hipchat to use the latest plugin structure. ([9a81587](https://bitbucket.org/atlassian/atlaskit/commits/9a81587))
* feature; updated package to use latest core. ([00d5644](https://bitbucket.org/atlassian/atlaskit/commits/00d5644))

## 1.32.0 (2017-04-12)


* fix; fix tslint errors ([ede0df8](https://bitbucket.org/atlassian/atlaskit/commits/ede0df8))
* fix; fixed test after updating codeBlock header to heading tag instead of paragraph ([f524a8e](https://bitbucket.org/atlassian/atlaskit/commits/f524a8e))
* fix; send unsupported nodes usage stat ([766d361](https://bitbucket.org/atlassian/atlaskit/commits/766d361))


* feature; added styles to codeblock, changed codeblock header from paragraph to h5 ([f4b6995](https://bitbucket.org/atlassian/atlaskit/commits/f4b6995))
* feature; bumped editor-core version in package.json, cleaned up story ([d4ab550](https://bitbucket.org/atlassian/atlaskit/commits/d4ab550))

## 1.31.0 (2017-04-12)


* fix; fixed typo after resolving conflicts ([3ac7694](https://bitbucket.org/atlassian/atlaskit/commits/3ac7694))


* feature; added mentions plugin to CQ ([2140d59](https://bitbucket.org/atlassian/atlaskit/commits/2140d59))

## 1.7.0 (2017-04-11)


* feature; added parsing/encoding of links ([774a6c4](https://bitbucket.org/atlassian/atlaskit/commits/774a6c4))

## 1.7.0 (2017-04-11)

## 1.7.0 (2017-04-11)


* fix; export schema interfaces ([ac3c9ac](https://bitbucket.org/atlassian/atlaskit/commits/ac3c9ac))

## 1.7.0 (2017-04-11)

## 1.7.0 (2017-04-11)

## 1.7.0 (2017-04-11)

## 1.7.0 (2017-04-11)

## 1.7.0 (2017-04-10)

## 1.7.0 (2017-04-10)

## 1.7.0 (2017-04-10)

## 1.7.0 (2017-04-10)

## 1.7.0 (2017-04-10)

## 1.7.0 (2017-04-10)


* fix; render JIRA issue macros ([3a9bb75](https://bitbucket.org/atlassian/atlaskit/commits/3a9bb75))
* fix; restore copy-paste for jiraIssue ([cc2b13b](https://bitbucket.org/atlassian/atlaskit/commits/cc2b13b))
* fix; restore userSelect property ([89112ee](https://bitbucket.org/atlassian/atlaskit/commits/89112ee))
* fix; use [@atlaskit](https://github.com/atlaskit)/logo component for SVG icon ([49b05a9](https://bitbucket.org/atlassian/atlaskit/commits/49b05a9))
* fix; use Logo react element for rendering ([ea73355](https://bitbucket.org/atlassian/atlaskit/commits/ea73355))
* fix; use nodeView for jiraIssue rendering ([c528b3f](https://bitbucket.org/atlassian/atlaskit/commits/c528b3f))

## 1.7.0 (2017-04-10)


* fix; fixed IE10 innerHTML issue in parser.ts ([b99ae84](https://bitbucket.org/atlassian/atlaskit/commits/b99ae84))
* fix; fixing code mark in schema for editor-cq ([220131b](https://bitbucket.org/atlassian/atlaskit/commits/220131b))
* fix; schema nodes order issues in editor-cq ([c9ea664](https://bitbucket.org/atlassian/atlaskit/commits/c9ea664))

## 1.7.0 (2017-04-10)


* feature; added support for multiple top-level nodes inside panel ([687596f](https://bitbucket.org/atlassian/atlaskit/commits/687596f))

## 1.7.0 (2017-04-09)


* feature; added panel to CQ storybook ([edeaddb](https://bitbucket.org/atlassian/atlaskit/commits/edeaddb))
* feature; added tests for codeblock in editor-cq ([e3e1164](https://bitbucket.org/atlassian/atlaskit/commits/e3e1164))
* feature; enabled panels for CQ ([c2c08c4](https://bitbucket.org/atlassian/atlaskit/commits/c2c08c4))

## 1.7.0 (2017-04-07)

## 1.7.0 (2017-04-07)

## 1.7.0 (2017-04-06)


* fix; add mentions node ([15b65f9](https://bitbucket.org/atlassian/atlaskit/commits/15b65f9))
* fix; remove xmlns attribute from final HTML ([89af636](https://bitbucket.org/atlassian/atlaskit/commits/89af636))
* fix; restore marks default order for editor-cq ([4af0ebc](https://bitbucket.org/atlassian/atlaskit/commits/4af0ebc))
* fix; use existing mention component for UI ([9dcc99d](https://bitbucket.org/atlassian/atlaskit/commits/9dcc99d))
* fix; use namespaces for createElement ([dceb350](https://bitbucket.org/atlassian/atlaskit/commits/dceb350))
* fix; use prescribed order for marks ([a1dcf2e](https://bitbucket.org/atlassian/atlaskit/commits/a1dcf2e))


* feature; added better support for codeblock languages ([9c4735a](https://bitbucket.org/atlassian/atlaskit/commits/9c4735a))

## 1.7.0 (2017-04-06)


* fix; add expanded property for editor-cq ([11e9b29](https://bitbucket.org/atlassian/atlaskit/commits/11e9b29))

## 1.7.0 (2017-04-06)

## 1.7.0 (2017-04-06)

## 1.7.0 (2017-04-06)

## 1.7.0 (2017-04-05)


* fix; add HyperLinks plugin to editor-cq ([a58af05](https://bitbucket.org/atlassian/atlaskit/commits/a58af05))
* fix; fixes namespace issue in IE ([9741260](https://bitbucket.org/atlassian/atlaskit/commits/9741260))


* feature; Added support for code blocks ([2101620](https://bitbucket.org/atlassian/atlaskit/commits/2101620))

## 1.6.0 (2017-03-29)


* feature; add support for unsupported content. ([20ff4b5](https://bitbucket.org/atlassian/atlaskit/commits/20ff4b5))

## 1.5.1 (2017-03-24)


* fix; bumped editor-core dependency (^5.0.0 to ^7.6.0) for editor-cq ([f62ce7d](https://bitbucket.org/atlassian/atlaskit/commits/f62ce7d))

## 1.5.0 (2017-03-23)


* feature; remove redundant deps ([54f8d47](https://bitbucket.org/atlassian/atlaskit/commits/54f8d47))

## 1.4.3 (2017-03-21)

## 1.4.3 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.4.2 (2017-03-17)

## 1.4.1 (2017-03-16)


* fix; upgrade TypeScript to 2.2.1 ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))
* fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))

## 1.4.0 (2017-03-15)


* feature; adding clear formatting option to editor-bitbucket, editor-jira and editor-cq. ([995877f](https://bitbucket.org/atlassian/atlaskit/commits/995877f))

## 1.2.0 (2017-03-14)

## 1.2.0 (2017-03-14)

## 1.1.4 (2017-03-08)

## 1.1.3 (2017-03-03)


* fix; adding DefaultKeymapsPlugin for new Redo keymaps to editor-bitbucket, editor-jira an ([b70508b](https://bitbucket.org/atlassian/atlaskit/commits/b70508b))
* fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* fix; updating editor-core version ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))

## 1.1.2 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))


* updated dependency version ([b192339](https://bitbucket.org/atlassian/atlaskit/commits/b192339))

## 1.1.1 (2017-02-23)


* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.1.0 (2017-02-20)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.0.1 (2017-02-07)


* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))
