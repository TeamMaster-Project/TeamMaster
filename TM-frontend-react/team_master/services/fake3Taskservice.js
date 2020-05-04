import * as basketsAPI from "./fake2BasketService";

const tasks = [
  {
    _id: "5b22ca3eeb7f6fbccd471815",
    title: "Task 1",
    basket: {
      _id: "5b21ca3eeb7f6fbccd471815",
      name: "TODO tasks",
      project: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Design Project",
        description: "This is a sample description",
      },
    },
  },
  {
    _id: "5b23ca3eeb7f6fbccd471815",
    title: "Task 2",
    basket: {
      _id: "5b21ca3eeb7f6fbccd471816",
      name: "DOING tasks",
      project: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Design Project",
        description: "This is a sample description",
      },
    },
  },
  {
    _id: "5b24ca3eeb7f6fbccd471815",
    title: "Task 3",
    basket: {
      _id: "5b21ca3eeb7f6fbccd471819",
      name: "DONE tasks",
      project: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Design Project",
        description: "This is a sample description",
      },
    },
  },
];

export function getTasks() {
  return tasks;
}

export function getTask(id) {
  return tasks.find((m) => m._id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find((m) => m._id === task._id) || {};
  taskInDb.title = task.title;
  taskInDb.basket = basketsAPI.baskets.find((g) => g._id === basket.basketId);

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }

  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((m) => m._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}
