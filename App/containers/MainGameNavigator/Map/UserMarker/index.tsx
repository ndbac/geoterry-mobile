import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import React, { useEffect, useMemo } from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { useAnimatedRegion, AnimatedMarker } from 'App/hooks/useAnimatedRegion';
import { Easing } from 'react-native-reanimated';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';
import { LatLng } from 'react-native-maps';
import { responsiveByWidth as rw } from 'App/helpers/common';

const UserMarker = ({ userLocation, centerMap }: { userLocation: LatLng; centerMap: () => void }) => {
  const user = useSelector(reduxSelector.getUser);
  const animatedRegion = useAnimatedRegion(userLocation);

  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);

  useEffect(() => {
    animatedRegion.animate({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      duration: DEFAULT_USER_MARK_POINT_ANIMATION_DURATION,
      easing: Easing.linear,
    });
  }, [animatedRegion, userLocation]);

  return (
    <AnimatedMarker animatedProps={animatedRegion.props} coordinate={userLocation} onPress={centerMap}>
      <View style={styles.markerContainer}>
        <LinearGradient
          style={styles.imageContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[EColor.color_51D5FF, EColor.color_C072FD]}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <MapMarkerUserDefault width={rw(44)} height={rw(44)} />
            </View>
          )}
        </LinearGradient>
        <View style={styles.polygonContainer}>
          <MapMarkerPolygonIcon />
        </View>
      </View>
    </AnimatedMarker>
  );
};
export default UserMarker;
