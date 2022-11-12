import config from '../config'
import api from 'zmp-sdk'
import { getDeveloperAccessToken } from "zmp-developer-token";

export const login = () => new Promise<boolean>(resolve => {
  api.login({
    success: () => resolve(true),
    fail: error => {
      console.error(error);
      resolve(false)
    }
  })
});

export const getAccessToken = async () => {
  let token = await api.getAccessToken();
  if (token === 'DEFAULT ACCESS TOKEN') {
    token = await getDeveloperAccessToken();
  }
  return token;
}

export const keepScreenOn = () => api.keepScreen({ keepScreenOn: true });

export const getUserInfo = () => api.getUserInfo({ avatarType: 'small' });