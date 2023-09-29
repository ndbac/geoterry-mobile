import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';

const UserMarker = ({ userPosition }: { userPosition: IRealtimeLocation }) => {
  const user = useSelector(reduxSelector.getUser);
  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);
  return (
    <Marker coordinate={userPosition}>
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
              <MapMarkerUserDefault />
            </View>
          )}
          <View style={styles.polygonContainer}>
            <MapMarkerPolygonIcon />
          </View>
        </LinearGradient>
      </View>
    </Marker>
  );
};
export default UserMarker;