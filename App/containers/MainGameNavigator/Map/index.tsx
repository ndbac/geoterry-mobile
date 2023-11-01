import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { isAndroidDevice, responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

import { CommonActions, StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY } from 'App/constants/common';
import { EButtonType, EDataStorageKey, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
import useCurrentLocation, { defaultLocation } from 'App/hooks/useCurrentLocation';
import FilterMapIcon from 'App/media/FilterMapIcon';
import HistoryIcon from 'App/media/HistoryIcon';
import SettingIcon from 'App/media/SettingIcon';
import TargetIcon from 'App/media/TargetIcon';
import TypeMapIcon from 'App/media/TypeMapIcon';
import UserProfileIcon from 'App/media/UserProfileIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { ITerryFilterParams } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { getStoredProperty } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CityNameBoard from './CityNameBoard/CityNameBoard';
import TreasureMarker from './TreasureMarker';
import UserMarker from './UserMarker';
import TerryPreviewBoard from './TerryPreviewBoard/TerryPreviewBoard';
import HeartIcon from 'App/media/HeartIcon';
import SavedIcon from 'App/media/SavedIcon';
import AddNewTerryIcon from 'App/media/AddNewTerryIcon';

const MapScreen = () => {
  // The current user`s location
  const currentLocation = useCurrentLocation();
  const [isBuilderNamespace, setIsBuilderNamespace] = useState(false);
  useEffect(() => {
    (async () => {
      const sessionNamespace = await getStoredProperty(EDataStorageKey.NAMESPACE);
      if (sessionNamespace === ENamespace.GEOTERRY_BUILDERS && !isBuilderNamespace) {
        setIsBuilderNamespace(true);
      }
    })();
  }, [isBuilderNamespace]);
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSaveBatterryMode, setIsSaveBatterryMode] = useState(false);
  useFocusEffect(() => {
    (async () => {
      const isSaveBatterry = await getStoredProperty(EDataStorageKey.IS_SAVE_BATTERY_MODE);
      setIsSaveBatterryMode(isSaveBatterry as boolean);
    })();
  });

  // The current region of the map view
  const [region, setRegion] = useState(currentLocation);
  const [regionToGetTerry, setRegionToGetTerry] = useState(currentLocation);
  const changeRegion = useCallback(
    (updatedRegion: IRealtimeLocation, fetchTerries?: boolean) => {
      setRegion(updatedRegion);
      if (
        (!isEmpty(regionToGetTerry) &&
          !isEmpty(updatedRegion) &&
          calculateDistance(regionToGetTerry, updatedRegion) > DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY) ||
        fetchTerries
      ) {
        setRegionToGetTerry(updatedRegion);
        dispatch(
          sagaUserAction.getPublicTerriesAsync({} as ITerryFilterParams, navigation, {
            location: { latitude: updatedRegion.latitude, longitude: updatedRegion.longitude },
          }),
        );
      }
    },
    [dispatch, navigation, regionToGetTerry],
  );

  // TODO: Need to somehow to be able to remove this effect since it costs a lot of resource
  // If the current location is not empty and the region is empty or default location, set the region to the current location
  useEffect(() => {
    if (
      !isEmpty(currentLocation) &&
      (isEmpty(region) ||
        (region.latitude === defaultLocation.latitude && region.longitude === defaultLocation.longitude))
    ) {
      changeRegion(currentLocation, true);
    }
  }, [currentLocation, region, changeRegion]);

  const handlePressTypeMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.MAP_TYPE_SCREEN));
  }, [navigation]);

  const handleCreateNewTerry = useCallback(() => {
    navigation.dispatch(
      StackActions.push(EMainGameScreen.CREATE_NEW_TERRY_SCREEN, {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude,
      }),
    );
  }, [navigation, currentLocation]);

  const handlePressFilterMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.FILTER_SCREEN));
  }, [navigation]);
  const onCenter = () => {
    mapRef?.current?.animateToRegion(currentLocation);
  };
  const mapType = useSelector(reduxSelector.getAppMapType);
  const publicTerries = useSelector(reduxSelector.getAppPublicTerries);

  const [selectedTerryId, setSelectedTerryId] = useState<string | null>(null);
  const centerToRegion = (targetLocation: IRealtimeLocation) => {
    mapRef?.current?.animateToRegion(targetLocation);
  };
  const selectedTerry = useSelector(reduxSelector.getAppPublicTerry);

  useEffect(() => {
    if (selectedTerryId && selectedTerryId !== selectedTerry?.id) {
      dispatch(
        sagaUserAction.getPublicTerryByIdAsync(
          {
            terryId: selectedTerryId,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            includeProfileData: true,
            includeCategoryData: true,
          },
          navigation,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerryId]);

  const updateTerryUserCustomData = (payload: { markAsFavourited?: boolean; markAsSaved?: boolean }) => {
    if (selectedTerryId) {
      dispatch(
        sagaUserAction.getPublicTerryByIdAsync(
          {
            terryId: selectedTerryId,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            markAsSaved: payload.markAsSaved,
            markAsFavourited: payload.markAsFavourited,
          },
          navigation,
        ),
      );
    }
  };

  return (
    <CustomSafeArea style={styles.container}>
      <MapView
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation={isSaveBatterryMode}
        compassOffset={{ x: -rh(10), y: rw(208) }}
        onRegionChangeComplete={(data, gesture) => {
          // To avoid onRegionChangeComplete() callback is called infinitely
          if (isAndroidDevice() && !gesture.isGesture) {
            return;
          }
          changeRegion(data as IRealtimeLocation);
        }}
        onLongPress={() => setSelectedTerryId(null)}
        region={region}>
        {isSaveBatterryMode ? null : <UserMarker userPosition={currentLocation} centerMap={onCenter} />}
        {publicTerries?.map(treasure => (
          <TreasureMarker
            key={treasure.id}
            treasure={treasure}
            isSelect={treasure.id === selectedTerryId}
            setSelectedTerry={setSelectedTerryId}
            centerToRegion={centerToRegion}
          />
        ))}
      </MapView>

      {!(selectedTerry && selectedTerryId) ? (
        <View style={styles.listButtonFooterContainer}>
          <CustomButtonIcon
            onPress={handlePressTypeMap}
            buttonColor={EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<TypeMapIcon />}
          />
          {isBuilderNamespace && (
            <CustomButtonIcon
              onPress={handleCreateNewTerry}
              buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
              customStyleContainer={styles.buttonContainer}
              buttonType={EButtonType.SOLID}
              renderIcon={<AddNewTerryIcon />}
            />
          )}
          <CustomButtonIcon
            onPress={handlePressFilterMap}
            buttonColor={EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<FilterMapIcon />}
          />
          <CustomButtonIcon
            onPress={onCenter}
            buttonColor={EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<TargetIcon />}
          />
        </View>
      ) : null}

      <CityNameBoard region={region} mapRef={mapRef} />

      {selectedTerry && selectedTerryId ? (
        <View style={styles.listButtonFooterContainer}>
          <CustomButtonIcon
            onPress={() => updateTerryUserCustomData({ markAsFavourited: !selectedTerry.favourite })}
            buttonColor={selectedTerry.favourite ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<HeartIcon focus={selectedTerry.favourite} />}
          />
          <CustomButtonIcon
            onPress={() => updateTerryUserCustomData({ markAsSaved: !selectedTerry.saved })}
            buttonColor={selectedTerry.saved ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<SavedIcon focus={selectedTerry.saved} />}
          />
        </View>
      ) : null}

      {selectedTerry && selectedTerryId ? <TerryPreviewBoard terry={selectedTerry} mapRef={mapRef} /> : null}

      <View style={styles.listButtonRHNContainer}>
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN));
          }}
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<UserProfileIcon />}
        />
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.SETTING_NAVIGATOR));
          }}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<SettingIcon />}
        />
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.HISTORY));
          }}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<HistoryIcon />}
        />
      </View>
    </CustomSafeArea>
  );
};
export default MapScreen;
