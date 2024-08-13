import Toastify from "toastify-js";
import { IComponent } from "./../interfaces/IComponent";
import * as CardService from "../services/cardService";
import { HttpStatusCode } from "axios";
import { Board } from "./Board";

export class Home implements IComponent {
  state: {
    userId: number;
  };
  elements: {
    parentEl: HTMLElement;
    cardsContainer?: HTMLElement;
  };

  constructor(parentEl: HTMLElement, userId: number) {
    this.state = {
      userId,
    };
    this.elements = {
      parentEl,
    };

    this.render();

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    //store the reference to list container
    this.elements.cardsContainer = document.querySelector(".cards-container")!;

    this.fetchCardsOfUser();
  };

  fetchCardsOfUser = async () => {
    try {
      const response = await CardService.fetchCardsOfUser();
      if (response.status === HttpStatusCode.Ok) {
        this.showCardsOfUser(response.data.data);
      }
    } catch (error) {
      Toastify({
        text: "Error getting data",
        duration: 3000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  showCardsOfUser = (
    cards: {
      cardId: string;
      userId: string;
      title: string;
      boardId: string;
      boardTitle: string;
      workspaceTitle: string;
    }[]
  ) => {
    this.elements.cardsContainer!.innerHTML += `
            ${cards
              .map(
                (card) => `
                     <div data-board-id="${card.boardId}" class="card bg-white hover:cursor-pointer w-[500px] shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
            <div class="mb-4 border-b pb-4">
                <h2 class="text-2xl font-bold text-gray-800">${card.title}</h2>
            </div>
            <div class="space-y-2">
                <div class="flex items-center">
                    <span class="text-gray-600 font-semibold w-24">Workspace:</span>
                    <span class="text-gray-800">${card.workspaceTitle}</span>
                </div>
                <div class="flex items-center">
                    <span class="text-gray-600 font-semibold w-24">Board:</span>
                    <span class="text-gray-800">${card.boardTitle}</span>
                </div>
            </div>
        </div>
                    `
              )
              .join("")}
    `;

    //set up card event listener
    this.setupCardEventListener();
  };

  setupCardEventListener = () => {
    const cardEls =
      this.elements.cardsContainer?.querySelectorAll<HTMLElement>(".card");
    const contentEl = document.querySelector(".content");
    cardEls!.forEach((card) => {
      card.addEventListener("click", (_) => {
        new Board(
          contentEl as HTMLElement,
          (card as HTMLElement).dataset.boardId!
        );
      });
    });
  };

  render = () => {
    this.elements.parentEl.innerHTML = `
    <div class="h-[93vh] fixed w-full bg-gray-100 overflow-auto">
    <div class="cards-container ml-[300px] flex flex-col gap-5 p-8">
        
    </div>
</div>

    `;
  };
}
