import { List } from "./List";

const lists = {
  data: [
    {
      name: "list 3",
      position: 3,
    },
    {
      name: "list 1",
      position: 1,
    },
    {
      name: "list 2",
      position: 2,
    },
  ],
};

lists.data.sort((a, b) => a.position - b.position);
console.log(lists);

/**
 * Board component
 *
 * @param parentEl
 */
export function Board(parentEl: HTMLElement) {
  //create a board element
  const boardEl = document.createElement("div");
  boardEl.classList.add("p-3");
  boardEl.classList.add("flex");
  boardEl.classList.add("gap-2");
  boardEl.classList.add("items-start");

  lists.data.forEach((list) => {
    List(boardEl, list);
  });

  //append board to parent
  parentEl.appendChild(boardEl);
}
