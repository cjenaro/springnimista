import { h } from "preact";
import { useState } from "preact/hooks";
import { useSpring, animated } from "react-spring";
import { styled } from "@filbert-js/macro";

const getPercentage = (i, r) => {
  return Math.max(0, Math.min((10 - i) * (i + 1) * (r + 1), 100));
};

const items = Array.from({ length: 4 });
const pos = (i) => (r) => `${getPercentage(i, r)}% 100%`;
const interp = (i) => (r) =>
  `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

const Loader = () => {
  const [flip, setFlip] = useState(false);
  const to = { radians: 2 * Math.PI };
  const from = { radians: 0 };
  const { radians } = useSpring({
    from,
    to: async (next) => {
      while (1) await next(to);
    },
    config: { duration: 1000 },
    reset: true,
  });

  const bg = useSpring({
    from: flip ? to : from,
    to: flip ? from : to,
    config: { duration: 1000 },
    onRest: () => {
      setFlip(!flip);
    },
  });

  return (
    <Flex>
      {items.map((_, i) => (
        <animated.div
          key={`circle-${i}`}
          className="circle"
          style={{
            transform: radians.interpolate(interp(i)),
            backgroundPosition: bg.radians.interpolate(pos(i)),
          }}
        ></animated.div>
      ))}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & .circle {
    background-color: #222;
    width: 30px;
    height: 30px;
    margin: 5px;
    background-image: linear-gradient(
      90deg,
      var(--main-color),
      var(--secondary-color),
      var(--main-color)
    );
    background-repeat: no-repeat;
    background-size: 300% 100%;
    border-radius: 50%;
  }
`;

export default Loader;
