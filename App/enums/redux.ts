export enum EReduxUserAction {
  SET_USER = 'SET_USER',
}
export enum EReduxAppAction {
  SET_LANGUAGE_CODE = 'SET_LANGUAGE_CODE',
  SET_REGISTER_DATA = 'SET_REGISTER_DATA',
  SET_IS_LOADING = 'SET_IS_LOADING',
  MERGE_ERROR = 'MERGE_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SET_RECOVERY_CODE = 'SET_RECOVERY_CODE',
  SET_MAP_TYPE = 'SET_MAP_TYPE',
  SET_PUBLIC_CATEGORIES = 'SET_PUBLIC_CATEGORIES',
  GET_PUBLIC_FILTER_CATEGORIES = 'GET_PUBLIC_FILTER_CATEGORIES',
  SET_PUBLIC_TERRIES = 'SET_PUBLIC_TERRIES',
  SET_PUBLIC_FILTER_TERRIES = 'SET_PUBLIC_FILTER_TERRIES',
  SET_PUBLIC_TERRY = 'SET_PUBLIC_TERRY',
  SET_TERRY_CHECKINS = 'SET_TERRY_CHECKINS',
  SET_CHECKIN_TERRY_DATA = 'SET_CHECKIN_TERRY_DATA',
  SET_COORDINATES_PATH = 'SET_COORDINATES_PATH',
  SET_OTHER_USER_PROFILE_TO_DISPLAY = 'SET_OTHER_USER_PROFILE_TO_DISPLAY',
  SET_USER_NEARBY_PLAYERS = 'SET_USER_NEARBY_PLAYERS',
  // Use MERGE_* when you want to merge the data with the existing one
  // Use SET_* when you want to replace the existing data
  SET_LOADING_STATES = 'SET_LOADING_STATES',
  SET_CONVERSATIONS = 'SET_CONVERSATIONS',
  MERGE_CONVERSATIONS = 'MERGE_CONVERSATIONS',
  // To mark conversation as read by id
  MARK_CONVERSATION_AS_READ = 'MARK_CONVERSATION_AS_READ',
  SET_CONVERSATION_MESSAGES = 'SET_CONVERSATION_MESSAGES',
  MERGE_CONVERSATION_MESSAGES = 'MERGE_CONVERSATION_MESSAGES',
  SET_SELECTED_CONVERSATION_ID = 'SET_SELECTED_CONVERSATION_ID',
}
export enum ESagaUserAction {
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
  GET_OTP = 'GET_OTP',
  CREATE_PROFILE = 'CREATE_PROFILE',
  HANDLE_SUBMIT_DISPLAY_NAME = 'HANDLE_SUBMIT_DISPLAY_NAME',
  UPLOAD_AVATAR_PROFILE = 'UPLOAD_AVATAR_PROFILE',
  VERIFY_RECOVER_OTP = 'VERIFY_RECOVER_OTP',
  ACCOUNT_RECOVER = 'ACCOUNT_RECOVER',
  GET_PROFILE_AND_GO_TO_MAIN_APP = 'GET_PROFILE_AND_GO_TO_MAIN_APP',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS',
  GET_TERRY_CHECKINS = 'GET_TERRY_CHECKINS',
  SWITCH_ROLE = 'SWITCH_ROLE',
  GET_USER_NEARBY_PLAYERS = 'GET_USER_NEARBY_PLAYERS',
}

export enum ESagaAppAction {
  GET_PUBLIC_FILTER_CATEGORIES = 'GET_PUBLIC_FILTER_CATEGORIES',
  GET_PUBLIC_TERRIES = 'GET_PUBLIC_TERRIES',
  GET_PUBLIC_TERRY_BY_ID = 'GET_TERRY_BY_ID',
  BUILDER_CREATE_TERRY = 'BUILDER_CREATE_TERRY',
  HUNTER_CHECKIN_TERRY = 'HUNTER_CHECKIN_TERRY',
  HUNTER_UPDATE_TERRY_PATH = 'HUNTER_UPDATE_TERRY_PATH',
  GET_PUBLIC_PROFILE = 'GET_PUBLIC_PROFILE',
  GET_OTHER_PROFILE = 'GET_OTHER_PROFILE',
  HUNTER_FILTER_CONVERSATIONS = 'HUNTER_FILTER_CONVERSATIONS',
  HUNTER_READ_CONVERSATION = 'HUNTER_READ_CONVERSATION',
  HUNTER_SEND_MESSAGE = 'HUNTER_SEND_MESSAGE',
}
