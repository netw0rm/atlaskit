# @atlaskit/multi-select

## 15.0.0 (2018-01-16)









* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 14.0.0 (2018-01-16)








* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 13.0.0 (2018-01-16)







* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 12.0.0 (2018-01-15)






* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 11.0.0 (2018-01-15)





* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 10.0.0 (2018-01-15)




* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 9.0.0 (2018-01-14)



* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 8.0.0 (2018-01-11)


* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))



* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))


* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))



* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))



* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))


* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))









* bug fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))


* feature; multi-select allows custom icon (issues closed: donut-410) ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))


* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* feature; multi-select has the shouldFlip property, which will be passed to droplist (issues closed: #ak-3041) ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))






* bug fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))





* feature; adding prop filterValues to Multi-select's Item. (issues closed: ak-2857) ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))







* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

* feature; add invalidMessage property to multi-select (issues closed: ak-2094) ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))

* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))
* breaking; refactor multi-select to styled-components and change structure to match new sta (issues closed: #ak-2392) ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* bug fix; bumped dependencies in multi-select (issues closed: ak-2312) ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))


* bug fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))


* bug fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))

* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))
* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* bug fix; add prop-types as a dependency to avoid React 15.x warnings (issues closed: ak-2473) ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))



* bug fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie (issues closed: ak-2250) ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

* bug fix; bumps tag dependency version (issues closed: #2261) ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

* breaking;  ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))
* breaking; fixes NoMatchesFound message, filter selected items by values instead of reference (issues closed: ak-1605) ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))



* bug fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))


* breaking;  ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* breaking; upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))
* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))



* feature; removed explicit style! imports, set style-loader in webpack config (issues closed: ak-2025, ak-2159) ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))
* bug fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))











* bug fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))





* breaking;  ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))
* breaking; adds tag prop for relfecting elemBefore and appearnace on rendered tags (issues closed: ak-1987) ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))





* bug fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))

* bug fix; prevent default action if Enter pressed then Select is open (issues closed: #1935) ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))



* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))













* bug fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))




* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))






* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))






* bug fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))




* bug fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))







* bug fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))
* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))



* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))






* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

* bug fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))



* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))












## 7.1.7 (2017-11-30)

* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))


## 7.1.6 (2017-10-26)

* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 7.1.5 (2017-10-22)

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))
## 7.1.4 (2017-10-18)

* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))

## 7.1.3 (2017-09-14)

* bug fix; stateful Multi-select will fire onOpenChange only when the dropdown menu is opened o ([4d69a9d](https://bitbucket.org/atlassian/atlaskit/commits/4d69a9d))
## 7.1.2 (2017-09-11)

* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))
## 7.1.1 (2017-09-05)

* bug fix; update styles for ie11 to respect flex-wrap ([7cec339](https://bitbucket.org/atlassian/atlaskit/commits/7cec339))
## 7.1.0 (2017-08-31)



* bug fix; loading options should not be exposed on the stateful component (issues closed: ak-3181) ([5eb9413](https://bitbucket.org/atlassian/atlaskit/commits/5eb9413))
* feature; added loading state for the initial fetching of data on the multi-select component (issues closed: ak-3181) ([638afd5](https://bitbucket.org/atlassian/atlaskit/commits/638afd5))
## 7.0.0 (2017-08-30)

* feature; update field base dependency for darkmode ([baeb283](https://bitbucket.org/atlassian/atlaskit/commits/baeb283))
* breaking; multi select has dark mode, util-shared-styles removed ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))
* breaking; add dark mode to multi-select (issues closed: #ak-3400) ([26ffe5c](https://bitbucket.org/atlassian/atlaskit/commits/26ffe5c))

## 6.9.3 (2017-08-19)

* bug fix; aK-2249 use variables from utils-shared-styles instead of hard-coding font-size and (issues closed: ak-2249) ([77e32f8](https://bitbucket.org/atlassian/atlaskit/commits/77e32f8))
* bug fix; aK-2249 add font-size to multi-select input style to fix placeholder clipping in saf (issues closed: ak-2249) ([3048e4a](https://bitbucket.org/atlassian/atlaskit/commits/3048e4a))
## 6.9.2 (2017-08-11)

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))










## 6.9.1 (2017-07-27)


* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 6.9.0 (2017-07-25)


* feature; multi-select allows custom icon ([26e1a22](https://bitbucket.org/atlassian/atlaskit/commits/26e1a22))

## 6.8.1 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 6.8.0 (2017-07-20)


* feature; multi-select has the shouldFlip property, which will be passed to droplist ([14f7a50](https://bitbucket.org/atlassian/atlaskit/commits/14f7a50))

## 6.4.0 (2017-07-17)

## 6.4.0 (2017-07-17)

## 6.4.0 (2017-07-17)


* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 6.4.0 (2017-07-17)


* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 6.3.0 (2017-07-05)


* feature; adding prop filterValues to Multi-select's Item. ([b7c3342](https://bitbucket.org/atlassian/atlaskit/commits/b7c3342))

## 6.2.0 (2017-06-21)


* feature; adds \`footer\` prop to multiselect ([97f5113](https://bitbucket.org/atlassian/atlaskit/commits/97f5113))

## 6.1.0 (2017-06-16)


* feature; add invalidMessage property to multi-select ([f2ef82d](https://bitbucket.org/atlassian/atlaskit/commits/f2ef82d))

## 6.0.0 (2017-06-14)


null refactor multi-select to styled-components and change structure to match new sta ([10ecbc8](https://bitbucket.org/atlassian/atlaskit/commits/10ecbc8))


* feature; extend API of items prop to accept an array of items as well as an array of groups ([f1408de](https://bitbucket.org/atlassian/atlaskit/commits/f1408de))


* breaking; StatelessMultiSelect renamed to MultiSelectStateless for consistency | Move from less to styled
components

ISSUES CLOSED: #AK-2392

## 5.1.1 (2017-06-02)


* fix; bumped dependencies in multi-select ([21f4dd3](https://bitbucket.org/atlassian/atlaskit/commits/21f4dd3))

## 5.1.0 (2017-05-31)


* fix; items are now rendered with the correct type ([8cfa749](https://bitbucket.org/atlassian/atlaskit/commits/8cfa749))
* fix; update state with items when props received ([819b0b6](https://bitbucket.org/atlassian/atlaskit/commits/819b0b6))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))


* feature; create new item in multi-select is implemented ([f5df509](https://bitbucket.org/atlassian/atlaskit/commits/f5df509))
* feature; don't create an existing value ([c2d9c02](https://bitbucket.org/atlassian/atlaskit/commits/c2d9c02))

## 5.0.2 (2017-05-08)


* fix; multi-select - fixed bug preventing shift-tabbing focus away from a multi-select fie ([913de82](https://bitbucket.org/atlassian/atlaskit/commits/913de82))

## 5.0.1 (2017-05-04)


* fix; bumps tag dependency version ([4a53c4d](https://bitbucket.org/atlassian/atlaskit/commits/4a53c4d))

## 5.0.0 (2017-05-01)


* fix; display NoMatchesFound message, filter selected items by values ([bd00f35](https://bitbucket.org/atlassian/atlaskit/commits/bd00f35))
* fix; fixes NoMatchesFound message, filter selected items by values instead of reference ([1586172](https://bitbucket.org/atlassian/atlaskit/commits/1586172))


* breaking; Selected items are filtered out from the dropdown by theirs values instead of references

ISSUES CLOSED: AK-1605

## 4.0.1 (2017-04-27)

## 4.0.0 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))


null upgrade multi-select's dependencies: tag to 2.1.0, tag-group to 2.0.0 ([5da8e4e](https://bitbucket.org/atlassian/atlaskit/commits/5da8e4e))


* breaking; Introduce styled-component as a peer dependency

## 3.1.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 3.1.0 (2017-04-20)


* fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))


null temporarily revert changes ([8d22c2d](https://bitbucket.org/atlassian/atlaskit/commits/8d22c2d))

## 3.0.0 (2017-04-05)

## 2.8.7 (2017-03-31)

## 2.8.6 (2017-03-29)


* fix; fixes bug where group headings would be shown when all items had been selected ([674a87a](https://bitbucket.org/atlassian/atlaskit/commits/674a87a))


* feature; adds tag prop for relfecting elemBefore and appearnace on rendered tags ([e33e32b](https://bitbucket.org/atlassian/atlaskit/commits/e33e32b))


* breaking; tagElemBefore has been replaced with tag.elemBefore and tag.appearance has been added

ISSUES CLOSED: AK-1987

## 2.8.5 (2017-03-23)

## 2.8.4 (2017-03-23)


* fix; prevent default action if Enter pressed then Select is open ([ebd0d03](https://bitbucket.org/atlassian/atlaskit/commits/ebd0d03))
* fix; story with items descriptions is added ([acbf97b](https://bitbucket.org/atlassian/atlaskit/commits/acbf97b))
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 2.8.2 (2017-03-21)

## 2.8.2 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 2.8.1 (2017-03-21)


* fix; adds proper itemShape validation and adds docs for Item in multiselect ([9d8198a](https://bitbucket.org/atlassian/atlaskit/commits/9d8198a))

## 2.8.0 (2017-03-07)


* feature; adds elemBefore and tagElemBefore props to multiselect ([67eef9f](https://bitbucket.org/atlassian/atlaskit/commits/67eef9f))

## 2.7.0 (2017-02-23)

## 2.6.6 (2017-02-22)


* prevent default behavior for 'up' and 'down' key ([86a4716](https://bitbucket.org/atlassian/atlaskit/commits/86a4716))


* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))

## 2.6.5 (2017-02-14)


* basic keyboard navigation is fixed ([8838672](https://bitbucket.org/atlassian/atlaskit/commits/8838672))

## 2.6.3 (2017-02-14)

## 2.6.3 (2017-02-14)


* fix broken focus ring and scrolling ([6e30737](https://bitbucket.org/atlassian/atlaskit/commits/6e30737))

## 2.6.2 (2017-02-09)


* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))

## 2.6.1 (2017-02-09)


* clear input field when an item is selected ([95fbd48](https://bitbucket.org/atlassian/atlaskit/commits/95fbd48))

## 2.6.0 (2017-02-09)


* fix; selected items now appending themselves, not prepending ([dc563f9](https://bitbucket.org/atlassian/atlaskit/commits/dc563f9))

## 2.5.1 (2017-02-09)


* fix; fix height of the multi-select ([2eacf9f](https://bitbucket.org/atlassian/atlaskit/commits/2eacf9f))


* feature; isFocusedInitially implemented ([5747dd7](https://bitbucket.org/atlassian/atlaskit/commits/5747dd7))

## 2.5.0 (2017-02-08)

## 2.4.0 (2017-02-08)


* feature; placeholder is implemented ([02d4946](https://bitbucket.org/atlassian/atlaskit/commits/02d4946))

## 2.3.1 (2017-02-07)


* multi select now closes itself after an item is selected ([a0dae54](https://bitbucket.org/atlassian/atlaskit/commits/a0dae54))
* update to the latest field base with the correct design ([ce38252](https://bitbucket.org/atlassian/atlaskit/commits/ce38252))


* feature; isInvalid, isRequired, isDisabled, isFirstChild properties are implemented ([f2b1b4f](https://bitbucket.org/atlassian/atlaskit/commits/f2b1b4f))

## 2.3.0 (2017-02-07)


* feature; 'default selected' items are implemented ([6c0242a](https://bitbucket.org/atlassian/atlaskit/commits/6c0242a))

## 2.2.1 (2017-02-06)


* fix; return correct value when onChange for the values happens ([d7b4e2f](https://bitbucket.org/atlassian/atlaskit/commits/d7b4e2f))

## 2.2.0 (2017-02-06)


* feature; support for the native submit is implemented ([dcc969a](https://bitbucket.org/atlassian/atlaskit/commits/dcc969a))

## 2.1.0 (2017-02-03)


* basic autocomplete is implemented ([98df620](https://bitbucket.org/atlassian/atlaskit/commits/98df620))
* noMatchesFound prop was added ([918b7cf](https://bitbucket.org/atlassian/atlaskit/commits/918b7cf))
