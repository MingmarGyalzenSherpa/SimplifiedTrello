import Toastify from "toastify-js";
import { HttpStatusCode } from "axios";
import { IComponent } from "../interfaces/IComponent";
import * as WorkspaceService from "../services/workspaceService";
import { Workspace } from "./Workspace";

export class CreateWorkspace implements IComponent {
  elements: {
    parentEl: HTMLElement;
    createBtn?: HTMLElement;
    workspaceInputEl?: HTMLInputElement;
  };
  constructor(parentEl: HTMLElement) {
    this.elements = {
      parentEl,
    };

    this.render();
  }

  setupEventListener = () => {
    this.elements.createBtn?.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const input = this.elements.workspaceInputEl?.value.trim();
        if (!input) {
          document.querySelector(".error-msg")!.innerHTML = "Title is required";
          return;
        }
        const response = await WorkspaceService.createWorkspace(input!);
        if (response.status === HttpStatusCode.Created) {
          Toastify({
            text: "Workspace created successfully",
            duration: 2000,
            style: {
              background: "green",
            },
          }).showToast();

          const workspaceId = response.data.data.id;
          
          //go to workspace
          new Workspace(document.querySelector(".content")!,workspaceId)
        }
      } catch (error) {
        Toastify({
          text: "Something went wrong",
          duration: 2000,
          style: {
            background: "red",
          },
        }).showToast();
      }
    });
  };

  render = () => {
    this.elements.parentEl.innerHTML = /*html*/ `
        <div class="flex justify-center items-center h-[90vh]">
                  <div class="w-[300px] flex gap-5 relative">
                  <div>
              <input active class="workspace-input px-4 py-2 h-[60px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter Workspace name">
                <p class="error-msg text-red-400"></p>
        </div>
  <button class="create-btn  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
    Add Workspace
  </button>
        </div>
    `;

    //store reference to create btn
    this.elements.createBtn = document.querySelector(".create-btn")!;

    this.elements.workspaceInputEl =
      document.querySelector(".workspace-input")!;

    this.setupEventListener();
  };
}
