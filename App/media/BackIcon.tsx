import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const BackIcon = (props: SvgProps) => {
  return (
    <Svg {...props} width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M16.2071 4.29289C16.5976 4.68342 16.5976 5.31658 16.2071 5.70711L9.91421 12L16.2071 18.2929C16.5976 18.6834 16.5976 19.3166 16.2071 19.7071C15.8166 20.0976 15.1834 20.0976 14.7929 19.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L14.7929 4.29289C15.1834 3.90237 15.8166 3.90237 16.2071 4.29289Z"
        fill="white"
      />
    </Svg>
  );
};
export default BackIcon;
