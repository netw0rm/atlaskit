/* tslint:disable:variable-name */
import styled from 'styled-components';

export const PredefinedAvatarViewWrapper = styled.div`
  width: 350px;
  
  ul {
    display: flex; 
    flex-flow: row wrap;
  
    padding: 0;
    margin: 0;
    
    list-style-type: none;

    li {
      padding-right: 10px;
      padding-bottom: 10px;
      margin: 0px;
    }
  }
  
  .header {
      display: flex;
      align-items: center;
      
      padding-top: 10px;
      padding-bottom: 10px;
      
      .description {
        padding-left: 10px;
      }
  
      .back-button {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        
        align-items: center;
        justify-content: center;
        
        margin: 0px;
        padding: 0px;
      }
  }
  
  // hide tickbox and file type icon in overlay
  // because those are not necessary for avatars
  
  .tickbox {
    visibility: hidden;
  }
  
  .file-type-icon {
    visibility: hidden;
  }
`;
