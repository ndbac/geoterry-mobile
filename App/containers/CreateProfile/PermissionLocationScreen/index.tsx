import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage, PermissionLocationIcon } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import useRequestLocationPermission from 'App/hooks/useRequestLocationPermission';
import { reduxSelector } from 'App/redux/selectors';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';

const PermissionLocationScreen = () => {
  const { t } = useTranslation();
  useRequestLocationPermission();
  const navigation = useNavigation();
  const handePressGoToSetting = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ENavigationScreen.MAIN_GAME_NAVIGATOR,
            state: {
              index: 1,
              routes: [{ name: EMainGameScreen.MAP_SCREEN }, { name: EMainGameScreen.SETTING_NAVIGATOR }],
            },
          },
        ],
      }),
    );
  }, [navigation]);
  const user = useSelector(reduxSelector.getUser);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header shouldHideBackButton />
      <CustomText style={styles.title}>{`${user?.displayName},\n${t('bạn đang ở đâu?')}`}</CustomText>
      <CustomText style={styles.subTitle}>
        {t('Cho phép Terriana truy cập vào vị trí của bạn để mang tới trải nghiệm tốt hơn nhé!')}
      </CustomText>
      <Image style={styles.image} source={PermissionLocationIcon} />
      <CustomText style={styles.footerText}>
        {t('Đừng lo, chúng tôi sẽ không chia sẻ dữ liệu của bạn khi không được phép!')}
      </CustomText>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonType={EButtonType.SOLID}
          onPress={handePressGoToSetting}
          linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          title={t('Đi đến cài đặt')}
        />
      </View>
    </CustomSafeArea>
  );
};

export default PermissionLocationScreen;
