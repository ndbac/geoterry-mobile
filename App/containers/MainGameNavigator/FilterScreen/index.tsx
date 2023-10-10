import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { ITerryCategoryResDto } from 'App/types/category';
import { ITerryFilterParams } from 'App/types/terry';
import { filter, map } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from './FilterItem';
import FilterItemWithCheckbox, { IOption } from './FilterItemWithCheckbox';
import { styles } from './styles';

const FilterScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const applyFilter = useCallback(() => {
    dispatch(sagaUserAction.getPublicTerriesAsync({} as ITerryFilterParams, navigation));
  }, [dispatch, navigation]);
  const publicTerryFilter = useSelector(reduxSelector.getAppPublicTerryFilter);
  const resetFilter = useCallback(() => {}, []);
  const publicTerryCategories = useSelector(reduxSelector.getAppPublicCategories);
  const selectedCategoryIds = useMemo(() => {
    return publicTerryFilter?.categoryIds;
  }, [publicTerryFilter?.categoryIds]);
  const selectedCategoryOptions = useMemo(() => {
    const selectedCategories = filter(
      publicTerryCategories as ITerryCategoryResDto[],
      (o: ITerryCategoryResDto) => !!selectedCategoryIds?.includes(o.id),
    );
    return map(
      selectedCategories,
      (o: ITerryCategoryResDto) =>
        ({
          id: o.id,
          title: o?.name,
          value: o?.id,
        } as IOption),
    );
  }, [publicTerryCategories, selectedCategoryIds]);
  const publicTerryCategoryOptions: IOption[] = useMemo(() => {
    return map(
      publicTerryCategories,
      category =>
        ({
          title: category.name,
          value: category.id,
          id: category.id,
        } as IOption),
    );
  }, [publicTerryCategories]);

  const setSelectedCategoryOptions = useCallback(
    (options: IOption[]) => {
      dispatch(reduxAppAction.setPublicFilterTerries({ categoryIds: map(options, 'id') }));
    },
    [dispatch],
  );

  const onRangeChange = useCallback(
    (id: string, low: number, high: number, min: number, max: number) => {
      dispatch(
        reduxAppAction.setPublicFilterTerries({
          [id]: { min: (low * (max - min)) / 10, max: (high * (max - min)) / 10 },
        }),
      );
    },
    [dispatch],
  );
  useEffect(() => {
    console.log('******', publicTerryCategoryOptions, selectedCategoryOptions);
  });
  return (
    <CustomSwipeUpModal title={t('Bộ lọc')}>
      <View style={styles.container}>
        <ScrollView>
          <FilterItem
            low={publicTerryFilter?.size?.min}
            high={publicTerryFilter?.size?.max}
            onValueChange={onRangeChange}
            id="size"
            title={t('Kích thước')}
            max={5}
            min={0}
          />
          <FilterItem
            low={publicTerryFilter?.distance?.min || 0}
            high={publicTerryFilter?.distance?.max || 0}
            onValueChange={onRangeChange}
            id="distance"
            title={t('Khoảng cách')}
            max={5}
            min={0}
          />
          <FilterItem
            low={publicTerryFilter?.difficulty?.min || 0}
            high={publicTerryFilter?.difficulty?.max || 0}
            onValueChange={onRangeChange}
            id="difficulty"
            title={t('Độ khó')}
            max={5}
            min={0}
          />
          <FilterItem
            low={publicTerryFilter?.rate?.min || 0}
            high={publicTerryFilter?.rate?.max || 0}
            onValueChange={onRangeChange}
            id="rate"
            title={t('Đánh giá')}
            max={5}
            min={0}
          />

          <FilterItemWithCheckbox
            title={t('Danh mục')}
            options={publicTerryCategoryOptions}
            selectedOptions={selectedCategoryOptions}
            setSelectedOptions={setSelectedCategoryOptions}
            shouldShowDivider={false}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={resetFilter}
            customStyleText={styles.customOutlineButtonText}
            customStyleContainer={styles.customOutlineButtonContainer}
            title={t('Xoá bộ lọc')}
            buttonType={EButtonType.OUTLINE}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={applyFilter}
            title={t('Áp dụng')}
            buttonType={EButtonType.SOLID}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          />
        </View>
      </View>
    </CustomSwipeUpModal>
  );
};

export default FilterScreen;
