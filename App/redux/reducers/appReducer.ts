import { ELanguageCode } from 'App/enums';
import { EReduxAppAction } from 'App/enums/redux';
import { IAppState, IReduxAction } from 'App/types/redux';

const defaultAppState: IAppState = {
  language: ELanguageCode.VN,
  registerData: {},
  isLoading: false,
  error: [],
  recoveryCode: '',
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
    default:
      return state;
  }
};
export { appReducer };
