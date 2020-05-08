import http from "./httpService";
import config from "./config.json";

const userApiEndPoint = config.apiEndPointUrl + "/users";

export function register(user) {
  return http.post(userApiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
