# PrivacySafe

This package provides some utility functions to help mark strings as being privacy safe (potentially for consumption in analytics).

## Installation

```sh
npm install @NAME@
```

## Using the component

### privateSafeString
Create a wrapper which signifies that the supplied string is privacy safe.
Use privateSafeString when you are certain that the string or its source isn't user entered data.
If you pass any non-string type (e.g. null, undefined), the string will be marked being unsafe.

```javascript
import { privacySafeString } from '@NAME@';
const safeString = privateSafeString('projects');
safeString.value // 'projects'
```

### isPrivacySafeString
Check to see if the supplied object is a safe string.

```javascript
import { privacySafeString, isPrivacySafeString } from '@NAME@';
const safeString = privateSafeString('projects');
isPrivacySafeString(safeString); // true
```

### dangerouslyCreateSafeString
Create a safe string but acknowledge that it is user entered data. (eg. NPS survey responses).
If you pass any non-string type (e.g. null, undefined), the string will be marked being unsafe.

```javascript
import { dangerouslyCreateSafeString } from '@NAME@';
function create(nps) {
  const safeString = dangerouslyCreateSafeString(nps.response);
}
```

### markAsSafe
Provide a list of acceptable values and only when an allowed value matches, create a safe string.

```javascript
import { markAsSafe, isPrivacySafeString } from '@NAME@';
isPrivacySafeString(markAsSafe('project', 'issue')('issue')); // true
isPrivacySafeString(markAsSafe('project', 'issue')('corporation')); // false
```
