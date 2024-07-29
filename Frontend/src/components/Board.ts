// import { IList } from "./../interfaces/IList";
import { IList } from "../interfaces/IList";
import { axiosInstance } from "../utils/axiosConfig";
import { List } from "./List";

export class Board {
  state: {
    boardId: string;
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
    await this.fetchList();
    this.render();
    this.setupEventListener();
  };

  fetchList = async () => {
    try {
      const response = await axiosInstance.get(
        `/boards/${this.state.boardId}/lists`
      );
      if (response.status !== 200) {
        return;
      }
      const listContainerEl =
        document.querySelector<HTMLElement>("#lists-container")!;

      this.state.lists = response.data.data.map(
        (list: IList) => new List(listContainerEl, list)
      );

      console.log("here");
      console.log(this.state.lists);
    } catch (error) {
      console.log(error);
    }
  };

  setupEventListener = () => {
    this.elements.addListButtonEL = document.querySelector(".add-list")!;

    //add list button event
    this.elements.addListButtonEL.addEventListener("click", (e) => {
      e.preventDefault();

      //get list title
      const inputEl =
        document.querySelector<HTMLInputElement>("#new-list-input");
      const newListTitle = inputEl?.value.trim();
      if (!newListTitle) return;

      console.log(this.state.lists);
      // this.state.lists.push(new List());
      console.log(this.state.lists);

      //add list

      //re render
      this.render();

      this.setupEventListener();
    });
  };

  render() {
    this.elements.parentEl.innerHTML = `
    
    <div id="board" class="p-4 w-[80vw] h-[90vh] flex gap-2 bg-green-300 overflow-x-scroll">
      <div id="lists-container" class=" flex  gap-2">
      </div>
        <div class=" bg-gray-300 flex flex-col p-1 gap-1 h-[100px] rounded-lg" >
          <input id="new-list-input" class="p-3 rounded"  placeholder="Add a new list" />
          <button class="add-list bg-green-300 h-[50px] hover:bg-green-600"> Add </button>
        </div>
      </div>
      
    `;

    this.fetchList();
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
