import Toastify from "toastify-js";
import { IUser } from "../interfaces/IUser";
import * as UserService from "../services/userService";

/**
 * Add workspace member modal
 */

export class AddWorkspaceMemberModal {
  state: {
    workspaceId: number;
    searchTimeout?: number;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
    userListEl?: HTMLElement;
    userSearchInputEl?: HTMLInputElement;
  };
  constructor(workspaceId: number) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      workspaceId,
    };

    this.render();
  }

  /**
   * Setup event listener
   */
  setupEventListener = () => {
    //add event listener to close modal
    this.elements.modalEl?.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;
      if (el.classList.contains("modal-container")) {
        this.elements.modalEl?.remove();
      }
    });

    //set event listener to user input
    this.elements.userSearchInputEl?.addEventListener("input", (e) => {
      //check if already searching
      if (this.state.searchTimeout) {
        clearTimeout(this.state.searchTimeout);
      }

      this.state.searchTimeout = setTimeout(async () => {
        try {
          const response = await UserService.searchUser(
            (e.target! as HTMLInputElement).value
          );

          this.renderUserList(response.data.data);
        } catch (error: any) {
          Toastify({
            text: "Error fetching users",
            duration: 2000,
            style: {
              background: "red",
            },
          }).showToast();
        }
      }, 2000);
    });
  };

  /**
   * Render user lists
   * @param lists - list of user
   */
  renderUserList = (lists: IUser[]) => {
    this.elements.userListEl!.innerHTML = `
        ${lists
          .map(
            (list) =>
              `<li data-email=${list.email} class=" px-4 py-2 bg-white border  border-gray"> ${list.email}</li>`
          )
          .join("")}
    `;

    this.selectUserEventListener();
  };

  /**
   * Setup user event listemer
   */
  selectUserEventListener = () => {
    const lists = this.elements.userListEl?.querySelectorAll("li");

    //add event listener to each list
    lists?.forEach((list) => {
      list.addEventListener("click", (_) => {
        this.elements.userSearchInputEl!.value = list.dataset.email!;
      });
    });
  };

  /**
   * Render html
   */

  render = () => {
    // Create a new div
    const modalEl = document.createElement("div");

    // Add Tailwind classes to style it as a dialog box
    modalEl.className = `
           modal-container fixed inset-0 z-50 flex  justify-center  items-center p-4 bg-black bg-opacity-50 overflow-auto
         `;

    // Create the modal content
    modalEl.innerHTML = `
             <div class="bg-gray-100 rounded-lg flex items-center gap-2 justify-center shadow-xl w-full max-w-2xl h-[100px] mx-auto">
             <div class="w-[300px] flex flex-col relative">
              <input class="search-input px-4 py-2 h-[60px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter member email">
              <ul class="user-list absolute top-[60px]">
              </ul>
             </div>

  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
    Add Member
  </button>
          </div>
         `;

    // Add the modal to the parent element
    this.elements.parentEl.appendChild(modalEl);

    // Set the modal element reference
    this.elements.modalEl = modalEl;

    //Set reference to user input element
    this.elements.userSearchInputEl = modalEl.querySelector(".search-input")!;
    //set reference to user list
    this.elements.userListEl = modalEl.querySelector(".user-list")!;

    //setup event listener
    this.setupEventListener();
  };
}
