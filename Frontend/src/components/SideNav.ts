import Toastify from "toastify-js";
import { IWorkspace } from "./../interfaces/IWorkspace";
import { IUser } from "../interfaces/IUser";
import * as WorkspaceService from "../services/workspaceService";
import { Workspace } from "./Workspace";
import { Home } from "./Home";

/**
 * Side nav component
 */
export class SideNav {
  state: {
    user: IUser;
    workspaces: IWorkspace[];
    isWorkspacesVisible: boolean;
    activeLink?: string;
  };
  elements: {
    parentEl: HTMLElement;
  };
  constructor(parentEl: HTMLElement, user: IUser) {
    this.state = {
      user,
      workspaces: [],
      isWorkspacesVisible: false,
    };
    this.elements = {
      parentEl,
    };

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = async () => {
    await this.fetchWorkspaces();
    this.render();
  };

  /**
   * Fetch workspaces
   */
  fetchWorkspaces = async () => {
    try {
      const response = await WorkspaceService.getWorkspaces();
      this.state.workspaces = response.data.data as IWorkspace[];
    } catch (error) {
      Toastify({
        text: "Something went wrong",
        duration: 2000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  /**
   * Set up event listener
   */
  setupEventListener = () => {
    //add event listener for workspace toggle
    const workspaceToggleButton = document.querySelector("#workspaces-toggle");
    workspaceToggleButton?.addEventListener("click", (e) => {
      e.preventDefault();
      this.state.isWorkspacesVisible = !this.state.isWorkspacesVisible;
      this.render();
    });

    //add event listener to set active link
    const linkELs = document.querySelectorAll(".link");
    linkELs.forEach((link) => {
      link.addEventListener("click", this.setActiveLink);
    });

    //add event listener for workspace link click
    const workspaceLinks =
      document.querySelectorAll<HTMLElement>(".workspace-link");

    workspaceLinks.forEach((workspaceLink) => {
      workspaceLink.addEventListener("click", (e) => {
        e.preventDefault();
        const workspaceId = workspaceLink.dataset.workspaceId!;
        const contentElement = document.querySelector<HTMLElement>(".content")!;
        new Workspace(contentElement, +workspaceId);
      });
    });
  };

  /**
   * Function to set the active link
   * @param e
   */
  setActiveLink = (e: Event) => {
    const clickedElement = e.currentTarget as HTMLElement;
    const linkName = clickedElement.dataset.link;

    if (linkName) {
      // Remove active class from previously active link
      const previousActiveLink =
        this.elements.parentEl.querySelector(".active");

      if (previousActiveLink) {
        previousActiveLink.classList.remove("bg-blue-gray-50/50", "active");
      }

      // Add active class to clicked link
      clickedElement.classList.add("bg-blue-gray-50/50", "active");

      // Update state
      this.state.activeLink = linkName;
      if (this.state.activeLink === "home") {
        new Home(
          document.querySelector(".content")!,
          +localStorage.getItem("userId")!
        );
      }
    }
  };

  /**
   * Render html
   */
  render = () => {
    this.elements.parentEl.innerHTML = /*html*/ `
        <div
      class="relative flex h-[93vh] w-min-[10%]   w-max-[10%] flex-col  bg-primary bg-clip-border p-4 text-white shadow-xl shadow-blue-gray-900/5">

      <nav class="flex w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal ">

          <div role="button" id="nav_item" data-link="home"
            class="link flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start  hover:bg-blue-gray-50  focus:bg-blue-gray-50 focus:bg-opacity-80 active">
            <button type="button" 
              class=" flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100  hover:">
              <div class="grid mr-3 place-items-center">
                <i class="fa-solid fa-house"></i>
              </div>
              <p class="block mr-auto font-sans text-base antialiased font-normal leading-relaxed ">
                Home
              </p>

            </button>
          </div>
        
        <hr class="my-2 border-blue-gray-50" />

         <div id="workspaces-toggle"
          class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover: focus:bg-blue-gray-50 focus:bg-opacity-80 focus: active:bg-blue-gray-50 active:bg-opacity-80 active:">
          Workspaces
          <span class="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                  stroke="currentColor" aria-hidden="true" class="w-4 h-4 mx-auto transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
        </div>
        <ul id="workspaces-list" class="w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
          this.state.isWorkspacesVisible ? "" : "hidden"
        }">
      
             ${this.state.workspaces
               .map(
                 (workspace) =>
                   `<li data-link="workspace-${workspace.id}" data-workspace-id="${workspace.id}" class="link workspace-link py-3 px-2 mb-2 rounded hover:bg-blue-gray-50 hover:bg-opacity-80 hover: focus:bg-blue-gray-50 focus:bg-opacity-80 focus: active:bg-blue-gray-50 active:bg-opacity-80 active:">${workspace.title}</li>`
               )
               .join("")}

        </ul>

      </nav>
    </div>`;

    this.setupEventListener();
  };
}
