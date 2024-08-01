export class AddWorkspaceMemberModal {
  state: {
    id: number;
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
  };
  constructor(id: number) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      id,
    };

    this.render();
  }

  setupEventListener = () => {
    //add event listener to close modal
    this.elements.modalEl?.addEventListener("click", (e) => {
      console.log(e);
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
           modal-container fixed inset-0 z-50 flex  justify-center  items-center p-4 bg-black bg-opacity-50 overflow-auto
         `;

    // Create the modal content
    modalEl.innerHTML = `
             <div class="bg-gray-100 rounded-lg flex items-center gap-2 justify-center shadow-xl w-full max-w-2xl h-[100px] mx-auto">
 <input class="w-2/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter member email">
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
    Add Member
  </button>
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
