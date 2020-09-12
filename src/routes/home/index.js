import { h } from "preact";
import { css } from "@filbert-js/macro";

const Home = () => (
  <div
    css={css`
      padding: 56px 20px;
      min-height: 100%;
      width: 100%;
    `}
  >
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </div>
);

export default Home;
