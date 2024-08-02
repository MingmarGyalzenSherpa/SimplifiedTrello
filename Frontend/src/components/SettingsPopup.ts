import { IComponent } from "./../interfaces/IComponent";

/**
 * SettingsPopup component
 */
export class SettingsPopup implements IComponent {
  state: {
    onDelete: (e: Event) => void;
    clickedDocumentCount: number;
  };

  elements: {
    parentEl: HTMLElement;
    editBtnEl?: HTMLElement;
    deleteBtnEl?: HTMLElement;
    settingOptionEl?: HTMLElement;
  };

  constructor(parentEl: HTMLElement, onDelete: (e: Event) => void) {
    //set elements
    this.elements = {
      parentEl,
    };

    //set state
    this.state = {
      onDelete,
      clickedDocumentCount: 0,
    };

    this.render();
  }

  /**
   * Set up event listener
   */
  setupEventListener = () => {
    //set delete btn event listener
    this.elements.deleteBtnEl?.addEventListener("click", this.state.onDelete);

    document.addEventListener("click", this.handleOutSideClick);
  };

  handleOutSideClick = (e: Event) => {
    this.state.clickedDocumentCount++;
    if (
      e.target != this.elements.deleteBtnEl &&
      this.state.clickedDocumentCount === 2
    ) {
      this.elements.settingOptionEl?.remove();
      document.removeEventListener("click", this.handleOutSideClick);
    }
  };

  /**
   * Render html
   */
  render = () => {
    //create an element
    const settingOptionEl = document.createElement("div");

    //assign classes
    settingOptionEl.className =
      "absolute right-[22px] top-[10px] rounded-md z-20 bg-gray-400  w-[130px] h-[50px]  flex flex-col";
    //append to option button
    this.elements.parentEl?.appendChild(settingOptionEl);

    //set inner html
    settingOptionEl.innerHTML = `
  
   <button class=" delete-btn hover:bg-red-600 w-full text-white font-semibold py-2 px-4 rounded flex-grow  transition duration-300 ease-in-out">
     Delete
   </button>   
 `;

    //set reference to setting option element

    this.elements.settingOptionEl = settingOptionEl;

    //set reference to edit and delete btn
    this.elements.deleteBtnEl = settingOptionEl.querySelector(".delete-btn")!;

    this.setupEventListener();
  };
}
