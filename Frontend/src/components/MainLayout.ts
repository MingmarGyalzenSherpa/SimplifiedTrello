import onChange, { ApplyData } from "on-change";
import { NavBar } from "./NavBar";
import { isLoggedIn } from "../utils/checkLoggedIn";
import { IUser } from "../interfaces/IUser";
import { navigateTo } from "../utils/Navigate";
import { Routes } from "../constants/Routes";
import { SideNav } from "./SideNav";
import { Board } from "./Board";
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
    container?: HTMLElement;
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
    this.renderContainer();
    this.renderSideBar();
    this.renderContent();
  };

  renderContainer = () => {
    this.elements.container = document.createElement("div");
    this.elements.container.classList.add("flex");
    this.elements.parentEl.appendChild(this.elements.container);
  };

  renderContent = () => {
    this.elements.content = document.createElement("div");
    this.elements.content.className = "w-[90%] overflow-scroll";
    new Board(this.elements.content!, "7");
    this.elements.container!.appendChild(this.elements.content);
  };

  renderNavBar = () => {
    this.elements.navBar = document.createElement("header")!;
    new NavBar(this.elements.navBar, this.state.navBar!);
    this.elements.parentEl.appendChild(this.elements.navBar);
  };

  renderSideBar = () => {
    this.elements.sideBar = document.createElement("aside");
    new SideNav(this.elements.sideBar!, this.state.user);

    this.elements.container!.appendChild(this.elements.sideBar!);
  };
}
