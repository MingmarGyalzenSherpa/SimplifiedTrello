import UniversalRouter from "universal-router";
import { login } from "./components/Login";

const appEl = document.querySelector<HTMLDivElement>("#app")!;

const routes = [
  {
    path: "/login",
    action: () => login(appEl),
  },
];

export const router = new UniversalRouter(routes);
