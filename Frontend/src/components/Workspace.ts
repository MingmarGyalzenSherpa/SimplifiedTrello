import { IBoard } from "./../interfaces/IBoard";
import { IWorkspace } from "./../interfaces/IWorkspace";
import * as WorkspaceService from "../services/workspaceService";
import * as BoardService from "../services/boardService";
import { CreateBoardModal } from "./CreateBoardModal";
import { Board } from "./Board";
export class Workspace {
  state: {
    workspace: IWorkspace;
  };
  elements: {
    parentEl: HTMLElement;
    boardListEl?: HTMLElement;
    workspaceLogoEl?: HTMLElement;
    workspaceTitleEl?: HTMLElement;
  };
  constructor(parentEl: HTMLElement, workspaceId: number) {
    this.state = {
      workspace: {
        id: workspaceId,
        title: "",
        createdAt: "",
      },
    };
    this.elements = {
      parentEl,
    };

    this.render();
  }

  fetchAndAddBoards = async () => {
    try {
      //fetch boards
      const response = await BoardService.getBoardsByWorkspaceId(
        this.state.workspace.id
      );

      const boards: IBoard[] = response.data.data;

      //clear board list container to avoid duplicate
      this.elements.boardListEl!.innerHTML = "";
      //create board Element

      boards.forEach((board) => {
        const boardEl = document.createElement("div");

        //add classes to element
        boardEl.className = `min-w-[150px] h-[100px] shadow-lg flex justify-center font-semibold items-center rounded-lg hover:scale-105 hover:cursor-pointer ${
          board.backgroundColor ? `${board.backgroundColor}` : ""
        } ${board.backgroundColor === "bg-gray-800" ? "text-white" : ""}
        }`;

        //add content to element
        boardEl.textContent = board.title;

        //assign unique dataset
        boardEl.dataset.boardId = `${board.id}`;

        //add event listener
        boardEl.addEventListener("click", (e) => {
          e.preventDefault();

          //render board view
          const contentEl = document.querySelector<HTMLElement>(".content");

          new Board(contentEl!, `${board.id}`);
        });

        //append to board
        this.elements.boardListEl!.appendChild(boardEl);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  fetchWorkspaceInfo = async () => {
    try {
      const response = await WorkspaceService.getWorkspaceById(
        this.state.workspace.id
      );
      console.log(response.data.data);
      this.state.workspace = response.data.data;

      //add workspace title and logo
      this.elements.workspaceLogoEl!.textContent =
        this.state.workspace.title[0];

      this.elements.workspaceTitleEl!.textContent = this.state.workspace.title;
    } catch (error) {
      console.log(error);
    }
  };
  setupEventListener = () => {
    //add event listener on create board
    const createBoardButtonEl =
      this.elements.parentEl.querySelector(".create-board");

    createBoardButtonEl?.addEventListener("click", (e) => {
      e.preventDefault();
      new CreateBoardModal(this.state.workspace.id, this.render.bind(this));
    });
  };

  render = () => {
    console.log(this);
    this.elements.parentEl.innerHTML = `
      <div class="h-[93vh]  p-16">
<div class="flex justify-between   mb-10 ">
    <div class="flex gap-4  items-center ">
    <div class="workspace-logo bg-blue-300 w-20 h-20 font-extrabold text-7xl flex justify-center items-center shadow-md rounded-md" >${
      this.state.workspace.title && this.state.workspace.title[0]
    }</div>
    <h2 class="workspace-title text-3xl font-semibold">${
      this.state.workspace.title ? this.state.workspace.title : ""
    }</h2>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  </div>
  <hr class="mb-4 border-gray-300" />
  <h3 class="text-2xl font-semibold mb-4">Your Boards</h3>
  <div class="flex flex-row gap-4 flex-wrap ">
  <div class="board-list flex flex-row gap-4 flex-wrap">
  </div> 
  <button class="create-board min-w-[150px] h-[100px] flex-shrink-0 rounded-md font-medium bg-gray-400 flex justify-center items-center hover:cursor-pointer hover:bg-gray-500">
   Create a board
  </button>
  </div>
  </div>
    `;

    //store reference of workspace logo
    this.elements.workspaceLogoEl = document.querySelector(".workspace-logo")!;

    //store reference of workspace title
    this.elements.workspaceTitleEl =
      document.querySelector(".workspace-title")!;

    //store reference to board list container
    this.elements.boardListEl = document.querySelector(".board-list")!;

    this.fetchWorkspaceInfo();
    this.fetchAndAddBoards();
    this.setupEventListener();
  };
}
