import http from "./httpService";
import config from "./config.json";

const userApiEndPoint = config.apiEndPointUrl + "/users/";

export function register(user) {
  return http.post(userApiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}


export function getUsers() {
  return http.get(userApiEndPoint);
}

export function getUser(userId) {
  return http.get(userApiEndPoint + userId);
}

export function deleteUser(userId) {
  return http.delete(userApiEndPoint + userId);
}
