/* eslint-disable @typescript-eslint/no-shadow */
import { EDataStorageKey } from 'App/enums';
import { EErrorCode, EStatusCode } from 'App/enums/error';
import { IAccountLoginDto, ICreateAccountDto, ISendAccountVerifyCode } from 'App/types/redux';
import { IAccountResponseDto, IProfileResDto } from 'App/types/user';
import { getStoredProperty, setPropertyInDevice } from 'App/utils/storage/storage';
import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

const AXIOS = axios.create({
  baseURL: Config.BE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const requestCreateAccount = async (data: ICreateAccountDto) => {
  return AXIOS.post('/auth/otp/register', data).then(result => result.data);
};

export const requestLogin = async (data: IAccountLoginDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/login', data).then(result => result.data);
};

export const requestGetOTP = async (data: ISendAccountVerifyCode) => {
  return AXIOS.post('/auth/otp/send', data).then(result => result.data);
};

export const requestUserReadProfile = async () => {
  return AXIOS.get<IProfileResDto>('/profile').then(result => result.data);
};

export const setAuthorizationRequestHeader = async (axios: AxiosInstance) => {
  const latestAccessToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${latestAccessToken}`;
    return config;
  });
};

export const requestRefreshToken = async (token: string, refreshToken: string) => {
  return AXIOS.put<IAccountResponseDto>('/auth/refresh', { token, refreshToken }).then(result => result.data);
};

AXIOS.interceptors.response.use(
  response => response,
  async error => {
    if (
      error?.response?.data?.errorCode === EErrorCode.FORBIDDEN_PROFILE_ACCESS &&
      error?.response?.data?.statusCode === EStatusCode.FORBIDEN
    ) {
      const originalRequest = error.config;
      const currentToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
      const currentRefreshToken = await getStoredProperty<string>(EDataStorageKey.REFRESH_TOKEN);
      const requestRefreshTokenResponse = await requestRefreshToken(
        currentToken as string,
        currentRefreshToken as string,
      );
      const { refreshToken, token } = requestRefreshTokenResponse.credentials;
      await setPropertyInDevice(EDataStorageKey.ACCESS_TOKEN, token);
      await setPropertyInDevice(EDataStorageKey.REFRESH_TOKEN, refreshToken);
      await setAuthorizationRequestHeader(AXIOS);
      return AXIOS(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default AXIOS;
