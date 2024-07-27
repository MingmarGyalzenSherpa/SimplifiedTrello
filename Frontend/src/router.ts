import UniversalRouter from "universal-router";
import { Login } from "./components/Login";
import { BoardView } from "./components/BoardView";
import { Signup } from "./components/Signup";
import { Routes } from "./constants/Routes";

const body = document.body;

const routes = [
  {
    path: Routes.LOGIN,
    action: () => Login(body),
  },
  {
    path: Routes.BOARD,
    action: () => BoardView(body),
  },
  {
    path: Routes.SIGNUP,
    action: () => Signup(body),
  },
];

export const router = new UniversalRouter(routes);
