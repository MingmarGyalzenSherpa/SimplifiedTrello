// import { IList } from "./../interfaces/IList";
import { IList } from "../interfaces/IList";
import { List } from "./List";
import * as ListService from "../services/listService";
import * as BoardService from "../services/boardService";
import { IBoard } from "../interfaces/IBoard";
import { HttpStatusCode } from "axios";
export class Board {
  state: {
    boardId: string;
    board?: IBoard;
    lists: List[];
  };
  elements: {
    parentEl: HTMLElement;
    addListButtonEL?: HTMLButtonElement;
  };
  constructor(parentEl: HTMLElement, id: string) {
    this.state = {
      boardId: id,
      lists: [],
    };

    this.elements = {
      parentEl,
    };

    setTimeout(this.initialSetup, 0);
  }

  initialSetup = async () => {
    this.render();
  };

  fetchBoard = async () => {
    try {
      const response = await BoardService.getBoardById(+this.state.boardId);
      console.log(response);
      if (response.status === HttpStatusCode.Ok) {
        this.state.board = response.data.data;

        //show board
        this.showBoard();
      }
    } catch (error) {
      console.log(error);
    }
  };

  showBoard = async () => {
    //set background color
    const boardEl = document.querySelector("#board");
    boardEl?.classList.add(this.state.board?.backgroundColor || "");
  };

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
        (list: IList) => new List(listContainerEl, list)
      );

      console.log(this.state.lists);
    } catch (error) {
      console.log(error);
    }
  };

  setupEventListener = () => {
    this.elements.addListButtonEL = document.querySelector(".add-list")!;

    //add list button event
    this.elements.addListButtonEL.addEventListener("click", async (e) => {
      e.preventDefault();

      //get list title
      const inputEl =
        document.querySelector<HTMLInputElement>("#new-list-input");
      const newListTitle = inputEl?.value.trim();
      if (!newListTitle) return;

      console.log(newListTitle);
      const reqBody = {
        title: newListTitle,
        position: this.state.lists.length,
      };

      const response = await ListService.addList(+this.state.boardId, reqBody);

      this.render();

      console.log(response);

      //add list

      // this.setupEventListener();
    });
  };

  render() {
    this.elements.parentEl.innerHTML = `
    <div class="h-[93vh]">
    <nav class="h-[8%] fixed  bg-red-300 bg-opacity-50 w-full px-10 py-5">
      <div>
        <h2> ${this.state.boardId} </h2>
      </div>
    </nav>
    <div id="board" class="p-4 pt-[100px] w-full h-[100%]   flex gap-2 bg-green-300 overflow-x-scroll">
      <div id="lists-container" class=" flex  gap-2">
      </div>
        <div class=" bg-gray-300 flex flex-col p-1 gap-1 h-[100px] rounded-lg" >
          <input id="new-list-input" class="p-3 rounded"  placeholder="Add a new list" />
          <button class="add-list bg-green-300 h-[50px] hover:bg-green-600"> Add </button>
        </div>
      </div>
    </div>
    `;

    //fetch and show list
    this.fetchAndShowList();

    //fetch board
    this.fetchBoard();

    this.setupEventListener();
  }
}

// <div id="board" class="p-4 w-[80vw] h-[90vh] flex gap-2 bg-green-300 overflow-x-scroll">
// ${this.state.lists
//   .map(
//     (list) =>
//       `<div id="list" class="bg-blue-gray-500 min-w-[300px] max-h-[600px]  rounded-3xl overflow-auto">
//     <span class="block list-title mb-3 pt-3 px-4 "> ${list.title}</span>
//     <ul class="text-white flex flex-col gap-5 max-h-[500px] p-2 overflow-y-scroll">
//       <li class="p-2 bg-green-300 rounded "> list 1</li>
//       <li class="p-2 bg-green-300 rounded "> list 1</li>
//          <li class="p-2 bg-green-300 rounded "> list 1</li>
//       <li class="p-2 bg-green-300 rounded "> list 1</li>
//          <li class="p-2 bg-green-300 rounded "> list 1</li>
//       <li class="p-2 bg-green-300 rounded "> list 1</li>
//          <li class="p-2 bg-green-300 rounded "> list 1</li>
//       <li class="p-2 bg-green-300 rounded "> list 1</li>
//          <li class="p-2 bg-green-300 rounded "> list 1</li>
//       <li class="p-2 bg-green-300 rounded "> list 3</li>

//     </ul>
//   </div>`
//   )
//   .join("")}
