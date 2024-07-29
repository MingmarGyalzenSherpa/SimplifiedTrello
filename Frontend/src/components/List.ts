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
    <div id="list" class="bg-blue-gray-500 min-w-[300px] max-h-[600px]  rounded-3xl overflow-auto">
          <span class="block list-title mb-3 pt-3 px-4 "> ${this.state.list.title}</span>
          <ul class="text-white flex flex-col gap-5 max-h-[500px] p-2 overflow-y-scroll">
            <li class="p-2 bg-green-300 rounded "> list 1</li>
            <li class="p-2 bg-green-300 rounded "> list 1</li>
               <li class="p-2 bg-green-300 rounded "> list 1</li>
            <li class="p-2 bg-green-300 rounded "> list 1</li>
               <li class="p-2 bg-green-300 rounded "> list 1</li>
            <li class="p-2 bg-green-300 rounded "> list 1</li>
               <li class="p-2 bg-green-300 rounded "> list 1</li>
            <li class="p-2 bg-green-300 rounded "> list 1</li>
               <li class="p-2 bg-green-300 rounded "> list 1</li>
            <li class="p-2 bg-green-300 rounded "> list 3</li>

          </ul>
        </div>
    `;

    this.elements.parentEl.appendChild(listEl);

    listEl.classList.add(
      "bg-blue-gray-500",
      "min-w-[300px]",
      "max-h-[600px]",
      "rounded-3xl",
      "overflow-auto"
    );

    //create a new list div
    //append it to parent
    //set the inner html of new list div
  };
}
