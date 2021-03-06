import axios from "axios";
import * as CONST from '../../../../Constant'
import jwt_decode from "jwt-decode";

var dayjs = require("dayjs");

export const LOGIN_URL = `${CONST.API_URL}/Auth/login`;
export const REGISTER_URL = `/Auth/register`;
export const REQUEST_PASSWORD_URL = `api/auth/forgot-password`;
export const RENEW_TOKEN_URL = `${CONST.API_URL}/Auth/renew`

export const ME_URL = `${CONST.API_URL}/Auth/renew`;
export const CHANGPASSWORD_URL = `${CONST.API_URL}/Auth/user/changepassword`;

export function login(username, password, source) {
  return axios.post(LOGIN_URL, { username, password, source });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken(token) {
  let decoded = jwt_decode(token)['unique_name'];
  return decoded;
}

export function getExp(token) {
  let decoded = jwt_decode(token);
  return dayjs.unix(decoded.exp);
}

export function renewToken() {
  return axios.post(RENEW_TOKEN_URL)
}

export function changepassword(oldPassword, oldConfirmPassword, newPassword, newConfirmPassword) {
  return axios.post(CHANGPASSWORD_URL, { oldPassword, oldConfirmPassword, newPassword, newConfirmPassword })
}

export function getRoles(token) {
  let decoded = jwt_decode(token);
  let result = [];

  if (!decoded.role) {
    return []
  }

  //push role ลง array(fix bug role --> "r","o","l","e")
  if (Array.isArray(decoded.role)) {
    result = decoded.role
  } else {
    result.push(decoded.role)
  }

  return result;
}