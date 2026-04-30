import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }    
    
    body {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.text.default};
        font-family: "Pretendard", sans-serif;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;

