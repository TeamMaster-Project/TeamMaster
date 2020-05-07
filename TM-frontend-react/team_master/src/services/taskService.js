import http from "./httpService";
import config from "./config.json";

const taskApiEndPoint = config.apiEndPointUrl + "/tasks/";

export function getTasks() {
  return http.get(taskApiEndPoint);
}

export function getTask(taskId) {
  return http.get(taskApiEndPoint + taskId);
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task };
    delete body._id;
    return http.put(taskApiEndPoint + task._id, body);
  }

  return http.post(taskApiEndPoint, task);
}

export function deleteTask(taskId) {
  return http.delete(taskApiEndPoint + taskId);
}
