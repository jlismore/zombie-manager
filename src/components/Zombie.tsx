import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import styled from "styled-components";
import { ReactComponent as ZombieSvg } from "./zombie.svg";

const StyledZombieSvg = styled(ZombieSvg)<{ size: number }>`
  font-size: ${props => `${props.size}em`};
  height: 1em;
  width: 1.25em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
`;

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: SizeProp;
}

// based on fontawesome sizes
const sizeMap = {
  xs: 0.75,
  sm: 0.875,
  lg: 1.33333,
  "1x": 1,
  "2x": 2,
  "3x": 3,
  "4x": 4,
  "5x": 5,
  "6x": 6,
  "7x": 7,
  "8x": 8,
  "9x": 9,
  "10x": 10
};

export const Zombie = (props: Props) => {
  const { size, ref: _ref, ...rest } = props;
  return <StyledZombieSvg {...rest} size={sizeMap[size || "lg"]} />;
};
