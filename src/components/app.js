import { h } from "preact";
import { Router } from "preact-router";
import { css, Global } from "@filbert-js/macro";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import Profile from "../routes/profile";

const App = () => (
  <div id="app">
    <Global
      styles={`          
html, body {
	height: 100%;
	width: 100%;
	padding: 0;
	margin: 0;
	background: #FAFAFA;
	font-family: 'Helvetica Neue', arial, sans-serif;
	font-weight: 400;
	color: #444;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

* {
	box-sizing: border-box;
}

#app {
	height: 100%;
}
    `}
    />
    <Header />
    <Router>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
    </Router>
  </div>
);

export default App;
