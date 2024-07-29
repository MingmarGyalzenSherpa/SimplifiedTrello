import onChange, { ApplyData } from "on-change";
import { NavBar } from "./NavBar";
import { isLoggedIn } from "../utils/checkLoggedIn";
import { IUser } from "../interfaces/IUser";
import { navigateTo } from "../utils/Navigate";
import { Routes } from "../constants/Routes";
import { SideNav } from "./SideNav";
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

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    isLoggedIn().then((res) => {
      if (!res?.isLoggedIn) {
        navigateTo(Routes.LOGIN);
        return;
      }
      this.state.user = res.user;
      this.render();
    });
  };

  setUpEventListener = () => {};

  render = () => {
    this.elements.parentEl.innerHTML = "";

    this.renderNavBar();
    this.renderSideBar();
  };

  renderNavBar = () => {
    this.elements.navBar = document.createElement("header")!;
    new NavBar(this.elements.navBar, this.state.navBar!);
    this.elements.parentEl.appendChild(this.elements.navBar);
  };

  renderSideBar = () => {
    this.elements.sideBar = document.createElement("aside");
    new SideNav(this.elements.sideBar!, this.state.user);

    console.log(this.elements.sideBar);
    console.log(this.elements.parentEl);
    this.elements.parentEl.appendChild(this.elements.sideBar!);
  };
}
