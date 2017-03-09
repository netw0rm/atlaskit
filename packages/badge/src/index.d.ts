import { Component, ReactElement } from 'react';

interface Props {
 value?: number;
 max?: number;
 appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
 onValueUpdated?: (...args: any[] ) => any;
 theme?: 'default' | 'dark';
}

export default class extends Component<Props, {}> {}
