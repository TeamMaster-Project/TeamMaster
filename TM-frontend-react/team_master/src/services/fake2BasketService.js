import * as projectsAPI from "./fake1ProjectService";

const baskets = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "TODO tasks",
    project: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Design Project",
      description: "This is a sample description",
    },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "DOING tasks",
    project: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Design Project",
      description: "This is a sample description",
    },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "DONE tasks",
    project: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Design Project",
      description: "This is a sample description",
    },
  },
];

export function getBaskets() {
  return baskets;
}

export function getBasket(id) {
  return baskets.find((m) => m._id === id);
}

export function saveBasket(basket) {
  let basketInDb = baskets.find((m) => m._id === basket._id) || {};
  basketInDb.name = basket.name;
  basketInDb.project = projectsAPI.projects.find(
    (g) => g._id === project.projectId
  );

  if (!basketInDb._id) {
    basketInDb._id = Date.now().toString();
    baskets.push(basketInDb);
  }

  return basketInDb;
}

export function deleteBasket(id) {
  let basketInDb = baskets.find((m) => m._id === id);
  baskets.splice(baskets.indexOf(basketInDb), 1);
  return basketInDb;
}
