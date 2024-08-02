import { ICard } from "../interfaces/ICard";

export class CardModal {
  state: {
    card: ICard;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
  };
  constructor(card: ICard) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      card,
    };

    this.render();
  }

  setupEventListener = () => {
    const closeButton = this.elements.modalEl?.querySelector("button");

    closeButton?.addEventListener("click", (e) => {
      e.preventDefault();
      this.elements.modalEl?.remove();
    });

    //add event listener to close modal
    this.elements.modalEl?.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains("modal-container")) {
        this.elements.modalEl?.remove();
      }
    });
  };

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
        <div class="flex justify-between items-start p-4 border-b border-gray-200">
          <input class="title-input bg-transparent text-xl font-semibold text-gray-700" value="${
            this.state.card.title
          }">
          <button class="text-gray-500 hover:text-gray-700" id="closeBtn">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col md:flex-row max-h-[calc(100vh-10rem)] overflow-y-auto">
          <div class="flex-grow p-4 space-y-4">
            <div class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
               <div class="flex-grow">
                <h3 class="text-lg font-semibold mb-2">Description</h3>
                 <textarea class="description-input flex-grow p-2 border rounded-md w-full" rows="6"  placeholder="Add a more detailed description...">${
                   this.state.card.description || ""
                 }</textarea>

              </div>
            </div>
            <div class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <div class="flex-grow">
                <h3 class="text-lg font-semibold mb-2">Activity</h3>
                <input type="text" class="w-full p-2 border rounded-md" placeholder="Write a comment...">
              </div>
            </div>
            <div class="w-full flex justify-center  ">
            <button class="save-button mt-10 p-3 rounded w-[200px] bg-green-400 text-white hover:bg-green-600">Save </button>

            </div>
          </div>
          <div class="md:w-56 bg-gray-50 p-4 space-y-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-600 mb-2">Add to card</h3>
              <button class="w-full text-left px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                Members
              </button>
              <button class="w-full text-left px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Labels
              </button>
            </div>
          </div>
        </div>
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
