import UniversalRouter from "universal-router";
import { Login } from "./components/Login";
import { BoardView } from "./components/BoardView";
import { Signup } from "./components/Signup";

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
  {
    path: "/signup",
    action: () => Signup(body),
  },
];

export const router = new UniversalRouter(routes);
