import { ICard } from "../interfaces/ICard";
import { CardModal } from "./CardModal";

/**
 * Card component
 */

export class Card {
  state: {
    card: ICard;
    boardId: number;
  };
  elements: {
    parentEl: HTMLElement;
    cardEl?: HTMLElement;
  };
  constructor(parentEl: HTMLElement, card: ICard, boardId: number) {
    this.state = {
      card,
      boardId,
    };
    this.elements = {
      parentEl,
    };

    this.render();
  }

  /**
   * Function to handle initial setup
   */
  initialSetup = () => {
    this.setupEventListener();
  };

  /**
   * Setup event listeners
   */
  setupEventListener = () => {
    //card click event
    this.elements.cardEl?.addEventListener("click", (e) => {
      e.preventDefault();

      new CardModal(this.state.card, this.state.boardId);
    });

    //add drag start event
    this.elements.cardEl?.addEventListener("dragstart", this.handleDragStart);

    //add drag end event
    this.elements.cardEl?.addEventListener("dragend", this.handleDragEnd);
  };

  /**
   * Function to handle drag start
   * @param e
   */
  handleDragStart = (e: DragEvent) => {
    this.elements.cardEl?.classList.add("dragging");

    const parentContainer = this.elements.cardEl?.closest(
      ".list-ul"
    ) as HTMLElement;
    //decrease data count of parent container
    let count = +parentContainer.dataset.count!;
    count--;
    parentContainer.dataset.count = `${count}`;

    e.dataTransfer?.setData("text/plain", this.state.card.listId);
  };

  /**
   * Function to handle drag end
   * @param e
   */
  handleDragEnd = (e: DragEvent) => {
    this.elements.cardEl?.classList.remove("dragging");
  };

  /**
   * Render html
   */
  render = () => {
    const cardEl = document.createElement("div");
    cardEl.dataset.id = this.state.card.id;
    cardEl.dataset.position = `${this.state.card.position}`;
    cardEl.dataset.listId = `${this.state.card.listId}`;
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
