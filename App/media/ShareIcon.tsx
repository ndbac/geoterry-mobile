import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ShareIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#FAFAFA"
      d="M18.996 11a1 1 0 0 1 .993.883l.007.117v6a4 4 0 0 1-3.8 3.995l-.2.005H8a4 4 0 0 1-3.995-3.8L4 18v-6a1 1 0 0 1 1.993-.117L6 12v6a2 2 0 0 0 1.85 1.994L8 20h7.996a2 2 0 0 0 1.994-1.85l.006-.15v-6a1 1 0 0 1 1-1ZM6.289 7.29l4.997-4.997a1 1 0 0 1 1.32-.084l.094.083 5.003 4.997a1 1 0 0 1-1.319 1.498l-.094-.083-3.294-3.289v9.84a1 1 0 0 1-.883.993l-.117.007a1 1 0 0 1-.993-.883l-.007-.117V5.41L7.703 8.704a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.095Z"
    />
  </Svg>
);
export default ShareIcon;
