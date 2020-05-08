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

// export function saveUsers(basket) {
//   if (basket._id) {
//     const body = { ...basket };
//     delete body._id;
//     return http.put(basketApiEndPoint + basket._id, body);
//   }

//   return http.post(basketApiEndPoint, basket);
// }

export function getUsers() {
  return http.get(userApiEndPoint);
}

export function getUser(userId) {
  return http.get(userApiEndPoint + userId);
}

export function deleteUser(userId) {
  return http.delete(userApiEndPoint + userId);
}
