import { h } from "preact";
import { css } from "@filbert-js/macro";
import useOnShow from "@cjenaro/useanimateonshow";

const Home = () => {
  const [Wrapper, ref, props] = useOnShow({ x: 0 }, { x: 1000 });
  return (
    <div
      css={css`
        padding: 56px 20px;
        min-height: 100%;
        width: 100%;
      `}
    >
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Wrapper visible={ref} style={props}>
        {props.x.interpolate((x) => x.toFixed(2))}
      </Wrapper>
    </div>
  );
};

export default Home;
