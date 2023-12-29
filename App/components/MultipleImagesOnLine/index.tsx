import { View, Image, ViewStyle, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ArrowMaximize from 'App/media/ArrowMaximize';
import CustomText from '../CustomText';
import { styles } from './styles';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import DismissCircleIcon from 'App/media/DismissCircleIcon';

interface Props {
  images: string[];
  numColumns?: number;
  showIconMaximize?: boolean;
  containerImageStyle?: ViewStyle;
  containerItemImageStyle: ViewStyle;
  canRemoveImage?: boolean;
  removeImage?: (url: string) => void;
}
const MultipleImagesOnLine = (props: Props) => {
  const [visible, setIsVisible] = useState(false);
  const [listImagesView, setListImagesView] = useState<ImageSource[]>([]);
  const [indexImage, setIndexImage] = useState(0);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      if (!props.numColumns) {
        return <></>;
      }
      return (
        <>
          {index < props.numColumns - 1 ? (
            <TouchableOpacity
              style={props.containerItemImageStyle}
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
              {props.showIconMaximize && <ArrowMaximize style={styles.iconArrowMaximize} />}
            </TouchableOpacity>
          ) : index === props.numColumns - 1 ? (
            <TouchableOpacity
              style={props.containerItemImageStyle}
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
              {props.images.length > props.numColumns && (
                <View style={styles.lastImage}>
                  <CustomText style={styles.textLastImage}>+{props.images.length - (props.numColumns - 1)}</CustomText>
                </View>
              )}
            </TouchableOpacity>
          ) : null}
        </>
      );
    },
    [props.containerItemImageStyle, props.images.length, props.numColumns, props.showIconMaximize],
  );

  const renderItemWithRemoveButton = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <View>
          {renderItem({ item, index })}
          <TouchableOpacity
            style={styles.dismissCircleIconButton}
            onPress={() => props.removeImage && props.removeImage(item)}>
            <DismissCircleIcon />
          </TouchableOpacity>
        </View>
      );
    },
    [renderItem, props],
  );
  useEffect(() => {
    setListImagesView(props.images.map(e => ({ uri: e })));
  }, [props.images]);
  return (
    <View style={props.containerImageStyle}>
      {props.numColumns ? (
        <FlatList
          numColumns={props.numColumns}
          data={props.images}
          renderItem={props.canRemoveImage ? renderItemWithRemoveButton : renderItem}
          scrollEnabled={false}
          columnWrapperStyle={props.images.length > 5 ? styles.columnWrapperStyle : null}
        />
      ) : (
        <ScrollView horizontal>
          {props.images?.map((url, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={props.containerItemImageStyle}
                  onPress={() => {
                    setIndexImage(index);
                    setIsVisible(true);
                  }}>
                  <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
                  {props.showIconMaximize && <ArrowMaximize style={styles.iconArrowMaximize} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dismissCircleIconButton}
                  onPress={() => props.removeImage && props.removeImage(url)}>
                  <DismissCircleIcon />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
      <ImageView
        images={listImagesView}
        keyExtractor={(_, index) => index.toString()}
        imageIndex={indexImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default MultipleImagesOnLine;
