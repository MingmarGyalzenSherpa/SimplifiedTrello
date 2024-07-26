import UniversalRouter from "universal-router";
import { Login } from "./components/Login";
import { BoardView } from "./components/BoardView";

const body = document.body;

const routes = [
  {
    path: "/login",
    action: () => Login(body),
  },
  {
    path: "/",
    action: () => BoardView(body),
  },
];

export const router = new UniversalRouter(routes);
