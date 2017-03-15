import * as React from 'react';
import { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface ListProps {
    readonly observable: Observable<any>;
}

export interface ListState {
    readonly values: Array<any>;
}

export class List extends Component<ListProps, ListState> {
    private subscription: Subscription;

    constructor(props: ListProps) {
        super(props);

        this.state = {
            values: []
        };
    }

    componentDidMount(): void {
        this.subscription = this.props.observable.subscribe({
            next: value => {
                this.setState(
                    (previousState, props) => {
                        return {
                            values: previousState.values.concat([value])
                        };
                    }
                );
            },
            complete: () => {},
            error: error => {}
        });
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    render(): JSX.Element {
        return (
            <div style={{ display: 'inline-block' }}>
                {
                    this.state.values.map((value, index) => {
                        return (
                            <div key={index} style={{ paddingBottom: 4, display: 'block', float: 'left', clear: 'left' }}>
                                {value}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
