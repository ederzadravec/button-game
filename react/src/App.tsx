import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";

import theme from "#/assets/theme";

import Routes from "./Routes";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    color: #444
  }

  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }


`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;
