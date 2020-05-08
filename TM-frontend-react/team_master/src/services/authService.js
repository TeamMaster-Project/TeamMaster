//Authentication(login and logout)
import http from "./httpService";
import config from "./config.json";
import jwtDecode from "jwt-decode";

const apiEndPointUrl = config.apiEndPointUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPointUrl, { email, password });
  localStorage.setItem(tokenKey, jwt); //Save the token in LS
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt); //Save the token in localStorage and create a seperate login with jwt if any immidiate case we want to import a single function in another module
}
export function logout() {
  localStorage.removeItem(tokenKey); //Removing token from localstorage
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey); //Decoding the json web token user logged in
    return jwtDecode(jwt);
    //console.log(currentUser);
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
