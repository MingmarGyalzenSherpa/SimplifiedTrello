import { IList } from "../interfaces/IList";

export class List {
  state: {
    list: IList;
  };
  elements: {
    parentEl: HTMLElement;
  };
  constructor(parentEl: HTMLElement, list: IList) {
    this.state = {
      list,
    };
    this.elements = {
      parentEl,
    };

    console.log(this.state);
    this.render();
    console.log("here");
  }

  initialSetup = () => {};

  setupEventListener = () => {};

  render = () => {
    console.log("render called");
    console.log(this.elements.parentEl);
    const listEl = document.createElement("div");
    listEl.innerHTML += `
    <div id="list" class="bg-[#F1F2F4] min-w-[300px] max-h-[600px] ">
          <span class="block list-title mb-3 pt-3 px-4 text-[#3F506C]"> ${this.state.list.title}</span>
          <ul class="text-black flex flex-col gap-5 max-h-[450px] p-2 overflow-y-scroll">
            <li class="p-2 bg-white rounded shadow-md "> list 1</li>
            <li class="p-2 bg-white rounded shadow-md  "> list 1</li>
               <li class="p-2 bg-white rounded shadow-md  "> list 1</li>
            <li class="p-2 bg-white rounded shadow-md "> list 1</li>
               <li class="p-2 bg-white rounded shadow-md  "> list 1</li>
            <li class="p-2 bg-white rounded shadow-md "> list 1</li>
               <li class="p-2 bg-white rounded shadow-md "> list 1</li>
            <li class="p-2 bg-white rounded shadow-md "> list 1</li>
               <li class="p-2 bg-white rounded shadow-md "> list 1</li>
            <li class="p-2 bg-white rounded shadow-md  ">list 3</li>

          </ul>
           <div class=" flex flex-col  gap-1 h-[100px] rounded-t-xl pl-2 pr-3 py-2 w-[300px] bg-[#F1F2F4] bg-red-100  "  >
          <input id="new-list-input" class="p-3 rounded shadow-md"  placeholder="Add a new list" />
          <button class="add-list bg-blue-400 h-[50px] hover:bg-blue-600 text-white rounded"> Add </button>
        </div>
        </div>
    `;

    this.elements.parentEl.appendChild(listEl);

    listEl.classList.add(
      "min-w-[300px]",
      "max-h-[600px]",
      "rounded-2xl",
      "overflow-auto"
    );

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
