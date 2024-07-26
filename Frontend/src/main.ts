import { navigateTo } from "./utils/Navigate";

navigateTo("/login");

window.onpopstate = (event) => {
  const path = window.location.pathname;
  console.log("onpopstate triggered. New path:", path);
  navigateTo(path);
};
