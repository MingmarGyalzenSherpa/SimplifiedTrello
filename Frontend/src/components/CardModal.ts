import Toastify from "toastify-js";
import { HttpStatusCode } from "axios";
import { ICard } from "../interfaces/ICard";
import * as CardService from "../services/cardService";
import { Board } from "./Board";

/**
 * Card modal component
 */

export class CardModal {
  state: {
    card: ICard;
    boardId: number;
    titleInputTimeoutId?: number;
    descriptionInputTimeoutId?: number;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
    titleInputEl?: HTMLInputElement;
    descriptionInputEl?: HTMLInputElement;
  };
  constructor(card: ICard, boardId: number) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      card,
      boardId,
    };
    console.log(this.state.card);
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
    this.elements.titleInputEl?.addEventListener("input", (e) => {
      if (this.state.titleInputTimeoutId) {
        clearTimeout(this.state.titleInputTimeoutId);
      }
      this.state.titleInputTimeoutId = setTimeout(this.handleTitleUpdate, 2000);
    });

    //event listener for description input
    this.elements.descriptionInputEl?.addEventListener("input", (e) => {
      if (this.state.descriptionInputTimeoutId) {
        clearTimeout(this.state.descriptionInputTimeoutId);
      }
      this.state.descriptionInputTimeoutId = setTimeout(
        this.handleDescriptionUpdate,
        2000
      );
    });
  };

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
    modalEl.innerHTML = `
          <div class="bg-gray-100 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
  <div class="flex justify-between items-start p-4 border-b border-gray-200">
    <input class="title-input bg-transparent text-xl font-semibold text-gray-700" value=${this.state.card.title} placeholder="Enter title">
    <button class="text-gray-500 hover:text-gray-700" id="closeBtn">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div class="flex flex-col md:flex-row max-h-[calc(100vh-10rem)] overflow-y-auto">
    <div class="flex-grow p-4 space-y-4">
      <div class="flex items-start space-x-4">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <div class="flex-grow">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <textarea  class="description-input flex-grow p-2 border rounded-md w-full" rows="6" placeholder="Add a more detailed description...">${this.state.card.description}</textarea>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
                 <h3 class="text-lg font-semibold ">Label</h3>

      </div>
      <div>
        <input type="text" placeholder="Enter label name..." class="flex-grow p-2 border rounded-md  w-full">

        <h6 class="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
          Background
        </h6>
        <div class="h-11 w-[100%] flex min-w-[200px] gap-1 mb-4">
          <div data-background="bg-green-300" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-green-300"></div>
          <div data-background="bg-blue-300" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-blue-300"></div>
          <div data-background="bg-orange-300" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-orange-300"></div>
          <div data-background="bg-purple-100" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-purple-100"></div>
          <div data-background="bg-pink-200" class="background-option w-12 h-12 border-2 border-black hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-pink-200"></div>
          <div data-background="bg-brown-400" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-brown-400"></div>
          <div data-background="bg-white" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-white"></div>
          <div data-background="bg-gray-800" class="background-option w-12 h-12 hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-gray-800"></div>
        </div>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
        Add Label
      </button>
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
    console.log(this.elements.titleInputEl);

    //store description input reference
    this.elements.descriptionInputEl =
      modalEl.querySelector(".description-input")!;
    console.log(this.elements.descriptionInputEl);
    //setup event listener
    this.setupEventListener();
  };
}
