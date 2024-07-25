import { IComponent } from "./interfaces/IComponent";
import { router } from "./router";

const appEl = document.querySelector("#app")!;
console.log(appEl);

//navigator
const navigateTo = (path: string) => {
  history.pushState({}, "", path);
  router.resolve(path).then((component) => {
    const comp = component as IComponent;
    appEl.innerHTML = comp?.render();
  });
};

//event listeners for nav click
appEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    history.pushState({}, "", e.target.dataset["to"]);
    navigateTo(e.target.dataset["to"]!);
  } else {
    return;
  }
});

// initial routing
const token = localStorage.getItem("accessToken");

let path = "";
if (token) {
  path = "/";
} else {
  path = "/signup";
}
