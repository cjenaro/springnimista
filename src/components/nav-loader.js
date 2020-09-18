import { h } from "preact";
import { useSpring, animated } from "react-spring";
import { styled } from "@filbert-js/macro";
import { useState } from "preact/hooks";

const pos = (r) =>
  `${Math.abs(100 * Math.sin(r + (2 * Math.PI) / 1.6))}% ${Math.abs(
    100 * Math.sin(r + (2 * Math.PI) / 1.6)
  )}%`;

const NavLoader = () => {
  const [flip, setFlip] = useState(false);
  const { radians } = useSpring({
    to: { radians: flip ? 2 * Math.PI : 0 },
    from: {
      radians: flip ? 0 : 2 * Math.PI,
    },
    config: { duration: 6000 },
    reset: true,
    reverse: true,
    onRest: () => {
      setFlip(!flip);
    },
  });
  return (
    <StyledContainer>
      <StyledAnimated
        style={{ backgroundPosition: radians.interpolate(pos) }}
      />
    </StyledContainer>
  );
};

const StyledAnimated = styled(animated.div)`
  background-image: linear-gradient(
    90deg,
    var(--main-color),
    var(--secondary-color),
    var(--main-color)
  );
  background-repeat: no-repeat;
  background-size: 300% 100%;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100px;
`;

export default NavLoader;
