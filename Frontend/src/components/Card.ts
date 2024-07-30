import { ICard } from "../interfaces/ICard";
import { CardModal } from "./CardModal";

export class Card {
  state: {
    card: ICard;
  };
  elements: {
    parentEl: HTMLElement;
  };
  constructor(parentEl: HTMLElement, card: ICard) {
    this.state = {
      card,
    };
    this.elements = {
      parentEl,
    };

    this.render();
  }

  initialSetup = () => {
    this.setupEventListener();
  };

  setupEventListener = () => {
    const cardEl = document.querySelector(`.card-${this.state.card.id}`);
    console.log(cardEl);
    cardEl?.addEventListener("click", (e) => {
      e.preventDefault();

      new CardModal(this.state.card);
    });
  };

  render = () => {
    const cardEl = document.createElement("div");
    cardEl.classList.add(
      `card-${this.state.card.id}`,
      "p-2",
      "bg-white",
      "rounded",
      "shadow-lg",
      "hover:cursor-pointer"
    );

    cardEl.innerHTML = `
      ${this.state.card.title}
    `;

    this.elements.parentEl.appendChild(cardEl);
    this.setupEventListener();
  };
}
