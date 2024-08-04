import Toastify from "toastify-js";
import { ICard } from "../interfaces/ICard";
import { IList } from "../interfaces/IList";
import { Card } from "./Card";
import * as CardService from "../services/cardService";
import * as ListService from "../services/listService";
import { SettingsPopup } from "./SettingsPopup";
import { HttpStatusCode } from "axios";

/**
 * List component
 */
export class List {
  state: {
    list: IList;
    boardId: number;
    cards: Card[];
    parentRender: Function;
  };
  elements: {
    parentEl: HTMLElement;
    addCardButtonEl?: HTMLButtonElement;
    cardListEl?: HTMLElement;
    listEl?: HTMLElement;
    optionBtnEl?: HTMLElement;
  };
  constructor(
    parentEl: HTMLElement,
    list: IList,
    boardId: number,
    parentRender: Function
  ) {
    this.state = {
      list,
      cards: [],
      boardId,
      parentRender,
    };
    this.elements = {
      parentEl,
    };

    this.render();
  }

  /**
   * Fetch area
   */
  fetchCard = async () => {
    try {
      const response = await CardService.getCards(+this.state.list.id);
      const cards: ICard[] = response.data.data;
      const sortedCards = cards.sort(
        (a: ICard, b: ICard) => +a.position - +b.position
      );
      this.elements.cardListEl = document.querySelector<HTMLElement>(
        `#list-${this.state.list.id}-card-list`
      )!;

      //clear cardListEL
      this.elements.cardListEl.innerHTML = "";

      this.state.cards = sortedCards.map(
        (card) => new Card(this.elements.cardListEl!, card, this.state.boardId)
      );
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
    //add new card
    this.elements.addCardButtonEl = this.elements.listEl!.querySelector(
      `#list-${this.state.list.id}-add-card-btn`
    )!;

    this.elements.addCardButtonEl.addEventListener("click", async (e) => {
      try {
        e.preventDefault();

        const inputEl = document.querySelector<HTMLInputElement>(
          `#list-${this.state.list.id}-new-card-input`
        )!;
        const newCardTitle = inputEl?.value.trim()!;

        //clear input element
        inputEl.value = "";
        if (!newCardTitle) return;
        const reqBody: Pick<ICard, "title" | "position"> = {
          title: newCardTitle,
          position: this.state.cards.length,
        };

        const response = await CardService.addCard(
          +this.state.list.id,
          reqBody
        );
        this.fetchCard();
      } catch (error) {}
    });

    //drag over event
    this.elements.listEl?.addEventListener("dragover", this.handleDragOver);

    //option button event listener
    const optionBtnEl = this.elements.parentEl.querySelector<HTMLElement>(
      `.option-btn-${this.state.list.id}`
    );

    optionBtnEl?.addEventListener("click", (e) => {
      e.preventDefault();

      new SettingsPopup(this.elements.listEl!, this.handleDelete);
    });
  };

  /**
   * Function to handle delete
   * @param e
   */
  handleDelete = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await ListService.deleteList(
        this.state.boardId,
        +this.state.list.id
      );
      if (response.status === HttpStatusCode.Ok) {
        Toastify({
          text: "List Deleted Successfully",
          duration: 4000, // Increased duration to give more time to interact with the button
          style: {
            background: "red",
          },
        }).showToast();
        this.state.parentRender();
      }
    } catch (error) {
      Toastify({
        text: "Something went wrong",
        duration: 2000,
        style: {
          background: "green",
        },
      }).showToast();
      this.state.parentRender();
    }
  };

  /**
   * Handle dragover event
   * @param e
   */
  handleDragOver = (e: DragEvent) => {
    const cardEl = document.querySelector(".dragging");
    const afterElement = this.getDragAfterElement(e.clientY);

    this.elements.cardListEl?.appendChild(cardEl!);
  };

  getDragAfterElement(y: number) {
    const draggableElements = [
      ...this.elements.cardListEl!.querySelectorAll(".card:not(.dragging)"),
    ];
  }

  /**
   * Render html
   */
  render = () => {
    const listEl = document.createElement("div");

    listEl.className = "rounded-xl relative";
    listEl.innerHTML += `
    <div id="list" class="bg-[#F1F2F4] min-w-[300px]   max-h-[600px] min-h-min rounded-2xl">
    <div class="flex justify-between items-center">
          <span class="block list-title mb-3 pt-3 px-4 text-[#3F506C]"> ${this.state.list.title}</span>
          <button class="option-btn-${this.state.list.id} relative hover:cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
          </button>
            
    </div>
          <ul id="list-${this.state.list.id}-card-list" class="text-black flex flex-col gap-5 max-h-[450px] p-2 overflow-y-scroll  ">
         

          </ul>
           <div class=" flex flex-col  gap-1 h-[100px] rounded-xl pl-2 pr-3 py-2 w-[300px] "  >
          <input id="list-${this.state.list.id}-new-card-input" class="p-3 rounded shadow-lg"  placeholder="Add a new card" />
          <button id="list-${this.state.list.id}-add-card-btn" class=" bg-blue-400 h-[50px] hover:bg-blue-600 text-white rounded"> Add </button>
        </div>
        </div>
    `;

    this.elements.parentEl.appendChild(listEl);

    listEl.classList.add(
      "min-w-[300px]",
      "max-h-[600px]",
      "rounded-2xl",
      "overflow-auto"
    );

    //add reference to list element
    this.elements.listEl = listEl;

    //add reference to option button
    this.elements.optionBtnEl = document.querySelector(
      `.option-btn-${this.state.list.id}`
    )!;

    this.fetchCard();
    this.setupEventListener();

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
