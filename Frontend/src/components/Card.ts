import { ICard } from "../interfaces/ICard";

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

  initialSetup = () => {};

  setupEventListener = () => {};

  render = () => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("p-2", "bg-white", "rounded", "shadow-md");

    cardEl.innerHTML = `
      ${this.state.card.title}
    `;

    this.elements.parentEl.appendChild(cardEl);
  };
}
