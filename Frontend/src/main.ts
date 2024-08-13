import { Routes } from "./constants/Routes";
import { navigateTo } from "./utils/Navigate";

window.onpopstate = (event) => {
  const path = window.location.pathname;
  navigateTo(path);
};

navigateTo(Routes.DASHBOARD);
