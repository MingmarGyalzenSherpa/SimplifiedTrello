import { HttpStatusCode } from "axios";
import { createBoardBodySchema } from "../schema/boardSchema";
import * as BoardService from "../services/boardService";
import { validate } from "../utils/validator";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Create board component
 */

export class CreateBoardModal {
  state: {
    workspaceId: number;
    boardForm: {
      title: string;
      backgroundColor?: string;
    };
  };
  elements: {
    parentEl: HTMLElement;
    modalEl?: HTMLElement;
    inputTitleElement?: HTMLInputElement;
    errorMsgEl?: HTMLElement;
  };
  function: {
    renderParentMethod: Function;
  };
  constructor(workspaceId: number, renderParentMethod: Function) {
    this.elements = {
      parentEl: document.body,
    };

    this.state = {
      workspaceId,
      boardForm: {
        title: "",
      },
    };

    this.function = {
      renderParentMethod: renderParentMethod,
    };

    this.render();
  }

  /**
   * Setup event listener
   */
  setupEventListener = () => {
    //event listener to close modal
    this.elements.modalEl?.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains("modal-container")) {
        this.elements.modalEl?.remove();
      }
    });

    //event listener for title input
    this.elements.inputTitleElement?.addEventListener("input", (_) => {
      this.state.boardForm.title = this.elements.inputTitleElement?.value || "";

      //remove error message
      this.elements.errorMsgEl!.textContent = "";
    });

    //add event listener for selecting background color
    this.setActiveBackgroundColor();

    //add event listener for createButton
    const createButtonEl = this.elements.modalEl?.querySelector(".create-btn");

    createButtonEl?.addEventListener("click", async (e) => {
      try {
        e.preventDefault();

        //validate
        const { errors } = validate(
          createBoardBodySchema,
          this.state.boardForm
        );
        if (errors) {
          //set error message

          const errorMsgEl = document.querySelector(".error-msg")!;
          errorMsgEl.textContent = errors[0].message;

          return;
        }

        //create board
        const response = await BoardService.createBoard(
          this.state.workspaceId,
          this.state.boardForm
        );
        if (response.status === HttpStatusCode.Created) {
          //show toast
          Toastify({
            text: "Board Created Successfully",
            duration: 2000,
            style: {
              background: "green",
            },
          }).showToast();

          //refresh parent element
          this.function.renderParentMethod();

          //close the modal

          this.elements.modalEl?.remove();
        }
      } catch (error) {
        Toastify({
          text: "Something went wrong",
          duration: 2000,
          style: {
            background: "red",
          },
        }).showToast();
      }
    });
  };

  /**
   * Function to set active background color
   */
  setActiveBackgroundColor = () => {
    const backgroundOptions =
      document.querySelectorAll<HTMLElement>(".background-option");

    backgroundOptions.forEach((backgroundOption) =>
      backgroundOption.addEventListener("click", (_) => {
        //set selected background
        this.state.boardForm.backgroundColor =
          backgroundOption.dataset.background;

        //get element with active background
        const activeBackgroundOption = document.querySelector(".border-2")!;

        //delete the active properties
        if (activeBackgroundOption) {
          activeBackgroundOption.classList.remove("border-2", "border-black");
        }

        //set clicked option to active
        backgroundOption.classList.add("border-2", "border-black");
      })
    );
  };

  /**
   * Render html
   */
  render = () => {
    // Create a new div
    const modalEl = document.createElement("div");

    // Add Tailwind classes to style it as a dialog box
    modalEl.className = `
       modal-container fixed inset-0 z-50 flex  justify-center p-4 bg-black bg-opacity-50 overflow-auto
     `;

    // Create the modal content
    modalEl.innerHTML = /*html*/ `
         <div class="bg-gray-100 rounded-lg shadow-xl max-w-xl mx-auto p-4">
  <h4 class="block text-center font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    Create board
  </h4>
 
  <form class="max-w-screen-lg mt-8 mb-2 w-[100%] sm:w-96">
    <div class="flex flex-col gap-6 mb-1">
      <h6
        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Board Title
      </h6>
      <div class="relative h-11 w-[100%] min-w-[200px]">
        <input placeholder="your board title" 
          class="input-title peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          <p class="error-msg mb-3 text-red-400"></p>
      </div>
     <h6
        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Background
      </h6>
      <div class=" h-11 w-[100%] flex min-w-[200px] gap-1">
        <div data-background="bg-green-300" class="background-option w-12 h-12  hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-green-300"> </div>
        <div data-background="bg-blue-300" class="background-option w-12 h-12  hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-blue-300"> </div>
        <div data-background="bg-orange-300" class="background-option w-12 h-12  hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-orange-300"> </div>
        <div data-background="bg-purple-100" class="background-option w-12 h-12  hover:scale-95 transition-all hover:cursor-pointer rounded-md bg-purple-100"> </div>
        <div data-background="bg-pink-200" class="background-option w-12 h-12 border-2 border-black hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-pink-200"> </div>
        <div data-background="bg-brown-400" class="background-option w-12 h-12  hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-brown-400"> </div>
        <div data-background="bg-white" class="background-option w-12 h-12  hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-white"> </div>
        <div data-background="bg-gray-800" class="background-option w-12 h-12  hover:scale-95 transition-all  hover:cursor-pointer rounded-md bg-gray-800"> </div>

 
      </div>
     
    </div>
    <button
      class="create-btn mt-6 block w-full select-none rounded-lg bg-green-400 hover:bg-green-600 py-4 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      Create
    </button>
  
  </form>
      </div>
     `;

    // Add the modal to the parent element
    this.elements.parentEl.appendChild(modalEl);

    // Store the modal element reference
    this.elements.modalEl = modalEl;

    //store reference to error msg element
    this.elements.errorMsgEl =
      this.elements.modalEl.querySelector<HTMLElement>(".error-msg")!;

    //store input element reference
    this.elements.inputTitleElement =
      this.elements.modalEl.querySelector<HTMLInputElement>(".input-title")!;

    //setup event listener
    this.setupEventListener();
  };
}
