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
    cardLength: number;
    parentRender: Function;
    drop?: {
      newPosition?: number;
      afterElement?: HTMLElement;
      cardId: number;
      cardEl: HTMLElement;
      listId: number;
    };
  };
  elements: {
    parentEl: HTMLElement;
    addCardButtonEl?: HTMLButtonElement;
    cardListEl?: HTMLElement;
    listEl?: HTMLElement;
    optionBtnEl?: HTMLElement;
    listContainer?: HTMLUListElement;
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
      cardLength: 0,
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
      //set length of the cards
      this.state.cardLength = this.state.cards.length;

      //set data count
      this.elements.listContainer!.dataset.count = `${this.state.cards.length}`;
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

    //drop event
    this.elements.listEl?.addEventListener("drop", this.handleDrop);

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
  handleDragOver = async (e: DragEvent) => {
    e.preventDefault();
    const cardEl = document.querySelector(".dragging") as HTMLElement;
    if (!cardEl) return;
    const afterElement = this.getDragAfterElement(e.clientY) as HTMLElement;
    const newListId = this.state.list.id;

    const cardId = cardEl.dataset.id;

    //decrease the card length

    this.state.drop = {
      cardId: +cardId!,

      cardEl: cardEl!,
      listId: +newListId,
      afterElement,
    };
  };

  handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    try {
      console.log("list container = ");
      console.log(this.elements.listContainer);

      let count = +this.elements.listContainer!.dataset.count!;

      //get new position
      const newPosition =
        this.state.drop!.afterElement === undefined
          ? count
          : this.state.drop!.afterElement.dataset.position;

      console.log(this.state.drop?.afterElement);
      console.log("new position = " + newPosition);
      //increase count of list container
      this.state.drop!.newPosition = +newPosition!;
      this.state.drop!.cardEl.dataset.position = `${count}`;

      count++;
      this.elements.listContainer!.dataset.count = `${count}`;

      const response = await CardService.updateCard(this.state.drop?.cardId!, {
        position: this.state.drop?.newPosition,
        listId: this.state.drop?.listId,
      });

      if (response.status === HttpStatusCode.Ok) {
        if (this.state.drop!.afterElement === undefined) {
          this.elements.listContainer?.appendChild(this.state.drop!.cardEl);
        } else {
          this.elements.listContainer?.insertBefore(
            this.state.drop!.cardEl!,
            this.state.drop!.afterElement
          );
        }
        //update position of card
      }
    } catch (error) {
      Toastify({
        text: "Error updating card",
        duration: 2000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  getDragAfterElement(y: number) {
    console.log("y is here" + y);
    const draggableElements = [
      ...this.elements.cardListEl!.querySelectorAll(".card:not(.dragging)"),
    ];
    console.log(draggableElements);
    return draggableElements.reduce<{
      offset: number;
      element: Element | undefined;
    }>(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: undefined,
      }
    ).element;
  }

  /**
   * Render html
   */
  render = () => {
    const listEl = document.createElement("div");

    listEl.className = "rounded-xl relative";
    listEl.innerHTML += /*html*/ `
    <div id="list" class="bg-[#F1F2F4] min-w-[300px]   max-h-[600px] min-h-min rounded-2xl">
    <div class="flex justify-between items-center">
          <span class="block list-title mb-3 pt-3 px-4 text-[#3F506C]"> ${this.state.list.title}</span>
          <button class="option-btn-${this.state.list.id} relative hover:cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
          </button>
            
    </div>
          <ul id="list-${this.state.list.id}-card-list" class="list-ul  text-black flex flex-col gap-5 max-h-[450px] p-2 overflow-y-scroll  ">
         

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

    this.elements.listContainer = document.querySelector(
      `#list-${this.state.list.id}-card-list`
    )!;
    console.log(this.elements.listContainer);

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
