import { Routes } from "./constants/Routes";
import { navigateTo } from "./utils/Navigate";

navigateTo(Routes.LOGIN);
const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

window.onpopstate = (event) => {
  const path = window.location.pathname;
  console.log("onpopstate triggered. New path:", path);
  navigateTo(path);
};
