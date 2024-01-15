import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import { convertDateRelativeToNowMsg } from 'App/utils/convert';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { IConversationResDto } from 'App/types/chat';
import { sagaUserAction } from 'App/redux/actions/userAction';

const Chat = () => {
  const user = useSelector(reduxSelector.getUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(sagaUserAction.hunterFilterConversationsAsync({ includeProfileData: true }));
  }, [dispatch, isFocused]);
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const conversations = useSelector(reduxSelector.getConversations);
  const conversationsToDisplay = useMemo(() => {
    if (!conversations) {
      return [];
    }
    return Object.values(conversations);
  }, [conversations]);

  const renderItem = useCallback(
    ({ item }: { item: IConversationResDto }) => {
      const userFriend = item?.participants?.find(e => e.profileId !== user.id);
      const me = item?.participants?.find(e => e.profileId === user.id);
      return (
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate(EMainGameScreen.CHAT_VIEW_SCREEN, {
                conversationId: item.id,
              }),
            );
          }}>
          {userFriend?.logoUrl ? (
            <Image
              source={{
                uri: userFriend.logoUrl,
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatar}>
              <MapMarkerUserDefault width={rh(48)} height={rh(48)} />
            </View>
          )}
          <View style={styles.content}>
            <CustomText style={styles.name}>{userFriend?.displayName}</CustomText>
            <View style={styles.containerLastMsg}>
              {me?.unreadMsgCnt ? (
                <LinearGradient
                  colors={[EColor.color_C072FD, EColor.color_51D5FF]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dotUnRead}
                />
              ) : undefined}
              <CustomText
                style={[
                  styles.msg,
                  {
                    color: me?.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me?.unreadMsgCnt && styles.fontW500,
                ]}>
                {item.lastMsg.sentByProfileId === user.id ? `${t('Bạn')}: ` : `${userFriend?.displayName}: `}
              </CustomText>
              <CustomText
                style={[
                  styles.msg,
                  {
                    color: me?.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me?.unreadMsgCnt && styles.fontW500,
                ]}>
                {item.lastMsg.snippet}
              </CustomText>
              <View style={styles.dot} />
              <CustomText style={styles.msg}>
                {t(convertDateRelativeToNowMsg(item.lastMsg.sentAt, user.languageCode))}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, t, user.id, user.languageCode],
  );
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Trò chuyện')} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={conversationsToDisplay}
        renderItem={renderItem}
        style={styles.containList}
      />
    </CustomSafeArea>
  );
};

export default Chat;
