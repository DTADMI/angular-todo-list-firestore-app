import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,

  serverUrl: "https://node-todo-list-api.web.app/todolist",
  authServerUrl: "https://node-todo-list-api.web.app/auth",
  production: true
};
