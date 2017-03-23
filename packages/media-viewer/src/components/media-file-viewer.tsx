import * as React from 'react';
import { Component } from 'react';
import { Context, FileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

export interface MediaFileViewerProps {
    readonly context: Context;
    readonly fileId: string;
    readonly collectionName?: string;
    readonly basePath: string;

    readonly onClose?: () => void;
}

export interface MediaFileViewerState {
    readonly mediaViewer: MediaViewer;
}

export class MediaFileViewer extends Component<MediaFileViewerProps, MediaFileViewerState> {
    private subscription: Subscription;

    componentDidMount(): void {
        const { context, fileId, collectionName, basePath, onClose } = this.props;
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
            const provider = context.getMediaItemProvider(fileId, 'file', collectionName);

            this.subscription = provider.observable().subscribe({
                next: (item: FileItem) => {
                    if (onClose) {
                        mediaViewer.on('fv.close', () => {
                            onClose();
                        });
                    }
                    mediaViewer.setFiles([{
                        id: item.details.id,
                        src: `${config.serviceHost}/file/${item.details.id}/binary`,
                        type: item.details.mimeType,
                        title: item.details.name
                    }]);
                    mediaViewer.open({ id: item.details.id });
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
