import { ICard } from "../interfaces/ICard";
import { CardModal } from "./CardModal";

export class Card {
  state: {
    card: ICard;
  };
  elements: {
    parentEl: HTMLElement;
    cardEl?: HTMLElement;
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
    //card click event
    this.elements.cardEl?.addEventListener("click", (e) => {
      e.preventDefault();

      new CardModal(this.state.card);
    });

    //add drag start event
    this.elements.cardEl?.addEventListener("dragstart", this.handleDragStart);

    //add drag end event
    this.elements.cardEl?.addEventListener("dragend", this.handleDragEnd);
  };

  handleDragStart = (e: DragEvent) => {
    this.elements.cardEl?.classList.add("dragging");

    console.log(this.elements.cardEl);
    e.dataTransfer?.setData("text/plain", this.state.card.id);
  };

  handleDragEnd = (e: DragEvent) => {
    this.elements.cardEl?.classList.remove("dragging");
  };

  render = () => {
    const cardEl = document.createElement("div");
    cardEl.dataset.id = this.state.card.id;
    cardEl.classList.add(
      "card",
      `card-${this.state.card.id}`,
      "p-2",
      "bg-white",
      "rounded",
      "shadow-lg",
      "hover:cursor-pointer"
    );

    cardEl.draggable = true;

    cardEl.innerHTML = `
      ${this.state.card.title}
    `;

    this.elements.parentEl.appendChild(cardEl);

    this.elements.cardEl = cardEl;
    this.setupEventListener();
  };
}
