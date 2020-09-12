import { h } from "preact";
import style from "./style.css";

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
