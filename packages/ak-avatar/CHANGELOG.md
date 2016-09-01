<a name="2.3.0"></a>
# 2.3.0 (2016-08-31)



<a name="ak-avatar@2.2.0"></a>
# ak-avatar@2.2.0 (2016-08-29)


### Features

* Make babel-runtime part of the package, so it can be de-duplicated on build by the consumer ([9863540](https://bitbucket.org/atlassian/atlaskit/commits/9863540))



<a name="ak-avatar@2.1.0"></a>
# ak-avatar@2.1.0 (2016-08-26)



<a name="ak-avatar@2.0.1"></a>
## ak-avatar@2.0.1 (2016-08-25)


### Bug Fixes

* **package:** Publish an extra commonjs-only (no UMD) bundle for webpack consumption. ([bb0a3ce](https://bitbucket.org/atlassian/atlaskit/commits/bb0a3ce))


### Features

* Fix various bugs in ak-editor-bitbucket, upgrade skatejs everywhere. ([122b23a](https://bitbucket.org/atlassian/atlaskit/commits/122b23a))



<a name="ak-avatar@2.0.0"></a>
# ak-avatar@2.0.0 (2016-08-18)


### Chores

* **bump:** Bumped avatar version 1.2.0 so we can release 2.0.0 with this commit ([8a76dee](https://bitbucket.org/atlassian/atlaskit/commits/8a76dee))


### Features

* **component:** BREAKING CHANGE: Actually a dummy commit to release avatar, due to a broken release ([6816f30](https://bitbucket.org/atlassian/atlaskit/commits/6816f30))


### BREAKING CHANGES

* component: dummy commit
* bump: releasing v2.0.0



<a name="ak-avatar@0.14.0"></a>
# ak-avatar@0.14.0 (2016-08-17)


### Bug Fixes

* **component:** fixed bug with loading behaviour and styles ([9b99f5c](https://bitbucket.org/atlassian/atlaskit/commits/9b99f5c))
* **component:** Fixed introduced but where backgrounds were no longer tranparent on loaded avatars ([182e08e](https://bitbucket.org/atlassian/atlaskit/commits/182e08e))


### Features

* **component:** Added loading to Avatars so that they show a grey background and fadein once loaded ([f43d037](https://bitbucket.org/atlassian/atlaskit/commits/f43d037))



<a name="ak-avatar@0.13.3"></a>
## ak-avatar@0.13.3 (2016-08-05)


### Bug Fixes

* **component:** Fixed alt of img, added test for it ([d3e4b34](https://bitbucket.org/atlassian/atlaskit/commits/d3e4b34))
* **package:** Fix package dependencies on github packages that were removed ([1c1a99e](https://bitbucket.org/atlassian/atlaskit/commits/1c1a99e))


### Features

* **component:** add user prop, update other props to use prop.string ([1d58cda](https://bitbucket.org/atlassian/atlaskit/commits/1d58cda))
* **component:** Added presence to ak-avatar, some minor cleanups ([9bc4a61](https://bitbucket.org/atlassian/atlaskit/commits/9bc4a61))
* **component:** Added the fullName property with associated tests and stories ([e5777dd](https://bitbucket.org/atlassian/atlaskit/commits/e5777dd))



<a name="ak-avatar@0.13.2"></a>
## ak-avatar@0.13.2 (2016-07-18)


### Bug Fixes

* **skate:** SkateJS update to beta.10 ([620034a](https://bitbucket.org/atlassian/atlaskit/commits/620034a))



<a name="ak-avatar@0.13.1"></a>
## ak-avatar@0.13.1 (2016-07-12)



<a name="ak-avatar@0.13.0"></a>
# ak-avatar@0.13.0 (2016-07-11)



<a name="ak-avatar@0.12.7"></a>
## ak-avatar@0.12.7 (2016-07-11)


### Bug Fixes

* **sizes:** there are only 5 sizes ([ed9d5dc](https://bitbucket.org/atlassian/atlaskit/commits/ed9d5dc))



<a name="ak-avatar@0.12.6"></a>
## ak-avatar@0.12.6 (2016-07-08)



<a name="ak-avatar@0.12.1"></a>
## ak-avatar@0.12.1 (2016-07-07)


### Bug Fixes

* **jsx:** pragma ([b9edb0c](https://bitbucket.org/atlassian/atlaskit/commits/b9edb0c))



<a name="ak-avatar@0.12.0"></a>
# ak-avatar@0.12.0 (2016-07-04)



<a name="ak-avatar@0.11.1"></a>
## ak-avatar@0.11.1 (2016-06-29)



<a name="ak-avatar@0.11.0"></a>
# ak-avatar@0.11.0 (2016-06-29)


### Bug Fixes

* Changed ak-avatar to use skate's state function to set it properties ([feaf9e3](https://bitbucket.org/atlassian/atlaskit/commits/feaf9e3))



<a name="ak-avatar@0.10.5"></a>
## ak-avatar@0.10.5 (2016-06-27)


### Bug Fixes

* Added ![defined] rule for ak-avatar and vertical align to remove the extra gap from imgs ([bec42ab](https://bitbucket.org/atlassian/atlaskit/commits/bec42ab))



<a name="ak-avatar@0.10.4"></a>
## ak-avatar@0.10.4 (2016-06-27)


### Bug Fixes

* Added some stories for ak-avatar demo ([545f2f0](https://bitbucket.org/atlassian/atlaskit/commits/545f2f0))
* **share styles:** use * until we are published ([a2792e5](https://bitbucket.org/atlassian/atlaskit/commits/a2792e5))



<a name="ak-avatar@0.10.3"></a>
## ak-avatar@0.10.3 (2016-06-24)


### Bug Fixes

* **akutil-shared-styles:** Depend on correct version of the shared styles ([fb64e0e](https://bitbucket.org/atlassian/atlaskit/commits/fb64e0e))



<a name="ak-avatar@0.10.2"></a>
## ak-avatar@0.10.2 (2016-06-24)


### Bug Fixes

* Added stories for ak-avatar ([9154cbd](https://bitbucket.org/atlassian/atlaskit/commits/9154cbd))
* Seperated out ak-avatar constructor and definition ([b86dfea](https://bitbucket.org/atlassian/atlaskit/commits/b86dfea))



<a name="ak-avatar@0.10.1"></a>
## ak-avatar@0.10.1 (2016-06-23)


### Bug Fixes

* Moved akutil-react to a dev-dependency for ak-avatar ([add6077](https://bitbucket.org/atlassian/atlaskit/commits/add6077))
* Reverting previous test commit ([7190efc](https://bitbucket.org/atlassian/atlaskit/commits/7190efc))
* Test commit to test eslint fix ([a879b5f](https://bitbucket.org/atlassian/atlaskit/commits/a879b5f))



<a name="ak-avatar@1.1.0"></a>
# ak-avatar@1.1.0 (2016-06-17)


### Features

* Bare functionality of ak-avatar ([e0bfd32](https://bitbucket.org/atlassian/atlaskit/commits/e0bfd32))
* Rest of the bare functionality for ak-avatar ([bcd9b92](https://bitbucket.org/atlassian/atlaskit/commits/bcd9b92))



<a name="ak-avatar@1.0.0"></a>
# ak-avatar@1.0.0 (2016-06-17)


### Features

* **code:** initial commit for ak-avatar ([e66318d](https://bitbucket.org/atlassian/atlaskit/commits/e66318d))



<a name="0.0.1-atlas-animation3"></a>
## 0.0.1-atlas-animation3 (2016-06-08)



<a name="1.1.6-atlas-animation"></a>
## 1.1.6-atlas-animation (2016-06-08)



<a name="13.1.0-tmp-atlaskit-component-b"></a>
# 13.1.0-tmp-atlaskit-component-b (2016-06-08)



<a name="13.1.0-tmp-atlaskit-component-a"></a>
# 13.1.0-tmp-atlaskit-component-a (2016-06-08)


### Bug Fixes

* **components:** commented out a line ([4b91174](https://bitbucket.org/atlassian/atlaskit/commits/4b91174))


### Features

* **components:** Add an ! mark ([2b7bdb0](https://bitbucket.org/atlassian/atlaskit/commits/2b7bdb0))
* quick spike on avatars and shared resources ([868862c](https://bitbucket.org/atlassian/atlaskit/commits/868862c))



