import { AddMemberTableType } from "../constants/AddMemberTableType";

export class AddMemberModal {
  state: {
    id: number;
    table: AddMemberTableType;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
  };
  constructor(id: number, table: AddMemberTableType) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      id,
      table,
    };

    this.render();
  }

  setupEventListener = () => {};

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
           
          </div>
         `;

    // Add the modal to the parent element
    this.elements.parentEl.appendChild(modalEl);

    // Store the modal element reference
    this.elements.modalEl = modalEl;

    //setup event listener
    this.setupEventListener();
  };
}
