export function List(parentEl: HTMLElement, listData: object) {
  parentEl.innerHTML += `
        <div class= "w-80 min-h-min bg-primary rounded-md p-3">
            <h3 class="text-white px-2">${listData.name}</h3>
            

        </div>
    `;
}
