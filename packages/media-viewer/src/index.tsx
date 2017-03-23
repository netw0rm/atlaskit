import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { Context, FileItem, MediaCollectionFileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

export interface MediaViewerAdapterProps {
    readonly context: Context;
    readonly occurenceKey: string;
    readonly collectionName: string;
}

export interface MediaViewerAdapterState {
    readonly mediaViewer: MediaViewer;
}

export default class MediaViewerAdapter extends Component<MediaViewerAdapterProps, MediaViewerAdapterState> {
    private subscription: Subscription;

    componentDidMount(): void {
        const { context, occurenceKey, collectionName } = this.props;
        const { config } = context;
        const element = ReactDOM.findDOMNode(this.refs['mediaViewer']);

        this.setState({
            mediaViewer: new MediaViewer({
                appendTo: element,
                assets: {
                    basePath: 'lib/'
                },
                fetchToken: this.fetchToken
            })
        }, () => {
            const { mediaViewer } = this.state;
            const provider = context.getMediaCollectionProvider(collectionName, 50);

            this.subscription = provider.observable().subscribe({
                next: collection => {
                    const files = collection.items
                        .filter(item => item.type === 'file')
                        .map((item: MediaCollectionFileItem) => ({
                            id: item.occurrenceKey,
                            src: `${config.serviceHost}/file/${item.id}/binary`,
                            type: item.mimeType,
                            title: item.name
                        }));

                    mediaViewer.setFiles(files);
                    mediaViewer.open({ id: occurenceKey });
                }
            });
        });
    }

    componentWillUnmount?(): void {
        this.subscription.unsubscribe();
    }

    source(fileItem: FileItem): string {
        const { serviceHost } = this.props.context.config;

        if (fileItem.details.artifacts) {
            const image = fileItem.details.artifacts['image.jpg'];
            if (image && image.url) {
                return `${serviceHost}${image.url}`;
            }
        }

        return `${serviceHost}/file/${fileItem.details.id}/binary`;
    }

    private fetchToken = (originalFile) => {
        const source = originalFile.get('src');
        const deferred = $.Deferred();
        const { clientId, tokenProvider } = this.props.context.config;

        if (source.indexOf('?token=') !== -1) {
            deferred.resolve({
                src: source
            });
        } else {
            tokenProvider(this.props.collectionName)
                .then(token => {
                    deferred.resolve({
                        src: `${source}?token=${token}&client=${clientId}`
                    });
                })
                .catch(deferred.reject);
        }

        return deferred.promise();
    }

    render(): JSX.Element {
        return (
            <div ref="mediaViewer" />
        );
    }
}
