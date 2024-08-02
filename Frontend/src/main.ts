import { Routes } from "./constants/Routes";
import { navigateTo } from "./utils/Navigate";

const accessToken = localStorage.getItem("accessToken");

window.onpopstate = (event) => {
  const path = window.location.pathname;
  navigateTo(path);
};

navigateTo(Routes.DASHBOARD);
