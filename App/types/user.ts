import { EIdentifierType, ELanguageCode, ENamespace, EUserRole, EUseRoleRequestStatus } from 'App/enums';

export interface IUser extends IProfileResDto {}

export interface IAccountCredentialsResDto {
  passwordChangedAt: string;
  token: string;
  refreshToken: string;
}

export interface IAccountResponseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  namespace: ENamespace;
  blocked: boolean;
  identifier: string;
  identifierType: EIdentifierType;
  credentials: IAccountCredentialsResDto;
}

export interface IProfileResDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  bio?: string;
  rewardPoints: number;
  email?: string;
  phoneNumber?: string;
  slug: string;
  userId: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
  role: EUserRole;
  roleRequestingStatus?: EUseRoleRequestStatus;
  roleRequesting?: EUserRole;
  totalCheckedinTerry?: number;
  conversationId?: string; // only available on user api to get other profile
}

export interface ICreateProfileReqDto {
  displayName: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
}

export interface IUploadProfileResDto {
  photoUrl: string;
}

export interface IRequestRefreshTokenResDto {
  token: string;
  refreshToken: string;
}

export interface ICreateAccountDto {
  code: string;
  password: string;
  namespace: ENamespace;
  identifier: string;
  identifierType: EIdentifierType;
}

export interface IAccountLoginDto {
  password: string;
  identifier: string;
  identifierType: EIdentifierType;
  namespace: ENamespace;
}
export interface ISendVerificationDto {
  namespace: ENamespace;
  identifierType: EIdentifierType;
  identifier: string;
  isRecoverPassword: boolean;
}

export interface IVerifyAccountRecoverOTPDto {
  namespace: ENamespace;
  identifierType: EIdentifierType;
  identifier: string;
  otp: string;
}

export interface IVerifyAccountRecoverOTPResDto {
  recoveryCode: string;
}

export interface IRecoveryAccountDto {
  code: string;
  password: string;
  namespace: ENamespace;
  identifier: string;
  identifierType: EIdentifierType;
}

export interface IProfileDto {
  id: string;
  displayName: string;
  photoUrl?: string;
}

export interface IAccountUpdateCredentialsDto {
  password: string;
  oldPassword: string;
}

export interface ICreateOrUpdateDeviceInputDto {
  fcmToken: string;
  enabled: boolean;
}
