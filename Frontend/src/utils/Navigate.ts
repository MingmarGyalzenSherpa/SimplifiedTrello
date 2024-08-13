import { router } from "../router";

//navigator
export const navigateTo = (path: string) => {
  history.pushState({}, "", path);
  router.resolve(path);
};


