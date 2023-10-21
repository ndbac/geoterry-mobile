import { Path, Svg, G } from 'react-native-svg';
import React from 'react';

const LocationIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <G opacity="0.8">
        <Path
          d="M2.92164 2.28394C4.62184 0.583738 7.37844 0.583738 9.07864 2.28394C10.7788 3.98415 10.7788 6.74075 9.07864 8.44095L8.48514 9.0279C8.04769 9.4572 7.48014 10.0092 6.78219 10.6839C6.34609 11.1056 5.65419 11.1056 5.21814 10.6838L3.47257 8.9859C3.25319 8.7705 3.06956 8.58885 2.92164 8.44095C1.22143 6.74075 1.22143 3.98415 2.92164 2.28394ZM8.54829 2.81427C7.14099 1.40696 4.85928 1.40696 3.45197 2.81427C2.04465 4.22158 2.04465 6.5033 3.45197 7.9106L4.1955 8.64435C4.60496 9.04505 5.11969 9.54525 5.73954 10.1447C5.88489 10.2853 6.11549 10.2853 6.26089 10.1448L7.95834 8.49405C8.19279 8.2639 8.38949 8.0694 8.54829 7.9106C9.95559 6.5033 9.95559 4.22158 8.54829 2.81427ZM6.00014 3.99927C6.82899 3.99927 7.50089 4.67119 7.50089 5.50005C7.50089 6.3289 6.82899 7.0008 6.00014 7.0008C5.17129 7.0008 4.49936 6.3289 4.49936 5.50005C4.49936 4.67119 5.17129 3.99927 6.00014 3.99927ZM6.00014 4.74927C5.58549 4.74927 5.24934 5.0854 5.24934 5.50005C5.24934 5.9147 5.58549 6.2508 6.00014 6.2508C6.41479 6.2508 6.75089 5.9147 6.75089 5.50005C6.75089 5.0854 6.41479 4.74927 6.00014 4.74927Z"
          fill="#F2F2F2"
        />
      </G>
    </Svg>
  );
};

export default LocationIcon;
