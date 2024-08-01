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
    boardEl?: HTMLElement;
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
      if (response.status === HttpStatusCode.Ok) {
        this.state.board = response.data.data;

        //show board
        this.showBoardDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  showBoardDetails = async () => {
    //set background color
    this.elements.boardEl?.classList.add(
      this.state.board?.backgroundColor || ""
    );
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
        (list: IList) =>
          new List(
            listContainerEl,
            list,
            +this.state.boardId,
            this.render.bind(this)
          )
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(error);
      }
    });
  };

  render() {
    this.elements.parentEl.innerHTML = `
    <div class="h-[93vh]">
    <nav class="h-[8%] fixed  bg-black bg-opacity-30 w-full px-10 py-5">
      <div>
        <h2> ${this.state.boardId} </h2>
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

    //store reference to board
    this.elements.boardEl = document.querySelector("#board")!;
    //fetch and show list
    this.fetchAndShowList();

    //fetch board
    this.fetchBoard();

    this.setupEventListener();
  }
}
