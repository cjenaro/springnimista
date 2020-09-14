import { h } from "preact";
import { Link } from "preact-router/match";
import { useContext } from "preact/hooks";
import { AppContext } from "../../context/app-state";
import { css } from "@filbert-js/macro";

const SecondCategory = ({ path, category }) => {
  const { appState } = useContext(AppContext);
  const groups =
    appState &&
    appState.categories &&
    appState.categories[category] &&
    appState.categories[category].groups;

  if (!groups) return null;
  return (
    <nav
      css={css`
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 2rem 1rem;
        overflow-x: scroll;
        white-space: nowrap;

        a {
          text-decoration: none;
          margin-right: 1em;
          color: #ffffff;
          background-color: var(--main-color);
          padding: 0.25rem;

          &:last-of-type {
            margin-right: 0;
          }
        }
      `}
    >
      {Object.keys(groups).map((group) => (
        <Link key={`${group}`} href={`${path}/${group}`}>
          {group}
        </Link>
      ))}
    </nav>
  );
};

export default SecondCategory;
