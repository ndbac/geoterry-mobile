import CustomText from 'App/components/CustomText';
import CheckboxChecked from 'App/media/CheckboxChecked';
import CheckboxUncheck from 'App/media/CheckboxUncheck';
import ChevronDown from 'App/media/ChevronDown';
import ChevronUp from 'App/media/ChevronUp';
import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
export interface IOption {
  id: string;
  title: string;
  value: any;
}
export interface IFilterItemWithCheckboxProps {
  title?: string;
  id?: string;
  options?: IOption[];
  selectedOptions?: IOption[];
  setSelectedOptions?: (options: IOption[]) => void;
  shouldShowDivider?: boolean;
}
const FilterItemWithCheckbox = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  shouldShowDivider = true,
}: IFilterItemWithCheckboxProps) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const toggleShowOption = useCallback(() => {
    setIsShowOption(currentState => !currentState);
  }, []);

  const isSelectedOption = useCallback(
    (option: IOption) => {
      return selectedOptions.includes(option);
    },
    [selectedOptions],
  );

  const toggleOption = useCallback(
    (option: IOption) => {
      if (isSelectedOption(option)) {
        setSelectedOptions(selectedOptions.filter(item => item.id !== option.id));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    },
    [selectedOptions, setSelectedOptions, isSelectedOption],
  );

  return (
    <View>
      <Pressable
        onPress={toggleShowOption}
        style={[styles.openedContainer, !isShowOption && shouldShowDivider && styles.borderBottom]}>
        <>
          <CustomText style={styles.title}>{title}</CustomText>
          {isShowOption ? <ChevronUp /> : <ChevronDown />}
        </>
      </Pressable>
      {isShowOption && (
        <View style={[styles.optionContainer, shouldShowDivider && styles.borderBottom]}>
          {options?.map(option => {
            return (
              <Pressable onPress={() => toggleOption(option)}>
                <View style={styles.optionItemContainer}>
                  {isSelectedOption(option) ? <CheckboxChecked /> : <CheckboxUncheck />}
                  <CustomText style={styles.optionItemTitle}> {option.title || option.id}</CustomText>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default FilterItemWithCheckbox;
