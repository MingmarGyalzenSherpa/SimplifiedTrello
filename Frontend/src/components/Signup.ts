import { config } from "../config";
import { axiosInstance } from "../utils/axiosConfig";
import { navigateTo } from "../utils/Navigate";

export function Signup(parentEl: HTMLElement) {
  const credentialState = {
    email: "",
    password: "",
  };

  parentEl.innerHTML = `
    <div class="mx-auto w-min h-min my-10 border px-5 py-10 shadow-lg relative flex flex-col text-gray-700 bg-transparent  rounded-xl bg-clip-border">
  
  <div class="flex gap-1 justify-center align-baseline mb-2">
   <img src="trello.png" class="w-9 h-9"> 
    <h4 class="block font-extrabold text-center  text-3xl antialiased  leading-snug tracking-normal text-blue-gray-900">
    Trello
  </h4>
  </div>

   
  <p class="text-center text-black">Create a new Account</p>
  <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
     <div  class="flex flex-row gap-2 mb-1 ">
        <div>
         <h6
        class="block mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         First Name
      </h6>
       <div class="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com" id="email"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
        </div>
        <div>
         <h6
        class="block mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         Last Name
      </h6>
       <div class="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com" id="email"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
        </div>
    </div>
    <div class="flex flex-col gap-6 mb-1">

      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         Email
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com" id="email"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Password
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********" id="password"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
    </div>
    <p class="error text-red-400">  </p>
    
    <button id="submit"
      class="mt-6 block w-full select-none rounded-md bg-blue-700 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      Log in
    </button>
    <p class="block mt-4  text-base antialiased font-normal leading-relaxed text-center text-gray-700">
      Don't have an account?
      <a href="#" data-to="/signup" class="font-medium text-blue-700 ">
        Sign Up
      </a>
    </p>
  </form>
</div>    
  `;

  console.log(config);

  setTimeout(setupEventListener, 0);

  function setupEventListener() {
    //input event listener
    const emailInputEl = document.querySelector("#email")!;
    const passwordInputEl = document.querySelector("#password")!;

    emailInputEl.addEventListener("input", (e) => {
      credentialState.email = (e.target as HTMLInputElement)?.value;
    });

    passwordInputEl.addEventListener("input", (e) => {
      credentialState.password = (e.target as HTMLInputElement)?.value;
    });

    //submit event listener
    handleSubmit();
  }

  function handleSubmit() {
    const submitBtn = document.querySelector("#submit");
    submitBtn?.addEventListener("click", async (e) => {
      try {
        const response = await axiosInstance.post(
          "/auth/login",
          credentialState
        );
        const { accessToken, refreshToken } = response.data;

        //add to localstorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        //redirect to dashboard
        navigateTo("/");
      } catch (error: any) {
        //check if there is response
        if (error.response) {
          const { message } = error.response.data;
          showError(message);
        }
      }
    });
  }

  function showError(errorMessage: string) {
    const errorEl = document.querySelector(".error")!;
    errorEl.textContent = errorMessage;
  }
}
