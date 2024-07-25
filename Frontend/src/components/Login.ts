export function login(parentEl: HTMLDivElement) {
  const formEl = document.createElement("form");
  const emailInputEl = document.createElement("input");
  emailInputEl.type = "email";
  formEl.appendChild(emailInputEl);
  console.log("jdaflkasdf");
  console.log(parentEl);
  parentEl.innerHTML = "";
  parentEl.appendChild(formEl);
}
