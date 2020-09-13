import { h } from "preact";
import { Link } from "preact-router/match";
import { styled, css } from "@filbert-js/macro";

const A = styled(Link)`
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
  &:hover,
  &:active {
    background: rgba(0, 0, 0, 0.2);
  }

  &.active {
    background: rgba(0, 0, 0, 0.4);
  }
`;

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
    `}
  >
    <A href="/" activeClassName="active">
      <h1
        css={css`
          float: left;
          margin: 0;
          padding: 0 15px;
          font-size: 24px;
          line-height: 56px;
          font-weight: 400;
          color: #fff;
        `}
      >
        Springnimista
      </h1>
    </A>
    <nav
      css={css`
        float: right;
        font-size: 100%;
      `}
    >
      <A activeClassName="active" href="/basic">
        Basic
      </A>
      <A activeClassName="active" href="/entrances">
        Entrances
      </A>
      <A activeClassName="active" href="/exits">
        Exits
      </A>
      <A activeClassName="active" href="/texts">
        Texts
      </A>
      <A activeClassName="active" href="/attention">
        Attention
      </A>
      <A activeClassName="active" href="/background">
        Background
      </A>
    </nav>
  </header>
);

export default Header;
