import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(#000, #347eb7);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  body:has(.modal) {
    overflow: hidden;
  }
  @font-face {
    font-family: Cairo;
    src: url(${require('./fonts/Cairo-SemiBold.ttf')});
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
  }
`;
 
export default GlobalStyle;