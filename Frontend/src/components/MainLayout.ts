import onChange, { ApplyData } from "on-change";
import { NavBar } from "./NavBar";
import { isLoggedIn } from "../utils/checkLoggedIn";
import { IUser } from "../interfaces/IUser";
import { navigateTo } from "../utils/Navigate";
import { Routes } from "../constants/Routes";
export class MainLayout {
  state: {
    navBar?: {
      activeLink: string;
    };
    user: IUser;
  };
  elements: {
    parentEl: HTMLElement;
    navBar?: HTMLElement;
    sideBar?: HTMLElement;
    content?: HTMLElement;
  };
  constructor(parentEl: HTMLElement) {
    this.state = {
      user: {},
    };

    this.state.navBar = onChange(
      {
        activeLink: "Home",
      },
      (
        path: string,
        value: unknown,
        previousValue: unknown,
        applyData: ApplyData
      ) => {
        console.log("update");
      }
    );
    this.elements = {
      parentEl,
    };

    this.render();

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    isLoggedIn().then((res) => {
      if (!res?.isLoggedIn) {
        navigateTo(Routes.LOGIN);
        return;
      }
      this.state.user = res.user;
    });
  };

  setUpEventListener = () => {};

  render = () => {
    this.renderNavBar();
  };

  renderNavBar = () => {
    this.elements.parentEl.innerHTML = "";
    this.elements.navBar = document.createElement("header")!;
    new NavBar(this.elements.navBar, this.state.navBar!);

    this.elements.parentEl.appendChild(this.elements.navBar);
    this.elements.parentEl.innerHTML += `<script src="https://unpkg.com/@material-tailwind/html@latest/scripts/collapse.js"></script>`;
  };
}
