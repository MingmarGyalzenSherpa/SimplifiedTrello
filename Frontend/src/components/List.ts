import { ICard } from "../interfaces/ICard";
import { IList } from "../interfaces/IList";
import { axiosInstance } from "../utils/axiosConfig";
import { Card } from "./Card";

export class List {
  state: {
    list: IList;
    cards: ICard[];
  };
  elements: {
    parentEl: HTMLElement;
    addCardButtonEl?: HTMLButtonElement;
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

  initialSetup = () => {
    this.fetchCard();
  };

  fetchCard = async () => {
    try {
      const response = await axiosInstance.get(
        `/lists/${this.state.list.id}/cards`
      );
      const cards: ICard[] = response.data.data;
      this.state.cards = cards.sort((a, b) => +a.position - +b.position);

      const cardListEl = document.querySelector<HTMLElement>("#card-list")!;
      this.state.cards.forEach((card) => new Card(cardListEl, card));
    } catch (error) {
      console.log(error);
    }
  };

  setupEventListener = () => {
    //add new card
    this.elements.addCardButtonEl = document.querySelector("#add-card-btn")!;

    this.elements.addCardButtonEl.addEventListener("click", (e) => {
      console.log("hey");
    });
  };

  render = () => {
    console.log("render called");
    console.log(this.elements.parentEl);
    const listEl = document.createElement("div");
    listEl.innerHTML += `
    <div id="list" class="bg-[#F1F2F4] min-w-[300px] max-h-[600px] ">
          <span class="block list-title mb-3 pt-3 px-4 text-[#3F506C]"> ${this.state.list.title}</span>
          <ul id="card-list" class="text-black flex flex-col gap-5 max-h-[450px] p-2 overflow-y-scroll">
         

          </ul>
           <div class=" flex flex-col  gap-1 h-[100px] rounded-t-xl pl-2 pr-3 py-2 w-[300px] bg-[#F1F2F4] bg-red-100  "  >
          <input id="new-card-input" class="p-3 rounded shadow-md"  placeholder="Add a new card" />
          <button id="add-card-btn" class=" bg-blue-400 h-[50px] hover:bg-blue-600 text-white rounded"> Add </button>
        </div>
        </div>
    `;

    console.log("pareEl of list");
    console.log(this.elements.parentEl);
    this.elements.parentEl.appendChild(listEl);

    listEl.classList.add(
      "min-w-[300px]",
      "max-h-[600px]",
      "rounded-2xl",
      "overflow-auto"
    );

    this.setupEventListener();

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
