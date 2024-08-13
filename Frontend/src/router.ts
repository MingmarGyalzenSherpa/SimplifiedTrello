import UniversalRouter, { RouteResult } from "universal-router";
import { Login } from "./components/Login";
// import { BoardView } from "./components/BoardView";
import { Signup } from "./components/Signup";
import { Routes } from "./constants/Routes";
import { MainLayout } from "./components/MainLayout";
import { IComponent } from "./interfaces/IComponent";
import { NotFound } from "./components/NotFound";

const body = document.body;

const routes: Array<{ path: Routes; action: () => RouteResult<IComponent> }> = [
  {
    path: Routes.LOGIN,
    action: () => new Login(body),
  },
  {
    path: Routes.SIGNUP,
    action: () => new Signup(body),
  },
  {
    path: Routes.DASHBOARD,
    action: () => new MainLayout(body),
  },
  {
    path: Routes.CATCHALL,
    action: () => new NotFound(body),
  },
];

export const router = new UniversalRouter(routes);
