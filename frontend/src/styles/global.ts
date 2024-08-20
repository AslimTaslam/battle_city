import { createGlobalStyle } from 'styled-components';

import { fonts } from './fonts';
import { colors } from './variables';

export const GlobalStyle = createGlobalStyle`
${fonts}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-family: Roboto sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: ${colors.black};
  background-color: ${colors.white};
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #945EFF transparent; /* Firefox */
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #945EFF;
    border-radius: 10px; /* Adjust the radius as needed */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Adjust if needed */
  }
}

.no-scroll {
  overflow-y: hidden;
}

a {
  font-weight: 500;
  text-decoration: inherit;
}

a:hover {
  color: ${colors.gray};
}

a:active {
  color: ${colors.gray};
}

body {
  display: static;
  margin: 0;
  place-items: center;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${colors.gray};
  cursor: pointer;
  transition: border-color 0.25s;
}

input {
  outline: none;
  border: none;
  background: transparent;
}

input:hover {
  outline: none;
  border: none;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.scrollbar-thin {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #945EFF transparent; /* Firefox */
}

.scrollbar-thumb-rounded {
  /* WebKit browsers */
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #945EFF;
    border-radius: 10px; /* Adjust the radius as needed */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Adjust if needed */
  }
}





#root {
  min-height: 100vh;
}


@media (max-width: 862px) {
  body {
    overflow-y: auto;
  }
}
`;
