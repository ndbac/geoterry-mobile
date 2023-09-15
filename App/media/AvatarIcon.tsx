/* eslint-disable react/react-in-jsx-scope */
import { Circle, ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

const AvatarIcon = () => {
  return (
    <Svg width="168" height="160" viewBox="0 0 168 160" fill="none">
      <Circle cx="84.5" cy="80" r="74" fill="#333333" />
      <Defs>
        <ClipPath id="clip0_45_5717">
          <Rect width="48" height="48" fill="white" transform="translate(60.5 56.5)" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_45_5717)">
        <Path
          d="M98.8776 85.2939C101.983 85.2939 104.5 87.7107 104.5 90.6922V92.0735C104.5 94.2202 103.701 96.2961 102.247 97.9269C98.3236 102.328 92.3554 104.5 84.4919 104.5C76.6269 104.5 70.6616 102.327 66.7458 97.9243C65.2963 96.2946 64.5 94.2218 64.5 92.0787V90.6922C64.5 87.7107 67.0172 85.2939 70.1224 85.2939H98.8776ZM98.8776 88.8946H70.1224C69.0883 88.8946 68.2501 89.6994 68.2501 90.6922V92.0787C68.2501 93.3646 68.7279 94.6083 69.5976 95.586C72.7309 99.1091 77.6458 100.899 84.4919 100.899C91.3378 100.899 96.257 99.1091 99.3981 95.5855C100.271 94.6069 100.75 93.3613 100.75 92.0735V90.6922C100.75 89.6994 99.9116 88.8946 98.8776 88.8946ZM84.4919 56.5C91.3956 56.5 96.9923 61.8736 96.9923 68.5021C96.9923 75.1308 91.3956 80.5043 84.4919 80.5043C77.588 80.5043 71.9914 75.1308 71.9914 68.5021C71.9914 61.8736 77.588 56.5 84.4919 56.5ZM84.4919 60.1006C79.6592 60.1006 75.7415 63.8621 75.7415 68.5021C75.7415 73.1422 79.6592 76.9037 84.4919 76.9037C89.3245 76.9037 93.2421 73.1422 93.2421 68.5021C93.2421 63.8621 89.3245 60.1006 84.4919 60.1006Z"
          fill="#CCCCCC"
        />
      </G>
    </Svg>
  );
};

export default AvatarIcon;
