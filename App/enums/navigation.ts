export enum ENavigationScreen {
  SPLASH_SCREEN = 'SPLASH_SCREEN',
  ONBOARDING_SCREEN = 'ONBOARDING_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  FORGOT_PASSWORD_SCREEN = 'FORGOT_PASSWORD_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',
  OTP_SCREEN = 'OTP_SCREEN',
  LOADING_MODAL = 'LOADING_MODAL',
  CREATE_PROFILE_NAVIGATOR = 'CREATE_PROFILE_NAVIGATOR',
  FORGOT_PASSWORD_NAVIGATOR = 'FORGOT_PASSWORD_SCREEN_NAVIGATOR',
  MAIN_GAME_NAVIGATOR = 'MAIN_GAME_NAVIGATOR',
  NETWORK_LOGGER_SCREEN = 'NETWORK_LOGGER_SCREEN',
}

export enum ECreateProfileScreen {
  ENTER_DISPLAY_NAME_SCREEN = 'ENTER_DISPLAY_NAME_SCREEN',
  CHOOSE_AVATAR_SCREEN = 'CHOOSE_AVATAR_SCREEN',
  CREATE_PROFILE_SUCCESS_SCREEN = 'CREATE_PROFILE_SUCCESS_SCREEN',
  PERMISSION_LOCATION_SCREEN = 'PERMISSION_LOCATION_SCREEN',
}

export enum EForgotPasswordScreen {
  INPUT_PHONE_NUMBER_SCREEN = 'INPUT_PHONE_NUMBER_SCREEN',
  INPUT_NEW_PASSWORD_SCREEN = 'INPUT_NEW_PASSWORD_SCREEN',
}

export enum EMainGameScreen {
  MAP_SCREEN = 'MAP_SCREEN',
  MAP_TYPE_SCREEN = 'MAP_TYPE_SCREEN',
  FILTER_SCREEN = 'FILTER_SCREEN',
  SETTING_NAVIGATOR = 'SETTING_NAVIGATOR',
}

export enum ESettingNavigator {
  MENU_SCREEN = 'MENU_SCREEN',
  UPGRADE_VERSION_SCREEN = 'UPGRADE_VERSION_SCREEN',
  RULE_SCREEN = 'RULE_SCREEN',
  LANGUAGE_SCREEN = 'LANGUAGE_SCREEN',
  PASSWORD_SCREEN = 'PASSWORD_SCREEN',
  LOW_ENERGY_SCREEN = 'LOW_ENERGY_SCREEN',
  POLICY_SCREEN = 'POLICY_SCREEN',
  ABOUT_SCREEN = 'ABOUT_SCREEN',
}
