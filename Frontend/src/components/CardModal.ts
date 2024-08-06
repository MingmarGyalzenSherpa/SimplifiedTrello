import Toastify from "toastify-js";
import { HttpStatusCode } from "axios";
import { ICard } from "../interfaces/ICard";
import * as CardService from "../services/cardService";
import * as WorkspaceService from "../services/workspaceService";
import { Board } from "./Board";
import { IUser } from "../interfaces/IUser";

/**
 * Card modal component
 */

export class CardModal {
  state: {
    card: ICard;
    boardId: number;
    titleInputTimeoutId?: number;
    descriptionInputTimeoutId?: number;
    searchMemberTimeoutId?: number;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
    titleInputEl?: HTMLInputElement;
    descriptionInputEl?: HTMLInputElement;
    searchMemberInputEl?: HTMLInputElement;
    addMemberButtonEl?: HTMLElement;
    searchUserListEl?: HTMLElement;
    memberListEl?: HTMLElement;
    deleteCardBtnEl?: HTMLButtonElement;
  };
  constructor(card: ICard, boardId: number) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      card,
      boardId,
    };
    this.render();
  }

  /**
   * Setup event listener
   */
  setupEventListener = () => {
    //event listener for close button
    const closeButton = this.elements.modalEl?.querySelector("button");

    closeButton?.addEventListener("click", (e) => {
      e.preventDefault();
      this.elements.modalEl?.remove();

      //render board again
      new Board(document.querySelector(".content")!, `${this.state.boardId}`);
    });

    //add event listener to close modal
    this.elements.modalEl?.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains("modal-container")) {
        this.elements.modalEl?.remove();
        new Board(document.querySelector(".content")!, `${this.state.boardId}`);
      }
    });

    //event listener for title input
    this.elements.titleInputEl?.addEventListener("input", (_) => {
      if (this.state.titleInputTimeoutId) {
        clearTimeout(this.state.titleInputTimeoutId);
      }
      this.state.titleInputTimeoutId = setTimeout(this.handleTitleUpdate, 2000);
    });

    //event listener for description input
    this.elements.descriptionInputEl?.addEventListener("input", (_) => {
      if (this.state.descriptionInputTimeoutId) {
        clearTimeout(this.state.descriptionInputTimeoutId);
      }
      this.state.descriptionInputTimeoutId = setTimeout(
        this.handleDescriptionUpdate,
        2000
      );
    });

    //search member input element event
    this.elements.searchMemberInputEl?.addEventListener("input", (_) => {
      if (this.state.searchMemberTimeoutId) {
        clearTimeout(this.state.searchMemberTimeoutId);
      }

      this.state.searchMemberTimeoutId = setTimeout(
        this.handleSearchMemberInput,
        2000
      );
    });

    //event listener to add member btn
    this.elements.addMemberButtonEl?.addEventListener("click", async (_) => {
      try {
        const response = await CardService.addUserToCard(
          +this.state.card.id,
          this.elements.searchMemberInputEl!.value
        );
        if (response.status === HttpStatusCode.Created) {
          Toastify({
            text: "User added successfully!",
            duration: 2000,
            style: {
              background: "green",
            },
          }).showToast();

          const newMember = response.data.data[0];
          this.state.card.members.push(newMember);
          this.renderMembers(this.state.card.members);
        }
      } catch (error) {
        Toastify({
          text: "Error adding user",
          duration: 2000,
          style: {
            background: "green",
          },
        }).showToast();
      }
    });

    //add event listeners to member list
    this.addEventListenerToMemberList();

    //delete card button event listener
    this.elements.deleteCardBtnEl?.addEventListener("click", async (_) => {
      try {
        const response = await CardService.deleteCard(+this.state.card.id);

        if (response.status === HttpStatusCode.Ok) {
          Toastify({
            text: "Card deleted successfully!",
            duration: 2000,
            style: {
              background: "green",
            },
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: "Error deleting card",
          duration: 2000,
          style: {
            background: "red",
          },
        }).showToast();
      }
    });
  };

  renderMembers = (members: Pick<IUser, "id" | "username" | "email">[]) => {
    this.elements.memberListEl!.innerHTML = `
         ${members
           .map(
             (
               member
             ) => `<li class="flex items-center justify-between bg-white p-2 rounded-md mb-2">
                <div class="flex items-center gap-5">
                <span class="rounded-full flex justify-center items-center bg-blue-400 w-10 h-10" > ${member.username![0].toUpperCase()}</span>
              <span>${member.email}</span>
                </div>
                
              <button data-id=${member.id} class=" remove-btn
                text-red-500 hover:text-red-700">Remove</button>
            </li>`
           )
           .join("")}
      `;
    //add event listeners
    this.addEventListenerToMemberList();
  };

  addEventListenerToMemberList = () => {
    const removeButtons =
      this.elements.memberListEl?.querySelectorAll(".remove-btn")!;

    //add event listener to each button
    removeButtons.forEach((removeBtn) =>
      removeBtn.addEventListener("click", async (_) => {
        try {
          const userId = (removeBtn as HTMLElement).dataset.id;
          const response = await CardService.removeUserFromCard(
            +this.state.card.id,
            +userId!
          );
          if (response.status === HttpStatusCode.Ok) {
            //remove from state
            this.state.card.members = this.state.card.members.filter(
              (member) => member.id != userId
            );

            //render again
            this.renderMembers(this.state.card.members);
          }
        } catch (error) {
          Toastify({
            text: "Error removing member",
            duration: 2000,
            style: {
              background: "red",
            },
          }).showToast();
        }
      })
    );
  };

  handleSearchMemberInput = async () => {
    try {
      const email = this.elements.searchMemberInputEl!.value;
      //get workspace id from local storage
      const workspaceId = localStorage.getItem("workspaceId");
      if (!workspaceId) return;
      const response = await WorkspaceService.searchUsersInWorkspace(
        +workspaceId,
        email
      );
      const users = response.data.data;
      this.renderSearchedUserList(users);
    } catch (error) {}
  };

  renderSearchedUserList = (lists: IUser[]) => {
    this.elements.searchUserListEl!.innerHTML = `
      ${lists
        .map(
          (list) =>
            `<li data-email=${list.email} class="p-3 border bg-white hover:cursor-pointer rounded-sm">${list.email}</li>`
        )
        .join("")}
    `;

    this.selectUserEventListener();
  };

  selectUserEventListener = () => {
    const lists = this.elements.searchUserListEl?.querySelectorAll("li");

    lists?.forEach((list) =>
      list.addEventListener("click", (_) => {
        this.elements.searchMemberInputEl!.value = list.dataset.email!;
      })
    );
  };

  /**
   * Function to handle title update
   */
  handleTitleUpdate = async () => {
    try {
      const response = await CardService.updateCard(+this.state.card.id, {
        title: this.elements.titleInputEl!.value,
      });

      if (response.status === HttpStatusCode.Ok) {
        Toastify({
          text: "Title updated successfully",
          duration: 2000,
          style: {
            background: "green",
          },
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error updating title",
        duration: 2000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  /**
   * Function to handle description update
   */
  handleDescriptionUpdate = async () => {
    try {
      const response = await CardService.updateCard(+this.state.card.id, {
        description: this.elements.descriptionInputEl!.value,
      });

      if (response.status === HttpStatusCode.Ok) {
        Toastify({
          text: "Description updated successfully",
          duration: 2000,
          style: {
            background: "green",
          },
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error updating description",
        duration: 2000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  /**
   * Render html
   */
  render = () => {
    // Create a new div
    const modalEl = document.createElement("div");

    // Add Tailwind classes to style it as a dialog box
    modalEl.className = `
       modal-container fixed inset-0 z-50 flex  justify-center p-4 bg-black bg-opacity-50 overflow-auto
     `;

    // Create the modal content
    modalEl.innerHTML = /*html*/ `
          <div class="bg-gray-100 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
  <div class="flex justify-between items-start p-4 border-b border-gray-200">
    <input class="title-input bg-transparent text-xl font-semibold text-gray-700" value="${
      this.state.card.title
    }" placeholder="Enter title">
    <button class="text-gray-500 hover:text-gray-700" id="closeBtn">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div class="flex flex-col md:flex-row max-h-[calc(100vh-10rem)] overflow-y-auto">
    <div class="flex-grow p-4 space-y-4">
      <!-- Description -->
      <div class="flex items-start space-x-4">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <div class="flex-grow">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <textarea class="description-input flex-grow p-2 border rounded-md w-full" rows="6" placeholder="Add a more detailed description...">${
            this.state.card.description || ""
          }</textarea>
        </div>
      </div>

      <!-- Members -->
      <div class="flex items-start space-x-4">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <div class="flex-grow">
          <h3 class="text-lg font-semibold mb-2">Members</h3>
          <!-- List of added members would go here -->
          <ul class="member-list mb-4">
            <!-- Example list item -->
            ${this.state.card.members
              .map(
                (member) =>
                  `<li class="flex items-center justify-between bg-white p-2 rounded-md mb-2">
                <div class="flex items-center gap-5">
                <span class="rounded-full flex justify-center items-center bg-blue-400 w-10 h-10" > ${member.username![0].toUpperCase()}</span>
              <span>${member.email}</span>
                </div>
                
             <button data-id=${member.id} class=" remove-btn
                text-red-500 hover:text-red-700">Remove</button>
            </li>`
              )
              .join("")}
           
          </ul>
        </div>
      </div>

      <!-- Add Members -->
      <div class="flex items-start space-x-4 justify-center">
        <div class="w-full flex flex-col relative">
          <input class="search-member-input px-4 py-2 h-[60px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter member email">
          <ul class="search-user-list top-[60px]">
          </ul>
        </div>
        <button class="add-member-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Add Member
        </button>
      </div>

      <div class="flex items-start space-x-4">
       
        <div class="flex-grow">
         
          <button class="delete-card-btn bg-red-500 mt-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
            DELETE CARD
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
     `;

    // Add the modal to the parent element
    this.elements.parentEl.appendChild(modalEl);

    // Store the modal element reference
    this.elements.modalEl = modalEl;

    //store title input reference
    this.elements.titleInputEl = modalEl.querySelector(".title-input")!;

    //store reference to member input element
    this.elements.searchMemberInputEl = modalEl.querySelector(
      ".search-member-input"
    )!;

    //store reference to user list container
    this.elements.searchUserListEl =
      modalEl.querySelector(".search-user-list")!;

    //store reference to add member button
    this.elements.addMemberButtonEl = modalEl.querySelector(".add-member-btn")!;

    //store reference to member list element
    this.elements.memberListEl = modalEl.querySelector(".member-list")!;

    //store description input reference
    this.elements.descriptionInputEl =
      modalEl.querySelector(".description-input")!;

    //store delete card button reference
    this.elements.deleteCardBtnEl = modalEl.querySelector(".delete-card-btn")!;
    //setup event listener
    this.setupEventListener();
  };
}
