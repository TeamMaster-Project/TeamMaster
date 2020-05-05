export const projects = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "Design Project",
    description: "This is a sample description",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "SL Inspire",
    description: "This is a sample description",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "IEEE Techno",
    description: "This is a sample description",
  },
];

export function getProjects() {
  return projects.filter((g) => g);
}

export function getProject(id) {
  return projects.find((m) => m._id === id);
}

export function saveProject(project) {
  let projectInDb = projects.find((m) => m._id === project._id) || {};
  projectInDb.name = project.name;
  projectInDb.description = project.description;
  // projectInDb.members = userAPI.users.find(
  //   (g) => g._id === user.userId
  // );

  if (!projectInDb._id) {
    projectInDb._id = Date.now().toString();
    projects.push(projectInDb);
  }

  return projectInDb;
}

export function deleteBasket(id) {
  let projectInDb = projects.find((m) => m._id === id);
  projects.splice(projects.indexOf(projectInDb), 1);
  return projectInDb;
}
