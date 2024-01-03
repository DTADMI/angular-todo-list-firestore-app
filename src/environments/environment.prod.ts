import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,

  clientBaseUrl: "https://darryltadmi-todo-list-angular.web.app",
  serverBaseUrl: `https://node-todo-list-api.web.app`,
  serverUrl: `https://node-todo-list-api.web.app/todolist`,
  authServerUrl: "https://node-todo-list-api.web.app/auth",
  production: true
};
