import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { AppContext } from "../../context/app-state";
import { css } from "@filbert-js/macro";
import useAnimateOnShow from "@cjenaro/useanimateonshow";

function toCamelCase(str) {
  const parts = str.split("-");
  return parts
    .map((part, i) => {
      if (i === 0) return part;

      return `${part[0].toUpperCase()}${part.slice(1)}`;
    })
    .join("");
}

function getFrameProps(arr) {
  let breakR = false;
  return arr.reduce((acc, current) => {
    if (!current.includes("}") && !breakR) {
      const parts = current.split(":");
      const key = parts[0];
      const value = parts[1];
      if (!!key && !!value) {
        acc[toCamelCase(key.trim())] = value.trim().replace(";", "");
      }
    } else {
      breakR = true;
    }

    return acc;
  }, {});
}

const Animation = () => {
  const [animation, setAnimation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { appState } = useContext(AppContext);
  const { variation } = appState;

  const parseRes = (cssText) => {
    let from = cssText.slice(cssText.indexOf("0% {")).split("\n");
    let to = cssText.slice(cssText.indexOf("100% {")).split("\n");

    return [getFrameProps(from), getFrameProps(to)];
  };

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [variation]);

  if (loading) return "Loading...";

  return error ? (
    <p>There was an error loading the animation</p>
  ) : (
    animation && <AnimatedBox animation={animation} />
  );
};

export default Animation;

const AnimatedBox = ({ animation: [from, to] }) => {
  const [Wrapper, ref, props] = useAnimateOnShow(from, to);
  return (
    <Wrapper visible={ref} style={props}>
      <div
        css={css`
          border-radius: 5px;
          background-color: #222;
          width: 100px;
          height: 80px;
        `}
      />
    </Wrapper>
  );
};
