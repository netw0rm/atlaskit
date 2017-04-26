# Media UI
  Provides utilities and helpers UI related consumed by media packages

## Using the package

```
import styled from 'styled-components';
import { size, ellipsis, borderRadius } from '@atlaskit/media-ui';

export const Title = styled.div`
  ${size()}
  ${ellipsis(300)}
  ${borderRadius}

  color: red;
`;
```
