import { h } from "preact";
import { Link } from "preact-router/match";
import { css } from "@filbert-js/macro";

const Header = () => (
  <header
    css={css`
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 56px;
      padding: 0;
      background: #673ab7;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      z-index: 50;

      h1 {
        float: left;
        margin: 0;
        padding: 0 15px;
        font-size: 24px;
        line-height: 56px;
        font-weight: 400;
        color: #fff;
      }

      nav {
        float: right;
        font-size: 100%;
      }

      nav a {
        display: inline-block;
        height: 56px;
        line-height: 56px;
        padding: 0 15px;
        min-width: 50px;
        text-align: center;
        background: rgba(255, 255, 255, 0);
        text-decoration: none;
        color: #fff;
        will-change: background-color;
      }

      nav a:hover,
      nav a:active {
        background: rgba(0, 0, 0, 0.2);
      }

      nav a.active {
        background: rgba(0, 0, 0, 0.4);
      }
    `}
  >
    <h1>Preact App</h1>
    <nav>
      <Link activeClassName="active" href="/">
        Home
      </Link>
      <Link activeClassName="active" href="/profile">
        Me
      </Link>
      <Link activeClassName="active" href="/profile/john">
        John
      </Link>
    </nav>
  </header>
);

export default Header;
