import { Routes } from "../constants/Routes";
import { IUser } from "../interfaces/IUser";
import { navigateTo } from "../utils/Navigate";

/**
 * Navbar component
 */

export class NavBar {
  elements: {
    parentEl: HTMLElement;
    logoutBtnEl?: HTMLButtonElement;
    workspaceLinkEl?: HTMLAnchorElement;
    createLinkEl?: HTMLAnchorElement;
  };
  state: {
    user: IUser;
  };
  props: object;
  constructor(parentEl: HTMLElement, props: object, user: IUser) {
    this.elements = {
      parentEl: parentEl,
    };

    this.props = props;
    this.state = {
      user,
    };

    this.render();

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    this.setupEventListener();
  };

  /**
   * Setup event listener
   */
  setupEventListener = () => {
    this.elements.logoutBtnEl = document.querySelector("#logout-button")!;
    this.elements.workspaceLinkEl = document.querySelector("#workspaces-link")!;
    this.elements.createLinkEl = document.querySelector("#create-link")!;

    this.elements.logoutBtnEl.addEventListener("click", (e) => {
      e.preventDefault();

      //clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigateTo(Routes.LOGIN);
    });
  };

  /**
   * Render html
   */
  render = () => {
    this.elements.parentEl.innerHTML = /*html*/ `
    <nav
  class="block w-full px-4 py-2 mx-auto text-white bg-primary border  border-black  h-[7vh]  lg:px-8 ">
  <div class="container flex items-center justify-between mx-auto ">
    <div class="flex items-center gap-1">
    <img src="/trello.png" class="w-7 h-6 " />
     <a href="#"
      class=" font-bold text-2xl mr-4  block cursor-pointer  font-sans  leading-relaxed text-inherit antialiased">
      Trello
    </a>
    </div>  
 
      
          
       
    <div class="flex items-center gap-x-1 ">
    <span class="text-2xl mr-5">
            Hi, ${this.state.user.username}

          </span>
      <button id="logout-button"
        class="hidden select-none rounded bg-red-400 hover:bg-red-600 py-2.5 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
        type="button">
        <span>Log out</span> 
      </button>
    </div>
    <button
      class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
      type="button">
      <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </span>
    </button>
  </div>
</nav> 
    `;
  };
}
