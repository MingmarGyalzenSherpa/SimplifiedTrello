import Toastify from "toastify-js";

import { IList } from "../interfaces/IList";
import { List } from "./List";
import * as ListService from "../services/listService";
import * as BoardService from "../services/boardService";
import { IBoard } from "../interfaces/IBoard";
import { HttpStatusCode } from "axios";
import { Home } from "./Home";

/**
 * Board component
 */
export class Board {
  state: {
    boardId: string;
    board?: IBoard;
    lists: List[];
    inputTitleTimeoutId?: number;
  };
  elements: {
    parentEl: HTMLElement;
    boardEl?: HTMLElement;
    addListButtonEL?: HTMLButtonElement;
    boardTitleInput?: HTMLInputElement;
    toggleDeleteEl?: HTMLElement;
    deleteBoardBtn?: HTMLButtonElement;
  };
  constructor(parentEl: HTMLElement, id: string) {
    this.state = {
      boardId: id,
      lists: [],
    };

    this.elements = {
      parentEl,
    };
    console.log(id);
    setTimeout(this.initialSetup, 0);
  }

  /**
   * Function to handle initial setup
   */
  initialSetup = async () => {
    this.render();
  };

  /**
   * Fetch board details
   */
  fetchBoard = async () => {
    try {
      const response = await BoardService.getBoardById(+this.state.boardId);
      if (response.status === HttpStatusCode.Ok) {
        this.state.board = response.data.data;

        //set active workspace id
        localStorage.setItem("workspaceId", `${this.state.board!.workspaceId}`);

        //show board
        this.showBoardDetails();
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
  };

  /**
   * Show board details
   */
  showBoardDetails = async () => {
    //set background color
    this.elements.boardEl?.classList.add(
      this.state.board?.backgroundColor || ""
    );

    //set title
    this.elements.boardTitleInput!.value = this.state.board?.title!;
  };

  /**
   * Fetch and show list
   */
  fetchAndShowList = async () => {
    try {
      const response = await ListService.getLists(+this.state.boardId);

      const listContainerEl =
        document.querySelector<HTMLElement>("#lists-container")!;

      listContainerEl.innerHTML = "";

      const sortedList = response.data.data.sort(
        (a: IList, b: IList) => +a.position - +b.position
      );
      this.state.lists = sortedList.map(
        (list: IList) =>
          new List(
            listContainerEl,
            list,
            +this.state.boardId,
            this.render.bind(this)
          )
      );
    } catch (error) {
      Toastify({
        text: "Error getting list",
        duration: 2000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  /**
   * Setup event listeners
   */
  setupEventListener = () => {
    this.elements.addListButtonEL = document.querySelector(".add-list")!;

    //add list button event
    this.elements.addListButtonEL.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        //get list title
        const inputEl =
          document.querySelector<HTMLInputElement>("#new-list-input");
        const newListTitle = inputEl?.value.trim();
        if (!newListTitle) return;

        const reqBody = {
          title: newListTitle,
          position: this.state.lists.length,
        };

        const response = await ListService.addList(
          +this.state.boardId,
          reqBody
        );
        if ((response.status = HttpStatusCode.Created)) this.render();
      } catch (error) {
        Toastify({
          text: "Something went wrong.",
          duration: 2000,
          style: {
            background: "red",
          },
        }).showToast();
      }
    });

    //handle input listener to title input
    this.elements.boardTitleInput?.addEventListener("input", (e) => {
      if (this.state.inputTitleTimeoutId) {
        clearTimeout(this.state.inputTitleTimeoutId);
        this.state.inputTitleTimeoutId = undefined;
      }
      this.state.inputTitleTimeoutId = setTimeout(this.updateTitle, 3000);
    });

    //toggle delete button event
    this.elements.toggleDeleteEl?.addEventListener("click", (e) => {
      this.elements.deleteBoardBtn?.classList.toggle("invisible");
    });

    //delete button event
    this.elements.deleteBoardBtn?.addEventListener("click", async (e) => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);

        await BoardService.deleteBoard(+this.state.boardId);

        new Home(document.querySelector(".content")!, +userId!);
        // go to home
      } catch (error) {
        Toastify({
          text: "Error deleting board",
          duration: 3000,
          style: {
            background: "red",
          },
        }).showToast();
      }
    });
  };

  /**
   * function which calls update title
   */
  updateTitle = async () => {
    try {
      const response = await BoardService.updateBoard(+this.state.boardId, {
        title: this.elements.boardTitleInput!.value,
      });

      if (response.status === HttpStatusCode.Ok) {
        Toastify({
          text: "Title updated successfully!!",
          duration: 3000,
          style: {
            background: "green",
          },
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error updating title!!",
        duration: 3000,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  /**
   * Render html
   */
  render() {
    this.elements.parentEl.innerHTML = /*html*/ `
    <div class="h-[93vh]">
    <nav class="h-[8%] fixed  bg-black w-[85vw]  bg-opacity-30 px-10 ">
      <div class=" h-full flex items-center justify-between">
        <input class="input-title bg-transparent text-2xl font-semibold p-1 " /> 
        <div class="option-container relative">
        <button class="toggle-delete" >
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
        </button>
        <button class="delete-btn w-[100px] h-[50px] absolute invisible rounded bg-red-400 hover:bg-red-700 right-5 p-3  flex justify-center items-center">
              Delete
        </button>
       </div>
      </div>
       
    </nav>
    <div id="board" class="p-4  pt-[100px] w-full h-[100%]  flex gap-2  overflow-x-scroll">
      <div id="lists-container" class=" flex  gap-2">
      </div>
        <div class=" bg-gray-300 flex flex-col p-1 gap-1 h-[100px] rounded-lg" >
          <input id="new-list-input" class="p-3 rounded"  placeholder="Add a new list" />
          <button class="add-list bg-green-300 h-[50px] hover:bg-green-600"> Add </button>
        </div>
      </div>
    </div>
    `;

    //store reference to board title
    this.elements.boardTitleInput = document.querySelector(".input-title")!;

    //store reference to board
    this.elements.boardEl = document.querySelector("#board")!;

    //store reference to toggle delete
    this.elements.toggleDeleteEl = document.querySelector(".toggle-delete")!;

    //store reference to delete
    this.elements.deleteBoardBtn = document.querySelector(".delete-btn")!;

    //fetch and show list
    this.fetchAndShowList();

    //fetch board
    this.fetchBoard();

    this.setupEventListener();
  }
}
