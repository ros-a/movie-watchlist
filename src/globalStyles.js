import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    &:first {
        margin-top: 0;
        padding-top: 0;
    }
  }
`;
 
export default GlobalStyle;