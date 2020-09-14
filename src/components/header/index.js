import { h } from "preact";
import { Link } from "preact-router/match";
import { styled, css } from "@filbert-js/macro";
import { useContext } from "preact/hooks";
import { AppContext } from "../../context/app-state";

const A = styled(Link)`
  display: inline-block;
  height: 56px;
  line-height: 56px;
  padding: 0 15px;
  min-width: 50px;
  text-align: center;
  background-color: var(--main-color);
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

const Header = () => {
  const { appState, setAppState } = useContext(AppContext);
  const handleSelection = (e) => {
    const c = (e.target.pathname && e.target.pathname.replace(/\//g, "")) || "";
    setAppState({ category: c });
  };

  return (
    <header
      css={css`
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 56px;
        padding: 0;
        background-color: var(--main-color);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        z-index: 50;
      `}
    >
      <A onClick={handleSelection} href="/" activeClassName="active">
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
        {appState &&
          appState.categories &&
          Object.keys(appState.categories).map((c) => (
            <A
              onClick={handleSelection}
              key={c}
              href={`/${c}`}
              className={c === appState.category ? "active" : ""}
            >
              {c}
            </A>
          ))}
      </nav>
    </header>
  );
};

export default Header;
