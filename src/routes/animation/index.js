import { h } from "preact";
import { useRef, useContext, useEffect, useState } from "preact/hooks";
import { AppContext } from "../../context/app-state";
import { css } from "@filbert-js/macro";
import useAnimateOnShow from "@cjenaro/useanimateonshow";
import Loader from "../../components/loader";
import { animated, useSpring } from "react-spring";

function toCamelCase(str) {
  const parts = str.split("-");
  return parts
    .map((part, i) => {
      if (i === 0) return part;

      return `${part[0].toUpperCase()}${part.slice(1)}`;
    })
    .join("");
}

function replaceZeroValues(str) {
  const units = {
    rotate: "deg",
    rotateX: "deg",
    rotateY: "deg",
    translate: "px",
    translateZ: "px",
    translateY: "px",
    translateX: "px",
  };

  let returnValue = str
    .split(" ")
    .map((key) => {
      const unit = units[key.replace(/[^A-Za-z ]/g, "")];
      let parsedValue = key;
      if (unit) {
        const newKey = key.replace(/[^A-Za-z ]/g, "");
        parsedValue = parsedValue.replace(
          `${newKey}(0)`,
          `${newKey}(0${unit})`
        );
      }
      return parsedValue;
    })
    .join(" ");

  return returnValue;
}

function getFrameProps(arr) {
  let breakR = false;
  return arr.reduce((acc, current) => {
    if (!current.includes("}") && !breakR) {
      const parts = current.split(":");
      const key = parts[0];
      const value = parts[1];
      if (!!key && !!value) {
        let withUnits = replaceZeroValues(value.trim().replace(";", ""));
        acc[toCamelCase(key.trim())] = withUnits;
      }
    } else {
      breakR = true;
    }

    return acc;
  }, {});
}

function parseConfigValues(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key].value) {
      acc[key] = obj[key].value;
    }
    return acc;
  }, {});
}

const Animation = () => {
  const [animation, setAnimation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [count, setCount] = useState(0);
  const [config, setConfig] = useState({
    mass: {
      value: 1,
      type: "range",
      min: 1,
      max: 500,
    },
    tension: {
      value: 170,
      min: 1,
      max: 500,
      type: "range",
    },
    friction: {
      value: 26,
      min: 1,
      max: 500,
      type: "range",
    },
    clamp: {
      value: false,
      type: "checkbox",
    },
    precision: {
      value: 0.01,
      min: 0.01,
      max: 1,
      type: "range",
    },
    velocity: {
      value: 0,

      min: 0,
      max: 500,
      type: "range",
    },
    duration: {
      value: undefined,
      min: 0,
      max: 1000,
      type: "range",
    },
  });
  const { appState } = useContext(AppContext);
  const { variation } = appState;

  const parseRes = (cssText) => {
    let from = cssText.slice(cssText.indexOf("0% {")).split("\n");
    let to = cssText.slice(cssText.indexOf("100% {")).split("\n");

    const frameProps = cssText
      .split("% {")
      .map((part) => getFrameProps(part.split("\n")))
      .filter((frames) => Object.keys(frames).length > 0);

    return frameProps;
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

  const handleRerun = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <div
      css={css`
        display: grid;
        padding: 2rem;
        align-content: center;
        justify-items: center;
        grid-template-columns: 1fr;
        position: relative;

        @media (min-width: 768px) {
          grid-template-rows: 1fr;
          grid-template-columns: 1fr 3fr;
        }
      `}
    >
      {loading ? (
        <div
          css={css`
            grid-column: -1/1;
            align-self: center;
          `}
        >
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p
          css={css`
            grid-column: -1/1;
            align-self: center;
          `}
        >
          There was an error loading the animation
        </p>
      ) : (
        <>
          <form
            onSubmit={handleRerun}
            css={css`
              display: grid;
              overflow: hidden;
              grid-template-columns: 1fr;
              width: 100%;
              background-color: #ffffff;
              padding: 1rem;
              border-radius: 5px;
              box-shadow: 2px 2px 5px 1px #0001;
              row-gap: 1rem;
            `}
          >
            <h4
              css={css`
                margin-top: 0;
              `}
            >
              Config:
            </h4>
            {Object.keys(config).map((c) => (
              <label
                for={c}
                key={c}
                css={css`
                  border: 1px solid var(--main-color);
                  padding: 0.25rem;
                `}
              >
                <p
                  css={css`
                    margin-top: 0;
                    margin-bottom: 0.5em;
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  {c}{" "}
                  {typeof config[c].value !== "undefined" && (
                    <span
                      css={css`
                        margin-left: 1rem;
                        padding: 0 0.25rem;
                        background-color: var(--main-color);
                        color: #ffffff;
                      `}
                    >
                      {config[c].value}
                    </span>
                  )}
                </p>
                <input
                  css={css`
                    width: 100%;
                  `}
                  type={config[c].type}
                  min={config[c].min}
                  max={config[c].max}
                  step={config[c].min !== 0 ? config[c].min : 1}
                  onInput={(e) => {
                    setConfig({
                      ...config,
                      [c]: {
                        ...config[c],
                        value:
                          config[c].type === "checkbox"
                            ? e.target.checked
                            : Number(e.target.value),
                      },
                    });
                  }}
                  value={config[c].value}
                />
              </label>
            ))}
            <button
              css={css`
                border: 0;
                background-color: var(--main-color);
                color: #ffffff;
                padding: 0.5em;
                text-transform: uppercase;
                font-weight: bold;
                letter-spacing: 0.03em;
                cursor: pointer;
              `}
              type="submit"
            >
              Rerun!
            </button>
          </form>
          {animation && (
            <AnimatedBox
              key={`animated-${count}`}
              config={parseConfigValues(config)}
              animation={animation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Animation;

const AnimatedBox = ({ animation: [from, ...to], config }) => {
  const [flipped, setFlipped] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const listener = window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 27:
          setFlipped(false);
          break;
      }
    });

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const springObj = {
    to: async (next) => {
      for (let i = 0; i < to.length; i++) {
        await next({ ...to[i] });
      }
    },
    from,
    config,
  };

  const props = useSpring(springObj);

  const preFlipProps = useSpring(
    flipped
      ? {
          opacity: 1,
          pointerEvents: "all",
        }
      : {
          opacity: 0,
          pointerEvents: "none",
        }
  );

  return (
    <>
      <div
        css={css`
          align-self: center;
        `}
      >
        <animated.div ref={divRef} style={props}>
          <div
            css={css`
              border-radius: 5px;
              background-color: #222;
              width: 50vw;
              min-height: 20vw;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <button
              css={css`
                cursor: pointer;
                font-size: 3rem;
                color: white;
                font-weight: bold;
                background-color: transparent;
                border: 0;
                &:focus {
                  outline: none;
                }
              `}
              onClick={() => setFlipped(!flipped)}
            >
              Click to see the code!
            </button>
          </div>
        </animated.div>
      </div>
      <animated.pre
        style={preFlipProps}
        css={css`
          padding: 5rem 2rem 2rem;
          font-size: 1.4rem;
          max-width: 100%;
          overflow: scroll;
          height: 100vh;
          width: 100vw;
          background-color: #222;
          color: #fff;
          position: fixed;
          opacity: 0;
          top: 0;
          left: 0;
          pointer-events: none;
        `}
      >
        {`
const AnimatedBox = ({ children }) => {
  const config: ${JSON.stringify(config, null, 2)}
  const from: ${JSON.stringify(from, null, 2)}
  const to: ${JSON.stringify(to, null, 2)}
  const props = useSpring({
    to: async next => {
      for (let i = 0; i < to.length; i++) {
        await next({ ...to[i] })
      }
    },
    from,
    config
  })

  return <animated.div style={props}>{children}</animated.div>
}
         `}
      </animated.pre>
      <button
        onClick={() => setFlipped(!flipped)}
        css={css`
          position: absolute;
          border: 0;
          color: #ffffff;
          background-color: var(--main-color);
          border-radius: 50%;
          top: 25px;
          right: 25px;
          height: 70px;
          width: 70px;
          cursor: pointer;
          font-size: 1.3rem;
          z-index: 100;
        `}
      >
        {flipped ? "ESC" : "Code!"}
      </button>
    </>
  );
};
