import UniversalRouter from "universal-router";
import { Login } from "./components/Login";
// import { BoardView } from "./components/BoardView";
import { Signup } from "./components/Signup";
import { Routes } from "./constants/Routes";
import { MainLayout } from "./components/MainLayout";

const body = document.body;

const routes = [
  {
    path: Routes.LOGIN,
    action: () => new Login(body),
  },
  // {
  //   path: Routes.BOARD,
  //   action: () => BoardView(body),
  // },
  {
    path: Routes.SIGNUP,
    action: () => new Signup(body),
  },
  {
    path: Routes.DASHBOARD,
    action: () => new MainLayout(body),
  },
];

export const router = new UniversalRouter(routes);
