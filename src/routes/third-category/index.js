import { h } from "preact";
import { Link } from "preact-router/match";
import { useContext } from "preact/hooks";
import { AppContext } from "../../context/app-state";
import NavLoader from "../../components/nav-loader";
import { css } from "@filbert-js/macro";

const ThirdCategory = ({ path }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { category, group, variation, loading } = appState;
  const variations =
    appState &&
    appState.categories &&
    appState.categories[category] &&
    appState.categories[category].groups &&
    appState.categories[category].groups[group] &&
    appState.categories[category].groups[group].variations;

  const handleSelection = (variation) => {
    setAppState({ variation });
  };

  if (loading) return <NavLoader key={`third=${loading}`} />;
  if (!variations) return null;
  return (
    <nav
      css={css`
        min-height: 100px;
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 2rem 1rem;
        overflow-x: scroll;
        white-space: nowrap;
        background-color: #e7e7e7;

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
      {Object.keys(variations).map((v) => (
        <Link
          onClick={() => handleSelection(v)}
          className={v === variation ? "active" : ""}
          key={`${v}`}
          href={`/${category}/${group}/${v}`}
        >
          {v}
        </Link>
      ))}
    </nav>
  );
};

export default ThirdCategory;
