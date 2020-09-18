import { h } from "preact";
import { css } from "@filbert-js/macro";
import useOnShow from "@cjenaro/useanimateonshow";

const Home = () => {
  const text =
    "I just wanted to learn how to make cool animations with react spring";
  const [Wrapper, ref, props] = useOnShow(
    { x: 0, config: { duration: 1000 } },
    { x: text.length, config: { duration: 1000 } }
  );
  return (
    <div
      css={css`
        padding: 56px 20px;
        min-height: 100%;
        width: 100%;
        max-width: 800px;
        text-aling: center;
        margin: 0 auto;

        p {
          font-size: 1.5rem;
          line-height: 150%;
        }
      `}
    >
      <h1
        css={css`
          font-size: 5rem;
          max-width: 100vw;
          color: var(--main-color);
        `}
      >
        Springnimista
      </h1>
      <p>
        This website is heavily inspired (just a copy) of{" "}
        <a href="https://animista.net" target="_blank">
          Animista
        </a>{" "}
        (hope they don't get mad) but it uses <code>react spring</code> navigate
        through the header and chose the animation you want!
      </p>
      <p>
        This website was made with Preact, React Spring and filbert-js for
        css-in-js
      </p>
      <p>
        <Wrapper visible={ref} style={props}>
          {props.x.interpolate((x) => text.slice(0, x))}
        </Wrapper>
      </p>
    </div>
  );
};

export default Home;
