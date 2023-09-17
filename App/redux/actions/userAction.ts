import { PayloadAction } from '@reduxjs/toolkit';
import { EReduxUserAction, ESagaUserAction } from 'App/enums/redux';
import { ISagaAsyncActionOptions } from 'App/types/redux';

import { IAccountLoginDto, ICreateAccountDto, IUser, IVerifyAccountRecoverOTPDto } from 'App/types/user';

const reduxUserAction = {
  setUser: (user: Partial<IUser>): PayloadAction<Partial<IUser>> => {
    return {
      type: EReduxUserAction.SET_USER,
      payload: user,
    };
  },
};

const sagaUserAction = {
  createAccountAsync: (data: ICreateAccountDto, navigation: any) => {
    return {
      type: ESagaUserAction.CREATE_ACCOUNT,
      payload: { data, navigation },
    };
  },
  loginAsync: (data: IAccountLoginDto, navigation: any) => {
    return {
      type: ESagaUserAction.LOGIN_ACCOUNT,
      payload: { data, navigation },
    };
  },
  getOTPAsync: (data: ICreateAccountDto, navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaUserAction.GET_OTP,
      payload: { data, navigation, options },
    };
  },
  createProfileAsync: (navigation: any) => {
    return {
      type: ESagaUserAction.CREATE_PROFILE,
      payload: { navigation },
    };
  },
  handleSubmitDisplayNameAsync: (data: string, navigation: any) => {
    return {
      type: ESagaUserAction.HANDLE_SUBMIT_DISPLAY_NAME,
      payload: { data, navigation },
    };
  },
  uploadAvatarProfileAsync: (data: any, navigation: any) => {
    return {
      type: ESagaUserAction.UPLOAD_AVATAR_PROFILE,
      payload: { data, navigation },
    };
  },
  verifyRecoveyOTPAsync: (data: IVerifyAccountRecoverOTPDto, navigation: any) => {
    return {
      type: ESagaUserAction.VERIFY_RECOVER_OTP,
      payload: { data, navigation },
    };
  },
  accountRecoverAsync: (data: string, navigation: any) => {
    return {
      type: ESagaUserAction.ACCOUNT_RECOVER,
      payload: { data, navigation },
    };
  },
};

export { reduxUserAction, sagaUserAction };
