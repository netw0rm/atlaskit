import * as React from 'react';
import { Component } from 'react';
import { Context, FileItem, MediaCollectionFileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

export interface MediaCollectionViewerProps {
    readonly context: Context;
    readonly occurenceKey: string;
    readonly collectionName: string;
    readonly basePath: string;

    readonly onClose?: () => void;
}

export interface MediaCollectionViewerState {
    readonly mediaViewer: MediaViewer;
}

export class MediaCollectionViewer extends Component<MediaCollectionViewerProps, MediaCollectionViewerState> {
    private subscription: Subscription;

    componentDidMount(): void {
        const { context, occurenceKey, collectionName, basePath, onClose } = this.props;
        const { config } = context;

        this.setState({
            mediaViewer: new MediaViewer({
                assets: {
                    basePath: basePath
                },
                fetchToken: this.fetchToken
            })
        }, () => {
            const { mediaViewer } = this.state;
            const provider = context.getMediaCollectionProvider(collectionName, 50);

            this.subscription = provider.observable().subscribe({
                next: collection => {
                    if (onClose) {
                        mediaViewer.on('fv.close', () => {
                            onClose();
                        });
                    }
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
            <div />
        );
    }
}
