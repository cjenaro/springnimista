import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { AppContext } from "../../context/app-state";

function parseRes(text) {
  console.log(text.replace(/\/\*(.|\r|\n)*\*\//g, ""));
}

const Animation = () => {
  const [animation, setAnimation] = useState(null);
  const [error, setError] = useState(null);
  const { appState } = useContext(AppContext);
  const { variation } = appState;

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://animista.net/animista-download/${variation}.css`,
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "http://animista.net",
          Host: "animista.net",
        },
      }
    )
      .then((blob) => {
        return blob.text();
      })
      .then((res) => {
        setAnimation(parseRes(res));
      })
      .catch((err) => {
        setError(err);
      });
  }, [variation]);

  return <pre>{JSON.stringify({ animation, error }, null, 2)}</pre>;
};

export default Animation;
