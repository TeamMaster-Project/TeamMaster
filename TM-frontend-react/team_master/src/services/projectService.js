import http from "./httpService";
import config from "./config.json";

const projectApiEndPoint = config.apiEndPointUrl + "/projects/";

export function getProjects() {
  return http.get(projectApiEndPoint);
}

export function getProject(projectId) {
  return http.get(projectApiEndPoint + projectId);
}

export function saveProjects(project) {
  if (project._id) {
    const body = { ...project };
    delete body._id;
    return http.put(projectApiEndPoint + project._id, body);
  }

  return http.post(projectApiEndPoint, project);
}

export function deleteProject(projectId) {
  return http.delete(projectApiEndPoint + projectId);
}
