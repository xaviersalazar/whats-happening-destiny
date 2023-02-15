import { Text } from "@nextui-org/react";
import styled, { keyframes } from "styled-components";

interface LoaderProps {
  updatingManifest?: boolean;
}

const foldingCubeAngle = keyframes`
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 999999;
`;

const FoldingCube = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translateX(-50%) rotate(45deg);
`;

const Cube = styled.div`
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e7d048;
    animation-name: ${foldingCubeAngle};
    animation-duration: 2.4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: both;
    transform-origin: 100% 100%;
  }
`;

const FoldingCubeOne = styled(Cube)``;

const FoldingCubeTwo = styled(Cube)`
  transform: scale(1.1) rotateZ(90deg);

  &::before {
    animation-delay: 0.3s;
  }
`;

const FoldingCubeThree = styled(Cube)`
  transform: scale(1.1) rotateZ(180deg);

  &::before {
    animation-delay: 0.6s;
  }
`;

const FoldingCubeFour = styled(Cube)`
  transform: scale(1.1) rotateZ(270deg);

  &::before {
    animation-delay: 0.9s;
  }
`;

const Loader = ({ updatingManifest = false }: LoaderProps) => (
  <LoaderWrapper>
    <div className="spinner">
      <FoldingCube>
        <FoldingCubeOne />
        <FoldingCubeTwo />
        <FoldingCubeFour />
        <FoldingCubeThree />
      </FoldingCube>
    </div>
    {updatingManifest && (
      <Text size="$xs" weight="thin">
        Updating manifest...
      </Text>
    )}
  </LoaderWrapper>
);

export default Loader;
