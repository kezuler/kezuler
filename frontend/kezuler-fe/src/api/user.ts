import axios from 'axios';

import KezulerInstance, { HOST_ADDRESS } from 'src/constants/api';
import {
  PPatchUserGoogleToggle,
  PPatchUserProfile,
  PPatchUserTimezone,
  RPostRefresh,
  RPostUser,
  RSettingUser,
} from 'src/types/user';

// 로그인 / 회원 가입
// accessToken: Kakao Access Token
const postAuth = (accessToken: string) =>
  axios.post<RPostUser>(
    `${HOST_ADDRESS}/auth/token`,
    {
      registerWith: 'kakao',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

const postRefresh = (refreshToken: string) =>
  axios.post<RPostRefresh>(`${HOST_ADDRESS}/auth/re`, undefined, {
    headers: {
      REFRESHTOKEN: refreshToken,
    },
  });

// 현재 유저 정보 가져오기
const getUser = () => KezulerInstance.get<RSettingUser>('user');

const patchUserProfile = (params: PPatchUserProfile) => {
  const form = new FormData();
  form.append('userName', params.userName);
  form.append('userEmail', params.userEmail);
  if (params.profile) {
    form.append('profile', params.profile as File);
  } else {
    form.append('profile', new File([], ''));
  }

  return KezulerInstance.patch<RSettingUser>('user', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteProfileImg = () => KezulerInstance.delete('user/profile');

const patchUserGoogle = (params: PPatchUserGoogleToggle) =>
  KezulerInstance.patch<RSettingUser>('user/google', {
    ...params,
  });

const patchUserTimeZone = (params: PPatchUserTimezone) =>
  KezulerInstance.patch<RSettingUser>('user/timezone', {
    ...params,
  });

// 현재 유저 정보 삭제
const deleteUser = () => KezulerInstance.delete('user');

export {
  getUser,
  deleteUser,
  postAuth,
  postRefresh,
  patchUserGoogle,
  patchUserTimeZone,
  patchUserProfile,
  deleteProfileImg,
};
