import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: rh(24),
  },
  headerContainer: {
    paddingVertical: rh(8),
    paddingHorizontal: rw(16),
  },
  terryNameText: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    textAlign: 'center',
    paddingVertical: rh(8),
  },
  terryDistanceAndCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: rw(4),
  },
  terryDistanceAndCategoryText: {
    color: EColor.color_F2F2F2,
    fontSize: rh(10),
    fontWeight: '500',
    lineHeight: rh(16),
  },
  terrySubHeaderContainer: {
    paddingVertical: rh(8),
    paddingHorizontal: rw(16),
    width: '100%',
  },
  terryCreateByAndCreateAtContainer: {},
  terryCreateByText: {
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
    textAlign: 'center',
  },
  terryCreateByDisplayNameText: {
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
    textAlign: 'center',
  },
  terryCreateAtText: {
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
    textAlign: 'center',
  },
  suggestionAndRateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: rh(10),
  },
  suggestionAndRateDivider: {
    backgroundColor: EColor.color_FAFAFA,
    width: 1,
    height: rh(16),
  },
  suggestionAndRateButton: {
    flex: 1,
  },
  suggestionAndRateText: {
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
    textAlign: 'center',
  },
  terryMainContainer: {
    width: '100%',
    marginTop: rh(4),
    maxHeight: rh(400),
  },

  terryItemContainer: {
    paddingVertical: rh(16),
    paddingHorizontal: rw(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: EColor.color_666666,
    borderBottomWidth: rw(0.5),
  },

  terryItemTitleAndSubtitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  terryItemTitleText: {
    fontSize: rh(14),
    fontWeight: '600',
    color: EColor.color_FAFAFA,
    lineHeight: rh(20),
    marginBottom: rh(2),
  },
  terryItemSubtitleText: {
    fontSize: rh(10),
    fontWeight: '400',
    color: EColor.color_999999,
    lineHeight: rh(16),
  },
  terryItemValueText: {
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
  },
  terryFooterContainer: {
    width: '100%',
    marginTop: rh(4),
    paddingHorizontal: rw(16),
    paddingVertical: rh(8),
    rowGap: rh(4),
  },

  itemImageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
    marginLeft: rw(16),
  },
  itemImage: {
    width: rw(68),
    height: rh(68),
    backgroundColor: EColor.color_171717,
  },
  separator: {
    backgroundColor: EColor.color_FAFAFA,
    height: rh(0.5),
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '100%',
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: rh(24),
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: rw(1) },
});
