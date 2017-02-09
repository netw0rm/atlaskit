// import * as React from 'react';
// import {Component, MouseEvent} from 'react';
// import * as bytes from 'bytes';
// import styled from 'styled-components';
// import {ProgressBar} from './progressBar';
// import {MediaTypes, Actions} from '@atlaskit/media-domain';
// import {Dropdown} from './dropdown';
// import {FileIcon} from './fileIcon';
// import {TopRow,
// TopRowTitle,
// BottomRow,
// LeftColumn,
// Metadata,
// FileTypeIcon,
// FileSize,
// RightColumn,
// Highlight,
// Overlay} from './styled';

// export interface CardOverlayProps {
//   mediaType: MediaTypes.MediaType;
//   mediaName?: string;
//   mediaSize?: number;

//   selectable?: boolean;
//   selected?: boolean;

//   progress?: number;

//   menuActions?: Array<Actions.CardAction>;
// }

// export interface CardOverlayState {
//   isMenuExpanded: boolean;
// }

// export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
//   constructor(props: CardOverlayProps) {
//     super(props);

//     this.state = {
//       isMenuExpanded: false
//     };
//   }

//   private clickDetector: (e: Event) => void;


//   static get defaultProps() {
//     const menuActions: Array<Actions.CardAction> = [];

//     return {
//       menuActions
//     };
//   }

//   render() {
//     const active = (typeof this.props.progress === 'number');
//     let Wrapper = Overlay;

//     if (active) {
//       Wrapper = styled(Wrapper)`
//         .active {${Highlight}}
//       `;
//     }

//     if (this.props.selectable) {
//       Wrapper = styled(Wrapper)`
//         &:hover, &.active {
//           .tickbox {
//             display: block;
//           }
//         }

//         &.selected {
//           border-color: #3384FF !important;

//           .tickbox {
//             display: block !important;
//             background-color: #3384FF !important;
//             border-color: #3384FF !important;
//               background: data-uri("./icons/tick.svg") no-repeat center;
//           }
//         }
//       `;
//     }

//     if (this.props.selected) {
//       // classNames.push(styles['selected']);
//     }

//     if (this.props.mediaType === 'image') {
//       // classNames.push(styles['image']);
//     }

//     if (this.props.mediaType === 'video') {
//       // classNames.push(styles['video']);
//     }

//     if (typeof this.props.progress === 'number') {
//       // classNames.push(styles['inProgress']);
//     }

//     if (this.state.isMenuExpanded) {
//       // classNames.push(styles['active']);
//     }

//     const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});

//     return (
//       <Wrapper>
//         <TopRow>
//           <TopRowTitle>
//             {this.props.mediaName}
//           </TopRowTitle>
//           {this.tickBox()}
//         </TopRow>
//         <BottomRow>
//           <LeftColumn>
//             <Metadata>
//               <FileTypeIcon>
//                 <FileIcon mediaType={this.props.mediaType} />
//               </FileTypeIcon>
//               <FileSize>{fileSize}</FileSize>
//             </Metadata>
//             <ProgressBar progress={this.props.progress} />
//           </LeftColumn>
//           <RightColumn>
//             {this.moreBtn()}
//           </RightColumn>
//         </BottomRow>
//         {this.dropdown()}
//       </Wrapper>
//     );
//   }

//   tickBox() {
//     return this.props.selectable && (<div className={styles['tickbox']} />);
//   }

//   moreBtn() {
//     const actions = this.props.menuActions || [];
//     if (!actions.length) {
//       return null;
//     }

//     if (actions.length === 1 && actions[0].type === Actions.CardActionType.delete) {
//       const deleteAction = actions[0];
//       return (
//         <div className={styles['deleteBtn']} onClick={this.removeBtnClick(deleteAction.handler)} />
//       );
//     }

//     const moreBtnClasses = [styles['moreBtn']];
//     if (this.state.isMenuExpanded) {
//       moreBtnClasses.push(styles['active']);
//     }

//     return (
//       <div className={moreBtnClasses.join(' ')} onClick={this.moreBtnClick.bind(this)} />
//     );
//   }

//   dropdown() {
//     if (!this.state.isMenuExpanded) {
//       return null;
//     }

//     return (
//       <div className={styles['dropdownWrapper']} onClick={this.dropdownClick}>
//         <Dropdown items={this.props.menuActions} />
//       </div>
//     );
//   }

//   removeBtnClick(handler: Actions.CardEventHandler) {
//     return (e: MouseEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       e.stopPropagation();
//       handler();
//     };
//   }

//   dropdownClick(e: MouseEvent<HTMLDivElement>) {
//     e.preventDefault();
//     e.stopPropagation();
//   }

//   moreBtnClick(e: MouseEvent<HTMLDivElement>) {
//     e.preventDefault();
//     e.stopPropagation();

//     if (this.state.isMenuExpanded) {    // we should remove handlers
//       document.removeEventListener('click', this.clickDetector);
//     } else {    // we should add handlers on clicking outside of element
//       this.clickDetector = this.newClickDetector.bind(this);
//       document.addEventListener('click', this.clickDetector);
//     }

//     this.setState({
//       isMenuExpanded: !this.state.isMenuExpanded
//     });
//   }

//   newClickDetector(e: Event) {
//     this.setState({
//       isMenuExpanded: false
//     });

//     document.removeEventListener('click', this.clickDetector);
//   }
// }
