import * as React from 'react';
import {ImageIcon} from '../../../utils/ImageIcon';
import {CardBorder} from '../../utils/CardBorder';
import {CardDetails} from '../../utils/CardDetails';
import {Image} from './styled';

export interface LoadedViewProps {
  href?: string;
  icon?: string;
  image?: string;
  site?: string;
  title?: string;
  description?: string;
}

export class LoadedView extends React.Component<LoadedViewProps, {}> {
  render() {
    const {href, icon, image, site, title, description} = this.props;
    return (
      <CardBorder href={href} icon={icon ? <ImageIcon url={icon}/> : icon} title={site}>
        <Image url={image}/>
        <CardDetails
          title={title}
          description={description}
        />
      </CardBorder>
    );
  }
}
