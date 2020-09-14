import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext } from "../../context/app-state";

const Animation = () => {
  const { appState } = useContext(AppContext);
  const { category, group, variation } = appState;
  const animation =
    appState &&
    appState.categories &&
    appState.categories[category] &&
    appState.categories[category].groups &&
    appState.categories[category].groups[group] &&
    appState.categories[category].groups[group].variations &&
    appState.categories[category].groups[group].variations[variation];

  return <pre>{JSON.stringify(animation, null, 2)}</pre>;
};

export default Animation;
