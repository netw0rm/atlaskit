# @atlaskit/editor-core

## 57.0.0 (2017-11-09)



* bug fix; prevent markdown syntax highlighting in inline code (issues closed: ed-2861) ([d2dece7](https://bitbucket.org/atlassian/atlaskit/commits/d2dece7))

* bug fix; added validation of the deserialized document on first load (issues closed: ed-3104) ([95e045a](https://bitbucket.org/atlassian/atlaskit/commits/95e045a))


* bug fix; replaceDocument should allow JSON object as an argument ([a60e106](https://bitbucket.org/atlassian/atlaskit/commits/a60e106))

* bug fix; fix tables decoration on load if doc contains a table (issues closed: ed-3080) ([1741e0d](https://bitbucket.org/atlassian/atlaskit/commits/1741e0d))

* bug fix; autoformatting should not work inside inline code marks. (issues closed: #ed-2815) ([2b5fe26](https://bitbucket.org/atlassian/atlaskit/commits/2b5fe26))
* bug fix; fix position of floating hyperlink toolbar. (issues closed: #ed-2427) ([b6f08a9](https://bitbucket.org/atlassian/atlaskit/commits/b6f08a9))

* bug fix; clear formatting should remove superscript/subscript marks (issues closed: ed-3082) ([347a096](https://bitbucket.org/atlassian/atlaskit/commits/347a096))
* bug fix; bump editor-core to same version as editor-jira to fix tests ([6f023fa](https://bitbucket.org/atlassian/atlaskit/commits/6f023fa))
* bug fix; bump @atlaskit/editor-core to use mediapicker v10 (issues closed: ed-3083) ([330935a](https://bitbucket.org/atlassian/atlaskit/commits/330935a))
* bug fix; bump @atlaskit/emoji to the latest to get mediapicker dependency to v10 ([1d4a404](https://bitbucket.org/atlassian/atlaskit/commits/1d4a404))
* bug fix; re-export createSchema from editor-core ([ec5f059](https://bitbucket.org/atlassian/atlaskit/commits/ec5f059))


* bug fix; reenabled ToolbarEmojiPicker tests (issues closed: fs-1449) ([7fae478](https://bitbucket.org/atlassian/atlaskit/commits/7fae478))
* feature; fs-951 clicking escape when the picker is open closes it (issues closed: fs-951) ([2ed2d44](https://bitbucket.org/atlassian/atlaskit/commits/2ed2d44))

* feature; added disabled prop to new arch (issues closed: ed-3036) ([4407a2f](https://bitbucket.org/atlassian/atlaskit/commits/4407a2f))
* feature; add confluence inline comment mark. (issues closed: ed-2974) ([246b433](https://bitbucket.org/atlassian/atlaskit/commits/246b433))


* feature; rename MediaItem prop to stateManagerFallback ([042f83f](https://bitbucket.org/atlassian/atlaskit/commits/042f83f))

* bug fix; pass popupsMountPoint and popupsBoundariesElement to all appearances (issues closed: ed-3060) ([0ab2923](https://bitbucket.org/atlassian/atlaskit/commits/0ab2923))
* bug fix; update version of Button to omit empty ButtonGroup warning ([2836ca9](https://bitbucket.org/atlassian/atlaskit/commits/2836ca9))
* breaking; JSONSerializer (renderer) is now JSON transformer ([32f99e7](https://bitbucket.org/atlassian/atlaskit/commits/32f99e7))
* breaking; use base renderer files from renderer package ([32f99e7](https://bitbucket.org/atlassian/atlaskit/commits/32f99e7))
* bug fix; show UnsupportedBlock when renderDocument throws exception (issues closed: ed-3061) ([a3f6266](https://bitbucket.org/atlassian/atlaskit/commits/a3f6266))

* feature; emoticons to emoji cxhtml transform ([3b72b96](https://bitbucket.org/atlassian/atlaskit/commits/3b72b96))


* breaking; onExpand is no longer supported for the 'new-arch' editor. Consumers should use CollapsedEditor ([80c639c](https://bitbucket.org/atlassian/atlaskit/commits/80c639c))
* breaking; refactor CollapsedEditor to remove the need for onExpand prop in the new arch ([80c639c](https://bitbucket.org/atlassian/atlaskit/commits/80c639c))







* bug fix; add imageUploadProvider to ToolDrawer, fix collapsededitor state ([1c232e0](https://bitbucket.org/atlassian/atlaskit/commits/1c232e0))
* bug fix; absorb setValue into replaceDocument editor action ([85c79c8](https://bitbucket.org/atlassian/atlaskit/commits/85c79c8))


* feature; port upload-image plugin to the new architecture ([af102fb](https://bitbucket.org/atlassian/atlaskit/commits/af102fb))
* breaking; The imageUploadHandler prop has been removed in favor of imageUploadProvider. ([ef73026](https://bitbucket.org/atlassian/atlaskit/commits/ef73026))
* breaking; set the imageUploadHandler using providers ([ef73026](https://bitbucket.org/atlassian/atlaskit/commits/ef73026))
* bug fix; makes editor placeholder non clickable (issues closed: ed-2939) ([b11a221](https://bitbucket.org/atlassian/atlaskit/commits/b11a221))
* bug fix; use library method to determine end of the document ([e2de547](https://bitbucket.org/atlassian/atlaskit/commits/e2de547))

* bug fix; restrict image width in the editor, to the width of the editor ([6a21d5f](https://bitbucket.org/atlassian/atlaskit/commits/6a21d5f))
* bug fix; fix use of upload-image plugin in story editor ([6aa9ae4](https://bitbucket.org/atlassian/atlaskit/commits/6aa9ae4))
* feature; export CollapsedEditor from the editor-core repo ([a398ca3](https://bitbucket.org/atlassian/atlaskit/commits/a398ca3))
* bug fix; allow consumers to fully control the collapsed state of CollapsedEditor ([b133030](https://bitbucket.org/atlassian/atlaskit/commits/b133030))
* feature; add setValue action to the editor ([a08c28f](https://bitbucket.org/atlassian/atlaskit/commits/a08c28f))
* bug fix; preprocessDoc returns new document instead of updating existing one (issues closed: ed-3047) ([a539825](https://bitbucket.org/atlassian/atlaskit/commits/a539825))
* bug fix; editor font style dropdown now shows label correctly (issues closed: ak-3651 ed-2952) ([4047555](https://bitbucket.org/atlassian/atlaskit/commits/4047555))

* bug fix; newlines removed from pasted text (issues closed: ed-2888) ([792f451](https://bitbucket.org/atlassian/atlaskit/commits/792f451))

* breaking; JSON renderer is now JSON transformer ([b30653c](https://bitbucket.org/atlassian/atlaskit/commits/b30653c))
* breaking; move JSON Renderer into editor-core transformers (issues closed: ed-3024) ([b30653c](https://bitbucket.org/atlassian/atlaskit/commits/b30653c))
* bug fix; work around cursor position issues in Chrome 58-62 (issues closed: ed-2960) ([3d86c08](https://bitbucket.org/atlassian/atlaskit/commits/3d86c08))

* bug fix; cleanup ([497ca27](https://bitbucket.org/atlassian/atlaskit/commits/497ca27))
* bug fix; call onChange only on document change (issues closed: ed-2421) ([fbadb9a](https://bitbucket.org/atlassian/atlaskit/commits/fbadb9a))

* bug fix; bump editor-common ([7640450](https://bitbucket.org/atlassian/atlaskit/commits/7640450))
* feature; add support for popupsMountPoint to the new architecture ([700c36f](https://bitbucket.org/atlassian/atlaskit/commits/700c36f))

* bug fix; fix macro ([1e6fd61](https://bitbucket.org/atlassian/atlaskit/commits/1e6fd61))
* breaking; Schema is now being published by editor-common ([9617437](https://bitbucket.org/atlassian/atlaskit/commits/9617437))
* breaking; consume schema from editor-common and remove prosemirror-types ([9617437](https://bitbucket.org/atlassian/atlaskit/commits/9617437))
* bug fix; "Insert link" scrolls to top of page (issues closed: ed-2992) ([eee5586](https://bitbucket.org/atlassian/atlaskit/commits/eee5586))


* bug fix; fix renderer dependency ([0b3d323](https://bitbucket.org/atlassian/atlaskit/commits/0b3d323))


* feature; added macro edit toolbar (issues closed: ed-1808) ([dc5d28b](https://bitbucket.org/atlassian/atlaskit/commits/dc5d28b))

* bug fix; prevent text autoformatting within nodes that do not allow the given mark ([05f96d6](https://bitbucket.org/atlassian/atlaskit/commits/05f96d6))
* breaking; Headings can no longer contain any marks other than link, bringing it to parity with the schema. ([5248d6f](https://bitbucket.org/atlassian/atlaskit/commits/5248d6f))
* breaking; only allow inline nodes and link marks in headings (issues closed: ed-74) ([5248d6f](https://bitbucket.org/atlassian/atlaskit/commits/5248d6f))



* bug fix; toolbarInsertBlockWrapper crashes without media provider (issues closed: ed-3010) ([87b1f88](https://bitbucket.org/atlassian/atlaskit/commits/87b1f88))


* bug fix; editor's filmstrip shows vertical bars when it shouldn't (issues closed: ed-2921) ([bec07ee](https://bitbucket.org/atlassian/atlaskit/commits/bec07ee))


* bug fix; refactored ToolbarInsertBlock ([7629918](https://bitbucket.org/atlassian/atlaskit/commits/7629918))
* bug fix; updated macro plugin to dispatch macroProvider = null if it failed to resolve the pr ([43bea30](https://bitbucket.org/atlassian/atlaskit/commits/43bea30))
* feature; expose MentionsResult interface from mention ([a817c63](https://bitbucket.org/atlassian/atlaskit/commits/a817c63))
* bug fix; refactored macro plugin ([fa0ee6c](https://bitbucket.org/atlassian/atlaskit/commits/fa0ee6c))
* bug fix; merged master ([78ae215](https://bitbucket.org/atlassian/atlaskit/commits/78ae215))




* bug fix; fix tests in picker-facade-spec.ts ([40887b6](https://bitbucket.org/atlassian/atlaskit/commits/40887b6))
* bug fix; skip backwards compatibility test ([3a637c2](https://bitbucket.org/atlassian/atlaskit/commits/3a637c2))
* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))

* bug fix; fixed failing media test ([d37addd](https://bitbucket.org/atlassian/atlaskit/commits/d37addd))
* feature; add media drop placeholder (issues closed: ed-2377) ([dd1702f](https://bitbucket.org/atlassian/atlaskit/commits/dd1702f))
* feature; added Macro to insert menu (issues closed: ed-2827) ([f166000](https://bitbucket.org/atlassian/atlaskit/commits/f166000))
* bug fix; measure renderer stat with HiRes API (issues closed: ed-2954) ([3717b4e](https://bitbucket.org/atlassian/atlaskit/commits/3717b4e))
* bug fix; pasting file in only pastes file name (issues closed: ed-2222) ([9dea044](https://bitbucket.org/atlassian/atlaskit/commits/9dea044))




* feature; added CollapsedEditor component (issues closed: ed-2944) ([8172b3e](https://bitbucket.org/atlassian/atlaskit/commits/8172b3e))
* bug fix; fixed logic on media context setting in storybook. ([b280156](https://bitbucket.org/atlassian/atlaskit/commits/b280156))
* feature; add support for alt-paste, fix clipboard analytics. (issues closed: ed-2882) ([9b2de80](https://bitbucket.org/atlassian/atlaskit/commits/9b2de80))


* bug fix; enable lists in comment editor story ([cd8a647](https://bitbucket.org/atlassian/atlaskit/commits/cd8a647))

* bug fix; remove erraneous showHelp state from Comment editor ([ff602b4](https://bitbucket.org/atlassian/atlaskit/commits/ff602b4))
* bug fix; renderer should add appropriate "rel" attribute to prevent vulnerabilities in extern (issues closed: ed-2900) ([03907dd](https://bitbucket.org/atlassian/atlaskit/commits/03907dd))

* bug fix; adding transformer for hipchat editor to remove empty task items and decision items ([562cf5e](https://bitbucket.org/atlassian/atlaskit/commits/562cf5e))
* bug fix; file names should not get linkified. (issues closed: #ed-2887) ([adc5419](https://bitbucket.org/atlassian/atlaskit/commits/adc5419))

* feature; fixing renderer performance ([7e6c3cb](https://bitbucket.org/atlassian/atlaskit/commits/7e6c3cb))

* feature; added Macro provider mock and Macro ui component (issues closed: ed-2878,ed-2917) ([ea3aaad](https://bitbucket.org/atlassian/atlaskit/commits/ea3aaad))
* feature; always reset media plugin when set media provider ([5ef4d81](https://bitbucket.org/atlassian/atlaskit/commits/5ef4d81))
* breaking; storyMediaProviderFactory API in test-helper accepts a config instead of multiple params ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))
* breaking; refactor storyMediaProviderFactory to accept a config instead of multiple param ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))


* bug fix; incorrect behaviour around mentions (issues closed: ed-1831) ([0df6c9d](https://bitbucket.org/atlassian/atlaskit/commits/0df6c9d))
* bug fix; incorrect behaviour around emojis (issues closed: ed-1831) ([a0f9ada](https://bitbucket.org/atlassian/atlaskit/commits/a0f9ada))
* bug fix; use button group in comment appearance; show cancel button in story ([1a61d32](https://bitbucket.org/atlassian/atlaskit/commits/1a61d32))
* bug fix; use ButtonGroup from @atlaskit/button package instead of depreciated source (issues closed: ed-2918) ([5184fdb](https://bitbucket.org/atlassian/atlaskit/commits/5184fdb))
* bug fix; rename AkButton import and use Atlaskit grid size for styled-components ([5679d5b](https://bitbucket.org/atlassian/atlaskit/commits/5679d5b))
* bug fix; do not show ToolbarHelp in new architecture ([bf8ea6d](https://bitbucket.org/atlassian/atlaskit/commits/bf8ea6d))
* bug fix; pass correct type when we want to suppress media in comment appearance ([52d5010](https://bitbucket.org/atlassian/atlaskit/commits/52d5010))

* bug fix; build new JSON schema ([56b52fd](https://bitbucket.org/atlassian/atlaskit/commits/56b52fd))
* feature; introduce the comment editor appearance 🎉 (issues closed: ed-2877) ([1e7d4df](https://bitbucket.org/atlassian/atlaskit/commits/1e7d4df))

* breaking; updated media provider api for new authentication on media picker. updated media provider api in ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
* breaking; updated the API of media provider for new authentication on media picker. ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
* bug fix; sending a link with missing href causes exception in the renderer (issues closed: ed-2875) ([a58a1da](https://bitbucket.org/atlassian/atlaskit/commits/a58a1da))

* feature; added inline-marco transformer (issues closed: ed-1811) ([fb3aba5](https://bitbucket.org/atlassian/atlaskit/commits/fb3aba5))
* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))


* bug fix; refactored how inline-dialog handles max-width in order to better support scrollable ([20b62a6](https://bitbucket.org/atlassian/atlaskit/commits/20b62a6))


* bug fix; build for editor-core json-schema ([024b5c3](https://bitbucket.org/atlassian/atlaskit/commits/024b5c3))
* bug fix; remove code block when pressing backspace in an empty one (issues closed: ed-1572) ([7cd1579](https://bitbucket.org/atlassian/atlaskit/commits/7cd1579))
* feature; only clear formatting of marks, and heading nodes; don't modify block nodes (issues closed: ed-2775) ([97131bd](https://bitbucket.org/atlassian/atlaskit/commits/97131bd))
* bug fix; mention picker selection should not break when user enters space. (issues closed: #ed-2863) ([ad54cdc](https://bitbucket.org/atlassian/atlaskit/commits/ad54cdc))
* feature; ac:inline-comment-marker cxhtml transformer added to editor-core confluence-schema ([09de9e0](https://bitbucket.org/atlassian/atlaskit/commits/09de9e0))


* feature; action/decision related analytics (issues closed: fs-1290) ([38ade4e](https://bitbucket.org/atlassian/atlaskit/commits/38ade4e))
* bug fix; debounce onChange in editor-core ([d2ac593](https://bitbucket.org/atlassian/atlaskit/commits/d2ac593))
* bug fix; fix text color parse/encode ([64c9859](https://bitbucket.org/atlassian/atlaskit/commits/64c9859))
* feature; add a userType attribute to the mention node (issues closed: ed-2826) ([24ed8de](https://bitbucket.org/atlassian/atlaskit/commits/24ed8de))


* bug fix; use lowercased language names for code-block adf representation (issues closed: ed-2813) ([05ed3dc](https://bitbucket.org/atlassian/atlaskit/commits/05ed3dc))
* bug fix; make ToolbarInsertBlock's mediaDisabled key less ambiguous (issues closed: ed-2865) ([1890835](https://bitbucket.org/atlassian/atlaskit/commits/1890835))



* bug fix; fix warning due to using component other than Button inside ButtonGroup (issues closed: #ed-2866) ([931a469](https://bitbucket.org/atlassian/atlaskit/commits/931a469))
* bug fix; don't show the media dropdown in the Insert Toolbar if no uploadContext is present (issues closed: ed-2865) ([b6d49d6](https://bitbucket.org/atlassian/atlaskit/commits/b6d49d6))
* bug fix; fS-1330 disable tooltip when emoji picker is open (issues closed: fs-1330) ([cd875da](https://bitbucket.org/atlassian/atlaskit/commits/cd875da))

* bug fix; revert code-splitting from editor-core ([c0586d0](https://bitbucket.org/atlassian/atlaskit/commits/c0586d0))
* bug fix; emoji TypeAhead doesn't go away after submitting a comment in BB (issues closed: ed-2633) ([3fc98cf](https://bitbucket.org/atlassian/atlaskit/commits/3fc98cf))
* bug fix; add editorView.destroy in mentions plugin ([cc8cc37](https://bitbucket.org/atlassian/atlaskit/commits/cc8cc37))
* bug fix; mention type-ahead does not disappear when user uses keyboard shortcut Shift+Enter (issues closed: ed-2761, hnw-2580) ([12952c7](https://bitbucket.org/atlassian/atlaskit/commits/12952c7))
* feature; display inline macro place holder as an image. ([c52fe97](https://bitbucket.org/atlassian/atlaskit/commits/c52fe97))
* bug fix; check if link is compatible with existing marks before adding link (issues closed: ed-2218) ([f8578c9](https://bitbucket.org/atlassian/atlaskit/commits/f8578c9))
* feature; add support for detecting mark-types in a selection ([f5ce040](https://bitbucket.org/atlassian/atlaskit/commits/f5ce040))
* bug fix; fix error where mark type groups were not being properly filtered out (issues closed: ed-2805) ([b3f2f5d](https://bitbucket.org/atlassian/atlaskit/commits/b3f2f5d))




* feature; update json-schema with inlineMacro node. ([ad90c0f](https://bitbucket.org/atlassian/atlaskit/commits/ad90c0f))
* feature; added inlineMacro node. ([99c6b38](https://bitbucket.org/atlassian/atlaskit/commits/99c6b38))
* feature; addes in occurrenceKey in link mark (issues closed: ed-2765) ([b4687a0](https://bitbucket.org/atlassian/atlaskit/commits/b4687a0))
* feature; addes in optional id and collection for link mark. These two properties will be ins (issues closed: ed-2750) ([c3ed647](https://bitbucket.org/atlassian/atlaskit/commits/c3ed647))

* bug fix; triple backticks in middle of paragraph if followed by space or enter should create ([58c2754](https://bitbucket.org/atlassian/atlaskit/commits/58c2754))

* feature; upgrade to latest emoji support, with latest upload features (issues closed: fs-1395) ([a0a6f34](https://bitbucket.org/atlassian/atlaskit/commits/a0a6f34))

* bug fix; editing a link results in malformed / wrong links (issues closed: ed-2749, hnw-3015) ([4c9f314](https://bitbucket.org/atlassian/atlaskit/commits/4c9f314))
* bug fix; trigger onChange only after content has actually changed (issues closed: ed-2841) ([3b77318](https://bitbucket.org/atlassian/atlaskit/commits/3b77318))
* bug fix; fix typescript validation error in test. ([a6f3d53](https://bitbucket.org/atlassian/atlaskit/commits/a6f3d53))
* bug fix; added editorView.destroy(); to plugin tests ([adfb751](https://bitbucket.org/atlassian/atlaskit/commits/adfb751))
* bug fix; add unmount to all ui tests (issues closed: ed-2836) ([621681a](https://bitbucket.org/atlassian/atlaskit/commits/621681a))

* bug fix; add support for deleted / non-existant users to profile cards (issues closed: hnw-3062, ed-2762) ([86b8848](https://bitbucket.org/atlassian/atlaskit/commits/86b8848))
* feature; bump media-card ([06caa58](https://bitbucket.org/atlassian/atlaskit/commits/06caa58))



* feature; remove bottom toolbar from full-page editor (issues closed: ed-2783) ([cf7a7da](https://bitbucket.org/atlassian/atlaskit/commits/cf7a7da))

* feature; bump media-card and media-filmstrip ([e3baf5b](https://bitbucket.org/atlassian/atlaskit/commits/e3baf5b))
* bug fix; upgrading emoji toolbar button to use new popup component for select. (issues closed: #ed-1523) ([2741a7b](https://bitbucket.org/atlassian/atlaskit/commits/2741a7b))
* bug fix; attempt 1 to fix the build ([3c5796f](https://bitbucket.org/atlassian/atlaskit/commits/3c5796f))

* bug fix; added panel support to new editor architecture (issues closed: ed-2804) ([c56e5fd](https://bitbucket.org/atlassian/atlaskit/commits/c56e5fd))
* bug fix; revert quick tooltip fix for emoji picker. (issues closed: fs-1330) ([a47a20d](https://bitbucket.org/atlassian/atlaskit/commits/a47a20d))


* feature; revise text color palette to a reduced set (issues closed: ed-2679) ([9673a86](https://bitbucket.org/atlassian/atlaskit/commits/9673a86))
* bug fix; fix code splitted mediapicker in editor-core (issues closed: ed-2776) ([46b96c7](https://bitbucket.org/atlassian/atlaskit/commits/46b96c7))

* feature; help dialog should show hints for only those nodes and marks supported by the schem (issues closed: #ed-2671) ([7181eac](https://bitbucket.org/atlassian/atlaskit/commits/7181eac))
* bug fix; code splitted mediapicker from editor-core (issues closed: ed-2776) ([310cfb9](https://bitbucket.org/atlassian/atlaskit/commits/310cfb9))
* bug fix; update editor schema with json code block language (issues closed: ed-2756) ([211a8b6](https://bitbucket.org/atlassian/atlaskit/commits/211a8b6))
* bug fix; fix emoji rendering no longer passing down the providerFactory (issues closed: fs-1383) ([03110dd](https://bitbucket.org/atlassian/atlaskit/commits/03110dd))

* feature; add JSON as a supported language for code blocks (issues closed: ed-2767) ([b6debbf](https://bitbucket.org/atlassian/atlaskit/commits/b6debbf))
* bug fix; quick fix for emoji picker location in editor-core. Quick fix to disable tooltip whe (issues closed: fs-1379 / fs-1330) ([6b80bf7](https://bitbucket.org/atlassian/atlaskit/commits/6b80bf7))

* bug fix; code splitted avatar and logo (issues closed: ed-2776) ([1cad4c1](https://bitbucket.org/atlassian/atlaskit/commits/1cad4c1))

* bug fix; entering 2 back ticks followed by character between should create a code mark. (issues closed: #ed-2418) ([c7a8e66](https://bitbucket.org/atlassian/atlaskit/commits/c7a8e66))




* breaking; UI Renderer now has a "stat" field which has information about rendering. This is a breaking change ([26fff38](https://bitbucket.org/atlassian/atlaskit/commits/26fff38))
* breaking; measure PM tree creating time and rendering time in the Renderer (issues closed: ed-2233) ([26fff38](https://bitbucket.org/atlassian/atlaskit/commits/26fff38))

* bug fix; mention broken when select all and delete content. (issues closed: #ed-2705) ([cd5e52d](https://bitbucket.org/atlassian/atlaskit/commits/cd5e52d))
* feature; adding plugin in new architecture for help dialog to add it in banana editor (issues closed: ed-2589) ([a63ec66](https://bitbucket.org/atlassian/atlaskit/commits/a63ec66))
* bug fix; import styles from the right package ([caf8e1e](https://bitbucket.org/atlassian/atlaskit/commits/caf8e1e))
* bug fix; upgrade task-decision. Breaking changes not relevant to editor. (issues closed: fs-1371) ([652a38e](https://bitbucket.org/atlassian/atlaskit/commits/652a38e))
* bug fix; cleanup ([9274a2a](https://bitbucket.org/atlassian/atlaskit/commits/9274a2a))
* feature; return Atlassian Document from EditorActions.getValue (issues closed: ed-2755) ([711cd34](https://bitbucket.org/atlassian/atlaskit/commits/711cd34))
* bug fix; fixed parsing jira issue keys (issues closed: ed-1407) ([ff7ef80](https://bitbucket.org/atlassian/atlaskit/commits/ff7ef80))

* bug fix; regular text pastes as code (white-space: pre-wrap) (issues closed: ed-2627) ([252ef5b](https://bitbucket.org/atlassian/atlaskit/commits/252ef5b))


* bug fix; fixed jiraissue and unsupportedcontent nodes ([731120e](https://bitbucket.org/atlassian/atlaskit/commits/731120e))


* bug fix; it should be possible to convert a single character to inline code. (issues closed: #ed-2646) ([0afa7af](https://bitbucket.org/atlassian/atlaskit/commits/0afa7af))
* feature; adding telepointers and avatars (issues closed: ed-2574, ed-2575) ([e8311c1](https://bitbucket.org/atlassian/atlaskit/commits/e8311c1))





* feature; add Chromeless appearance (issues closed: ed-2629) ([0466c4d](https://bitbucket.org/atlassian/atlaskit/commits/0466c4d))
* bug fix; tslint fix ([39b2639](https://bitbucket.org/atlassian/atlaskit/commits/39b2639))
* bug fix; upgrade @atlaskit/button and @atlaskit/button-group dependencies (issues closed: #ed-2658) ([36c2820](https://bitbucket.org/atlassian/atlaskit/commits/36c2820))
* feature; cardEventHanlder now support an optional second argument to accept list of IDs if t (issues closed: ed-1774) ([6ed2276](https://bitbucket.org/atlassian/atlaskit/commits/6ed2276))


* bug fix; updated table floating controls ([b653ab2](https://bitbucket.org/atlassian/atlaskit/commits/b653ab2))


* bug fix; fixed placeholder, transformer and Editor confluence storybook ([de73aef](https://bitbucket.org/atlassian/atlaskit/commits/de73aef))
* bug fix; fix tslint ([ef20c32](https://bitbucket.org/atlassian/atlaskit/commits/ef20c32))
* bug fix; fixed jiraissue nodeview ([ab9e750](https://bitbucket.org/atlassian/atlaskit/commits/ab9e750))
* bug fix; pasting list converts first list item to paragraph. (issues closed: #ed-2647) ([15bbaf7](https://bitbucket.org/atlassian/atlaskit/commits/15bbaf7))
* bug fix; remove ourdated fallback attr, use text instead ([bffe13b](https://bitbucket.org/atlassian/atlaskit/commits/bffe13b))
* bug fix; special characters like brackets should be escaped in image attributes. (issues closed: #ed-1643) ([30d9d38](https://bitbucket.org/atlassian/atlaskit/commits/30d9d38))

* feature; added cxhtml transformer story ([2f18b50](https://bitbucket.org/atlassian/atlaskit/commits/2f18b50))
* bug fix; set DAC renderer maxHeight, which prevents double scroll (issues closed: ed-2530) ([721d231](https://bitbucket.org/atlassian/atlaskit/commits/721d231))
* feature; change Addons api a little bit to allow composition (issues closed: ed-2680) ([6aee0b1](https://bitbucket.org/atlassian/atlaskit/commits/6aee0b1))

* feature; added analytics tracking for unsupported content ([edef276](https://bitbucket.org/atlassian/atlaskit/commits/edef276))
* bug fix; return Card placeholders from "renderLoadingCard" if CardView is not loaded yet ([813b527](https://bitbucket.org/atlassian/atlaskit/commits/813b527))



* feature; added missing cq features to editor-core (issues closed: ed-2635) ([600b257](https://bitbucket.org/atlassian/atlaskit/commits/600b257))


* bug fix; make TS happy ([e8b27c3](https://bitbucket.org/atlassian/atlaskit/commits/e8b27c3))
* bug fix; fix typescript errors ([b5c597a](https://bitbucket.org/atlassian/atlaskit/commits/b5c597a))
* feature; add disable linkCreateContext in example editor (issues closed: ed-2670) ([033e67d](https://bitbucket.org/atlassian/atlaskit/commits/033e67d))
* feature; add toolbar button support for actions/decisions (issues closed: fs-1342) ([faddb0b](https://bitbucket.org/atlassian/atlaskit/commits/faddb0b))
* bug fix; render placeholder Card instead of null in MediaComponent ([1b73785](https://bitbucket.org/atlassian/atlaskit/commits/1b73785))
* bug fix; fix filmstrip arrow problem in renderer when not using code splitting (issues closed: ed-2667) ([c9cb09d](https://bitbucket.org/atlassian/atlaskit/commits/c9cb09d))
* bug fix; removed popup from tables (issues closed: ed-2486) ([65e34c6](https://bitbucket.org/atlassian/atlaskit/commits/65e34c6))

* bug fix; disable media link cards in actions/decisions nodes (issues closed: fs-1344) ([873e476](https://bitbucket.org/atlassian/atlaskit/commits/873e476))

* feature; colour text support in renderer (issues closed: ed-2657) ([d1608c9](https://bitbucket.org/atlassian/atlaskit/commits/d1608c9))
* bug fix; we need to make sure the component is not unmounted before we use this.setState in p (issues closed: ed-2448) ([b3301ea](https://bitbucket.org/atlassian/atlaskit/commits/b3301ea))

* feature; add showSpinner prop to Editor ([ac14e79](https://bitbucket.org/atlassian/atlaskit/commits/ac14e79))

* bug fix; tolerate empty actions/decisions, just don't render them. (issues closed: fs-1266) ([29a82db](https://bitbucket.org/atlassian/atlaskit/commits/29a82db))
* bug fix; eNTER on empty action/decision will not submit message, but remove action/decision (issues closed: ed-2447 / fs-1265 / fs-1329) ([9f77faa](https://bitbucket.org/atlassian/atlaskit/commits/9f77faa))
* bug fix; disabling hyperlink keymap Cmd-K for message editor. (issues closed: #ed-2567) ([ddf7769](https://bitbucket.org/atlassian/atlaskit/commits/ddf7769))

* feature; add defaultValue property for the "new arch" editor (issues closed: ed-2579) ([dc537cc](https://bitbucket.org/atlassian/atlaskit/commits/dc537cc))
* feature; add appendText command to EditorActions (issues closed: ed-2579) ([417f348](https://bitbucket.org/atlassian/atlaskit/commits/417f348))
* feature; add waitForMediaUpload flag for products that want to finalize media on their own (issues closed: ed-2579) ([7ee8106](https://bitbucket.org/atlassian/atlaskit/commits/7ee8106))
* feature; support presence provider ([4926ae0](https://bitbucket.org/atlassian/atlaskit/commits/4926ae0))
* bug fix; shouldFocus must place cursor to the end of the document (issues closed: ed-2579) ([e3f7187](https://bitbucket.org/atlassian/atlaskit/commits/e3f7187))
* feature; add maxHeight property to the 'new architecture' editor (issues closed: ed-2579) ([0cad06d](https://bitbucket.org/atlassian/atlaskit/commits/0cad06d))
* feature; add feature preset for Message editor (issues closed: ed-2579) ([69c5ee1](https://bitbucket.org/atlassian/atlaskit/commits/69c5ee1))

* bug fix; pass eventDispatcher to PluginSlot (issues closed: ed-2634) ([ee59df4](https://bitbucket.org/atlassian/atlaskit/commits/ee59df4))
* bug fix; fix editor-core storybook for real (issues closed: ed-2614) ([704a76e](https://bitbucket.org/atlassian/atlaskit/commits/704a76e))
* bug fix; fix filmstrip arrows don't show up in editor or renderer (issues closed: ed-2577) ([43291f6](https://bitbucket.org/atlassian/atlaskit/commits/43291f6))

* bug fix; do not show frequent links in the recently viewed link dialog ([5a175e9](https://bitbucket.org/atlassian/atlaskit/commits/5a175e9))

* feature; pasting a single word or single line of code should create an inline code block. ([e64a721](https://bitbucket.org/atlassian/atlaskit/commits/e64a721))

* bug fix; support activity provider in hyperlinkedit in new editor architecture ([d45ee4e](https://bitbucket.org/atlassian/atlaskit/commits/d45ee4e))
* bug fix; fire onChange only when docChanged = true (issues closed: ed-2421) ([5605a74](https://bitbucket.org/atlassian/atlaskit/commits/5605a74))
* bug fix; update min-height of single link card. ([bb7e71a](https://bitbucket.org/atlassian/atlaskit/commits/bb7e71a))
* bug fix; fix storybook for editor-core (issues closed: ed-2614) ([4bae650](https://bitbucket.org/atlassian/atlaskit/commits/4bae650))

* bug fix; making sure adding links with invalid href doesn't throw an error (issues closed: ed-2568) ([d44226f](https://bitbucket.org/atlassian/atlaskit/commits/d44226f))
* bug fix; fixed the bug that no text format after space. ([8aa1bfe](https://bitbucket.org/atlassian/atlaskit/commits/8aa1bfe))

* feature; dAC story with renderer (issues closed: ed-2530) ([005bdba](https://bitbucket.org/atlassian/atlaskit/commits/005bdba))
* bug fix; adjust behaviour of backspace into a decision/item list (issues closed: fs-1264) ([5db2517](https://bitbucket.org/atlassian/atlaskit/commits/5db2517))
* feature; render single link card with square appearance ([8197e31](https://bitbucket.org/atlassian/atlaskit/commits/8197e31))
* feature; add title/user in applicationCard (issues closed: ed-2532) ([a1c5790](https://bitbucket.org/atlassian/atlaskit/commits/a1c5790))


* feature; added Confluence transformer (issues closed: ed-1679) ([b9d48b3](https://bitbucket.org/atlassian/atlaskit/commits/b9d48b3))


* bug fix; pasting plain text in code block should not create a paragraph ([e7b133e](https://bitbucket.org/atlassian/atlaskit/commits/e7b133e))




* bug fix; workaround double events for the attached and detached upload button. (issues closed: fs-1322) ([b3e19c3](https://bitbucket.org/atlassian/atlaskit/commits/b3e19c3))
* bug fix; removed relative links and added tests ([9c07ea7](https://bitbucket.org/atlassian/atlaskit/commits/9c07ea7))

* bug fix; should not autoformat __ or _ in mid words. ([49a4df4](https://bitbucket.org/atlassian/atlaskit/commits/49a4df4))

* bug fix; remove auto formatting of relative links (issues closed: ed-2582) ([a36f9dc](https://bitbucket.org/atlassian/atlaskit/commits/a36f9dc))
* bug fix; change blockQuote to blockquote in JSON Schema (issues closed: ed-2594) ([b32cfe2](https://bitbucket.org/atlassian/atlaskit/commits/b32cfe2))

* feature; make ASCII conversion of emoji count as usage for showing frequent used emoji (issues closed: fs-1094) ([86a0be1](https://bitbucket.org/atlassian/atlaskit/commits/86a0be1))


* feature; collab-plugin ([2c896c7](https://bitbucket.org/atlassian/atlaskit/commits/2c896c7))
* feature; adding configuration to not allow deletion of table header. ([c5e1cc7](https://bitbucket.org/atlassian/atlaskit/commits/c5e1cc7))
* bug fix; fix for issue mention mark not removed even after whole text of mention is removed. ([ed7b58d](https://bitbucket.org/atlassian/atlaskit/commits/ed7b58d))
* bug fix; prevent media insertion for task/decisions (issues closed: fs-1240) ([48dcf05](https://bitbucket.org/atlassian/atlaskit/commits/48dcf05))



* feature; export ToolbarEmojiPicker for consumption by editor-hiphcat (issues closed: fs-1320) ([0226a5b](https://bitbucket.org/atlassian/atlaskit/commits/0226a5b))
* feature; exported AtlassianEmojiMigrationResource from editor-core ([e7e0eab](https://bitbucket.org/atlassian/atlaskit/commits/e7e0eab))
* bug fix; added async preloading of media-card chunk ([7a19c6d](https://bitbucket.org/atlassian/atlaskit/commits/7a19c6d))
* bug fix; split media-card with require.ensure ([1159f23](https://bitbucket.org/atlassian/atlaskit/commits/1159f23))
* bug fix; split profile card with require.ensure (issues closed: ed-2581) ([6901949](https://bitbucket.org/atlassian/atlaskit/commits/6901949))


* bug fix; fixed missing prop in tests ([0311be8](https://bitbucket.org/atlassian/atlaskit/commits/0311be8))

* feature; aligned emoji picker to right of editor ([98206e8](https://bitbucket.org/atlassian/atlaskit/commits/98206e8))
* feature; added ToolbarEmojiPicker to message editor (issues closed: fs-1092) ([ab2c080](https://bitbucket.org/atlassian/atlaskit/commits/ab2c080))
* feature; adding support for tables in bitbucket markdown serializer. ([2e0353c](https://bitbucket.org/atlassian/atlaskit/commits/2e0353c))

* bug fix; should not convert "\`some_variables_" to em ([2eaf1f6](https://bitbucket.org/atlassian/atlaskit/commits/2eaf1f6))
* bug fix; upgrade mediapicker to 7.0.3 (issues closed: ed-2556) ([2c36a86](https://bitbucket.org/atlassian/atlaskit/commits/2c36a86))


* bug fix; ignore markdown if have a backtick in the front. ([0f921b1](https://bitbucket.org/atlassian/atlaskit/commits/0f921b1))

* bug fix; group mentions and "self" mentions are not rendered in blue anymore (issues closed: ed-2553) ([b8aab4d](https://bitbucket.org/atlassian/atlaskit/commits/b8aab4d))
* feature; stricter JSON Schema (issues closed: ed-2555) ([39c99a2](https://bitbucket.org/atlassian/atlaskit/commits/39c99a2))




* bug fix; tolerate missing attributes for task/decision nodes. (issues closed: fs-1303) ([deab934](https://bitbucket.org/atlassian/atlaskit/commits/deab934))
* feature; adding support for lists in editor-hipchat schema ([c695497](https://bitbucket.org/atlassian/atlaskit/commits/c695497))
* bug fix; update the storybook for editor-core rnderer ([ce2ac94](https://bitbucket.org/atlassian/atlaskit/commits/ce2ac94))
* feature; application Card to support context (issues closed: ed-2532) ([eb57585](https://bitbucket.org/atlassian/atlaskit/commits/eb57585))



* bug fix; merged master ([4e39b8c](https://bitbucket.org/atlassian/atlaskit/commits/4e39b8c))


* bug fix; handle onClick events for application cards - open the link ([a70b447](https://bitbucket.org/atlassian/atlaskit/commits/a70b447))

* bug fix; fix broken CSS in recent search in link dialog ([f99a729](https://bitbucket.org/atlassian/atlaskit/commits/f99a729))


* bug fix; applicationCard with wrong attribute makes Banana unusable (Media) (issues closed: ed-2531) ([3693ba0](https://bitbucket.org/atlassian/atlaskit/commits/3693ba0))

* bug fix; multiple react warnings for UI components when pluginState is changed before compone (issues closed: ed-2535) ([1f77a58](https://bitbucket.org/atlassian/atlaskit/commits/1f77a58))
* bug fix; ensure getValidNode does not mutate the original node. (issues closed: fs-1295) ([0df91e2](https://bitbucket.org/atlassian/atlaskit/commits/0df91e2))

* feature; add FullPage apppearance for Editor (issues closed: ed-2337) ([bcd93ea](https://bitbucket.org/atlassian/atlaskit/commits/bcd93ea))
* bug fix; fixed tabbing when the whole row/col is selected ([33a123e](https://bitbucket.org/atlassian/atlaskit/commits/33a123e))

* bug fix; bump layer to align with transitive dependencies ([e0041c3](https://bitbucket.org/atlassian/atlaskit/commits/e0041c3))


* bug fix; fixed tabbing in tables ([79956ea](https://bitbucket.org/atlassian/atlaskit/commits/79956ea))
* bug fix; bump emoji to align the mediapicker transitive dependency ([1c0c37f](https://bitbucket.org/atlassian/atlaskit/commits/1c0c37f))



* feature; emoticons now auto-convert after an opening rounded bracket (issues closed: fs-1247) ([3d8e28c](https://bitbucket.org/atlassian/atlaskit/commits/3d8e28c))
* feature; emoji and mention typeaheads now trigger after a round bracket (issues closed: fs-1247) ([91496d0](https://bitbucket.org/atlassian/atlaskit/commits/91496d0))

* bug fix; fix broken storybooks for editor-core ([605689b](https://bitbucket.org/atlassian/atlaskit/commits/605689b))
* bug fix; typo: componentWillUmount -> componentWillUnmount ([dfe28fd](https://bitbucket.org/atlassian/atlaskit/commits/dfe28fd))

* bug fix; style fixes in panel floating toolbar. ([a85aaad](https://bitbucket.org/atlassian/atlaskit/commits/a85aaad))
* bug fix; fix styles of hyperlink and and language picker floating toolbars. ([0dd88f0](https://bitbucket.org/atlassian/atlaskit/commits/0dd88f0))
* bug fix; fix content jump in renderer (issues closed: ed-2298) ([c062a13](https://bitbucket.org/atlassian/atlaskit/commits/c062a13))

* bug fix; import media components from plugins ([6a06355](https://bitbucket.org/atlassian/atlaskit/commits/6a06355))
* bug fix; text without a prefixing www should be linkified. ([11fbfee](https://bitbucket.org/atlassian/atlaskit/commits/11fbfee))
* feature; bump media packages ([f7f6704](https://bitbucket.org/atlassian/atlaskit/commits/f7f6704))
* feature; bumped mediapicker to the latest in editor-core ([ef771f8](https://bitbucket.org/atlassian/atlaskit/commits/ef771f8))



* feature; added editor actions to the dropdown ([8d86399](https://bitbucket.org/atlassian/atlaskit/commits/8d86399))
* feature; added dot menu (issues closed: ed-2484) ([999e4f2](https://bitbucket.org/atlassian/atlaskit/commits/999e4f2))
* feature; added secondaryToolbarComponents to the Message Editor (issues closed: ed-2484) ([7930907](https://bitbucket.org/atlassian/atlaskit/commits/7930907))
* feature; latest task/decision support (issues closed: fs-1284) ([e7bb445](https://bitbucket.org/atlassian/atlaskit/commits/e7bb445))


* breaking; bumped media-core from v18 to v19 ([fcb8100](https://bitbucket.org/atlassian/atlaskit/commits/fcb8100))
* breaking; bump media packages ([fcb8100](https://bitbucket.org/atlassian/atlaskit/commits/fcb8100))


* feature; upgrade for latest task and decisions support. (issues closed: fs-1274) ([f12d384](https://bitbucket.org/atlassian/atlaskit/commits/f12d384))

* bug fix; fix ChromeExpanded height/maxHeight behaviour ([9aa5219](https://bitbucket.org/atlassian/atlaskit/commits/9aa5219))






* bug fix; render height style if props.height is set ([3d30885](https://bitbucket.org/atlassian/atlaskit/commits/3d30885))

* feature; add height prop to ChromeExpanded to have a fixed-height editor ([a5e0238](https://bitbucket.org/atlassian/atlaskit/commits/a5e0238))
* bug fix; analytics' events for media not being sent. (issues closed: ed-2422) ([dec1fb4](https://bitbucket.org/atlassian/atlaskit/commits/dec1fb4))


* feature; show recently viewed in the insert link dialog. ([e11e348](https://bitbucket.org/atlassian/atlaskit/commits/e11e348))


* bug fix; style fixes in panel toolbar. ([a51ffa6](https://bitbucket.org/atlassian/atlaskit/commits/a51ffa6))
* bug fix; fix cursor position when two code nodes separated by one non-code character ([7d165c3](https://bitbucket.org/atlassian/atlaskit/commits/7d165c3))

* bug fix; added more tests for inline code, updated hascode util ([2d2c2e7](https://bitbucket.org/atlassian/atlaskit/commits/2d2c2e7))
* feature; add EditorContext and WithEditorActions components (issues closed: ed-2443) ([b718487](https://bitbucket.org/atlassian/atlaskit/commits/b718487))
* bug fix; fixed cursor position inside code when code has only 1 character ([5f0a0d8](https://bitbucket.org/atlassian/atlaskit/commits/5f0a0d8))


* feature; upgrade editor to support latest task-decisions. (issues closed: fs-1263) ([6060103](https://bitbucket.org/atlassian/atlaskit/commits/6060103))

* bug fix; fix parsing of mentions in BB renderer. (issues closed: ed-2465) ([3fb5764](https://bitbucket.org/atlassian/atlaskit/commits/3fb5764))
* bug fix; fix ts/js build problem ([62855ff](https://bitbucket.org/atlassian/atlaskit/commits/62855ff))
* bug fix; fix stuck issue in chrome when jumping with opt key ([5ec6138](https://bitbucket.org/atlassian/atlaskit/commits/5ec6138))

* bug fix; refactored text-formatting commands ([5d51ccc](https://bitbucket.org/atlassian/atlaskit/commits/5d51ccc))
* bug fix; workaround for twitter/instagram link creation bug (issues closed: ed-2464) ([ad09f63](https://bitbucket.org/atlassian/atlaskit/commits/ad09f63))

* bug fix; fix creation of unwanted link cards when going in/out of edit link box (issues closed: ed-2404) ([eae0a3a](https://bitbucket.org/atlassian/atlaskit/commits/eae0a3a))
* bug fix; renderer portal is always positioned to the bottom right (issues closed: ed-2461) ([7afd755](https://bitbucket.org/atlassian/atlaskit/commits/7afd755))

* feature; adding help dialog to the editor. ([bf09d40](https://bitbucket.org/atlassian/atlaskit/commits/bf09d40))
* bug fix; fix storybooks build ([af0046b](https://bitbucket.org/atlassian/atlaskit/commits/af0046b))
* bug fix; cleanup ([eed92d6](https://bitbucket.org/atlassian/atlaskit/commits/eed92d6))
* bug fix; fix cursor wrapper problem in Firefox ([3198ff8](https://bitbucket.org/atlassian/atlaskit/commits/3198ff8))

* feature; adding more markdown auto-formatting rules for bold, italic, lists, horizontal rule ([76c1caa](https://bitbucket.org/atlassian/atlaskit/commits/76c1caa))



* feature; fix plaintext link detection, enable markdown and code detection on paste (issues closed: ed-2442) ([f6155e8](https://bitbucket.org/atlassian/atlaskit/commits/f6155e8))

* bug fix; Merged in fix/ED-2392-ignore-ts-files-package-json (pull request #3794) (issues closed: ed-2392) ([681d5fa](https://bitbucket.org/atlassian/atlaskit/commits/681d5fa))
* feature; add EditorActions object (issues closed: ed-2413) ([de98577](https://bitbucket.org/atlassian/atlaskit/commits/de98577))

* bug fix; cleanup ([d30ca4c](https://bitbucket.org/atlassian/atlaskit/commits/d30ca4c))





* bug fix; npmignore fails to work (issues closed: ed-2392) ([beb1872](https://bitbucket.org/atlassian/atlaskit/commits/beb1872))
* bug fix; removed unnecessary hack for text formatting ([760ef9e](https://bitbucket.org/atlassian/atlaskit/commits/760ef9e))

* feature; new prop for renderer: portal (HTMLElement). Use it for popups (issues closed: ed-1867) ([2d1bf87](https://bitbucket.org/atlassian/atlaskit/commits/2d1bf87))

* feature; allowed block left, right, center for single image. ([b6f10f0](https://bitbucket.org/atlassian/atlaskit/commits/b6f10f0))

* feature; allowed aligned right. ([dee2c5e](https://bitbucket.org/atlassian/atlaskit/commits/dee2c5e))
* bug fix; fixed bug that cannot copy paste media group. ([bd03f9d](https://bitbucket.org/atlassian/atlaskit/commits/bd03f9d))
* feature; clear left when image is align left. ([09481f6](https://bitbucket.org/atlassian/atlaskit/commits/09481f6))
* feature; adding placeholders for tasks/decisions ([4d4c5eb](https://bitbucket.org/atlassian/atlaskit/commits/4d4c5eb))
* feature; allowed single image displayed inline and aligned left ([6f1eec5](https://bitbucket.org/atlassian/atlaskit/commits/6f1eec5))
* bug fix; build Markdown to ProseMirror mapping based on Schema ([2d686af](https://bitbucket.org/atlassian/atlaskit/commits/2d686af))

* bug fix; fixed cursor position with inline code (issues closed: ed-2084) ([a495ae9](https://bitbucket.org/atlassian/atlaskit/commits/a495ae9))

* bug fix; use profilecard definitions (issues closed: ed-2266) ([bdf93dd](https://bitbucket.org/atlassian/atlaskit/commits/bdf93dd))

* bug fix; fix prop types ([406114a](https://bitbucket.org/atlassian/atlaskit/commits/406114a))
* feature; adding usupport to fetch initial state and toggle state ([416ce4e](https://bitbucket.org/atlassian/atlaskit/commits/416ce4e))
* feature; added single image node. ([a3b00c4](https://bitbucket.org/atlassian/atlaskit/commits/a3b00c4))

* feature; add loading state for link card (issues closed: ed-2383) ([a7ed3e0](https://bitbucket.org/atlassian/atlaskit/commits/a7ed3e0))

* bug fix; fix cursor position when deleting cols/rows (issues closed: ed-2406) ([30f98d7](https://bitbucket.org/atlassian/atlaskit/commits/30f98d7))
* bug fix; codeBlock content text chunks should not have a new line between them (issues closed: ed-2399) ([c1ccdac](https://bitbucket.org/atlassian/atlaskit/commits/c1ccdac))



* feature; move Markdown parser and serialiser into editor-core transformers (issues closed: ed-2402) ([8eba5d9](https://bitbucket.org/atlassian/atlaskit/commits/8eba5d9))


* bug fix; render profile cards in portal (issues closed: ed-2386) ([f7f6834](https://bitbucket.org/atlassian/atlaskit/commits/f7f6834))
* feature; added encoder/parser for tables in JIRA (issues closed: ed-2396) ([c2e3d1c](https://bitbucket.org/atlassian/atlaskit/commits/c2e3d1c))


* bug fix; fix linkify plain text links ([5a653cf](https://bitbucket.org/atlassian/atlaskit/commits/5a653cf))
* bug fix; udpated isIsolating util for tables ([e7d569c](https://bitbucket.org/atlassian/atlaskit/commits/e7d569c))
* bug fix; split backspace command into moveCursorBackward and emptyCells ([e93141e](https://bitbucket.org/atlassian/atlaskit/commits/e93141e))
* bug fix; fix backspace when cursor is after the table (issues closed: ed-2003) ([be160a0](https://bitbucket.org/atlassian/atlaskit/commits/be160a0))


* bug fix; use text rendering requirements for hipchat notifications (issues closed: ed-2392) ([abb5d28](https://bitbucket.org/atlassian/atlaskit/commits/abb5d28))
* bug fix; bumped the version of media-card ([4bbfac7](https://bitbucket.org/atlassian/atlaskit/commits/4bbfac7))

* bug fix; bump media-filmstrip in editor-core (issues closed: ed-2052) ([f33b88e](https://bitbucket.org/atlassian/atlaskit/commits/f33b88e))
* bug fix; media nodes parsing should not throw error when schema is media-less (issues closed: ed-2394) ([4a0dfe0](https://bitbucket.org/atlassian/atlaskit/commits/4a0dfe0))


* bug fix; export es5 renderer ([2db940d](https://bitbucket.org/atlassian/atlaskit/commits/2db940d))



* bug fix; autoformatting rules for inline styles should not work is first character is a blank ([81aa879](https://bitbucket.org/atlassian/atlaskit/commits/81aa879))

* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))
* feature; support document filtering. Include implementation for task decision content. (issues closed: fs-1223) ([8afca9c](https://bitbucket.org/atlassian/atlaskit/commits/8afca9c))
* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))
* bug fix; aligning keyboard shortcuts for blocktypes to gmail. ([403c1ca](https://bitbucket.org/atlassian/atlaskit/commits/403c1ca))


* bug fix; fix tslint ([04a6c4f](https://bitbucket.org/atlassian/atlaskit/commits/04a6c4f))

* feature; added analytics events for tables (issues closed: ed-1885) ([80dd2cb](https://bitbucket.org/atlassian/atlaskit/commits/80dd2cb))
* bug fix; fix broken storybook in AUI (issues closed: ed-2138) ([6ce1692](https://bitbucket.org/atlassian/atlaskit/commits/6ce1692))





* bug fix; keep focus in node views after transactions ([dd82b25](https://bitbucket.org/atlassian/atlaskit/commits/dd82b25))



* bug fix; allow empty fallback text in appCards in renderer (issues closed: ed-2364) ([f88292b](https://bitbucket.org/atlassian/atlaskit/commits/f88292b))


* bug fix; updated json schema with table nodes ([bf5b3ff](https://bitbucket.org/atlassian/atlaskit/commits/bf5b3ff))

* bug fix; fix message editor overflow issues with media film strip (issues closed: ed-2338) ([6cdbf74](https://bitbucket.org/atlassian/atlaskit/commits/6cdbf74))
* bug fix; removed modified inline code nodeSpec (issues closed: ed-2271) ([ee8b40c](https://bitbucket.org/atlassian/atlaskit/commits/ee8b40c))
* breaking; A lot of previously supported block nesting inside lists and blockquote will not work now. ([63ca14b](https://bitbucket.org/atlassian/atlaskit/commits/63ca14b))
* breaking; restricting block nesting for panel, blockquote and list. ([63ca14b](https://bitbucket.org/atlassian/atlaskit/commits/63ca14b))
* feature; attach secondary toolbar buttons to the bottom of the Message Editor (issues closed: ed-2357) ([f97db1c](https://bitbucket.org/atlassian/atlaskit/commits/f97db1c))
* bug fix; mediaGroup should only allow media as children (issues closed: ed-2343) ([d9a8d11](https://bitbucket.org/atlassian/atlaskit/commits/d9a8d11))

* feature; updated media-filmstrip for major bump ([0d36592](https://bitbucket.org/atlassian/atlaskit/commits/0d36592))

* bug fix; update encoder to add collection in generated HTML if available (issues closed: ed-2370) ([493b778](https://bitbucket.org/atlassian/atlaskit/commits/493b778))
* bug fix; added tab direction constants, added creating a new row on shift-tab ([3f09382](https://bitbucket.org/atlassian/atlaskit/commits/3f09382))

* bug fix; fix jira-encoder generating wrong HTML for uploaded non-image files (issues closed: ed-2263) ([d9b774e](https://bitbucket.org/atlassian/atlaskit/commits/d9b774e))

* feature; add markdown and plaintext code copy-paste (issues closed: ed-672, ed-2316, ed-2091) ([bdeb76c](https://bitbucket.org/atlassian/atlaskit/commits/bdeb76c))

* feature; adds support for tasks in renderer ([817c910](https://bitbucket.org/atlassian/atlaskit/commits/817c910))
* feature; allow creating tasks in the editor (issues closed: fs-1147) ([4122828](https://bitbucket.org/atlassian/atlaskit/commits/4122828))



* bug fix; fix remove media on upload failure (issues closed: ed-2192) ([d5da5a0](https://bitbucket.org/atlassian/atlaskit/commits/d5da5a0))
* bug fix; export renderer as es2015 package part ([1af0597](https://bitbucket.org/atlassian/atlaskit/commits/1af0597))
* feature; include localId on decisionList (issues closed: fs-1225) ([ff7ffbc](https://bitbucket.org/atlassian/atlaskit/commits/ff7ffbc))
* feature; add max content size plugin (issues closed: ed-2077) ([c917a11](https://bitbucket.org/atlassian/atlaskit/commits/c917a11))


* bug fix; upload progress and temporary thumbnail not showing (issues closed: ed-2283) ([5c1b9b6](https://bitbucket.org/atlassian/atlaskit/commits/5c1b9b6))

* feature; adding new auto-complete for code block triple backticks followed by space. ([1f51ad1](https://bitbucket.org/atlassian/atlaskit/commits/1f51ad1))


* bug fix; updated cursor posiiton and refactored commands ([4cde4b3](https://bitbucket.org/atlassian/atlaskit/commits/4cde4b3))

* bug fix; import media core from node_modules instead of direct path ([8c5e737](https://bitbucket.org/atlassian/atlaskit/commits/8c5e737))
* bug fix; media group with single item exception. ([78aa7d3](https://bitbucket.org/atlassian/atlaskit/commits/78aa7d3))

* bug fix; empty cells on Backspace when the whole row/col/table is selected ([c7fec5c](https://bitbucket.org/atlassian/atlaskit/commits/c7fec5c))
* bug fix; show floating toolbar when the whole row/col/table is selected (issues closed: ed-2342) ([f5830f2](https://bitbucket.org/atlassian/atlaskit/commits/f5830f2))
* bug fix; modifying URL doesn't change destination href (issues closed: ed-2150, ed-2321) ([add3b17](https://bitbucket.org/atlassian/atlaskit/commits/add3b17))
* bug fix; sizing of file cards in Editor nodeview. ([1c7f281](https://bitbucket.org/atlassian/atlaskit/commits/1c7f281))



* bug fix; renderer should not break UI when collection is an empty string (issues closed: ed-2344) ([445e261](https://bitbucket.org/atlassian/atlaskit/commits/445e261))
* feature; add occurrenceKey in media node (issues closed: ed-2064) ([7fe150a](https://bitbucket.org/atlassian/atlaskit/commits/7fe150a))
* bug fix; update the profilecard in the editor-core ([ddf9600](https://bitbucket.org/atlassian/atlaskit/commits/ddf9600))
* bug fix; disable advance menu for the first table release (issues closed: ed-2341) ([51447df](https://bitbucket.org/atlassian/atlaskit/commits/51447df))
* bug fix; renamed arrowup and arrowdown back to moveup and movedown. ([3c28847](https://bitbucket.org/atlassian/atlaskit/commits/3c28847))


* feature; move JIRA serializer/parser into editor-core, copy JIRA schema as well (issues closed: ed-2324) ([07f77f6](https://bitbucket.org/atlassian/atlaskit/commits/07f77f6))

* bug fix; appearance of media links in strip in the editor. (issues closed: ed-2295) ([3de66f4](https://bitbucket.org/atlassian/atlaskit/commits/3de66f4))
* bug fix; inserting links must create new media item via media API. (issues closed: ed-2295) ([a247785](https://bitbucket.org/atlassian/atlaskit/commits/a247785))



* bug fix; updated emoji dependency ([7adf4a7](https://bitbucket.org/atlassian/atlaskit/commits/7adf4a7))
* bug fix; emoji picker can no longer be opened when mention typeahead is open (issues closed: fs-1198, fs-1110) ([e513fd8](https://bitbucket.org/atlassian/atlaskit/commits/e513fd8))

* feature; rename editor appearances (issues closed: ed-2216) ([83cfbff](https://bitbucket.org/atlassian/atlaskit/commits/83cfbff))
* bug fix; Merged in fix/how-did-I-forget (pull request #3581) ([b0f19ee](https://bitbucket.org/atlassian/atlaskit/commits/b0f19ee))

* bug fix; util-data-test bump (issues closed: fs-1205) ([a534626](https://bitbucket.org/atlassian/atlaskit/commits/a534626))
* bug fix; update mention/emoji to minimum required versions to test/story data (issues closed: fs-1205) ([9ce169a](https://bitbucket.org/atlassian/atlaskit/commits/9ce169a))
* bug fix; upgrade to next available util-data-test (issues closed: fs-1205) ([8a8d2be](https://bitbucket.org/atlassian/atlaskit/commits/8a8d2be))
* bug fix; fix new stories use of util-data-test (issues closed: fs-1205) ([c501c01](https://bitbucket.org/atlassian/atlaskit/commits/c501c01))
* feature; upgrade mentions, get story/test data from component (issues closed: fs-1205) ([4a76f8d](https://bitbucket.org/atlassian/atlaskit/commits/4a76f8d))
* breaking; Requirements for an EmojiProvider has changed. This is a breaking change if implementing ([9ac9802](https://bitbucket.org/atlassian/atlaskit/commits/9ac9802))
* breaking; upgrade emoji component (issues closed: fs-1127) ([9ac9802](https://bitbucket.org/atlassian/atlaskit/commits/9ac9802))

* breaking; Keyboard shortcuts for heading and paragraoh blocks will not work. ([6817617](https://bitbucket.org/atlassian/atlaskit/commits/6817617))
* breaking; removing keyboard shortcuts for headings and normal test block. ([6817617](https://bitbucket.org/atlassian/atlaskit/commits/6817617))
* bug fix; removing softblur from the editor when toolbar dropdown menu are opened. ([8db8565](https://bitbucket.org/atlassian/atlaskit/commits/8db8565))

* bug fix; handle text nodes properly in Popup placement helpers (issues closed: ed-2242) ([72963ad](https://bitbucket.org/atlassian/atlaskit/commits/72963ad))


* bug fix; rendering of link cards, sizing of cards. ([fa4bbbf](https://bitbucket.org/atlassian/atlaskit/commits/fa4bbbf))

* bug fix; updated shift keymap related tests and make them passed. Skip horizontal tests. ([36f1993](https://bitbucket.org/atlassian/atlaskit/commits/36f1993))
* feature; change es2015 build so it transpiles everything except import/export statements (issues closed: ed-2272) ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))
* feature; enable tables in confluence-schema (issues closed: ed-2215) ([2b06b3b](https://bitbucket.org/atlassian/atlaskit/commits/2b06b3b))

* breaking; asciiEmojiPlugins now accepts providerFactory instead of emojiProvider ([3bf997a](https://bitbucket.org/atlassian/atlaskit/commits/3bf997a))
* breaking; convert asciiEmojiInputRules, codeBlock and hyperlink to new architecture (issues closed: ed-2075) ([3bf997a](https://bitbucket.org/atlassian/atlaskit/commits/3bf997a))


* feature; include decisionList and decisionItem into the hipchat schema (issues closed: fs-1196) ([331b620](https://bitbucket.org/atlassian/atlaskit/commits/331b620))

* feature; add analytics support to the new editor architecture (issues closed: ed-2078) ([5e8f6a8](https://bitbucket.org/atlassian/atlaskit/commits/5e8f6a8))

* bug fix; open link in a new window (issues closed: ed-2289) ([77609c4](https://bitbucket.org/atlassian/atlaskit/commits/77609c4))
* bug fix; Merged in fix/FS-1051-copying-renderer-mention (pull request #3532) (issues closed: fs-1051) ([352f8eb](https://bitbucket.org/atlassian/atlaskit/commits/352f8eb))
* bug fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

* bug fix; fixes a few bugs with decions and adds local id ([11bcdde](https://bitbucket.org/atlassian/atlaskit/commits/11bcdde))
* bug fix; upgrading prosemirror-keymaps dependency to fix issue with shortcuts with alt being br ([1bbe3fc](https://bitbucket.org/atlassian/atlaskit/commits/1bbe3fc))
* feature; adding insert block toolbar menu. ([0cc283b](https://bitbucket.org/atlassian/atlaskit/commits/0cc283b))



* feature; render DecisionItem and DecisionList in the "new" renderer (issues closed: fs-1140) ([899006b](https://bitbucket.org/atlassian/atlaskit/commits/899006b))
* bug fix; bump test-decision dep due to release (issues closed: fs-1140) ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))

* feature; use DecisionItem component for decision rendering (issues closed: fs-1140) ([fd4d9df](https://bitbucket.org/atlassian/atlaskit/commits/fd4d9df))


* bug fix; close profilecard popup on actions click ([0989b30](https://bitbucket.org/atlassian/atlaskit/commits/0989b30))
* feature; add profilecard integration for renderer (issues closed: ed-1867) ([9df55f5](https://bitbucket.org/atlassian/atlaskit/commits/9df55f5))




* bug fix; only allow creating decision list from a top-level paragraph ([330556d](https://bitbucket.org/atlassian/atlaskit/commits/330556d))


* bug fix; allow converting to decision list when there is a hard break in text node ([97cf2bd](https://bitbucket.org/atlassian/atlaskit/commits/97cf2bd))


* feature; decisions plugin ([dc6d230](https://bitbucket.org/atlassian/atlaskit/commits/dc6d230))
* feature; fS-1131 Add Decision list and decision node ([1ad88f6](https://bitbucket.org/atlassian/atlaskit/commits/1ad88f6))

* bug fix; handleMediaProvider raises exception when mediaProvider doesn't have a linkCreateCon (issues closed: ed-2241) ([cf2216f](https://bitbucket.org/atlassian/atlaskit/commits/cf2216f))
* bug fix; removed unused typescript. ([cb99770](https://bitbucket.org/atlassian/atlaskit/commits/cb99770))

* bug fix; moved setNodeSelection and setTextSelection from test-helper to src/utils ([1ec5dc6](https://bitbucket.org/atlassian/atlaskit/commits/1ec5dc6))

* bug fix; adding border top also to editor when max-height is reached. ([5bc1ab9](https://bitbucket.org/atlassian/atlaskit/commits/5bc1ab9))
* bug fix; fixed media keymap stub, because the method was renamed. ([1bd55be](https://bitbucket.org/atlassian/atlaskit/commits/1bd55be))


* bug fix; dismiss and cancel emoji typeahead when query is empty (issues closed: fs-1149) ([a103812](https://bitbucket.org/atlassian/atlaskit/commits/a103812))

* bug fix; render codeBlock if language is null (issues closed: ed-2240) ([bbbc3e9](https://bitbucket.org/atlassian/atlaskit/commits/bbbc3e9))
* bug fix; removed extra new line. ([86c48fc](https://bitbucket.org/atlassian/atlaskit/commits/86c48fc))

* bug fix; removed extra new lines. ([6dd0468](https://bitbucket.org/atlassian/atlaskit/commits/6dd0468))

* breaking; Update handleMediaNodeRemove to handleMediaNodeRemoval in media plugin ([5299085](https://bitbucket.org/atlassian/atlaskit/commits/5299085))
* breaking; give it better name ([5299085](https://bitbucket.org/atlassian/atlaskit/commits/5299085))
* feature; handle when media node is the first one in the group ([7b8deb1](https://bitbucket.org/atlassian/atlaskit/commits/7b8deb1))
* bug fix; show URL on link hover (issues closed: ed-2220) ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))



* bug fix; added codeblock styles back ([6837c22](https://bitbucket.org/atlassian/atlaskit/commits/6837c22))
* bug fix; disable code-mirror plugin (issues closed: ed-2238) ([815a482](https://bitbucket.org/atlassian/atlaskit/commits/815a482))

* bug fix; fixed strike mark for BB (issues closed: ed-2102) ([3ede6f4](https://bitbucket.org/atlassian/atlaskit/commits/3ede6f4))
* bug fix; move backspace test to the right place ([b61308b](https://bitbucket.org/atlassian/atlaskit/commits/b61308b))





* bug fix; analytics service not called while toggling list using keyboard. ([ddd227f](https://bitbucket.org/atlassian/atlaskit/commits/ddd227f))

* bug fix; test build to check if storybook build is fixed. ([abb7889](https://bitbucket.org/atlassian/atlaskit/commits/abb7889))
* bug fix; fix dropzone configuration in picker facade. (issues closed: ed-1832, ed-2181) ([898528c](https://bitbucket.org/atlassian/atlaskit/commits/898528c))
* breaking; replaced handleMediaNodeOutsideRemove in media plugin with cancelInFlightUpload ([1f6aeb1](https://bitbucket.org/atlassian/atlaskit/commits/1f6aeb1))
* breaking; replaced handleMediaNodeOutsideRemove in media plugin with cancelInFlightUpload ([1f6aeb1](https://bitbucket.org/atlassian/atlaskit/commits/1f6aeb1))

* breaking; moved renderer UI component export from /src/ui to /src/renderer ([50e11df](https://bitbucket.org/atlassian/atlaskit/commits/50e11df))
* breaking; moved renderer UI component export from /src/ui to /src/renderer ([50e11df](https://bitbucket.org/atlassian/atlaskit/commits/50e11df))




* bug fix; fixed bug that selected media node cannot type or enter ([ea5516c](https://bitbucket.org/atlassian/atlaskit/commits/ea5516c))

* bug fix; fix jumping of code block when editor has a scroll. ([eb4e4a4](https://bitbucket.org/atlassian/atlaskit/commits/eb4e4a4))

* feature; convert media plugin to support the new editor architecture (issues closed: ed-2074) ([a2da079](https://bitbucket.org/atlassian/atlaskit/commits/a2da079))
* bug fix; bump emoji to the latest version (issues closed: ed-2162) ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))
* feature; fS-1125 Code review remarks ([d2b4cc0](https://bitbucket.org/atlassian/atlaskit/commits/d2b4cc0))


* bug fix; fixing the issue of updating prose-mirror editor state from code-mirror node-view wh ([d0c0cef](https://bitbucket.org/atlassian/atlaskit/commits/d0c0cef))
* bug fix; fix Enter key behavior in code-block. ([f662ad0](https://bitbucket.org/atlassian/atlaskit/commits/f662ad0))




* bug fix; fix event handling for code-mirror code-blocks. ([d392bde](https://bitbucket.org/atlassian/atlaskit/commits/d392bde))




* feature; Adding code mirror node-view package ([14719a6](https://bitbucket.org/atlassian/atlaskit/commits/14719a6))


* bug fix; remove CSS hack for disabled ToolbarAdvancedTextFormatting UI element (issues closed: ed-1833) ([0a92ff0](https://bitbucket.org/atlassian/atlaskit/commits/0a92ff0))
* feature; export WithProviders from editor-core ([1fda740](https://bitbucket.org/atlassian/atlaskit/commits/1fda740))
* bug fix; fix for analytics event to ve invoked only if user action was successful. ([67eca8e](https://bitbucket.org/atlassian/atlaskit/commits/67eca8e))
* bug fix; improve block quote styling for editor (issues closed: ed-2205) ([afb02d0](https://bitbucket.org/atlassian/atlaskit/commits/afb02d0))
* bug fix; fix hyperlink handlePaste because it breaks table pasting (issues closed: ed-2197) ([7903c0e](https://bitbucket.org/atlassian/atlaskit/commits/7903c0e))
* feature; fS-1125 Resolve mentions query by using previous exact match ([28e2d4c](https://bitbucket.org/atlassian/atlaskit/commits/28e2d4c))


* bug fix; rename table nodes to camelCase (issues closed: ed-2107) ([194a773](https://bitbucket.org/atlassian/atlaskit/commits/194a773))



* feature; add saveOnEnter plugin for the new editor architecture (issues closed: ed-2076) ([cb97a0b](https://bitbucket.org/atlassian/atlaskit/commits/cb97a0b))


* breaking; It's a breaking change for editor-hipchat since it uses MentionPicker and EmojiTypeAhead directly ([24b3026](https://bitbucket.org/atlassian/atlaskit/commits/24b3026))
* breaking; use withProvider instead of subscriptions in plugin state (issues closed: ed-2037) ([24b3026](https://bitbucket.org/atlassian/atlaskit/commits/24b3026))
* feature; tabbing in the last cell creates a new row (issues closed: ed-1999) ([eef9878](https://bitbucket.org/atlassian/atlaskit/commits/eef9878))
* bug fix; cleanup ([ca3537c](https://bitbucket.org/atlassian/atlaskit/commits/ca3537c))

* feature; added advance menu for tables (issues closed: ed-1860) ([7256a52](https://bitbucket.org/atlassian/atlaskit/commits/7256a52))


* bug fix; link parsing logic should not parse link inside another link. ([314da7f](https://bitbucket.org/atlassian/atlaskit/commits/314da7f))
* feature; hit enter in the middle media node should split media group ([858ad32](https://bitbucket.org/atlassian/atlaskit/commits/858ad32))

* bug fix; fix unnecessary blinking of media cards in editor (issues closed: ed-1781) ([4271fdb](https://bitbucket.org/atlassian/atlaskit/commits/4271fdb))

* bug fix; removed redundant test ([d8fc745](https://bitbucket.org/atlassian/atlaskit/commits/d8fc745))

* bug fix; removed extra whitespace. ([5289a72](https://bitbucket.org/atlassian/atlaskit/commits/5289a72))


* feature; now auto-convert ascii emoji starting with a colon to the matching emoji when follo (issues closed: fs-1120) ([f1e5579](https://bitbucket.org/atlassian/atlaskit/commits/f1e5579))

* bug fix; use newest media components, fix renderer lazy-load media bugs (issues closed: ed-2171) ([e7d02cf](https://bitbucket.org/atlassian/atlaskit/commits/e7d02cf))

* bug fix; fix test (issues closed: ed-2170) ([d438aad](https://bitbucket.org/atlassian/atlaskit/commits/d438aad))
* bug fix; removed setState on scroll hack ([f1f43d8](https://bitbucket.org/atlassian/atlaskit/commits/f1f43d8))
* bug fix; add missing storybook data in new renderer and update marks/code to use AkCode (issues closed: ed-2170) ([84e0114](https://bitbucket.org/atlassian/atlaskit/commits/84e0114))


* bug fix; do not destroy passed providerFactory on Renderer unmount ([8ef3509](https://bitbucket.org/atlassian/atlaskit/commits/8ef3509))
* bug fix; Merged in fix/ED-1723-fix-panel-color-and-style (pull request #3309) (issues closed: ed-1723) ([a35b6c9](https://bitbucket.org/atlassian/atlaskit/commits/a35b6c9))
* bug fix; removed unused import. ([4eadc1b](https://bitbucket.org/atlassian/atlaskit/commits/4eadc1b))
* bug fix; fix the issue where Paragraph sometimes doen't comes with a content attribute (issues closed: ed-2161) ([c58f300](https://bitbucket.org/atlassian/atlaskit/commits/c58f300))
* bug fix; make sure insert links handled empty href. ([9ee7106](https://bitbucket.org/atlassian/atlaskit/commits/9ee7106))
* bug fix; make ascii-to-emoji auto-conversion great again when preceded by a hard break (issues closed: fs-1113) ([88ad29b](https://bitbucket.org/atlassian/atlaskit/commits/88ad29b))
* bug fix; include updated full.json ([630d54e](https://bitbucket.org/atlassian/atlaskit/commits/630d54e))
* bug fix; fix splitListItem (issues closed: ed-2106) ([cbf2388](https://bitbucket.org/atlassian/atlaskit/commits/cbf2388))
* bug fix; json schema's patterns for application card urls. (issues closed: ed-2163) ([f57ad01](https://bitbucket.org/atlassian/atlaskit/commits/f57ad01))

* bug fix; fix toolbar position 1px gap due to border-bottom of the Editor (issues closed: ed-2148) ([1a33dc0](https://bitbucket.org/atlassian/atlaskit/commits/1a33dc0))

* bug fix; removed unused import. ([3292bc3](https://bitbucket.org/atlassian/atlaskit/commits/3292bc3))

* feature; handle selection only if has a media node before current media node. ([c0fb6ed](https://bitbucket.org/atlassian/atlaskit/commits/c0fb6ed))


* bug fix; move tablefloating toolbar with scroll ([6078aac](https://bitbucket.org/atlassian/atlaskit/commits/6078aac))
* bug fix; fix "src_1.mediaPluginFactory is not a function" (issues closed: ed-2138) ([27a8a25](https://bitbucket.org/atlassian/atlaskit/commits/27a8a25))
* feature; merged master ([77ec826](https://bitbucket.org/atlassian/atlaskit/commits/77ec826))

* bug fix; edit blockquote styling (issues closed: ed-2086) ([7e9baca](https://bitbucket.org/atlassian/atlaskit/commits/7e9baca))





* feature; updated json-schema to reflect the latest changes ([2e47036](https://bitbucket.org/atlassian/atlaskit/commits/2e47036))
* bug fix; allow relative urls in isSafeUrl validator (issues closed: ed-2099) ([f47d228](https://bitbucket.org/atlassian/atlaskit/commits/f47d228))
* feature; set selection to previous media node after deleting media. ([a811a48](https://bitbucket.org/atlassian/atlaskit/commits/a811a48))
* feature; adding parsing of pasted content slices to generate link marks. ([8c24435](https://bitbucket.org/atlassian/atlaskit/commits/8c24435))
* bug fix; fix cols/rows insertion in table plugin (issues closed: ed-2147) ([fe25257](https://bitbucket.org/atlassian/atlaskit/commits/fe25257))
* bug fix; fix tables plugin tests (issues closed: ed-2106) ([a0f01be](https://bitbucket.org/atlassian/atlaskit/commits/a0f01be))
* bug fix; fixed tables isRowSelection and isColSelection naming ([c31012d](https://bitbucket.org/atlassian/atlaskit/commits/c31012d))
* feature; bump prosemirror to 0.22.0, tables to 0.1.0" ([4551ab9](https://bitbucket.org/atlassian/atlaskit/commits/4551ab9))
* bug fix; fix a typo in ApplicationCard test (issues closed: ed-2039) ([4216d91](https://bitbucket.org/atlassian/atlaskit/commits/4216d91))

* feature; added hover selection decoration (issues closed: ed-2002) ([79a3fd1](https://bitbucket.org/atlassian/atlaskit/commits/79a3fd1))
* bug fix; renderer exported MarkdownSerializer conflicts with PM's MarkdownSerializer (issues closed: ed-2135) ([99c7684](https://bitbucket.org/atlassian/atlaskit/commits/99c7684))
* bug fix; renderer MarkdownSerializer always returns undefined (issues closed: ed-2140) ([3d4ed46](https://bitbucket.org/atlassian/atlaskit/commits/3d4ed46))

* bug fix; destroy editorView and plugin state after each test. ([47b0476](https://bitbucket.org/atlassian/atlaskit/commits/47b0476))
* bug fix; mentioni typeahead now shows up after a hardBreak node (issues closed: fs-1113) ([464abdb](https://bitbucket.org/atlassian/atlaskit/commits/464abdb))
* bug fix; emoji typeahead now shows up after a hardBreak node (issues closed: fs-1113) ([cae95b9](https://bitbucket.org/atlassian/atlaskit/commits/cae95b9))
* feature; updated rows/cols selection on mouse over ([e9c2ade](https://bitbucket.org/atlassian/atlaskit/commits/e9c2ade))

* feature; add json-schema generator (issues closed: ed-2023) ([97a9603](https://bitbucket.org/atlassian/atlaskit/commits/97a9603))
* bug fix; use same API for MarkdownSerializer as other serializers do ([fc4e380](https://bitbucket.org/atlassian/atlaskit/commits/fc4e380))
* bug fix; use Array.some to make the code more readable (issues closed: ed-2039) ([c3822ea](https://bitbucket.org/atlassian/atlaskit/commits/c3822ea))
* feature; added rows/cols selection on floating controls mouse over ([b55f55c](https://bitbucket.org/atlassian/atlaskit/commits/b55f55c))
* bug fix; adding div around editor content to add max-height. ([a142ed5](https://bitbucket.org/atlassian/atlaskit/commits/a142ed5))
* bug fix; fixed types in all pluginState tests. ([2e8d75f](https://bitbucket.org/atlassian/atlaskit/commits/2e8d75f))

* feature; redesigned insert buttons ([5801507](https://bitbucket.org/atlassian/atlaskit/commits/5801507))
* feature; redesign of insert row/col buttons ([d02cf77](https://bitbucket.org/atlassian/atlaskit/commits/d02cf77))
* bug fix; removed unused import. ([a3e320b](https://bitbucket.org/atlassian/atlaskit/commits/a3e320b))

* bug fix; make sure no link detection on undo. ([f9dda85](https://bitbucket.org/atlassian/atlaskit/commits/f9dda85))
* bug fix; should validate applicationCard according to the spec (issues closed: ed-2039) ([5364a95](https://bitbucket.org/atlassian/atlaskit/commits/5364a95))

* feature; updated emoji to include tooltip in editor (issues closed: fs-1053) ([c7f323c](https://bitbucket.org/atlassian/atlaskit/commits/c7f323c))

* bug fix; should not re-import editor-core package (issues closed: ed-2109) ([1471d3b](https://bitbucket.org/atlassian/atlaskit/commits/1471d3b))
* bug fix; make sure can insert links when replace step fragment larger than existing fragment. ([caf03ea](https://bitbucket.org/atlassian/atlaskit/commits/caf03ea))


* bug fix; resolved conflicts with master ([2071c75](https://bitbucket.org/atlassian/atlaskit/commits/2071c75))


* feature; rendered link card. ([663b647](https://bitbucket.org/atlassian/atlaskit/commits/663b647))

* feature; insert link card to the correct position. ([87c45ce](https://bitbucket.org/atlassian/atlaskit/commits/87c45ce))


* feature; fS-1090 fix tslint ([dd2a2f6](https://bitbucket.org/atlassian/atlaskit/commits/dd2a2f6))
* bug fix; making maxHeight an optional property and removing it from storybook. ([3a67577](https://bitbucket.org/atlassian/atlaskit/commits/3a67577))
* feature; fS-1090 Bump version of mention and test data ([b4730b3](https://bitbucket.org/atlassian/atlaskit/commits/b4730b3))
* bug fix; fix label on block-type dropdown ([b837db6](https://bitbucket.org/atlassian/atlaskit/commits/b837db6))
* bug fix; minor fixes to address PR feedback ([67864bb](https://bitbucket.org/atlassian/atlaskit/commits/67864bb))
* feature; moving inline-code button to toolbar (issues closed: ed-2026) ([116880f](https://bitbucket.org/atlassian/atlaskit/commits/116880f))
* bug fix; addes in ApplicationCard support for renderer in editor-core (issues closed: ed-2039) ([af55b2c](https://bitbucket.org/atlassian/atlaskit/commits/af55b2c))



* bug fix; fix prosemirror nodes assertion helper ([995dcaf](https://bitbucket.org/atlassian/atlaskit/commits/995dcaf))

* bug fix; add codeBlock support to new renderer (issues closed: ed-2058) ([2763767](https://bitbucket.org/atlassian/atlaskit/commits/2763767))
* feature; add interfaces for json-schema generation (issues closed: ed-2023) ([46d0ec9](https://bitbucket.org/atlassian/atlaskit/commits/46d0ec9))

* feature; add option to set max height of the editor ([e7a96ef](https://bitbucket.org/atlassian/atlaskit/commits/e7a96ef))


* bug fix; fS-1090 Make sure we're exiting the mention context after inserting ([5efd91c](https://bitbucket.org/atlassian/atlaskit/commits/5efd91c))
* bug fix; copy hipchat schema into the editor-core ([7b47bdf](https://bitbucket.org/atlassian/atlaskit/commits/7b47bdf))
* feature; fS-1090 Dynamically resolve mentions when typing fast ([8bcb355](https://bitbucket.org/atlassian/atlaskit/commits/8bcb355))
* bug fix; mediaComponent shall use StateManager from Plugin State when in Editor. (issues closed: ed-2047) ([61df737](https://bitbucket.org/atlassian/atlaskit/commits/61df737))
* bug fix; "status-update" picker events were downgrading media status back to "uploading" (issues closed: ed-2062) ([d22a330](https://bitbucket.org/atlassian/atlaskit/commits/d22a330))



* bug fix; fix blur/focus logic for color toolbar (issues closed: ed-2082) ([58d7358](https://bitbucket.org/atlassian/atlaskit/commits/58d7358))
* breaking;  ([6de21d8](https://bitbucket.org/atlassian/atlaskit/commits/6de21d8))
* breaking; refactored detectLinkRanges to return position with list of urls. ([6de21d8](https://bitbucket.org/atlassian/atlaskit/commits/6de21d8))
* bug fix; fixed the comment typo ([caa6fa9](https://bitbucket.org/atlassian/atlaskit/commits/caa6fa9))

* bug fix; fixed escaping from the table with ArrowUp/ArrowDown ([084f6b9](https://bitbucket.org/atlassian/atlaskit/commits/084f6b9))
* bug fix; updated table keymaps ([795d8bb](https://bitbucket.org/atlassian/atlaskit/commits/795d8bb))
* feature; added function in media plugin to detect whether the transaction has new links. ([fff1175](https://bitbucket.org/atlassian/atlaskit/commits/fff1175))
* bug fix; removing code block or panel should not remove enclosing block. ([9c7586e](https://bitbucket.org/atlassian/atlaskit/commits/9c7586e))
* bug fix; added typescript types in table plugin and react components ([cd43807](https://bitbucket.org/atlassian/atlaskit/commits/cd43807))
* bug fix; change API for React UI Renderer component ([079e84f](https://bitbucket.org/atlassian/atlaskit/commits/079e84f))
* bug fix; handle unknown nodes in renderer (issues closed: ed-1751) ([2956d5c](https://bitbucket.org/atlassian/atlaskit/commits/2956d5c))

* bug fix; prevent javascript links for link mark (issues closed: ed-1971) ([20f2d7f](https://bitbucket.org/atlassian/atlaskit/commits/20f2d7f))

* bug fix; use expect instead of expect not to if we knows what to expect. ([fa1ca0c](https://bitbucket.org/atlassian/atlaskit/commits/fa1ca0c))
* bug fix; Merged in fix/ED-1677-markdown-serializer-parser-to-editor-core (pull request #3233) (issues closed: ed-1677) ([a623998](https://bitbucket.org/atlassian/atlaskit/commits/a623998))
* bug fix; fixed media plugin test failure after merge master. ([0110cdf](https://bitbucket.org/atlassian/atlaskit/commits/0110cdf))

* bug fix; Merged in fix/ED-2031-update-uri-scheme-whitelist (pull request #3234) (issues closed: ed-2031) ([4c73b6f](https://bitbucket.org/atlassian/atlaskit/commits/4c73b6f))






* bug fix; clicking trash icon on floating toolbars of panel or code-blocks should delete the b ([b1a7720](https://bitbucket.org/atlassian/atlaskit/commits/b1a7720))



* bug fix; fix path in test helpers ([dcc0ffb](https://bitbucket.org/atlassian/atlaskit/commits/dcc0ffb))
* bug fix; default value of language picker should  not be language but placeholder. ([098b298](https://bitbucket.org/atlassian/atlaskit/commits/098b298))
* bug fix; fix required types on applicationCard type. ([c13f04c](https://bitbucket.org/atlassian/atlaskit/commits/c13f04c))



* feature; add applicationCard node. (issues closed: ed-1707) ([8dd08a1](https://bitbucket.org/atlassian/atlaskit/commits/8dd08a1))

* bug fix; fixed tslint, cursor position when deleting rows ([e6e2792](https://bitbucket.org/atlassian/atlaskit/commits/e6e2792))

* bug fix; merged master ([8338b07](https://bitbucket.org/atlassian/atlaskit/commits/8338b07))
* bug fix; fixed position inside table when adding new rows ([52ed7db](https://bitbucket.org/atlassian/atlaskit/commits/52ed7db))


* bug fix; changed button ref handler to prevent local test failures ([3dbe3f1](https://bitbucket.org/atlassian/atlaskit/commits/3dbe3f1))
* bug fix; updated test-helpers for table ([f13d324](https://bitbucket.org/atlassian/atlaskit/commits/f13d324))

* feature; added prosemirror-tables package, table nodes to schema and table plugin ([74ee019](https://bitbucket.org/atlassian/atlaskit/commits/74ee019))
* bug fix; added accessLevel to mention node in renderer of editor-core ([50be806](https://bitbucket.org/atlassian/atlaskit/commits/50be806))


* bug fix; tables cleanup ([c51c60d](https://bitbucket.org/atlassian/atlaskit/commits/c51c60d))
* bug fix; remove table-prototype package ([15ea532](https://bitbucket.org/atlassian/atlaskit/commits/15ea532))
* bug fix; fixed typescript error. ([1072668](https://bitbucket.org/atlassian/atlaskit/commits/1072668))
* bug fix; fixed floating toolbar position when table has offset ([d48fea5](https://bitbucket.org/atlassian/atlaskit/commits/d48fea5))

* breaking;  ([a6a5152](https://bitbucket.org/atlassian/atlaskit/commits/a6a5152))
* breaking; removed handleNewMediaPicked and expose insertFile as media plugin API ([a6a5152](https://bitbucket.org/atlassian/atlaskit/commits/a6a5152))

* feature; apply the same operation to insertLink. ([538ffac](https://bitbucket.org/atlassian/atlaskit/commits/538ffac))
* feature; set selection to the next paragraph after inserting media ([ebdf46c](https://bitbucket.org/atlassian/atlaskit/commits/ebdf46c))
* bug fix; fixed floating toolbar position ([f433ad7](https://bitbucket.org/atlassian/atlaskit/commits/f433ad7))
* bug fix; fix order of colours in colour picker (issues closed: ed-2029) ([5572a97](https://bitbucket.org/atlassian/atlaskit/commits/5572a97))
* bug fix; make sure inserting media is working with node selected. ([4f7abec](https://bitbucket.org/atlassian/atlaskit/commits/4f7abec))

* bug fix; list autoformatting should not work inside code block. ([32685e7](https://bitbucket.org/atlassian/atlaskit/commits/32685e7))
* feature; dummy commit to mark release of editor-core. ([7276311](https://bitbucket.org/atlassian/atlaskit/commits/7276311))

* bug fix; refactor and fixed bug that didn't delete selected text when there is existing media ([94eb3a5](https://bitbucket.org/atlassian/atlaskit/commits/94eb3a5))
* bug fix; uncaught rejected provider promises, ui not updating. (issues closed: ed-1886) ([237cd54](https://bitbucket.org/atlassian/atlaskit/commits/237cd54))



* bug fix; addes in support for Heading in new renderer (issues closed: ed-1743) ([0a48838](https://bitbucket.org/atlassian/atlaskit/commits/0a48838))
* bug fix; fixed cursor position when inserting/deleting cells ([5c5134e](https://bitbucket.org/atlassian/atlaskit/commits/5c5134e))

* bug fix; fix popup alignment ([f1087b5](https://bitbucket.org/atlassian/atlaskit/commits/f1087b5))
* feature; add JSONSerializer (issues closed: ed-2019) ([0546b04](https://bitbucket.org/atlassian/atlaskit/commits/0546b04))

* bug fix; fS-1073 Trigger empty search when setting mentions provider to improve responsivenes ([3218cb8](https://bitbucket.org/atlassian/atlaskit/commits/3218cb8))
* feature; make sure insert media works with text selected. ([377d655](https://bitbucket.org/atlassian/atlaskit/commits/377d655))
* feature; added removing of selected cells ([b6c47f5](https://bitbucket.org/atlassian/atlaskit/commits/b6c47f5))
* feature; prepend to existing media group if detecting previous adjacent node is media group ([d72636a](https://bitbucket.org/atlassian/atlaskit/commits/d72636a))
* bug fix; fS-1073 Bump mention version ([668eff6](https://bitbucket.org/atlassian/atlaskit/commits/668eff6))
* bug fix; insert default content type after media instead of hard coded to p. ([da356ab](https://bitbucket.org/atlassian/atlaskit/commits/da356ab))
* bug fix; fixed tslint error, tableCellStartPos ([824a135](https://bitbucket.org/atlassian/atlaskit/commits/824a135))
* bug fix; fix tslint error ([9f53fe7](https://bitbucket.org/atlassian/atlaskit/commits/9f53fe7))
* feature; create a new p when insert media on a non empty content block. ([5d9ec4b](https://bitbucket.org/atlassian/atlaskit/commits/5d9ec4b))
* feature; added alignX and alignY extra params to popup ([92d716d](https://bitbucket.org/atlassian/atlaskit/commits/92d716d))


* bug fix; fixed tests that does not set the right selction. ([7a644a6](https://bitbucket.org/atlassian/atlaskit/commits/7a644a6))
* bug fix; support Emoji nodes in react renderer (issues closed: ed-1741) ([ac83cfa](https://bitbucket.org/atlassian/atlaskit/commits/ac83cfa))
* feature; added floating toolbar, changed popper to popup ([eef3307](https://bitbucket.org/atlassian/atlaskit/commits/eef3307))


* bug fix; do not import whole @atlaskit/icon – missed import ([b3854f5](https://bitbucket.org/atlassian/atlaskit/commits/b3854f5))
* bug fix; fix media copy optional attrs during insert ([e08a07e](https://bitbucket.org/atlassian/atlaskit/commits/e08a07e))

* bug fix; do not import whole @atlaskit/icon ([27a1633](https://bitbucket.org/atlassian/atlaskit/commits/27a1633))
* bug fix; merged master ([d1db563](https://bitbucket.org/atlassian/atlaskit/commits/d1db563))

* bug fix; it inserts a new p no matter it's an empty p or not. ([265f573](https://bitbucket.org/atlassian/atlaskit/commits/265f573))
* feature; create a new paragraph below when inserting a media node at the end of the doc. ([1be170e](https://bitbucket.org/atlassian/atlaskit/commits/1be170e))

* feature; dissallow nested tables ([e761dea](https://bitbucket.org/atlassian/atlaskit/commits/e761dea))


* feature; bumped mentions to latest version ([fed0d26](https://bitbucket.org/atlassian/atlaskit/commits/fed0d26))
* feature; added focus logic back ([415d516](https://bitbucket.org/atlassian/atlaskit/commits/415d516))
* bug fix; add defaultSchema, use it in src/ui/Renderer ([24ac8eb](https://bitbucket.org/atlassian/atlaskit/commits/24ac8eb))
* bug fix; pass providers and eventhandlers into React serializer (issues closed: ed-1738, ed-1740) ([7ab3e44](https://bitbucket.org/atlassian/atlaskit/commits/7ab3e44))
* feature; added ToolbarEmojiPicker button (issues closed: fs-976) ([67498c6](https://bitbucket.org/atlassian/atlaskit/commits/67498c6))

* feature; exit inline code with arrowRight ([9fb3e74](https://bitbucket.org/atlassian/atlaskit/commits/9fb3e74))
* feature; integrated accessLevel data from mentions with NodeSpec (issues closed: fs-1025) ([305f94c](https://bitbucket.org/atlassian/atlaskit/commits/305f94c))
* breaking; Introduced new private attrs in media node, see ED-1964 ([6b8ee3b](https://bitbucket.org/atlassian/atlaskit/commits/6b8ee3b))
* breaking; update media node to reflect the new architecture (issues closed: ed-1931) ([6b8ee3b](https://bitbucket.org/atlassian/atlaskit/commits/6b8ee3b))

* feature; added insertion of cols and rows ([4d4ae8a](https://bitbucket.org/atlassian/atlaskit/commits/4d4ae8a))
* feature; added corner insert buttons ([1dda2c8](https://bitbucket.org/atlassian/atlaskit/commits/1dda2c8))
* feature; added insert buttons for cols and rows ([92d6275](https://bitbucket.org/atlassian/atlaskit/commits/92d6275))

* bug fix; cleanup ([6e7da47](https://bitbucket.org/atlassian/atlaskit/commits/6e7da47))
* feature; added visual trigger for tables ([6302237](https://bitbucket.org/atlassian/atlaskit/commits/6302237))


* feature; improved selection detection ([8d3a8a0](https://bitbucket.org/atlassian/atlaskit/commits/8d3a8a0))
* bug fix; destroy providerFactory internals when components get unmounted ([726a55e](https://bitbucket.org/atlassian/atlaskit/commits/726a55e))

* bug fix; extract bundled TypeScript definitions for orderedmap, use @types/orderedmap ([6759110](https://bitbucket.org/atlassian/atlaskit/commits/6759110))



* bug fix; do not serialize media nodes in text serializer (issues closed: ed-1745) ([4b69821](https://bitbucket.org/atlassian/atlaskit/commits/4b69821))





* feature; add Confluence and Bitbucket schemas to editor-core. ([5cd2b16](https://bitbucket.org/atlassian/atlaskit/commits/5cd2b16))
* breaking; Might introduce some regressions, releasing new major version as a precaution ([0e738d9](https://bitbucket.org/atlassian/atlaskit/commits/0e738d9))
* breaking; new popups and dropdowns for editor-core (issues closed: ed-1468 ed-1440) ([0e738d9](https://bitbucket.org/atlassian/atlaskit/commits/0e738d9))


* feature; add ascii emoji input rule to automatically match and convert ascii representations (issues closed: fs-916) ([b404019](https://bitbucket.org/atlassian/atlaskit/commits/b404019))
* feature; keep the leading colon in the query being passed to the typeahead (issues closed: fs-916) ([362d541](https://bitbucket.org/atlassian/atlaskit/commits/362d541))
* bug fix; don't trigger emoji typeahead when colon is preceded by a non-word non-whitespace ch ([f301589](https://bitbucket.org/atlassian/atlaskit/commits/f301589))

* bug fix; resolved conflicts with master ([53e9745](https://bitbucket.org/atlassian/atlaskit/commits/53e9745))
* feature; cleaned up table plugin and ui component a bit ([62af12b](https://bitbucket.org/atlassian/atlaskit/commits/62af12b))

* bug fix; fixed row/cols selection and focus bugs ([606694a](https://bitbucket.org/atlassian/atlaskit/commits/606694a))
* bug fix; simplier text serializer (issues closed: ed-1745) ([18f0c79](https://bitbucket.org/atlassian/atlaskit/commits/18f0c79))
* bug fix; blur collapsed input before setting focus to expanded editor ([b1e3273](https://bitbucket.org/atlassian/atlaskit/commits/b1e3273))


* bug fix; add AbstractMentionResource export to editor-core (issues closed: fs-1029) ([308ad31](https://bitbucket.org/atlassian/atlaskit/commits/308ad31))
* bug fix; commenting out ToolbarEmojiPicker related files ([174c676](https://bitbucket.org/atlassian/atlaskit/commits/174c676))
* bug fix; fix table typescript error ([5eb7a64](https://bitbucket.org/atlassian/atlaskit/commits/5eb7a64))

* bug fix; fix test failure due to group declaration marks (issues closed: ed-1922) ([1f1438f](https://bitbucket.org/atlassian/atlaskit/commits/1f1438f))
* bug fix; include mark group declarations to avoid false-position errors. ([c5c6ea5](https://bitbucket.org/atlassian/atlaskit/commits/c5c6ea5))
* bug fix; fix typo on mention import (issues closed: fs-1029) ([1d44c5c](https://bitbucket.org/atlassian/atlaskit/commits/1d44c5c))
* feature; consistent version of mentions between renderer and editor-core (issues closed: fs-1029) ([4924655](https://bitbucket.org/atlassian/atlaskit/commits/4924655))
* feature; upgrade emoji to support custom uploads. (issues closed: fs-1029) ([3b28226](https://bitbucket.org/atlassian/atlaskit/commits/3b28226))
* bug fix; fixed background overlapping border of table cell in Firefox ([c03902c](https://bitbucket.org/atlassian/atlaskit/commits/c03902c))
* feature; added active state to toolbar buttons ([f456d5b](https://bitbucket.org/atlassian/atlaskit/commits/f456d5b))
* feature; added TableToolbar ([1d016ea](https://bitbucket.org/atlassian/atlaskit/commits/1d016ea))

* bug fix; use mark groups to create some indirection for exclusions. ([b976d58](https://bitbucket.org/atlassian/atlaskit/commits/b976d58))
* bug fix; simplify function declaration because "contextual typing" ([17f5476](https://bitbucket.org/atlassian/atlaskit/commits/17f5476))

* feature; Add Confluence-specific editor nodes to editor-core. ([b1d7185](https://bitbucket.org/atlassian/atlaskit/commits/b1d7185))

* bug fix; remove context in editor core storybook ([79facc0](https://bitbucket.org/atlassian/atlaskit/commits/79facc0))
* feature; added table nodeView and tracking of focus state change ([e29715e](https://bitbucket.org/atlassian/atlaskit/commits/e29715e))
* breaking;  ([da582cd](https://bitbucket.org/atlassian/atlaskit/commits/da582cd))
* breaking; removed context setting in editor ([da582cd](https://bitbucket.org/atlassian/atlaskit/commits/da582cd))



* bug fix; brackets should be a valid character for links. ([0d8b437](https://bitbucket.org/atlassian/atlaskit/commits/0d8b437))

* bug fix; replace non empty selection with ":" and emojiQuery mark (issues closed: fs-1032) ([db48be0](https://bitbucket.org/atlassian/atlaskit/commits/db48be0))
* bug fix; replace non empty selection with '@' and mentionQuery mark (issues closed: fs-1032) ([4b06d91](https://bitbucket.org/atlassian/atlaskit/commits/4b06d91))
* feature; moved to prosemirror-tables dependency (issues closed: ed-1903) ([94fc851](https://bitbucket.org/atlassian/atlaskit/commits/94fc851))



* feature; export renderer stuff ([99e3f9e](https://bitbucket.org/atlassian/atlaskit/commits/99e3f9e))
* feature; add more nodes and tests (issues closed: ed-1745) ([475a3f4](https://bitbucket.org/atlassian/atlaskit/commits/475a3f4))


* feature; add basic text serializer code (issues closed: ed-1745) ([5ef88c7](https://bitbucket.org/atlassian/atlaskit/commits/5ef88c7))


* bug fix; importing tables from dist instead of using source files ([e4da0e7](https://bitbucket.org/atlassian/atlaskit/commits/e4da0e7))
* bug fix; fix display text cache for link (issues closed: ed-1785) ([284f7d8](https://bitbucket.org/atlassian/atlaskit/commits/284f7d8))
* feature; added table plugin and schema (issues closed: ed-1848, ed-1849) ([01e016a](https://bitbucket.org/atlassian/atlaskit/commits/01e016a))
* bug fix; increase specificity of input class produced by styled-component (issues closed: ed-1839) ([021b7f7](https://bitbucket.org/atlassian/atlaskit/commits/021b7f7))


* bug fix; re-use existing mediapickers instead of destroying/creating a new one for every room (issues closed: ed-1821) ([a881d7d](https://bitbucket.org/atlassian/atlaskit/commits/a881d7d))
* feature; added prosemirror-tables and typescript definitions ([6aafb7b](https://bitbucket.org/atlassian/atlaskit/commits/6aafb7b))



* breaking; The openLeft and openRight properties of Slice objects have been renamed to openStart and openEnd ([787e9bf](https://bitbucket.org/atlassian/atlaskit/commits/787e9bf))
* breaking; upgrade PM to 0.21 ([787e9bf](https://bitbucket.org/atlassian/atlaskit/commits/787e9bf))
* feature; incorporate text-color spec changes (issues closed: ed-1836) ([8eb647f](https://bitbucket.org/atlassian/atlaskit/commits/8eb647f))
* breaking; use latest mentions and emoji components without polyfills: update editors-* docs with information about it ([5d5a1e4](https://bitbucket.org/atlassian/atlaskit/commits/5d5a1e4))
* breaking; use latest mentions and emoji components ([5d5a1e4](https://bitbucket.org/atlassian/atlaskit/commits/5d5a1e4))



* bug fix; ensure mention button is enabled after auto-formatted code mark (issues closed: fs-1024) ([55ae762](https://bitbucket.org/atlassian/atlaskit/commits/55ae762))

* bug fix; ensure mention button is disabled in unsupported nodes (issues closed: fs-986) ([d46b6ef](https://bitbucket.org/atlassian/atlaskit/commits/d46b6ef))


* bug fix; focus editorView when media nodes are added to the document (issues closed: ed-1750) ([36c3e27](https://bitbucket.org/atlassian/atlaskit/commits/36c3e27))

* bug fix; do not create a new paragraph when arrowUp/Down inside non-nested paragraph ([fcb405f](https://bitbucket.org/atlassian/atlaskit/commits/fcb405f))

* bug fix; fixed typescript ([2b1264e](https://bitbucket.org/atlassian/atlaskit/commits/2b1264e))
* bug fix; fixed bug that converting to hyperlink remove other marks. ([1407ac9](https://bitbucket.org/atlassian/atlaskit/commits/1407ac9))

* feature; export colorPalette from editor-core ([b01db7c](https://bitbucket.org/atlassian/atlaskit/commits/b01db7c))


* feature; error-reporting passed as a property (issues closed: ed-1694) ([3bd3827](https://bitbucket.org/atlassian/atlaskit/commits/3bd3827))
* bug fix; fixed typescript. ([4215a2b](https://bitbucket.org/atlassian/atlaskit/commits/4215a2b))
* bug fix; fixed analytics tracking on hyperlink enter autoformatting ([3d6047f](https://bitbucket.org/atlassian/atlaskit/commits/3d6047f))
* bug fix; fixed bug that hyperlink will be converted even has a hard break between them. ([fc648dd](https://bitbucket.org/atlassian/atlaskit/commits/fc648dd))

* feature; make sure link doesnot get override when hit shift+enter or enter. ([9015fad](https://bitbucket.org/atlassian/atlaskit/commits/9015fad))
* bug fix; cleaned up codeBlock node ([5b85e12](https://bitbucket.org/atlassian/atlaskit/commits/5b85e12))
* bug fix; add missing export for text-color plugin ([51659db](https://bitbucket.org/atlassian/atlaskit/commits/51659db))

* bug fix; style fix in trash icon in language picker. ([4026e3e](https://bitbucket.org/atlassian/atlaskit/commits/4026e3e))
* feature; add disabled property for ChromeExpanded (issues closed: ed-1612) ([67e8627](https://bitbucket.org/atlassian/atlaskit/commits/67e8627))
* bug fix; added support for pasting from Gist ([b8eede9](https://bitbucket.org/atlassian/atlaskit/commits/b8eede9))
* bug fix; added fix for pasting codeblock from github and bb ([e8755a1](https://bitbucket.org/atlassian/atlaskit/commits/e8755a1))




* feature; adding disabled flag to block-type and advance-formatting toolbar options ([cd3e48e](https://bitbucket.org/atlassian/atlaskit/commits/cd3e48e))




* feature; adding trash option in language picker floating toolbar. (issues closed: #ed-1529) ([7b3d1dc](https://bitbucket.org/atlassian/atlaskit/commits/7b3d1dc))

* bug fix; fixed indent. ([119a304](https://bitbucket.org/atlassian/atlaskit/commits/119a304))
* bug fix; removed tech debt that create schema not using createSchmea function provided. ([b50b366](https://bitbucket.org/atlassian/atlaskit/commits/b50b366))
* feature; convert hyperlink on shift+enter and enter ([1010f56](https://bitbucket.org/atlassian/atlaskit/commits/1010f56))
* bug fix; eD-1689 Add tooltips to image buttons (issues closed: ed-1689) ([9826c37](https://bitbucket.org/atlassian/atlaskit/commits/9826c37))

* feature; added the same hack for all browsers ([d65de62](https://bitbucket.org/atlassian/atlaskit/commits/d65de62))
* feature; update color values and usages as per #AK-2482 (issues closed: #ak-2482) ([ae8fae5](https://bitbucket.org/atlassian/atlaskit/commits/ae8fae5))


* bug fix; firefox toolbar icons fix when shrinking the editor width ([9a80f62](https://bitbucket.org/atlassian/atlaskit/commits/9a80f62))
* bug fix; firefox bug fix of color palette component ([3519721](https://bitbucket.org/atlassian/atlaskit/commits/3519721))

* feature; should only convert to hyperlink on hitting space if it's not already a hyperlink. ([e40936e](https://bitbucket.org/atlassian/atlaskit/commits/e40936e))
* feature; only convert link on hitting space after hyperlink. ([2c79e1a](https://bitbucket.org/atlassian/atlaskit/commits/2c79e1a))


* bug fix; remove docCompact and "compact" behaviour (issues closed: ed-1648) ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))
* feature; update toDOM for server side rendering ([815d6e5](https://bitbucket.org/atlassian/atlaskit/commits/815d6e5))
* bug fix; fix removing unfinalized files ([b2c1f1e](https://bitbucket.org/atlassian/atlaskit/commits/b2c1f1e))
* bug fix; phantom media bugs (issues closed: ed-1755) ([a67b136](https://bitbucket.org/atlassian/atlaskit/commits/a67b136))



* bug fix; fix pasting from different IDEs (issues closed: ed-1680) ([5c3ec74](https://bitbucket.org/atlassian/atlaskit/commits/5c3ec74))
* bug fix; resolved conflicts ([b042f1e](https://bitbucket.org/atlassian/atlaskit/commits/b042f1e))
* bug fix; use latest media components for every package except editor-core: can't use react-la (issues closed: ed-1761) ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

* bug fix; fixed tests for UI components ([83d6e6a](https://bitbucket.org/atlassian/atlaskit/commits/83d6e6a))
* bug fix; resolved conflicts with master ([fee9b3f](https://bitbucket.org/atlassian/atlaskit/commits/fee9b3f))
* bug fix; fixed tslint in storybook ([702f9e7](https://bitbucket.org/atlassian/atlaskit/commits/702f9e7))

* bug fix; tslist errors fixes ([178f638](https://bitbucket.org/atlassian/atlaskit/commits/178f638))
* bug fix; fixed tslint errors ([0e618f9](https://bitbucket.org/atlassian/atlaskit/commits/0e618f9))
* feature; removed typestyle from package.json ([455c1bf](https://bitbucket.org/atlassian/atlaskit/commits/455c1bf))
* feature; moved nodes to styled-componenets ([d8efd85](https://bitbucket.org/atlassian/atlaskit/commits/d8efd85))
* feature; moved typestyle to styled-components in schema nodes and marks, fixed tslint ([dc6b033](https://bitbucket.org/atlassian/atlaskit/commits/dc6b033))
* feature; moved UI components from typestyle to styled-components ([2859562](https://bitbucket.org/atlassian/atlaskit/commits/2859562))
* feature; chromeExpanded styles cleanup ([1b34ab6](https://bitbucket.org/atlassian/atlaskit/commits/1b34ab6))
* feature; added styled components to Chrome expanded and Chrome collapsed components ([5018087](https://bitbucket.org/atlassian/atlaskit/commits/5018087))
* bug fix; remove unused browserkeymap dependency. ([66c267f](https://bitbucket.org/atlassian/atlaskit/commits/66c267f))
* breaking; Upgrading atlaskit components. ([67b15f7](https://bitbucket.org/atlassian/atlaskit/commits/67b15f7))
* breaking; version bump for atlaskit components. ([67b15f7](https://bitbucket.org/atlassian/atlaskit/commits/67b15f7))

* feature; dummy commit to mark release of editor-core. ([93ffd5a](https://bitbucket.org/atlassian/atlaskit/commits/93ffd5a))


* bug fix; restore master behaviour for undo ([e98721a](https://bitbucket.org/atlassian/atlaskit/commits/e98721a))
* bug fix; remove PositionedNode interface, pass getPos as a prop instead + restore media nodes ([5ba9939](https://bitbucket.org/atlassian/atlaskit/commits/5ba9939))
* bug fix; fix UI ([d6c006d](https://bitbucket.org/atlassian/atlaskit/commits/d6c006d))
* breaking; Use getNodeViews(providerFactory, {...}) API for nodeViews. Check story changes for example usage. ([d26748e](https://bitbucket.org/atlassian/atlaskit/commits/d26748e))
* breaking; new API for nodeViews containing React components ([d26748e](https://bitbucket.org/atlassian/atlaskit/commits/d26748e))

* bug fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))
* bug fix; use latest media components ([aea882a](https://bitbucket.org/atlassian/atlaskit/commits/aea882a))




* bug fix; made inline code inclusive=true ([12d02c5](https://bitbucket.org/atlassian/atlaskit/commits/12d02c5))
* feature; Moving Renderer to editor-core (phase-1) ([635e02b](https://bitbucket.org/atlassian/atlaskit/commits/635e02b))
* bug fix; fix Pasting link is hyperlink floating toolbar. ([16fa287](https://bitbucket.org/atlassian/atlaskit/commits/16fa287))
* bug fix; mime type emitting. ([768484f](https://bitbucket.org/atlassian/atlaskit/commits/768484f))
* bug fix; undoing would revert to a state with temporary media id. ([660ad0a](https://bitbucket.org/atlassian/atlaskit/commits/660ad0a))


* bug fix; handle excludes of mark in createSchema ([bf4326a](https://bitbucket.org/atlassian/atlaskit/commits/bf4326a))



* feature; making changing hyperline title more intuitive. (issues closed: # ed-1119) ([81633a7](https://bitbucket.org/atlassian/atlaskit/commits/81633a7))


* breaking; introduce new excludes in `code` and `link` marks ([9ff8373](https://bitbucket.org/atlassian/atlaskit/commits/9ff8373))
* breaking; add colour picker plugin (issues closed: ed-1581) ([9ff8373](https://bitbucket.org/atlassian/atlaskit/commits/9ff8373))
* feature; add API for file upload from data url. (issues closed: ed-1663) ([b4d73cf](https://bitbucket.org/atlassian/atlaskit/commits/b4d73cf))


* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute ([ab1d6d6](https://bitbucket.org/atlassian/atlaskit/commits/ab1d6d6))
* breaking; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([ab1d6d6](https://bitbucket.org/atlassian/atlaskit/commits/ab1d6d6))
* bug fix; manually bump the major version of the core ([0891a79](https://bitbucket.org/atlassian/atlaskit/commits/0891a79))
* bug fix; encoding and parsing of media nodes (issues closed: ed-1674) ([6a7817d](https://bitbucket.org/atlassian/atlaskit/commits/6a7817d))
* breaking; ED-1688 ([2e68b31](https://bitbucket.org/atlassian/atlaskit/commits/2e68b31))
* breaking; make storyMediaProviderFactory a factory x2 (pass media-test-helpers as a first para (issues closed: ed-1688) ([2e68b31](https://bitbucket.org/atlassian/atlaskit/commits/2e68b31))


* bug fix; refactoring to remove function binding not needed. ([7dd6127](https://bitbucket.org/atlassian/atlaskit/commits/7dd6127))
* bug fix; use latest mediacard ([6a1a560](https://bitbucket.org/atlassian/atlaskit/commits/6a1a560))

* bug fix; use media-test-helpers as a dependency, otherwise it won't be installed if editor-co ([404041d](https://bitbucket.org/atlassian/atlaskit/commits/404041d))
* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute ([5a164da](https://bitbucket.org/atlassian/atlaskit/commits/5a164da))
* breaking; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' (issues closed: https://product-fabric.atlassian.net/browse/fs-941) ([5a164da](https://bitbucket.org/atlassian/atlaskit/commits/5a164da))
* feature; adding shortcut for undo-autoformatting (issues closed: #ed-1181) ([6f61b78](https://bitbucket.org/atlassian/atlaskit/commits/6f61b78))


* bug fix; bump media card to latest major version ([4576eaa](https://bitbucket.org/atlassian/atlaskit/commits/4576eaa))



* bug fix; set focus only if there was no focus before ([2b24723](https://bitbucket.org/atlassian/atlaskit/commits/2b24723))
* bug fix; cleanup ([1eed006](https://bitbucket.org/atlassian/atlaskit/commits/1eed006))
* bug fix; fixed mention query when editor is not in focus ([5ac5203](https://bitbucket.org/atlassian/atlaskit/commits/5ac5203))
* bug fix; cleaned up ([456deab](https://bitbucket.org/atlassian/atlaskit/commits/456deab))
* bug fix; disable emoji button until the emoji popup is fixed ([dea398d](https://bitbucket.org/atlassian/atlaskit/commits/dea398d))





* feature; reducing bundle size by updating dependencies (issues closed: ed-1631) ([4ded258](https://bitbucket.org/atlassian/atlaskit/commits/4ded258))

* bug fix; use new mediacard selector for selected elements ([73a21fa](https://bitbucket.org/atlassian/atlaskit/commits/73a21fa))
* bug fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))
* bug fix; preventing unsubscribe from modifying array iterator, preventing 'unfinalized' statu ([26e42b8](https://bitbucket.org/atlassian/atlaskit/commits/26e42b8))
* bug fix; removing unnecessary state references, correctly spreading mediaState ([67ed91b](https://bitbucket.org/atlassian/atlaskit/commits/67ed91b))
* bug fix; setting mediaState immediately before subscribing to changes ([b56fa13](https://bitbucket.org/atlassian/atlaskit/commits/b56fa13))








* bug fix; resolved conflicts with master ([8927ee3](https://bitbucket.org/atlassian/atlaskit/commits/8927ee3))

* bug fix; bump media components, use new upload view ([e6b6b1f](https://bitbucket.org/atlassian/atlaskit/commits/e6b6b1f))




* bug fix; fixed toolbarMention test ([b465d5c](https://bitbucket.org/atlassian/atlaskit/commits/b465d5c))
* bug fix; fixes tests in master ([4ce390a](https://bitbucket.org/atlassian/atlaskit/commits/4ce390a))
* bug fix; adding meaningful  atl text to images in editor. (issues closed: #ed-1587) ([1083b5e](https://bitbucket.org/atlassian/atlaskit/commits/1083b5e))
* bug fix; fixes a bug where code-mark was required in the schema in order for text-formatting ([a96e359](https://bitbucket.org/atlassian/atlaskit/commits/a96e359))

* feature; added atlassian.editor.mention.autoformatting analytics ([88a197e](https://bitbucket.org/atlassian/atlaskit/commits/88a197e))
* bug fix; fixed typo ([869de09](https://bitbucket.org/atlassian/atlaskit/commits/869de09))
* bug fix; updated title of the mention button ([4b02c62](https://bitbucket.org/atlassian/atlaskit/commits/4b02c62))



* feature; added creation of mentions by clicking on mentions toolbar icon ([c72c45e](https://bitbucket.org/atlassian/atlaskit/commits/c72c45e))
* bug fix; make sure .focus() isn't called when editor is already focused (issues closed: ed-1510) ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; upgrade Emoji version to released version with breaking style changes (issues closed: fs-904) ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

* bug fix; fixed inline code behaviour when pressing backspace ([5ba82ae](https://bitbucket.org/atlassian/atlaskit/commits/5ba82ae))



* feature; upgrade emoji. Remove need for style overrides. (issues closed: fs-904) ([f2550dc](https://bitbucket.org/atlassian/atlaskit/commits/f2550dc))
* bug fix; fixed language selection in code-block whith 4+ backticks ([be80b3e](https://bitbucket.org/atlassian/atlaskit/commits/be80b3e))

* bug fix; first time typing @ in firefox doesn't trigger mentions (issues closed: ed-1553) ([caf9a4e](https://bitbucket.org/atlassian/atlaskit/commits/caf9a4e))
* bug fix; exception when removing media node with the X button. (issues closed: ed-1597) ([6372630](https://bitbucket.org/atlassian/atlaskit/commits/6372630))
* feature; bump typestyle version ([5ac9717](https://bitbucket.org/atlassian/atlaskit/commits/5ac9717))

* bug fix; tests ([52bfd82](https://bitbucket.org/atlassian/atlaskit/commits/52bfd82))




* bug fix; fix validate tslint commits ([728a7ee](https://bitbucket.org/atlassian/atlaskit/commits/728a7ee))

* bug fix; rename 'module' global to be NodeJS safe. ([f7e8bb0](https://bitbucket.org/atlassian/atlaskit/commits/f7e8bb0))
* feature; add helper for creating schema with order of marks and nodes preserved (issues closed: ed-1505) ([eca4720](https://bitbucket.org/atlassian/atlaskit/commits/eca4720))
* bug fix; use common mediaProvider for both renderer and editor-core ([7ed6650](https://bitbucket.org/atlassian/atlaskit/commits/7ed6650))
* bug fix; do not dispatch transaction on blur in code-block and panel plugins (issues closed: ed-1545) ([741d5fd](https://bitbucket.org/atlassian/atlaskit/commits/741d5fd))
* bug fix; flickering of cards during picking and uploading. (issues closed: ed-1595) ([518eefc](https://bitbucket.org/atlassian/atlaskit/commits/518eefc))
* bug fix; move unknown to complete ([d34f43a](https://bitbucket.org/atlassian/atlaskit/commits/d34f43a))
* bug fix; use unknown only once ([622d1a5](https://bitbucket.org/atlassian/atlaskit/commits/622d1a5))
* bug fix; harden code to run in NodeJS environment. ([cc78477](https://bitbucket.org/atlassian/atlaskit/commits/cc78477))
* feature; add presentational attributes for media node toDOM, for static HTML rendering (e.g. ([9d43e9b](https://bitbucket.org/atlassian/atlaskit/commits/9d43e9b))
* bug fix; export default media state manager, media provider (rw) and media state from editor- ([77466f8](https://bitbucket.org/atlassian/atlaskit/commits/77466f8))

* bug fix; move editor-relate media components into media-core (defaultMediaProvider, mediaStat (issues closed: ed-1580) ([c85be66](https://bitbucket.org/atlassian/atlaskit/commits/c85be66))
* bug fix; temporary use complete media status for uploading files ([9052812](https://bitbucket.org/atlassian/atlaskit/commits/9052812))
* bug fix; use new media components (issues closed: ed-1560) ([a494fd5](https://bitbucket.org/atlassian/atlaskit/commits/a494fd5))
* bug fix; update hyperlink only when edititng popup is closed (issues closed: ed-1516, ed-1328, ed-1332) ([7e7ed4a](https://bitbucket.org/atlassian/atlaskit/commits/7e7ed4a))

* bug fix; setting value for boolean jsx attributes. ([f38e54a](https://bitbucket.org/atlassian/atlaskit/commits/f38e54a))
* bug fix; prevent focus of all tags in language picket except input. ([dac74e9](https://bitbucket.org/atlassian/atlaskit/commits/dac74e9))
* bug fix; fix that langrage picker should close if user blur it without selection language. ([8fb53fa](https://bitbucket.org/atlassian/atlaskit/commits/8fb53fa))

* feature; using atlaskit single-select component for language picker. (issues closed: #ed-1313) ([3b7e94b](https://bitbucket.org/atlassian/atlaskit/commits/3b7e94b))

* bug fix; fix changePanelType and removePanelType for fixes in panel structure. ([e2c31a9](https://bitbucket.org/atlassian/atlaskit/commits/e2c31a9))
* feature; add support for compact behaviour, add media support to editor-hipchat, update editor-hipchat schema to one paragraph only (issues closed: ed-1493, ed-1555) ([f8fe04d](https://bitbucket.org/atlassian/atlaskit/commits/f8fe04d))











* bug fix; remove custom keymap handling for panels. (issues closed: #ed-1401) ([1a48186](https://bitbucket.org/atlassian/atlaskit/commits/1a48186))
* feature; add unfinalized media state status. ([3c3a277](https://bitbucket.org/atlassian/atlaskit/commits/3c3a277))

* bug fix; disable IE11 resize handles for panels. (issues closed: ed-1557) ([7c3da71](https://bitbucket.org/atlassian/atlaskit/commits/7c3da71))
* breaking;  ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))
* breaking; media support in core, media support for editor-cq ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))



* bug fix; update legal copy to be more clear. Not all modules include ADG license. (issues closed: ak-2035) ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))


* bug fix; update legal copy and fix broken links for component README on npm. New contribution and (issues closed: ak-2035) ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

* bug fix; blank space after mention should only be inserted is not already present. (issues closed: #ed-1403) ([4a767e7](https://bitbucket.org/atlassian/atlaskit/commits/4a767e7))
* feature; added h6 support. ([cffc40a](https://bitbucket.org/atlassian/atlaskit/commits/cffc40a))

* bug fix; set default of title and alt to be null so that it does not render redundant element ([eae2e6b](https://bitbucket.org/atlassian/atlaskit/commits/eae2e6b))

* feature; added alt and title to image. ([d7b2d63](https://bitbucket.org/atlassian/atlaskit/commits/d7b2d63))
* bug fix; refactor hyperlink plugin to have one input panel (issues closed: ed-267, ed-1267) ([71c3db1](https://bitbucket.org/atlassian/atlaskit/commits/71c3db1))
* bug fix; exporting LanguagePicker ([a8dbbb6](https://bitbucket.org/atlassian/atlaskit/commits/a8dbbb6))
* feature; triple enter to exit code block. (issues closed: #ed-1377) ([7ed01f7](https://bitbucket.org/atlassian/atlaskit/commits/7ed01f7))

* bug fix; adding hardbreaks in panel on enter key press. (issues closed: #ed-1515) ([a32ae3b](https://bitbucket.org/atlassian/atlaskit/commits/a32ae3b))


* feature; rewinded patched version to 0.20.3 in order to fix cursor problem ([50078a1](https://bitbucket.org/atlassian/atlaskit/commits/50078a1))

* bug fix; mention query and emoji query should be dismissed after hitting "space" when there's (issues closed: ed-1501) ([91573b2](https://bitbucket.org/atlassian/atlaskit/commits/91573b2))

* bug fix; fixing ordering for Escape keymap callbacks execution. (issues closed: #ed-1503) ([3bd6026](https://bitbucket.org/atlassian/atlaskit/commits/3bd6026))

* bug fix; updated ParseRule interface in prosemirror-model ([192f793](https://bitbucket.org/atlassian/atlaskit/commits/192f793))



* bug fix; hyperlink floating toolbar should be visible when user uses Cmd-K to create a link. (issues closed: #ed-1475) ([dcaead6](https://bitbucket.org/atlassian/atlaskit/commits/dcaead6))
* bug fix; link toolbar should be visible when its clicked. (issues closed: #ed-945) ([0301955](https://bitbucket.org/atlassian/atlaskit/commits/0301955))




* bug fix; skipped 2 bb tests repated to pasting ([22774bc](https://bitbucket.org/atlassian/atlaskit/commits/22774bc))



* bug fix; resolved conflicts with master ([71b8a1f](https://bitbucket.org/atlassian/atlaskit/commits/71b8a1f))
* feature; updated patches for prosemirror-view, removed unneseccaty tests for code block pastin ([18c26f4](https://bitbucket.org/atlassian/atlaskit/commits/18c26f4))


* bug fix; use prosemirror-view fork with commit id dependency on prosemirror-model fork ([fcd92f5](https://bitbucket.org/atlassian/atlaskit/commits/fcd92f5))
* bug fix; use commit for our own github repo instead of branch. (issues closed: ed-1474) ([d62dd7c](https://bitbucket.org/atlassian/atlaskit/commits/d62dd7c))



* bug fix; resolved conflicts with master ([240c1dc](https://bitbucket.org/atlassian/atlaskit/commits/240c1dc))
* bug fix; applied patch for prosemirror-view to fix pasting in IE11/Edge ([77c1a9c](https://bitbucket.org/atlassian/atlaskit/commits/77c1a9c))
* bug fix; fix empty link problem in hyperlink popup (issues closed: ed-1323) ([a5a89d2](https://bitbucket.org/atlassian/atlaskit/commits/a5a89d2))
* bug fix; mention and emoji throws error when inserted (issues closed: ed-1471) ([c203acb](https://bitbucket.org/atlassian/atlaskit/commits/c203acb))
* bug fix; keep focus inside editor when clicking on toolbar buttons (issues closed: ed-1419) ([eb58e21](https://bitbucket.org/atlassian/atlaskit/commits/eb58e21))
* bug fix; fix conversion of partial selection in code block when selection is towards end or i ([cf8faa7](https://bitbucket.org/atlassian/atlaskit/commits/cf8faa7))





* bug fix; cleanup ([9063a3c](https://bitbucket.org/atlassian/atlaskit/commits/9063a3c))
* bug fix; updated autoformatting to make in exclusive right after conversion ([c9311cd](https://bitbucket.org/atlassian/atlaskit/commits/c9311cd))


* bug fix; mention and emoji needs to be added before blocktype plugin (issues closed: ed-1464) ([cee19b4](https://bitbucket.org/atlassian/atlaskit/commits/cee19b4))


* bug fix; fixing reges in input rule for string. (issues closed: #ed-1242) ([853f0d0](https://bitbucket.org/atlassian/atlaskit/commits/853f0d0))
* bug fix; making ordered list list-item styles more specific to ensure they are not applied to (issues closed: #ed-1443) ([aca7124](https://bitbucket.org/atlassian/atlaskit/commits/aca7124))

* bug fix; it should be possible to change selected lines of code block to another block type. (issues closed: #ed-553) ([db5bffb](https://bitbucket.org/atlassian/atlaskit/commits/db5bffb))



* bug fix; make mono and link right exclusive, the rest - right inclusive ([d55f5c3](https://bitbucket.org/atlassian/atlaskit/commits/d55f5c3))
* bug fix; use prosemirror-view fork without node_modules directory (issues closed: ed-1449) ([772e87a](https://bitbucket.org/atlassian/atlaskit/commits/772e87a))
* breaking;  ([a97673e](https://bitbucket.org/atlassian/atlaskit/commits/a97673e))
* breaking; updated mention node to follow spec (issues closed: ed-1448) ([a97673e](https://bitbucket.org/atlassian/atlaskit/commits/a97673e))
* feature; add protocols to links ([2ae6a2c](https://bitbucket.org/atlassian/atlaskit/commits/2ae6a2c))

* bug fix; ED-1370 removed forgotten singleton plugins. ([78737b2](https://bitbucket.org/atlassian/atlaskit/commits/78737b2))

* bug fix; should not spread history plugin ([c7fb67f](https://bitbucket.org/atlassian/atlaskit/commits/c7fb67f))

* breaking;  ([77ef77b](https://bitbucket.org/atlassian/atlaskit/commits/77ef77b))
* breaking; removed reconfigure in plugin util ([77ef77b](https://bitbucket.org/atlassian/atlaskit/commits/77ef77b))

* feature; manually update core version. ([de54a2f](https://bitbucket.org/atlassian/atlaskit/commits/de54a2f))

* bug fix; fixed codeBlock nodeSpec to pass tests ([5d7da72](https://bitbucket.org/atlassian/atlaskit/commits/5d7da72))
* bug fix; make sure core storybook is working with new plugin structure. ([ad25e0c](https://bitbucket.org/atlassian/atlaskit/commits/ad25e0c))

* bug fix; removed reconfigured in blocktype ([bb276ce](https://bitbucket.org/atlassian/atlaskit/commits/bb276ce))
* feature; BREAKING CHANGES: return plugins as an array instead of single plugin. ([32e5c6d](https://bitbucket.org/atlassian/atlaskit/commits/32e5c6d))


* bug fix; add check if subsup enable to ToolbarAdvancedTextFormatting ([31ccd56](https://bitbucket.org/atlassian/atlaskit/commits/31ccd56))
* bug fix; updating refs mechanism ([c4c849b](https://bitbucket.org/atlassian/atlaskit/commits/c4c849b))




* bug fix; removed supportedLanguages attr from codeBlock nodeSpec ([2cc1082](https://bitbucket.org/atlassian/atlaskit/commits/2cc1082))







* bug fix; turn off code block fencing inside code block (issues closed: ed-1321) ([a2e12ed](https://bitbucket.org/atlassian/atlaskit/commits/a2e12ed))
* bug fix; add style for selected mention node ([81a4bcb](https://bitbucket.org/atlassian/atlaskit/commits/81a4bcb))
* bug fix; fixed text formatting input-rules for ** ([10d2631](https://bitbucket.org/atlassian/atlaskit/commits/10d2631))
* bug fix; nesting ordered list styles to be applied upto depth 9. ([9a3a818](https://bitbucket.org/atlassian/atlaskit/commits/9a3a818))

* feature; adding styles for nested ordered lists. (issues closed: #ed-1241) ([3cda0d6](https://bitbucket.org/atlassian/atlaskit/commits/3cda0d6))

* feature; add ability to skip {} in test with backslash (issues closed: ed-1398) ([e763a5e](https://bitbucket.org/atlassian/atlaskit/commits/e763a5e))

* bug fix; export NodeView from prosemirror declarations from editor-core ([444869a](https://bitbucket.org/atlassian/atlaskit/commits/444869a))


* bug fix; emojiPlugin throws an error if there's no code mark in schema (issues closed: ed-1406) ([b363742](https://bitbucket.org/atlassian/atlaskit/commits/b363742))


* bug fix; disable inputrules inside code (issues closed: ed-1381) ([8b65767](https://bitbucket.org/atlassian/atlaskit/commits/8b65767))





* bug fix; fix css override for emoji for compatibility with Bitbucket (issues closed: fs-864) ([2a426c5](https://bitbucket.org/atlassian/atlaskit/commits/2a426c5))

* bug fix; removed override of paste function. added missing analytics for code autoformat ([d97d57c](https://bitbucket.org/atlassian/atlaskit/commits/d97d57c))
* bug fix; fix toggling for ordered list items. ([40182ec](https://bitbucket.org/atlassian/atlaskit/commits/40182ec))
* feature; added supportedLanguages to codeblock node as attribute, filtering languages in dro ([3025754](https://bitbucket.org/atlassian/atlaskit/commits/3025754))
* bug fix; fix un-toggling of nested lists. (issues closed: #ed-1281) ([813f8ec](https://bitbucket.org/atlassian/atlaskit/commits/813f8ec))


* bug fix; add superscript/subscript toolbars to AdvancedTextFormatting (issues closed: ed-81) ([02cc810](https://bitbucket.org/atlassian/atlaskit/commits/02cc810))
* bug fix; removed spaces in languageList map to make tests pass ([f7a4b5d](https://bitbucket.org/atlassian/atlaskit/commits/f7a4b5d))


* feature; added support for languages used in Confluence ([a49a987](https://bitbucket.org/atlassian/atlaskit/commits/a49a987))



* bug fix; moved removeStoredMarks in the end of the transaction chain ([318b57e](https://bitbucket.org/atlassian/atlaskit/commits/318b57e))

* bug fix; fix clear-formatting when selection is empty and at the end of a block. (issues closed: #ed-1360) ([6db9454](https://bitbucket.org/atlassian/atlaskit/commits/6db9454))
* bug fix; align margins of paragraphs inside lists to list item margins. ([478840b](https://bitbucket.org/atlassian/atlaskit/commits/478840b))

* feature; enter key-press on an empty nested list item should create a list item in parent li (issues closed: #ed-1244) ([f1d14cc](https://bitbucket.org/atlassian/atlaskit/commits/f1d14cc))
* feature; mentions lozenge checks if user data has nickname and renders if present ([7be8bbe](https://bitbucket.org/atlassian/atlaskit/commits/7be8bbe))
* bug fix; fixed bug that image, hr are not selectable. ([919c8e3](https://bitbucket.org/atlassian/atlaskit/commits/919c8e3))




* feature; updated package.json to use Prosemirror v.20.1 ([06a039b](https://bitbucket.org/atlassian/atlaskit/commits/06a039b))

* bug fix; fix mention picker randomly jumps if attached above mention query ([0b733df](https://bitbucket.org/atlassian/atlaskit/commits/0b733df))
* bug fix; added more comments and updated addMark in text-formatting ([9d98cc1](https://bitbucket.org/atlassian/atlaskit/commits/9d98cc1))
* bug fix; use Emoji typeahead count() available in 13.1.0 (issues closed: fs-811) ([dfce4a2](https://bitbucket.org/atlassian/atlaskit/commits/dfce4a2))

* feature; fix space/enter special cases in emoji typeahead. Reintroduce missing emoji tests. (issues closed: fs-811) ([8c1e7ba](https://bitbucket.org/atlassian/atlaskit/commits/8c1e7ba))
* feature; upgrade Emoji to latest, supporting latest storage format. (issues closed: fs-811) ([813de18](https://bitbucket.org/atlassian/atlaskit/commits/813de18))
* feature; port current emoji editor support to new prosemirror (issues closed: fs-811) ([bfebd34](https://bitbucket.org/atlassian/atlaskit/commits/bfebd34))


* bug fix; removed prosemirror dependency from package.json ([d65b5b6](https://bitbucket.org/atlassian/atlaskit/commits/d65b5b6))

* bug fix; fixes for IE for image-uploader plugin ([6236dea](https://bitbucket.org/atlassian/atlaskit/commits/6236dea))

* breaking; BREAKING CHANGE: upgraded prosemirror to 0.19.* ([a435da9](https://bitbucket.org/atlassian/atlaskit/commits/a435da9))

* bug fix; bumped mentions in editor-core ([049a7b3](https://bitbucket.org/atlassian/atlaskit/commits/049a7b3))



* feature; use atlaskit z-index variables to define z-index for floating panels ([19d565a](https://bitbucket.org/atlassian/atlaskit/commits/19d565a))



* bug fix; fix default for variation, and fix emoji tests in editor-core (issues closed: fs-781) ([47f2ded](https://bitbucket.org/atlassian/atlaskit/commits/47f2ded))


* feature; remove redundant dependencies and replace ak-* -> @atlaskit/* ([2ef4127](https://bitbucket.org/atlassian/atlaskit/commits/2ef4127))
* bug fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

* bug fix; ensure variation is a number or undefined when passed to ResourcedEmoji (issues closed: fs-777) ([a3a5459](https://bitbucket.org/atlassian/atlaskit/commits/a3a5459))
* feature; support emojis based only on a shortcut (legacy emoji support) (issues closed: fs-777) ([78ecbab](https://bitbucket.org/atlassian/atlaskit/commits/78ecbab))



* feature; use popper to position mention picker ([e9721d4](https://bitbucket.org/atlassian/atlaskit/commits/e9721d4))

* bug fix; stop using attr for EmojiProvider. Fix styling for emoji placeholder. (issues closed: fs-781) ([16e5c7f](https://bitbucket.org/atlassian/atlaskit/commits/16e5c7f))
* bug fix; use Emoji types where possible in editor-core (issues closed: fs-781) ([ef13260](https://bitbucket.org/atlassian/atlaskit/commits/ef13260))
* bug fix; emojiProvider should be optional in Chrome (issues closed: fs-781) ([6ea3d4c](https://bitbucket.org/atlassian/atlaskit/commits/6ea3d4c))
* feature; bump editor-core version to stop linking in atlaskit build due to breaking changes. (issues closed: fs-781) ([ef1c904](https://bitbucket.org/atlassian/atlaskit/commits/ef1c904))
* breaking;  ([025c8a7](https://bitbucket.org/atlassian/atlaskit/commits/025c8a7))
* breaking; update editor-core to use asynchronous emojis. (issues closed: fs-781) ([025c8a7](https://bitbucket.org/atlassian/atlaskit/commits/025c8a7))


* feature; update behavior of code to match with the spec ([9db0ae5](https://bitbucket.org/atlassian/atlaskit/commits/9db0ae5))
* bug fix; fixing redo keymapping for mac from Cmd-Shift-Y to Cmd-Shift-Z. ([afac345](https://bitbucket.org/atlassian/atlaskit/commits/afac345))

* feature; don't show advanced text formatting button if we don't have anything to draw there ([7f1f008](https://bitbucket.org/atlassian/atlaskit/commits/7f1f008))


* breaking;  ([1084700](https://bitbucket.org/atlassian/atlaskit/commits/1084700))
* breaking; rename mono to code ([1084700](https://bitbucket.org/atlassian/atlaskit/commits/1084700))
* bug fix; when converting multiple blocks to code block a single code block should get generat (issues closed: #ed-1053) ([53a0f2d](https://bitbucket.org/atlassian/atlaskit/commits/53a0f2d))






* bug fix; update the way editor-core exposes test-helpers and types ([f756f11](https://bitbucket.org/atlassian/atlaskit/commits/f756f11))


* bug fix; merge branch 'master' into ED-738-ak-editor-shared-styles ([b514e44](https://bitbucket.org/atlassian/atlaskit/commits/b514e44))

* bug fix; fix prosemirror proxy type info in editor-core ([fbb65f2](https://bitbucket.org/atlassian/atlaskit/commits/fbb65f2))



* bug fix; add missing type info in editor-core ([025fa29](https://bitbucket.org/atlassian/atlaskit/commits/025fa29))


* bug fix; fix DND/Paste behaviour in Safari, fix errors in IE (issues closed: ed-1037, ed-1038) ([fa15767](https://bitbucket.org/atlassian/atlaskit/commits/fa15767))
* feature; adding clear-formatting option to advance toolbar formatting dropdown and clear-for ([2149b59](https://bitbucket.org/atlassian/atlaskit/commits/2149b59))

* bug fix; revert the refactoring in ToolbarBlockType to fix broken unit test cases. ([efa7cff](https://bitbucket.org/atlassian/atlaskit/commits/efa7cff))

* bug fix; add missing key prop for ToolbarBlockType (issues closed: ed-1046) ([94dd489](https://bitbucket.org/atlassian/atlaskit/commits/94dd489))


* feature; adding keyboard mapping for link. (issues closed: #ed-303) ([842c8dc](https://bitbucket.org/atlassian/atlaskit/commits/842c8dc))
* feature; dummy commit to mark a release in editor-core. (issues closed: #ed-178) ([8b50189](https://bitbucket.org/atlassian/atlaskit/commits/8b50189))






* bug fix; restrict 'heading' node to make link the only allowed mark in the JSON schema. ([3278459](https://bitbucket.org/atlassian/atlaskit/commits/3278459))
* feature; add 'code' mark to the JSON schema. ([c3b1f1f](https://bitbucket.org/atlassian/atlaskit/commits/c3b1f1f))

* feature; adding blank space at the end when adding monospace using input rules. ([1ad0b7b](https://bitbucket.org/atlassian/atlaskit/commits/1ad0b7b))





* bug fix; commenting out breaking unit test cases. ([a916441](https://bitbucket.org/atlassian/atlaskit/commits/a916441))
* bug fix; remove un-necessary variable assignment. ([89e22ad](https://bitbucket.org/atlassian/atlaskit/commits/89e22ad))
* bug fix; remove 'image_node' from the JSON schema ([8e03f06](https://bitbucket.org/atlassian/atlaskit/commits/8e03f06))



* bug fix; update media node spec. ([b04daf0](https://bitbucket.org/atlassian/atlaskit/commits/b04daf0))




* bug fix; prevent setting selection outside of document (issues closed: ed-980) ([bb500a1](https://bitbucket.org/atlassian/atlaskit/commits/bb500a1))


* bug fix; fixes blowing up the editor when it's detached from dom ([1416403](https://bitbucket.org/atlassian/atlaskit/commits/1416403))




* feature; completed changes for hyperlink functionality. (issues closed: #ed-639) ([bc8bd99](https://bitbucket.org/atlassian/atlaskit/commits/bc8bd99))



* bug fix; corrected variable name ([6034a00](https://bitbucket.org/atlassian/atlaskit/commits/6034a00))
* bug fix; cleanup ([c07f305](https://bitbucket.org/atlassian/atlaskit/commits/c07f305))


* bug fix; fixes unlink with 2 links in the document ([ad346c5](https://bitbucket.org/atlassian/atlaskit/commits/ad346c5))
* feature; bumping the @atlaskit/mention dependency ([ed78e82](https://bitbucket.org/atlassian/atlaskit/commits/ed78e82))

* feature; replace ak-* with @atlaskit/* packages in editor-core ([e5abf88](https://bitbucket.org/atlassian/atlaskit/commits/e5abf88))
* bug fix; changing redo shortcut for MAC to Cmd-Shift-Y and for Windows to Ctrl-Y. ([c480e46](https://bitbucket.org/atlassian/atlaskit/commits/c480e46))

* feature; changing key-map for redo to Ctrl-Shift-Y. (issues closed: #ed-309) ([0eff95c](https://bitbucket.org/atlassian/atlaskit/commits/0eff95c))
* bug fix; reduce spacing between formatting bar buttons to 4px. (issues closed: #ed-769) ([e14c0cc](https://bitbucket.org/atlassian/atlaskit/commits/e14c0cc))

* bug fix; updating media-core ([9d01b05](https://bitbucket.org/atlassian/atlaskit/commits/9d01b05))
* breaking;  ([95490c7](https://bitbucket.org/atlassian/atlaskit/commits/95490c7))
* breaking; Changing the way editor-core and test-helper are built (issues closed: fab-2606) ([95490c7](https://bitbucket.org/atlassian/atlaskit/commits/95490c7))


* feature; use @atlaskit/emoji instead of ak-emoji in editor-core ([5aa5b38](https://bitbucket.org/atlassian/atlaskit/commits/5aa5b38))
* bug fix; fix newest editor-core errors in editor-desktop ([2a17e90](https://bitbucket.org/atlassian/atlaskit/commits/2a17e90))

* bug fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

* bug fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

* bug fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))





* bug fix; change in hyperlink plugin to add missing state variable toolbarVisible. ([c261e6f](https://bitbucket.org/atlassian/atlaskit/commits/c261e6f))
* bug fix; merged master into ED-738 ([8afd112](https://bitbucket.org/atlassian/atlaskit/commits/8afd112))
* feature; adding small arrow to advance text styling dropwodn menu trigger. (issues closed: #ed-770) ([0f728d9](https://bitbucket.org/atlassian/atlaskit/commits/0f728d9))

* bug fix; fixed bug that up and down not working in lists ([e9efd74](https://bitbucket.org/atlassian/atlaskit/commits/e9efd74))








* feature; Remove plugins update call for Panel, Hyperlink and Code-block when editor is focused ([dd36501](https://bitbucket.org/atlassian/atlaskit/commits/dd36501))




















* bug fix; Fixed bug that there is a border for code block in IE11. ([8748634](https://bitbucket.org/atlassian/atlaskit/commits/8748634))

* bug fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))







* bug fix; Hyper link toolbar should not disappear as user starts typing in toolbar input. ([e60b43b](https://bitbucket.org/atlassian/atlaskit/commits/e60b43b))
* bug fix; Panel subscribers should not be invoked for a dom event in editor which is not inside ([94bf5d8](https://bitbucket.org/atlassian/atlaskit/commits/94bf5d8))
* bug fix; Fixed bug that converting to code block when text does not start with fence ([7f40722](https://bitbucket.org/atlassian/atlaskit/commits/7f40722))











* bug fix; Bumping mention to latest version ([81e5d34](https://bitbucket.org/atlassian/atlaskit/commits/81e5d34))

* feature; update code block with formatted language. ([d679009](https://bitbucket.org/atlassian/atlaskit/commits/d679009))

* feature; Added analytics track for fence language format. ([683e692](https://bitbucket.org/atlassian/atlaskit/commits/683e692))



* feature; Allow user to input language using fence code format. ([58639da](https://bitbucket.org/atlassian/atlaskit/commits/58639da))

* bug fix; Use prosemirror fork in editor with backported fix for not editable nodes ([2ab7015](https://bitbucket.org/atlassian/atlaskit/commits/2ab7015))
* bug fix; Exports IsScopedToCloudClientId type from src/media ([c287554](https://bitbucket.org/atlassian/atlaskit/commits/c287554))




* bug fix; Fix bug that cannot create new p if only contains mention. ([b0f18c2](https://bitbucket.org/atlassian/atlaskit/commits/b0f18c2))






* feature; Allow triple ticks and enter to create code block ([bb04293](https://bitbucket.org/atlassian/atlaskit/commits/bb04293))


* feature; Advance text formatting button should be disabled if current selection is code block. ([9b51b63](https://bitbucket.org/atlassian/atlaskit/commits/9b51b63))






* bug fix; Removing blur handling from mention picker. ([fb97160](https://bitbucket.org/atlassian/atlaskit/commits/fb97160))


* feature; Added alias to language list. ([3140001](https://bitbucket.org/atlassian/atlaskit/commits/3140001))
* feature; Mention to dismiss when editor is blur. ([78b394f](https://bitbucket.org/atlassian/atlaskit/commits/78b394f))
* feature; Changes in hyperlink and code-block floating toolbars to hide them when editor is blu ([d7ed561](https://bitbucket.org/atlassian/atlaskit/commits/d7ed561))
* feature; Language picker should disappear when editor is blur. ([b0a4417](https://bitbucket.org/atlassian/atlaskit/commits/b0a4417))




* bug fix; add comma back. ([139c43b](https://bitbucket.org/atlassian/atlaskit/commits/139c43b))





* feature; make sure up and down work with non test block nested ([fe0e675](https://bitbucket.org/atlassian/atlaskit/commits/fe0e675))



* feature; up and down should create paragraph and have right block type shown ([82dbe30](https://bitbucket.org/atlassian/atlaskit/commits/82dbe30))
* feature; Panel floating toolbar should disappear when editor is blur. ([3850610](https://bitbucket.org/atlassian/atlaskit/commits/3850610))


* feature; Make sure up and down works on non text block. ([2860417](https://bitbucket.org/atlassian/atlaskit/commits/2860417))
* feature; add EditorServicesConfig and media related interfaces. ([4ac9ea6](https://bitbucket.org/atlassian/atlaskit/commits/4ac9ea6))
* feature; Should not create a new p if empty text content ([2d26463](https://bitbucket.org/atlassian/atlaskit/commits/2d26463))





* feature; Removed double enter to exit code block ([2b21126](https://bitbucket.org/atlassian/atlaskit/commits/2b21126))




* feature; add universal Editor config types. ([9bcbe3f](https://bitbucket.org/atlassian/atlaskit/commits/9bcbe3f))
* bug fix; Fixes typing in the beginning of the link becomes a part of a link ([a873987](https://bitbucket.org/atlassian/atlaskit/commits/a873987))



* bug fix; Fixing styles of selected option in panel floating toolbar. ([40adb05](https://bitbucket.org/atlassian/atlaskit/commits/40adb05))
* feature; improve experience of code block. Implementation from Jyoti. ([0f07a6c](https://bitbucket.org/atlassian/atlaskit/commits/0f07a6c))

* bug fix; switch some editor-core deps to @atlaskit/ ([34337fa](https://bitbucket.org/atlassian/atlaskit/commits/34337fa))
* feature; Moveup to create a new paragraph. ([3f6a62e](https://bitbucket.org/atlassian/atlaskit/commits/3f6a62e))




* bug fix; Added back missing panel changes. ([cbe9e44](https://bitbucket.org/atlassian/atlaskit/commits/cbe9e44))
* bug fix; Fixing hover style of icons in panel floating toolbar. ([3c74821](https://bitbucket.org/atlassian/atlaskit/commits/3c74821))
* bug fix; Toolbar dropdown for advance test formatting options should close when an option is cl ([86711ca](https://bitbucket.org/atlassian/atlaskit/commits/86711ca))










* feature; Changes in floating toolbar for panels. ([8dcbb60](https://bitbucket.org/atlassian/atlaskit/commits/8dcbb60))
* feature; Moveup to create a new paragraph. ([46bb341](https://bitbucket.org/atlassian/atlaskit/commits/46bb341))
* feature; Create new paragraph on only one level up. ([f99952a](https://bitbucket.org/atlassian/atlaskit/commits/f99952a))
* feature; Improving the user experience of floating panel toolbar. ([a90b139](https://bitbucket.org/atlassian/atlaskit/commits/a90b139))
* feature; arrow down will create a new line below ([6aadf7d](https://bitbucket.org/atlassian/atlaskit/commits/6aadf7d))

* bug fix; Fixes disappearing of mention mark on iOS ([978804b](https://bitbucket.org/atlassian/atlaskit/commits/978804b))
* feature; improve experience of code block floating toolbar. ([abf7f17](https://bitbucket.org/atlassian/atlaskit/commits/abf7f17))

* feature; Moveup to create a new paragraph. ([8b5616f](https://bitbucket.org/atlassian/atlaskit/commits/8b5616f))


* feature; More changes to toolbar option of monospace and strikethrough. ([43aaf91](https://bitbucket.org/atlassian/atlaskit/commits/43aaf91))
* feature; Adding toolbar option for monospace and strikethrough. ([ed44fb0](https://bitbucket.org/atlassian/atlaskit/commits/ed44fb0))
* bug fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))

* feature; Adding panel feature to editor-core. ([900c3db](https://bitbucket.org/atlassian/atlaskit/commits/900c3db))
* bug fix; fix failing test. ([811002b](https://bitbucket.org/atlassian/atlaskit/commits/811002b))







* bug fix; Fixes inserting mentions in other blocks e.g. blockquote ([5462fbb](https://bitbucket.org/atlassian/atlaskit/commits/5462fbb))





















## 56.3.0 (2017-10-30)

* bug fix; prevent markdown syntax highlighting in inline code (issues closed: ed-2861) ([d2dece7](https://bitbucket.org/atlassian/atlaskit/commits/d2dece7))
* feature; added disabled prop to new arch (issues closed: ed-3036) ([4407a2f](https://bitbucket.org/atlassian/atlaskit/commits/4407a2f))
* feature; add confluence inline comment mark. (issues closed: ed-2974) ([246b433](https://bitbucket.org/atlassian/atlaskit/commits/246b433))
## 56.2.2 (2017-10-29)

* bug fix; added validation of the deserialized document on first load (issues closed: ed-3104) ([95e045a](https://bitbucket.org/atlassian/atlaskit/commits/95e045a))
## 56.2.1 (2017-10-27)

* bug fix; fix position of floating hyperlink toolbar. (issues closed: #ed-2427) ([b6f08a9](https://bitbucket.org/atlassian/atlaskit/commits/b6f08a9))
## 56.2.0 (2017-10-26)

* bug fix; replaceDocument should allow JSON object as an argument ([a60e106](https://bitbucket.org/atlassian/atlaskit/commits/a60e106))
* bug fix; autoformatting should not work inside inline code marks. (issues closed: #ed-2815) ([2b5fe26](https://bitbucket.org/atlassian/atlaskit/commits/2b5fe26))


* bug fix; reenabled ToolbarEmojiPicker tests (issues closed: fs-1449) ([7fae478](https://bitbucket.org/atlassian/atlaskit/commits/7fae478))
* feature; fs-951 clicking escape when the picker is open closes it (issues closed: fs-951) ([2ed2d44](https://bitbucket.org/atlassian/atlaskit/commits/2ed2d44))
## 56.1.0 (2017-10-26)

* bug fix; fix tables decoration on load if doc contains a table (issues closed: ed-3080) ([1741e0d](https://bitbucket.org/atlassian/atlaskit/commits/1741e0d))

* feature; rename MediaItem prop to stateManagerFallback ([042f83f](https://bitbucket.org/atlassian/atlaskit/commits/042f83f))


## 56.0.2 (2017-10-26)

* bug fix; clear formatting should remove superscript/subscript marks (issues closed: ed-3082) ([347a096](https://bitbucket.org/atlassian/atlaskit/commits/347a096))
* bug fix; bump editor-core to same version as editor-jira to fix tests ([6f023fa](https://bitbucket.org/atlassian/atlaskit/commits/6f023fa))
* bug fix; bump @atlaskit/editor-core to use mediapicker v10 (issues closed: ed-3083) ([330935a](https://bitbucket.org/atlassian/atlaskit/commits/330935a))
* bug fix; bump @atlaskit/emoji to the latest to get mediapicker dependency to v10 ([1d4a404](https://bitbucket.org/atlassian/atlaskit/commits/1d4a404))
* bug fix; show UnsupportedBlock when renderDocument throws exception (issues closed: ed-3061) ([a3f6266](https://bitbucket.org/atlassian/atlaskit/commits/a3f6266))
## 56.0.1 (2017-10-25)

* bug fix; re-export createSchema from editor-core ([ec5f059](https://bitbucket.org/atlassian/atlaskit/commits/ec5f059))
## 56.0.0 (2017-10-24)

* breaking; JSONSerializer (renderer) is now JSON transformer ([32f99e7](https://bitbucket.org/atlassian/atlaskit/commits/32f99e7))
* breaking; use base renderer files from renderer package ([32f99e7](https://bitbucket.org/atlassian/atlaskit/commits/32f99e7))
## 55.0.0 (2017-10-24)


* feature; emoticons to emoji cxhtml transform ([3b72b96](https://bitbucket.org/atlassian/atlaskit/commits/3b72b96))

* breaking; onExpand is no longer supported for the 'new-arch' editor. Consumers should use CollapsedEditor ([80c639c](https://bitbucket.org/atlassian/atlaskit/commits/80c639c))
* breaking; refactor CollapsedEditor to remove the need for onExpand prop in the new arch ([80c639c](https://bitbucket.org/atlassian/atlaskit/commits/80c639c))
## 54.0.1 (2017-10-23)

* bug fix; pass popupsMountPoint and popupsBoundariesElement to all appearances (issues closed: ed-3060) ([0ab2923](https://bitbucket.org/atlassian/atlaskit/commits/0ab2923))
* bug fix; update version of Button to omit empty ButtonGroup warning ([2836ca9](https://bitbucket.org/atlassian/atlaskit/commits/2836ca9))
## 54.0.0 (2017-10-23)





* bug fix; add imageUploadProvider to ToolDrawer, fix collapsededitor state ([1c232e0](https://bitbucket.org/atlassian/atlaskit/commits/1c232e0))
* bug fix; absorb setValue into replaceDocument editor action ([85c79c8](https://bitbucket.org/atlassian/atlaskit/commits/85c79c8))
* feature; port upload-image plugin to the new architecture ([af102fb](https://bitbucket.org/atlassian/atlaskit/commits/af102fb))
* breaking; The imageUploadHandler prop has been removed in favor of imageUploadProvider. ([ef73026](https://bitbucket.org/atlassian/atlaskit/commits/ef73026))
* breaking; set the imageUploadHandler using providers ([ef73026](https://bitbucket.org/atlassian/atlaskit/commits/ef73026))
* bug fix; use library method to determine end of the document ([e2de547](https://bitbucket.org/atlassian/atlaskit/commits/e2de547))
* bug fix; restrict image width in the editor, to the width of the editor ([6a21d5f](https://bitbucket.org/atlassian/atlaskit/commits/6a21d5f))
* bug fix; fix use of upload-image plugin in story editor ([6aa9ae4](https://bitbucket.org/atlassian/atlaskit/commits/6aa9ae4))
* feature; export CollapsedEditor from the editor-core repo ([a398ca3](https://bitbucket.org/atlassian/atlaskit/commits/a398ca3))
* bug fix; allow consumers to fully control the collapsed state of CollapsedEditor ([b133030](https://bitbucket.org/atlassian/atlaskit/commits/b133030))
* feature; add setValue action to the editor ([a08c28f](https://bitbucket.org/atlassian/atlaskit/commits/a08c28f))
## 53.1.4 (2017-10-22)

* bug fix; work around cursor position issues in Chrome 58-62 (issues closed: ed-2960) ([3d86c08](https://bitbucket.org/atlassian/atlaskit/commits/3d86c08))
## 53.1.3 (2017-10-20)

* bug fix; editor font style dropdown now shows label correctly (issues closed: ak-3651 ed-2952) ([4047555](https://bitbucket.org/atlassian/atlaskit/commits/4047555))
## 53.1.2 (2017-10-20)

* bug fix; newlines removed from pasted text (issues closed: ed-2888) ([792f451](https://bitbucket.org/atlassian/atlaskit/commits/792f451))
## 53.1.1 (2017-10-20)

* bug fix; makes editor placeholder non clickable (issues closed: ed-2939) ([b11a221](https://bitbucket.org/atlassian/atlaskit/commits/b11a221))
* bug fix; preprocessDoc returns new document instead of updating existing one (issues closed: ed-3047) ([a539825](https://bitbucket.org/atlassian/atlaskit/commits/a539825))
## 53.1.0 (2017-10-19)

* feature; add support for popupsMountPoint to the new architecture ([700c36f](https://bitbucket.org/atlassian/atlaskit/commits/700c36f))
## 53.0.1 (2017-10-19)

* bug fix; cleanup ([497ca27](https://bitbucket.org/atlassian/atlaskit/commits/497ca27))
* bug fix; call onChange only on document change (issues closed: ed-2421) ([fbadb9a](https://bitbucket.org/atlassian/atlaskit/commits/fbadb9a))
## 53.0.0 (2017-10-19)

* breaking; JSON renderer is now JSON transformer ([b30653c](https://bitbucket.org/atlassian/atlaskit/commits/b30653c))
* breaking; move JSON Renderer into editor-core transformers (issues closed: ed-3024) ([b30653c](https://bitbucket.org/atlassian/atlaskit/commits/b30653c))

## 52.0.0 (2017-10-19)

* bug fix; bump editor-common ([7640450](https://bitbucket.org/atlassian/atlaskit/commits/7640450))
* bug fix; fix macro ([1e6fd61](https://bitbucket.org/atlassian/atlaskit/commits/1e6fd61))
* breaking; Schema is now being published by editor-common ([9617437](https://bitbucket.org/atlassian/atlaskit/commits/9617437))
* breaking; consume schema from editor-common and remove prosemirror-types ([9617437](https://bitbucket.org/atlassian/atlaskit/commits/9617437))
## 51.1.1 (2017-10-18)

* bug fix; "Insert link" scrolls to top of page (issues closed: ed-2992) ([eee5586](https://bitbucket.org/atlassian/atlaskit/commits/eee5586))
## 51.1.0 (2017-10-18)


* feature; added macro edit toolbar (issues closed: ed-1808) ([dc5d28b](https://bitbucket.org/atlassian/atlaskit/commits/dc5d28b))
## 51.0.1 (2017-10-18)

* bug fix; fix renderer dependency ([0b3d323](https://bitbucket.org/atlassian/atlaskit/commits/0b3d323))
## 51.0.0 (2017-10-18)


* bug fix; prevent text autoformatting within nodes that do not allow the given mark ([05f96d6](https://bitbucket.org/atlassian/atlaskit/commits/05f96d6))
* breaking; Headings can no longer contain any marks other than link, bringing it to parity with the schema. ([5248d6f](https://bitbucket.org/atlassian/atlaskit/commits/5248d6f))
* breaking; only allow inline nodes and link marks in headings (issues closed: ed-74) ([5248d6f](https://bitbucket.org/atlassian/atlaskit/commits/5248d6f))


## 50.5.2 (2017-10-17)

* bug fix; toolbarInsertBlockWrapper crashes without media provider (issues closed: ed-3010) ([87b1f88](https://bitbucket.org/atlassian/atlaskit/commits/87b1f88))
## 50.5.1 (2017-10-16)

* bug fix; editor's filmstrip shows vertical bars when it shouldn't (issues closed: ed-2921) ([bec07ee](https://bitbucket.org/atlassian/atlaskit/commits/bec07ee))
## 50.5.0 (2017-10-16)

* feature; expose MentionsResult interface from mention ([a817c63](https://bitbucket.org/atlassian/atlaskit/commits/a817c63))
## 50.4.0 (2017-10-15)

* bug fix; refactored ToolbarInsertBlock ([7629918](https://bitbucket.org/atlassian/atlaskit/commits/7629918))
* bug fix; updated macro plugin to dispatch macroProvider = null if it failed to resolve the pr ([43bea30](https://bitbucket.org/atlassian/atlaskit/commits/43bea30))
* bug fix; refactored macro plugin ([fa0ee6c](https://bitbucket.org/atlassian/atlaskit/commits/fa0ee6c))
* bug fix; merged master ([78ae215](https://bitbucket.org/atlassian/atlaskit/commits/78ae215))

* bug fix; fixed failing media test ([d37addd](https://bitbucket.org/atlassian/atlaskit/commits/d37addd))
* feature; added Macro to insert menu (issues closed: ed-2827) ([f166000](https://bitbucket.org/atlassian/atlaskit/commits/f166000))
## 50.3.1 (2017-10-13)

* bug fix; pasting file in only pastes file name (issues closed: ed-2222) ([9dea044](https://bitbucket.org/atlassian/atlaskit/commits/9dea044))
## 50.3.0 (2017-10-12)


* feature; add media drop placeholder (issues closed: ed-2377) ([dd1702f](https://bitbucket.org/atlassian/atlaskit/commits/dd1702f))
## 50.2.2 (2017-10-12)

* bug fix; fix tests in picker-facade-spec.ts ([40887b6](https://bitbucket.org/atlassian/atlaskit/commits/40887b6))
* bug fix; skip backwards compatibility test ([3a637c2](https://bitbucket.org/atlassian/atlaskit/commits/3a637c2))
* bug fix; update applicationCard action schema in atlaskit to support app and optional parameter ([58bb72f](https://bitbucket.org/atlassian/atlaskit/commits/58bb72f))
## 50.2.1 (2017-10-12)

* bug fix; measure renderer stat with HiRes API (issues closed: ed-2954) ([3717b4e](https://bitbucket.org/atlassian/atlaskit/commits/3717b4e))
## 50.2.0 (2017-10-10)

* feature; add support for alt-paste, fix clipboard analytics. (issues closed: ed-2882) ([9b2de80](https://bitbucket.org/atlassian/atlaskit/commits/9b2de80))
## 50.1.0 (2017-10-10)

* feature; added CollapsedEditor component (issues closed: ed-2944) ([8172b3e](https://bitbucket.org/atlassian/atlaskit/commits/8172b3e))
## 50.0.0 (2017-10-10)


* bug fix; fixed logic on media context setting in storybook. ([b280156](https://bitbucket.org/atlassian/atlaskit/commits/b280156))
* feature; always reset media plugin when set media provider ([5ef4d81](https://bitbucket.org/atlassian/atlaskit/commits/5ef4d81))
* breaking; storyMediaProviderFactory API in test-helper accepts a config instead of multiple params ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))
* breaking; refactor storyMediaProviderFactory to accept a config instead of multiple param ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))
* breaking; updated media provider api for new authentication on media picker. updated media provider api in ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
* breaking; updated the API of media provider for new authentication on media picker. ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
## 49.0.0 (2017-10-10)

* bug fix; fixed logic on media context setting in storybook. ([b280156](https://bitbucket.org/atlassian/atlaskit/commits/b280156))
* feature; always reset media plugin when set media provider ([5ef4d81](https://bitbucket.org/atlassian/atlaskit/commits/5ef4d81))
* breaking; storyMediaProviderFactory API in test-helper accepts a config instead of multiple params ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))
* breaking; refactor storyMediaProviderFactory to accept a config instead of multiple param ([b72892d](https://bitbucket.org/atlassian/atlaskit/commits/b72892d))
* breaking; updated media provider api for new authentication on media picker. updated media provider api in ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
* breaking; updated the API of media provider for new authentication on media picker. ([b44eb3c](https://bitbucket.org/atlassian/atlaskit/commits/b44eb3c))
## 47.17.0 (2017-10-09)

* bug fix; enable lists in comment editor story ([cd8a647](https://bitbucket.org/atlassian/atlaskit/commits/cd8a647))
* bug fix; remove erraneous showHelp state from Comment editor ([ff602b4](https://bitbucket.org/atlassian/atlaskit/commits/ff602b4))
* bug fix; adding transformer for hipchat editor to remove empty task items and decision items ([562cf5e](https://bitbucket.org/atlassian/atlaskit/commits/562cf5e))
* bug fix; file names should not get linkified. (issues closed: #ed-2887) ([adc5419](https://bitbucket.org/atlassian/atlaskit/commits/adc5419))
* bug fix; use button group in comment appearance; show cancel button in story ([1a61d32](https://bitbucket.org/atlassian/atlaskit/commits/1a61d32))
* bug fix; use ButtonGroup from @atlaskit/button package instead of depreciated source (issues closed: ed-2918) ([5184fdb](https://bitbucket.org/atlassian/atlaskit/commits/5184fdb))
* bug fix; rename AkButton import and use Atlaskit grid size for styled-components ([5679d5b](https://bitbucket.org/atlassian/atlaskit/commits/5679d5b))
* bug fix; do not show ToolbarHelp in new architecture ([bf8ea6d](https://bitbucket.org/atlassian/atlaskit/commits/bf8ea6d))
* bug fix; pass correct type when we want to suppress media in comment appearance ([52d5010](https://bitbucket.org/atlassian/atlaskit/commits/52d5010))
* feature; introduce the comment editor appearance 🎉 (issues closed: ed-2877) ([1e7d4df](https://bitbucket.org/atlassian/atlaskit/commits/1e7d4df))
## 47.16.0 (2017-10-09)

* feature; added Macro provider mock and Macro ui component (issues closed: ed-2878,ed-2917) ([ea3aaad](https://bitbucket.org/atlassian/atlaskit/commits/ea3aaad))
## 47.15.1 (2017-10-09)

* bug fix; renderer should add appropriate "rel" attribute to prevent vulnerabilities in extern (issues closed: ed-2900) ([03907dd](https://bitbucket.org/atlassian/atlaskit/commits/03907dd))

## 47.15.0 (2017-10-06)

* feature; fixing renderer performance ([7e6c3cb](https://bitbucket.org/atlassian/atlaskit/commits/7e6c3cb))
## 47.14.1 (2017-10-06)

* bug fix; incorrect behaviour around mentions (issues closed: ed-1831) ([0df6c9d](https://bitbucket.org/atlassian/atlaskit/commits/0df6c9d))
* bug fix; incorrect behaviour around emojis (issues closed: ed-1831) ([a0f9ada](https://bitbucket.org/atlassian/atlaskit/commits/a0f9ada))
## 47.14.0 (2017-10-05)


* feature; action/decision related analytics (issues closed: fs-1290) ([38ade4e](https://bitbucket.org/atlassian/atlaskit/commits/38ade4e))
## 47.13.0 (2017-10-05)

* feature; action/decision related analytics (issues closed: fs-1290) ([38ade4e](https://bitbucket.org/atlassian/atlaskit/commits/38ade4e))
## 47.12.0 (2017-10-05)

* bug fix; build new JSON schema ([56b52fd](https://bitbucket.org/atlassian/atlaskit/commits/56b52fd))

* bug fix; sending a link with missing href causes exception in the renderer (issues closed: ed-2875) ([a58a1da](https://bitbucket.org/atlassian/atlaskit/commits/a58a1da))
* feature; applicationCard buttons support in schema ([478b2ab](https://bitbucket.org/atlassian/atlaskit/commits/478b2ab))
* bug fix; mention picker selection should not break when user enters space. (issues closed: #ed-2863) ([ad54cdc](https://bitbucket.org/atlassian/atlaskit/commits/ad54cdc))
## 47.11.0 (2017-10-04)

* feature; added inline-marco transformer (issues closed: ed-1811) ([fb3aba5](https://bitbucket.org/atlassian/atlaskit/commits/fb3aba5))

* bug fix; remove code block when pressing backspace in an empty one (issues closed: ed-1572) ([7cd1579](https://bitbucket.org/atlassian/atlaskit/commits/7cd1579))
## 47.10.0 (2017-10-03)

* feature; only clear formatting of marks, and heading nodes; don't modify block nodes (issues closed: ed-2775) ([97131bd](https://bitbucket.org/atlassian/atlaskit/commits/97131bd))
## 47.9.1 (2017-10-03)

* bug fix; refactored how inline-dialog handles max-width in order to better support scrollable ([20b62a6](https://bitbucket.org/atlassian/atlaskit/commits/20b62a6))
* bug fix; fix warning due to using component other than Button inside ButtonGroup (issues closed: #ed-2866) ([931a469](https://bitbucket.org/atlassian/atlaskit/commits/931a469))
## 47.9.0 (2017-10-03)

* bug fix; build for editor-core json-schema ([024b5c3](https://bitbucket.org/atlassian/atlaskit/commits/024b5c3))
* feature; ac:inline-comment-marker cxhtml transformer added to editor-core confluence-schema ([09de9e0](https://bitbucket.org/atlassian/atlaskit/commits/09de9e0))
## 47.8.1 (2017-09-28)

* bug fix; fix text color parse/encode ([64c9859](https://bitbucket.org/atlassian/atlaskit/commits/64c9859))
## 47.8.0 (2017-09-27)

* bug fix; debounce onChange in editor-core ([d2ac593](https://bitbucket.org/atlassian/atlaskit/commits/d2ac593))
* feature; add a userType attribute to the mention node (issues closed: ed-2826) ([24ed8de](https://bitbucket.org/atlassian/atlaskit/commits/24ed8de))
## 47.7.4 (2017-09-26)

* bug fix; use lowercased language names for code-block adf representation (issues closed: ed-2813) ([05ed3dc](https://bitbucket.org/atlassian/atlaskit/commits/05ed3dc))
## 47.7.3 (2017-09-26)

* bug fix; make ToolbarInsertBlock's mediaDisabled key less ambiguous (issues closed: ed-2865) ([1890835](https://bitbucket.org/atlassian/atlaskit/commits/1890835))
## 47.7.2 (2017-09-26)


* bug fix; fS-1330 disable tooltip when emoji picker is open (issues closed: fs-1330) ([cd875da](https://bitbucket.org/atlassian/atlaskit/commits/cd875da))
## 47.7.1 (2017-09-25)

* bug fix; don't show the media dropdown in the Insert Toolbar if no uploadContext is present (issues closed: ed-2865) ([b6d49d6](https://bitbucket.org/atlassian/atlaskit/commits/b6d49d6))
* bug fix; revert code-splitting from editor-core ([c0586d0](https://bitbucket.org/atlassian/atlaskit/commits/c0586d0))
## 47.7.0 (2017-09-25)

* bug fix; emoji TypeAhead doesn't go away after submitting a comment in BB (issues closed: ed-2633) ([3fc98cf](https://bitbucket.org/atlassian/atlaskit/commits/3fc98cf))
* bug fix; add editorView.destroy in mentions plugin ([cc8cc37](https://bitbucket.org/atlassian/atlaskit/commits/cc8cc37))
* bug fix; mention type-ahead does not disappear when user uses keyboard shortcut Shift+Enter (issues closed: ed-2761, hnw-2580) ([12952c7](https://bitbucket.org/atlassian/atlaskit/commits/12952c7))
* feature; display inline macro place holder as an image. ([c52fe97](https://bitbucket.org/atlassian/atlaskit/commits/c52fe97))
* bug fix; check if link is compatible with existing marks before adding link (issues closed: ed-2218) ([f8578c9](https://bitbucket.org/atlassian/atlaskit/commits/f8578c9))
* feature; add support for detecting mark-types in a selection ([f5ce040](https://bitbucket.org/atlassian/atlaskit/commits/f5ce040))
* bug fix; fix error where mark type groups were not being properly filtered out (issues closed: ed-2805) ([b3f2f5d](https://bitbucket.org/atlassian/atlaskit/commits/b3f2f5d))
* feature; update json-schema with inlineMacro node. ([ad90c0f](https://bitbucket.org/atlassian/atlaskit/commits/ad90c0f))
* feature; added inlineMacro node. ([99c6b38](https://bitbucket.org/atlassian/atlaskit/commits/99c6b38))
## 47.6.3 (2017-09-22)


* bug fix; triple backticks in middle of paragraph if followed by space or enter should create ([58c2754](https://bitbucket.org/atlassian/atlaskit/commits/58c2754))

## 47.6.2 (2017-09-22)

* bug fix; triple backticks in middle of paragraph if followed by space or enter should create ([58c2754](https://bitbucket.org/atlassian/atlaskit/commits/58c2754))

## 47.6.1 (2017-09-22)


* bug fix; added panel support to new editor architecture (issues closed: ed-2804) ([c56e5fd](https://bitbucket.org/atlassian/atlaskit/commits/c56e5fd))
## 47.6.0 (2017-09-22)

* feature; addes in occurrenceKey in link mark (issues closed: ed-2765) ([b4687a0](https://bitbucket.org/atlassian/atlaskit/commits/b4687a0))
* feature; addes in optional id and collection for link mark. These two properties will be ins (issues closed: ed-2750) ([c3ed647](https://bitbucket.org/atlassian/atlaskit/commits/c3ed647))
* feature; remove bottom toolbar from full-page editor (issues closed: ed-2783) ([cf7a7da](https://bitbucket.org/atlassian/atlaskit/commits/cf7a7da))
## 47.5.1 (2017-09-21)

* bug fix; editing a link results in malformed / wrong links (issues closed: ed-2749, hnw-3015) ([4c9f314](https://bitbucket.org/atlassian/atlaskit/commits/4c9f314))
* bug fix; trigger onChange only after content has actually changed (issues closed: ed-2841) ([3b77318](https://bitbucket.org/atlassian/atlaskit/commits/3b77318))
## 47.5.0 (2017-09-21)

* feature; upgrade to latest emoji support, with latest upload features (issues closed: fs-1395) ([a0a6f34](https://bitbucket.org/atlassian/atlaskit/commits/a0a6f34))
* bug fix; add support for deleted / non-existant users to profile cards (issues closed: hnw-3062, ed-2762) ([86b8848](https://bitbucket.org/atlassian/atlaskit/commits/86b8848))
## 47.4.1 (2017-09-21)

* bug fix; fix typescript validation error in test. ([a6f3d53](https://bitbucket.org/atlassian/atlaskit/commits/a6f3d53))
* bug fix; added editorView.destroy(); to plugin tests ([adfb751](https://bitbucket.org/atlassian/atlaskit/commits/adfb751))
* bug fix; add unmount to all ui tests (issues closed: ed-2836) ([621681a](https://bitbucket.org/atlassian/atlaskit/commits/621681a))


* bug fix; attempt 1 to fix the build ([3c5796f](https://bitbucket.org/atlassian/atlaskit/commits/3c5796f))
* bug fix; fix code splitted mediapicker in editor-core (issues closed: ed-2776) ([46b96c7](https://bitbucket.org/atlassian/atlaskit/commits/46b96c7))
* bug fix; code splitted mediapicker from editor-core (issues closed: ed-2776) ([310cfb9](https://bitbucket.org/atlassian/atlaskit/commits/310cfb9))
## 47.4.0 (2017-09-20)

* feature; bump media-card ([06caa58](https://bitbucket.org/atlassian/atlaskit/commits/06caa58))
* feature; bump media-card and media-filmstrip ([e3baf5b](https://bitbucket.org/atlassian/atlaskit/commits/e3baf5b))
## 47.3.1 (2017-09-20)

* bug fix; upgrading emoji toolbar button to use new popup component for select. (issues closed: #ed-1523) ([2741a7b](https://bitbucket.org/atlassian/atlaskit/commits/2741a7b))
## 47.3.0 (2017-09-19)

* bug fix; revert quick tooltip fix for emoji picker. (issues closed: fs-1330) ([a47a20d](https://bitbucket.org/atlassian/atlaskit/commits/a47a20d))

* feature; help dialog should show hints for only those nodes and marks supported by the schem (issues closed: #ed-2671) ([7181eac](https://bitbucket.org/atlassian/atlaskit/commits/7181eac))
* bug fix; code splitted avatar and logo (issues closed: ed-2776) ([1cad4c1](https://bitbucket.org/atlassian/atlaskit/commits/1cad4c1))
## 47.2.0 (2017-09-19)

* feature; revise text color palette to a reduced set (issues closed: ed-2679) ([9673a86](https://bitbucket.org/atlassian/atlaskit/commits/9673a86))
## 47.1.1 (2017-09-18)

* bug fix; update editor schema with json code block language (issues closed: ed-2756) ([211a8b6](https://bitbucket.org/atlassian/atlaskit/commits/211a8b6))
* bug fix; fix emoji rendering no longer passing down the providerFactory (issues closed: fs-1383) ([03110dd](https://bitbucket.org/atlassian/atlaskit/commits/03110dd))
* bug fix; quick fix for emoji picker location in editor-core. Quick fix to disable tooltip whe (issues closed: fs-1379 / fs-1330) ([6b80bf7](https://bitbucket.org/atlassian/atlaskit/commits/6b80bf7))
## 47.1.0 (2017-09-18)

* feature; add JSON as a supported language for code blocks (issues closed: ed-2767) ([b6debbf](https://bitbucket.org/atlassian/atlaskit/commits/b6debbf))
## 47.0.2 (2017-09-15)

* bug fix; entering 2 back ticks followed by character between should create a code mark. (issues closed: #ed-2418) ([c7a8e66](https://bitbucket.org/atlassian/atlaskit/commits/c7a8e66))
## 47.0.1 (2017-09-14)

* bug fix; cleanup ([9274a2a](https://bitbucket.org/atlassian/atlaskit/commits/9274a2a))
* bug fix; fixed parsing jira issue keys (issues closed: ed-1407) ([ff7ef80](https://bitbucket.org/atlassian/atlaskit/commits/ff7ef80))
## 47.0.0 (2017-09-13)


* breaking; UI Renderer now has a "stat" field which has information about rendering. This is a breaking change ([26fff38](https://bitbucket.org/atlassian/atlaskit/commits/26fff38))
* breaking; measure PM tree creating time and rendering time in the Renderer (issues closed: ed-2233) ([26fff38](https://bitbucket.org/atlassian/atlaskit/commits/26fff38))
* bug fix; mention broken when select all and delete content. (issues closed: #ed-2705) ([cd5e52d](https://bitbucket.org/atlassian/atlaskit/commits/cd5e52d))
* feature; adding plugin in new architecture for help dialog to add it in banana editor (issues closed: ed-2589) ([a63ec66](https://bitbucket.org/atlassian/atlaskit/commits/a63ec66))
* bug fix; import styles from the right package ([caf8e1e](https://bitbucket.org/atlassian/atlaskit/commits/caf8e1e))
* bug fix; regular text pastes as code (white-space: pre-wrap) (issues closed: ed-2627) ([252ef5b](https://bitbucket.org/atlassian/atlaskit/commits/252ef5b))
* bug fix; it should be possible to convert a single character to inline code. (issues closed: #ed-2646) ([0afa7af](https://bitbucket.org/atlassian/atlaskit/commits/0afa7af))
## 46.21.0 (2017-09-13)

* feature; return Atlassian Document from EditorActions.getValue (issues closed: ed-2755) ([711cd34](https://bitbucket.org/atlassian/atlaskit/commits/711cd34))
## 46.20.2 (2017-09-12)

* bug fix; upgrade task-decision. Breaking changes not relevant to editor. (issues closed: fs-1371) ([652a38e](https://bitbucket.org/atlassian/atlaskit/commits/652a38e))
## 46.20.1 (2017-09-12)

* bug fix; fixed jiraissue and unsupportedcontent nodes ([731120e](https://bitbucket.org/atlassian/atlaskit/commits/731120e))
## 46.20.0 (2017-09-12)




* feature; adding telepointers and avatars (issues closed: ed-2574, ed-2575) ([e8311c1](https://bitbucket.org/atlassian/atlaskit/commits/e8311c1))

## 46.19.2 (2017-09-11)

* bug fix; updated table floating controls ([b653ab2](https://bitbucket.org/atlassian/atlaskit/commits/b653ab2))
* bug fix; removed popup from tables (issues closed: ed-2486) ([65e34c6](https://bitbucket.org/atlassian/atlaskit/commits/65e34c6))
## 46.19.1 (2017-09-11)

* bug fix; upgrade @atlaskit/button and @atlaskit/button-group dependencies (issues closed: #ed-2658) ([36c2820](https://bitbucket.org/atlassian/atlaskit/commits/36c2820))
## 46.19.0 (2017-09-11)

* feature; add Chromeless appearance (issues closed: ed-2629) ([0466c4d](https://bitbucket.org/atlassian/atlaskit/commits/0466c4d))
## 46.18.0 (2017-09-11)

* bug fix; tslint fix ([39b2639](https://bitbucket.org/atlassian/atlaskit/commits/39b2639))
* feature; cardEventHanlder now support an optional second argument to accept list of IDs if t (issues closed: ed-1774) ([6ed2276](https://bitbucket.org/atlassian/atlaskit/commits/6ed2276))



* bug fix; fixed placeholder, transformer and Editor confluence storybook ([de73aef](https://bitbucket.org/atlassian/atlaskit/commits/de73aef))
* bug fix; fix tslint ([ef20c32](https://bitbucket.org/atlassian/atlaskit/commits/ef20c32))
* bug fix; fixed jiraissue nodeview ([ab9e750](https://bitbucket.org/atlassian/atlaskit/commits/ab9e750))
* bug fix; pasting list converts first list item to paragraph. (issues closed: #ed-2647) ([15bbaf7](https://bitbucket.org/atlassian/atlaskit/commits/15bbaf7))

* feature; added cxhtml transformer story ([2f18b50](https://bitbucket.org/atlassian/atlaskit/commits/2f18b50))
* feature; change Addons api a little bit to allow composition (issues closed: ed-2680) ([6aee0b1](https://bitbucket.org/atlassian/atlaskit/commits/6aee0b1))
* feature; added analytics tracking for unsupported content ([edef276](https://bitbucket.org/atlassian/atlaskit/commits/edef276))


* feature; added missing cq features to editor-core (issues closed: ed-2635) ([600b257](https://bitbucket.org/atlassian/atlaskit/commits/600b257))
## 46.17.2 (2017-09-08)

* bug fix; remove ourdated fallback attr, use text instead ([bffe13b](https://bitbucket.org/atlassian/atlaskit/commits/bffe13b))
* bug fix; special characters like brackets should be escaped in image attributes. (issues closed: #ed-1643) ([30d9d38](https://bitbucket.org/atlassian/atlaskit/commits/30d9d38))
* bug fix; set DAC renderer maxHeight, which prevents double scroll (issues closed: ed-2530) ([721d231](https://bitbucket.org/atlassian/atlaskit/commits/721d231))
## 46.17.1 (2017-09-07)

* bug fix; return Card placeholders from "renderLoadingCard" if CardView is not loaded yet ([813b527](https://bitbucket.org/atlassian/atlaskit/commits/813b527))
* bug fix; make TS happy ([e8b27c3](https://bitbucket.org/atlassian/atlaskit/commits/e8b27c3))
* bug fix; render placeholder Card instead of null in MediaComponent ([1b73785](https://bitbucket.org/atlassian/atlaskit/commits/1b73785))
## 46.17.0 (2017-09-06)


* bug fix; fix typescript errors ([b5c597a](https://bitbucket.org/atlassian/atlaskit/commits/b5c597a))
* feature; add toolbar button support for actions/decisions (issues closed: fs-1342) ([faddb0b](https://bitbucket.org/atlassian/atlaskit/commits/faddb0b))
## 46.16.0 (2017-09-06)

* feature; add disable linkCreateContext in example editor (issues closed: ed-2670) ([033e67d](https://bitbucket.org/atlassian/atlaskit/commits/033e67d))
* bug fix; fix filmstrip arrow problem in renderer when not using code splitting (issues closed: ed-2667) ([c9cb09d](https://bitbucket.org/atlassian/atlaskit/commits/c9cb09d))
## 46.15.0 (2017-09-06)

* bug fix; disable media link cards in actions/decisions nodes (issues closed: fs-1344) ([873e476](https://bitbucket.org/atlassian/atlaskit/commits/873e476))
* feature; colour text support in renderer (issues closed: ed-2657) ([d1608c9](https://bitbucket.org/atlassian/atlaskit/commits/d1608c9))
## 46.14.1 (2017-09-05)

* bug fix; we need to make sure the component is not unmounted before we use this.setState in p (issues closed: ed-2448) ([b3301ea](https://bitbucket.org/atlassian/atlaskit/commits/b3301ea))

* bug fix; tolerate empty actions/decisions, just don't render them. (issues closed: fs-1266) ([29a82db](https://bitbucket.org/atlassian/atlaskit/commits/29a82db))
* bug fix; eNTER on empty action/decision will not submit message, but remove action/decision (issues closed: ed-2447 / fs-1265 / fs-1329) ([9f77faa](https://bitbucket.org/atlassian/atlaskit/commits/9f77faa))
* bug fix; disabling hyperlink keymap Cmd-K for message editor. (issues closed: #ed-2567) ([ddf7769](https://bitbucket.org/atlassian/atlaskit/commits/ddf7769))
## 46.14.0 (2017-09-05)

* feature; add showSpinner prop to Editor ([ac14e79](https://bitbucket.org/atlassian/atlaskit/commits/ac14e79))
* feature; add defaultValue property for the "new arch" editor (issues closed: ed-2579) ([dc537cc](https://bitbucket.org/atlassian/atlaskit/commits/dc537cc))
* feature; add appendText command to EditorActions (issues closed: ed-2579) ([417f348](https://bitbucket.org/atlassian/atlaskit/commits/417f348))
* feature; add waitForMediaUpload flag for products that want to finalize media on their own (issues closed: ed-2579) ([7ee8106](https://bitbucket.org/atlassian/atlaskit/commits/7ee8106))
* feature; support presence provider ([4926ae0](https://bitbucket.org/atlassian/atlaskit/commits/4926ae0))
* bug fix; shouldFocus must place cursor to the end of the document (issues closed: ed-2579) ([e3f7187](https://bitbucket.org/atlassian/atlaskit/commits/e3f7187))
* feature; add maxHeight property to the 'new architecture' editor (issues closed: ed-2579) ([0cad06d](https://bitbucket.org/atlassian/atlaskit/commits/0cad06d))
* feature; add feature preset for Message editor (issues closed: ed-2579) ([69c5ee1](https://bitbucket.org/atlassian/atlaskit/commits/69c5ee1))
## 46.13.3 (2017-09-04)

* bug fix; fix filmstrip arrows don't show up in editor or renderer (issues closed: ed-2577) ([43291f6](https://bitbucket.org/atlassian/atlaskit/commits/43291f6))
## 46.13.2 (2017-09-01)

* bug fix; pass eventDispatcher to PluginSlot (issues closed: ed-2634) ([ee59df4](https://bitbucket.org/atlassian/atlaskit/commits/ee59df4))
* bug fix; fix editor-core storybook for real (issues closed: ed-2614) ([704a76e](https://bitbucket.org/atlassian/atlaskit/commits/704a76e))
* bug fix; do not show frequent links in the recently viewed link dialog ([5a175e9](https://bitbucket.org/atlassian/atlaskit/commits/5a175e9))
* bug fix; fire onChange only when docChanged = true (issues closed: ed-2421) ([5605a74](https://bitbucket.org/atlassian/atlaskit/commits/5605a74))
## 46.13.1 (2017-09-01)

* bug fix; support activity provider in hyperlinkedit in new editor architecture ([d45ee4e](https://bitbucket.org/atlassian/atlaskit/commits/d45ee4e))
## 46.13.0 (2017-09-01)

* feature; pasting a single word or single line of code should create an inline code block. ([e64a721](https://bitbucket.org/atlassian/atlaskit/commits/e64a721))
* bug fix; adjust behaviour of backspace into a decision/item list (issues closed: fs-1264) ([5db2517](https://bitbucket.org/atlassian/atlaskit/commits/5db2517))
## 46.12.0 (2017-08-31)

* bug fix; update min-height of single link card. ([bb7e71a](https://bitbucket.org/atlassian/atlaskit/commits/bb7e71a))
* bug fix; fix storybook for editor-core (issues closed: ed-2614) ([4bae650](https://bitbucket.org/atlassian/atlaskit/commits/4bae650))

* bug fix; making sure adding links with invalid href doesn't throw an error (issues closed: ed-2568) ([d44226f](https://bitbucket.org/atlassian/atlaskit/commits/d44226f))
* bug fix; fixed the bug that no text format after space. ([8aa1bfe](https://bitbucket.org/atlassian/atlaskit/commits/8aa1bfe))
* feature; dAC story with renderer (issues closed: ed-2530) ([005bdba](https://bitbucket.org/atlassian/atlaskit/commits/005bdba))
* feature; render single link card with square appearance ([8197e31](https://bitbucket.org/atlassian/atlaskit/commits/8197e31))
* feature; add title/user in applicationCard (issues closed: ed-2532) ([a1c5790](https://bitbucket.org/atlassian/atlaskit/commits/a1c5790))


* feature; added Confluence transformer (issues closed: ed-1679) ([b9d48b3](https://bitbucket.org/atlassian/atlaskit/commits/b9d48b3))
* bug fix; pasting plain text in code block should not create a paragraph ([e7b133e](https://bitbucket.org/atlassian/atlaskit/commits/e7b133e))
* bug fix; should not autoformat __ or _ in mid words. ([49a4df4](https://bitbucket.org/atlassian/atlaskit/commits/49a4df4))
* bug fix; fix for issue mention mark not removed even after whole text of mention is removed. ([ed7b58d](https://bitbucket.org/atlassian/atlaskit/commits/ed7b58d))
* bug fix; should not convert "\`some_variables_" to em ([2eaf1f6](https://bitbucket.org/atlassian/atlaskit/commits/2eaf1f6))
* bug fix; ignore markdown if have a backtick in the front. ([0f921b1](https://bitbucket.org/atlassian/atlaskit/commits/0f921b1))
## 46.11.1 (2017-08-31)

* bug fix; removed relative links and added tests ([9c07ea7](https://bitbucket.org/atlassian/atlaskit/commits/9c07ea7))

* bug fix; remove auto formatting of relative links (issues closed: ed-2582) ([a36f9dc](https://bitbucket.org/atlassian/atlaskit/commits/a36f9dc))
## 46.11.0 (2017-08-30)


* feature; make ASCII conversion of emoji count as usage for showing frequent used emoji (issues closed: fs-1094) ([86a0be1](https://bitbucket.org/atlassian/atlaskit/commits/86a0be1))
## 46.10.0 (2017-08-30)



* bug fix; workaround double events for the attached and detached upload button. (issues closed: fs-1322) ([b3e19c3](https://bitbucket.org/atlassian/atlaskit/commits/b3e19c3))


* feature; collab-plugin ([2c896c7](https://bitbucket.org/atlassian/atlaskit/commits/2c896c7))
## 46.9.0 (2017-08-30)

* feature; adding configuration to not allow deletion of table header. ([c5e1cc7](https://bitbucket.org/atlassian/atlaskit/commits/c5e1cc7))
## 46.8.2 (2017-08-30)

* bug fix; change blockQuote to blockquote in JSON Schema (issues closed: ed-2594) ([b32cfe2](https://bitbucket.org/atlassian/atlaskit/commits/b32cfe2))
## 46.8.1 (2017-08-30)

* bug fix; prevent media insertion for task/decisions (issues closed: fs-1240) ([48dcf05](https://bitbucket.org/atlassian/atlaskit/commits/48dcf05))

* bug fix; added async preloading of media-card chunk ([7a19c6d](https://bitbucket.org/atlassian/atlaskit/commits/7a19c6d))
* bug fix; split media-card with require.ensure ([1159f23](https://bitbucket.org/atlassian/atlaskit/commits/1159f23))
* bug fix; split profile card with require.ensure (issues closed: ed-2581) ([6901949](https://bitbucket.org/atlassian/atlaskit/commits/6901949))
## 46.8.0 (2017-08-29)

* feature; export ToolbarEmojiPicker for consumption by editor-hiphcat (issues closed: fs-1320) ([0226a5b](https://bitbucket.org/atlassian/atlaskit/commits/0226a5b))
## 46.7.0 (2017-08-29)

* feature; exported AtlassianEmojiMigrationResource from editor-core ([e7e0eab](https://bitbucket.org/atlassian/atlaskit/commits/e7e0eab))






## 46.6.0 (2017-08-28)

* bug fix; fixed missing prop in tests ([0311be8](https://bitbucket.org/atlassian/atlaskit/commits/0311be8))

* feature; aligned emoji picker to right of editor ([98206e8](https://bitbucket.org/atlassian/atlaskit/commits/98206e8))
* feature; added ToolbarEmojiPicker to message editor (issues closed: fs-1092) ([ab2c080](https://bitbucket.org/atlassian/atlaskit/commits/ab2c080))
* feature; adding support for tables in bitbucket markdown serializer. ([2e0353c](https://bitbucket.org/atlassian/atlaskit/commits/2e0353c))
* feature; stricter JSON Schema (issues closed: ed-2555) ([39c99a2](https://bitbucket.org/atlassian/atlaskit/commits/39c99a2))
## 46.5.0 (2017-08-25)

* bug fix; upgrade mediapicker to 7.0.3 (issues closed: ed-2556) ([2c36a86](https://bitbucket.org/atlassian/atlaskit/commits/2c36a86))
* feature; adding support for lists in editor-hipchat schema ([c695497](https://bitbucket.org/atlassian/atlaskit/commits/c695497))
## 46.4.3 (2017-08-24)

* bug fix; fix creation of unwanted link cards when going in/out of edit link box (issues closed: ed-2404) ([eae0a3a](https://bitbucket.org/atlassian/atlaskit/commits/eae0a3a))
## 46.4.2 (2017-08-24)

* bug fix; update the storybook for editor-core rnderer ([ce2ac94](https://bitbucket.org/atlassian/atlaskit/commits/ce2ac94))
* bug fix; handle onClick events for application cards - open the link ([a70b447](https://bitbucket.org/atlassian/atlaskit/commits/a70b447))
## 46.4.1 (2017-08-24)

* bug fix; group mentions and "self" mentions are not rendered in blue anymore (issues closed: ed-2553) ([b8aab4d](https://bitbucket.org/atlassian/atlaskit/commits/b8aab4d))
## 46.4.0 (2017-08-24)

* feature; application Card to support context (issues closed: ed-2532) ([eb57585](https://bitbucket.org/atlassian/atlaskit/commits/eb57585))
## 46.3.0 (2017-08-24)

* bug fix; merged master ([4e39b8c](https://bitbucket.org/atlassian/atlaskit/commits/4e39b8c))



* feature; added editor actions to the dropdown ([8d86399](https://bitbucket.org/atlassian/atlaskit/commits/8d86399))
* feature; added dot menu (issues closed: ed-2484) ([999e4f2](https://bitbucket.org/atlassian/atlaskit/commits/999e4f2))
* feature; added secondaryToolbarComponents to the Message Editor (issues closed: ed-2484) ([7930907](https://bitbucket.org/atlassian/atlaskit/commits/7930907))
## 46.2.4 (2017-08-23)

* bug fix; tolerate missing attributes for task/decision nodes. (issues closed: fs-1303) ([deab934](https://bitbucket.org/atlassian/atlaskit/commits/deab934))
## 46.2.3 (2017-08-23)


* bug fix; fixed tabbing when the whole row/col is selected ([33a123e](https://bitbucket.org/atlassian/atlaskit/commits/33a123e))

* bug fix; fixed tabbing in tables ([79956ea](https://bitbucket.org/atlassian/atlaskit/commits/79956ea))
## 46.2.2 (2017-08-23)

* bug fix; fix broken CSS in recent search in link dialog ([f99a729](https://bitbucket.org/atlassian/atlaskit/commits/f99a729))
## 46.2.1 (2017-08-23)

* bug fix; applicationCard with wrong attribute makes Banana unusable (Media) (issues closed: ed-2531) ([3693ba0](https://bitbucket.org/atlassian/atlaskit/commits/3693ba0))

## 46.2.0 (2017-08-23)

* feature; add FullPage apppearance for Editor (issues closed: ed-2337) ([bcd93ea](https://bitbucket.org/atlassian/atlaskit/commits/bcd93ea))
## 46.1.1 (2017-08-22)

* bug fix; multiple react warnings for UI components when pluginState is changed before compone (issues closed: ed-2535) ([1f77a58](https://bitbucket.org/atlassian/atlaskit/commits/1f77a58))
## 46.1.0 (2017-08-22)

* bug fix; ensure getValidNode does not mutate the original node. (issues closed: fs-1295) ([0df91e2](https://bitbucket.org/atlassian/atlaskit/commits/0df91e2))

* feature; emoticons now auto-convert after an opening rounded bracket (issues closed: fs-1247) ([3d8e28c](https://bitbucket.org/atlassian/atlaskit/commits/3d8e28c))
* feature; emoji and mention typeaheads now trigger after a round bracket (issues closed: fs-1247) ([91496d0](https://bitbucket.org/atlassian/atlaskit/commits/91496d0))
* bug fix; style fixes in panel floating toolbar. ([a85aaad](https://bitbucket.org/atlassian/atlaskit/commits/a85aaad))
## 46.0.0 (2017-08-22)

* feature; bump media packages ([f7f6704](https://bitbucket.org/atlassian/atlaskit/commits/f7f6704))
* breaking; bumped media-core from v18 to v19 ([fcb8100](https://bitbucket.org/atlassian/atlaskit/commits/fcb8100))
* breaking; bump media packages ([fcb8100](https://bitbucket.org/atlassian/atlaskit/commits/fcb8100))
## 45.18.5 (2017-08-21)

* bug fix; bump layer to align with transitive dependencies ([e0041c3](https://bitbucket.org/atlassian/atlaskit/commits/e0041c3))
## 45.18.4 (2017-08-21)

* bug fix; bump emoji to align the mediapicker transitive dependency ([1c0c37f](https://bitbucket.org/atlassian/atlaskit/commits/1c0c37f))
## 45.18.3 (2017-08-21)

* bug fix; fix styles of hyperlink and and language picker floating toolbars. ([0dd88f0](https://bitbucket.org/atlassian/atlaskit/commits/0dd88f0))
* bug fix; text without a prefixing www should be linkified. ([11fbfee](https://bitbucket.org/atlassian/atlaskit/commits/11fbfee))
## 45.18.2 (2017-08-21)

* bug fix; fix broken storybooks for editor-core ([605689b](https://bitbucket.org/atlassian/atlaskit/commits/605689b))
* bug fix; typo: componentWillUmount -> componentWillUnmount ([dfe28fd](https://bitbucket.org/atlassian/atlaskit/commits/dfe28fd))
* bug fix; fix content jump in renderer (issues closed: ed-2298) ([c062a13](https://bitbucket.org/atlassian/atlaskit/commits/c062a13))
## 45.18.1 (2017-08-18)

* bug fix; import media components from plugins ([6a06355](https://bitbucket.org/atlassian/atlaskit/commits/6a06355))
## 45.18.0 (2017-08-18)

* feature; bumped mediapicker to the latest in editor-core ([ef771f8](https://bitbucket.org/atlassian/atlaskit/commits/ef771f8))
## 45.17.0 (2017-08-18)

* feature; latest task/decision support (issues closed: fs-1284) ([e7bb445](https://bitbucket.org/atlassian/atlaskit/commits/e7bb445))
## 45.16.0 (2017-08-17)

* feature; upgrade for latest task and decisions support. (issues closed: fs-1274) ([f12d384](https://bitbucket.org/atlassian/atlaskit/commits/f12d384))
* bug fix; fix ChromeExpanded height/maxHeight behaviour ([9aa5219](https://bitbucket.org/atlassian/atlaskit/commits/9aa5219))




* bug fix; render height style if props.height is set ([3d30885](https://bitbucket.org/atlassian/atlaskit/commits/3d30885))

* feature; add height prop to ChromeExpanded to have a fixed-height editor ([a5e0238](https://bitbucket.org/atlassian/atlaskit/commits/a5e0238))
## 45.15.0 (2017-08-17)



* feature; show recently viewed in the insert link dialog. ([e11e348](https://bitbucket.org/atlassian/atlaskit/commits/e11e348))
## 45.14.0 (2017-08-17)


* feature; show recently viewed in the insert link dialog. ([e11e348](https://bitbucket.org/atlassian/atlaskit/commits/e11e348))
## 45.13.1 (2017-08-17)

* bug fix; analytics' events for media not being sent. (issues closed: ed-2422) ([dec1fb4](https://bitbucket.org/atlassian/atlaskit/commits/dec1fb4))
## 45.13.0 (2017-08-16)

* bug fix; style fixes in panel toolbar. ([a51ffa6](https://bitbucket.org/atlassian/atlaskit/commits/a51ffa6))


* feature; allowed block left, right, center for single image. ([b6f10f0](https://bitbucket.org/atlassian/atlaskit/commits/b6f10f0))
* feature; allowed aligned right. ([dee2c5e](https://bitbucket.org/atlassian/atlaskit/commits/dee2c5e))
* bug fix; fixed bug that cannot copy paste media group. ([bd03f9d](https://bitbucket.org/atlassian/atlaskit/commits/bd03f9d))
* feature; clear left when image is align left. ([09481f6](https://bitbucket.org/atlassian/atlaskit/commits/09481f6))
* feature; allowed single image displayed inline and aligned left ([6f1eec5](https://bitbucket.org/atlassian/atlaskit/commits/6f1eec5))
* feature; added single image node. ([a3b00c4](https://bitbucket.org/atlassian/atlaskit/commits/a3b00c4))
## 45.12.0 (2017-08-16)

* feature; add EditorContext and WithEditorActions components (issues closed: ed-2443) ([b718487](https://bitbucket.org/atlassian/atlaskit/commits/b718487))
## 45.11.2 (2017-08-15)

* bug fix; fix cursor position when two code nodes separated by one non-code character ([7d165c3](https://bitbucket.org/atlassian/atlaskit/commits/7d165c3))
* bug fix; added more tests for inline code, updated hascode util ([2d2c2e7](https://bitbucket.org/atlassian/atlaskit/commits/2d2c2e7))
* bug fix; fixed cursor position inside code when code has only 1 character ([5f0a0d8](https://bitbucket.org/atlassian/atlaskit/commits/5f0a0d8))
* bug fix; fix stuck issue in chrome when jumping with opt key ([5ec6138](https://bitbucket.org/atlassian/atlaskit/commits/5ec6138))
* bug fix; refactored text-formatting commands ([5d51ccc](https://bitbucket.org/atlassian/atlaskit/commits/5d51ccc))
* bug fix; cleanup ([eed92d6](https://bitbucket.org/atlassian/atlaskit/commits/eed92d6))
* bug fix; fix cursor wrapper problem in Firefox ([3198ff8](https://bitbucket.org/atlassian/atlaskit/commits/3198ff8))
* bug fix; cleanup ([d30ca4c](https://bitbucket.org/atlassian/atlaskit/commits/d30ca4c))
* bug fix; removed unnecessary hack for text formatting ([760ef9e](https://bitbucket.org/atlassian/atlaskit/commits/760ef9e))

* bug fix; fixed cursor position with inline code (issues closed: ed-2084) ([a495ae9](https://bitbucket.org/atlassian/atlaskit/commits/a495ae9))
## 45.11.1 (2017-08-15)

* bug fix; fix ts/js build problem ([62855ff](https://bitbucket.org/atlassian/atlaskit/commits/62855ff))
## 45.11.0 (2017-08-14)

* feature; upgrade editor to support latest task-decisions. (issues closed: fs-1263) ([6060103](https://bitbucket.org/atlassian/atlaskit/commits/6060103))
## 45.10.1 (2017-08-14)

* bug fix; fix parsing of mentions in BB renderer. (issues closed: ed-2465) ([3fb5764](https://bitbucket.org/atlassian/atlaskit/commits/3fb5764))
* bug fix; workaround for twitter/instagram link creation bug (issues closed: ed-2464) ([ad09f63](https://bitbucket.org/atlassian/atlaskit/commits/ad09f63))
## 45.10.0 (2017-08-14)

* feature; adding help dialog to the editor. ([bf09d40](https://bitbucket.org/atlassian/atlaskit/commits/bf09d40))
* feature; adding more markdown auto-formatting rules for bold, italic, lists, horizontal rule ([76c1caa](https://bitbucket.org/atlassian/atlaskit/commits/76c1caa))
## 45.9.2 (2017-08-14)

* bug fix; renderer portal is always positioned to the bottom right (issues closed: ed-2461) ([7afd755](https://bitbucket.org/atlassian/atlaskit/commits/7afd755))

## 45.9.1 (2017-08-13)

* bug fix; fix storybooks build ([af0046b](https://bitbucket.org/atlassian/atlaskit/commits/af0046b))





## 45.9.0 (2017-08-11)

* feature; fix plaintext link detection, enable markdown and code detection on paste (issues closed: ed-2442) ([f6155e8](https://bitbucket.org/atlassian/atlaskit/commits/f6155e8))
## 45.8.1 (2017-08-11)

* bug fix; aligning keyboard shortcuts for blocktypes to gmail. ([403c1ca](https://bitbucket.org/atlassian/atlaskit/commits/403c1ca))
## 45.8.0 (2017-08-11)

* bug fix; Merged in fix/ED-2392-ignore-ts-files-package-json (pull request #3794) (issues closed: ed-2392) ([681d5fa](https://bitbucket.org/atlassian/atlaskit/commits/681d5fa))
* feature; add EditorActions object (issues closed: ed-2413) ([de98577](https://bitbucket.org/atlassian/atlaskit/commits/de98577))
## 45.7.0 (2017-08-10)


* feature; adding placeholders for tasks/decisions ([4d4c5eb](https://bitbucket.org/atlassian/atlaskit/commits/4d4c5eb))
* bug fix; build Markdown to ProseMirror mapping based on Schema ([2d686af](https://bitbucket.org/atlassian/atlaskit/commits/2d686af))
## 45.6.1 (2017-08-10)

* bug fix; npmignore fails to work (issues closed: ed-2392) ([beb1872](https://bitbucket.org/atlassian/atlaskit/commits/beb1872))
## 45.6.0 (2017-08-10)

* feature; new prop for renderer: portal (HTMLElement). Use it for popups (issues closed: ed-1867) ([2d1bf87](https://bitbucket.org/atlassian/atlaskit/commits/2d1bf87))
* bug fix; autoformatting rules for inline styles should not work is first character is a blank ([81aa879](https://bitbucket.org/atlassian/atlaskit/commits/81aa879))
## 45.5.0 (2017-08-09)



* bug fix; fix prop types ([406114a](https://bitbucket.org/atlassian/atlaskit/commits/406114a))
* feature; adding usupport to fetch initial state and toggle state ([416ce4e](https://bitbucket.org/atlassian/atlaskit/commits/416ce4e))
* feature; add loading state for link card (issues closed: ed-2383) ([a7ed3e0](https://bitbucket.org/atlassian/atlaskit/commits/a7ed3e0))
## 45.4.1 (2017-08-09)

* bug fix; use profilecard definitions (issues closed: ed-2266) ([bdf93dd](https://bitbucket.org/atlassian/atlaskit/commits/bdf93dd))
* bug fix; codeBlock content text chunks should not have a new line between them (issues closed: ed-2399) ([c1ccdac](https://bitbucket.org/atlassian/atlaskit/commits/c1ccdac))
## 45.4.0 (2017-08-08)


* bug fix; fix cursor position when deleting cols/rows (issues closed: ed-2406) ([30f98d7](https://bitbucket.org/atlassian/atlaskit/commits/30f98d7))

* feature; move Markdown parser and serialiser into editor-core transformers (issues closed: ed-2402) ([8eba5d9](https://bitbucket.org/atlassian/atlaskit/commits/8eba5d9))
## 45.3.0 (2017-08-08)


* bug fix; render profile cards in portal (issues closed: ed-2386) ([f7f6834](https://bitbucket.org/atlassian/atlaskit/commits/f7f6834))
* feature; added encoder/parser for tables in JIRA (issues closed: ed-2396) ([c2e3d1c](https://bitbucket.org/atlassian/atlaskit/commits/c2e3d1c))
## 45.2.4 (2017-08-07)

* bug fix; bumped the version of media-card ([4bbfac7](https://bitbucket.org/atlassian/atlaskit/commits/4bbfac7))
## 45.2.3 (2017-08-07)


* bug fix; use text rendering requirements for hipchat notifications (issues closed: ed-2392) ([abb5d28](https://bitbucket.org/atlassian/atlaskit/commits/abb5d28))
## 45.2.2 (2017-08-07)

* bug fix; udpated isIsolating util for tables ([e7d569c](https://bitbucket.org/atlassian/atlaskit/commits/e7d569c))
* bug fix; split backspace command into moveCursorBackward and emptyCells ([e93141e](https://bitbucket.org/atlassian/atlaskit/commits/e93141e))
* bug fix; fix backspace when cursor is after the table (issues closed: ed-2003) ([be160a0](https://bitbucket.org/atlassian/atlaskit/commits/be160a0))
## 45.2.1 (2017-08-07)

* bug fix; fix linkify plain text links ([5a653cf](https://bitbucket.org/atlassian/atlaskit/commits/5a653cf))
## 45.2.0 (2017-08-04)

* bug fix; fix tslint ([04a6c4f](https://bitbucket.org/atlassian/atlaskit/commits/04a6c4f))

* feature; added analytics events for tables (issues closed: ed-1885) ([80dd2cb](https://bitbucket.org/atlassian/atlaskit/commits/80dd2cb))
## 45.1.2 (2017-08-04)

* bug fix; bump media-filmstrip in editor-core (issues closed: ed-2052) ([f33b88e](https://bitbucket.org/atlassian/atlaskit/commits/f33b88e))
* bug fix; media nodes parsing should not throw error when schema is media-less (issues closed: ed-2394) ([4a0dfe0](https://bitbucket.org/atlassian/atlaskit/commits/4a0dfe0))

* bug fix; fix remove media on upload failure (issues closed: ed-2192) ([d5da5a0](https://bitbucket.org/atlassian/atlaskit/commits/d5da5a0))
* bug fix; upload progress and temporary thumbnail not showing (issues closed: ed-2283) ([5c1b9b6](https://bitbucket.org/atlassian/atlaskit/commits/5c1b9b6))
## 45.1.1 (2017-08-03)

* bug fix; export es5 renderer ([2db940d](https://bitbucket.org/atlassian/atlaskit/commits/2db940d))
## 45.1.0 (2017-08-03)


* feature; support document filtering. Include implementation for task decision content. (issues closed: fs-1223) ([8afca9c](https://bitbucket.org/atlassian/atlaskit/commits/8afca9c))
## 45.0.1 (2017-08-03)

* bug fix; fix browserstack tests import not transpiled editor-core ([3e729c2](https://bitbucket.org/atlassian/atlaskit/commits/3e729c2))
* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))
## 45.0.0 (2017-08-02)

* breaking; A lot of previously supported block nesting inside lists and blockquote will not work now. ([63ca14b](https://bitbucket.org/atlassian/atlaskit/commits/63ca14b))
* breaking; restricting block nesting for panel, blockquote and list. ([63ca14b](https://bitbucket.org/atlassian/atlaskit/commits/63ca14b))
## 44.9.1 (2017-08-02)

* bug fix; fix broken storybook in AUI (issues closed: ed-2138) ([6ce1692](https://bitbucket.org/atlassian/atlaskit/commits/6ce1692))


* bug fix; updated json schema with table nodes ([bf5b3ff](https://bitbucket.org/atlassian/atlaskit/commits/bf5b3ff))

## 44.9.0 (2017-08-02)


* feature; updated media-filmstrip for major bump ([0d36592](https://bitbucket.org/atlassian/atlaskit/commits/0d36592))
## 44.8.0 (2017-08-02)

* feature; updated media-filmstrip for major bump ([0d36592](https://bitbucket.org/atlassian/atlaskit/commits/0d36592))
## 44.7.0 (2017-08-02)

* bug fix; fix message editor overflow issues with media film strip (issues closed: ed-2338) ([6cdbf74](https://bitbucket.org/atlassian/atlaskit/commits/6cdbf74))
* feature; attach secondary toolbar buttons to the bottom of the Message Editor (issues closed: ed-2357) ([f97db1c](https://bitbucket.org/atlassian/atlaskit/commits/f97db1c))
## 44.6.0 (2017-08-01)

* bug fix; keep focus in node views after transactions ([dd82b25](https://bitbucket.org/atlassian/atlaskit/commits/dd82b25))



* bug fix; mediaGroup should only allow media as children (issues closed: ed-2343) ([d9a8d11](https://bitbucket.org/atlassian/atlaskit/commits/d9a8d11))
* feature; add markdown and plaintext code copy-paste (issues closed: ed-672, ed-2316, ed-2091) ([bdeb76c](https://bitbucket.org/atlassian/atlaskit/commits/bdeb76c))
## 44.5.0 (2017-08-01)



* bug fix; mediaGroup should only allow media as children (issues closed: ed-2343) ([d9a8d11](https://bitbucket.org/atlassian/atlaskit/commits/d9a8d11))
* feature; add markdown and plaintext code copy-paste (issues closed: ed-672, ed-2316, ed-2091) ([bdeb76c](https://bitbucket.org/atlassian/atlaskit/commits/bdeb76c))
## 44.4.0 (2017-08-01)

* bug fix; allow empty fallback text in appCards in renderer (issues closed: ed-2364) ([f88292b](https://bitbucket.org/atlassian/atlaskit/commits/f88292b))

* bug fix; removed modified inline code nodeSpec (issues closed: ed-2271) ([ee8b40c](https://bitbucket.org/atlassian/atlaskit/commits/ee8b40c))

* feature; adds support for tasks in renderer ([817c910](https://bitbucket.org/atlassian/atlaskit/commits/817c910))

## 44.3.0 (2017-08-01)

* bug fix; update encoder to add collection in generated HTML if available (issues closed: ed-2370) ([493b778](https://bitbucket.org/atlassian/atlaskit/commits/493b778))
* bug fix; added tab direction constants, added creating a new row on shift-tab ([3f09382](https://bitbucket.org/atlassian/atlaskit/commits/3f09382))
* bug fix; fix jira-encoder generating wrong HTML for uploaded non-image files (issues closed: ed-2263) ([d9b774e](https://bitbucket.org/atlassian/atlaskit/commits/d9b774e))

* feature; allow creating tasks in the editor (issues closed: fs-1147) ([4122828](https://bitbucket.org/atlassian/atlaskit/commits/4122828))
* bug fix; updated cursor posiiton and refactored commands ([4cde4b3](https://bitbucket.org/atlassian/atlaskit/commits/4cde4b3))

* bug fix; empty cells on Backspace when the whole row/col/table is selected ([c7fec5c](https://bitbucket.org/atlassian/atlaskit/commits/c7fec5c))
* bug fix; show floating toolbar when the whole row/col/table is selected (issues closed: ed-2342) ([f5830f2](https://bitbucket.org/atlassian/atlaskit/commits/f5830f2))
## 44.2.0 (2017-07-31)

* feature; add max content size plugin (issues closed: ed-2077) ([c917a11](https://bitbucket.org/atlassian/atlaskit/commits/c917a11))
## 44.1.1 (2017-07-31)

* bug fix; export renderer as es2015 package part ([1af0597](https://bitbucket.org/atlassian/atlaskit/commits/1af0597))
## 44.1.0 (2017-07-31)

* feature; include localId on decisionList (issues closed: fs-1225) ([ff7ffbc](https://bitbucket.org/atlassian/atlaskit/commits/ff7ffbc))


* feature; adding new auto-complete for code block triple backticks followed by space. ([1f51ad1](https://bitbucket.org/atlassian/atlaskit/commits/1f51ad1))


## 44.0.2 (2017-07-28)

## 44.0.1 (2017-07-28)


* fix; import media core from node_modules instead of direct path ([8c5e737](https://bitbucket.org/atlassian/atlaskit/commits/8c5e737))
* fix; media group with single item exception. ([78aa7d3](https://bitbucket.org/atlassian/atlaskit/commits/78aa7d3))

## 44.0.0 (2017-07-28)


* fix; modifying URL doesn't change destination href ([add3b17](https://bitbucket.org/atlassian/atlaskit/commits/add3b17))
* fix; sizing of file cards in Editor nodeview. ([1c7f281](https://bitbucket.org/atlassian/atlaskit/commits/1c7f281))

## 43.2.0 (2017-07-27)


* fix; disable advance menu for the first table release ([51447df](https://bitbucket.org/atlassian/atlaskit/commits/51447df))
* fix; renamed arrowup and arrowdown back to moveup and movedown. ([3c28847](https://bitbucket.org/atlassian/atlaskit/commits/3c28847))
* fix; renderer should not break UI when collection is an empty string ([445e261](https://bitbucket.org/atlassian/atlaskit/commits/445e261))
* fix; update the profilecard in the editor-core ([ddf9600](https://bitbucket.org/atlassian/atlaskit/commits/ddf9600))


* feature; add occurrenceKey in media node ([7fe150a](https://bitbucket.org/atlassian/atlaskit/commits/7fe150a))

## 43.1.1 (2017-07-27)


* fix; appearance of media links in strip in the editor. ([3de66f4](https://bitbucket.org/atlassian/atlaskit/commits/3de66f4))
* fix; emoji picker can no longer be opened when mention typeahead is open ([e513fd8](https://bitbucket.org/atlassian/atlaskit/commits/e513fd8))
* fix; inserting links must create new media item via media API. ([a247785](https://bitbucket.org/atlassian/atlaskit/commits/a247785))
* fix; updated emoji dependency ([7adf4a7](https://bitbucket.org/atlassian/atlaskit/commits/7adf4a7))


* feature; move JIRA serializer/parser into editor-core, copy JIRA schema as well ([07f77f6](https://bitbucket.org/atlassian/atlaskit/commits/07f77f6))


null removed alignment of mention picker ([647983c](https://bitbucket.org/atlassian/atlaskit/commits/647983c))

## 43.1.0 (2017-07-26)


* feature; rename editor appearances ([83cfbff](https://bitbucket.org/atlassian/atlaskit/commits/83cfbff))

## 43.0.0 (2017-07-25)


* fix; fix new stories use of util-data-test ([c501c01](https://bitbucket.org/atlassian/atlaskit/commits/c501c01))
* fix; update mention/emoji to minimum required versions to test/story data ([9ce169a](https://bitbucket.org/atlassian/atlaskit/commits/9ce169a))
* fix; upgrade to next available util-data-test ([8a8d2be](https://bitbucket.org/atlassian/atlaskit/commits/8a8d2be))
* fix; util-data-test bump ([a534626](https://bitbucket.org/atlassian/atlaskit/commits/a534626))


* feature; upgrade emoji component ([9ac9802](https://bitbucket.org/atlassian/atlaskit/commits/9ac9802))
* feature; upgrade mentions, get story/test data from component ([4a76f8d](https://bitbucket.org/atlassian/atlaskit/commits/4a76f8d))


* breaking; Requirements for an EmojiProvider has changed. This is a breaking change if implementing
EmojiProvider, instead of using the supplied EmojiResource

ISSUES CLOSED: FS-1127

## 42.0.0 (2017-07-25)


* fix; handle text nodes properly in Popup placement helpers ([72963ad](https://bitbucket.org/atlassian/atlaskit/commits/72963ad))
* fix; removing softblur from the editor when toolbar dropdown menu are opened. ([8db8565](https://bitbucket.org/atlassian/atlaskit/commits/8db8565))


* feature; removing keyboard shortcuts for headings and normal test block. ([6817617](https://bitbucket.org/atlassian/atlaskit/commits/6817617))


* breaking; Keyboard shortcuts for heading and paragraoh blocks will not work.

## 41.2.0 (2017-07-25)

## 41.1.1 (2017-07-25)


* fix; rendering of link cards, sizing of cards. ([fa4bbbf](https://bitbucket.org/atlassian/atlaskit/commits/fa4bbbf))

## 41.1.0 (2017-07-24)


* fix; updated shift keymap related tests and make them passed. Skip horizontal tests. ([36f1993](https://bitbucket.org/atlassian/atlaskit/commits/36f1993))


* feature; enable tables in confluence-schema ([2b06b3b](https://bitbucket.org/atlassian/atlaskit/commits/2b06b3b))
* feature; change es2015 build so it transpiles everything except import/export statements ([354cdca](https://bitbucket.org/atlassian/atlaskit/commits/354cdca))

## 40.0.0 (2017-07-24)


* feature; convert asciiEmojiInputRules, codeBlock and hyperlink to new architecture ([3bf997a](https://bitbucket.org/atlassian/atlaskit/commits/3bf997a))


* breaking; asciiEmojiPlugins now accepts providerFactory instead of emojiProvider

ISSUES CLOSED: ED-2075

## 39.7.0 (2017-07-24)


* feature; include decisionList and decisionItem into the hipchat schema ([331b620](https://bitbucket.org/atlassian/atlaskit/commits/331b620))

## 39.6.0 (2017-07-23)


* feature; add analytics support to the new editor architecture ([5e8f6a8](https://bitbucket.org/atlassian/atlaskit/commits/5e8f6a8))

## 39.5.2 (2017-07-21)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))
* fix; open link in a new window ([77609c4](https://bitbucket.org/atlassian/atlaskit/commits/77609c4))

## 39.5.1 (2017-07-21)


* fix; fixes a few bugs with decions and adds local id ([11bcdde](https://bitbucket.org/atlassian/atlaskit/commits/11bcdde))
* fix; upgrading prosemirror-keymaps dependency to fix issue with shortcuts with alt being br ([1bbe3fc](https://bitbucket.org/atlassian/atlaskit/commits/1bbe3fc))


* feature; adding insert block toolbar menu. ([0cc283b](https://bitbucket.org/atlassian/atlaskit/commits/0cc283b))

## 39.5.0 (2017-07-20)

## 39.4.0 (2017-07-20)

## 39.3.1 (2017-07-19)


* fix; bump test-decision dep due to release ([89889a2](https://bitbucket.org/atlassian/atlaskit/commits/89889a2))


* feature; render DecisionItem and DecisionList in the "new" renderer ([899006b](https://bitbucket.org/atlassian/atlaskit/commits/899006b))
* feature; use DecisionItem component for decision rendering ([fd4d9df](https://bitbucket.org/atlassian/atlaskit/commits/fd4d9df))

## 39.3.0 (2017-07-19)


* fix; close profilecard popup on actions click ([0989b30](https://bitbucket.org/atlassian/atlaskit/commits/0989b30))


* feature; add profilecard integration for renderer ([9df55f5](https://bitbucket.org/atlassian/atlaskit/commits/9df55f5))

## 39.2.0 (2017-07-18)


* fix; only allow creating decision list from a top-level paragraph ([330556d](https://bitbucket.org/atlassian/atlaskit/commits/330556d))

## 39.1.5 (2017-07-17)

## 39.1.5 (2017-07-17)


* fix; allow converting to decision list when there is a hard break in text node ([97cf2bd](https://bitbucket.org/atlassian/atlaskit/commits/97cf2bd))

## 39.1.5 (2017-07-17)


* feature; decisions plugin ([dc6d230](https://bitbucket.org/atlassian/atlaskit/commits/dc6d230))
* feature; fS-1131 Add Decision list and decision node ([1ad88f6](https://bitbucket.org/atlassian/atlaskit/commits/1ad88f6))

## 39.1.4 (2017-07-17)


* fix; adding border top also to editor when max-height is reached. ([5bc1ab9](https://bitbucket.org/atlassian/atlaskit/commits/5bc1ab9))
* fix; dismiss and cancel emoji typeahead when query is empty ([a103812](https://bitbucket.org/atlassian/atlaskit/commits/a103812))
* fix; fixed media keymap stub, because the method was renamed. ([1bd55be](https://bitbucket.org/atlassian/atlaskit/commits/1bd55be))
* fix; handleMediaProvider raises exception when mediaProvider doesn't have a linkCreateCon ([cf2216f](https://bitbucket.org/atlassian/atlaskit/commits/cf2216f))
* fix; moved setNodeSelection and setTextSelection from test-helper to src/utils ([1ec5dc6](https://bitbucket.org/atlassian/atlaskit/commits/1ec5dc6))
* fix; render codeBlock if language is null ([bbbc3e9](https://bitbucket.org/atlassian/atlaskit/commits/bbbc3e9))
* fix; removed extra new line. ([86c48fc](https://bitbucket.org/atlassian/atlaskit/commits/86c48fc))
* fix; removed unused typescript. ([cb99770](https://bitbucket.org/atlassian/atlaskit/commits/cb99770))

## 39.1.3 (2017-07-14)


* fix; removed extra new lines. ([6dd0468](https://bitbucket.org/atlassian/atlaskit/commits/6dd0468))

## 39.1.2 (2017-07-14)


* fix; added codeblock styles back ([6837c22](https://bitbucket.org/atlassian/atlaskit/commits/6837c22))
* fix; disable code-mirror plugin ([815a482](https://bitbucket.org/atlassian/atlaskit/commits/815a482))
* fix; fixed strike mark for BB ([3ede6f4](https://bitbucket.org/atlassian/atlaskit/commits/3ede6f4))
* fix; move backspace test to the right place ([b61308b](https://bitbucket.org/atlassian/atlaskit/commits/b61308b))
* fix; show URL on link hover ([bf58349](https://bitbucket.org/atlassian/atlaskit/commits/bf58349))


null give it better name ([5299085](https://bitbucket.org/atlassian/atlaskit/commits/5299085))


* feature; handle when media node is the first one in the group ([7b8deb1](https://bitbucket.org/atlassian/atlaskit/commits/7b8deb1))


* breaking; Update handleMediaNodeRemove to handleMediaNodeRemoval in media plugin

## 39.1.1 (2017-07-12)

## 39.1.0 (2017-07-12)

## 39.0.1 (2017-07-12)


* fix; analytics service not called while toggling list using keyboard. ([ddd227f](https://bitbucket.org/atlassian/atlaskit/commits/ddd227f))

## 38.0.0 (2017-07-12)


* fix; fix dropzone configuration in picker facade. ([898528c](https://bitbucket.org/atlassian/atlaskit/commits/898528c))
* fix; fixed bug that selected media node cannot type or enter ([ea5516c](https://bitbucket.org/atlassian/atlaskit/commits/ea5516c))
* fix; moved renderer UI component export from /src/ui to /src/renderer ([50e11df](https://bitbucket.org/atlassian/atlaskit/commits/50e11df))
* fix; test build to check if storybook build is fixed. ([abb7889](https://bitbucket.org/atlassian/atlaskit/commits/abb7889))


* feature; replaced handleMediaNodeOutsideRemove in media plugin with cancelInFlightUpload ([1f6aeb1](https://bitbucket.org/atlassian/atlaskit/commits/1f6aeb1))


* breaking; replaced handleMediaNodeOutsideRemove in media plugin with cancelInFlightUpload
* breaking; moved renderer UI component export from /src/ui to /src/renderer

## 37.5.0 (2017-07-11)


* fix; fix jumping of code block when editor has a scroll. ([eb4e4a4](https://bitbucket.org/atlassian/atlaskit/commits/eb4e4a4))

## 37.4.0 (2017-07-11)


* fix; bump emoji to the latest version ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))


* feature; convert media plugin to support the new editor architecture ([a2da079](https://bitbucket.org/atlassian/atlaskit/commits/a2da079))
* feature; fS-1125 Code review remarks ([d2b4cc0](https://bitbucket.org/atlassian/atlaskit/commits/d2b4cc0))

## 37.3.2 (2017-07-10)


* fix; fix Enter key behavior in code-block. ([f662ad0](https://bitbucket.org/atlassian/atlaskit/commits/f662ad0))
* fix; fix event handling for code-mirror code-blocks. ([d392bde](https://bitbucket.org/atlassian/atlaskit/commits/d392bde))
* fix; fixing the issue of updating prose-mirror editor state from code-mirror node-view wh ([d0c0cef](https://bitbucket.org/atlassian/atlaskit/commits/d0c0cef))


* feature; Adding code mirror node-view package ([14719a6](https://bitbucket.org/atlassian/atlaskit/commits/14719a6))

## 37.3.1 (2017-07-10)

## 37.3.0 (2017-07-10)


* fix; fix for analytics event to ve invoked only if user action was successful. ([67eca8e](https://bitbucket.org/atlassian/atlaskit/commits/67eca8e))
* fix; fix hyperlink handlePaste because it breaks table pasting ([7903c0e](https://bitbucket.org/atlassian/atlaskit/commits/7903c0e))
* fix; improve block quote styling for editor ([afb02d0](https://bitbucket.org/atlassian/atlaskit/commits/afb02d0))
* fix; remove CSS hack for disabled ToolbarAdvancedTextFormatting UI element ([0a92ff0](https://bitbucket.org/atlassian/atlaskit/commits/0a92ff0))


* feature; export WithProviders from editor-core ([1fda740](https://bitbucket.org/atlassian/atlaskit/commits/1fda740))
* feature; fS-1125 Resolve mentions query by using previous exact match ([28e2d4c](https://bitbucket.org/atlassian/atlaskit/commits/28e2d4c))

## 37.2.1 (2017-07-07)

## 37.2.0 (2017-07-07)


* fix; rename table nodes to camelCase ([194a773](https://bitbucket.org/atlassian/atlaskit/commits/194a773))

## 37.1.0 (2017-07-07)

## 36.0.0 (2017-07-07)


* fix; cleanup ([ca3537c](https://bitbucket.org/atlassian/atlaskit/commits/ca3537c))


* feature; add saveOnEnter plugin for the new editor architecture ([cb97a0b](https://bitbucket.org/atlassian/atlaskit/commits/cb97a0b))
* feature; added advance menu for tables ([7256a52](https://bitbucket.org/atlassian/atlaskit/commits/7256a52))
* feature; tabbing in the last cell creates a new row ([eef9878](https://bitbucket.org/atlassian/atlaskit/commits/eef9878))
* feature; use withProvider instead of subscriptions in plugin state ([24b3026](https://bitbucket.org/atlassian/atlaskit/commits/24b3026))


* breaking; It's a breaking change for editor-hipchat since it uses MentionPicker and EmojiTypeAhead directly
not through Chrome

ISSUES CLOSED: ED-2037

## 35.2.1 (2017-07-06)

## 35.2.0 (2017-07-06)


* fix; link parsing logic should not parse link inside another link. ([314da7f](https://bitbucket.org/atlassian/atlaskit/commits/314da7f))


* feature; hit enter in the middle media node should split media group ([858ad32](https://bitbucket.org/atlassian/atlaskit/commits/858ad32))

## 35.1.2 (2017-07-06)


* fix; fix unnecessary blinking of media cards in editor ([4271fdb](https://bitbucket.org/atlassian/atlaskit/commits/4271fdb))

## 35.1.1 (2017-07-06)


* fix; removed redundant test ([d8fc745](https://bitbucket.org/atlassian/atlaskit/commits/d8fc745))

## 35.1.0 (2017-07-05)


* fix; removed extra whitespace. ([5289a72](https://bitbucket.org/atlassian/atlaskit/commits/5289a72))


* feature; now auto-convert ascii emoji starting with a colon to the matching emoji when follo ([f1e5579](https://bitbucket.org/atlassian/atlaskit/commits/f1e5579))

## 35.0.3 (2017-07-05)


* fix; use newest media components, fix renderer lazy-load media bugs ([e7d02cf](https://bitbucket.org/atlassian/atlaskit/commits/e7d02cf))

## 35.0.2 (2017-07-05)


* fix; add missing storybook data in new renderer and update marks/code to use AkCode ([84e0114](https://bitbucket.org/atlassian/atlaskit/commits/84e0114))
* fix; fix test ([d438aad](https://bitbucket.org/atlassian/atlaskit/commits/d438aad))
* fix; removed setState on scroll hack ([f1f43d8](https://bitbucket.org/atlassian/atlaskit/commits/f1f43d8))

## 35.0.1 (2017-07-05)


* fix; do not destroy passed providerFactory on Renderer unmount ([8ef3509](https://bitbucket.org/atlassian/atlaskit/commits/8ef3509))
* fix; fix splitListItem ([cbf2388](https://bitbucket.org/atlassian/atlaskit/commits/cbf2388))
* fix; fix the issue where Paragraph sometimes doen't comes with a content attribute ([c58f300](https://bitbucket.org/atlassian/atlaskit/commits/c58f300))
* fix; fix toolbar position 1px gap due to border-bottom of the Editor ([1a33dc0](https://bitbucket.org/atlassian/atlaskit/commits/1a33dc0))
* fix; include updated full.json ([630d54e](https://bitbucket.org/atlassian/atlaskit/commits/630d54e))
* fix; json schema's patterns for application card urls. ([f57ad01](https://bitbucket.org/atlassian/atlaskit/commits/f57ad01))
* fix; make ascii-to-emoji auto-conversion great again when preceded by a hard break ([88ad29b](https://bitbucket.org/atlassian/atlaskit/commits/88ad29b))
* fix; make sure insert links handled empty href. ([9ee7106](https://bitbucket.org/atlassian/atlaskit/commits/9ee7106))
* fix; removed unused import. ([4eadc1b](https://bitbucket.org/atlassian/atlaskit/commits/4eadc1b))

## 35.0.0 (2017-07-04)


* fix; removed unused import. ([3292bc3](https://bitbucket.org/atlassian/atlaskit/commits/3292bc3))


* feature; handle selection only if has a media node before current media node. ([c0fb6ed](https://bitbucket.org/atlassian/atlaskit/commits/c0fb6ed))

## 34.11.1 (2017-07-04)


* fix; fix "src_1.mediaPluginFactory is not a function" ([27a8a25](https://bitbucket.org/atlassian/atlaskit/commits/27a8a25))
* fix; move tablefloating toolbar with scroll ([6078aac](https://bitbucket.org/atlassian/atlaskit/commits/6078aac))


* feature; merged master ([77ec826](https://bitbucket.org/atlassian/atlaskit/commits/77ec826))

## 34.11.0 (2017-07-04)


* fix; edit blockquote styling ([7e9baca](https://bitbucket.org/atlassian/atlaskit/commits/7e9baca))

## 34.10.0 (2017-07-04)


* fix; allow relative urls in isSafeUrl validator ([f47d228](https://bitbucket.org/atlassian/atlaskit/commits/f47d228))
* fix; fix a typo in ApplicationCard test ([4216d91](https://bitbucket.org/atlassian/atlaskit/commits/4216d91))
* fix; fix cols/rows insertion in table plugin ([fe25257](https://bitbucket.org/atlassian/atlaskit/commits/fe25257))
* fix; fix tables plugin tests ([a0f01be](https://bitbucket.org/atlassian/atlaskit/commits/a0f01be))
* fix; fixed tables isRowSelection and isColSelection naming ([c31012d](https://bitbucket.org/atlassian/atlaskit/commits/c31012d))
* fix; renderer exported MarkdownSerializer conflicts with PM's MarkdownSerializer ([99c7684](https://bitbucket.org/atlassian/atlaskit/commits/99c7684))
* fix; renderer MarkdownSerializer always returns undefined ([3d4ed46](https://bitbucket.org/atlassian/atlaskit/commits/3d4ed46))


* feature; added hover selection decoration ([79a3fd1](https://bitbucket.org/atlassian/atlaskit/commits/79a3fd1))
* feature; adding parsing of pasted content slices to generate link marks. ([8c24435](https://bitbucket.org/atlassian/atlaskit/commits/8c24435))
* feature; set selection to previous media node after deleting media. ([a811a48](https://bitbucket.org/atlassian/atlaskit/commits/a811a48))
* feature; updated json-schema to reflect the latest changes ([2e47036](https://bitbucket.org/atlassian/atlaskit/commits/2e47036))
* feature; bump prosemirror to 0.22.0, tables to 0.1.0" ([4551ab9](https://bitbucket.org/atlassian/atlaskit/commits/4551ab9))

## 34.9.1 (2017-07-03)


* fix; destroy editorView and plugin state after each test. ([47b0476](https://bitbucket.org/atlassian/atlaskit/commits/47b0476))
* fix; emoji typeahead now shows up after a hardBreak node ([cae95b9](https://bitbucket.org/atlassian/atlaskit/commits/cae95b9))
* fix; mentioni typeahead now shows up after a hardBreak node ([464abdb](https://bitbucket.org/atlassian/atlaskit/commits/464abdb))


* feature; updated rows/cols selection on mouse over ([e9c2ade](https://bitbucket.org/atlassian/atlaskit/commits/e9c2ade))

## 34.9.0 (2017-07-03)


* fix; adding div around editor content to add max-height. ([a142ed5](https://bitbucket.org/atlassian/atlaskit/commits/a142ed5))
* fix; make sure no link detection on undo. ([f9dda85](https://bitbucket.org/atlassian/atlaskit/commits/f9dda85))
* fix; should validate applicationCard according to the spec ([5364a95](https://bitbucket.org/atlassian/atlaskit/commits/5364a95))
* fix; use Array.some to make the code more readable ([c3822ea](https://bitbucket.org/atlassian/atlaskit/commits/c3822ea))
* fix; use same API for MarkdownSerializer as other serializers do ([fc4e380](https://bitbucket.org/atlassian/atlaskit/commits/fc4e380))
* fix; fixed types in all pluginState tests. ([2e8d75f](https://bitbucket.org/atlassian/atlaskit/commits/2e8d75f))
* fix; removed unused import. ([a3e320b](https://bitbucket.org/atlassian/atlaskit/commits/a3e320b))


* feature; add json-schema generator ([97a9603](https://bitbucket.org/atlassian/atlaskit/commits/97a9603))
* feature; added rows/cols selection on floating controls mouse over ([b55f55c](https://bitbucket.org/atlassian/atlaskit/commits/b55f55c))
* feature; redesign of insert row/col buttons ([d02cf77](https://bitbucket.org/atlassian/atlaskit/commits/d02cf77))
* feature; redesigned insert buttons ([5801507](https://bitbucket.org/atlassian/atlaskit/commits/5801507))

## 34.8.0 (2017-06-30)


* feature; updated emoji to include tooltip in editor ([c7f323c](https://bitbucket.org/atlassian/atlaskit/commits/c7f323c))

## 34.7.0 (2017-06-30)


* fix; make sure can insert links when replace step fragment larger than existing fragment. ([caf03ea](https://bitbucket.org/atlassian/atlaskit/commits/caf03ea))
* fix; should not re-import editor-core package ([1471d3b](https://bitbucket.org/atlassian/atlaskit/commits/1471d3b))

## 34.5.0 (2017-06-30)

## 34.5.0 (2017-06-30)


* feature; rendered link card. ([663b647](https://bitbucket.org/atlassian/atlaskit/commits/663b647))

## 34.4.1 (2017-06-29)


* feature; insert link card to the correct position. ([87c45ce](https://bitbucket.org/atlassian/atlaskit/commits/87c45ce))

## 34.4.0 (2017-06-29)


* fix; addes in ApplicationCard support for renderer in editor-core ([af55b2c](https://bitbucket.org/atlassian/atlaskit/commits/af55b2c))
* fix; fix label on block-type dropdown ([b837db6](https://bitbucket.org/atlassian/atlaskit/commits/b837db6))
* fix; making maxHeight an optional property and removing it from storybook. ([3a67577](https://bitbucket.org/atlassian/atlaskit/commits/3a67577))
* fix; minor fixes to address PR feedback ([67864bb](https://bitbucket.org/atlassian/atlaskit/commits/67864bb))


* feature; fS-1090 Bump version of mention and test data ([b4730b3](https://bitbucket.org/atlassian/atlaskit/commits/b4730b3))
* feature; fS-1090 fix tslint ([dd2a2f6](https://bitbucket.org/atlassian/atlaskit/commits/dd2a2f6))
* feature; moving inline-code button to toolbar ([116880f](https://bitbucket.org/atlassian/atlaskit/commits/116880f))

## 34.3.5 (2017-06-29)

## 34.3.4 (2017-06-29)

## 34.3.3 (2017-06-29)


* fix; add codeBlock support to new renderer ([2763767](https://bitbucket.org/atlassian/atlaskit/commits/2763767))
* fix; fix prosemirror nodes assertion helper ([995dcaf](https://bitbucket.org/atlassian/atlaskit/commits/995dcaf))


* feature; add interfaces for json-schema generation ([46d0ec9](https://bitbucket.org/atlassian/atlaskit/commits/46d0ec9))
* feature; add option to set max height of the editor ([e7a96ef](https://bitbucket.org/atlassian/atlaskit/commits/e7a96ef))

## 34.3.2 (2017-06-28)

## 34.3.1 (2017-06-28)


* fix; "status-update" picker events were downgrading media status back to "uploading" ([d22a330](https://bitbucket.org/atlassian/atlaskit/commits/d22a330))
* fix; added typescript types in table plugin and react components ([cd43807](https://bitbucket.org/atlassian/atlaskit/commits/cd43807))
* fix; change API for React UI Renderer component ([079e84f](https://bitbucket.org/atlassian/atlaskit/commits/079e84f))
* fix; copy hipchat schema into the editor-core ([7b47bdf](https://bitbucket.org/atlassian/atlaskit/commits/7b47bdf))
* fix; fix blur/focus logic for color toolbar ([58d7358](https://bitbucket.org/atlassian/atlaskit/commits/58d7358))
* fix; fixed escaping from the table with ArrowUp/ArrowDown ([084f6b9](https://bitbucket.org/atlassian/atlaskit/commits/084f6b9))
* fix; fixed the comment typo ([caa6fa9](https://bitbucket.org/atlassian/atlaskit/commits/caa6fa9))
* fix; fS-1090 Make sure we're exiting the mention context after inserting ([5efd91c](https://bitbucket.org/atlassian/atlaskit/commits/5efd91c))
* fix; handle unknown nodes in renderer ([2956d5c](https://bitbucket.org/atlassian/atlaskit/commits/2956d5c))
* fix; mediaComponent shall use StateManager from Plugin State when in Editor. ([61df737](https://bitbucket.org/atlassian/atlaskit/commits/61df737))
* fix; prevent javascript links for link mark ([20f2d7f](https://bitbucket.org/atlassian/atlaskit/commits/20f2d7f))
* fix; removing code block or panel should not remove enclosing block. ([9c7586e](https://bitbucket.org/atlassian/atlaskit/commits/9c7586e))
* fix; updated table keymaps ([795d8bb](https://bitbucket.org/atlassian/atlaskit/commits/795d8bb))


* feature; added function in media plugin to detect whether the transaction has new links. ([fff1175](https://bitbucket.org/atlassian/atlaskit/commits/fff1175))
* feature; fS-1090 Dynamically resolve mentions when typing fast ([8bcb355](https://bitbucket.org/atlassian/atlaskit/commits/8bcb355))
* feature; refactored detectLinkRanges to return position with list of urls. ([6de21d8](https://bitbucket.org/atlassian/atlaskit/commits/6de21d8))


* breaking; Rename allowsPastingLinks to allowsLinks

## 34.3.0 (2017-06-26)


* fix; use expect instead of expect not to if we knows what to expect. ([fa1ca0c](https://bitbucket.org/atlassian/atlaskit/commits/fa1ca0c))
* fix; fixed media plugin test failure after merge master. ([0110cdf](https://bitbucket.org/atlassian/atlaskit/commits/0110cdf))

## 34.2.2 (2017-06-26)

## 34.2.1 (2017-06-23)


* fix; clicking trash icon on floating toolbars of panel or code-blocks should delete the b ([b1a7720](https://bitbucket.org/atlassian/atlaskit/commits/b1a7720))
* fix; default value of language picker should  not be language but placeholder. ([098b298](https://bitbucket.org/atlassian/atlaskit/commits/098b298))
* fix; fix path in test helpers ([dcc0ffb](https://bitbucket.org/atlassian/atlaskit/commits/dcc0ffb))
* fix; fix required types on applicationCard type. ([c13f04c](https://bitbucket.org/atlassian/atlaskit/commits/c13f04c))

## 34.2.0 (2017-06-23)


* fix; fixed tslint, cursor position when deleting rows ([e6e2792](https://bitbucket.org/atlassian/atlaskit/commits/e6e2792))


* feature; add applicationCard node. ([8dd08a1](https://bitbucket.org/atlassian/atlaskit/commits/8dd08a1))

## 34.1.1 (2017-06-23)


* fix; fixed position inside table when adding new rows ([52ed7db](https://bitbucket.org/atlassian/atlaskit/commits/52ed7db))

## 34.1.0 (2017-06-23)


* fix; added accessLevel to mention node in renderer of editor-core ([50be806](https://bitbucket.org/atlassian/atlaskit/commits/50be806))
* fix; updated test-helpers for table ([f13d324](https://bitbucket.org/atlassian/atlaskit/commits/f13d324))
* fix; changed button ref handler to prevent local test failures ([3dbe3f1](https://bitbucket.org/atlassian/atlaskit/commits/3dbe3f1))


* feature; added prosemirror-tables package, table nodes to schema and table plugin ([74ee019](https://bitbucket.org/atlassian/atlaskit/commits/74ee019))

## 33.3.1 (2017-06-22)


* fix; fixed floating toolbar position when table has offset ([d48fea5](https://bitbucket.org/atlassian/atlaskit/commits/d48fea5))
* fix; remove table-prototype package ([15ea532](https://bitbucket.org/atlassian/atlaskit/commits/15ea532))
* fix; tables cleanup ([c51c60d](https://bitbucket.org/atlassian/atlaskit/commits/c51c60d))
* fix; fixed typescript error. ([1072668](https://bitbucket.org/atlassian/atlaskit/commits/1072668))

## 33.3.0 (2017-06-21)


* feature; removed handleNewMediaPicked and expose insertFile as media plugin API ([a6a5152](https://bitbucket.org/atlassian/atlaskit/commits/a6a5152))


* breaking; removed handleNewMediaPicked and expose insertFile as media plugin API

## 33.2.2 (2017-06-21)


* fix; fix order of colours in colour picker ([5572a97](https://bitbucket.org/atlassian/atlaskit/commits/5572a97))
* fix; fixed floating toolbar position ([f433ad7](https://bitbucket.org/atlassian/atlaskit/commits/f433ad7))
* fix; list autoformatting should not work inside code block. ([32685e7](https://bitbucket.org/atlassian/atlaskit/commits/32685e7))
* fix; make sure inserting media is working with node selected. ([4f7abec](https://bitbucket.org/atlassian/atlaskit/commits/4f7abec))
* fix; refactor and fixed bug that didn't delete selected text when there is existing media ([94eb3a5](https://bitbucket.org/atlassian/atlaskit/commits/94eb3a5))
* fix; uncaught rejected provider promises, ui not updating. ([237cd54](https://bitbucket.org/atlassian/atlaskit/commits/237cd54))


* feature; apply the same operation to insertLink. ([538ffac](https://bitbucket.org/atlassian/atlaskit/commits/538ffac))
* feature; set selection to the next paragraph after inserting media ([ebdf46c](https://bitbucket.org/atlassian/atlaskit/commits/ebdf46c))
* feature; dummy commit to mark release of editor-core. ([7276311](https://bitbucket.org/atlassian/atlaskit/commits/7276311))

## 33.2.1 (2017-06-21)


* fix; addes in support for Heading in new renderer ([0a48838](https://bitbucket.org/atlassian/atlaskit/commits/0a48838))
* fix; fixed cursor position when inserting/deleting cells ([5c5134e](https://bitbucket.org/atlassian/atlaskit/commits/5c5134e))

## 33.2.0 (2017-06-21)


* fix; fix popup alignment ([f1087b5](https://bitbucket.org/atlassian/atlaskit/commits/f1087b5))
* fix; fix tslint error ([9f53fe7](https://bitbucket.org/atlassian/atlaskit/commits/9f53fe7))
* fix; fixed tslint error, tableCellStartPos ([824a135](https://bitbucket.org/atlassian/atlaskit/commits/824a135))
* fix; fS-1073 Trigger empty search when setting mentions provider to improve responsivenes ([3218cb8](https://bitbucket.org/atlassian/atlaskit/commits/3218cb8))
* fix; insert default content type after media instead of hard coded to p. ([da356ab](https://bitbucket.org/atlassian/atlaskit/commits/da356ab))
* fix; fS-1073 Bump mention version ([668eff6](https://bitbucket.org/atlassian/atlaskit/commits/668eff6))


* feature; add JSONSerializer ([0546b04](https://bitbucket.org/atlassian/atlaskit/commits/0546b04))
* feature; added alignX and alignY extra params to popup ([92d716d](https://bitbucket.org/atlassian/atlaskit/commits/92d716d))
* feature; added removing of selected cells ([b6c47f5](https://bitbucket.org/atlassian/atlaskit/commits/b6c47f5))
* feature; create a new p when insert media on a non empty content block. ([5d9ec4b](https://bitbucket.org/atlassian/atlaskit/commits/5d9ec4b))
* feature; make sure insert media works with text selected. ([377d655](https://bitbucket.org/atlassian/atlaskit/commits/377d655))
* feature; prepend to existing media group if detecting previous adjacent node is media group ([d72636a](https://bitbucket.org/atlassian/atlaskit/commits/d72636a))

## 33.1.0 (2017-06-20)


* fix; fixed tests that does not set the right selction. ([7a644a6](https://bitbucket.org/atlassian/atlaskit/commits/7a644a6))
* fix; support Emoji nodes in react renderer ([ac83cfa](https://bitbucket.org/atlassian/atlaskit/commits/ac83cfa))


* feature; added floating toolbar, changed popper to popup ([eef3307](https://bitbucket.org/atlassian/atlaskit/commits/eef3307))

## 33.0.2 (2017-06-20)


* fix; fix media copy optional attrs during insert ([e08a07e](https://bitbucket.org/atlassian/atlaskit/commits/e08a07e))
* fix; do not import whole [@atlaskit](https://github.com/atlaskit)/icon – missed import ([b3854f5](https://bitbucket.org/atlassian/atlaskit/commits/b3854f5))

## 33.0.1 (2017-06-20)


* fix; it inserts a new p no matter it's an empty p or not. ([265f573](https://bitbucket.org/atlassian/atlaskit/commits/265f573))
* fix; do not import whole [@atlaskit](https://github.com/atlaskit)/icon ([27a1633](https://bitbucket.org/atlassian/atlaskit/commits/27a1633))


* feature; create a new paragraph below when inserting a media node at the end of the doc. ([1be170e](https://bitbucket.org/atlassian/atlaskit/commits/1be170e))
* feature; dissallow nested tables ([e761dea](https://bitbucket.org/atlassian/atlaskit/commits/e761dea))

## 32.0.0 (2017-06-19)


* fix; add defaultSchema, use it in src/ui/Renderer ([24ac8eb](https://bitbucket.org/atlassian/atlaskit/commits/24ac8eb))
* fix; pass providers and eventhandlers into React serializer ([7ab3e44](https://bitbucket.org/atlassian/atlaskit/commits/7ab3e44))


null update media node to reflect the new architecture ([6b8ee3b](https://bitbucket.org/atlassian/atlaskit/commits/6b8ee3b))


* feature; added focus logic back ([415d516](https://bitbucket.org/atlassian/atlaskit/commits/415d516))
* feature; added ToolbarEmojiPicker button ([67498c6](https://bitbucket.org/atlassian/atlaskit/commits/67498c6))
* feature; exit inline code with arrowRight ([9fb3e74](https://bitbucket.org/atlassian/atlaskit/commits/9fb3e74))
* feature; integrated accessLevel data from mentions with NodeSpec ([305f94c](https://bitbucket.org/atlassian/atlaskit/commits/305f94c))
* feature; bumped mentions to latest version ([fed0d26](https://bitbucket.org/atlassian/atlaskit/commits/fed0d26))


* breaking; Introduced new private attrs in media node, see ED-1964

ISSUES CLOSED: ED-1931

## 31.2.1 (2017-06-19)


* feature; added corner insert buttons ([1dda2c8](https://bitbucket.org/atlassian/atlaskit/commits/1dda2c8))
* feature; added insert buttons for cols and rows ([92d6275](https://bitbucket.org/atlassian/atlaskit/commits/92d6275))
* feature; added insertion of cols and rows ([4d4ae8a](https://bitbucket.org/atlassian/atlaskit/commits/4d4ae8a))

## 31.2.0 (2017-06-17)


* fix; cleanup ([6e7da47](https://bitbucket.org/atlassian/atlaskit/commits/6e7da47))
* fix; destroy providerFactory internals when components get unmounted ([726a55e](https://bitbucket.org/atlassian/atlaskit/commits/726a55e))


* feature; added visual trigger for tables ([6302237](https://bitbucket.org/atlassian/atlaskit/commits/6302237))
* feature; changes required in editor-core for code-mirror package. ([f4f575c](https://bitbucket.org/atlassian/atlaskit/commits/f4f575c))
* feature; improved selection detection ([8d3a8a0](https://bitbucket.org/atlassian/atlaskit/commits/8d3a8a0))

## 31.1.0 (2017-06-16)


* fix; extract bundled TypeScript definitions for orderedmap, use [@types](https://github.com/types)/orderedmap ([6759110](https://bitbucket.org/atlassian/atlaskit/commits/6759110))

## 31.0.1 (2017-06-16)

## 31.0.0 (2017-06-15)


* fix; do not serialize media nodes in text serializer ([4b69821](https://bitbucket.org/atlassian/atlaskit/commits/4b69821))


* feature; add Confluence and Bitbucket schemas to editor-core. ([5cd2b16](https://bitbucket.org/atlassian/atlaskit/commits/5cd2b16))
* feature; new popups and dropdowns for editor-core ([0e738d9](https://bitbucket.org/atlassian/atlaskit/commits/0e738d9))


* breaking; Might introduce some regressions, releasing new major version as a precaution

ISSUES CLOSED: ED-1468 ED-1440

## 30.2.2 (2017-06-15)


* fix; don't trigger emoji typeahead when colon is preceded by a non-word non-whitespace ch ([f301589](https://bitbucket.org/atlassian/atlaskit/commits/f301589))


* feature; add ascii emoji input rule to automatically match and convert ascii representations ([b404019](https://bitbucket.org/atlassian/atlaskit/commits/b404019))
* feature; cleaned up table plugin and ui component a bit ([62af12b](https://bitbucket.org/atlassian/atlaskit/commits/62af12b))
* feature; keep the leading colon in the query being passed to the typeahead ([362d541](https://bitbucket.org/atlassian/atlaskit/commits/362d541))

## 30.2.1 (2017-06-14)


* fix; blur collapsed input before setting focus to expanded editor ([b1e3273](https://bitbucket.org/atlassian/atlaskit/commits/b1e3273))
* fix; fixed row/cols selection and focus bugs ([606694a](https://bitbucket.org/atlassian/atlaskit/commits/606694a))
* fix; simplier text serializer ([18f0c79](https://bitbucket.org/atlassian/atlaskit/commits/18f0c79))

## 30.2.0 (2017-06-14)

## 30.1.3 (2017-06-14)


* fix; add AbstractMentionResource export to editor-core ([308ad31](https://bitbucket.org/atlassian/atlaskit/commits/308ad31))
* fix; commenting out ToolbarEmojiPicker related files ([174c676](https://bitbucket.org/atlassian/atlaskit/commits/174c676))
* fix; fix table typescript error ([5eb7a64](https://bitbucket.org/atlassian/atlaskit/commits/5eb7a64))

## 30.1.2 (2017-06-13)


* fix; fix test failure due to group declaration marks ([1f1438f](https://bitbucket.org/atlassian/atlaskit/commits/1f1438f))
* fix; fix typo on mention import ([1d44c5c](https://bitbucket.org/atlassian/atlaskit/commits/1d44c5c))
* fix; fixed background overlapping border of table cell in Firefox ([c03902c](https://bitbucket.org/atlassian/atlaskit/commits/c03902c))
* fix; include mark group declarations to avoid false-position errors. ([c5c6ea5](https://bitbucket.org/atlassian/atlaskit/commits/c5c6ea5))


* feature; added active state to toolbar buttons ([f456d5b](https://bitbucket.org/atlassian/atlaskit/commits/f456d5b))
* feature; added TableToolbar ([1d016ea](https://bitbucket.org/atlassian/atlaskit/commits/1d016ea))
* feature; upgrade emoji to support custom uploads. ([3b28226](https://bitbucket.org/atlassian/atlaskit/commits/3b28226))
* feature; consistent version of mentions between renderer and editor-core ([4924655](https://bitbucket.org/atlassian/atlaskit/commits/4924655))

## 30.1.1 (2017-06-09)


* fix; use mark groups to create some indirection for exclusions. ([b976d58](https://bitbucket.org/atlassian/atlaskit/commits/b976d58))
* fix; simplify function declaration because "contextual typing" ([17f5476](https://bitbucket.org/atlassian/atlaskit/commits/17f5476))

## 30.1.0 (2017-06-09)


* feature; Add Confluence-specific editor nodes to editor-core. ([b1d7185](https://bitbucket.org/atlassian/atlaskit/commits/b1d7185))

## 29.0.0 (2017-06-08)


* fix; remove context in editor core storybook ([79facc0](https://bitbucket.org/atlassian/atlaskit/commits/79facc0))


* feature; added table nodeView and tracking of focus state change ([e29715e](https://bitbucket.org/atlassian/atlaskit/commits/e29715e))
* feature; removed context setting in editor ([da582cd](https://bitbucket.org/atlassian/atlaskit/commits/da582cd))


* breaking; removed context setting in editor

## 28.1.3 (2017-06-08)

## 28.1.2 (2017-06-07)


* fix; brackets should be a valid character for links. ([0d8b437](https://bitbucket.org/atlassian/atlaskit/commits/0d8b437))

## 28.1.1 (2017-06-07)


* fix; replace non empty selection with '@' and mentionQuery mark ([4b06d91](https://bitbucket.org/atlassian/atlaskit/commits/4b06d91))
* fix; replace non empty selection with ":" and emojiQuery mark ([db48be0](https://bitbucket.org/atlassian/atlaskit/commits/db48be0))


* feature; moved to prosemirror-tables dependency ([94fc851](https://bitbucket.org/atlassian/atlaskit/commits/94fc851))

## 28.1.0 (2017-06-07)


* feature; add basic text serializer code ([5ef88c7](https://bitbucket.org/atlassian/atlaskit/commits/5ef88c7))
* feature; add more nodes and tests ([475a3f4](https://bitbucket.org/atlassian/atlaskit/commits/475a3f4))
* feature; export renderer stuff ([99e3f9e](https://bitbucket.org/atlassian/atlaskit/commits/99e3f9e))

## 28.0.0 (2017-06-06)


* fix; fix display text cache for link ([284f7d8](https://bitbucket.org/atlassian/atlaskit/commits/284f7d8))
* fix; importing tables from dist instead of using source files ([e4da0e7](https://bitbucket.org/atlassian/atlaskit/commits/e4da0e7))
* fix; increase specificity of input class produced by styled-component ([021b7f7](https://bitbucket.org/atlassian/atlaskit/commits/021b7f7))


* feature; added table plugin and schema ([01e016a](https://bitbucket.org/atlassian/atlaskit/commits/01e016a))

## 27.1.0 (2017-06-05)


* fix; re-use existing mediapickers instead of destroying/creating a new one for every room ([a881d7d](https://bitbucket.org/atlassian/atlaskit/commits/a881d7d))


* feature; added prosemirror-tables and typescript definitions ([6aafb7b](https://bitbucket.org/atlassian/atlaskit/commits/6aafb7b))

## 26.0.0 (2017-06-02)


* fix; ensure mention button is disabled in unsupported nodes ([d46b6ef](https://bitbucket.org/atlassian/atlaskit/commits/d46b6ef))
* fix; ensure mention button is enabled after auto-formatted code mark ([55ae762](https://bitbucket.org/atlassian/atlaskit/commits/55ae762))
* fix; use latest mentions and emoji components ([5d5a1e4](https://bitbucket.org/atlassian/atlaskit/commits/5d5a1e4))


* feature; incorporate text-color spec changes ([8eb647f](https://bitbucket.org/atlassian/atlaskit/commits/8eb647f))
* feature; upgrade PM to 0.21 ([787e9bf](https://bitbucket.org/atlassian/atlaskit/commits/787e9bf))


* breaking; The openLeft and openRight properties of Slice objects have been renamed to openStart and openEnd
* breaking; use latest mentions and emoji components without polyfills: update editors-* docs with information about it

## 25.10.0 (2017-06-01)


* fix; focus editorView when media nodes are added to the document ([36c3e27](https://bitbucket.org/atlassian/atlaskit/commits/36c3e27))

## 25.9.0 (2017-06-01)


* fix; do not create a new paragraph when arrowUp/Down inside non-nested paragraph ([fcb405f](https://bitbucket.org/atlassian/atlaskit/commits/fcb405f))

## 25.8.0 (2017-06-01)


* fix; fixed bug that converting to hyperlink remove other marks. ([1407ac9](https://bitbucket.org/atlassian/atlaskit/commits/1407ac9))
* fix; fixed typescript ([2b1264e](https://bitbucket.org/atlassian/atlaskit/commits/2b1264e))


* feature; export colorPalette from editor-core ([b01db7c](https://bitbucket.org/atlassian/atlaskit/commits/b01db7c))

## 25.7.0 (2017-06-01)


* fix; fixed analytics tracking on hyperlink enter autoformatting ([3d6047f](https://bitbucket.org/atlassian/atlaskit/commits/3d6047f))
* fix; fixed bug that hyperlink will be converted even has a hard break between them. ([fc648dd](https://bitbucket.org/atlassian/atlaskit/commits/fc648dd))
* fix; fixed typescript. ([4215a2b](https://bitbucket.org/atlassian/atlaskit/commits/4215a2b))


* feature; error-reporting passed as a property ([3bd3827](https://bitbucket.org/atlassian/atlaskit/commits/3bd3827))

## 25.6.3 (2017-05-31)


* fix; add missing export for text-color plugin ([51659db](https://bitbucket.org/atlassian/atlaskit/commits/51659db))
* fix; cleaned up codeBlock node ([5b85e12](https://bitbucket.org/atlassian/atlaskit/commits/5b85e12))


* feature; make sure link doesnot get override when hit shift+enter or enter. ([9015fad](https://bitbucket.org/atlassian/atlaskit/commits/9015fad))

## 25.6.2 (2017-05-31)


* fix; added fix for pasting codeblock from github and bb ([e8755a1](https://bitbucket.org/atlassian/atlaskit/commits/e8755a1))
* fix; added support for pasting from Gist ([b8eede9](https://bitbucket.org/atlassian/atlaskit/commits/b8eede9))
* fix; style fix in trash icon in language picker. ([4026e3e](https://bitbucket.org/atlassian/atlaskit/commits/4026e3e))


* feature; add disabled property for ChromeExpanded ([67e8627](https://bitbucket.org/atlassian/atlaskit/commits/67e8627))

## 25.6.1 (2017-05-31)

## 25.6.0 (2017-05-31)


* feature; adding disabled flag to block-type and advance-formatting toolbar options ([cd3e48e](https://bitbucket.org/atlassian/atlaskit/commits/cd3e48e))
* feature; adding trash option in language picker floating toolbar. ([7b3d1dc](https://bitbucket.org/atlassian/atlaskit/commits/7b3d1dc))

## 25.5.0 (2017-05-30)


* fix; eD-1689 Add tooltips to image buttons ([9826c37](https://bitbucket.org/atlassian/atlaskit/commits/9826c37))
* fix; removed tech debt that create schema not using createSchmea function provided. ([b50b366](https://bitbucket.org/atlassian/atlaskit/commits/b50b366))
* fix; fixed indent. ([119a304](https://bitbucket.org/atlassian/atlaskit/commits/119a304))


* feature; convert hyperlink on shift+enter and enter ([1010f56](https://bitbucket.org/atlassian/atlaskit/commits/1010f56))

## 25.4.0 (2017-05-30)


* feature; added the same hack for all browsers ([d65de62](https://bitbucket.org/atlassian/atlaskit/commits/d65de62))
* feature; update color values and usages as per #AK-2482 ([ae8fae5](https://bitbucket.org/atlassian/atlaskit/commits/ae8fae5))

## 25.3.1 (2017-05-30)


* fix; firefox bug fix of color palette component ([3519721](https://bitbucket.org/atlassian/atlaskit/commits/3519721))
* fix; firefox toolbar icons fix when shrinking the editor width ([9a80f62](https://bitbucket.org/atlassian/atlaskit/commits/9a80f62))

## 25.3.0 (2017-05-29)


* feature; only convert link on hitting space after hyperlink. ([2c79e1a](https://bitbucket.org/atlassian/atlaskit/commits/2c79e1a))
* feature; should only convert to hyperlink on hitting space if it's not already a hyperlink. ([e40936e](https://bitbucket.org/atlassian/atlaskit/commits/e40936e))

## 25.2.1 (2017-05-29)


* fix; fix removing unfinalized files ([b2c1f1e](https://bitbucket.org/atlassian/atlaskit/commits/b2c1f1e))
* fix; phantom media bugs ([a67b136](https://bitbucket.org/atlassian/atlaskit/commits/a67b136))
* fix; remove docCompact and "compact" behaviour ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))


* feature; update toDOM for server side rendering ([815d6e5](https://bitbucket.org/atlassian/atlaskit/commits/815d6e5))

## 25.2.0 (2017-05-29)

## 25.1.1 (2017-05-26)

## 25.1.0 (2017-05-26)


* fix; fix pasting from different IDEs ([5c3ec74](https://bitbucket.org/atlassian/atlaskit/commits/5c3ec74))
* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

## 25.0.1 (2017-05-26)


* fix; fixed tests for UI components ([83d6e6a](https://bitbucket.org/atlassian/atlaskit/commits/83d6e6a))
* fix; fixed tslint in storybook ([702f9e7](https://bitbucket.org/atlassian/atlaskit/commits/702f9e7))

## 24.0.0 (2017-05-25)


* fix; fixed tslint errors ([0e618f9](https://bitbucket.org/atlassian/atlaskit/commits/0e618f9))
* fix; remove unused browserkeymap dependency. ([66c267f](https://bitbucket.org/atlassian/atlaskit/commits/66c267f))
* fix; tslist errors fixes ([178f638](https://bitbucket.org/atlassian/atlaskit/commits/178f638))


null version bump for atlaskit components. ([67b15f7](https://bitbucket.org/atlassian/atlaskit/commits/67b15f7))


* feature; added styled components to Chrome expanded and Chrome collapsed components ([5018087](https://bitbucket.org/atlassian/atlaskit/commits/5018087))
* feature; chromeExpanded styles cleanup ([1b34ab6](https://bitbucket.org/atlassian/atlaskit/commits/1b34ab6))
* feature; moved nodes to styled-componenets ([d8efd85](https://bitbucket.org/atlassian/atlaskit/commits/d8efd85))
* feature; moved typestyle to styled-components in schema nodes and marks, fixed tslint ([dc6b033](https://bitbucket.org/atlassian/atlaskit/commits/dc6b033))
* feature; moved UI components from typestyle to styled-components ([2859562](https://bitbucket.org/atlassian/atlaskit/commits/2859562))
* feature; dummy commit to mark release of editor-core. ([93ffd5a](https://bitbucket.org/atlassian/atlaskit/commits/93ffd5a))
* feature; removed typestyle from package.json ([455c1bf](https://bitbucket.org/atlassian/atlaskit/commits/455c1bf))


* breaking; Upgrading atlaskit components.

## 22.0.0 (2017-05-25)


* fix; fix UI ([d6c006d](https://bitbucket.org/atlassian/atlaskit/commits/d6c006d))
* fix; remove PositionedNode interface, pass getPos as a prop instead + restore media nodes ([5ba9939](https://bitbucket.org/atlassian/atlaskit/commits/5ba9939))
* fix; restore master behaviour for undo ([e98721a](https://bitbucket.org/atlassian/atlaskit/commits/e98721a))


* feature; new API for nodeViews containing React components ([d26748e](https://bitbucket.org/atlassian/atlaskit/commits/d26748e))


* breaking; Use getNodeViews(providerFactory, {...}) API for nodeViews. Check story changes for example usage.

## 21.1.1 (2017-05-24)


* fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))
* fix; use latest media components ([aea882a](https://bitbucket.org/atlassian/atlaskit/commits/aea882a))

## 21.1.0 (2017-05-24)

## 21.0.3 (2017-05-24)


* fix; fix Pasting link is hyperlink floating toolbar. ([16fa287](https://bitbucket.org/atlassian/atlaskit/commits/16fa287))
* fix; made inline code inclusive=true ([12d02c5](https://bitbucket.org/atlassian/atlaskit/commits/12d02c5))
* fix; mime type emitting. ([768484f](https://bitbucket.org/atlassian/atlaskit/commits/768484f))
* fix; undoing would revert to a state with temporary media id. ([660ad0a](https://bitbucket.org/atlassian/atlaskit/commits/660ad0a))


* feature; Moving Renderer to editor-core (phase-1) ([635e02b](https://bitbucket.org/atlassian/atlaskit/commits/635e02b))

## 21.0.2 (2017-05-22)


* fix; handle excludes of mark in createSchema ([bf4326a](https://bitbucket.org/atlassian/atlaskit/commits/bf4326a))

## 21.0.1 (2017-05-19)

## 21.0.0 (2017-05-18)

## 20.1.0 (2017-05-17)


* feature; making changing hyperline title more intuitive. ([81633a7](https://bitbucket.org/atlassian/atlaskit/commits/81633a7))

## 19.0.0 (2017-05-17)


* feature; add API for file upload from data url. ([b4d73cf](https://bitbucket.org/atlassian/atlaskit/commits/b4d73cf))
* feature; add colour picker plugin ([9ff8373](https://bitbucket.org/atlassian/atlaskit/commits/9ff8373))


* breaking; introduce new excludes in `code` and `link` marks

ISSUES CLOSED: ED-1581

## 17.0.0 (2017-05-17)


* fix; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' ([ab1d6d6](https://bitbucket.org/atlassian/atlaskit/commits/ab1d6d6))
* fix; encoding and parsing of media nodes ([6a7817d](https://bitbucket.org/atlassian/atlaskit/commits/6a7817d))
* fix; make storyMediaProviderFactory a factory x2 (pass media-test-helpers as a first para ([2e68b31](https://bitbucket.org/atlassian/atlaskit/commits/2e68b31))
* fix; manually bump the major version of the core ([0891a79](https://bitbucket.org/atlassian/atlaskit/commits/0891a79))


* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute
will be ignored on rendering.

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941
* breaking; ED-1688

ISSUES CLOSED: ED-1688

## 16.9.2 (2017-05-16)

## 16.9.1 (2017-05-16)


* fix; refactoring to remove function binding not needed. ([7dd6127](https://bitbucket.org/atlassian/atlaskit/commits/7dd6127))
* fix; use latest mediacard ([6a1a560](https://bitbucket.org/atlassian/atlaskit/commits/6a1a560))

## 16.9.0 (2017-05-16)


* fix; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' ([5a164da](https://bitbucket.org/atlassian/atlaskit/commits/5a164da))
* fix; use media-test-helpers as a dependency, otherwise it won't be installed if editor-co ([404041d](https://bitbucket.org/atlassian/atlaskit/commits/404041d))


* feature; adding shortcut for undo-autoformatting ([6f61b78](https://bitbucket.org/atlassian/atlaskit/commits/6f61b78))


* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute
will be ignored on rendering.

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 16.8.3 (2017-05-15)


* fix; bump media card to latest major version ([4576eaa](https://bitbucket.org/atlassian/atlaskit/commits/4576eaa))

## 16.8.2 (2017-05-12)


* fix; cleaned up ([456deab](https://bitbucket.org/atlassian/atlaskit/commits/456deab))
* fix; cleanup ([1eed006](https://bitbucket.org/atlassian/atlaskit/commits/1eed006))
* fix; disable emoji button until the emoji popup is fixed ([dea398d](https://bitbucket.org/atlassian/atlaskit/commits/dea398d))
* fix; fixed mention query when editor is not in focus ([5ac5203](https://bitbucket.org/atlassian/atlaskit/commits/5ac5203))
* fix; set focus only if there was no focus before ([2b24723](https://bitbucket.org/atlassian/atlaskit/commits/2b24723))

## 16.8.1 (2017-05-11)

## 16.8.0 (2017-05-11)


* feature; reducing bundle size by updating dependencies ([4ded258](https://bitbucket.org/atlassian/atlaskit/commits/4ded258))

## 16.7.5 (2017-05-11)


* fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))
* fix; preventing unsubscribe from modifying array iterator, preventing 'unfinalized' statu ([26e42b8](https://bitbucket.org/atlassian/atlaskit/commits/26e42b8))
* fix; removing unnecessary state references, correctly spreading mediaState ([67ed91b](https://bitbucket.org/atlassian/atlaskit/commits/67ed91b))
* fix; setting mediaState immediately before subscribing to changes ([b56fa13](https://bitbucket.org/atlassian/atlaskit/commits/b56fa13))
* fix; use new mediacard selector for selected elements ([73a21fa](https://bitbucket.org/atlassian/atlaskit/commits/73a21fa))

## 16.7.3 (2017-05-10)

## 16.7.3 (2017-05-10)

## 16.7.2 (2017-05-10)

## 16.7.1 (2017-05-10)

## 16.7.0 (2017-05-09)


* fix; bump media components, use new upload view ([e6b6b1f](https://bitbucket.org/atlassian/atlaskit/commits/e6b6b1f))

## 16.6.1 (2017-05-09)


* fix; adding meaningful  atl text to images in editor. ([1083b5e](https://bitbucket.org/atlassian/atlaskit/commits/1083b5e))
* fix; fixed toolbarMention test ([b465d5c](https://bitbucket.org/atlassian/atlaskit/commits/b465d5c))
* fix; fixes a bug where code-mark was required in the schema in order for text-formatting ([a96e359](https://bitbucket.org/atlassian/atlaskit/commits/a96e359))
* fix; fixes tests in master ([4ce390a](https://bitbucket.org/atlassian/atlaskit/commits/4ce390a))

## 16.6.0 (2017-05-09)


* fix; fixed typo ([869de09](https://bitbucket.org/atlassian/atlaskit/commits/869de09))
* fix; updated title of the mention button ([4b02c62](https://bitbucket.org/atlassian/atlaskit/commits/4b02c62))


* feature; added atlassian.editor.mention.autoformatting analytics ([88a197e](https://bitbucket.org/atlassian/atlaskit/commits/88a197e))

## 16.5.0 (2017-05-09)

## 16.4.2 (2017-05-08)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; added creation of mentions by clicking on mentions toolbar icon ([c72c45e](https://bitbucket.org/atlassian/atlaskit/commits/c72c45e))

## 16.4.1 (2017-05-08)


* fix; fixed inline code behaviour when pressing backspace ([5ba82ae](https://bitbucket.org/atlassian/atlaskit/commits/5ba82ae))


* feature; upgrade Emoji version to released version with breaking style changes ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

## 16.4.0 (2017-05-06)


* fix; fixed language selection in code-block whith 4+ backticks ([be80b3e](https://bitbucket.org/atlassian/atlaskit/commits/be80b3e))


* feature; upgrade emoji. Remove need for style overrides. ([f2550dc](https://bitbucket.org/atlassian/atlaskit/commits/f2550dc))

## 16.3.5 (2017-05-05)


* fix; exception when removing media node with the X button. ([6372630](https://bitbucket.org/atlassian/atlaskit/commits/6372630))
* fix; first time typing @ in firefox doesn't trigger mentions ([caf9a4e](https://bitbucket.org/atlassian/atlaskit/commits/caf9a4e))


* feature; bump typestyle version ([5ac9717](https://bitbucket.org/atlassian/atlaskit/commits/5ac9717))

## 16.3.4 (2017-05-04)


* fix; tests ([52bfd82](https://bitbucket.org/atlassian/atlaskit/commits/52bfd82))

## 16.3.2 (2017-05-04)

## 16.3.2 (2017-05-03)

## 16.3.1 (2017-05-03)

## 16.2.0 (2017-05-03)


* fix; fix validate tslint commits ([728a7ee](https://bitbucket.org/atlassian/atlaskit/commits/728a7ee))

## 16.2.0 (2017-05-03)


* fix; do not dispatch transaction on blur in code-block and panel plugins ([741d5fd](https://bitbucket.org/atlassian/atlaskit/commits/741d5fd))
* fix; export default media state manager, media provider (rw) and media state from editor- ([77466f8](https://bitbucket.org/atlassian/atlaskit/commits/77466f8))
* fix; flickering of cards during picking and uploading. ([518eefc](https://bitbucket.org/atlassian/atlaskit/commits/518eefc))
* fix; harden code to run in NodeJS environment. ([cc78477](https://bitbucket.org/atlassian/atlaskit/commits/cc78477))
* fix; move unknown to complete ([d34f43a](https://bitbucket.org/atlassian/atlaskit/commits/d34f43a))
* fix; rename 'module' global to be NodeJS safe. ([f7e8bb0](https://bitbucket.org/atlassian/atlaskit/commits/f7e8bb0))
* fix; use common mediaProvider for both renderer and editor-core ([7ed6650](https://bitbucket.org/atlassian/atlaskit/commits/7ed6650))
* fix; use unknown only once ([622d1a5](https://bitbucket.org/atlassian/atlaskit/commits/622d1a5))


* feature; add helper for creating schema with order of marks and nodes preserved ([eca4720](https://bitbucket.org/atlassian/atlaskit/commits/eca4720))
* feature; add presentational attributes for media node toDOM, for static HTML rendering (e.g. ([9d43e9b](https://bitbucket.org/atlassian/atlaskit/commits/9d43e9b))

## 16.1.0 (2017-05-03)


* fix; move editor-relate media components into media-core (defaultMediaProvider, mediaStat ([c85be66](https://bitbucket.org/atlassian/atlaskit/commits/c85be66))
* fix; temporary use complete media status for uploading files ([9052812](https://bitbucket.org/atlassian/atlaskit/commits/9052812))
* fix; update hyperlink only when edititng popup is closed ([7e7ed4a](https://bitbucket.org/atlassian/atlaskit/commits/7e7ed4a))
* fix; use new media components ([a494fd5](https://bitbucket.org/atlassian/atlaskit/commits/a494fd5))

## 16.0.1 (2017-05-02)


* fix; fix changePanelType and removePanelType for fixes in panel structure. ([e2c31a9](https://bitbucket.org/atlassian/atlaskit/commits/e2c31a9))
* fix; fix that langrage picker should close if user blur it without selection language. ([8fb53fa](https://bitbucket.org/atlassian/atlaskit/commits/8fb53fa))
* fix; prevent focus of all tags in language picket except input. ([dac74e9](https://bitbucket.org/atlassian/atlaskit/commits/dac74e9))
* fix; setting value for boolean jsx attributes. ([f38e54a](https://bitbucket.org/atlassian/atlaskit/commits/f38e54a))


* feature; add support for compact behaviour, add media support to editor-hipchat, update editor-hipchat schema to one paragraph only ([f8fe04d](https://bitbucket.org/atlassian/atlaskit/commits/f8fe04d))
* feature; using atlaskit single-select component for language picker. ([3b7e94b](https://bitbucket.org/atlassian/atlaskit/commits/3b7e94b))

## 15.0.0 (2017-05-01)


* fix build errors ([7a297bd](https://bitbucket.org/atlassian/atlaskit/commits/7a297bd))


* bump editor-core version to trigger release. ([5039055](https://bitbucket.org/atlassian/atlaskit/commits/5039055))

## 15.0.0 (2017-05-01)


* fix; remove custom keymap handling for panels. ([1a48186](https://bitbucket.org/atlassian/atlaskit/commits/1a48186))


* feature; add unfinalized media state status. ([3c3a277](https://bitbucket.org/atlassian/atlaskit/commits/3c3a277))

## 15.0.0 (2017-04-28)


* fix; disable IE11 resize handles for panels. ([7c3da71](https://bitbucket.org/atlassian/atlaskit/commits/7c3da71))


* feature; media support in core, media support for editor-cq ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))


* breaking; Large number of changes in editor-core, playing it safe and marking as BC break.

## 14.6.4 (2017-04-27)

## 14.6.3 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 14.6.2 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 14.6.1 (2017-04-24)


* fix; blank space after mention should only be inserted is not already present. ([4a767e7](https://bitbucket.org/atlassian/atlaskit/commits/4a767e7))


* feature; added h6 support. ([cffc40a](https://bitbucket.org/atlassian/atlaskit/commits/cffc40a))

## 14.6.0 (2017-04-24)


* fix; set default of title and alt to be null so that it does not render redundant element ([eae2e6b](https://bitbucket.org/atlassian/atlaskit/commits/eae2e6b))

## 14.5.2 (2017-04-24)


* fix; exporting LanguagePicker ([a8dbbb6](https://bitbucket.org/atlassian/atlaskit/commits/a8dbbb6))
* fix; refactor hyperlink plugin to have one input panel ([71c3db1](https://bitbucket.org/atlassian/atlaskit/commits/71c3db1))


* feature; added alt and title to image. ([d7b2d63](https://bitbucket.org/atlassian/atlaskit/commits/d7b2d63))
* feature; triple enter to exit code block. ([7ed01f7](https://bitbucket.org/atlassian/atlaskit/commits/7ed01f7))

## 14.5.1 (2017-04-21)


* fix; adding hardbreaks in panel on enter key press. ([a32ae3b](https://bitbucket.org/atlassian/atlaskit/commits/a32ae3b))

## 14.5.0 (2017-04-20)


* feature; rewinded patched version to 0.20.3 in order to fix cursor problem ([50078a1](https://bitbucket.org/atlassian/atlaskit/commits/50078a1))

## 14.4.2 (2017-04-20)


* fix; mention query and emoji query should be dismissed after hitting "space" when there's ([91573b2](https://bitbucket.org/atlassian/atlaskit/commits/91573b2))

## 14.4.1 (2017-04-20)


* fix; fixing ordering for Escape keymap callbacks execution. ([3bd6026](https://bitbucket.org/atlassian/atlaskit/commits/3bd6026))

## 14.4.0 (2017-04-20)


* fix; updated ParseRule interface in prosemirror-model ([192f793](https://bitbucket.org/atlassian/atlaskit/commits/192f793))

## 14.3.4 (2017-04-19)


* fix; hyperlink floating toolbar should be visible when user uses Cmd-K to create a link. ([dcaead6](https://bitbucket.org/atlassian/atlaskit/commits/dcaead6))
* fix; link toolbar should be visible when its clicked. ([0301955](https://bitbucket.org/atlassian/atlaskit/commits/0301955))

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)


* fix; skipped 2 bb tests repated to pasting ([22774bc](https://bitbucket.org/atlassian/atlaskit/commits/22774bc))

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)


* fix; use commit for our own github repo instead of branch. ([d62dd7c](https://bitbucket.org/atlassian/atlaskit/commits/d62dd7c))
* fix; use prosemirror-view fork with commit id dependency on prosemirror-model fork ([fcd92f5](https://bitbucket.org/atlassian/atlaskit/commits/fcd92f5))


* feature; updated patches for prosemirror-view, removed unneseccaty tests for code block pastin ([18c26f4](https://bitbucket.org/atlassian/atlaskit/commits/18c26f4))

## 14.3.3 (2017-04-19)

## 14.3.2 (2017-04-19)


* fix; fix conversion of partial selection in code block when selection is towards end or i ([cf8faa7](https://bitbucket.org/atlassian/atlaskit/commits/cf8faa7))
* fix; fix empty link problem in hyperlink popup ([a5a89d2](https://bitbucket.org/atlassian/atlaskit/commits/a5a89d2))
* fix; keep focus inside editor when clicking on toolbar buttons ([eb58e21](https://bitbucket.org/atlassian/atlaskit/commits/eb58e21))
* fix; mention and emoji throws error when inserted ([c203acb](https://bitbucket.org/atlassian/atlaskit/commits/c203acb))
* fix; applied patch for prosemirror-view to fix pasting in IE11/Edge ([77c1a9c](https://bitbucket.org/atlassian/atlaskit/commits/77c1a9c))

## 14.3.1 (2017-04-18)

## 14.1.0 (2017-04-18)

## 14.1.0 (2017-04-18)

## 14.1.0 (2017-04-18)


* fix; cleanup ([9063a3c](https://bitbucket.org/atlassian/atlaskit/commits/9063a3c))
* fix; updated autoformatting to make in exclusive right after conversion ([c9311cd](https://bitbucket.org/atlassian/atlaskit/commits/c9311cd))

## 13.0.0 (2017-04-18)


* fix; fixing reges in input rule for string. ([853f0d0](https://bitbucket.org/atlassian/atlaskit/commits/853f0d0))
* fix; it should be possible to change selected lines of code block to another block type. ([db5bffb](https://bitbucket.org/atlassian/atlaskit/commits/db5bffb))
* fix; making ordered list list-item styles more specific to ensure they are not applied to ([aca7124](https://bitbucket.org/atlassian/atlaskit/commits/aca7124))
* lock version of popper.js to prevent regression. ([61a8698](https://bitbucket.org/atlassian/atlaskit/commits/61a8698))
* fix; mention and emoji needs to be added before blocktype plugin ([cee19b4](https://bitbucket.org/atlassian/atlaskit/commits/cee19b4))

## 12.0.3 (2017-04-13)

## 12.0.2 (2017-04-13)


* fix; make mono and link right exclusive, the rest - right inclusive ([d55f5c3](https://bitbucket.org/atlassian/atlaskit/commits/d55f5c3))
* fix; updated mention node to follow spec ([a97673e](https://bitbucket.org/atlassian/atlaskit/commits/a97673e))
* fix; use prosemirror-view fork without node_modules directory ([772e87a](https://bitbucket.org/atlassian/atlaskit/commits/772e87a))


* feature; add protocols to links ([2ae6a2c](https://bitbucket.org/atlassian/atlaskit/commits/2ae6a2c))


* breaking; Renamed attrs.displayName to attrs.text for mention node

ISSUES CLOSED: ED-1448

## 12.0.1 (2017-04-12)


* fix; ED-1370 removed forgotten singleton plugins. ([78737b2](https://bitbucket.org/atlassian/atlaskit/commits/78737b2))

## 11.0.0 (2017-04-12)


* fix; should not spread history plugin ([c7fb67f](https://bitbucket.org/atlassian/atlaskit/commits/c7fb67f))


* feature; removed reconfigure in plugin util ([77ef77b](https://bitbucket.org/atlassian/atlaskit/commits/77ef77b))
* feature; manually update core version. ([de54a2f](https://bitbucket.org/atlassian/atlaskit/commits/de54a2f))


* breaking; Removed singleton of plugins

## 10.8.1 (2017-04-12)


* fix; fixed codeBlock nodeSpec to pass tests ([5d7da72](https://bitbucket.org/atlassian/atlaskit/commits/5d7da72))
* fix; make sure core storybook is working with new plugin structure. ([ad25e0c](https://bitbucket.org/atlassian/atlaskit/commits/ad25e0c))
* fix; removed reconfigured in blocktype ([bb276ce](https://bitbucket.org/atlassian/atlaskit/commits/bb276ce))


* feature; BREAKING CHANGES: return plugins as an array instead of single plugin. ([32e5c6d](https://bitbucket.org/atlassian/atlaskit/commits/32e5c6d))

## 10.8.0 (2017-04-12)

## 10.7.1 (2017-04-12)


* fix; add check if subsup enable to ToolbarAdvancedTextFormatting ([31ccd56](https://bitbucket.org/atlassian/atlaskit/commits/31ccd56))
* fix; updating refs mechanism ([c4c849b](https://bitbucket.org/atlassian/atlaskit/commits/c4c849b))

## 10.7.0 (2017-04-11)

## 10.6.1 (2017-04-11)


* fix; removed supportedLanguages attr from codeBlock nodeSpec ([2cc1082](https://bitbucket.org/atlassian/atlaskit/commits/2cc1082))

## 10.6.0 (2017-04-11)

## 10.5.3 (2017-04-11)

## 10.5.2 (2017-04-11)

## 10.5.1 (2017-04-11)


* fix; add style for selected mention node ([81a4bcb](https://bitbucket.org/atlassian/atlaskit/commits/81a4bcb))
* fix; ([10d2631](https://bitbucket.org/atlassian/atlaskit/commits/10d2631))
* fix; nesting ordered list styles to be applied upto depth 9. ([9a3a818](https://bitbucket.org/atlassian/atlaskit/commits/9a3a818))
* fix; turn off code block fencing inside code block ([a2e12ed](https://bitbucket.org/atlassian/atlaskit/commits/a2e12ed))


* feature; adding styles for nested ordered lists. ([3cda0d6](https://bitbucket.org/atlassian/atlaskit/commits/3cda0d6))

## 10.5.0 (2017-04-10)


* feature; add ability to skip {} in test with backslash ([e763a5e](https://bitbucket.org/atlassian/atlaskit/commits/e763a5e))

## 10.4.6 (2017-04-10)


* fix; export NodeView from prosemirror declarations from editor-core ([444869a](https://bitbucket.org/atlassian/atlaskit/commits/444869a))

## 10.4.5 (2017-04-10)


* fix; emojiPlugin throws an error if there's no code mark in schema ([b363742](https://bitbucket.org/atlassian/atlaskit/commits/b363742))

## 10.4.4 (2017-04-10)


* fix; disable inputrules inside code ([8b65767](https://bitbucket.org/atlassian/atlaskit/commits/8b65767))

## 10.4.3 (2017-04-07)

## 10.4.2 (2017-04-07)


* fix; fix css override for emoji for compatibility with Bitbucket ([2a426c5](https://bitbucket.org/atlassian/atlaskit/commits/2a426c5))

## 10.4.1 (2017-04-06)


* fix; fix toggling for ordered list items. ([40182ec](https://bitbucket.org/atlassian/atlaskit/commits/40182ec))
* fix; fix un-toggling of nested lists. ([813f8ec](https://bitbucket.org/atlassian/atlaskit/commits/813f8ec))
* fix; removed override of paste function. added missing analytics for code autoformat ([d97d57c](https://bitbucket.org/atlassian/atlaskit/commits/d97d57c))


* feature; added supportedLanguages to codeblock node as attribute, filtering languages in dro ([3025754](https://bitbucket.org/atlassian/atlaskit/commits/3025754))

## 10.4.0 (2017-04-06)


* fix; add superscript/subscript toolbars to AdvancedTextFormatting ([02cc810](https://bitbucket.org/atlassian/atlaskit/commits/02cc810))
* fix; removed spaces in languageList map to make tests pass ([f7a4b5d](https://bitbucket.org/atlassian/atlaskit/commits/f7a4b5d))

## 10.3.0 (2017-04-06)


* feature; added support for languages used in Confluence ([a49a987](https://bitbucket.org/atlassian/atlaskit/commits/a49a987))

## 10.2.1 (2017-04-06)


* fix; align margins of paragraphs inside lists to list item margins. ([478840b](https://bitbucket.org/atlassian/atlaskit/commits/478840b))
* fix; fix clear-formatting when selection is empty and at the end of a block. ([6db9454](https://bitbucket.org/atlassian/atlaskit/commits/6db9454))
* fix; fixed bug that image, hr are not selectable. ([919c8e3](https://bitbucket.org/atlassian/atlaskit/commits/919c8e3))
* fix; moved removeStoredMarks in the end of the transaction chain ([318b57e](https://bitbucket.org/atlassian/atlaskit/commits/318b57e))


* feature; enter key-press on an empty nested list item should create a list item in parent li ([f1d14cc](https://bitbucket.org/atlassian/atlaskit/commits/f1d14cc))
* feature; mentions lozenge checks if user data has nickname and renders if present ([7be8bbe](https://bitbucket.org/atlassian/atlaskit/commits/7be8bbe))

## 10.1.0 (2017-04-05)

## 10.1.0 (2017-04-05)


* fix; added more comments and updated addMark in text-formatting ([9d98cc1](https://bitbucket.org/atlassian/atlaskit/commits/9d98cc1))
* fix; fix mention picker randomly jumps if attached above mention query ([0b733df](https://bitbucket.org/atlassian/atlaskit/commits/0b733df))
* fix; use Emoji typeahead count() available in 13.1.0 ([dfce4a2](https://bitbucket.org/atlassian/atlaskit/commits/dfce4a2))


* feature; fix space/enter special cases in emoji typeahead. Reintroduce missing emoji tests. ([8c1e7ba](https://bitbucket.org/atlassian/atlaskit/commits/8c1e7ba))
* feature; port current emoji editor support to new prosemirror ([bfebd34](https://bitbucket.org/atlassian/atlaskit/commits/bfebd34))
* feature; upgrade Emoji to latest, supporting latest storage format. ([813de18](https://bitbucket.org/atlassian/atlaskit/commits/813de18))
* feature; updated package.json to use Prosemirror v.20.1 ([06a039b](https://bitbucket.org/atlassian/atlaskit/commits/06a039b))

## 8.0.0 (2017-04-04)


* fix; fixes for IE for image-uploader plugin ([6236dea](https://bitbucket.org/atlassian/atlaskit/commits/6236dea))
* fix; removed prosemirror dependency from package.json ([d65b5b6](https://bitbucket.org/atlassian/atlaskit/commits/d65b5b6))


* feature; BREAKING CHANGE: upgraded prosemirror to 0.19.* ([a435da9](https://bitbucket.org/atlassian/atlaskit/commits/a435da9))

## 7.6.1 (2017-03-31)


* fix; bumped mentions in editor-core ([049a7b3](https://bitbucket.org/atlassian/atlaskit/commits/049a7b3))

## 7.6.0 (2017-03-23)


* feature; use atlaskit z-index variables to define z-index for floating panels ([19d565a](https://bitbucket.org/atlassian/atlaskit/commits/19d565a))

## 7.5.1 (2017-03-22)

## 7.5.1 (2017-03-22)


* fix; fix default for variation, and fix emoji tests in editor-core ([47f2ded](https://bitbucket.org/atlassian/atlaskit/commits/47f2ded))

## 7.4.0 (2017-03-21)

## 7.4.0 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; remove redundant dependencies and replace ak-* -> [@atlaskit](https://github.com/atlaskit)/* ([2ef4127](https://bitbucket.org/atlassian/atlaskit/commits/2ef4127))

## 7.3.0 (2017-03-21)


* fix; ensure variation is a number or undefined when passed to ResourcedEmoji ([a3a5459](https://bitbucket.org/atlassian/atlaskit/commits/a3a5459))


* feature; support emojis based only on a shortcut (legacy emoji support) ([78ecbab](https://bitbucket.org/atlassian/atlaskit/commits/78ecbab))

## 7.2.0 (2017-03-20)

## 7.1.0 (2017-03-20)

## 7.0.1 (2017-03-20)


* feature; use popper to position mention picker ([e9721d4](https://bitbucket.org/atlassian/atlaskit/commits/e9721d4))

## 6.0.0 (2017-03-20)


* fix; emojiProvider should be optional in Chrome ([6ea3d4c](https://bitbucket.org/atlassian/atlaskit/commits/6ea3d4c))
* fix; stop using attr for EmojiProvider. Fix styling for emoji placeholder. ([16e5c7f](https://bitbucket.org/atlassian/atlaskit/commits/16e5c7f))
* fix; use Emoji types where possible in editor-core ([ef13260](https://bitbucket.org/atlassian/atlaskit/commits/ef13260))


* feature; update editor-core to use asynchronous emojis. ([025c8a7](https://bitbucket.org/atlassian/atlaskit/commits/025c8a7))
* feature; bump editor-core version to stop linking in atlaskit build due to breaking changes. ([ef1c904](https://bitbucket.org/atlassian/atlaskit/commits/ef1c904))


* breaking; Configuration for Emoji is not backward compatible and will need to be updated.

ISSUES CLOSED: FS-781

## 5.2.0 (2017-03-17)

## 5.1.1 (2017-03-17)


* fix; fixing redo keymapping for mac from Cmd-Shift-Y to Cmd-Shift-Z. ([afac345](https://bitbucket.org/atlassian/atlaskit/commits/afac345))


* feature; update behavior of code to match with the spec ([9db0ae5](https://bitbucket.org/atlassian/atlaskit/commits/9db0ae5))

## 5.1.0 (2017-03-16)


* feature; don't show advanced text formatting button if we don't have anything to draw there ([7f1f008](https://bitbucket.org/atlassian/atlaskit/commits/7f1f008))

## 4.0.0 (2017-03-15)


* fix; when converting multiple blocks to code block a single code block should get generat ([53a0f2d](https://bitbucket.org/atlassian/atlaskit/commits/53a0f2d))


null rename mono to code ([1084700](https://bitbucket.org/atlassian/atlaskit/commits/1084700))


* breaking; Removed mono mark in favour of code mark

## 3.10.0 (2017-03-15)

## 3.9.2 (2017-03-15)

## 3.9.1 (2017-03-15)

## 3.8.0 (2017-03-14)

## 3.8.0 (2017-03-14)


* fix; update the way editor-core exposes test-helpers and types ([f756f11](https://bitbucket.org/atlassian/atlaskit/commits/f756f11))

## 3.7.0 (2017-03-14)

## 3.6.3 (2017-03-14)


* fix; fix prosemirror proxy type info in editor-core ([fbb65f2](https://bitbucket.org/atlassian/atlaskit/commits/fbb65f2))

## 3.6.2 (2017-03-13)

## 3.6.1 (2017-03-13)


* fix; fix DND/Paste behaviour in Safari, fix errors in IE ([fa15767](https://bitbucket.org/atlassian/atlaskit/commits/fa15767))
* fix; add missing type info in editor-core ([025fa29](https://bitbucket.org/atlassian/atlaskit/commits/025fa29))


* feature; adding clear-formatting option to advance toolbar formatting dropdown and clear-for ([2149b59](https://bitbucket.org/atlassian/atlaskit/commits/2149b59))

## 3.6.0 (2017-03-13)


* fix; add missing key prop for ToolbarBlockType ([94dd489](https://bitbucket.org/atlassian/atlaskit/commits/94dd489))
* fix; revert the refactoring in ToolbarBlockType to fix broken unit test cases. ([efa7cff](https://bitbucket.org/atlassian/atlaskit/commits/efa7cff))


* feature; adding keyboard mapping for link. ([842c8dc](https://bitbucket.org/atlassian/atlaskit/commits/842c8dc))
* feature; dummy commit to mark a release in editor-core. ([8b50189](https://bitbucket.org/atlassian/atlaskit/commits/8b50189))

## 3.5.0 (2017-03-09)


* fix; restrict 'heading' node to make link the only allowed mark in the JSON schema. ([3278459](https://bitbucket.org/atlassian/atlaskit/commits/3278459))


* feature; add 'code' mark to the JSON schema. ([c3b1f1f](https://bitbucket.org/atlassian/atlaskit/commits/c3b1f1f))
* feature; adding blank space at the end when adding monospace using input rules. ([1ad0b7b](https://bitbucket.org/atlassian/atlaskit/commits/1ad0b7b))

## 3.4.0 (2017-03-08)

## 3.3.1 (2017-03-07)

## 3.3.0 (2017-03-07)


* fix; commenting out breaking unit test cases. ([a916441](https://bitbucket.org/atlassian/atlaskit/commits/a916441))
* fix; remove 'image_node' from the JSON schema ([8e03f06](https://bitbucket.org/atlassian/atlaskit/commits/8e03f06))
* fix; remove un-necessary variable assignment. ([89e22ad](https://bitbucket.org/atlassian/atlaskit/commits/89e22ad))
* fix; update media node spec. ([b04daf0](https://bitbucket.org/atlassian/atlaskit/commits/b04daf0))

## 3.2.5 (2017-03-07)

## 3.2.4 (2017-03-07)


* fix; prevent setting selection outside of document ([bb500a1](https://bitbucket.org/atlassian/atlaskit/commits/bb500a1))


* Add JSON schema for v1 document structure. ([6dd3ab7](https://bitbucket.org/atlassian/atlaskit/commits/6dd3ab7))

## 3.2.3 (2017-03-07)


* fix; fixes blowing up the editor when it's detached from dom ([1416403](https://bitbucket.org/atlassian/atlaskit/commits/1416403))

## 3.2.2 (2017-03-06)

## 3.2.1 (2017-03-06)


* fix; cleanup ([c07f305](https://bitbucket.org/atlassian/atlaskit/commits/c07f305))
* fix; corrected variable name ([6034a00](https://bitbucket.org/atlassian/atlaskit/commits/6034a00))


* feature; completed changes for hyperlink functionality. ([bc8bd99](https://bitbucket.org/atlassian/atlaskit/commits/bc8bd99))

## 3.2.0 (2017-03-06)


* fix; fixes unlink with 2 links in the document ([ad346c5](https://bitbucket.org/atlassian/atlaskit/commits/ad346c5))


* feature; bumping the [@atlaskit](https://github.com/atlaskit)/mention dependency ([ed78e82](https://bitbucket.org/atlassian/atlaskit/commits/ed78e82))

## 3.1.0 (2017-03-06)


* fix; changing redo shortcut for MAC to Cmd-Shift-Y and for Windows to Ctrl-Y. ([c480e46](https://bitbucket.org/atlassian/atlaskit/commits/c480e46))
* fix; reduce spacing between formatting bar buttons to 4px. ([e14c0cc](https://bitbucket.org/atlassian/atlaskit/commits/e14c0cc))


* feature; changing key-map for redo to Ctrl-Shift-Y. ([0eff95c](https://bitbucket.org/atlassian/atlaskit/commits/0eff95c))
* feature; replace ak-* with [@atlaskit](https://github.com/atlaskit)/* packages in editor-core ([e5abf88](https://bitbucket.org/atlassian/atlaskit/commits/e5abf88))

## 2.0.0 (2017-03-02)


* fix; updating media-core ([9d01b05](https://bitbucket.org/atlassian/atlaskit/commits/9d01b05))


null Changing the way editor-core and test-helper are built ([95490c7](https://bitbucket.org/atlassian/atlaskit/commits/95490c7))


* breaking; importing test-helper like so "import { something } from @atlaskit/editor-core/test-helper" will no longer work. Now it requires imports to be written like so: "import { something } from @atlaskit/editor-core/src/test-helper"

ISSUES CLOSED: FAB-2606

## 1.20.0 (2017-03-02)

## 1.19.4 (2017-03-01)


* fix; fix newest editor-core errors in editor-desktop ([2a17e90](https://bitbucket.org/atlassian/atlaskit/commits/2a17e90))


* feature; use [@atlaskit](https://github.com/atlaskit)/emoji instead of ak-emoji in editor-core ([5aa5b38](https://bitbucket.org/atlassian/atlaskit/commits/5aa5b38))

## 1.19.3 (2017-02-28)


* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.19.1 (2017-02-28)


* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

## 1.19.1 (2017-02-28)


* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 1.19.0 (2017-02-28)

## 1.18.1 (2017-02-28)

## 1.18.0 (2017-02-27)


* fix; change in hyperlink plugin to add missing state variable toolbarVisible. ([c261e6f](https://bitbucket.org/atlassian/atlaskit/commits/c261e6f))


* feature; adding small arrow to advance text styling dropwodn menu trigger. ([0f728d9](https://bitbucket.org/atlassian/atlaskit/commits/0f728d9))

## 1.17.2 (2017-02-27)


* another cleanup ([e6d086e](https://bitbucket.org/atlassian/atlaskit/commits/e6d086e))
* cleanup ([060c9a7](https://bitbucket.org/atlassian/atlaskit/commits/060c9a7))
* undo fix in markdown-inputrules ([39e105b](https://bitbucket.org/atlassian/atlaskit/commits/39e105b))
* undo with Cmd+Z for IE11 fix ([be45a6c](https://bitbucket.org/atlassian/atlaskit/commits/be45a6c))
* updated undo when pasting a content ([a6cd5f3](https://bitbucket.org/atlassian/atlaskit/commits/a6cd5f3))
* fix; fixed bug that up and down not working in lists ([e9efd74](https://bitbucket.org/atlassian/atlaskit/commits/e9efd74))


* feature; Remove plugins update call for Panel, Hyperlink and Code-block when editor is focused ([dd36501](https://bitbucket.org/atlassian/atlaskit/commits/dd36501))
* updated dependency version ([b192339](https://bitbucket.org/atlassian/atlaskit/commits/b192339))

## 1.17.1 (2017-02-23)

## 1.17.0 (2017-02-23)


* Position tooltip for ToolbarBlock and AdcancedTextFormatting closer to the parent ([a7d42ac](https://bitbucket.org/atlassian/atlaskit/commits/a7d42ac))
* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.16.0 (2017-02-22)


* inheritate font style from BB ([35467c0](https://bitbucket.org/atlassian/atlaskit/commits/35467c0))

## 1.15.4 (2017-02-22)


* autoconversion of code block in a nested structure ([ed8d65a](https://bitbucket.org/atlassian/atlaskit/commits/ed8d65a))
* cleanup ([6dead5a](https://bitbucket.org/atlassian/atlaskit/commits/6dead5a))


* Allow append an image on text selection or node selection. ([e86fca5](https://bitbucket.org/atlassian/atlaskit/commits/e86fca5))
* Disable hyperlink button if hyperlink is not compatible with current node. ([567e6d1](https://bitbucket.org/atlassian/atlaskit/commits/567e6d1))
* Hide and show image icon when it's available to be insert or not. ([6e2bec0](https://bitbucket.org/atlassian/atlaskit/commits/6e2bec0))

## 1.15.3 (2017-02-21)


* Fix visual regression: restore margins between ToolbarButtons ([6c23197](https://bitbucket.org/atlassian/atlaskit/commits/6c23197))

## 1.15.2 (2017-02-20)


* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))
* Use atlaskit tooltips instead of browser native tooltips ([d0018eb](https://bitbucket.org/atlassian/atlaskit/commits/d0018eb))
* fix; Fixed bug that there is a border for code block in IE11. ([8748634](https://bitbucket.org/atlassian/atlaskit/commits/8748634))

## 1.15.1 (2017-02-20)

## 1.15.0 (2017-02-20)

## 1.14.0 (2017-02-19)


* fix; Fixed bug that converting to code block when text does not start with fence ([7f40722](https://bitbucket.org/atlassian/atlaskit/commits/7f40722))
* fix; Hyper link toolbar should not disappear as user starts typing in toolbar input. ([e60b43b](https://bitbucket.org/atlassian/atlaskit/commits/e60b43b))
* fix; Panel subscribers should not be invoked for a dom event in editor which is not inside ([94bf5d8](https://bitbucket.org/atlassian/atlaskit/commits/94bf5d8))

## 1.13.2 (2017-02-17)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.13.1 (2017-02-16)


* fix; Bumping mention to latest version ([81e5d34](https://bitbucket.org/atlassian/atlaskit/commits/81e5d34))


* feature; update code block with formatted language. ([d679009](https://bitbucket.org/atlassian/atlaskit/commits/d679009))

## 1.13.0 (2017-02-16)


* feature; Added analytics track for fence language format. ([683e692](https://bitbucket.org/atlassian/atlaskit/commits/683e692))

## 1.12.1 (2017-02-16)


* feature; Allow user to input language using fence code format. ([58639da](https://bitbucket.org/atlassian/atlaskit/commits/58639da))

## 1.4.0 (2017-02-16)


* fix; Use prosemirror fork in editor with backported fix for not editable nodes ([2ab7015](https://bitbucket.org/atlassian/atlaskit/commits/2ab7015))
* fix; Exports IsScopedToCloudClientId type from src/media ([c287554](https://bitbucket.org/atlassian/atlaskit/commits/c287554))

## 1.4.0 (2017-02-16)

## 1.4.0 (2017-02-16)

## 1.4.0 (2017-02-16)


* fix; Fix bug that cannot create new p if only contains mention. ([b0f18c2](https://bitbucket.org/atlassian/atlaskit/commits/b0f18c2))

## 1.4.0 (2017-02-15)


* Bumping mention version ([5eab5b2](https://bitbucket.org/atlassian/atlaskit/commits/5eab5b2))
* Fixes styling of mention-node ([bb1a878](https://bitbucket.org/atlassian/atlaskit/commits/bb1a878))
* Mentions shouldn't break on two lines ([867b873](https://bitbucket.org/atlassian/atlaskit/commits/867b873))
* Updating dependencies after rebasing ([978f11b](https://bitbucket.org/atlassian/atlaskit/commits/978f11b))


* feature; Allow triple ticks and enter to create code block ([bb04293](https://bitbucket.org/atlassian/atlaskit/commits/bb04293))
* Improving mention plugin ([e93e57e](https://bitbucket.org/atlassian/atlaskit/commits/e93e57e))

## 1.4.0 (2017-02-15)


* Link tooltip position is broken ([e155079](https://bitbucket.org/atlassian/atlaskit/commits/e155079))


* feature; Advance text formatting button should be disabled if current selection is code block. ([9b51b63](https://bitbucket.org/atlassian/atlaskit/commits/9b51b63))

## 1.4.0 (2017-02-15)

## 1.4.0 (2017-02-15)


* fix; Removing blur handling from mention picker. ([fb97160](https://bitbucket.org/atlassian/atlaskit/commits/fb97160))

## 1.4.0 (2017-02-15)


* Cursor blinks in IE even if it's under ToolbarBlockType ([5bc498f](https://bitbucket.org/atlassian/atlaskit/commits/5bc498f))


* feature; Changes in hyperlink and code-block floating toolbars to hide them when editor is blu ([d7ed561](https://bitbucket.org/atlassian/atlaskit/commits/d7ed561))
* feature; Language picker should disappear when editor is blur. ([b0a4417](https://bitbucket.org/atlassian/atlaskit/commits/b0a4417))
* feature; Mention to dismiss when editor is blur. ([78b394f](https://bitbucket.org/atlassian/atlaskit/commits/78b394f))
* feature; Added alias to language list. ([3140001](https://bitbucket.org/atlassian/atlaskit/commits/3140001))

## 1.3.1 (2017-02-14)

## 1.3.1 (2017-02-14)


* Load clientside JS for JIRA issue collector only on feedback button click ([8661b3b](https://bitbucket.org/atlassian/atlaskit/commits/8661b3b))
* Remove modal-dialog dependency for editor-core ([22c2248](https://bitbucket.org/atlassian/atlaskit/commits/22c2248))
* Update editor-core test: add jQuery for feedback ([dd7e181](https://bitbucket.org/atlassian/atlaskit/commits/dd7e181))
* Use JIRA issue collector instead of wufoo ([407f234](https://bitbucket.org/atlassian/atlaskit/commits/407f234))
* fix; add comma back. ([139c43b](https://bitbucket.org/atlassian/atlaskit/commits/139c43b))
* Use spinner in ToolbarFeedback while JIRA issue collector has not been fully loaded ([674f772](https://bitbucket.org/atlassian/atlaskit/commits/674f772))


* feature; make sure up and down work with non test block nested ([fe0e675](https://bitbucket.org/atlassian/atlaskit/commits/fe0e675))
* feature; Panel floating toolbar should disappear when editor is blur. ([3850610](https://bitbucket.org/atlassian/atlaskit/commits/3850610))
* feature; up and down should create paragraph and have right block type shown ([82dbe30](https://bitbucket.org/atlassian/atlaskit/commits/82dbe30))

## 1.3.0 (2017-02-13)


* feature; add EditorServicesConfig and media related interfaces. ([4ac9ea6](https://bitbucket.org/atlassian/atlaskit/commits/4ac9ea6))
* feature; Make sure up and down works on non text block. ([2860417](https://bitbucket.org/atlassian/atlaskit/commits/2860417))
* feature; Should not create a new p if empty text content ([2d26463](https://bitbucket.org/atlassian/atlaskit/commits/2d26463))

## 1.2.3 (2017-02-13)

## 1.2.3 (2017-02-13)


* Restore FloatingToolbar component of editor-core ([d6d07c8](https://bitbucket.org/atlassian/atlaskit/commits/d6d07c8))
* Use modal-dialog instead of FloatingToolbar for feedback panel ([eae6d8c](https://bitbucket.org/atlassian/atlaskit/commits/eae6d8c))


* feature; Removed double enter to exit code block ([2b21126](https://bitbucket.org/atlassian/atlaskit/commits/2b21126))

## 1.2.2 (2017-02-10)

## 1.2.1 (2017-02-10)


* fix; Fixes typing in the beginning of the link becomes a part of a link ([a873987](https://bitbucket.org/atlassian/atlaskit/commits/a873987))
* fix; Fixing styles of selected option in panel floating toolbar. ([40adb05](https://bitbucket.org/atlassian/atlaskit/commits/40adb05))


* feature; add universal Editor config types. ([9bcbe3f](https://bitbucket.org/atlassian/atlaskit/commits/9bcbe3f))
* feature; improve experience of code block. Implementation from Jyoti. ([0f07a6c](https://bitbucket.org/atlassian/atlaskit/commits/0f07a6c))


null Removed redundant comments code. ([66cdc26](https://bitbucket.org/atlassian/atlaskit/commits/66cdc26))

## 1.2.0 (2017-02-09)


* fix; switch some editor-core deps to [@atlaskit](https://github.com/atlaskit)/ ([34337fa](https://bitbucket.org/atlassian/atlaskit/commits/34337fa))
* fix; Added back missing panel changes. ([cbe9e44](https://bitbucket.org/atlassian/atlaskit/commits/cbe9e44))
* fix; Fixing hover style of icons in panel floating toolbar. ([3c74821](https://bitbucket.org/atlassian/atlaskit/commits/3c74821))
* fix; Toolbar dropdown for advance test formatting options should close when an option is cl ([86711ca](https://bitbucket.org/atlassian/atlaskit/commits/86711ca))


* feature; Moveup to create a new paragraph. ([3f6a62e](https://bitbucket.org/atlassian/atlaskit/commits/3f6a62e))

## 1.1.3 (2017-02-08)


* Horizontal scrollbar in IE11/Safari for FloatingToolbar ([219e763](https://bitbucket.org/atlassian/atlaskit/commits/219e763))

## 1.1.2 (2017-02-08)


* Disabling hyperlink detection on paste ([98d20cd](https://bitbucket.org/atlassian/atlaskit/commits/98d20cd))

## 1.1.1 (2017-02-07)


* feature; arrow down will create a new line below ([6aadf7d](https://bitbucket.org/atlassian/atlaskit/commits/6aadf7d))
* feature; Changes in floating toolbar for panels. ([8dcbb60](https://bitbucket.org/atlassian/atlaskit/commits/8dcbb60))
* feature; Create new paragraph on only one level up. ([f99952a](https://bitbucket.org/atlassian/atlaskit/commits/f99952a))
* feature; Improving the user experience of floating panel toolbar. ([a90b139](https://bitbucket.org/atlassian/atlaskit/commits/a90b139))
* feature; Moveup to create a new paragraph. ([46bb341](https://bitbucket.org/atlassian/atlaskit/commits/46bb341))

## 1.1.0 (2017-02-07)


* Horizontal scrollbar in IE11 for FloatingToolbar ([e2dd757](https://bitbucket.org/atlassian/atlaskit/commits/e2dd757))
* fix; Fixes disappearing of mention mark on iOS ([978804b](https://bitbucket.org/atlassian/atlaskit/commits/978804b))


* feature; improve experience of code block floating toolbar. ([abf7f17](https://bitbucket.org/atlassian/atlaskit/commits/abf7f17))
* feature; Moveup to create a new paragraph. ([8b5616f](https://bitbucket.org/atlassian/atlaskit/commits/8b5616f))

## 1.0.6 (2017-02-06)


* fix; fix failing test. ([811002b](https://bitbucket.org/atlassian/atlaskit/commits/811002b))
* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))


* feature; Adding panel feature to editor-core. ([900c3db](https://bitbucket.org/atlassian/atlaskit/commits/900c3db))
* feature; Adding toolbar option for monospace and strikethrough. ([ed44fb0](https://bitbucket.org/atlassian/atlaskit/commits/ed44fb0))
* feature; More changes to toolbar option of monospace and strikethrough. ([43aaf91](https://bitbucket.org/atlassian/atlaskit/commits/43aaf91))
