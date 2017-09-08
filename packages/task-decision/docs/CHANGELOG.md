# @atlaskit/task-decision

## 3.7.0 (2017-09-06)

* feature; add toolbar button support for actions/decisions (issues closed: fs-1342) ([faddb0b](https://bitbucket.org/atlassian/atlaskit/commits/faddb0b))
## 3.6.0 (2017-09-05)

* feature; visual updates based on action and decision designs. (issues closed: fs-1232) ([8b2126f](https://bitbucket.org/atlassian/atlaskit/commits/8b2126f))
## 3.5.5 (2017-09-01)

* bug fix; break and wrap text that doesn't fit on a full line (e.g. link) (issues closed: fs-1300) ([2f8d413](https://bitbucket.org/atlassian/atlaskit/commits/2f8d413))





## 3.5.4 (2017-08-29)

* bug fix; results clears if initialQuery prop changes. Consistent spinner. (issues closed: fs-1315) ([0933f72](https://bitbucket.org/atlassian/atlaskit/commits/0933f72))
## 3.5.3 (2017-08-25)

* bug fix; show placeholder with ellipsis it it will overflow (issues closed: fs-1286) ([d18ccba](https://bitbucket.org/atlassian/atlaskit/commits/d18ccba))
## 3.5.2 (2017-08-25)

* bug fix; direct import date-fns for support classes too (issues closed: fs-1280) ([0dfa9e8](https://bitbucket.org/atlassian/atlaskit/commits/0dfa9e8))
* bug fix; switch to lighter weight date-fns (issues closed: fs-1281) ([dd21922](https://bitbucket.org/atlassian/atlaskit/commits/dd21922))
## 3.5.1 (2017-08-23)

* bug fix; optimistically notify when a task state changes. (issues closed: fs-1285) ([d9a4557](https://bitbucket.org/atlassian/atlaskit/commits/d9a4557))
## 3.5.0 (2017-08-23)

* feature; support emptyComponent and errorComponent for ResourceItemList (issues closed: fs-1292) ([4b012e2](https://bitbucket.org/atlassian/atlaskit/commits/4b012e2))
## 3.4.1 (2017-08-18)

* bug fix; add missing dependency from InfiniteScroll ([e43126c](https://bitbucket.org/atlassian/atlaskit/commits/e43126c))
## 3.4.0 (2017-08-17)

* feature; support retry for recentUpdates if expecting item is not found. (issues closed: fs-1284) ([ed9af1e](https://bitbucket.org/atlassian/atlaskit/commits/ed9af1e))
## 3.3.1 (2017-08-17)

* bug fix; ensure RendererContext is passed to renderDocument prop when rendering a ResourcedIt (issues closed: fs-1282) ([ec2a02a](https://bitbucket.org/atlassian/atlaskit/commits/ec2a02a))
## 3.3.0 (2017-08-17)

* feature; support infinite scroll for ResourcedItemList (issues closed: fs-1268) ([a7bbfe2](https://bitbucket.org/atlassian/atlaskit/commits/a7bbfe2))
## 3.2.0 (2017-08-17)

* feature; support refreshing of ResourcedItemList and task state updates from an external tri (issues closed: fs-1267) ([bc2d4f1](https://bitbucket.org/atlassian/atlaskit/commits/bc2d4f1))
## 3.1.2 (2017-08-17)

* bug fix; fix exporting of support json data (issues closed: fs-1274) ([b1ec12f](https://bitbucket.org/atlassian/atlaskit/commits/b1ec12f))
## 3.1.1 (2017-08-16)

* bug fix; fix incorrect prop type for taskDecisionProvider - it should be a Promise<TaskDecisi (issues closed: fs-1274) ([6a11027](https://bitbucket.org/atlassian/atlaskit/commits/6a11027))
## 3.1.0 (2017-08-14)

* feature; make default query ordering CREATION_DATE (issues closed: fs-1259) ([96e546d](https://bitbucket.org/atlassian/atlaskit/commits/96e546d))

* bug fix; export ResourcedItemList ([4385f29](https://bitbucket.org/atlassian/atlaskit/commits/4385f29))
* feature; add support for grouping items by sort date in ResourcedItemList. (issues closed: fs-1259) ([dbff6cf](https://bitbucket.org/atlassian/atlaskit/commits/dbff6cf))
## 3.0.0 (2017-08-14)

* breaking; TaskDecisionProvider has new required methods. ([9e48cf4](https://bitbucket.org/atlassian/atlaskit/commits/9e48cf4))
* breaking; support service integration with tasks and all item types (issues closed: fs-1249) ([9e48cf4](https://bitbucket.org/atlassian/atlaskit/commits/9e48cf4))


## 2.4.0 (2017-08-09)

* feature; adding support for placeholders ([d9edd1a](https://bitbucket.org/atlassian/atlaskit/commits/d9edd1a))
## 2.3.0 (2017-08-09)



* feature; adding usupport to fetch initial state and toggle state ([416ce4e](https://bitbucket.org/atlassian/atlaskit/commits/416ce4e))
* feature; adding resourcedtaskitem ([1c8cccb](https://bitbucket.org/atlassian/atlaskit/commits/1c8cccb))
## 2.2.3 (2017-08-08)

* bug fix; import es5 renderer ([221da82](https://bitbucket.org/atlassian/atlaskit/commits/221da82))
## 2.2.2 (2017-08-07)

* bug fix; fix correct dep for @atlaskit/spinner ([155979d](https://bitbucket.org/atlassian/atlaskit/commits/155979d))
## 2.2.1 (2017-08-03)

* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))
## 2.2.0 (2017-08-02)

* bug fix; fix renderer dependency ([2ff20ff](https://bitbucket.org/atlassian/atlaskit/commits/2ff20ff))

* bug fix; fix type export for serviceDecision in test-data ([4ad5bac](https://bitbucket.org/atlassian/atlaskit/commits/4ad5bac))
* feature; add support for service integration for decisions (issues closed: fs-1187) ([6683f58](https://bitbucket.org/atlassian/atlaskit/commits/6683f58))
## 2.1.3 (2017-08-01)

* bug fix; using new renderer from editor-core ([32726cf](https://bitbucket.org/atlassian/atlaskit/commits/32726cf))




## 2.1.2 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.1.1 (2017-07-20)


* fix; fixes some IE11-bugs ([de3a2ce](https://bitbucket.org/atlassian/atlaskit/commits/de3a2ce))

## 2.1.0 (2017-07-20)


* feature; adding taskitem and tasklist ([7385442](https://bitbucket.org/atlassian/atlaskit/commits/7385442))

## 1.0.0 (2017-07-19)


* feature; new task-decision component. With decision components ([ea94187](https://bitbucket.org/atlassian/atlaskit/commits/ea94187))
