import { router } from "./router";

//navigator
const navigateTo = (path: string) => {
  history.pushState({}, "", path);
  router.resolve(path);
};

navigateTo("/login");
