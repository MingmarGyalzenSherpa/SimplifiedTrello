import { ICard } from "../interfaces/ICard";
import { IList } from "../interfaces/IList";
import { Card } from "./Card";
import * as CardService from "../services/cardService";
export class List {
  state: {
    list: IList;
    cards: Card[];
  };
  elements: {
    parentEl: HTMLElement;
    addCardButtonEl?: HTMLButtonElement;
    listEl?: HTMLElement;
  };
  constructor(parentEl: HTMLElement, list: IList) {
    this.state = {
      list,
      cards: [],
    };
    this.elements = {
      parentEl,
    };

    this.render();

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {};

  fetchCard = async () => {
    try {
      const response = await CardService.getCards(+this.state.list.id);
      const cards: ICard[] = response.data.data;
      const sortedCards = cards.sort(
        (a: ICard, b: ICard) => +a.position - +b.position
      );
      const cardListEl = document.querySelector<HTMLElement>(
        `#list-${this.state.list.id}-card-list`
      )!;

      //clear cardListEL
      cardListEl.innerHTML = "";

      this.state.cards = sortedCards.map((card) => new Card(cardListEl, card));
    } catch (error) {
      console.log(error);
    }
  };

  setupEventListener = () => {
    //add new card
    this.elements.addCardButtonEl = this.elements.listEl!.querySelector(
      `#list-${this.state.list.id}-add-card-btn`
    )!;

    this.elements.addCardButtonEl.addEventListener("click", async (e) => {
      try {
        console.log("clicked");
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
        console.log(response);
      } catch (error) {}
    });
  };

  render = () => {
    const listEl = document.createElement("div");

    listEl.className = "rounded-xl";
    listEl.innerHTML += `
    <div id="list" class="bg-[#F1F2F4] min-w-[300px] max-h-[600px] min-h-min rounded-2xl">
          <span class="block list-title mb-3 pt-3 px-4 text-[#3F506C]"> ${this.state.list.title}</span>
          <ul id="list-${this.state.list.id}-card-list" class="text-black flex flex-col gap-5 max-h-[450px] p-2 overflow-y-scroll  ">
         

          </ul>
           <div class=" flex flex-col  gap-1 h-[100px] rounded-xl pl-2 pr-3 py-2 w-[300px] "  >
          <input id="list-${this.state.list.id}-new-card-input" class="p-3 rounded shadow-lg"  placeholder="Add a new card" />
          <button id="list-${this.state.list.id}-add-card-btn" class=" bg-blue-400 h-[50px] hover:bg-blue-600 text-white rounded"> Add </button>
        </div>
        </div>
    `;

    console.log(this.elements.parentEl);
    this.elements.parentEl.appendChild(listEl);

    listEl.classList.add(
      "min-w-[300px]",
      "max-h-[600px]",
      "rounded-2xl",
      "overflow-auto"
    );

    this.elements.listEl = listEl;

    this.fetchCard();
    this.setupEventListener();

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
