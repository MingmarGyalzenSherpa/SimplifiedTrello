import onChange, { ApplyData } from "on-change";
import { NavBar } from "./NavBar";
import { isLoggedIn } from "../utils/checkLoggedIn";
import { IUser } from "../interfaces/IUser";
import { navigateTo } from "../utils/Navigate";
import { Routes } from "../constants/Routes";
import { SideNav } from "./SideNav";
import { Board } from "./Board";
import { IComponent } from "../interfaces/IComponent";

/**
 * Main layout for dashboard component
 */
export class MainLayout implements IComponent {
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

    this.elements = {
      parentEl,
    };

    this.getSubPath();
    setTimeout(this.initialSetup, 0);
  }

  /**
   * Get sub path
   */
  getSubPath = () => {
    const path = window.location.pathname;
    const subPath = path.slice(Routes.DASHBOARD.length - "(.*)".length);
    if (subPath[0] != "/") navigateTo(Routes.CATCHALL);
  };

  /**
   * Initial setup
   */
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

  /**
   * Setup event listeners
   */
  setUpEventListener = () => {};

  /**
   * Render html
   */
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
    this.elements.content.className = "content w-[90%] overflow-scroll";
    new Board(this.elements.content!, "28");
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
