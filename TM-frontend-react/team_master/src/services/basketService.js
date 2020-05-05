import http from "./httpService";
import config from "./config.json";

const basketApiEndPoint = config.apiEndPointUrl + "/baskets/";

export function getBaskets() {
  return http.get(basketApiEndPoint);
}

export function getBasket(basketId) {
  return http.get(basketApiEndPoint + basketId);
}

export function saveBasket(basket) {
  if (basket._id) {
    const body = { ...basket };
    delete body._id;
    return http.put(basketApiEndPoint + basket._id, body);
  }

  return http.post(basketApiEndPoint, basket);
}

export function deleteBasket(basketId) {
  return http.delete(basketApiEndPoint + basketId);
}
