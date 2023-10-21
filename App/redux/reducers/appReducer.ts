import { RADIUS_TO_GET_NEARBY_TERRY } from 'App/constants/common';
import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction } from 'App/enums/redux';
import { IAppState, IReduxAction } from 'App/types/redux';

const defaultAppState: IAppState = {
  language: ELanguageCode.VN,
  registerData: {},
  isLoading: false,
  error: [],
  recoveryCode: '',
  mapType: EMapType.STANDARD,
  publicCategories: [],
  publicTerries: [],
  publicTerryFilter: {
    categoryIds: undefined,
    size: { min: 1, max: 5 },
    difficulty: { min: 1, max: 5 },
    rate: { min: 1, max: 5 },
    terrain: { min: 1, max: 5 },
    distance: { min: 0, max: RADIUS_TO_GET_NEARBY_TERRY },
  },
  publicTerry: undefined,
};
const appReducer = (state = defaultAppState, action: IReduxAction<EReduxAppAction, IAppState>): IAppState => {
  switch (action.type) {
    case EReduxAppAction.SET_LANGUAGE_CODE:
      return {
        ...state,
        language: action.payload?.language,
      };
    case EReduxAppAction.SET_REGISTER_DATA:
      return {
        ...state,
        registerData: {
          ...state.registerData,
          ...action.payload?.registerData,
        },
      };
    case EReduxAppAction.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };
    case EReduxAppAction.MERGE_ERROR:
      return {
        ...state,
        error: [...(state.error || []), ...(action.payload?.error || [])],
      };
    case EReduxAppAction.CLEAR_ERROR:
      return {
        ...state,
        error: [],
      };
    case EReduxAppAction.SET_RECOVERY_CODE:
      return {
        ...state,
        recoveryCode: action.payload?.recoveryCode,
      };
    case EReduxAppAction.SET_MAP_TYPE:
      return {
        ...state,
        mapType: action.payload?.mapType,
      };
    case EReduxAppAction.SET_PUBLIC_CATEGORIES:
      return {
        ...state,
        publicCategories: action.payload?.publicCategories,
      };
    case EReduxAppAction.SET_PUBLIC_TERRIES:
      return {
        ...state,
        publicTerries: action.payload?.publicTerries,
      };
    case EReduxAppAction.SET_PUBLIC_FILTER_TERRIES:
      return {
        ...state,
        publicTerryFilter: {
          ...state.publicTerryFilter,
          ...action.payload?.publicTerryFilter,
        },
      };
    case EReduxAppAction.SET_PUBLIC_TERRY:
      return {
        ...state,
        publicTerry: action.payload?.publicTerry,
      };
    default:
      return state;
  }
};
export { appReducer };
