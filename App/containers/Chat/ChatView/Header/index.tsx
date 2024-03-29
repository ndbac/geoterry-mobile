import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import BackIcon from 'App/media/BackIcon';
import CustomText from 'App/components/CustomText';
import { responsiveByWidth as rw } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import CustomImage from 'App/components/CustomImage';

const Header = ({
  shouldHideBackButton,
  headerContainerStyle,
  avatar,
  name,
}: {
  avatar?: string;
  name: string;
  title?: string;
  rightButton?: any;
  shouldHideBackButton?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation();
  const handlePressBackButton = useCallback(() => {
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  return (
    <View style={[styles.container, headerContainerStyle]}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={handlePressBackButton}>
        {!shouldHideBackButton && <BackIcon />}
      </TouchableOpacity>
      {avatar ? (
        <CustomImage imageUrl={avatar} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}>
          <MapMarkerUserDefault width={rw(36)} height={rw(36)} />
        </View>
      )}
      <CustomText style={styles.name}>{name}</CustomText>
    </View>
  );
};

export default Header;
