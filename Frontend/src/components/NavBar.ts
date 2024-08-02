import { Routes } from "../constants/Routes";
import { navigateTo } from "../utils/Navigate";

export class NavBar {
  elements: {
    parentEl: HTMLElement;
    logoutBtnEl?: HTMLButtonElement;
    workspaceLinkEl?: HTMLAnchorElement;
    createLinkEl?: HTMLAnchorElement;
  };
  props: object;
  constructor(parentEl: HTMLElement, props: object) {
    this.elements = {
      parentEl: parentEl,
    };

    this.props = props;

    this.render();

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    this.setupEventListener();
  };

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

  render = () => {
    this.elements.parentEl.innerHTML = `
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
 
    <div class="hidden lg:block">
      <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li
          class="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2">
         
          <a href="#" id="workspaces-link" class="flex items-center px-4 py-2 rounded hover:bg-gray-600">
            Workspaces
          </a>
        </li>
        <li
          class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
          
          <a href="#" id="create-link" class="text-white flex items-center">
            Create
          </a>
        </li>
       
      </ul>
    </div>
    <div class="flex items-center gap-x-1">
    
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
