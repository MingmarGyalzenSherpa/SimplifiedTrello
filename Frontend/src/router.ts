import UniversalRouter from "universal-router";
import { Signup } from "./components/Signup";

const routes = [
  {
    path: "/signup",
    action: () => new Signup(),
  },
];

export const router = new UniversalRouter(routes);
