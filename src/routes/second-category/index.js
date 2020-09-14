import { h } from "preact";
import { Link } from "preact-router/match";
import { useContext } from "preact/hooks";
import { AppContext } from "../../context/app-state";
import { css } from "@filbert-js/macro";

const SecondCategory = ({ path }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { category, group } = appState;
  const groups =
    appState &&
    appState.categories &&
    appState.categories[category] &&
    appState.categories[category].groups;

  const handleSelection = (g) => {
    setAppState({ group: g });
  };

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
        background-color: #f0f0f0;

        a {
          text-decoration: none;
          margin-right: 1em;
          color: #ffffff;
          background-color: var(--main-color);
          padding: 0.25rem;
          background-image: linear-gradient(
            var(--secondary-color),
            var(--secondary-color)
          );
          background-repeat: no-repeat;
          background-size: 0% 100%;
          transition: background-size 0.3s ease-in-out;

          &:last-of-type {
            margin-right: 0;
          }
        }

        a.active {
          background-size: 100% 100%;
        }
      `}
    >
      {Object.keys(groups).map((g) => (
        <Link
          onClick={() => handleSelection(g)}
          className={group === g ? "active" : ""}
          key={`${g}`}
          href={`/${category}/${g}`}
        >
          {g}
        </Link>
      ))}
    </nav>
  );
};

export default SecondCategory;
