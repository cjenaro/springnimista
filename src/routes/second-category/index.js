import { h } from "preact";
import { Link } from "preact-router/match";

const SecondCategory = ({ path, category }) => (
  <nav>
    <p>{category}</p>
    <Link href={`${path}/scale-in`}>Scale In</Link>
  </nav>
);

export default SecondCategory;
