/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterScreen from './FilterScreen';
import MapScreen from './Map';
import MapTypeScreen from './MapTypeScreen';
import { sagaUserAction } from 'App/redux/actions/userAction';
import SettingNavigator from '../Setting';
import TerryDetailScreen from './TerryDetail';
import ProfileScreen from '../Profile';
import EditProfileScreen from '../EditProfile';
import QRScreen from '../QRScreen';
import LoadingModal from '../Modal/LoadingModal';
import HistoryScreen from '../History';
import DetailHistory from '../DetailHistory';
import CreateNewTerryScreen from './CreateNewTerry';
import PopupModal from '../Modal/PopupModal';
import Review from '../Review';
import CheckinTerryScreen from './CheckinTerry';
import CheckinTerryVoteScreen from './CheckinTerryVote';
import HuntingMapScreen from './HuntingMap';
import Chat from '../Chat';
import ChatView from '../Chat/ChatView';
import ConversationListener from '../Chat/ChatView/EventListener/ConversationListener';
import NearbyPlayerLocationListener from './EventListener/NearbyPlayerListener';

const Stack = createStackNavigator<EMainGameNavigatorParams>();

const MainGameNavigator = () => {
  const dispatch = useDispatch();
  const publicFilterCategories = useSelector(reduxSelector.getAppPublicCategories);
  useEffect(() => {
    if (isEmpty(publicFilterCategories)) {
      dispatch(sagaUserAction.getPublicFilterCategoriesAsync([]));
    }
  }, [dispatch, publicFilterCategories]);
  return (
    <>
      <Stack.Navigator initialRouteName={EMainGameScreen.MAP_SCREEN}>
        <Stack.Screen options={{ headerShown: false }} name={EMainGameScreen.MAP_SCREEN} component={MapScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            transitionSpec: {
              close: {
                animation: 'timing',
                config: {
                  duration: 200,
                },
              },
              open: {
                animation: 'timing',
                config: {
                  duration: 200,
                },
              },
            },
          }}
          name={EMainGameScreen.MAP_TYPE_SCREEN}
          component={MapTypeScreen}
        />
        <Stack.Screen
          name={EMainGameScreen.FILTER_SCREEN}
          component={FilterScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            cardStyle: {
              backgroundColor: EColor.color_00000080,
            },
          }}
        />
        <Stack.Screen
          name={EMainGameScreen.SETTING_NAVIGATOR}
          component={SettingNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EMainGameScreen.HUNTING_MAP_SCREEN}
          component={HuntingMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EMainGameScreen.TERRY_DETAIL_SCREEN}
          component={TerryDetailScreen}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: EColor.color_00000080,
            },
          }}
        />
        <Stack.Screen
          name={EMainGameScreen.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EMainGameScreen.EDIT_PROFILE_SCREEN}
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={EMainGameScreen.QR_SCREEN} component={QRScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={ENavigationScreen.LOADING_MODAL}
          component={LoadingModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name={ENavigationScreen.POPUP_SCREEN}
          component={PopupModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
        <Stack.Screen name={EMainGameScreen.HISTORY} component={HistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={EMainGameScreen.DETAIL_HISTORY}
          component={DetailHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EMainGameScreen.CREATE_NEW_TERRY_SCREEN}
          component={CreateNewTerryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={EMainGameScreen.REVIEW_SCREEN} component={Review} options={{ headerShown: false }} />
        <Stack.Screen
          name={EMainGameScreen.CHECKIN_TERRY_SCREEN}
          component={CheckinTerryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EMainGameScreen.CHECKIN_TERRY_VOTE_SCREEN}
          component={CheckinTerryVoteScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            cardStyle: {
              backgroundColor: EColor.color_00000080,
            },
          }}
        />
        <Stack.Screen name={EMainGameScreen.CHAT_SCREEN} component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name={EMainGameScreen.CHAT_VIEW_SCREEN} component={ChatView} options={{ headerShown: false }} />
      </Stack.Navigator>
      <ConversationListener />
      <NearbyPlayerLocationListener />
    </>
  );
};

export default MainGameNavigator;
