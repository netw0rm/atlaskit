# @atlaskit/editor-jira

## 22.0.0 (2017-11-09)



* bug fix; remove redundant dependency ([08a529d](https://bitbucket.org/atlassian/atlaskit/commits/08a529d))

* bug fix; re-export createSchema from editor-core ([ec5f059](https://bitbucket.org/atlassian/atlaskit/commits/ec5f059))

* bug fix; use latest editor-core ([d31dbca](https://bitbucket.org/atlassian/atlaskit/commits/d31dbca))

* bug fix; bump editor-jira to use latest new editor-common (issues closed: ed-3053) ([17106d0](https://bitbucket.org/atlassian/atlaskit/commits/17106d0))

* breaking; Upgraded mediaProvider API to use the new media picker authentication ([ed1e1a2](https://bitbucket.org/atlassian/atlaskit/commits/ed1e1a2))
* breaking; fixed mentions and upgrade editor-core version. ([ed1e1a2](https://bitbucket.org/atlassian/atlaskit/commits/ed1e1a2))
* bug fix; added missing method _notifyAllResultsListeners to mention mock service and fixed re ([f057300](https://bitbucket.org/atlassian/atlaskit/commits/f057300))

* bug fix; upgrading button and button group to fix issue around button spacing. ([7a1b29d](https://bitbucket.org/atlassian/atlaskit/commits/7a1b29d))

* bug fix; bump editor-core major version ([fca90e4](https://bitbucket.org/atlassian/atlaskit/commits/fca90e4))

* bug fix; fix arrows on the filmstrip don't show up ([e6042a6](https://bitbucket.org/atlassian/atlaskit/commits/e6042a6))


* feature; add support for activity for the link dialog ([c5b34b5](https://bitbucket.org/atlassian/atlaskit/commits/c5b34b5))



* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))


* feature; update minimum editor-core version ([f6a1e09](https://bitbucket.org/atlassian/atlaskit/commits/f6a1e09))


* bug fix; fix plaintext link detection, enable markdown and code detection on paste ([f86eef0](https://bitbucket.org/atlassian/atlaskit/commits/f86eef0))

* feature; disable footer buttons if isDisabled is set to true ([8a8f1be](https://bitbucket.org/atlassian/atlaskit/commits/8a8f1be))
* feature; introduce disabled (boolean) property for editor-jira (issues closed: ed-2385) ([db18d42](https://bitbucket.org/atlassian/atlaskit/commits/db18d42))


* feature; enable tables in editor-jira (issues closed: ed-2396) ([025f6ec](https://bitbucket.org/atlassian/atlaskit/commits/025f6ec))

* bug fix; undefined behaviour of parseIntoAtlassianDocument if first argument is nullable (issues closed: ed-2395) ([42cdb5d](https://bitbucket.org/atlassian/atlaskit/commits/42cdb5d))


* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))
* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))




* breaking; editor-jira doesn't produce ES5 build anymore ([b0acf07](https://bitbucket.org/atlassian/atlaskit/commits/b0acf07))
* breaking; remove ES5 build for editor-jira ([b0acf07](https://bitbucket.org/atlassian/atlaskit/commits/b0acf07))
* bug fix; import renderer from es2015 code ([3aa4ab4](https://bitbucket.org/atlassian/atlaskit/commits/3aa4ab4))




* breaking; makeSchema(config) is no more in editor-jira, use createJIRASchema(config) from editor-core instead ([48124ed](https://bitbucket.org/atlassian/atlaskit/commits/48124ed))
* breaking; use editor-core transformer to parse/encode JIRA html (issues closed: ed-2356) ([48124ed](https://bitbucket.org/atlassian/atlaskit/commits/48124ed))

* feature; bump editor-core in all editor-* packages ([afff5ab](https://bitbucket.org/atlassian/atlaskit/commits/afff5ab))


* feature; export parseIntoAtlassianDocument function from editor-jira (issues closed: ed-2353) ([45dccef](https://bitbucket.org/atlassian/atlaskit/commits/45dccef))
* bug fix; enabled jira media tests and proved better error message when htmls not match. ([7668506](https://bitbucket.org/atlassian/atlaskit/commits/7668506))




* feature; change es2015 build so it transpiles everything except import/export statements (issues closed: ed-2272) ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))

* feature; added new property to render custom footer for the editor-jira (issues closed: ed-2051) ([bd986c4](https://bitbucket.org/atlassian/atlaskit/commits/bd986c4))
* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))






* bug fix; re-releasing packages that failed previous release ([bf1ab9c](https://bitbucket.org/atlassian/atlaskit/commits/bf1ab9c))

* bug fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))
* bug fix; media plugin was not being destroyed with the editor. (issues closed: ed-2179) ([087d1f4](https://bitbucket.org/atlassian/atlaskit/commits/087d1f4))
* bug fix; bump editor-core in all editor-* packages (issues closed: ed-2038) ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))

* bug fix; add view context support in encoder (issues closed: ed-2044) ([6e36036](https://bitbucket.org/atlassian/atlaskit/commits/6e36036))

* bug fix; make sure that editorView exists before getting mediaPluginState ([923135a](https://bitbucket.org/atlassian/atlaskit/commits/923135a))

* feature; improve media encoding in JIRA (issues closed: ed-2044) ([17695b1](https://bitbucket.org/atlassian/atlaskit/commits/17695b1))

* bug fix; fIxing plugin order in editorcq, editor-jira and editor-bitbucket. ([4ac0594](https://bitbucket.org/atlassian/atlaskit/commits/4ac0594))

* bug fix; fix optional attrs after media insertion ([f461365](https://bitbucket.org/atlassian/atlaskit/commits/f461365))

* feature; add support for encoding/parsing adjacent attachments as mediaGroup (issues closed: ed-1726) ([6accb7a](https://bitbucket.org/atlassian/atlaskit/commits/6accb7a))
* bug fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))

* breaking; In order to use editor inside of the "overflow: hidden" container you need to pass ([a0b3aa7](https://bitbucket.org/atlassian/atlaskit/commits/a0b3aa7))
* breaking; use latest editor-core with new dropdowns/popup ([a0b3aa7](https://bitbucket.org/atlassian/atlaskit/commits/a0b3aa7))

* bug fix; prevent editor jira from blowing up by checking if mediaPluginState exists (issues closed: ed-1946) ([6b07bad](https://bitbucket.org/atlassian/atlaskit/commits/6b07bad))



* breaking; ED-1369 ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))
* breaking; remove context prop from the editors (not used anymore) ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))
* breaking; ED-1704 ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))
* breaking; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))


* feature; updated jira to have hyperlink new behaviours. ([5fa3840](https://bitbucket.org/atlassian/atlaskit/commits/5fa3840))
* bug fix; removed duplicated tests. ([508f045](https://bitbucket.org/atlassian/atlaskit/commits/508f045))
* bug fix; refactor partly editor-jira html.ts tests. ([8e3e03f](https://bitbucket.org/atlassian/atlaskit/commits/8e3e03f))

* feature; add colour picker to editor-jira (issues closed: ed-1239) ([18c17f5](https://bitbucket.org/atlassian/atlaskit/commits/18c17f5))

* bug fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))

* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage (issues closed: ed-1694) ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

* feature; add mediaProvider property support to editor-jira and also media nodes support ([56e6a3c](https://bitbucket.org/atlassian/atlaskit/commits/56e6a3c))
* bug fix; use new nodeviews (issues closed: ed-1491) ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))
* bug fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))

* bug fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))
* bug fix; properly handle empty blockqoute and code blocks in parser for editor-jira ([4834d2c](https://bitbucket.org/atlassian/atlaskit/commits/4834d2c))




* feature; use createSchema helper in editor-jira (issues closed: ed-1525, ed-1473) ([03c862a](https://bitbucket.org/atlassian/atlaskit/commits/03c862a))
* bug fix; make sure .focus() isn't called when editor is already focused (issues closed: ed-1510) ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))





* bug fix; parse preformatted-macros to code with language=plain (issues closed: ed-1362) ([3fae2ef](https://bitbucket.org/atlassian/atlaskit/commits/3fae2ef))
* bug fix; fix focus at expand of JIRA editor. (issues closed: #ed-1547) ([447c0c9](https://bitbucket.org/atlassian/atlaskit/commits/447c0c9))






* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

* feature; update editor-core to 14.5.2 ([33150d0](https://bitbucket.org/atlassian/atlaskit/commits/33150d0))
* bug fix; revert blur blocking wrapper and updates editor-core version (issues closed: ed-1419) ([b351032](https://bitbucket.org/atlassian/atlaskit/commits/b351032))



* feature; updated package to use latest core. ([00d5644](https://bitbucket.org/atlassian/atlaskit/commits/00d5644))

* feature; updated editor cq and hipchat to use the latest plugin structure. ([9a81587](https://bitbucket.org/atlassian/atlaskit/commits/9a81587))

* bug fix; prevent blur event to propagate to parent containers of editor-jira (issues closed: ed-1419) ([46bca8d](https://bitbucket.org/atlassian/atlaskit/commits/46bca8d))
* feature; add subsup under the allowSubSup flag ([d9b703e](https://bitbucket.org/atlassian/atlaskit/commits/d9b703e))



* bug fix; export schema interfaces ([ac3c9ac](https://bitbucket.org/atlassian/atlaskit/commits/ac3c9ac))











* bug fix; fix code mark in schema for editor-jira ([c43acff](https://bitbucket.org/atlassian/atlaskit/commits/c43acff))


* bug fix; fix review marks ([ef373b8](https://bitbucket.org/atlassian/atlaskit/commits/ef373b8))
* breaking;  ([e1d0ea6](https://bitbucket.org/atlassian/atlaskit/commits/e1d0ea6))
* breaking; upgrade editor-jira to use the latest atlaskit/editor-core with new prosemirror API ([e1d0ea6](https://bitbucket.org/atlassian/atlaskit/commits/e1d0ea6))







* feature; add blockquote supprot to editor-jira ([f4316d0](https://bitbucket.org/atlassian/atlaskit/commits/f4316d0))
* bug fix; strip span tags in the code block from jira ([21640a2](https://bitbucket.org/atlassian/atlaskit/commits/21640a2))

* feature; convert JIRA preformatted macros down to code block ([860663d](https://bitbucket.org/atlassian/atlaskit/commits/860663d))


* feature; enable markdown inputrules for JIRA ([bc1637c](https://bitbucket.org/atlassian/atlaskit/commits/bc1637c))

* bug fix; correct list types for nested bullet lists ([fa81c73](https://bitbucket.org/atlassian/atlaskit/commits/fa81c73))

* feature; parse jira issue marker to plain text ([040fc13](https://bitbucket.org/atlassian/atlaskit/commits/040fc13))

* feature; add code-block support to editor-jira ([ee6a1cd](https://bitbucket.org/atlassian/atlaskit/commits/ee6a1cd))


* feature; bump editor-core version ([94da2a6](https://bitbucket.org/atlassian/atlaskit/commits/94da2a6))



* feature; remove redundant deps and update editor-core to version without redundant deps ([326f225](https://bitbucket.org/atlassian/atlaskit/commits/326f225))
* feature; enable nested lists in editor-jira ([622d52e](https://bitbucket.org/atlassian/atlaskit/commits/622d52e))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

* feature; bump editor-core version in editor-jira ([26ad7d9](https://bitbucket.org/atlassian/atlaskit/commits/26ad7d9))




* feature; add flag to disable advanced text formatting in editor-jira ([5ef4805](https://bitbucket.org/atlassian/atlaskit/commits/5ef4805))
* bug fix; upgrade TypeScript to 2.2.1 (issues closed: ed-1104) ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))
* bug fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))


* feature; adding clear formatting option to editor-bitbucket, editor-jira and editor-cq. ([995877f](https://bitbucket.org/atlassian/atlaskit/commits/995877f))
* feature; adding data-parent attrubute to list html content generated by JIRA encoder. ([fe96d7a](https://bitbucket.org/atlassian/atlaskit/commits/fe96d7a))



* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))
* feature; add links support for editor-jira ([40c6bcd](https://bitbucket.org/atlassian/atlaskit/commits/40c6bcd))


* feature; add custom encoders for Jira, currently supports only mention encoder ([e113578](https://bitbucket.org/atlassian/atlaskit/commits/e113578))
* feature; add mentions support to editor-jira ([7a01b55](https://bitbucket.org/atlassian/atlaskit/commits/7a01b55))


* bug fix; adding DefaultKeymapsPlugin for new Redo keymaps to editor-bitbucket, editor-jira an ([b70508b](https://bitbucket.org/atlassian/atlaskit/commits/b70508b))
* bug fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* bug fix; updating editor-core version (issues closed: fab-2616) ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))











* feature; Allow JIRA editor to be collapsed ([9044171](https://bitbucket.org/atlassian/atlaskit/commits/9044171))


* bug fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))
* bug fix; Add a readme story. ([b607b6d](https://bitbucket.org/atlassian/atlaskit/commits/b607b6d))



* bug fix; Add a Readme story. ([68791cf](https://bitbucket.org/atlassian/atlaskit/commits/68791cf))



* bug fix; Rename the storybook name to @atlaskit/editor-jira ([1b9b07c](https://bitbucket.org/atlassian/atlaskit/commits/1b9b07c))



* feature; Disable lists by default, introduce allowLists prop. ([eb2737f](https://bitbucket.org/atlassian/atlaskit/commits/eb2737f))








## 21.0.5 (2017-10-26)

* bug fix; remove redundant dependency ([08a529d](https://bitbucket.org/atlassian/atlaskit/commits/08a529d))
## 21.0.4 (2017-10-26)


* bug fix; re-export createSchema from editor-core ([ec5f059](https://bitbucket.org/atlassian/atlaskit/commits/ec5f059))
## 21.0.3 (2017-10-25)

* bug fix; re-export createSchema from editor-core ([ec5f059](https://bitbucket.org/atlassian/atlaskit/commits/ec5f059))
## 21.0.2 (2017-10-24)

* bug fix; use latest editor-core ([d31dbca](https://bitbucket.org/atlassian/atlaskit/commits/d31dbca))
## 21.0.1 (2017-10-24)

* bug fix; bump editor-jira to use latest new editor-common (issues closed: ed-3053) ([17106d0](https://bitbucket.org/atlassian/atlaskit/commits/17106d0))
## 21.0.0 (2017-10-16)

* breaking; Upgraded mediaProvider API to use the new media picker authentication ([ed1e1a2](https://bitbucket.org/atlassian/atlaskit/commits/ed1e1a2))
* breaking; fixed mentions and upgrade editor-core version. ([ed1e1a2](https://bitbucket.org/atlassian/atlaskit/commits/ed1e1a2))
* bug fix; added missing method _notifyAllResultsListeners to mention mock service and fixed re ([f057300](https://bitbucket.org/atlassian/atlaskit/commits/f057300))
## 20.6.3 (2017-09-22)

* bug fix; upgrading button and button group to fix issue around button spacing. ([7a1b29d](https://bitbucket.org/atlassian/atlaskit/commits/7a1b29d))
## 20.6.2 (2017-09-14)

* bug fix; bump editor-core major version ([fca90e4](https://bitbucket.org/atlassian/atlaskit/commits/fca90e4))
## 20.6.1 (2017-09-04)

* bug fix; fix arrows on the filmstrip don't show up ([e6042a6](https://bitbucket.org/atlassian/atlaskit/commits/e6042a6))




## 20.6.0 (2017-08-24)

* feature; add support for activity for the link dialog ([c5b34b5](https://bitbucket.org/atlassian/atlaskit/commits/c5b34b5))
## 20.5.0 (2017-08-23)


* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))
## 20.4.0 (2017-08-23)

* feature; bumped editor-core to version 46.2.2 ([cdb5f3f](https://bitbucket.org/atlassian/atlaskit/commits/cdb5f3f))
## 20.3.0 (2017-08-17)

* feature; update minimum editor-core version ([f6a1e09](https://bitbucket.org/atlassian/atlaskit/commits/f6a1e09))
## 20.2.1 (2017-08-15)

* bug fix; fix plaintext link detection, enable markdown and code detection on paste ([f86eef0](https://bitbucket.org/atlassian/atlaskit/commits/f86eef0))
## 20.2.0 (2017-08-15)

* feature; disable footer buttons if isDisabled is set to true ([8a8f1be](https://bitbucket.org/atlassian/atlaskit/commits/8a8f1be))
* feature; introduce disabled (boolean) property for editor-jira (issues closed: ed-2385) ([db18d42](https://bitbucket.org/atlassian/atlaskit/commits/db18d42))


## 20.1.0 (2017-08-08)

* feature; enable tables in editor-jira (issues closed: ed-2396) ([025f6ec](https://bitbucket.org/atlassian/atlaskit/commits/025f6ec))
## 20.0.2 (2017-08-03)

* bug fix; undefined behaviour of parseIntoAtlassianDocument if first argument is nullable (issues closed: ed-2395) ([42cdb5d](https://bitbucket.org/atlassian/atlaskit/commits/42cdb5d))
## 20.0.1 (2017-08-03)

* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))
* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))



## 20.0.0 (2017-08-01)

* breaking; editor-jira doesn't produce ES5 build anymore ([b0acf07](https://bitbucket.org/atlassian/atlaskit/commits/b0acf07))
* breaking; remove ES5 build for editor-jira ([b0acf07](https://bitbucket.org/atlassian/atlaskit/commits/b0acf07))
## 19.0.1 (2017-08-01)

* bug fix; import renderer from es2015 code ([3aa4ab4](https://bitbucket.org/atlassian/atlaskit/commits/3aa4ab4))



## 18.5.0 (2017-07-28)


* feature; bump editor-core in all editor-* packages ([afff5ab](https://bitbucket.org/atlassian/atlaskit/commits/afff5ab))

## 18.4.1 (2017-07-28)


* fix; enabled jira media tests and proved better error message when htmls not match. ([7668506](https://bitbucket.org/atlassian/atlaskit/commits/7668506))


* feature; export parseIntoAtlassianDocument function from editor-jira ([45dccef](https://bitbucket.org/atlassian/atlaskit/commits/45dccef))

## 18.4.0 (2017-07-25)


* feature; change es2015 build so it transpiles everything except import/export statements ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))

## 18.3.0 (2017-07-24)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))


* feature; added new property to render custom footer for the editor-jira ([bd986c4](https://bitbucket.org/atlassian/atlaskit/commits/bd986c4))

## 18.2.4 (2017-07-14)

## 18.2.3 (2017-07-13)


* fix; bump editor-core in all editor-* packages ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))
* fix; media plugin was not being destroyed with the editor. ([087d1f4](https://bitbucket.org/atlassian/atlaskit/commits/087d1f4))
* fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))
* fix; re-releasing packages that failed previous release ([bf1ab9c](https://bitbucket.org/atlassian/atlaskit/commits/bf1ab9c))

## 18.2.2 (2017-07-07)


* fix; add view context support in encoder ([6e36036](https://bitbucket.org/atlassian/atlaskit/commits/6e36036))

## 18.2.1 (2017-07-04)


* fix; make sure that editorView exists before getting mediaPluginState ([923135a](https://bitbucket.org/atlassian/atlaskit/commits/923135a))

## 18.2.0 (2017-07-03)


* feature; improve media encoding in JIRA ([17695b1](https://bitbucket.org/atlassian/atlaskit/commits/17695b1))

## 18.1.2 (2017-06-26)


* fix; fIxing plugin order in editorcq, editor-jira and editor-bitbucket. ([4ac0594](https://bitbucket.org/atlassian/atlaskit/commits/4ac0594))

## 18.1.1 (2017-06-21)


* fix; fix optional attrs after media insertion ([f461365](https://bitbucket.org/atlassian/atlaskit/commits/f461365))

## 18.1.0 (2017-06-20)


* fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))


* feature; add support for encoding/parsing adjacent attachments as mediaGroup ([6accb7a](https://bitbucket.org/atlassian/atlaskit/commits/6accb7a))

## 18.0.0 (2017-06-16)


* fix; use latest editor-core with new dropdowns/popup ([a0b3aa7](https://bitbucket.org/atlassian/atlaskit/commits/a0b3aa7))


* breaking; In order to use editor inside of the "overflow: hidden" container you need to pass
'popupsMountPoint' prop wich must be a reference to DOM element where to mount popups otherwise they
will be cut by "overflow: hidden" container.

## 17.0.1 (2017-06-15)


* fix; prevent editor jira from blowing up by checking if mediaPluginState exists ([6b07bad](https://bitbucket.org/atlassian/atlaskit/commits/6b07bad))

## 16.0.0 (2017-06-12)

## 16.0.0 (2017-06-09)


* fix; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))
* fix; remove context prop from the editors (not used anymore) ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))


* breaking; ED-1369
* breaking; ED-1704

## 15.10.0 (2017-06-07)


* fix; refactor partly editor-jira html.ts tests. ([8e3e03f](https://bitbucket.org/atlassian/atlaskit/commits/8e3e03f))
* fix; removed duplicated tests. ([508f045](https://bitbucket.org/atlassian/atlaskit/commits/508f045))


* feature; updated jira to have hyperlink new behaviours. ([5fa3840](https://bitbucket.org/atlassian/atlaskit/commits/5fa3840))

## 15.9.0 (2017-06-05)


* fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))


* feature; add colour picker to editor-jira ([18c17f5](https://bitbucket.org/atlassian/atlaskit/commits/18c17f5))

## 15.8.0 (2017-06-02)


* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

## 15.7.0 (2017-05-31)


* fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))
* fix; use new nodeviews ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))


* feature; add mediaProvider property support to editor-jira and also media nodes support ([56e6a3c](https://bitbucket.org/atlassian/atlaskit/commits/56e6a3c))

## 15.6.1 (2017-05-17)


* fix; properly handle empty blockqoute and code blocks in parser for editor-jira ([4834d2c](https://bitbucket.org/atlassian/atlaskit/commits/4834d2c))
* fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))

## 15.4.0 (2017-05-09)

## 15.4.0 (2017-05-09)

## 15.4.0 (2017-05-09)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; use createSchema helper in editor-jira ([03c862a](https://bitbucket.org/atlassian/atlaskit/commits/03c862a))

## 15.3.4 (2017-05-08)

## 15.3.3 (2017-05-05)


* fix; fix focus at expand of JIRA editor. ([447c0c9](https://bitbucket.org/atlassian/atlaskit/commits/447c0c9))
* fix; parse preformatted-macros to code with language=plain ([3fae2ef](https://bitbucket.org/atlassian/atlaskit/commits/3fae2ef))

## 15.3.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 15.3.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 15.3.0 (2017-04-24)


* fix; revert blur blocking wrapper and updates editor-core version ([b351032](https://bitbucket.org/atlassian/atlaskit/commits/b351032))


* feature; update editor-core to 14.5.2 ([33150d0](https://bitbucket.org/atlassian/atlaskit/commits/33150d0))

## 15.2.0 (2017-04-18)


* feature; updated package to use latest core. ([00d5644](https://bitbucket.org/atlassian/atlaskit/commits/00d5644))

## 15.1.1 (2017-04-12)


* feature; updated editor cq and hipchat to use the latest plugin structure. ([9a81587](https://bitbucket.org/atlassian/atlaskit/commits/9a81587))

## 15.1.0 (2017-04-12)


* fix; prevent blur event to propagate to parent containers of editor-jira ([46bca8d](https://bitbucket.org/atlassian/atlaskit/commits/46bca8d))


* feature; add subsup under the allowSubSup flag ([d9b703e](https://bitbucket.org/atlassian/atlaskit/commits/d9b703e))

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)


* fix; export schema interfaces ([ac3c9ac](https://bitbucket.org/atlassian/atlaskit/commits/ac3c9ac))

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)


* fix; fix code mark in schema for editor-jira ([c43acff](https://bitbucket.org/atlassian/atlaskit/commits/c43acff))
* fix; fix review marks ([ef373b8](https://bitbucket.org/atlassian/atlaskit/commits/ef373b8))
* fix; upgrade editor-jira to use the latest atlaskit/editor-core with new prosemirror API ([e1d0ea6](https://bitbucket.org/atlassian/atlaskit/commits/e1d0ea6))


* breaking; ED-1194

## 1.18.0 (2017-04-04)

## 1.18.0 (2017-04-04)

## 1.18.0 (2017-04-04)

## 1.17.1 (2017-04-04)


* fix; strip span tags in the code block from jira ([21640a2](https://bitbucket.org/atlassian/atlaskit/commits/21640a2))


* feature; add blockquote supprot to editor-jira ([f4316d0](https://bitbucket.org/atlassian/atlaskit/commits/f4316d0))

## 1.17.0 (2017-04-03)


* feature; convert JIRA preformatted macros down to code block ([860663d](https://bitbucket.org/atlassian/atlaskit/commits/860663d))

## 1.16.1 (2017-03-31)

## 1.16.0 (2017-03-28)


* feature; enable markdown inputrules for JIRA ([bc1637c](https://bitbucket.org/atlassian/atlaskit/commits/bc1637c))

## 1.15.0 (2017-03-28)


* fix; correct list types for nested bullet lists ([fa81c73](https://bitbucket.org/atlassian/atlaskit/commits/fa81c73))

## 1.14.0 (2017-03-27)


* feature; add code-block support to editor-jira ([ee6a1cd](https://bitbucket.org/atlassian/atlaskit/commits/ee6a1cd))
* feature; parse jira issue marker to plain text ([040fc13](https://bitbucket.org/atlassian/atlaskit/commits/040fc13))

## 1.13.0 (2017-03-23)


* feature; bump editor-core version ([94da2a6](https://bitbucket.org/atlassian/atlaskit/commits/94da2a6))

## 1.12.0 (2017-03-23)

## 1.11.0 (2017-03-22)


* feature; enable nested lists in editor-jira ([622d52e](https://bitbucket.org/atlassian/atlaskit/commits/622d52e))
* feature; remove redundant deps and update editor-core to version without redundant deps ([326f225](https://bitbucket.org/atlassian/atlaskit/commits/326f225))

## 1.10.1 (2017-03-21)

## 1.10.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.10.0 (2017-03-21)


* feature; bump editor-core version in editor-jira ([26ad7d9](https://bitbucket.org/atlassian/atlaskit/commits/26ad7d9))

## 1.9.0 (2017-03-20)

## 1.8.0 (2017-03-17)

## 1.7.1 (2017-03-17)


* fix; upgrade TypeScript to 2.2.1 ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))
* fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))


* feature; add flag to disable advanced text formatting in editor-jira ([5ef4805](https://bitbucket.org/atlassian/atlaskit/commits/5ef4805))

## 1.7.0 (2017-03-15)


* feature; adding clear formatting option to editor-bitbucket, editor-jira and editor-cq. ([995877f](https://bitbucket.org/atlassian/atlaskit/commits/995877f))
* feature; adding data-parent attrubute to list html content generated by JIRA encoder. ([fe96d7a](https://bitbucket.org/atlassian/atlaskit/commits/fe96d7a))

## 1.5.0 (2017-03-14)

## 1.5.0 (2017-03-14)


* feature; add links support for editor-jira ([40c6bcd](https://bitbucket.org/atlassian/atlaskit/commits/40c6bcd))

## 1.4.0 (2017-03-13)


* feature; add custom encoders for Jira, currently supports only mention encoder ([e113578](https://bitbucket.org/atlassian/atlaskit/commits/e113578))
* feature; add mentions support to editor-jira ([7a01b55](https://bitbucket.org/atlassian/atlaskit/commits/7a01b55))

## 1.3.3 (2017-03-08)

## 1.3.2 (2017-03-03)


* fix; adding DefaultKeymapsPlugin for new Redo keymaps to editor-bitbucket, editor-jira an ([b70508b](https://bitbucket.org/atlassian/atlaskit/commits/b70508b))
* fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* fix; updating editor-core version ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))


* updated dependency version ([b192339](https://bitbucket.org/atlassian/atlaskit/commits/b192339))

## 1.3.1 (2017-02-23)


* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.3.0 (2017-02-20)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.2.0 (2017-02-14)


* feature; Allow JIRA editor to be collapsed ([9044171](https://bitbucket.org/atlassian/atlaskit/commits/9044171))

## 1.1.4 (2017-02-07)

## 1.1.3 (2017-02-07)


* fix; Add a readme story. ([b607b6d](https://bitbucket.org/atlassian/atlaskit/commits/b607b6d))
* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))

## 1.1.2 (2017-02-03)


* Encode empty documents as '' rather than &nbsp; ([940fb5e](https://bitbucket.org/atlassian/atlaskit/commits/940fb5e))
* Handle JIRA encoding multiple <br> and <hr>. ([f177d4c](https://bitbucket.org/atlassian/atlaskit/commits/f177d4c))
* fix; Add a Readme story. ([68791cf](https://bitbucket.org/atlassian/atlaskit/commits/68791cf))
